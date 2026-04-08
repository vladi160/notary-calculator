import { useState } from "react";
import { NotaryCalculator } from "notary-calculator";
import "./App.css";

const EN_DICTIONARY = {
  title: "Bulgarian Notary Fee Calculator",
  explanation1:
    "Estimate your costs when buying property in Bulgaria.",
  explanation2:
    "Amounts are approximate. Exact values depend on the notary and municipality.",
  taxAssessmentNote:
    "If the tax assessment value exceeds the contract price, the higher amount is used.",
  calculateAllCosts: "Property price",
  localTaxes: "Local transfer tax",
  registrationFee: "Land Registry fee",
  notaryFees: "Notary fee (excl. VAT)",
  notaryVat: "VAT on notary fee (20%)",
  totalCosts: "Total costs",
  currency: "BGN",
};

type Lang = "bg" | "en";

export default function App() {
  const [lang, setLang] = useState<Lang>("bg");
  const [lastPrice, setLastPrice] = useState<number | null>(null);

  return (
    <main>
      <header>
        <h1>notary-calculator</h1>
        <p className="subtitle">
          Bulgarian notary fee calculator — style-independent React component
        </p>
        <div className="lang-toggle">
          <button
            className={lang === "bg" ? "active" : ""}
            onClick={() => setLang("bg")}
          >
            🇧🇬 Bulgarian
          </button>
          <button
            className={lang === "en" ? "active" : ""}
            onClick={() => setLang("en")}
          >
            🇬🇧 English labels
          </button>
        </div>
      </header>

      <section className="demo-section">
        <h2>Default (no styles)</h2>
        <p className="section-desc">
          The component renders with zero CSS. Bring your own styles.
        </p>
        <div className="bare-demo">
          <NotaryCalculator
            defaultPrice={150000}
            dictionary={lang === "en" ? EN_DICTIONARY : undefined}
            onPriceChange={(p) => setLastPrice(p)}
          />
          {lastPrice !== null && (
            <p className="callback-log">
              onPriceChange callback fired → price = {lastPrice.toLocaleString("bg-BG")}
            </p>
          )}
        </div>
      </section>

      <section className="demo-section">
        <h2>Styled via <code>classNames</code> prop</h2>
        <p className="section-desc">
          Pass CSS class names to any element. Below uses the bundled demo CSS.
        </p>
        <NotaryCalculator
          defaultPrice={250000}
          dictionary={lang === "en" ? EN_DICTIONARY : undefined}
          classNames={{
            container: "nc nc-card",
            title: "nc-title",
            note: "nc-note",
            form: "nc-form",
            inputRow: "nc-row nc-input-row",
            inputLabel: "nc-label",
            inputWrapper: "nc-input-wrapper",
            input: "nc-input",
            currency: "nc-currency",
            row: "nc-row",
            label: "nc-label",
            value: "nc-value",
            resultRow: "nc-row nc-result-row",
            resultLabel: "nc-result-label",
            resultValue: "nc-result-value",
          }}
        />
      </section>

      <section className="demo-section">
        <h2>EUR price with fixed EUR/BGN rate</h2>
        <p className="section-desc">
          Set <code>config.levaToCourse</code> to 1.95583 to convert EUR prices.
          The fee tiers (defined in BGN by law) are applied correctly.
        </p>
        <NotaryCalculator
          defaultPrice={76700}
          dictionary={{
            ...(lang === "en" ? EN_DICTIONARY : {}),
            currency: "€",
            title:
              lang === "en"
                ? "Notary fees — price in EUR"
                : "Нотариални такси — цена в EUR",
          }}
          config={{ levaToCourse: 1.95583 }}
          classNames={{
            container: "nc nc-card",
            title: "nc-title",
            note: "nc-note",
            form: "nc-form",
            inputRow: "nc-row nc-input-row",
            inputLabel: "nc-label",
            inputWrapper: "nc-input-wrapper",
            input: "nc-input",
            currency: "nc-currency",
            row: "nc-row",
            label: "nc-label",
            value: "nc-value",
            resultRow: "nc-row nc-result-row",
            resultLabel: "nc-result-label",
            resultValue: "nc-result-value",
          }}
        />
      </section>

      <footer>
        <a
          href="https://github.com/vladi160/notary-calculator"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        &nbsp;·&nbsp;
        <a
          href="https://www.npmjs.com/package/notary-calculator"
          target="_blank"
          rel="noreferrer"
        >
          npm
        </a>
      </footer>
    </main>
  );
}
