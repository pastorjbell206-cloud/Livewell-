/**
 * Post-purchase download page for "What Belongs to the Poor"
 * (/what-belongs-to-the-poor/thank-you). Stripe redirects here after payment;
 * the gated PDF is unlocked by verifying the paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function WhatBelongsToThePoorThankYou() {
  return <EbookThankYou slug="what-belongs-to-the-poor" title="What Belongs to the Poor" />;
}
