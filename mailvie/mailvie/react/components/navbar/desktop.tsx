export function DesktopNavbar(){
    return (
      <>
        <div className="main-header__logo" data-controller="header-logo">
          <a
            className="main-header__home-link"
            data-action="contextmenu-&gt;header-logo#showRessourcesMenu click@window-&gt;header-logo#closeRessourcesMenu"
            data-target="header-logo.logo"
            href="index.htm"
            rel="home"
            title="home"
          >
            <svg
              className="main-header__logo"
              height="20"
              preserveAspectRatio="xMidYMid meet" // Use preserveAspectRatio instead of space version="1.1"
              viewBox="0 0 653.08002 116.24"
              width="110"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs id="defs6"></defs>
              <g id="g10" transform="matrix(1.3333333,0,0,-1.3333333,0,116.24)">
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
            </svg>
          </a>
          <div
            className="header-logo-ressources"
            data-header-logo-target="ressourcesMenu"
          >
            <button
              className="header-logo-ressources__link"
              data-action="click-&gt;copy#copy click-&gt;header-logo#closeRessourcesMenu"
              data-controller="copy"
              data-copy-text-value="&lt;svg width=&#39;110&#39; height=&#39;20&#39; fill=&#39;none&#39; xmlns=&#39;http://www.w3.org/2000/svg&#39;&gt;&lt;path d=&#39;M40.22 19.09a.706.706 0 0 1-.516.218h-2.067a.704.704 0 0 1-.517-.218.703.703 0 0 1-.217-.516v-6.908c0-1.123-.263-2.003-.789-2.637-.526-.635-1.296-.952-2.311-.952-.943 0-1.696.326-2.258.979-.562.652-.843 1.523-.843 2.61v6.908c0 .2-.072.371-.217.516a.706.706 0 0 1-.517.218h-2.067a.704.704 0 0 1-.516-.218.704.704 0 0 1-.218-.516V.734c0-.199.072-.371.218-.516A.706.706 0 0 1 27.9 0h2.067c.2 0 .372.073.517.218a.707.707 0 0 1 .217.516v5.793c1.088-1.088 2.393-1.632 3.916-1.632 2.049 0 3.53.59 4.447 1.768.915 1.178 1.373 2.71 1.373 4.595v7.316c0 .2-.073.371-.218.516ZM43.32 5.384a.706.706 0 0 1 .517-.217h2.066c.2 0 .372.073.517.217a.708.708 0 0 1 .218.517v6.908c0 1.142.24 2.025.72 2.65.48.626 1.228.94 2.244.94.942 0 1.672-.323 2.189-.966.517-.644.775-1.518.775-2.624V5.9c0-.2.072-.371.218-.517a.706.706 0 0 1 .516-.217h2.067c.2 0 .371.073.517.217a.707.707 0 0 1 .217.517v12.673c0 .2-.072.371-.217.516a.705.705 0 0 1-.517.218H53.3a.704.704 0 0 1-.516-.218.704.704 0 0 1-.218-.516v-.626c-1.052 1.088-2.312 1.632-3.78 1.632-2.049 0-3.508-.585-4.378-1.754-.87-1.17-1.306-2.706-1.306-4.61V5.901c0-.2.073-.371.218-.517ZM72.091 19.09a.706.706 0 0 1-.517.218h-2.066a.705.705 0 0 1-.517-.218.704.704 0 0 1-.218-.516v-6.908c0-1.123-.263-2.003-.788-2.637-.526-.635-1.297-.952-2.311-.952-.944 0-1.696.326-2.258.979-.562.652-.843 1.523-.843 2.61v6.908c0 .2-.072.371-.217.516a.706.706 0 0 1-.517.218h-2.067a.704.704 0 0 1-.517-.218.704.704 0 0 1-.217-.516V5.9c0-.2.072-.371.218-.517a.706.706 0 0 1 .516-.217h2.067c.2 0 .371.073.517.217a.708.708 0 0 1 .217.517v.626c1.088-1.088 2.393-1.632 3.916-1.632 2.049 0 3.53.59 4.446 1.768.916 1.178 1.374 2.71 1.374 4.595v7.316c0 .2-.073.371-.218.516ZM80.209 15.569c.316.317.865.475 1.645.475h1.659c.199 0 .371.073.516.218a.708.708 0 0 1 .218.517v1.795c0 .2-.073.371-.218.516a.706.706 0 0 1-.516.218H81.5c-1.722 0-3.037-.422-3.943-1.265-.907-.843-1.36-2.098-1.36-3.766V8.43h-1.794a.704.704 0 0 1-.517-.217.704.704 0 0 1-.218-.517V5.901c0-.2.072-.371.218-.517a.706.706 0 0 1 .517-.217h1.794V.734c0-.199.072-.371.218-.516A.705.705 0 0 1 76.931 0h2.067c.2 0 .372.073.517.218a.707.707 0 0 1 .218.516v4.433h3.507c.2 0 .372.073.517.217a.708.708 0 0 1 .218.517v1.795c0 .2-.073.372-.218.517a.706.706 0 0 1-.517.217h-3.507v5.765c0 .599.158 1.057.475 1.374ZM95.07 10.66c-.2-1.668-1.206-2.502-3.019-2.502-.942 0-1.681.254-2.216.762-.535.507-.839 1.088-.911 1.74h6.146Zm.49-4.827a6.412 6.412 0 0 1 2.352 2.516c.552 1.051.83 2.202.83 3.453v1.224c0 .2-.074.372-.219.517a.705.705 0 0 1-.516.217h-9.083c0 .78.308 1.4.925 1.863.616.462 1.35.694 2.202.694.997 0 1.768-.209 2.312-.626.2-.145.362-.245.49-.3.126-.053.298-.08.516-.08h2.175c.2 0 .372.067.517.203a.634.634 0 0 1 .218.476c0 .381-.25.862-.748 1.442-.499.58-1.22 1.083-2.162 1.509-.943.425-2.049.639-3.318.639-1.341 0-2.515-.308-3.521-.925-1.007-.616-1.782-1.477-2.325-2.583-.544-1.106-.816-2.384-.816-3.835 0-1.36.272-2.597.816-3.712a6.44 6.44 0 0 1 2.338-2.651c1.015-.653 2.185-.979 3.508-.979 1.324 0 2.493.313 3.508.938ZM105.145 9.15c-.48.481-.721 1.265-.721 2.353v7.07c0 .2-.072.372-.217.517a.706.706 0 0 1-.517.218h-2.066a.704.704 0 0 1-.517-.218.702.702 0 0 1-.218-.516V5.9c0-.2.072-.371.218-.517a.707.707 0 0 1 .517-.217h2.066c.199 0 .372.073.517.217a.706.706 0 0 1 .217.517v.626c.49-.471 1.007-.816 1.55-1.034.544-.217 1.233-.326 2.067-.326h1.224a.71.71 0 0 1 .517.217.706.706 0 0 1 .217.517v1.795c0 .2-.072.372-.217.517a.708.708 0 0 1-.517.217h-1.768c-1.088 0-1.872.24-2.352.72ZM12.067 8.435c-.405.116-.85.118-1.268.1-.485-.02-.999-.082-1.447-.28-.368-.165-.664-.46-.51-.887.11-.301.352-.57.631-.722.315-.17.66-.142.974.012.354.173.647.454.913.738.14.15.273.304.405.46.06.072.471.483.302.579Zm6.725.146c-.622-.144-1.357-.093-1.981-.192-.983-.158-2.446-1.303-3.24-2.468-.55-.809-.814-1.633-1.235-2.637-.295-.701-.936-2.919-1.833-1.88-.37.427-.783 1.834-1.085 1.814-.223.052-.26-.384-.33-.57-.13-.339-.197-.73-.37-1.05-.137-.254-.318-.56-.595-.684-.493-.253-1.087.51-1.382 1.417-.126.486-.974 1.428-1.344 1.656C3.717 5.024.344 6.116 0 9.754c-.001.015 0 .06.057.02.403-.292 4.965-3.578 2.037 2.774-1.794 3.891 6.867 6.369 7.312 6.38.06 0 .055-.027.057-.045.692-6.21 7.519-5.557 9.109-7.044 1.575-1.474 1.608-2.9.22-3.258Z&#39; fill=&#39;#FA5320&#39;/&gt;&lt;/svg&gt;"
              type="button"
            >
              Copy logo as SVG
            </button>
            <a className="header-logo-ressources__link" href="press.html">
              Press resources
            </a>
          </div>
        </div>
        <nav className="main-nav" role="navigation">
          <ul className="main-menu">
            <li className="main-menu__item" id="product-submenu-parent">
              <button
                aria-controls="product-submenu"
                className="main-menu__link"
                id="product-submenu-link"
                type="button"
              >
                Product
                <span className="far fa-angle-down"></span>
              </button>
              <div className="main-dropdown" id="product-submenu">
                <div className="main-dropdown__primary-wrapper">
                  <div className="main-dropdown__primary">
                    <strong className="main-dropdown__title">Product</strong>
                    <a
                      className="main-dropdown-feature"
                      href="cold-email-software.html"
                    >
                      <strong className="main-dropdown-feature__title">
                        Campaigns
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Send cold emails.
                      </span>
                    </a>
                    <a
                      className="main-dropdown-feature"
                      href="b2b-database.html"
                    >
                      <strong className="main-dropdown-feature__title">
                        Discover
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Find B2B leads.
                      </span>
                    </a>
                    <a
                      className="main-dropdown-feature"
                      href="domain-search.html"
                    >
                      <strong className="main-dropdown-feature__title">
                        Domain Search
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Find email addresses of a company.
                      </span>
                    </a>
                    <a
                      className="main-dropdown-feature"
                      href="email-finder.html"
                    >
                      <strong className="main-dropdown-feature__title">
                        Email Finder
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Find any professional&#39;s email address.
                      </span>
                    </a>
                    <a
                      className="main-dropdown-feature"
                      href="email-verifier.html"
                    >
                      <strong className="main-dropdown-feature__title">
                        Email Verifier
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Check the validity of an email address.
                      </span>
                    </a>
                    <a
                      className="main-dropdown-feature"
                      href="intent-data.html"
                    >
                      <strong className="main-dropdown-feature__title">
                        Signals
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Find prospects using intent data.
                      </span>
                    </a>
                    <a className="main-dropdown-feature" href="techlookup.html">
                      <strong className="main-dropdown-feature__title">
                        TechLookup
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        List websites by tech usage.
                      </span>
                    </a>
                  </div>
                  <div className="main-dropdown__primary">
                    <strong className="main-dropdown__title">
                      Data Platform
                    </strong>
                    <a
                      className="main-dropdown-feature"
                      href="data-platform.html"
                    >
                      <strong className="main-dropdown-feature__title">
                        Data Platform
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Industry-leading B2B email data at scale.
                      </span>
                    </a>
                    <a className="main-dropdown-feature" href="bulks.html">
                      <strong className="main-dropdown-feature__title">
                        Bulk tasks
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Find or verify email addresses in bulk.
                      </span>
                    </a>
                    <a className="main-dropdown-feature" href="api.html">
                      <strong className="main-dropdown-feature__title">
                        API
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Integrate Hunter into your workflow.
                      </span>
                    </a>
                    <hr className="main-dropdown__separator" />
                    <strong className="main-dropdown__title">
                      Integrations
                    </strong>
                    <a
                      className="main-dropdown-feature"
                      href="integrations.html"
                    >
                      <strong className="main-dropdown-feature__title">
                        Integrations
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Connect to your favorite application.
                      </span>
                    </a>
                    <a className="main-dropdown-feature" href="chrome.html">
                      <strong className="main-dropdown-feature__title">
                        Browser extension
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Find email addresses while you&#39;re browsing the web.
                      </span>
                    </a>
                    <a className="main-dropdown-feature" href="sheets.html">
                      <strong className="main-dropdown-feature__title">
                        Google Sheets add-on
                        <span className="main-dropdown-feature__arrow">→</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Find and verify email addresses in Google Sheets.
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="main-menu__item">
              <a className="main-menu__link" href="/pricing/">
                Pricing
              </a>
            </li>
            <li className="main-menu__item" id="resources-submenu-parent">
              <button
                aria-controls="resources-submenu"
                className="main-menu__link"
                id="resources-submenu-link"
                type="button"
              >
                Resources
                <span className="far fa-angle-down"></span>
              </button>
              <div className="main-dropdown" id="resources-submenu">
                <div className="main-dropdown__primary">
                  <a
                    className="main-dropdown-feature"
                    href="cold-email-guide/index.htm"
                    lang="en"
                  >
                    <span
                      aria-hidden="true"
                      className="far fa-book main-dropdown-feature__icon"
                    ></span>
                    <div>
                      <strong className="main-dropdown-feature__title">
                        Cold Email Guide
                        <span className="main-dropdown__label">new</span>
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Your guide to sending effective email outreach.
                      </span>
                    </div>
                  </a>
                  <a
                    className="main-dropdown-feature"
                    href="blog/index.htm"
                    lang="en"
                  >
                    <span
                      aria-hidden="true"
                      className="far fa-pen-nib main-dropdown-feature__icon"
                    ></span>
                    <div>
                      <strong className="main-dropdown-feature__title">
                        Blog
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Cold Email Outreach Strategies &amp; Growth.
                      </span>
                    </div>
                  </a>
                  <a className="main-dropdown-feature" href="templates.html">
                    <span
                      aria-hidden="true"
                      className="far fa-envelope-open-text main-dropdown-feature__icon"
                    ></span>
                    <div>
                      <strong className="main-dropdown-feature__title">
                        Templates
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Directory of best cold email templates.
                      </span>
                    </div>
                  </a>
                  <a className="main-dropdown-feature" href="webinars.html">
                    <span
                      aria-hidden="true"
                      className="far fa-video main-dropdown-feature__icon"
                    ></span>
                    <div>
                      <strong className="main-dropdown-feature__title">
                        Webinars
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Free video training sessions.
                      </span>
                    </div>
                  </a>
                  <a className="main-dropdown-feature" href="customers.html">
                    <span
                      aria-hidden="true"
                      className="far fa-building main-dropdown-feature__icon"
                    ></span>
                    <div>
                      <strong className="main-dropdown-feature__title">
                        Customer stories
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Discover how our customers are using Hunter.
                      </span>
                    </div>
                  </a>
                  <a
                    className="main-dropdown-feature"
                    href="https://help.hunter.io"
                    target="_blank"
                  >
                    <span
                      aria-hidden="true"
                      className="far fa-circle-question main-dropdown-feature__icon"
                    ></span>
                    <div>
                      <strong className="main-dropdown-feature__title">
                        Help Center
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Your questions on Hunter answered.
                      </span>
                    </div>
                  </a>
                </div>
                <div
                  className="main-dropdown__secondary"
                  data-controller="last-blog-post"
                >
                  <strong className="main-dropdown__title--light">
                    Featured on the blog
                  </strong>
                  <div className="main-dropdown-blog-post">
                    <img
                      alt=""
                      className="main-dropdown-blog-post__image"
                      data-last-blog-post-target="featuredPostImg"
                    />
                    <a
                      className="main-dropdown-blog-post__link"
                      data-last-blog-post-target="featuredPostTitle"
                    ></a>
                  </div>
                </div>
              </div>
            </li>
            <li className="main-menu__item" id="company-submenu-parent">
              <button
                aria-controls="company-submenu"
                className="main-menu__link"
                id="company-submenu-link"
                type="button"
              >
                Company
                <span className="far fa-angle-down"></span>
              </button>
              <div className="main-dropdown" id="company-submenu">
                <div className="main-dropdown__primary">
                  <a className="main-dropdown-feature" href="about.html">
                    <span
                      aria-hidden="true"
                      className="far fa-users main-dropdown-feature__icon"
                    ></span>
                    <div>
                      <strong className="main-dropdown-feature__title">
                        About us
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Meet the team behind Hunter.
                      </span>
                    </div>
                  </a>
                  <a className="main-dropdown-feature" href="our-data.html">
                    <span
                      aria-hidden="true"
                      className="far fa-database main-dropdown-feature__icon"
                    ></span>
                    <div>
                      <strong className="main-dropdown-feature__title">
                        Our data
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        How our data is sourced and processed.
                      </span>
                    </div>
                  </a>
                  <a className="main-dropdown-feature" href="careers.html">
                    <span
                      aria-hidden="true"
                      className="far fa-user-plus main-dropdown-feature__icon"
                    ></span>
                    <div>
                      <strong className="main-dropdown-feature__title">
                        Careers
                      </strong>
                      <span className="main-dropdown-feature__desc">
                        Our current open positions.
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </li>
          </ul>
          <ul className="user-nav" role="navigation">
            <li className="locale-switcher">
              <button
                aria-label="change language"
                className="locale-switcher__trigger"
                type="button"
              >
                <i className="far fa-globe"></i>
              </button>
              <div className="main-dropdown" id="locale-submenu">
                <ul className="locale-switcher-languages">
                  <li className="locale-switcher-languages__item">
                    <span
                      aria-current="page"
                      className="locale-switcher-languages__name"
                    >
                      English
                    </span>
                  </li>
                  <li className="locale-switcher-languages__item">
                    <a
                      className="locale-switcher-languages__name"
                      data-action="click-&gt;locale-switch#click"
                      data-controller="locale-switch"
                      href="fr.html"
                      hrefLang="fr"
                      lang="fr"
                    >
                      Français
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="user-nav__item">
              <a
                className="user-nav__link"
                data-turbo="false"
                href="users/sign_up.html"
              >
                Create an account
              </a>
            </li>
            <li className="user-nav__item">
              <a
                className="user-nav__btn"
                data-turbo="false"
                href="users/sign_in.html"
              >
                Log in →
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
}