import {
  AcquireSquareLogo,
  AndrewgazdeckiAvatar,
  HomeCampaignDeliverability,
  HomeCampaignSteps,
  HomePersonalization,
  HomePersonalizationOptions,
} from "../../../constants/images";

export function HandleCampaign() {
  return (
    <section className="section section--cardinal">
      <div className="container-fluid">
        <header className="section__header">
          <span className="section__label section__label--pill">
            02. Campaigns
          </span>
          <h2 className="section__title">
            Cold emailing that <em>just works</em>.
          </h2>
          <p className="section__description">
            With Hunter Campaigns, you can maximize the potential of your
            prospecting lists and increase your chances of receiving more
            replies. Compose emails, schedule follow-ups and get precise reports
            of your campaign performance.
          </p>
        </header>
        <div className="row">
          <div className="col-12">
            <article className="feature-card feature-card--hatch feature-card--personal-emails">
              <div className="feature-card__body">
                <div className="feature-card__heading feature-card__heading--big">
                  <h3 className="feature-card__title">
                    Send personal emails, at scale.
                  </h3>
                  <p className="feature-card__description">
                    Easily personalize and review the emails you send so they
                    always sound personal and relevant.
                  </p>
                </div>
                <a
                  className="feature-card__link h-mainlink"
                  href="/cold-email-software"
                >
                  Start your first campaign
                </a>
                <p className="feature-card__hint">It’s free.</p>
              </div>
              <figure className="feature-card__visual">
                <img
                  alt=""
                  className="feature-card__img"
                  width="611"
                  height="304"
                  src={HomePersonalization}
                />
                <img
                  alt=""
                  className="feature-card--personal-emails__img-options"
                  width="183"
                  height="163"
                  src={HomePersonalizationOptions}
                />
              </figure>
            </article>
          </div>
          <div className="col-md-6">
            <article className="feature-card feature-card--sm feature-card--hatch feature-card--deliverability">
              <div className="feature-card__body">
                <div className="feature-card__heading">
                  <h3 className="feature-card__title">
                    Reach inboxes, not the spam folder.
                  </h3>
                  <p className="feature-card__description">
                    Hunter verifies your lists and sends emails from your own
                    Gmail, Google Workspace or Outlook account for optimal
                    deliverability.
                  </p>
                </div>
                <a
                  className="feature-card__link h-mainlink"
                  href="/cold-email-software"
                >
                  Try it
                </a>
              </div>
              <figure className="feature-card__visual">
                <img
                  alt=""
                  className="feature-card__img"
                  width="414"
                  height="296"
                  src={HomeCampaignDeliverability}
                />
              </figure>
            </article>
          </div>
          <div className="col-md-6">
            <article className="feature-card feature-card--sm feature-card--hatch feature-card--campaigns-steps">
              <div className="feature-card__body">
                <div className="feature-card__heading">
                  <h3 className="feature-card__title">Powerful, yet simple.</h3>
                  <p className="feature-card__description">
                    Campaigns includes the exact features you need for outreach
                    success.
                  </p>
                </div>
                <a
                  className="feature-card__link h-mainlink"
                  href="/cold-email-software"
                >
                  Try it
                </a>
              </div>
              <figure className="feature-card__visual">
                <img
                  alt=""
                  className="feature-card__img"
                  width="136"
                  height="260"
                  src={HomeCampaignSteps}
                />
              </figure>
            </article>
          </div>
        </div>
        <div className="testimonial testimonial--cardinal">
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
              We use Hunter Campaigns to source qualified buyers for some of our
              clients. <em>The&nbsp;product is incredibly easy to use</em> and
              delivered <em>fantastic results.</em>
            </blockquote>
            <cite className="testimonial__source">
              <strong className="testimonial__author">Andrew Gazdecki</strong>
              <span className="testimonial__position">CEO at Acquire.com</span>
            </cite>
          </div>
          <div className="testimonial__visual">
            <img
              alt=""
              className="testimonial__avatar"
              width="195"
              height="195"
              src={AndrewgazdeckiAvatar}
            />
            <img
              alt=""
              className="testimonial__logo"
              width="40"
              height="40"
              src={AcquireSquareLogo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
