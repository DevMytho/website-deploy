"use client";

import { useState } from "react";
import { Arrow } from "./Icons";
import s from "./wci.module.css";

type Scenario = "public" | "restricted" | "unknown";
const scenarios = {
  public: {
    cidr: '"0.0.0.0/0"',
    status: "HIGH · CONFIGURATION FINDING",
    title: "One small change. A much wider source.",
    reason:
      "This security-group rule permits any IPv4 source to attempt TCP/22. That broadens the permitted source range for an administrative port.",
    label: "World-open IPv4",
    value: "0.0.0.0/0",
    conclusion:
      "Restrict SSH to explicitly authorized administration paths. Actual host reachability remains unverified.",
  },
  restricted: {
    cidr: '"203.0.113.0/24"',
    status: "NO NET-001 FINDING",
    title: "A narrower source. A different result.",
    reason:
      "This illustrative source is a specific IPv4 range, not the entire IPv4 internet. The public-IPv4 SSH predicate does not match.",
    label: "Restricted example range",
    value: "203.0.113.0/24",
    conclusion:
      "This is not an overall security pass. The example range is reserved for documentation; use your own authorized administration paths.",
  },
  unknown: {
    cidr: "var.admin_cidr",
    status: "INCONCLUSIVE · EVIDENCE GAP",
    title: "Unknown is a result. Never a clean bill.",
    reason:
      "The proposed source is unknown until apply. Without a resolved CIDR, the example cannot determine whether public IPv4 SSH is permitted.",
    label: "Source evidence",
    value: "Known after apply",
    conclusion:
      "Resolve the missing source evidence and review again. An incomplete analysis must not be presented as safe.",
  },
} satisfies Record<
  Scenario,
  {
    cidr: string;
    status: string;
    title: string;
    reason: string;
    label: string;
    value: string;
    conclusion: string;
  }
>;

export function SecurityPreview() {
  const [scenario, setScenario] = useState<Scenario>("public");
  const result = scenarios[scenario];
  return (
    <div className={s.preview}>
      <div className={s.previewToolbar}>
        <span className={s.mono}>
          <span className={s.smallDot} /> ILLUSTRATIVE DEMONSTRATION
        </span>
        <span className={s.previewHint}>
          Change the source. Follow the evidence.
        </span>
      </div>
      <fieldset className={s.scenarios}>
        <legend className={s.srOnly}>
          Choose an illustrative SSH source scenario
        </legend>
        {(
          [
            ["public", "Public SSH"],
            ["restricted", "Restricted SSH"],
            ["unknown", "Unknown source"],
          ] as const
        ).map(([value, label]) => (
          <label
            key={value}
            className={scenario === value ? s.scenarioSelected : ""}
          >
            <input
              type="radio"
              name="ssh-scenario"
              value={value}
              checked={scenario === value}
              onChange={() => setScenario(value)}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
      <div className={s.previewGrid}>
        <div className={s.codePanel}>
          <div className={s.codeTitle}>
            <span>security-group.tf</span>
            <span>HCL / EXAMPLE</span>
          </div>
          <pre
            tabIndex={0}
            aria-label={`Illustrative Terraform configuration for ${scenario} SSH`}
          >
            <code>
              <span className={s.codeMuted}>resource</span>{" "}
              <span className={s.codeString}>"aws_security_group"</span>{" "}
              "example" {"{"}
              {"\n"}
              <span className={s.codeMuted}> ingress</span> {"{"}
              {"\n"}
              {"    from_port   = "}
              <span className={s.codeNumber}>22</span>
              {"\n"}
              {"    to_port     = "}
              <span className={s.codeNumber}>22</span>
              {"\n"}
              {"    protocol    = "}
              <span className={s.codeString}>"tcp"</span>
              {"\n"}
              <span className={s.codeHighlight}>
                {"    cidr_blocks = ["}
                <span>{result.cidr}</span>
                {"]"}
              </span>
              {"\n  }\n}"}
            </code>
          </pre>
          <div className={s.codeFoot}>
            <span>BEFORE</span>
            <code>203.0.113.0/24</code>
            <Arrow />
            <span>PROPOSED</span>
            <code>{result.value}</code>
          </div>
        </div>
        <div
          className={s.finding}
          aria-live="polite"
          aria-atomic="true"
          data-scenario={scenario}
        >
          <span key={scenario} className={s.previewScan} aria-hidden="true" />
          <span className={s.findingStatus}>{result.status}</span>
          <p className={s.findingId}>
            WCI-AWS-NET-001 <span>/ Network Exposure</span>
          </p>
          <h3>{result.title}</h3>
          <p>{result.reason}</p>
          <dl className={s.findingFacts}>
            <div>
              <dt>Protocol / port</dt>
              <dd>TCP / 22</dd>
            </div>
            <div>
              <dt>{result.label}</dt>
              <dd>{result.value}</dd>
            </div>
            <div>
              <dt>Host reachability</dt>
              <dd>Unverified</dd>
            </div>
          </dl>
          <p className={s.findingConclusion}>{result.conclusion}</p>
        </div>
      </div>
      <div className={s.previewBottom}>
        <p>
          A simplified example of the intended analysis. No plan is uploaded or
          analyzed here.
        </p>
        <a href="https://arhistrategstudio.github.io/wci-test-site/coverage.html">
          Explore coverage reference <Arrow />
        </a>
      </div>
    </div>
  );
}
