import { Hero } from "../../components/pricing/Hero";
import { PricingContext } from "../../components/pricing/Pricing";
import { ComforteSquareLogo, Images, StuartbrownAvatar } from "../../constants/images";
import { FAQItem } from "../../types";
import faqData from "../../data/index.json"

export function PricingPage() {
  const customerLogos = Images[0].category.type.logos; // Accessing logos directly
  const faqItems: FAQItem[] = faqData[0].FAQData; // Accessing the first FAQData array

  return (
    <>
      <Hero />
      <PricingContext />

      <section className="customers-logos customers-logos--light section section--lg">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="section__title section__title--sm">
                You are in good company.
              </h2>
              <div className="customers-logos__title text-center mb-8">
                Hunter is used by 5+ million users, including leading companies.
              </div>
              <div className="row row-cols-xl-auto customers-logos__logos">
                {customerLogos.slice(0, 5).map((customerLog, index) => {
                  return (
                    <figure className="col-3" key={index}>
                      <img
                        alt={customerLog.name}
                        width={customerLog.width}
                        height={customerLog.height}
                        src={customerLog.logo}
                      />
                    </figure>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="testimonial mt-20">
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
                Hunter is definitely <em>a worthwhile investment</em> given how
                quick and easy it is to deploy and how quickly you see a return
                on investment.
              </blockquote>
              <cite className="testimonial__source">
                <strong className="testimonial__author">Stuart Brown</strong>
                <span className="testimonial__position">
                  Global Sales Enablement Manager at comforte AG
                </span>
              </cite>
            </div>
            <div className="testimonial__visual">
              <img
                alt=""
                className="testimonial__avatar"
                width="195"
                height="195"
                src={StuartbrownAvatar}
              />
              <img
                alt=""
                className="testimonial__logo"
                width="40"
                height="40"
                src={ComforteSquareLogo}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--lg section--lightgrey section--bordered">
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-lg-4">
              <h2 className="section__title section__title--xs mt-0">
                Common questions about pricing
              </h2>
              <p className="section__description section__description--sm mb-4">
                If you can't find the answer to your question here, visit the
                dedicated section in our Help Center.
              </p>
              <a
                className="h-mainlink h-mainlink--sm mb-10"
                href="https://help.hunter.io/en/collections/99840-billing-subscriptions"
              >
                Visit the Help Center
              </a>
            </div>
            <div className="col-lg-7">
              <div className="toggle-table" data-controller="accordion">
                {faqItems.map((item) => (
                  <div key={item.id} className="accordion">
                    <h3 className="accordion__title">
                      <button
                        aria-controls={`${item.id}content`}
                        aria-expanded="true"
                        className="accordion__button"
                        id={`${item.id}title`}
                        type="button"
                      >
                        {item.question}
                      </button>
                    </h3>
                    <div
                      aria-labelledby={`${item.id}title`}
                      className="accordion__content"
                      id={`${item.id}content`}
                      role="region"
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        data-action="click-&gt;support-notification#launchChat"
        data-controller="support-notification"
        data-support-notification-target="notification"
        data-support-notification-wait-value="20"
        id="support-notification"
      >
        Questions about our pricing?
      </div>
    </>
  );
}