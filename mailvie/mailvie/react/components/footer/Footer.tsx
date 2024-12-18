import { FooterLogo } from "./FooterLogo";

export function MainFooter(){
    return (
      <>
        <footer className="main-footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-4">
                <div className="footer-legal">
                  {/* <svg
                    className="footer-legal__logo"
                    height="20"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.1"
                    viewBox="0 0 653.08002 116.24"
                    width="110"
                    xmlns="http://www.w3.org/2000/svg"
                  >
               
                    <defs id="defs6"></defs>
                    <g
                      id="g10"
                      transform="matrix(1.3333333,0,0,-1.3333333,0,116.24)"
                    >
                      <g id="g12" transform="scale(0.1)">
                        <path
                          d="m 1790.94,21.7969 c -6.47,-6.4727 -14.13,-9.6875 -23.01,-9.6875 h -92.03 c -8.89,0 -16.55,3.2148 -23,9.6875 -6.48,6.4531 -9.69,14.1133 -9.69,23.0078 V 352.371 c 0,50.043 -11.71,89.192 -35.12,117.457 -23.42,28.25 -57.72,42.383 -102.92,42.383 -41.99,0 -75.5,-14.531 -100.51,-43.594 -25.03,-29.062 -37.54,-67.808 -37.54,-116.246 V 44.8047 c 0,-8.8945 -3.23,-16.5547 -9.68,-23.0078 -6.47,-6.4727 -14.14,-9.6875 -23.01,-9.6875 h -92.03 c -8.89,0 -16.56,3.2148 -23.01,9.6875 -6.47,6.4531 -9.69,14.1133 -9.69,23.0078 V 839.152 c 0,8.875 3.22,16.539 9.69,23.008 6.45,6.453 14.12,9.692 23.01,9.692 h 92.03 c 8.87,0 16.54,-3.239 23.01,-9.692 6.45,-6.469 9.68,-14.133 9.68,-23.008 V 581.23 c 48.44,48.438 106.56,72.657 174.37,72.657 91.22,0 157.21,-26.246 197.99,-78.711 40.75,-52.481 61.15,-120.692 61.15,-204.645 V 44.8047 c 0,-8.8945 -3.24,-16.5547 -9.69,-23.0078"
                          id="path14"
                          style={{ stroke: "none" }}
                        ></path>
                        <path
                          d="m 1928.96,632.094 c 6.45,6.445 14.12,9.683 23.01,9.683 H 2044 c 8.87,0 16.54,-3.238 23.01,-9.683 6.45,-6.473 9.68,-14.137 9.68,-23.008 V 301.512 c 0,-50.856 10.69,-90.211 32.09,-118.059 21.38,-27.855 54.68,-41.781 99.9,-41.781 41.97,0 74.47,14.324 97.48,42.992 23.01,28.645 34.51,67.602 34.51,116.848 v 307.574 c 0,8.871 3.22,16.535 9.69,23.008 6.45,6.445 14.11,9.683 23,9.683 h 92.03 c 8.88,0 16.54,-3.238 23.01,-9.683 6.45,-6.473 9.69,-14.137 9.69,-23.008 V 44.8047 c 0,-8.8945 -3.24,-16.5547 -9.69,-23.0078 -6.47,-6.4727 -14.13,-9.6875 -23.01,-9.6875 h -92.03 c -8.89,0 -16.55,3.2148 -23,9.6875 -6.47,6.4531 -9.69,14.1133 -9.69,23.0078 V 72.6523 C 2293.84,24.2188 2237.74,0 2172.35,0 c -91.23,0 -156.2,26.0352 -194.95,78.1016 -38.75,52.0664 -58.13,120.4844 -58.13,205.2504 v 325.734 c 0,8.871 3.22,16.535 9.69,23.008"
                          id="path16"
                          style={{ stroke: "none" }}
                        ></path>
                        <path
                          d="m 3210.09,21.7969 c -6.47,-6.4727 -14.14,-9.6875 -23.01,-9.6875 h -92.03 c -8.89,0 -16.55,3.2148 -23.01,9.6875 -6.47,6.4531 -9.68,14.1133 -9.68,23.0078 V 352.371 c 0,50.043 -11.71,89.192 -35.12,117.457 -23.42,28.25 -57.73,42.383 -102.92,42.383 -41.99,0 -75.5,-14.531 -100.51,-43.594 -25.03,-29.062 -37.54,-67.808 -37.54,-116.246 V 44.8047 c 0,-8.8945 -3.23,-16.5547 -9.68,-23.0078 -6.48,-6.4727 -14.14,-9.6875 -23.01,-9.6875 h -92.03 c -8.89,0 -16.56,3.2148 -23.01,9.6875 -6.47,6.4531 -9.69,14.1133 -9.69,23.0078 V 609.086 c 0,8.871 3.22,16.535 9.69,23.008 6.45,6.445 14.12,9.683 23.01,9.683 h 92.03 c 8.87,0 16.53,-3.238 23.01,-9.683 6.45,-6.473 9.68,-14.137 9.68,-23.008 V 581.23 c 48.44,48.438 106.56,72.657 174.37,72.657 91.22,0 157.21,-26.246 197.98,-78.711 40.76,-52.481 61.15,-120.692 61.15,-204.645 V 44.8047 c 0,-8.8945 -3.23,-16.5547 -9.68,-23.0078"
                          id="path18"
                          style={{ stroke: "none" }}
                        ></path>
                        <path
                          d="m 3571.54,178.605 c 14.11,-14.128 38.54,-21.187 73.26,-21.187 h 73.86 c 8.88,0 16.54,-3.234 23.01,-9.688 6.45,-6.472 9.69,-14.136 9.69,-23.007 V 44.8047 c 0,-8.8945 -3.24,-16.5547 -9.69,-23.0078 -6.47,-6.4727 -14.13,-9.6875 -23.01,-9.6875 h -89.6 c -76.71,0 -135.23,18.7695 -175.59,56.3086 -40.37,37.535 -60.54,93.426 -60.54,167.707 v 260.344 h -79.92 c -8.89,0 -16.56,3.219 -23.01,9.687 -6.47,6.449 -9.68,14.114 -9.68,23.008 v 79.922 c 0,8.871 3.21,16.535 9.68,23.008 6.45,6.445 14.12,9.683 23.01,9.683 h 79.92 v 197.375 c 0,8.875 3.21,16.539 9.69,23.008 6.45,6.453 14.11,9.692 23,9.692 h 92.03 c 8.88,0 16.54,-3.239 23.01,-9.692 6.45,-6.469 9.69,-14.133 9.69,-23.008 V 641.777 h 156.2 c 8.88,0 16.54,-3.238 23.01,-9.683 6.45,-6.473 9.69,-14.137 9.69,-23.008 v -79.922 c 0,-8.894 -3.24,-16.559 -9.69,-23.008 -6.47,-6.468 -14.13,-9.687 -23.01,-9.687 h -156.2 V 239.758 c 0,-26.641 7.05,-47.035 21.19,-61.153"
                          id="path20"
                          style={{ stroke: "none" }}
                        ></path>
                        <path
                          d="m 4233.29,397.176 c -8.89,74.262 -53.7,111.398 -134.41,111.398 -41.98,0 -74.89,-11.308 -98.69,-33.902 -23.82,-22.606 -37.35,-48.434 -40.57,-77.496 z m 21.8,214.933 c 45.2,-27.847 80.1,-65.199 104.74,-112.007 24.61,-46.832 36.93,-98.082 36.93,-153.782 v -54.496 c 0,-8.886 -3.23,-16.554 -9.69,-23.008 -6.47,-6.468 -14.13,-9.683 -23,-9.683 h -404.45 c 0,-34.723 13.72,-62.36 41.18,-82.949 27.43,-20.586 60.13,-30.875 98.08,-30.875 44.39,0 78.71,9.269 102.93,27.851 8.87,6.449 16.14,10.899 21.79,13.317 5.64,2.421 13.32,3.632 23.01,3.632 h 96.87 c 8.87,0 16.54,-3.027 23.01,-9.082 6.45,-6.05 9.68,-13.129 9.68,-21.187 0,-16.957 -11.1,-38.356 -33.29,-64.1837 C 4320.66,69.8125 4288.57,47.4141 4246.61,28.4531 4204.62,9.49609 4155.37,0 4098.88,0 c -59.75,0 -112.01,13.7188 -156.81,41.168 -44.81,27.4336 -79.32,65.789 -103.53,115.035 -24.22,49.231 -36.33,106.145 -36.33,170.738 0,60.547 12.11,115.641 36.33,165.289 24.21,49.645 58.91,89 104.13,118.063 45.2,29.062 97.27,43.594 156.21,43.594 58.92,0 110.99,-13.926 156.21,-41.778"
                          id="path22"
                          style={{ stroke: "none" }}
                        ></path>
                        <path
                          d="m 4681.92,464.379 c -21.4,-21.399 -32.09,-56.309 -32.09,-104.742 V 44.8047 c 0,-8.8945 -3.24,-16.5547 -9.69,-23.0078 -6.47,-6.4727 -14.13,-9.6875 -23.01,-9.6875 h -92.02 c -8.9,0 -16.56,3.2148 -23.01,9.6875 -6.47,6.4531 -9.69,14.1133 -9.69,23.0078 V 609.086 c 0,8.871 3.22,16.535 9.69,23.008 6.45,6.445 14.11,9.683 23.01,9.683 h 92.02 c 8.88,0 16.54,-3.238 23.01,-9.683 6.45,-6.473 9.69,-14.137 9.69,-23.008 V 581.23 c 21.79,20.981 44.8,36.329 69.02,46.016 24.22,9.688 54.89,14.531 92.03,14.531 h 54.49 c 8.87,0 16.53,-3.238 23.01,-9.683 6.45,-6.473 9.68,-14.137 9.68,-23.008 v -79.922 c 0,-8.894 -3.23,-16.559 -9.68,-23.008 -6.48,-6.468 -14.14,-9.687 -23.01,-9.687 h -78.71 c -48.44,0 -83.36,-10.707 -104.74,-32.09"
                          id="path24"
                          style={{ stroke: "none" }}
                        ></path>
                        <path
                          d="m 537.324,496.277 c -18.015,-5.183 -37.879,-5.269 -56.453,-4.484 -21.605,0.914 -44.484,3.645 -64.433,12.512 -16.415,7.293 -29.583,20.453 -22.692,39.461 4.859,13.406 15.629,25.382 28.078,32.132 13.996,7.594 29.375,6.36 43.379,-0.503 15.723,-7.707 28.801,-20.243 40.656,-32.891 6.215,-6.633 12.145,-13.52 17.996,-20.473 2.7,-3.199 21.008,-21.484 13.469,-25.754 z m 299.461,-6.535 c -27.707,6.446 -60.445,4.137 -88.222,8.578 -43.754,7 -108.926,58.016 -144.254,109.871 -24.547,36.032 -36.262,72.731 -55.028,117.45 -13.097,31.214 -41.656,129.941 -81.593,83.73 -16.446,-19.031 -34.856,-81.68 -48.305,-80.797 -9.961,-2.316 -11.586,17.098 -14.738,25.395 -5.723,15.066 -8.758,32.496 -16.426,46.703 -6.129,11.355 -14.176,24.957 -26.5,30.476 -21.957,11.29 -48.43,-22.738 -61.567,-63.089 C 294.535,746.422 256.773,704.48 240.328,694.336 165.504,648.164 15.3281,599.52 0.0117188,437.543 c -0.0625001,-0.672 0,-2.715 2.5429712,-0.875 C 20.4648,449.637 223.613,595.953 93.2383,313.129 13.3672,139.855 399,29.5117 418.824,29.0625 c 2.672,-0.0586 2.477,1.1563 2.567,1.957 30.773,276.5545 334.781,247.4415 405.578,313.6755 70.16,65.629 71.59,129.157 9.816,145.047"
                          id="path26"
                          style={{ stroke: "none" }}
                        ></path>
                      </g>
                    </g>
                  </svg> */}
                  <FooterLogo />
                  <div className="footer-legal__copyright">
                    © 2015-2024 All Rights Reserved. Hunter® is a registered
                    trademark of Hunter Web Services, Inc.
                  </div>
                  <nav className="footer-socials">
                    <a
                      className="footer-socials__link fab fa-x-twitter"
                      href="https://twitter.com/EmailHunter"
                      target="_blank"
                    ></a>
                    <a
                      className="footer-socials__link fab fa-facebook"
                      href="https://www.facebook.com/EmailHunter.co"
                      target="_blank"
                    ></a>
                    <a
                      className="footer-socials__link fab fa-linkedin"
                      href="https://www.linkedin.com/company/hunter-io/"
                      target="_blank"
                    ></a>
                    <a
                      className="footer-socials__link fab fa-youtube"
                      href="https://www.youtube.com/channel/UCAaEqu5fM-nSVvWZ656nd5g"
                      target="_blank"
                    ></a>
                    <a
                      className="footer-socials__link fab fa-github"
                      href="https://github.com/hunter-io"
                      target="_blank"
                    ></a>
                  </nav>
                  <ul className="footer-legal-menu">
                    <li className="footer-legal-menu__item">
                      <a
                        className="footer-legal-menu__link"
                        href="terms-of-service.html"
                      >
                        Terms
                      </a>
                    </li>
                    <li className="footer-legal-menu__item">
                      <a
                        className="footer-legal-menu__link"
                        href="privacy-policy.html"
                      >
                        Privacy
                      </a>
                    </li>
                    <li className="footer-legal-menu__item">
                      <button
                        className="footer-legal-menu__link btn-empty"
                        data-action="modal-show#show"
                        data-controller="modal-show"
                        data-modal-show-modal-element-value="#manage-cookies-modal"
                        type="button"
                      >
                        Cookie preferences
                      </button>
                    </li>
                    <li className="footer-legal-menu__item">
                      <a
                        className="footer-legal-menu__link"
                        href="security-policy.html"
                      >
                        Security
                      </a>
                    </li>
                    <li className="footer-legal-menu__item">
                      <a
                        className="footer-legal-menu__link"
                        href="claim.html?ref=donotsell"
                      >
                        Do Not Sell My Info
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-md-3 col-6">
                <strong className="footer__title">Product</strong>
                <ul className="footer-menu">
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="b2b-database.html">
                      Discover
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="domain-search.html">
                      Domain Search
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="email-finder.html">
                      Email Finder
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="email-verifier.html">
                      Email Verifier
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="bulks.html">
                      Bulk tasks
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a
                      className="footer-menu__link"
                      href="cold-email-software.html"
                    >
                      Campaigns
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="intent-data.html">
                      Signals
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="integrations.html">
                      Integrations
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="api.html">
                      API
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-xl-2 col-md-3 col-6">
                <strong className="footer__title">Add-ons</strong>
                <ul className="footer-menu">
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="chrome.html">
                      Chrome extension
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="firefox.html">
                      Firefox add-on
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="edge.html">
                      Edge add-on
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="sheets.html">
                      Google Sheets add-on
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a
                      className="footer-menu__link"
                      href="https://www.getmailtracker.com/"
                    >
                      MailTracker
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="techlookup.html">
                      TechLookup
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="templates.html">
                      Templates
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-xl-2 col-md-3 col-6">
                <strong className="footer__title">Company</strong>
                <ul className="footer-menu">
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="about.html">
                      About us
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="careers.html">
                      {" "}
                      Careers{" "}
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="our-data.html">
                      Our data
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="blog/index.htm">
                      Hunter Blog
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a
                      className="footer-menu__link"
                      href="engineering/index.htm"
                    >
                      Engineering Blog
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a
                      className="footer-menu__link"
                      href="affiliate-program.html"
                    >
                      Affiliate Program
                    </a>
                  </li>
                  <li className="footer-menu__item">
                    <a className="footer-menu__link" href="press.html">
                      Press resources
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-xl-2 col-md-3 col-6">
                <div className="phones-footer">
                  <strong className="footer__title">Support</strong>
                  <ul className="footer-menu">
                    <li className="footer-menu__item">
                      <a className="footer-menu__link" href="contact.html">
                        Contact us
                      </a>
                    </li>
                    <li className="footer-menu__item">
                      <a
                        className="footer-menu__link"
                        href="https://help.hunter.io"
                      >
                        Help Center
                      </a>
                    </li>
                    <li className="footer-menu__item">
                      <a className="footer-menu__link" href="claim-1.html">
                        Claim
                      </a>
                    </li>
                    <li className="footer-menu__item">
                      <a
                        className="footer-menu__link"
                        href="security-bounty-program.html"
                      >
                        Bug Bounty
                      </a>
                    </li>
                    <li className="footer-menu__item">
                      <a
                        className="footer-menu__link"
                        data-controller="uptime-status"
                        data-uptime-status-connected-value="false"
                        href="https://status.hunter.io"
                        target="_blank"
                      >
                        <span
                          className="footer-status__dot"
                          data-uptime-status-target="dot"
                        ></span>
                        <span
                          className="footer-status__description"
                          data-uptime-status-target="description"
                        >
                          All Systems Operational
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
}