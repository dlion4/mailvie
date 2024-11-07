import { teamMembers } from "./teams";

const TeamMember = ({
  name,
  position,
  email,
  linkedin,
  twitter,
  countryFlag,
  imageSrc,
  lat,
  long,
}: {
  name: string;
  position: string;
  email: string;
  linkedin: string;
  twitter: string;
  countryFlag: string;
  imageSrc: string;
  lat: string;
  long: string;
}) => (
  <li className="team-members__item">
    <article
      className="member-card"
      data-action="mouseover->team-globe#rotateToLoc"
      data-team-globe-lat-param={lat}
      data-team-globe-long-param={long}
    >
      <figure className="member-card__thumbnail">
        <img alt={name} className="member-card__avatar" src={imageSrc} />
        <span className="member-card__country">{countryFlag}</span>
      </figure>
      <div className="member-card__infos">
        <h3 className="member-card__name">{name}</h3>
        <div className="member-card__position">{position}</div>
        <div className="member-card__contact">
          <a className="member-card__email" href={`mailto:${email}`}>
            {email}
          </a>
          <a
            aria-label={`${name} LinkedIn`}
            className="member-card__linkedin"
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i aria-hidden="true" className="fab fa-linkedin"></i>
          </a>
          <a
            aria-label={`${name} Twitter`}
            className="member-card__twitter"
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i aria-hidden="true" className="fab fa-x-twitter"></i>
          </a>
        </div>
      </div>
    </article>
  </li>
);

export const TeamPageSection = () => {
  return (
    <>



      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 col-lg-6">
            <h2 className="section__title">Our team.</h2>
            <p className="section__description">
              We are a small group helping millions of professionals create new
              connections. We spend our time making our product more powerful
              and accessible, focusing on our users’ needs. We’ve been remote
              from the start and have team members in Europe, America, and Asia.
            </p>
          </div>
        </div>
        <ul className="team-members mt-14">
          {teamMembers.map((member) => (
            <TeamMember key={member.id} {...member} />
          ))}
        </ul>
      </div>
      <div className="team-globe">
        <canvas
          className="team-globe__canvas"
          data-team-globe-target="canvas"
        ></canvas>
      </div>
    </>
  );
};
