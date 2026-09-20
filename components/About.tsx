import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap about-inner">
        <Reveal className="section-head">
          <h2>A construction company built around one job site: yours.</h2>
        </Reveal>
        <div className="about-body">
          <p>
            NYRA Constructions works out of J P Nagar in Mysuru (Mysore),
            taking on residential and commercial construction, renovation and
            interior work across the city. From site development and
            structural work to finishing and handover, the project stays with
            one team the whole way through — no juggling separate contractors
            for every stage.
          </p>
          <p>
            Whether it&apos;s a new home, a commercial space, or a renovation
            that needs to work around your existing structure, the approach is
            the same: a proper site visit, a clear estimate, and a team that
            sees the project through to handover.
          </p>
        </div>
      </div>
    </section>
  );
}
