import { services, site } from "@/data/site";

export default function Services() {
  return (
    <section
      id="services"
      className="section services-section bp"
      data-bp="<Services />"
      aria-labelledby="svc-title"
    >
      <div className="section-head-wrap">
        <div className="section-meta-pill">COMMERCIAL CAPABILITIES</div>
        <h2 id="svc-title" className="h2">
          What I Bring to the Table.
        </h2>
        <p className="section-lede">{site.freelance}</p>
      </div>

      <div className="services-editorial-list">
        {services.map((s) => (
          <div key={s.number} className="service-editorial-block bp" data-bp={`<Service:${s.number} />`}>
            <div className="svc-left">
              <span className="svc-num">{s.number}</span>
              <div className="svc-name-group">
                <span className="svc-category">{s.name}</span>
                <h3 className="svc-title">{s.title}</h3>
              </div>
            </div>

            <div className="svc-middle">
              <p className="svc-description">{s.description}</p>
              <div className="svc-deliverables">
                <span className="deliv-label">TYPICAL DELIVERABLES:</span>
                <ul>
                  {s.deliverables.map((d) => (
                    <li key={d}>
                      <span className="deliv-dash">—</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="svc-right">
              <div className="svc-ideal">
                <span className="ideal-label">IDEAL FOR:</span>
                <p>{s.idealFor}</p>
              </div>
              <a href="#contact" className="svc-inquire-link">
                Inquire about this service ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="services-bottom-callout">
        <div className="sbc-inner">
          <p className="roles-line">
            <strong>Also open to specialized full-time & contract roles:</strong>{" "}
            {site.roles.join(" · ")}.
          </p>
        </div>
      </div>
    </section>
  );
}
