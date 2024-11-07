import React, { StrictMode } from "react"; // Ensure React is imported
import { createRoot } from "react-dom/client";
import { App } from "./mailvie/react"; // Component for the first root
import { MainNavbar } from "./mailvie/react/components/navbar/Navbar";
import { MainFooter } from "./mailvie/react/components/footer/Footer";
import { PricingPage } from "./mailvie/react/pages/pricing";
import { TeamPageSection } from "./mailvie/react/components/team/Team";
import { CustomerLogo } from "./mailvie/react/components/team/CustomerLogo";
import { OurDataPage } from "./mailvie/react/pages/about/OurData";
import { BlogList } from "./mailvie/react/pages/updates/blog";
// import { App1 } from "./mailvie/react1"; // Component for the second root
// import { App2 } from "./mailvie/react2"; // Component for the third root

// Function to render a component into a specified root element
export const renderComponent = (id: string, Component: React.FC) => {
  const container = document.getElementById(id);
  if (container) {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        {/* Header */}
        <MainNavbar />
        {/* /Header */}
        <Component />
        {/* Footer */}
        <MainFooter />
        {/* /Footer */}
      </StrictMode>
    );
  }
};

export const renderComponentOnlyContent = (id: string, Component: React.FC) => {
  const container = document.getElementById(id);
  if (container) {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <Component />
      </StrictMode>
    );
  }
};

// Render components conditionally based on the existence of root elements
renderComponent("root", App); // Renders App into #root
renderComponent("pricing", PricingPage); // Renders App1 into #root1
renderComponentOnlyContent("our-data-page", OurDataPage); // Renders App1 into #root1
renderComponentOnlyContent("our-customer-logo-about-page", CustomerLogo); // Renders App1 into #root1
renderComponentOnlyContent("update-blog-post", BlogList); // Renders App1 into #root1
// renderComponentOnlyContent("our-team-section-page", TeamPageSection); // Renders App1 into #root1
// renderComponent("root2", App2);  // Renders App2 into #root2
