/**
 * The moving pictures' recorded voice, made with ElevenLabs instead of the
 * open Kokoro model (James, 2026-11-25: "make the voices and videos smoother,
 * less robotic ... utilize 11 labs").
 *
 * Used only by scripts/build-film-audio.mjs when film-audio.config.json says
 * "engine": "elevenlabs". The key is read from ELEVENLABS_API_KEY on the
 * machine that runs the script and is never written to the repository, the
 * manifest or a log. Nothing here runs in the site's build, its tests (which
 * pass a fake fetch) or CI.
 *
 * The voice must be a stock voice from the ElevenLabs voice library or one
 * designed from a text description, never a clone of a real person's voice
 * (the site's rule for the films' voice, CLAUDE.md "The films' recorded
 * voice"); the page keeps saying the voice is computer-made.
 *
 * Each sentence is still asked for on its own, so the pauses stay exact, but
 * each request carries the sentence before and after it (previous_text,
 * next_text), which ElevenLabs uses to keep the intonation continuous across
 * the joins. That continuity is most of what makes it sound less robotic.
 */

export const ELEVENLABS_API = "https://api.elevenlabs.io/v1/text-to-speech";

/** The defaults for a calm narrator; each can be set in the config's `elevenlabs`. */
export const ELEVENLABS_DEFAULTS = {
  model: "eleven_multilingual_v2",
  outputFormat: "mp3_44100_128",
  stability: 0.55,
  similarityBoost: 0.75,
  style: 0.15,
  useSpeakerBoost: true,
  speed: 0.95,
};

/** The settings in force: the defaults, overridden by the config's `elevenlabs`. */
export function elevenSettings(config) {
  return { ...ELEVENLABS_DEFAULTS, ...(config.elevenlabs ?? {}) };
}

/**
 * The request for one sentence: its address and fetch options. `voice` in the
 * config is the ElevenLabs voice id. `prev` and `next` are the neighbouring
 * sentences in the same file, or "" at either end.
 */
export function elevenRequest(config, key, text, prev = "", next = "") {
  if (!config.voice) throw new Error("film-audio.config.json has no `voice` (the ElevenLabs voice id)");
  if (!key) throw new Error("set ELEVENLABS_API_KEY on this machine (never in the repository)");
  const s = elevenSettings(config);
  const body = {
    text,
    model_id: s.model,
    voice_settings: {
      stability: s.stability,
      similarity_boost: s.similarityBoost,
      style: s.style,
      use_speaker_boost: s.useSpeakerBoost,
      speed: s.speed,
    },
  };
  if (prev) body.previous_text = prev;
  if (next) body.next_text = next;
  return {
    url: `${ELEVENLABS_API}/${encodeURIComponent(config.voice)}?output_format=${encodeURIComponent(s.outputFormat)}`,
    init: {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify(body),
    },
  };
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Speak one sentence and return its MP3 bytes. Retries a busy or failing
 * service (429, 5xx) with a growing wait; any other refusal stops the run
 * with the service's own message, so a bad key or voice id is plain.
 */
export async function elevenSpeak(config, key, text, prev, next, { fetchImpl = fetch, tries = 5 } = {}) {
  const { url, init } = elevenRequest(config, key, text, prev, next);
  for (let attempt = 1; ; attempt++) {
    const res = await fetchImpl(url, init);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    const retry = res.status === 429 || res.status >= 500;
    if (!retry || attempt >= tries) {
      const detail = await res.text().catch(() => "");
      throw new Error(`ElevenLabs refused (${res.status}): ${detail.slice(0, 300)}`);
    }
    await wait(1000 * 2 ** (attempt - 1));
  }
}
