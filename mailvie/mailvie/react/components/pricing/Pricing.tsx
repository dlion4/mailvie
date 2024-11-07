
function EnterprisePricing() {
  return (
    <div className="pricing-enterprise">
      <div className="pricing-enterprise__heading">
        <strong className="pricing-enterprise__title">Enterprise plan</strong>
        <p className="pricing-enterprise__description">
          Need more? Tell us about your needs.
        </p>
      </div>
      <ul className="pricing-enterprise-advantages">
        <li className="pricing-enterprise-advantages__item">
          <span
            className="pricing-enterprise-advantages__icon far fa-check"
            aria-hidden="true"
          ></span>
          Dedicated account manager
        </li>
        <li className="pricing-enterprise-advantages__item">
          <span
            className="pricing-enterprise-advantages__icon far fa-check"
            aria-hidden="true"
          ></span>
          Higher rate limit
        </li>
        <li className="pricing-enterprise-advantages__item">
          <span
            className="pricing-enterprise-advantages__icon far fa-check"
            aria-hidden="true"
          ></span>
          On-Demand quotas
        </li>
        <li className="pricing-enterprise-advantages__item">
          <span
            className="pricing-enterprise-advantages__icon far fa-check"
            aria-hidden="true"
          ></span>
          Flexible quotas
        </li>
      </ul>
      <a className="h-button h-button--primary" href="enterprise.html">
        <div className="far fa-comment"></div>
        Contact sales
      </a>
    </div>
  );
}

function DataPlatformPricing() {
  return (
    <div className="pricing-data-platform">
      <header className="pricing-data-platform__header">
        <h2 className="pricing-data-platform__title">
          Access our data and pay as you go.
        </h2>
        <p className="pricing-data-platform__description">
          A flexible way to access our email finding and verification services
          at scale.
        </p>
      </header>
      <div className="pricing-calculator">
        <div className="pricing-calculator-input">
          <h3 className="pricing-calculator-input__title">
            How many credits do you want to purchase?
          </h3>
          {/* Repeat input structure as necessary */}
        </div>
        <div className="pricing-calculator-output">
          <p className="pricing-calculator-ouput__title">
            Your Bulk credits purchase
          </p>
          <strong className="pricing-calculator-ouput__value">$6,500.00</strong>
          <a className="h-button h-button--primary" href="users/sign_up-3.html">
            Get started
          </a>
        </div>
      </div>
    </div>
  );
}

export function PricingContext() {
  return (
    <section className="section--pricing">
      <div
        className="container-fluid container-fluid--md"
        data-controller="tabs"
      >
        <div className="mega-tabs">
          <div className="mega-tabs__item">
            <h2 className="mega-tabs__title">All-in-one outreach platform</h2>
            <a href="#pricing-outreach-platform" className="mega-tabs__link">
              Find, verify, and send cold emails
            </a>
          </div>
          <div className="mega-tabs__item">
            <h2 className="mega-tabs__title">Data Platform</h2>
            <a href="#pricing-data-platform" className="mega-tabs__link">
              Data solutions for your application
            </a>
          </div>
        </div>
        <div id="pricing-outreach-platform">
          <EnterprisePricing />
        </div>
        <div id="pricing-data-platform">
          <DataPlatformPricing />
        </div>
      </div>
    </section>
  );
}
