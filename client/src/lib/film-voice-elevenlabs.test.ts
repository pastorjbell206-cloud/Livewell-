/**
 * The films' voice made with ElevenLabs (scripts/lib/film-voice-elevenlabs.mjs):
 * the request it sends, its retries, and that switching engine marks every
 * file stale while the Kokoro files keep their hashes. No network: fetch is fake.
 */
import { describe, it, expect, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
// @ts-expect-error a plain .mjs build library
import { elevenRequest, elevenSpeak, ELEVENLABS_DEFAULTS } from "../../../scripts/lib/film-voice-elevenlabs.mjs";
// @ts-expect-error a plain .mjs build library
import { planHash } from "../../../scripts/lib/film-speech.mjs";

const CONFIG = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../scripts/film-audio.config.json"), "utf8"));
const ELEVEN = { ...CONFIG, engine: "elevenlabs", voice: "VOICEID", elevenlabs: { model: "eleven_multilingual_v2" } };
const UNITS = [{ kind: "caption", text: "God made everything.", gap: "tail" }];

describe("the ElevenLabs request", () => {
  it("asks for the voice in the config, with the key in its header and the neighbours as context", () => {
    const { url, init } = elevenRequest(ELEVEN, "KEY", "Second.", "First.", "Third.");
    expect(url).toBe(`https://api.elevenlabs.io/v1/text-to-speech/VOICEID?output_format=${ELEVENLABS_DEFAULTS.outputFormat}`);
    expect(init.method).toBe("POST");
    expect(init.headers["xi-api-key"]).toBe("KEY");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ text: "Second.", model_id: "eleven_multilingual_v2", previous_text: "First.", next_text: "Third." });
    expect(body.voice_settings.stability).toBe(ELEVENLABS_DEFAULTS.stability);
  });

  it("leaves out empty context, and refuses without a key or a voice", () => {
    const body = JSON.parse(elevenRequest(ELEVEN, "KEY", "Only.").init.body);
    expect(body.previous_text).toBeUndefined();
    expect(body.next_text).toBeUndefined();
    expect(() => elevenRequest(ELEVEN, "", "x")).toThrow(/ELEVENLABS_API_KEY/);
    expect(() => elevenRequest({ ...ELEVEN, voice: "" }, "KEY", "x")).toThrow(/voice/);
  });

  it("waits and tries again when the service is busy, and stops plainly when refused", async () => {
    vi.useFakeTimers();
    const ok = new Response(new Uint8Array([1, 2, 3]), { status: 200 });
    const busy = vi.fn().mockResolvedValueOnce(new Response("busy", { status: 429 })).mockResolvedValueOnce(ok);
    const done = elevenSpeak(ELEVEN, "KEY", "Hi.", "", "", { fetchImpl: busy });
    await vi.runAllTimersAsync();
    expect([...(await done)]).toEqual([1, 2, 3]);
    expect(busy).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
    const refused = vi.fn().mockResolvedValue(new Response("invalid api key", { status: 401 }));
    await expect(elevenSpeak(ELEVEN, "KEY", "Hi.", "", "", { fetchImpl: refused })).rejects.toThrow(/401.*invalid api key/);
    expect(refused).toHaveBeenCalledTimes(1);
  });
});

describe("switching the engine", () => {
  it("keeps every Kokoro hash as it was, and changes every hash under ElevenLabs", () => {
    expect(planHash(UNITS, CONFIG)).toBe(planHash(UNITS, { ...CONFIG, engine: "kokoro" }));
    expect(planHash(UNITS, ELEVEN)).not.toBe(planHash(UNITS, CONFIG));
    expect(planHash(UNITS, ELEVEN)).not.toBe(planHash(UNITS, { ...ELEVEN, elevenlabs: { model: "eleven_flash_v2_5" } }));
  });
});
