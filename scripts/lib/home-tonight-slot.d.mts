/** Types for home-tonight-slot.mjs, for the client tests that hold the static slot to HomeTonight.tsx. */
export interface SlotData {
  from: string;
  through: string;
  advent: string[];
  sets: [string, string, string][];
  fills: [string, string, string, number][];
  titles: Record<string, string[]>;
}
export interface SlotRow {
  lead: string;
  title: string;
  after: string;
}
export interface SlotLines {
  row: SlotRow | null | false;
  quiet: { lead: string; link: string } | null;
}
export const YEAR_MAP: string;
export function slotData(root: string): SlotData;
export function slotLines(d: SlotData, today: string): SlotLines | null;
export function fillSlot(slot: Element, lines: SlotLines | null): void;
export function slotScript(data: SlotData): string;
export function withSlotScript(html: string, script: string): string;
