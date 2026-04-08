/**
 * Labels and text used inside the calculator UI.
 * All fields have built-in Bulgarian defaults — override only what you need.
 */
export type Dictionary = {
  /** Section heading. Default: "Калкулатор за нотариални такси" */
  title: string;
  /** First explanatory note shown above the form. */
  explanation1: string;
  /** Second explanatory note shown below the results. */
  explanation2: string;
  /** Note about tax-assessment value. */
  taxAssessmentNote: string;
  /** Label for the price input field. Default: "Изчисли всички разходи" */
  calculateAllCosts: string;
  /** Row label for local municipal tax. Default: "Местни данъци" */
  localTaxes: string;
  /** Row label for land-registry fee. Default: "Такса вписване" */
  registrationFee: string;
  /** Row label for the notary fee (before VAT). Default: "Нотариална такса" */
  notaryFees: string;
  /** Row label for VAT on the notary fee (20%). Default: "ДДС върху нотариалната такса" */
  notaryVat: string;
  /** Row label for the grand total. Default: "Всички разходи" */
  totalCosts: string;
  /** Currency symbol shown next to every monetary value. Default: "лв." */
  currency: string;
};

/**
 * Numeric configuration for the fee calculations.
 * These match the standard Bulgarian rates but can be overridden.
 */
export type Config = {
  /**
   * Exchange rate: how many units of the input price equal 1 BGN.
   * Set to 1 when the price is already in BGN (default).
   * Set to 1.95583 when the price is in EUR (the fixed EUR/BGN rate).
   */
  levaToCourse: number;
  /**
   * Land-registry fee as a percentage of the price (Агенция по Вписванията).
   * Default: 0.1 (= 0.1%)
   */
  regFeePercent: number;
  /**
   * Local municipal transfer tax as a percentage of the price (Местен данък).
   * Default: 2 (= 2%)
   */
  taxesFeePercent: number;
};

/**
 * Optional CSS class names injected into every rendered element.
 * No default classes are applied — the component is fully style-independent.
 * You can also target elements with the `data-nc-*` attributes.
 */
export type ClassNames = {
  /** Outermost wrapper `<div>` */
  container?: string;
  /** `<h3>` title */
  title?: string;
  /** Every `<p>` note / explanation element */
  note?: string;
  /** `<div>` wrapping the entire form */
  form?: string;
  /** `<div>` wrapping the price input row */
  inputRow?: string;
  /** `<label>` for the price input */
  inputLabel?: string;
  /** `<div>` wrapping `<input>` + currency symbol */
  inputWrapper?: string;
  /** `<input>` element */
  input?: string;
  /** Currency `<span>` next to the input */
  currency?: string;
  /** Each fee breakdown row `<div>` */
  row?: string;
  /** Fee label `<span>` */
  label?: string;
  /** Fee value `<span>` */
  value?: string;
  /** Grand-total row `<div>` */
  resultRow?: string;
  /** Grand-total label `<span>` */
  resultLabel?: string;
  /** Grand-total value `<span>` */
  resultValue?: string;
};

export type NotaryCalculatorProps = {
  /**
   * Initial price displayed in the input.
   * The unit must match `config.levaToCourse` (BGN by default).
   * @default 100000
   */
  defaultPrice?: number;

  /**
   * Override any subset of the UI labels.
   * Omitted keys fall back to built-in Bulgarian defaults.
   */
  dictionary?: Partial<Dictionary>;

  /**
   * Override fee calculation parameters.
   * Omitted keys fall back to standard Bulgarian rates.
   */
  config?: Partial<Config>;

  /**
   * CSS class names injected into individual elements.
   * No classes are applied by default — the component ships with zero styles.
   */
  classNames?: ClassNames;

  /**
   * Called whenever the user changes the price input.
   * @param price The new numeric price value.
   */
  onPriceChange?: (price: number) => void;

  /**
   * BCP 47 locale tag used for `toLocaleString` number formatting.
   * @default "bg-BG"
   */
  locale?: string;
};
