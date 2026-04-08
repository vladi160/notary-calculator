"use client";

import { useMemo, useState } from "react";
import { calcNotaryFee } from "./calcNotaryFee";
import type { ClassNames, Config, Dictionary, NotaryCalculatorProps } from "./types";

const DEFAULT_DICTIONARY: Dictionary = {
  title: "Калкулатор за нотариални такси",
  explanation1:
    "Изчислете приблизителните разходи при покупка на имот в България.",
  explanation2:
    "Сумите са ориентировъчни. Точните стойности зависят от конкретния нотариус и общината.",
  taxAssessmentNote:
    "Данъчната оценка може да е по-висока от договорната цена — в такъв случай се използва по-високата стойност.",
  calculateAllCosts: "Цена на имота",
  localTaxes: "Местен данък (прехвърляне)",
  registrationFee: "Такса вписване (Агенция по Вписванията)",
  notaryFees: "Нотариална такса (без ДДС)",
  notaryVat: "ДДС върху нотариалната такса (20%)",
  totalCosts: "Общо разходи",
  currency: "лв.",
};

const DEFAULT_CONFIG: Config = {
  levaToCourse: 1,
  regFeePercent: 0.1,
  taxesFeePercent: 2,
};

/**
 * Fully style-independent Bulgarian notary fee calculator.
 *
 * Implements the official tier-based tariff under ЗННД, capped at 6 000 BGN.
 * No CSS is bundled — style via the `classNames` prop or `data-nc-*` attributes.
 *
 * @example
 * ```tsx
 * import { NotaryCalculator } from "notary-calculator";
 *
 * <NotaryCalculator defaultPrice={150000} />
 * ```
 */
export function NotaryCalculator({
  defaultPrice = 100_000,
  dictionary: dictionaryOverride,
  config: configOverride,
  classNames = {},
  onPriceChange,
  locale = "bg-BG",
}: NotaryCalculatorProps) {
  const dictionary: Dictionary = { ...DEFAULT_DICTIONARY, ...dictionaryOverride };
  const config: Config = { ...DEFAULT_CONFIG, ...configOverride };

  const [price, setPrice] = useState(defaultPrice);

  const { taxesFee, regFee, notaryFee, notaryVat, totalCosts } = useMemo(() => {
    const fees_taxes = (price * config.taxesFeePercent) / 100;
    const fees_reg = (price * config.regFeePercent) / 100;
    // Notary fee tiers are defined in BGN — convert to BGN, compute, then convert back.
    const priceInBgn = price * config.levaToCourse;
    const fees_notary = calcNotaryFee(priceInBgn) / config.levaToCourse;
    const fees_notary_vat = fees_notary * 0.2;
    return {
      taxesFee: fees_taxes,
      regFee: fees_reg,
      notaryFee: fees_notary,
      notaryVat: fees_notary_vat,
      totalCosts: fees_taxes + fees_reg + fees_notary + fees_notary_vat,
    };
  }, [price, config.taxesFeePercent, config.regFeePercent, config.levaToCourse]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const numValue = parseInt(raw, 10) || 0;
    setPrice(numValue);
    onPriceChange?.(numValue);
  };

  const fmt = (num: number) =>
    num.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const cx = (key: keyof ClassNames) => classNames[key] ?? undefined;

  return (
    <div className={cx("container")} data-nc-container>
      <h3 className={cx("title")} data-nc-title>
        {dictionary.title}
      </h3>

      <p className={cx("note")} data-nc-note>
        * {dictionary.explanation1}
      </p>

      <div className={cx("form")} data-nc-form>
        {/* Price input row */}
        <div className={cx("inputRow")} data-nc-row data-nc-input-row>
          <label htmlFor="nc-price-input" className={cx("inputLabel")} data-nc-input-label>
            {dictionary.calculateAllCosts}:
          </label>
          <div className={cx("inputWrapper")} data-nc-input-wrapper>
            <input
              id="nc-price-input"
              type="text"
              inputMode="numeric"
              className={cx("input")}
              data-nc-input
              value={price.toLocaleString(locale)}
              onChange={handleInputChange}
              aria-label={dictionary.calculateAllCosts}
            />
            <span className={cx("currency")} data-nc-currency>
              {dictionary.currency}
            </span>
          </div>
        </div>

        {/* Local taxes */}
        <div className={cx("row")} data-nc-row data-nc-fee-row>
          <span className={cx("label")} data-nc-label>
            {dictionary.localTaxes}:
          </span>
          <span className={cx("value")} data-nc-value>
            {fmt(taxesFee)} {dictionary.currency}
          </span>
        </div>

        {/* Registration fee */}
        <div className={cx("row")} data-nc-row data-nc-fee-row>
          <span className={cx("label")} data-nc-label>
            {dictionary.registrationFee}:
          </span>
          <span className={cx("value")} data-nc-value>
            {fmt(regFee)} {dictionary.currency}
          </span>
        </div>

        {/* Notary fee */}
        <div className={cx("row")} data-nc-row data-nc-fee-row>
          <span className={cx("label")} data-nc-label>
            {dictionary.notaryFees}:
          </span>
          <span className={cx("value")} data-nc-value>
            {fmt(notaryFee)} {dictionary.currency}
          </span>
        </div>

        {/* Notary VAT */}
        <div className={cx("row")} data-nc-row data-nc-fee-row>
          <span className={cx("label")} data-nc-label>
            {dictionary.notaryVat}:
          </span>
          <span className={cx("value")} data-nc-value>
            {fmt(notaryVat)} {dictionary.currency}
          </span>
        </div>

        {/* Total */}
        <div className={cx("resultRow")} data-nc-row data-nc-result-row>
          <span className={cx("resultLabel")} data-nc-result-label>
            {dictionary.totalCosts}:
          </span>
          <span className={cx("resultValue")} data-nc-result-value>
            {fmt(totalCosts)} {dictionary.currency}
          </span>
        </div>
      </div>

      <p className={cx("note")} data-nc-note>
        * {dictionary.explanation2}
      </p>
      <p className={cx("note")} data-nc-note>
        {dictionary.taxAssessmentNote}
      </p>
    </div>
  );
}
