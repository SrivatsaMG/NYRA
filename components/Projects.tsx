import { projects } from "@/lib/site-config";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>Recent work</h2>
          <p>
            A few of the jobs we&apos;ve handled around Mysuru. Photos coming
            soon — this section is ready for them.
          </p>
        </Reveal>
        <div className="project-grid">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              className="project-card"
              delayMs={(i % 3) * 90}
            >
              <div className={`project-thumb ${project.thumbClass}`} />
              <span className="project-tag">{project.tag}</span>
              <h3>{project.title}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
