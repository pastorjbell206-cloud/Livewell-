"""Mixes narration.wav over music.wav (the music steps back while the voice speaks) -> soundtrack.wav, 48 kHz stereo."""
import os, struct, wave
D = os.environ["FILM_DIR"] + "/audio"
v = wave.open(f"{D}/narration.wav"); n = v.getnframes(); voice = [x / 32768 for x in struct.unpack("<%dh" % n, v.readframes(n))]
m = wave.open(f"{D}/music.wav"); raw = struct.unpack("<%dh" % (m.getnframes() * 2), m.readframes(m.getnframes()))
ml = [x / 32768 for x in raw[0::2]]; mr = [x / 32768 for x in raw[1::2]]
total = min(n, len(ml)); level = 0.0; L = [0.0] * total; R = [0.0] * total; peak = 0.0
for k in range(total):
    target = 1.0 if abs(voice[k]) > 0.02 else 0.0
    level += (target - level) * (0.004 if target > level else 0.00006)
    g = 0.62 - 0.46 * level; L[k] = voice[k] + ml[k] * g; R[k] = voice[k] + mr[k] * g
    peak = max(peak, abs(L[k]), abs(R[k]))
gain = 0.97 / peak; out = bytearray(); pack = struct.Struct("<hh").pack
for k in range(total): out += pack(int(max(-1, min(1, L[k] * gain)) * 32767), int(max(-1, min(1, R[k] * gain)) * 32767))
w = wave.open(f"{D}/soundtrack.wav", "wb"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(48000); w.writeframes(bytes(out)); w.close()
print(f"soundtrack {total / 48000:.1f}s, gain {gain:.2f}")
