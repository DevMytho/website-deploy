import s from "./wci.module.css";

/** An abstract evidence lens, not a screenshot or a claim of runtime analysis. */
export function EvidenceOrbit() {
  return (
    <div className={s.evidenceOrbit} aria-hidden="true">
      <div className={s.orbitPlane}>
        <div className={s.orbitRing} />
        <div className={s.orbitRing} />
        <div className={s.orbitRing} />
      </div>
      <div className={s.orbitCrosshair}>
        <i />
        <i />
        <span>WCI</span>
      </div>
      <div className={s.orbitCaption}>
        <span>OBSERVE</span>
        <span>TRACE</span>
        <span>EXPLAIN</span>
      </div>
    </div>
  );
}
