import { ComplianceBadge } from "../../constants/images";
import { Approach } from "./DataApproach";
import { OurDataHero } from "./OurDataHero";

export function OurDataPage() {
  return (
    <>
      <OurDataHero />
      <Approach />
      <section className="section section--darkgrey section-crawler pb-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 col-lg-7">
              <h2 className="section__title">
                Synchronized with the entire web.
              </h2>
              <p className="section__description section__description--light">
                Every day, Hunter visits millions of web pages to find contact
                information for all types of businesses. Like a search engine,
                we maintain an index of the entire web and use it to source
                verified email addresses that fuel your email outreach.
              </p>
            </div>
          </div>
          <div className="row mt-30 mb-20">
            <div className="col-md-4">
              <div className="stat-highlight">
                <strong className="stat-highlight__title">90M</strong>
                Web pages crawled every day.
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-highlight">
                <strong className="stat-highlight__title">550M</strong>
                Public sources of data.
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-highlight">
                <strong className="stat-highlight__title">117M</strong>
                Professional email addresses indexed.
              </div>
            </div>
          </div>
          <div className="crawler-chart">
            <div className="crawler-chart__title">
              Number of pages crawled over the last 30 days ↓
            </div>
            <div
              className="crawler-chart__chart"
              data-controller="crawler-chart"
              data-crawler-chart-target="crawlChartContainer"
            >
              <div className="light-grey gap-top-md">
                Loading the statistics…
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-standard my-20">
        <div className="container-fluid container-fluid--sm">
          <header className="section__header section__header--full">
            <h2 className="section__title">
              Building a standard to connect businesses.
            </h2>
            <p className="section__description">
              Data providers typically compile dozens of often private and
              undisclosed sources. At Hunter, we believe data should be
              processed transparently in a manner every stakeholder approves of.
              To do so, we follow four principles.
            </p>
            <img
              alt=""
              className="mt-10 mb-20"
              width="304"
              height="48"
              src={ComplianceBadge}
            />
          </header>
          <div className="row justify-content-between">
            <div className="col-md-6 col-lg-5">
              <h3 className="section-standard__subtitle">
                Data distributed with Hunter has disclosed public sources.
              </h3>
            </div>
            <div className="col-md-6">
              <div className="section__description section__description--sm">
                <p>
                  All the contacts in the{" "}
                  <a href="domain-search.html">Domain Search</a> are returned
                  with information about where and when we found them.
                </p>
                <p>
                  In the <a href="email-finder.html">Email Finder</a>, we
                  indicate if the result is a guess or if it has public sources.
                  The guessed email addresses are based on the public data
                  available at the domain name level.
                </p>
              </div>
            </div>
          </div>
          <hr className="h-separator my-14" />
          <div className="row justify-content-between">
            <div className="col-md-6 col-lg-5">
              <h3 className="section-standard__subtitle">
                Data that no longer has public sources is removed.
              </h3>
            </div>
            <div className="col-md-6">
              <div className="section__description section__description--sm">
                After six months, we remove contact or company information that
                no longer has public sources. Before removing the data, we
                display the &quot;Removed&quot; label for the data sources that
                can no longer be found online.
              </div>
            </div>
          </div>
          <hr className="h-separator my-14" />
          <div className="row justify-content-between">
            <div className="col-md-6 col-lg-5">
              <h3 className="section-standard__subtitle">
                Data subjects have control over their data.
              </h3>
            </div>
            <div className="col-md-6">
              <div className="section__description section__description--sm">
                Anyone can easily remove their contact information by{" "}
                <a href="claim-1.html">claiming their email address</a>. The
                owner can edit all the fields associated with an email address.
                In case of deletion, the email address and all related data are
                removed.
              </div>
            </div>
          </div>
          <hr className="h-separator my-14" />
          <div className="row justify-content-between">
            <div className="col-md-6 col-lg-5">
              <h3 className="section-standard__subtitle">
                Website owners have control over how we index their pages.
              </h3>
            </div>
            <div className="col-md-6">
              <div className="section__description section__description--sm">
                <p>
                  You can identify the robot used by Hunter with the User-Agent
                  described on <a href="robot.html">this page</a>.
                </p>
                <p>
                  It follows the{" "}
                  <a
                    href="https://developers.google.com/search/reference/robots_txt"
                    target="_blank"
                  >
                    robots.txt standard
                  </a>
                  , so you can disallow it from accessing your website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
