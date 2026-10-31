import { projectProcess } from "@/data/site";

export default function Process() {
  return (
    <section
      id="process"
      className="section process-section bp"
      data-bp="<ProjectProcess />"
      aria-labelledby="proc-title"
    >
      <div className="section-head-wrap">
        <div className="section-meta-pill">EXECUTION METHODOLOGY</div>
        <h2 id="proc-title" className="h2">
          Project Process / 01—04
        </h2>
        <p className="section-lede">
          A disciplined four-phase approach designed to eliminate uncertainty, build in working vertical slices, and deliver software that works cleanly from day one.
        </p>
      </div>

      <div className="process-steps-grid">
        {projectProcess.map((step) => (
          <div
            key={step.number}
            className="proc-card bp"
            data-bp={`<Step:${step.number} />`}
          >
            <div className="proc-card-header">
              <span className="proc-num-circle">{step.number}</span>
              <span className="proc-phase-label">PHASE {step.number}</span>
            </div>

            <h3 className="proc-title">{step.name}</h3>
            <p className="proc-tagline">{step.description}</p>
            <p className="proc-details">{step.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
