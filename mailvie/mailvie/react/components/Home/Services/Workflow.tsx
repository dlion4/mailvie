import { HomeIntegration, RandfishkinAvatar, SparktoSquareLogo } from "../../../constants/images";

export function ManageWorkflow() {
  return (
    <section className="section section--emerald">
      <div className="container-fluid">
        <header className="section__header">
          <span className="section__label section__label--pill">
            03. Integrations
          </span>
          <h2 className="section__title">
            Build your own <em>workflow</em>.
          </h2>
          <p className="section__description">
            Hunter works seamlessly with the tools you already use: Google
            Sheets, your CRM or any other destination you’d like.
          </p>
        </header>
        <article className="feature-card feature-card--dots feature-card--integrations">
          <div className="feature-card__body">
            <div className="feature-card__heading feature-card__heading--big">
              <h3 className="feature-card__title">
                Rely on our native CRM integrations, our Zapier integration or
                our APIs
              </h3>
              <p className="feature-card__description">
                to sync your data to 5,000+ destinations.
              </p>
            </div>
            <div className="feature-card__actions">
              <a className="feature-card__link h-mainlink" href="/integrations">
                Explore the integrations
              </a>
              <a
                className="feature-card__link h-mainlink h-mainlink--no-arrow"
                href="/api"
              >
                Discover our API
              </a>
            </div>
          </div>
          <figure className="feature-card__visual">
            <img alt="" className="feature-card__img" src={HomeIntegration} />
          </figure>
        </article>
        <article className="feature-card feature-card--data-platform">
          <div className="feature-card__body">
            <div className="feature-card__heading feature-card__heading--big">
              <span className="section__label section__label--pill mb-2">
                Data Platform
              </span>
              <br />
              <h3 className="feature-card__title">
                Got a large appetite for Hunter’s industry leading email data?
              </h3>
              <p className="feature-card__description">
                Access Hunter at Scale using bulk tasks or the API, and only pay
                for the credits you need.
              </p>
            </div>
            <div className="feature-card__actions">
              <a
                className="feature-card__link h-mainlink"
                href="/data-platform"
              >
                Hunter’s Data Platform
              </a>
            </div>
          </div>
        </article>
        <div className="testimonial testimonial--emerald">
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
              My company, SparkToro, has used Hunter{" "}
              <em>to power our contact data</em> features for years. It’s not
              just that we love it; it’s that our customers do. Working with
              Hunter is easy, <em>the data’s great,</em> our customers are
              happy; what more could you ask for?
            </blockquote>
            <cite className="testimonial__source">
              <strong className="testimonial__author">Rand Fishkin</strong>
              <span className="testimonial__position">CEO at SparkToro</span>
            </cite>
          </div>
          <div className="testimonial__visual">
            <img
              alt=""
              className="testimonial__avatar"
              width="195"
              height="195"
              src={RandfishkinAvatar}
            />
            <img
              alt=""
              className="testimonial__logo"
              width="40"
              height="40"
              src={SparktoSquareLogo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
