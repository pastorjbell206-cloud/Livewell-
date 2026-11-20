/**
 * The tool shell: the parts every tool on the Tools door shares, built once
 * (docs/work/elite/tools-plan.md, section 6). A tool adopts it in four moves:
 *
 * 1. Top: <ToolHead path title line time keeps notDiagnosis? /> in place of
 *    its own hero. `keeps` says in plain words what stays on this device.
 * 2. Questions: one <QuestionCard> per question (radio or checkbox answers,
 *    arrow and number keys), controlled by the tool.
 * 3. Place: useToolProgress("<tool>", guard, start) keeps the answers under
 *    `livewell-progress-<tool>`; <ProgressLine step total section onBack
 *    saveFailed /> shows where the reader is and the save-failure sentence.
 *    A tool with an older storage key reads it once in its own guard and
 *    moves on to the new key, so nobody loses answers.
 * 4. Result: <ResultReading> first, then <ScoreChart> if the tool scores,
 *    then Scripture, then <ResultNext>; <ResultActions onChange onStartOver />
 *    gives Change my answers, Print, Send to my phone, and Start over with a
 *    confirm. tool-shell.css carries the one print sheet.
 *
 * The Wisdom Finder (pages/tools/WisdomFinder.tsx) and the wisdom topic
 * pages (pages/WisdomTopic.tsx) are the first to use it.
 */
import "./tool-shell.css";

export { default as ToolHead } from "./ToolHead";
export type { ToolHeadProps } from "./ToolHead";
export { default as QuestionCard } from "./QuestionCard";
export type { QuestionCardProps, QuestionOption } from "./QuestionCard";
export { default as ProgressLine } from "./ProgressLine";
export { useToolProgress, progressKey, SAVE_FAILED } from "./useToolProgress";
export { ResultSection, ResultReading, ScoreChart, ResultNext, ResultActions } from "./Result";
export type { ScoreRow, NextStep, ResultActionsProps } from "./Result";
