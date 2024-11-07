export function MobileNavigation(){
    return (
      <>
        <button
          aria-controls="mobile-locale-switcher"
          aria-label="change language"
          className="locale-switcher__trigger"
          data-mobile-navigation-target="trigger"
          type="button"
        >
          <i className="far fa-globe"></i>
        </button>
        <div className="mobile-locale-switcher" id="mobile-locale-switcher">
          <ul className="locale-switcher-languages">
            <li className="locale-switcher-languages__item">
              <span aria-current="page" className="locale-switcher-languages__name">
                English
              </span>
            </li>
            <li className="locale-switcher-languages__item">
              <a
                className="locale-switcher-languages__name"
                data-action="click-&gt;locale-switch#click"
                data-controller="locale-switch"
                hrefLang="fr"
                lang="fr"
              >
                Français
              </a>
            </li>
          </ul>
        </div>
        <button
          aria-controls="mobile-navigation"
          aria-expanded="false"
          className="mobile-nav-trigger"
          data-action="click-&gt;mobile-navigation#toggle"
          data-mobile-navigation-target="trigger"
          type="button"
        >
          <div className="mobile-nav-trigger__burger"></div>
          <span className="sr-only">Toggle navigation</span>
        </button>
        <nav
          aria-hidden="true"
          className="mobile-main-nav"
          id="mobile-navigation"
          role="navigation"
        >
          <ul className="mobile-user-menu">
            <li className="mobile-user-menu__item">
              <a
                className="h-button h-button--block h-button--sm"
                data-turbo="false"
              >
                Log in
              </a>
            </li>
            <li className="mobile-user-menu__item">
              <a
                className="h-button h-button--block h-button--sm h-button--primary"
                data-turbo="false"
              >
                Create an account
              </a>
            </li>
          </ul>
          <ul className="mobile-main-menu">
            <li className="mobile-main-menu__item">
              <button
                aria-controls="mobile-products-submenu"
                aria-expanded="true"
                className="mobile-main-menu__link"
                data-action="click-&gt;mobile-navigation#toggleSubmenu"
                type="button"
              >
                Product
                <span className="mobile-main-menu__carret far fa-angle-down"></span>
              </button>
              <div
                aria-hidden="false"
                className="mobile-submenu"
                id="mobile-products-submenu"
              >
                <a
                  className="mobile-submenu-feature"
                  href="cold-email-software.html"
                >
                  <div className="highlighted-icon highlighted-icon--sm mobile-submenu-feature__icon">
                    <svg className="highlighted-icon__icon">
                      <use xlinkHref="#icon-campaign"></use>
                    </svg>
                  </div>
                  <div>
                    <strong className="mobile-submenu-feature__title">
                      Campaigns
                    </strong>
                    <span className="mobile-submenu-feature__desc">
                      Send cold emails.
                    </span>
                  </div>
                </a>
                <a className="mobile-submenu-feature" href="b2b-database.html">
                  <div className="highlighted-icon highlighted-icon--sm mobile-submenu-feature__icon">
                    <svg className="highlighted-icon__icon">
                      <use xlinkHref="#icon-company-discover"></use>
                    </svg>
                  </div>
                  <div>
                    <strong className="mobile-submenu-feature__title">
                      Discover
                    </strong>
                    <span className="mobile-submenu-feature__desc">
                      Find B2B leads.
                    </span>
                  </div>
                </a>
                <a className="mobile-submenu-feature" href="domain-search.html">
                  <div className="highlighted-icon highlighted-icon--sm mobile-submenu-feature__icon">
                    <svg className="highlighted-icon__icon">
                      <use xlinkHref="#icon-domain-search"></use>
                    </svg>
                  </div>
                  <div>
                    <strong className="mobile-submenu-feature__title">
                      Domain Search
                    </strong>
                    <span className="mobile-submenu-feature__desc">
                      Find email addresses of a company.
                    </span>
                  </div>
                </a>
                <a className="mobile-submenu-feature" href="email-finder.html">
                  <div className="highlighted-icon highlighted-icon--sm mobile-submenu-feature__icon">
                    <svg className="highlighted-icon__icon">
                      <use xlinkHref="#icon-email-finder"></use>
                    </svg>
                  </div>
                  <div>
                    <strong className="mobile-submenu-feature__title">
                      Email Finder
                    </strong>
                    <span className="mobile-submenu-feature__desc">
                      Find any professional&#39;s email address.
                    </span>
                  </div>
                </a>
                <a className="mobile-submenu-feature" href="email-verifier.html">
                  <div className="highlighted-icon highlighted-icon--sm mobile-submenu-feature__icon">
                    <svg className="highlighted-icon__icon">
                      <use xlinkHref="#icon-email-verifier"></use>
                    </svg>
                  </div>
                  <div>
                    <strong className="mobile-submenu-feature__title">
                      Email Verifier
                    </strong>
                    <span className="mobile-submenu-feature__desc">
                      Check the validity of an email address.
                    </span>
                  </div>
                </a>
                <a className="mobile-submenu-feature" href="intent-data.html">
                  <div className="highlighted-icon highlighted-icon--sm mobile-submenu-feature__icon">
                    <span
                      aria-hidden="true"
                      className="fal fa-radar highlighted-icon__icon"
                    ></span>
                  </div>
                  <div>
                    <strong className="mobile-submenu-feature__title">
                      Signals
                    </strong>
                    <span className="mobile-submenu-feature__desc">
                      Find prospects using intent data.
                    </span>
                  </div>
                </a>
                <a className="mobile-submenu-feature" href="integrations.html">
                  <div className="highlighted-icon highlighted-icon--sm mobile-submenu-feature__icon">
                    <svg className="highlighted-icon__icon">
                      <use xlinkHref="#icon-integrations"></use>
                    </svg>
                  </div>
                  <div>
                    <strong className="mobile-submenu-feature__title">
                      Integrations
                    </strong>
                    <span className="mobile-submenu-feature__desc">
                      Connect to your favorite application.
                    </span>
                  </div>
                </a>
                <a className="mobile-submenu-feature" href="api.html">
                  <div className="highlighted-icon highlighted-icon--sm mobile-submenu-feature__icon">
                    <svg className="highlighted-icon__icon">
                      <use xlinkHref="#icon-api"></use>
                    </svg>
                  </div>
                  <div>
                    <strong className="mobile-submenu-feature__title">API</strong>
                    <span className="mobile-submenu-feature__desc">
                      Integrate Hunter into your workflow.
                    </span>
                  </div>
                </a>
              </div>
            </li>
            <li className="mobile-main-menu__item">
              <a className="mobile-main-menu__link" href="data-platform.html">
                Data Platform
              </a>
            </li>
            <li className="mobile-main-menu__item">
              <a className="mobile-main-menu__link" href="pricing.html">
                Pricing
              </a>
            </li>
            <li className="mobile-main-menu__item">
              <a className="mobile-main-menu__link" href="blog/index.htm">
                Hunter Blog
              </a>
            </li>
            <li className="mobile-main-menu__item">
              <a className="mobile-main-menu__link" href="about.html">
                About us
              </a>
            </li>
            <li className="mobile-main-menu__item">
              <a className="mobile-main-menu__link" href="our-data.html">
                Our data
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
}