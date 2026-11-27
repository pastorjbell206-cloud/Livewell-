/**
 * What the Academy's pages share: the programs and the tracks' index loaded
 * together, a program's card, and the unaccredited notice.
 */
import { Link } from "wouter";
import { ArrowRight, Award } from "lucide-react";

import Plate from "@/components/art/Plate";
import {
  fetchPrograms,
  hoursLabel,
  programHref,
  programMinutes,
  programProgress,
  UNACCREDITED,
  type Program,
  type Programs,
} from "@/lib/academy";
import {
  fetchTrackIndex,
  sessionHref,
  type TrackBrief,
  type TrackIndex,
  type TracksProgress,
} from "@/lib/tracks";
import { useLoad } from "../tracks/parts";

export interface AcademyData {
  programs: Programs;
  index: TrackIndex;
  briefs: Map<string, TrackBrief>;
}

const loadAcademy = async (): Promise<AcademyData> => {
  const [programs, index] = await Promise.all([
    fetchPrograms(),
    fetchTrackIndex(),
  ]);
  return {
    programs,
    index,
    briefs: new Map(index.tracks.map(t => [t.slug, t])),
  };
};

/** The programs and the tracks' index, together: undefined while loading, null when it failed. */
export const useAcademy = () => useLoad("academy", loadAcademy);

/** A program's tracks that exist, in the program's order. */
export const tracksOf = (p: Program, briefs: Map<string, TrackBrief>) =>
  p.tracks.map(s => briefs.get(s)).filter((b): b is TrackBrief => !!b);

/** One program as a picture card: who it is for, its size, and where the reader is. */
export function ProgramCard({
  p,
  data,
  progress,
  headingLevel = 3,
}: {
  p: Program;
  data: AcademyData;
  progress: TracksProgress;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const tracks = tracksOf(p, data.briefs);
  const pr = programProgress(p, data.briefs, progress);
  const sessions = tracks.reduce((n, t) => n + t.sessions.length, 0);
  const state = pr.complete
    ? "Finished"
    : pr.done > 0
      ? `${pr.done} of ${pr.total} sessions done`
      : null;
  return (
    <Link href={programHref(p.slug)} className="pv-pcard ac-card">
      <span className="pv-pcard__art">
        <Plate name={p.plate} decorative />
      </span>
      <span className="pv-pcard__body">
        <span className="ac-card__reader">{p.reader}</span>
        <H className="pv-pcard__name">{p.title}</H>
        <span className="pv-pcard__line">{p.outcome}</span>
        <span className="ac-card__facts">
          {tracks.length} tracks, {sessions} sessions.{" "}
          {hoursLabel(programMinutes(p, data.briefs))}.
        </span>
        {pr.total > 0 && (
          <span className="ac-meter" aria-hidden="true">
            <span
              style={{ width: `${Math.round((pr.done / pr.total) * 100)}%` }}
            />
          </span>
        )}
        <span className="ac-card__go">
          {pr.complete ? (
            <>
              <Award aria-hidden="true" size={18} strokeWidth={1.75} /> {state}
            </>
          ) : (
            <>
              {state ? `Continue. ${state}` : "Start"}{" "}
              <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
            </>
          )}
        </span>
      </span>
    </Link>
  );
}

/** Where to pick up a program: the first unfinished session of its first unfinished track. */
export function programResume(
  p: Program,
  data: AcademyData,
  progress: TracksProgress
): { href: string; label: string } | null {
  const pr = programProgress(p, data.briefs, progress);
  if (!pr.next) return null;
  const entry = progress.tracks[pr.next.slug];
  const n = pr.next.sessions.find(s => !entry?.done.includes(s.n))?.n ?? 1;
  const started = pr.done > 0;
  return {
    href: sessionHref(pr.next.slug, n),
    label: started
      ? `Continue: ${pr.next.title}, session ${n}`
      : `Start: ${pr.next.title}`,
  };
}

export function Unaccredited({ className = "" }: { className?: string }) {
  return (
    <p className={`ac-unaccredited ${className}`.trim()}>{UNACCREDITED}</p>
  );
}
