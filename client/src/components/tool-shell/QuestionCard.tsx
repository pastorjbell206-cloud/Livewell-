/**
 * QuestionCard: the one question card every tool uses. One question, its
 * answers as large full-width choices (44px and more), built on real radio
 * buttons (one answer) or checkboxes (several), inside a fieldset whose legend
 * is the question. So the browser and screen readers already know what it is:
 * Tab reaches the group, the arrow keys move between radio answers, Space
 * picks. On top of that the number keys 1 to 9 pick the answer with that
 * number, as the plan for the tools asks.
 *
 * Controlled: the host keeps the answer (and saves it with useToolProgress).
 */
import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import { Check } from "lucide-react";

export interface QuestionOption {
  value: string;
  label: string;
  /** A second, quieter line under the label. */
  hint?: string;
}

interface Common {
  /** The question, as the legend. */
  question: ReactNode;
  /** A line under the question. */
  help?: ReactNode;
  options: QuestionOption[];
  /** Show the number keys beside each answer (default true). */
  numbered?: boolean;
  /** Lay the answers out in columns from this many on wide screens. */
  columns?: 1 | 2 | 3;
  className?: string;
}

interface Single extends Common {
  multiple?: false;
  value: string | null;
  onChange: (value: string) => void;
}

interface Multiple extends Common {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
}

export type QuestionCardProps = Single | Multiple;

export default function QuestionCard(props: QuestionCardProps) {
  const { question, help, options, numbered = true, columns = 1, className } = props;
  const name = useId();
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const chosen = (v: string) => (props.multiple ? props.value.includes(v) : props.value === v);

  const pick = (v: string) => {
    if (props.multiple) {
      const has = props.value.includes(v);
      props.onChange(has ? props.value.filter((x) => x !== v) : [...props.value, v]);
    } else props.onChange(v);
  };

  // 1 to 9 pick the answer with that number and move focus to it.
  const onKeyDown = (e: KeyboardEvent<HTMLFieldSetElement>) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "TEXTAREA" || (tag === "INPUT" && !["radio", "checkbox"].includes((e.target as HTMLInputElement).type))) return;
    const n = Number(e.key);
    if (!Number.isInteger(n) || n < 1 || n > Math.min(9, options.length)) return;
    e.preventDefault();
    pick(options[n - 1].value);
    refs.current[n - 1]?.focus();
  };

  return (
    <fieldset className={`ts-q${className ? ` ${className}` : ""}`} onKeyDown={onKeyDown}>
      <legend className="ts-q__legend">{question}</legend>
      {help && <p className="ts-q__help">{help}</p>}
      <div className={`ts-q__options ts-q__options--${columns}`}>
        {options.map((o, i) => {
          const on = chosen(o.value);
          return (
            <label key={o.value} className={`ts-q__option${on ? " is-on" : ""}`}>
              <input
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="ts-q__input"
                type={props.multiple ? "checkbox" : "radio"}
                name={name}
                value={o.value}
                checked={on}
                onChange={() => pick(o.value)}
              />
              <span className="ts-q__mark" aria-hidden="true">
                {on ? <Check size={16} strokeWidth={2} /> : numbered && i < 9 ? i + 1 : null}
              </span>
              <span className="ts-q__text">
                <span className="ts-q__label">{o.label}</span>
                {o.hint && <span className="ts-q__hint">{o.hint}</span>}
              </span>
            </label>
          );
        })}
      </div>
      {numbered && options.length > 1 && (
        <p className="ts-q__keys">
          Keys 1 to {Math.min(9, options.length)} pick an answer{props.multiple ? "; press again to clear it" : ""}.
        </p>
      )}
    </fieldset>
  );
}
