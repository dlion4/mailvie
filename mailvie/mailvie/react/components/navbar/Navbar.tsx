import { DesktopNavbar } from "./desktop";
import { MobileNavigation } from "./mobile";

export function MainNavbar() {
  return (
    <header
      className="main-header"
      data-controller="main-header"
      id="main-header"
      role="banner"
    >
      <div className="main-header__inner">
        <DesktopNavbar />
      </div>
      <div className="mobile-nav" data-controller="mobile-navigation">
        <MobileNavigation />
      </div>
    </header>
  );
}
