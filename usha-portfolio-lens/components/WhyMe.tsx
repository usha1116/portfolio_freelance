import { whyWorkWithMe } from "@/data/site";

export default function WhyMe() {
  return (
    <section
      id="why-me"
      className="section why-me-section bp"
      data-bp="<WhyWorkWithMe />"
      aria-labelledby="why-title"
    >
      <div className="section-head-wrap">
        <div className="section-meta-pill">PARTNERSHIP PHILOSOPHY</div>
        <h2 id="why-title" className="h2 why-main-title">
          Design Thinking. Engineering Discipline. One Point of Contact.
        </h2>
        <p className="section-lede">
          Working with an independent product engineer eliminates the communication friction, agency bloat, and mismatched expectations common in modern web development.
        </p>
      </div>

      <div className="why-grid">
        {whyWorkWithMe.map((item) => (
          <article
            key={item.number}
            className="why-card bp"
            data-bp={`<WhyStatement:${item.number} />`}
          >
            <div className="why-card-top">
              <span className="why-number">{item.number}</span>
              <span className="why-tag">{item.title}</span>
            </div>
            <h3 className="why-statement">&ldquo;{item.statement}&rdquo;</h3>
            <p className="why-detail">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
