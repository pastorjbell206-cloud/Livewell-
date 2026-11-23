"""
Speak one batch of moving-picture files with the Kokoro speech model.

Run only by scripts/build-film-audio.mjs, by hand, on a machine that has the
model (never in the site's build, its tests or CI):

    python film-audio-synth.py <job.json>

The job names the model files, the voice and its speed, the pauses, the
loudness to aim for, and a list of items; each item is a file to write and the
sentences it says, each with the pause that follows it. Every sentence is
spoken on its own, trimmed, and laid end to end with its pauses. One gain is
worked out for the whole batch (a film at one level), so its frames sit at
the same loudness, and each item is written as a 24 kHz WAV for ffmpeg to
finish. Prints one JSON line: the seconds of each item and the gain used.

Needs: kokoro-onnx, onnxruntime, numpy, soundfile, pyloudnorm.
"""
import json
import sys

import numpy as np
import onnxruntime as ort
import pyloudnorm as pyln
import soundfile as sf
from kokoro_onnx import Kokoro

SR = 24000


def trim(x, thr=0.004, pad=0.03):
    idx = np.where(np.abs(x) > thr)[0]
    if not len(idx):
        return x
    a = max(0, idx[0] - int(pad * SR))
    b = min(len(x), idx[-1] + int(pad * SR))
    return x[a:b]


def main():
    job = json.load(open(sys.argv[1]))
    so = ort.SessionOptions()
    so.intra_op_num_threads = int(job.get("threads", 2))
    so.inter_op_num_threads = 1
    session = ort.InferenceSession(
        job["model"], so, providers=["CPUExecutionProvider"]
    )
    kokoro = Kokoro.from_session(session, job["voices"])
    gaps = job["gaps"]

    def silence(seconds):
        return np.zeros(int(seconds * SR), np.float32)

    clips = []
    for item in job["items"]:
        parts = [silence(gaps["lead"])]
        for unit in item["units"]:
            x, sr = kokoro.create(
                unit["text"], voice=job["voice"], speed=job["speed"], lang=job["lang"]
            )
            assert sr == SR, sr
            parts.append(trim(np.asarray(x, dtype=np.float32)))
            parts.append(silence(gaps[unit["gap"]]))
        clips.append(np.concatenate(parts))

    # One gain for the batch, measured over everything it says.
    whole = np.concatenate(clips)
    if len(whole) < SR:  # too short to measure: pad with its own repeats
        whole = np.tile(whole, int(np.ceil(SR * 2 / max(1, len(whole)))))
    loud = pyln.Meter(SR).integrated_loudness(whole)
    gain_db = float(job["loudness"] - loud)
    gain = 10 ** (gain_db / 20)

    seconds = []
    for item, clip in zip(job["items"], clips):
        sf.write(item["wav"], clip * gain, SR, subtype="FLOAT")
        seconds.append(round(len(clip) / SR, 2))
    print(json.dumps({"seconds": seconds, "gain_db": round(gain_db, 2)}))


if __name__ == "__main__":
    main()
