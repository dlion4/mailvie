

import HomeHeroVisual   from "../../../static/assets/home-hero-visual.svg"

export function Hero() {
  return (
    <section className="hero-banner">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="hero-banner__title">
              <em>Connect</em> with <br />
              any professional.
            </h1>
            <p className="hero-banner__description">
              Hunter is your all-in-one email outreach platform. Find and
              connect with the people that matter to your business.
            </p>
            <div className="hero-banner__actions">
              <a
                className="h-button h-button--primary h-button--lg"
                href="/users/sign_up"
              >
                Get started for free
              </a>
              <a className="h-mainlink" href="/pricing">
                See our plans
              </a>
            </div>
            <div className="hero-banner__hint">
              No credit card required. Free plan.
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="hero-banner__animation"
              data-controller="lottie-player"
              data-lottie-player-renderer-value="canvas"
              //   data-lottie-player-src-value="assets/home-hero-lottiefile-9e1c147011c3f5a78f4f580e60db829eddd1e5d40e5eebdb46397983f199c22f.json"
            >
              <img
                alt=""
                className="hero-banner__animation-placeholder"
                width="660"
                height="333"
                src={HomeHeroVisual}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
