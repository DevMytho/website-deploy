import { CinematicPortal } from "./CinematicPortal";
import { HomeEnhancements } from "./HomeEnhancements";
import { WCIChangeSequence } from "./WCIChangeSequence";
import { ThresholdEcho } from "./ThresholdEcho";
import { DirectionSignal } from "./DirectionSignal";
import { StructuralBridge } from "./StructuralBridge";
import { PhilosophyExperience as EngineeringPhilosophy } from "./PhilosophyExperience";
import { FocusVisualization as EngineeringDiagram } from "./FocusVisualization";
import s from "./home.module.css";

const disciplines = [
  {
    name: "Security",
    title: "Question the exposure.",
    text: "Understand the boundary between a configuration and a consequence. Identify risks, surface assumptions and keep the evidence behind each decision visible.",
    detail: "EXPOSURE / EVIDENCE / CONFIDENCE",
  },
  {
    name: "Infrastructure",
    title: "Give complexity a structure.",
    text: "Think in systems, dependencies and change. Explore infrastructure that is understandable, maintainable and designed with reliability in mind.",
    detail: "CONFIGURATION / CONNECTION / RELIABILITY",
  },
  {
    name: "Software",
    title: "Make the foundations count.",
    text: "Build toward dependable software through clear architecture, thoughtful interfaces and deliberate validation. Good foundations make the next change easier to reason about.",
    detail: "ARCHITECTURE / INTEGRATION / VALIDATION",
  },
];
export function HomePageContent() {
  return (
    <main className={s.home} id="home-main">
      <noscript>
        <style>{`[data-portal],[data-philosophy]{height:auto!important}`}</style>
      </noscript>
      <HomeEnhancements />
      <CinematicPortal />
      <section
        className={`${s.section} ${s.introduction}`}
        id="introduction"
        aria-labelledby="intro-title"
      >
        <div className={s.sectionTop}>
          <span>01 / THE WAYNE CITADEL APPROACH</span>
          <span>THREE DISCIPLINES. ONE ENGINEERING MINDSET.</span>
        </div>
        <div className={s.introGrid}>
          <h2 id="intro-title">
            Built on engineering.
            <br />
            <em>Driven by clarity.</em>
          </h2>
          <div>
            <p className={s.lead}>
              The strongest systems are the ones we can understand.
            </p>
            <p>
              Wayne Citadel explores the intersection of cloud infrastructure,
              cybersecurity and software engineering. Our direction is grounded
              in a simple idea: make complex systems—and the decisions that
              shape them—clearer.
            </p>
            <a className={s.textLink} href="#engineering">
              Explore our engineering focus <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>
        <div className={s.coordinate} aria-hidden="true">
          <span>SOFTWARE</span>
          <i />
          <span>INFRASTRUCTURE</span>
          <i />
          <span>SECURITY</span>
        </div>
      </section>
      <section
        className={s.section}
        id="engineering"
        aria-labelledby="engineering-title"
      >
        <div className={s.sectionTop}>
          <span>02 / ENGINEERING FOCUS</span>
          <span>DESIGNED TO WORK TOGETHER</span>
        </div>
        <h2 id="engineering-title">
          Different disciplines.
          <br />
          <em>Connected thinking.</em>
        </h2>
        <div className={s.disciplines}>
          {disciplines.map((d, i) => (
            <article className={s.discipline} key={d.name}>
              <div className={s.disciplineIndex}>
                <span>0{i + 1}</span>
                <h3>
                  {d.name}
                  <br />
                  {" engineering"}
                </h3>
              </div>
              <EngineeringDiagram variant={i} />
              <div className={s.disciplineCopy}>
                <h4>{d.title}</h4>
                <p>{d.text}</p>
                <span className={s.micro}>{d.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <StructuralBridge />
      <EngineeringPhilosophy />
      <section
        className={`${s.section} ${s.product}`}
        id="featured-project"
        aria-labelledby="product-title"
      >
        <div className={s.sectionTop}>
          <span>04 / FEATURED PROJECT</span>
          <span className={s.badge}>EARLY DEVELOPMENT</span>
        </div>
        <div className={s.productGrid}>
          <div>
            <p className={s.micro}>WAYNE CLOUD INFRASTRUCTURE</p>
            <h2 id="product-title">
              The change is small.
              <br />
              <em>The question isn’t.</em>
            </h2>
            <p>
              WCI is being developed to help engineers understand the security
              implications of Terraform and OpenTofu changes before deployment.
            </p>
            <p>
              Its initial planned focus: AWS, read-only plan analysis,
              evidence-backed findings and explanations that fit human review.
            </p>
            <div className={s.actions}>
              <a className="btn-pill solid" href="/wci">
                Explore WCI <span aria-hidden="true">↗</span>
              </a>
              <a className={s.textLink} href="/analysis">
                Explore the analysis <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <WCIChangeSequence />
        </div>
      </section>
      <section className={s.section} aria-labelledby="practice-title">
        <div className={s.sectionTop}>
          <span>05 / ENGINEERING IN PRACTICE</span>
          <span>PRINCIPLES, BEFORE PROMISES</span>
        </div>
        <div className={s.practiceGrid}>
          <h2 id="practice-title">
            A clearer view.
            <br />
            <em>A deliberate next step.</em>
          </h2>
          <div className={s.practices}>
            {[
              [
                "Understand the system",
                "Start with context. Map the boundaries and dependencies before drawing conclusions.",
              ],
              [
                "Validate the change",
                "Separate what the evidence establishes from what still needs investigation.",
              ],
              [
                "Keep people in control",
                "Explain the reasoning and its limits. Let engineers make the consequential decisions.",
              ],
            ].map(([title, copy], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className={`${s.section} ${s.direction}`}
        id="product-direction"
        aria-labelledby="direction-title"
      >
        <div className={s.sectionTop}>
          <span>06 / PRODUCT DIRECTION</span>
          <span>THE LONGER VIEW</span>
        </div>
        <div className={s.directionHead}>
          <h2 id="direction-title">
            A direction.
            <br />
            <em>Not a shortcut.</em>
          </h2>
          <div>
            <p>
              Security analysis is the initial focus. The wider infrastructure
              lifecycle is a longer-term direction, not a promise of
              capabilities available today.
            </p>
            <a className={s.textLink} href="/roadmap">
              View roadmap <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <DirectionSignal />
        <ol className={s.timeline}>
          {[
            "Configure",
            "Secure",
            "Validate",
            "Automate",
            "Deploy",
            "Monitor",
          ].map((name, i) => (
            <li key={name} data-current={i === 1}>
              <span>0{i + 1}</span>
              <i />
              <strong>{name}</strong>
              <small>
                {i === 1 ? "INITIAL ANALYSIS FOCUS" : "LONGER-TERM DIRECTION"}
              </small>
            </li>
          ))}
        </ol>
      </section>
      <section className={s.contact} aria-labelledby="home-contact-title">
        <ThresholdEcho />
        <div className={s.contactInner}>
          <p className={s.micro}>07 / START A CONVERSATION</p>
          <h2 id="home-contact-title">
            Let’s engineer
            <br />
            <em>what comes next.</em>
          </h2>
          <p>
            Engineering collaboration. Technical feedback.
            <br />
            Early WCI discussions. A thoughtful place to begin.
          </p>
          <a className="btn-pill solid" href="/contact">
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
          <span className={s.contactSignature}>
            WAYNE CITADEL / ENGINEERING WITH INTENT
          </span>
        </div>
      </section>
    </main>
  );
}
