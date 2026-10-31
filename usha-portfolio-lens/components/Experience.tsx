import { professionalExperience } from "@/data/site";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section experience-section bp"
      data-bp="<ProfessionalExperience />"
      aria-labelledby="exp-title"
    >
      <div className="section-head-wrap">
        <div className="section-meta-pill">TRACK RECORD & ROLES</div>
        <h2 id="exp-title" className="h2">
          Professional Experience
        </h2>
        <p className="section-lede">
          Verified industry development experience building production full-stack MERN applications and modular frontend architectures.
        </p>
      </div>

      <div className="exp-timeline">
        {professionalExperience.map((job, idx) => (
          <div
            key={job.company}
            className="exp-item bp"
            data-bp={`<Role:${job.company} />`}
          >
            <div className="exp-left">
              <div className="exp-period-badge">{job.period}</div>
              <span className="exp-type-tag">{job.type}</span>
              <span className="exp-location">{job.location}</span>
            </div>

            <div className="exp-node" aria-hidden="true">
              <span className="exp-dot" />
              {idx < professionalExperience.length - 1 && <span className="exp-line" />}
            </div>

            <div className="exp-card">
              <div className="exp-card-header">
                <div>
                  <h3 className="exp-company">{job.company}</h3>
                  <div className="exp-role">{job.role}</div>
                </div>
                <span className="exp-focus-pill">{job.focus}</span>
              </div>

              <p className="exp-summary">{job.summary}</p>

              <div className="exp-responsibilities">
                <span className="exp-resp-title">KEY RESPONSIBILITIES & CONTRIBUTIONS:</span>
                <ul>
                  {job.responsibilities.map((r, i) => (
                    <li key={i}>
                      <span className="exp-bullet">✦</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
