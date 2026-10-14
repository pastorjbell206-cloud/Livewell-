/**
 * CrisisHelp — a quiet, consistent path to real help for the crisis-facing pages
 * (marriage in trouble, grief, anxiety, doubt, burnout). It is the compact form
 * of CrisisBlock, so its numbers come from the one verified data file
 * (data/crisis-resources.json) like every other help line on the site: validate
 * the person, point to real professional and emergency help, and say plainly
 * that this site supports that help and does not replace it. Never alarmist,
 * never a funnel — care before content.
 */
import { CrisisBlock } from "@/components/CrisisBlock";

export function CrisisHelp() {
  return <CrisisBlock variant="compact" />;
}
