/**
 * The seven roundels of the church's ages (the timeline on Home): a flame,
 * a palm, the creed, the gospel book, the cathedral, the open door with its
 * notice, the globe. Same hand as the plates, decorative only.
 */
import type { ReactNode } from "react";

export const ROUNDELS: Record<string, ReactNode> = {
  "apostolic": (<><path className="pl-paper" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-l" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-m" d="M40,62C22,52 28,34 40,14C52,34 58,52 40,62Z" /><path className="pl-l" d="M40,62C22,52 28,34 40,14C52,34 58,52 40,62Z" /><path className="pl-f" d="M40,58C34,50 36,42 40,34" /></>),
  "persecuted": (<><path className="pl-paper" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-l" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-l" d="M24,66C30,44 44,26 60,14" /><path className="pl-g" d="M30,52l-14,-8l18,-2ZM38,40l-14,-10l19,0ZM47,29l-12,-12l18,3ZM36,56l16,2l-10,-12ZM45,44l17,0l-12,-10Z" /></>),
  "councils": (<><path className="pl-paper" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-l" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-o" d="M20,18H60V62H20Z" /><path className="pl-f" d="M27,28H53M27,35H53M27,42H53M27,49H44" /><path className="pl-m" d="M48,50l8,0l0,12l-4,-4l-4,4Z" /></>),
  "early-medieval": (<><path className="pl-paper" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-l" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-o" d="M18,20C28,14 36,16 40,22C44,16 52,14 62,20V60C52,54 44,56 40,62C36,56 28,54 18,60Z" /><path className="pl-l" d="M40,22V62" /><path className="pl-m" d="M23,26h8v8h-8Z" /><path className="pl-f" d="M35,30h-1M23,40h12M23,47h12M45,30h12M45,38h12M45,46h12" /></>),
  "high-medieval": (<><path className="pl-paper" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-l" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-o" d="M22,66V36C22,22 32,14 40,8C48,14 58,22 58,36V66Z" /><path className="pl-l" d="M40,8V66M22,40H58" /><path className="pl-m" d="M30,30a10,10 0 0 1 10,-14v14Z" /><path className="pl-b" d="M41,31v-14a10,10 0 0 1 9,14Z" /></>),
  "reformation": (<><path className="pl-paper" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-l" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-o" d="M20,66V26a20,20 0 0 1 40,0V66Z" /><path className="pl-l" d="M40,8V66" /><path className="pl-m" d="M44,32h12v18H44Z" /><path className="pl-l" d="M44,32h12v18H44Z" /><path className="pl-k" d="M49,34h2v3h-2Z" /><path className="pl-f" d="M46,41h8M46,45h8" /></>),
  "modern-global": (<><path className="pl-paper" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-l" d="M2,40a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z" /><path className="pl-o" d="M14,40a26,26 0 1,0 52,0a26,26 0 1,0 -52,0Z" /><path className="pl-f" d="M14,40H66M40,14V66M40,14C24,26 24,54 40,66M40,14C56,26 56,54 40,66M18,27H62M18,53H62" /><path className="pl-m" d="M46,48a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z" /></>),
};

export default function Roundel({ era }: { era: string }) {
  const inner = ROUNDELS[era];
  return (
    <svg className="lw-roundel" viewBox="0 0 80 80" aria-hidden="true" focusable="false">
      {inner}
    </svg>
  );
}
