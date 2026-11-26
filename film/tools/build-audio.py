"""Turns the ten recorded chapter clips into the film's timeline and narration track.
Input:  <FILM_DIR>/audio/full.mp3 (the whole script as one take), or ch-01.mp3 ... (one clip per chapter)
Output: <FILM_DIR>/timeline.json  (when each chapter and each sentence starts and ends)
        <FILM_DIR>/audio/narration.wav (48 kHz mono, the clips placed on that timeline)
Sentences are found by the pauses between them: in each clip, the longest quiet gaps become the breaks.
Run: FILM_DIR=film/<name> python3 film/tools/build-audio.py"""
import json, os, struct, subprocess, tempfile, wave

RATE = 48000
D = os.environ["FILM_DIR"]   # which film: film/explainer, film/beliefs, ...
script = json.load(open(f"{D}/script.json"))
INTRO, GAP, OUTRO = 2.6, script.get("gap", 2.4), 7.0   # seconds before the first words, between chapters, after the last

def load(path):
    tmp = tempfile.mktemp(suffix=".wav")
    subprocess.run(["afconvert", "-f", "WAVE", "-d", f"LEI16@{RATE}", "-c", "1", path, tmp], check=True)
    w = wave.open(tmp, "rb"); n = w.getnframes(); s = list(struct.unpack("<%dh" % n, w.readframes(n))); w.close(); os.remove(tmp)
    loud = [k for k, x in enumerate(s) if abs(x) > 700]
    return s[max(0, loud[0] - int(0.03 * RATE)): loud[-1] + int(0.15 * RATE)]

def breaks(s, lines):
    """For each break between sentences: guess its time from the sentences' lengths, then snap to the
    nearest real pause in the recording. Returns (mid, start, end) of each chosen pause."""
    hop = int(0.02 * RATE); env = []
    for i in range(0, len(s) - hop, hop):
        seg = s[i:i + hop]; env.append((sum(x * x for x in seg) / hop) ** 0.5)
    quiet = [e < 450 for e in env]; runs = []; i = 0
    while i < len(quiet):
        if quiet[i]:
            j = i
            while j < len(quiet) and quiet[j]: j += 1
            if j - i >= 5: runs.append(((i + j) / 2 * 0.02, i * 0.02, j * 0.02))
            i = j
        else: i += 1
    # Choose the set of pauses that best fits all the sentences at once: each sentence should take about
    # its share of the time (by length), and longer pauses are likelier to be the break between sentences.
    dur = len(s) / RATE; n = len(lines)
    if n == 1: return []
    chars = [len(l) for l in lines]; rate = sum(chars) / dur
    exp = [c / rate for c in chars]
    cands = [r for r in runs if 0.3 < r[0] < dur - 0.3]
    INF = float("inf"); m = len(cands)
    def cost(k, a, b):                               # sentence k spoken from a to b
        d = b - a; return (d - exp[k]) ** 2 / max(0.5, exp[k])
    best = [[INF] * m for _ in range(n - 1)]; prev = [[-1] * m for _ in range(n - 1)]
    for j in range(m): best[0][j] = cost(0, 0.0, cands[j][1]) - 0.8 * (cands[j][2] - cands[j][1])
    for k in range(1, n - 1):
        for j in range(m):
            for i in range(j):
                if best[k - 1][i] == INF: continue
                v = best[k - 1][i] + cost(k, cands[i][2], cands[j][1]) - 0.8 * (cands[j][2] - cands[j][1])
                if v < best[k][j]: best[k][j] = v; prev[k][j] = i
    end = min(range(m), key=lambda j: best[n - 2][j] + cost(n - 1, cands[j][2], dur) if best[n - 2][j] < INF else INF)
    out = []; j = end
    for k in range(n - 2, -1, -1): out.append(cands[j]); j = prev[k][j]
    out.reverse()
    return out

t = INTRO; chapters = []; track = []
if os.path.exists(f"{D}/audio/full.mp3"):
    # The whole script recorded as one take: cut it into chapters at the pauses between them.
    full = load(f"{D}/audio/full.mp3"); flat = [l for ch in script["chapters"] for l in ch["lines"]]
    b = breaks(full, flat); edges = [(0.0, 0.0)] + [(r[1], r[2]) for r in b] + [(len(full) / RATE,) * 2]
    if len(b) != len(flat) - 1: print(f"  found {len(b)} pauses for {len(flat)} sentences")
    k = 0; clips = []
    for ch in script["chapters"]:
        n = len(ch["lines"]); a0 = edges[k][1]; a1 = edges[k + n][0]
        seg = full[int(a0 * RATE): int(a1 * RATE)]
        rel = [(edges[k + j][1] - a0, edges[k + j + 1][0] - a0) for j in range(n)]
        clips.append((seg, rel)); k += n
else:
    clips = []
    for ci, ch in enumerate(script["chapters"], 1):
        seg = load(f"{D}/audio/ch-{ci:02d}.mp3"); dur = len(seg) / RATE
        b = breaks(seg, ch["lines"])
        if len(b) != len(ch["lines"]) - 1: print(f"  chapter {ci}: found {len(b)} pauses for {len(ch['lines'])} sentences")
        edges = [(0.0, 0.0)] + [(r[1], r[2]) for r in b] + [(dur, dur)]
        clips.append((seg, [(edges[j][1], edges[j + 1][0]) for j in range(len(ch["lines"]))]))
for ci, (ch, (s, rel)) in enumerate(zip(script["chapters"], clips), 1):
    dur = len(s) / RATE
    lines = [{"text": text, "start": round(t + a, 3), "end": round(t + e, 3)} for text, (a, e) in zip(ch["lines"], rel)]
    chapters.append({"id": ch["id"], "kicker": ch["kicker"], "level": ch.get("level"), "start": round(t - 0.9, 3), "end": round(t + dur + 0.9, 3), "lines": lines})
    track.append((t, s)); print(f"chapter {ci:2d} {ch['id']:<11} {t:6.1f}s  +{dur:5.1f}s  {len(ch['lines'])} sentences")
    t += dur + GAP
length = round(t - GAP + OUTRO, 2)
json.dump({"length": length, "chapters": chapters}, open(f"{D}/timeline.json", "w"), indent=1)
total = int(length * RATE); out = [0] * total
for start, s in track:
    a = int(start * RATE)
    for k, x in enumerate(s):
        if a + k < total: out[a + k] = x
w = wave.open(f"{D}/audio/narration.wav", "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE)
w.writeframes(struct.pack("<%dh" % total, *out)); w.close()
print(f"length {length}s ({int(length // 60)}:{int(length % 60):02d})")
