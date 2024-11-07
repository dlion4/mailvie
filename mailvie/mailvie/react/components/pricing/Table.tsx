export function PricingTable(){
    return (
      <table className="pricing-table">
        <thead>
          <tr>
            <td className="pricing-table__top-hint-cell">
              <div className="billing-switcher">
                <button
                  className="billing-switcher__option is-active"
                  data-action="click-&gt;pricing-table#togglePrice"
                  data-billing-cycle="yearly"
                  data-pricing-table-target="yearlyBtn"
                  type="button"
                >
                  Pay yearly
                  <span className="billing-switcher__tag">-30%</span>
                </button>
                <button
                  className="billing-switcher__option"
                  data-action="click-&gt;pricing-table#togglePrice"
                  data-billing-cycle="monthly"
                  data-pricing-table-target="monthlyBtn"
                  type="button"
                >
                  Pay monthly
                </button>
              </div>
              <div className="visible-xs visible-sm">
                <label htmlFor="plan-field">Select a plan</label>
                <br />
                <select
                  className="h-select"
                  data-action="change-&gt;pricing-table#displayPlan"
                  id="plan-field"
                >
                  <option value="0">Free ($0)</option>
                  <option selected={true} value="1">
                    Starter ($49)
                  </option>
                  <option value="2">Growth ($149)</option>
                  <option value="4">Business ($499)</option>
                </select>
              </div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <strong className="pricing-table__plan-name">Free</strong>
              <div
                aria-hidden="true"
                className="pricing-table__price"
                data-pricing-table-target="monthlyPrice"
              >
                $0
              </div>
              <div
                aria-hidden="false"
                className="pricing-table__price"
                data-pricing-table-target="yearlyPrice"
              >
                $0
              </div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <strong className="pricing-table__plan-name">Starter</strong>
              <div
                aria-hidden="true"
                className="pricing-table__price"
                data-pricing-table-target="monthlyPrice"
              >
                $49
              </div>
              <div
                aria-hidden="false"
                className="pricing-table__price"
                data-pricing-table-target="yearlyPrice"
              >
                $34
              </div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <strong className="pricing-table__plan-name">Growth</strong>
              <div
                aria-hidden="true"
                className="pricing-table__price"
                data-pricing-table-target="monthlyPrice"
              >
                $149
              </div>
              <div
                aria-hidden="false"
                className="pricing-table__price"
                data-pricing-table-target="yearlyPrice"
              >
                $104
              </div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <strong className="pricing-table__plan-name">Business</strong>
              <div
                aria-hidden="true"
                className="pricing-table__price"
                data-pricing-table-target="monthlyPrice"
              >
                $499
              </div>
              <div
                aria-hidden="false"
                className="pricing-table__price"
                data-pricing-table-target="yearlyPrice"
              >
                $349
              </div>
            </td>
          </tr>
          <tr>
            <td className="pricing-table__discount"></td>
            <td
              className="pricing-table__plan-column pt-0 hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div
                aria-hidden="true"
                className="pricing-table__billing-cycle-hint"
                data-pricing-table-target="monthlyPrice"
              ></div>
              <div
                aria-hidden="false"
                className="pricing-table__billing-cycle-hint"
                data-pricing-table-target="yearlyPrice"
              ></div>
            </td>
            <td className="pricing-table__plan-column pt-0" data-plan-level="1">
              <div
                aria-hidden="true"
                className="pricing-table__billing-cycle-hint"
                data-pricing-table-target="monthlyPrice"
              >
                $49/month
              </div>
              <div
                aria-hidden="false"
                className="pricing-table__billing-cycle-hint"
                data-pricing-table-target="yearlyPrice"
              >
                $408/year
              </div>
            </td>
            <td
              className="pricing-table__plan-column pt-0 hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div
                aria-hidden="true"
                className="pricing-table__billing-cycle-hint"
                data-pricing-table-target="monthlyPrice"
              >
                $149/month
              </div>
              <div
                aria-hidden="false"
                className="pricing-table__billing-cycle-hint"
                data-pricing-table-target="yearlyPrice"
              >
                $1,248/year
              </div>
            </td>
            <td
              className="pricing-table__plan-column pt-0 hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div
                aria-hidden="true"
                className="pricing-table__billing-cycle-hint"
                data-pricing-table-target="monthlyPrice"
              >
                $499/month
              </div>
              <div
                aria-hidden="false"
                className="pricing-table__billing-cycle-hint"
                data-pricing-table-target="yearlyPrice"
              >
                $4,188/year
              </div>
            </td>
          </tr>
          <tr className="pricing-table__buttons-row pricing-table__row-section-end">
            <td>
              <div className="visible-lg visible-md">
                <strong>Unlimited seats</strong>.<br />
                Upgrade or downgrade at anytime.
              </div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <a className="h-button h-button--block" href="users/sign_up.html">
                Get started
              </a>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <a
                className="h-button h-button--primary h-button--block"
                href="users/sign_up-7.html?level=1&amp;upgrade_after_signup=true"
              >
                Get started
              </a>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <a
                className="h-button h-button--primary h-button--block"
                href="/users/sign_up?level=2&upgrade_after_signup=true"
              >
                Get started
              </a>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <a
                className="h-button h-button--primary h-button--block"
                href="/users/sign_up?level=4&upgrade_after_signup=true"
              >
                Get started
              </a>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="pricing-table__row pricing-table__row-section-start pricing-table__row-section-end">
            <td>
              <strong>
                Discover
                <button
                  className="question-circle"
                  data-bs-content="&lt;div class=&#39;black&#39;&gt;A comprehensive B2B database with powerful market segmentation features.&lt;/div&gt;"
                  data-bs-placement="top"
                  data-bs-toggle="popover"
                  type="button"
                >
                  <div className="far fa-question-circle"></div>
                </button>
              </strong>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-check"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row pricing-table__row-section-start">
            <td>
              <strong>Email searches &amp; verifications</strong>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            ></td>
            <td className="pricing-table__plan-column" data-plan-level="1"></td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            ></td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            ></td>
          </tr>
          <tr className="pricing-table__row">
            <td>
              <span aria-hidden="true" data-pricing-table-target="monthlyPrice">
                Monthly searches
              </span>
              <span aria-hidden="false" data-pricing-table-target="yearlyPrice">
                Yearly Searches
              </span>
              <button
                className="question-circle"
                data-bs-content="&lt;div class=&#39;black&#39;&gt;&lt;p&gt;Searches are counted when using the &lt;a href=&#39;/domain-search&#39;&gt;Domain Search&lt;/a&gt; or the &lt;a href=&#39;/email-finder&#39;&gt;Email Finder&lt;/a&gt; and email addresses are provided. More information can be found &lt;a href=&#39;https://help.hunter.io/en/articles/1911617-what-is-a-request-and-how-is-it-counted&#39;&gt;here&lt;/a&gt;.&lt;/p&gt;&lt;p&gt;Duplicate searches during the same monthly period are counted once.&lt;/p&gt;&lt;/div&gt;"
                data-bs-placement="top"
                data-bs-toggle="popover"
                type="button"
              >
                <div className="far fa-question-circle"></div>
              </button>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <span aria-hidden="true" data-pricing-table-target="monthlyPrice">
                25
              </span>
              <span aria-hidden="false" data-pricing-table-target="yearlyPrice">
                25<small className="text-muted">/month</small>
              </span>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <span aria-hidden="true" data-pricing-table-target="monthlyPrice">
                500
              </span>
              <span aria-hidden="false" data-pricing-table-target="yearlyPrice">
                6,000
              </span>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <span aria-hidden="true" data-pricing-table-target="monthlyPrice">
                5,000
              </span>
              <span aria-hidden="false" data-pricing-table-target="yearlyPrice">
                60,000
              </span>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <span aria-hidden="true" data-pricing-table-target="monthlyPrice">
                50,000
              </span>
              <span aria-hidden="false" data-pricing-table-target="yearlyPrice">
                600,000
              </span>
            </td>
          </tr>
          <tr className="pricing-table__row pricing-table__row-secondary">
            <td>Additional searches</td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            ></td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              +$10.00 per 100 credits
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              +$3.00 per 100 credits
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              +$1.50 per 100 credits
            </td>
          </tr>
          <tr className="pricing-table__row">
            <td>
              <span aria-hidden="true" data-pricing-table-target="monthlyPrice">
                Monthly verifications
              </span>
              <span aria-hidden="false" data-pricing-table-target="yearlyPrice">
                Yearly verifications
              </span>
              <button
                className="question-circle"
                data-bs-content="&lt;div class=&#39;black&#39;&gt;&lt;p&gt;One verification credit is counted every time you &lt;a href=&#39;/email-verifier&#39;&gt;verify&lt;/a&gt; an email address.&lt;/p&gt;&lt;p&gt;The same verification done several times during the same monthly period is counted only once.&lt;/p&gt;&lt;/div&gt;"
                data-bs-placement="top"
                data-bs-toggle="popover"
                type="button"
              >
                <div className="far fa-question-circle"></div>
              </button>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <span aria-hidden="true" data-pricing-table-target="monthlyPrice">
                50
              </span>
              <span aria-hidden="false" data-pricing-table-target="yearlyPrice">
                50<small className="text-muted">/month</small>
              </span>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <span aria-hidden="true" data-pricing-table-target="monthlyPrice">
                1,000
              </span>
              <span aria-hidden="false" data-pricing-table-target="yearlyPrice">
                12,000
              </span>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <span aria-hidden="true" data-pricing-table-target="monthlyPrice">
                10,000
              </span>
              <span aria-hidden="false" data-pricing-table-target="yearlyPrice">
                120,000
              </span>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <span aria-hidden="true" data-pricing-table-target="monthlyPrice">
                100,000
              </span>
              <span aria-hidden="false" data-pricing-table-target="yearlyPrice">
                1,200,000
              </span>
            </td>
          </tr>
          <tr className="pricing-table__row pricing-table__row-secondary">
            <td>Additional verifications</td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            ></td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              +$5.00 per 100 credits
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              +$1.50 per 100 credits
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              +$0.75 per 100 credits
            </td>
          </tr>
          <tr className="pricing-table__row">
            <td>
              Domain Search
              <button
                className="question-circle"
                data-bs-content="&lt;div class=&#39;black&#39;&gt;The Domain Search lets you find email addresses using a domain or company name.&lt;/div&gt;"
                data-bs-placement="top"
                data-bs-toggle="popover"
                type="button"
              >
                <div className="far fa-question-circle"></div>
              </button>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            ></td>
            <td className="pricing-table__plan-column" data-plan-level="1"></td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            ></td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            ></td>
          </tr>
          <tr className="pricing-table__row"></tr>
          <tr className="pricing-table__row pricing-table__row-secondary">
            <td>Access to full results</td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-times"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>

          <tr className="pricing-table__row"></tr>
          <tr className="pricing-table__row pricing-table__row-secondary pricing-table__row-section-end">
            <td>
              CSV exports
              <button
                className="question-circle"
                data-bs-content="&lt;div class=&#39;black&#39;&gt;Download the results of a single Domain Search in CSV, or use the &lt;a href=&#39;/bulks/domain-search&#39; target=&#39;_blank&#39;&gt;Bulk Domain Search&lt;/a&gt;.&lt;/div&gt;"
                data-bs-placement="top"
                data-bs-toggle="popover"
                type="button"
              >
                <div className="far fa-question-circle"></div>
              </button>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-times"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>

          <tr className="pricing-table__row pricing-table__row-section-start">
            <td>
              <strong>Campaigns</strong>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            ></td>
            <td className="pricing-table__plan-column" data-plan-level="1"></td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            ></td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            ></td>
          </tr>
          <tr className="pricing-table__row">
            <td>
              Connected email accounts
              <button
                className="question-circle"
                data-bs-content="&lt;div class=&#39;black&#39;&gt;The total number of email accounts you can use to send emails with Hunter.&lt;/div&gt;"
                data-bs-placement="top"
                data-bs-toggle="popover"
                type="button"
              >
                <div className="far fa-question-circle"></div>
              </button>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              1
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              3
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              10
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              20
            </td>
          </tr>
          <tr className="pricing-table__row pricing-table__row-secondary">
            <td>Additional email accounts</td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            ></td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              +$10/mo per account
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              +$10/mo per account
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              +$10/mo per account
            </td>
          </tr>
          <tr className="pricing-table__row">
            <td>
              SMTP/IMAP accounts
              <button
                className="question-circle"
                data-bs-content="&lt;div class=&#39;black&#39;&gt;Link Hunter to nearly every email provider using SMTP/IMAP.&lt;/div&gt;"
                data-bs-placement="top"
                data-bs-toggle="popover"
                type="button"
              >
                <div className="far fa-question-circle"></div>
              </button>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-times"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row">
            <td>
              Email account rotation
              <button
                className="question-circle"
                data-bs-content="&lt;div class=&#39;black&#39;&gt;Send a campaign from multiple email accounts.&lt;/div&gt;"
                data-bs-placement="top"
                data-bs-toggle="popover"
                type="button"
              >
                <div className="far fa-question-circle"></div>
              </button>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-times"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row">
            <td>Attachments &amp; images in emails</td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-times"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row">
            <td>Link tracking</td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-times"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row">
            <td>
              Custom tracking domain
              <button
                className="question-circle"
                data-bs-content="&lt;div class=&#39;black&#39;&gt;Use your own tracking domain name to improve your deliverability.&lt;/div&gt;"
                data-bs-placement="top"
                data-bs-toggle="popover"
                type="button"
              >
                <div className="far fa-question-circle"></div>
              </button>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-times"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-times"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row">
            <td>
              Reporting
              <button
                className="question-circle"
                data-bs-content="&lt;div class=&#39;black&#39;&gt;Access detailed reports to see how your campaigns are performing.&lt;/div&gt;"
                data-bs-placement="top"
                data-bs-toggle="popover"
                type="button"
              >
                <div className="far fa-question-circle"></div>
              </button>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-times"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row pricing-table__row-section-end">
            <td>Recipients per campaign</td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              500
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              2,500
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              5,000
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              10,000
            </td>
          </tr>
          <tr className="pricing-table__row pricing-table__row-section-start">
            <td>
              <strong>Integrations &amp; add-ons</strong>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            ></td>
            <td className="pricing-table__plan-column" data-plan-level="1"></td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            ></td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            ></td>
          </tr>
          <tr className="pricing-table__row">
            <td>Browser extensions</td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-check"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row">
            <td>Google Sheets add-on</td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-check"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row">
            <td>CRM Integrations</td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-check"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row pricing-table__row-section-end">
            <td>API</td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-check"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row pricing-table__row-section-start pricing-table__row-section-end">
            <td>
              <strong>Unlimited team members</strong>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              <div className="fal fa-check"></div>
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              <div className="fal fa-check"></div>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              <div className="fal fa-check"></div>
            </td>
          </tr>
          <tr className="pricing-table__row pricing-table__row-section-start pricing-table__row-section-end">
            <td>
              <strong>Support</strong>
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="0"
            >
              Regular
            </td>
            <td className="pricing-table__plan-column" data-plan-level="1">
              Priority
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="2"
            >
              Priority
            </td>
            <td
              className="pricing-table__plan-column hidden-xs hidden-sm"
              data-plan-level="4"
            >
              Priority + Account manager
            </td>
          </tr>
        </tbody>
      </table>
    );
}