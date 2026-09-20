import { processSteps } from "@/lib/site-config";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="wrap">
        <Reveal className="section-head light">
          <h2>How a project runs</h2>
          <p>The same four steps whether it&apos;s a full build or a single install.</p>
        </Reveal>
        <ol className="process-list">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.number} delayMs={(i % 3) * 90}>
              <span className="step-num">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
