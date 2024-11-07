import {
  HomeDiscoverVisual,
  HomeDomainSearchVisual,
  HomeEmailFinderVisual,
  IntercomSquare,
  SeanGallerAvatar,
} from "../../../constants/images";

export function LeadIdentification() {
  return (
    <>
      <section className="section section--cyan">
        <div className="container-fluid">
          <header className="section__header">
            <span className="section__label section__label--pill">
              01. Data
            </span>
            <h2 className="section__title">
              Identify relevant leads and find their contact details.{" "}
              <em>In seconds</em>.
            </h2>
            <p className="section__description">
              Hunter uses a combination of proprietary technology and artificial
              intelligence to find, verify, and enrich contact details.
            </p>
          </header>
          <div className="row">
            <div className="col-12">
              <article className="feature-card feature-card--square feature-card--discover">
                <div className="feature-card__body">
                  <div className="feature-card__heading feature-card__heading--big">
                    <h3 className="feature-card__title">Discover.</h3>
                    <p className="feature-card__description">
                      Identify relevant leads based on your ideal customer
                      profile.
                    </p>
                  </div>
                  <a
                    className="feature-card__link h-mainlink"
                    href="/b2b-database"
                  >
                    Find companies
                  </a>
                </div>
                <figure className="feature-card__visual">
                  <img
                    alt=""
                    className="feature-card__img"
                    width="741"
                    height="380"
                    src={HomeDiscoverVisual}
                  />
                </figure>
              </article>
            </div>
            <div className="col-12">
              <article className="feature-card feature-card--square feature-card--domain-search">
                <div className="feature-card__body">
                  <div className="feature-card__heading feature-card__heading--big">
                    <h3 className="feature-card__title">Domain Search.</h3>
                    <p className="feature-card__description">
                      Find the best person to contact from a company name or
                      website.
                    </p>
                  </div>
                  <a
                    className="feature-card__link h-mainlink"
                    href="/domain-search"
                  >
                    Try it now
                  </a>
                  <p className="feature-card__hint">No account required.</p>
                </div>
                <figure className="feature-card__visual">
                  <img
                    alt=""
                    className="feature-card__img"
                    width="609"
                    height="328"
                    src={HomeDomainSearchVisual}
                  />
                </figure>
              </article>
            </div>
            <div className="col-sm-6">
              <article className="feature-card feature-card--sm feature-card--square feature-card--email-finder">
                <div className="feature-card__body">
                  <div className="feature-card__heading">
                    <h3 className="feature-card__title">Email Finder.</h3>
                    <p className="feature-card__description">
                      Type a name, get a verified email address. Our high match
                      rate helps you get the most from your lists.
                    </p>
                  </div>
                  <a
                    className="feature-card__link h-mainlink"
                    href="/email-finder"
                  >
                    Find Email
                  </a>
                  <p className="feature-card__hint">No account required.</p>
                </div>
                <figure className="feature-card__visual">
                  <img
                    alt="hello"
                    className="feature-card__img"
                    width="365"
                    height="206"
                    src={HomeEmailFinderVisual}
                  />
                </figure>
              </article>
            </div>
            <div className="col-sm-6">
              <article className="feature-card feature-card--sm feature-card--square feature-card--email-verifier">
                <div className="feature-card__body">
                  <div className="feature-card__heading">
                    <h3 className="feature-card__title">Email Verifier.</h3>
                    <p className="feature-card__description">
                      Avoid bounces and protect your sender reputation.
                    </p>
                  </div>
                  <a
                    className="feature-card__link h-mainlink"
                    href="/email-verifier"
                  >
                    Verify Email
                  </a>
                  <p className="feature-card__hint">No account required.</p>
                </div>
                <figure className="feature-card__visual">
                  <img
                    alt=""
                    className="feature-card__img"
                    width="246"
                    height="244"
                    src={HomeEmailFinderVisual}
                  />
                </figure>
              </article>
            </div>
          </div>
          <div className="testimonial">
            <svg
              className="testimonial__quotes"
              fill="none"
              height="127"
              viewBox="0 0 155 127"
              width="155"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M34.6922 127C23.6788 127 15.1434 123.701 9.08606 117.104C3.02869 110.232 0 100.61 0 88.2403C0 76.145 2.61568 62.5379 7.84705 47.4188C13.3538 32.2998 20.6501 16.4935 29.7362 0H73.1015V2.47404C66.7688 13.4697 61.1244 23.9156 56.1684 33.8117C51.4877 43.4329 47.4953 52.5043 44.1913 61.026C52.176 62.6753 58.3711 66.3864 62.7764 72.1591C67.1818 77.9318 69.3845 85.2165 69.3845 94.013C69.3845 103.909 66.3558 111.881 60.2984 117.929C54.5164 123.976 45.981 127 34.6922 127ZM116.591 127C105.577 127 97.0419 123.701 90.9846 117.104C84.9272 110.232 81.8985 100.61 81.8985 88.2403C81.8985 76.145 84.5142 62.5379 89.7455 47.4188C95.2522 32.2998 102.549 16.4935 111.635 0H155V2.47404C148.667 13.4697 143.023 23.9156 138.067 33.8117C133.386 43.4329 129.394 52.5043 126.09 61.026C134.075 62.6753 140.27 66.3864 144.675 72.1591C149.08 77.9318 151.283 85.2165 151.283 94.013C151.283 103.909 148.254 111.881 142.197 117.929C136.415 123.976 127.879 127 116.591 127Z"></path>
            </svg>
            <div className="testimonial__content">
              <blockquote className="testimonial__quote">
                Hunter is a great tool for{" "}
                <em>saving time and building pipelines and prospecting.</em>{" "}
                Before we had Hunter in place I was spending a long time
                guessing emails and using up valuable time every day. The email
                verifier is also a <em>game changer for our team.</em>
              </blockquote>
              <cite className="testimonial__source">
                <strong className="testimonial__author">Sean Gallagher</strong>
                <span className="testimonial__position">
                  Growth Manager at Intercom
                </span>
              </cite>
            </div>
            <div className="testimonial__visual">
              <img
                alt=""
                className="testimonial__avatar"
                width="195"
                height="195"
                src={SeanGallerAvatar}
              />
              <img
                alt=""
                className="testimonial__logo"
                width="40"
                height="40"
                src={IntercomSquare}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
