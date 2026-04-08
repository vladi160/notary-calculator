# notary-calculator

[![npm version](https://img.shields.io/npm/v/notary-calculator.svg)](https://www.npmjs.com/package/notary-calculator)
[![npm downloads](https://img.shields.io/npm/dm/notary-calculator.svg)](https://www.npmjs.com/package/notary-calculator)
[![CI](https://github.com/vladi160/notary-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/vladi160/notary-calculator/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**🇧🇬 Bulgaria-only.** A React component that calculates notary fees, local transfer tax, and land-registry fees when buying real estate in Bulgaria.

> **Live demo →** [vladi160.github.io/notary-calculator](https://vladi160.github.io/notary-calculator)

---

## Why Bulgaria-only?

The fee calculation is governed by the **Тарифа за нотариалните такси към Закона за нотариусите и нотариалната дейност (ЗННД)** — a tier-based schedule defined in Bulgarian law, denominated in BGN, and **capped at 6 000 BGN**. The local transfer tax (Местен данък) and land-registry fee (Агенция по Вписванията) are also specific to the Bulgarian legal and fiscal system.

This component is not applicable in other jurisdictions.

---

## Installation

```bash
npm install notary-calculator
# or
yarn add notary-calculator
# or
pnpm add notary-calculator
```

**Peer dependencies** (install separately if not already present):

```bash
npm install react react-dom
```

---

## Quick start

```tsx
import { NotaryCalculator } from "notary-calculator";

export default function MyPage() {
  return <NotaryCalculator defaultPrice={150_000} />;
}
```

No styles are applied by default. The component renders clean HTML — style it however you like (see [Styling](#styling) below).

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultPrice` | `number` | `100000` | Initial price shown in the input (in the currency determined by `levaToCourse`). |
| `dictionary` | `Partial<Dictionary>` | Bulgarian labels | Override any or all UI labels. Omitted keys fall back to built-in Bulgarian text. |
| `config` | `Partial<Config>` | Standard BG rates | Override fee percentages or the EUR→BGN exchange rate. |
| `classNames` | `ClassNames` | `{}` | CSS class names injected into individual elements. No classes are applied by default. |
| `onPriceChange` | `(price: number) => void` | — | Callback fired whenever the user updates the price input. |
| `locale` | `string` | `"bg-BG"` | BCP 47 locale tag used for `toLocaleString` number formatting (e.g. `"de-DE"`, `"en-US"`). |

---

### `Dictionary` — UI labels

```ts
type Dictionary = {
  title: string;               // "Калкулатор за нотариални такси"
  explanation1: string;        // note above the form
  explanation2: string;        // note below the results
  taxAssessmentNote: string;   // tax-assessment warning note
  calculateAllCosts: string;   // label for the price input
  localTaxes: string;          // "Местен данък (прехвърляне)"
  registrationFee: string;     // "Такса вписване (Агенция по Вписванията)"
  notaryFees: string;          // "Нотариална такса (без ДДС)"
  notaryVat: string;           // "ДДС върху нотариалната такса (20%)"
  totalCosts: string;          // "Общо разходи"
  currency: string;            // "лв."
};
```

---

### `Config` — fee parameters

```ts
type Config = {
  /**
   * Exchange rate: units of the input price per 1 BGN.
   * 1   → price already in BGN (default)
   * 1.95583 → price in EUR (fixed EUR/BGN peg)
   */
  levaToCourse: number;   // default: 1

  /**
   * Land-registry fee — Агенция по Вписванията (% of price).
   * default: 0.1  (= 0.1%)
   */
  regFeePercent: number;

  /**
   * Local transfer tax — Местен данък (% of price).
   * default: 2  (= 2%)
   */
  taxesFeePercent: number;
};
```

---

### `ClassNames` — element-level class injection

Every rendered element can receive a CSS class name. No classes are applied by default.

```ts
type ClassNames = {
  container?: string;      // outermost <div>
  title?: string;          // <h3> heading
  note?: string;           // explanation <p> elements
  form?: string;           // form wrapper <div>
  inputRow?: string;       // price-input row <div>
  inputLabel?: string;     // <label> for price input
  inputWrapper?: string;   // <div> wrapping input + currency
  input?: string;          // <input>
  currency?: string;       // currency <span> next to input
  row?: string;            // each fee row <div>
  label?: string;          // fee label <span>
  value?: string;          // fee value <span>
  resultRow?: string;      // total row <div>
  resultLabel?: string;    // total label <span>
  resultValue?: string;    // total value <span>
};
```

---

## Styling

The component ships with **zero CSS**. You have three options:

### Option A — `classNames` prop (recommended)

Pass your own class names to every rendered element:

```tsx
<NotaryCalculator
  classNames={{
    container: "my-calc",
    title: "my-calc__title",
    row: "my-calc__row",
    label: "my-calc__label",
    value: "my-calc__value",
    resultRow: "my-calc__row my-calc__row--total",
    resultValue: "my-calc__total-value",
    // ...
  }}
/>
```

Works with Tailwind CSS, CSS Modules, plain CSS classes — anything.

### Option B — `data-nc-*` attribute selectors

Every element has a `data-nc-*` attribute you can target in plain CSS without touching props:

```css
[data-nc-container] { font-family: sans-serif; }
[data-nc-title]     { font-size: 1.2rem; color: navy; }
[data-nc-input]     { border: 1px solid #ccc; padding: 4px 8px; }
[data-nc-result-row]{ background: #eef; font-weight: bold; }
```

Available attributes: `data-nc-container`, `data-nc-title`, `data-nc-note`, `data-nc-form`, `data-nc-row`, `data-nc-input-row`, `data-nc-fee-row`, `data-nc-result-row`, `data-nc-input`, `data-nc-input-label`, `data-nc-input-wrapper`, `data-nc-currency`, `data-nc-label`, `data-nc-value`, `data-nc-result-label`, `data-nc-result-value`.

### Option C — Tailwind CSS

```tsx
<NotaryCalculator
  classNames={{
    container: "rounded-lg border p-6 shadow-sm",
    title: "text-lg font-semibold text-blue-700 mb-3",
    form: "flex flex-col gap-2",
    row: "flex justify-between items-center py-1 border-b",
    label: "text-gray-600 text-sm",
    value: "font-medium",
    resultRow: "flex justify-between items-center py-2 bg-blue-50 rounded px-2 mt-1",
    resultLabel: "font-bold text-blue-800",
    resultValue: "font-bold text-blue-800 text-lg",
    input: "w-32 text-right border rounded px-2 py-1",
    inputRow: "flex justify-between items-center mb-2 border-b-2 pb-2",
  }}
/>
```

---

## Usage examples

### Prices in EUR (with fixed EUR/BGN peg)

The notary fee tiers are defined in BGN. Set `levaToCourse` to `1.95583` and the component automatically converts to/from BGN for the tier calculation.

```tsx
<NotaryCalculator
  defaultPrice={65_999}
  config={{ levaToCourse: 1.96, taxesFeePercent: 3, regFeePercent: 0.1 }}
  dictionary={{ currency: "EUR" }}
/>
```

### English labels

```tsx
<NotaryCalculator
  dictionary={{
    title: "Bulgarian Notary Fee Calculator",
    calculateAllCosts: "Property price",
    localTaxes: "Local transfer tax",
    registrationFee: "Land Registry fee",
    notaryFees: "Notary fee (excl. VAT)",
    notaryVat: "VAT on notary fee (20%)",
    totalCosts: "Total costs",
    currency: "BGN",
    explanation1: "Estimate your costs when buying property in Bulgaria.",
    explanation2: "Amounts are approximate.",
    taxAssessmentNote:
      "If the tax-assessed value exceeds the contract price, the higher figure is used.",
  }}
/>
```

### With price-change callback

```tsx
<NotaryCalculator
  defaultPrice={200_000}
  onPriceChange={(price) => console.log("New price:", price)}
/>
```

### Standalone `calcNotaryFee` utility

The tier-calculation function is exported separately for server-side or non-React use:

```ts
import { calcNotaryFee } from "notary-calculator";

const fee = calcNotaryFee(350_000); // → 1230.5 BGN
```

---

## Next.js (App Router)

The component uses `"use client"` internally, so it works in Server Components files — no wrapper needed.

```tsx
// app/property/[id]/page.tsx  — Server Component is fine
import { NotaryCalculator } from "notary-calculator";

export default function PropertyPage({ price }: { price: number }) {
  return <NotaryCalculator defaultPrice={price} />;
}
```

---

## Fee calculation details

| Fee | Formula | Notes |
|---|---|---|
| **Local transfer tax** (Местен данък) | `price × taxesFeePercent / 100` | Default 2%. Set by the municipality; most commonly 2–3%. |
| **Land-registry fee** (Агенция по Вписванията) | `price × regFeePercent / 100` | Default 0.1%. Fixed by regulation. |
| **Notary fee** (Нотариална такса) | Tier table per ЗННД (see below), capped at 6 000 BGN | Applied to the BGN-equivalent price. |
| **VAT on notary fee** | `notaryFee × 0.20` | Applied to the notary fee; currently 20%. |

### Notary fee tiers (BGN)

| Price range (BGN) | Marginal rate |
|---|---|
| up to 100 | flat 30 BGN |
| 101 – 1 000 | 1.5% |
| 1 001 – 10 000 | 1.3% |
| 10 001 – 50 000 | 0.8% |
| 50 001 – 100 000 | 0.5% |
| 100 001 – 500 000 | 0.2% |
| above 500 000 | 0.1% |
| **cap** | **6 000 BGN** |

---

## Publishing a new version

1. Bump the version in `package.json`.
2. Commit and tag: `git tag v1.x.x && git push --tags`.
3. The [publish workflow](.github/workflows/publish.yml) will run automatically and publish to npm.

> **Prerequisite:** Add your npm token as `NPM_TOKEN` in the GitHub repository secrets (**Settings → Secrets → Actions**).

---

## License

MIT © [vladi160](https://github.com/vladi160)
