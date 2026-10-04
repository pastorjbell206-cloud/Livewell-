/**
 * Render one planned job to client/public/downloads/<file>, and the worker
 * entry point build-pdfs.mjs uses to spread jobs across CPU cores.
 */
import path from "node:path";
import { parentPort, workerData, isMainThread } from "node:worker_threads";
import { Kit } from "./index.mjs";
import { planDownloads, OUT_DIR } from "./plan.mjs";

export async function renderJob(job) {
  const spec = job.spec();
  const kit = new Kit({
    title: spec.title || job.title,
    subject: spec.subject,
    keywords: spec.keywords,
    runningHead: spec.runningHead,
    chrome: spec.chrome,
    margins: spec.margins,
    size: spec.size,
    layout: spec.layout,
    pageNote: spec.pageNote,
  });
  spec.render(kit);
  const { pages, bytes } = await kit.save(path.join(OUT_DIR, job.file));
  return { file: job.file, pages, bytes };
}

// Worker: load the plan once, then render whatever file the parent sends,
// one at a time, replying after each so the parent can hand out the next.
if (!isMainThread && workerData?.worker) {
  const byFile = new Map((await planDownloads()).map((j) => [j.file, j]));
  parentPort.on("message", async (file) => {
    if (file == null) {
      parentPort.close();
      return;
    }
    try {
      parentPort.postMessage({ ok: true, ...(await renderJob(byFile.get(file))) });
    } catch (err) {
      parentPort.postMessage({ ok: false, file, error: String(err?.stack || err) });
    }
  });
  parentPort.postMessage({ ready: true });
}
