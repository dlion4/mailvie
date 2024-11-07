import { Images } from "../../constants/images";

export function CustomerLogo(){
      const customerLogos = Images[0].category.type.logos; // Accessing logos directly

    return (
      <>
        {customerLogos.length > 0 && (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="customers-logos__title text-center mb-8">
                Five million people use Hunter to source verified email
                addresses and send cold emails.
              </div>
              <div className="row row-cols-xl-auto customers-logos__logos">
                {customerLogos.slice(0, 4).map((customerLog, index) => {
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
        </div>
        )}
      </>
    );
}