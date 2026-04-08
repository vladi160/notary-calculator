/**
 * Calculates the Bulgarian notary fee using the official tier-based tariff
 * (Тарифа за нотариалните такси към Закона за нотариусите и нотариалната дейност — ЗННД).
 *
 * Input and output are both in BGN (лева).
 * The fee is capped at 6 000 BGN per the regulation.
 *
 * @param priceInLeva - Property price in Bulgarian Lev (BGN).
 * @returns Notary fee in BGN, rounded to two decimal places, capped at 6 000 BGN.
 */
export function calcNotaryFee(priceInLeva: number): number {
  if (priceInLeva <= 0) return 0;

  let fee: number;

  if (priceInLeva <= 100) {
    fee = 30;
  } else if (priceInLeva <= 1_000) {
    fee = 30 + (priceInLeva - 100) * 0.015;
  } else if (priceInLeva <= 10_000) {
    fee = 43.5 + (priceInLeva - 1_000) * 0.013;
  } else if (priceInLeva <= 50_000) {
    fee = 160.5 + (priceInLeva - 10_000) * 0.008;
  } else if (priceInLeva <= 100_000) {
    fee = 480.5 + (priceInLeva - 50_000) * 0.005;
  } else if (priceInLeva <= 500_000) {
    fee = 730.5 + (priceInLeva - 100_000) * 0.002;
  } else {
    fee = 1_530.5 + (priceInLeva - 500_000) * 0.001;
  }

  return Math.min(fee, 6_000);
}
