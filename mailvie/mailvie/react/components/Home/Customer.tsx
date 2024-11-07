import { SliderConfiguration } from "../../conf/SliderConf";
import { Images } from "../../constants/images";

export function CustomerList() {
  const customerLogos = Images[0].category.type.logos; // Accessing logos directly
  const settings = SliderConfiguration({ slidesToShow: 3 }); // You can dynamically change this value
  console.log(settings)

  return (
    <section className="customers-logos">
      <div className="container-fluid">
        {customerLogos.length > 0 && (
          <div className="row">
            <div className="col-xl-2">
              <div className="customers-logos__title">
                Trusted by leading&nbsp;companies.
              </div>
            </div>
            <div className="col-xl-10">
              <div className="row row-cols-md-auto customers-logos__logos">
                {customerLogos.map((customerLog, index) => {
                  return (
                    <figure className="col-4" key={index}>
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
        )}
      </div>
    </section>
  );
}
