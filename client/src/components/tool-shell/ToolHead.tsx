/**
 * ToolHead: the top of every tool page. The kit's PageHead at the inner size
 * (art/InnerHead), with the tool's plain name, one line on what it does, and
 * two facts a reader should know before starting: about how long it takes,
 * and what it keeps on this device. For a self-check, `notDiagnosis` puts the
 * not-a-diagnosis line here, once.
 */
import type { ReactNode } from "react";
import { Clock, HardDrive } from "lucide-react";
import InnerHead from "@/components/art/InnerHead";
import type { PlateName } from "@/components/art/Plate";

export interface ToolHeadProps {
  /** The tool's own address, so the label names its door. */
  path: string;
  /** The tool's one plain name. */
  title: string;
  /** One sentence on what the tool does. */
  line: ReactNode;
  /** "About 5 minutes", "As long as you need". */
  time: string;
  /** What stays on this device, in plain words. */
  keeps: string;
  /** A self-check's not-a-diagnosis line. */
  notDiagnosis?: string;
  plate?: PlateName;
  children?: ReactNode;
}

export default function ToolHead({ path, title, line, time, keeps, notDiagnosis, plate, children }: ToolHeadProps) {
  return (
    <InnerHead path={path} title={title} line={line} plate={plate}>
      <dl className="ts-facts">
        <div className="ts-fact">
          <dt>
            <Clock size={16} strokeWidth={1.75} aria-hidden="true" />
            <span>How long</span>
          </dt>
          <dd>{time}</dd>
        </div>
        <div className="ts-fact">
          <dt>
            <HardDrive size={16} strokeWidth={1.75} aria-hidden="true" />
            <span>What this keeps</span>
          </dt>
          <dd>{keeps}</dd>
        </div>
      </dl>
      {notDiagnosis && <p className="ts-note">{notDiagnosis}</p>}
      {children}
    </InnerHead>
  );
}
