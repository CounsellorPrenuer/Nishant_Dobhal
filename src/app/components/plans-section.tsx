"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Plan = {
  audience: string;
  tier: string;
  name: string;
  price: string;
  featuresIncluded?: string[];
  featuresExcluded?: string[];
  ctaLabel?: string;
};

type CustomPlan = {
  title: string;
  price: string;
  description: string;
  image?: any;
  ctaLabel?: string;
};

export function PlansSection({
  planSectionTitle,
  customPlansTitle,
  customPlansSubtitle,
  mentorshipPlans,
  customPlans,
}: {
  planSectionTitle: string;
  customPlansTitle: string;
  customPlansSubtitle: string;
  mentorshipPlans: Plan[];
  customPlans: CustomPlan[];
}) {
  const audiences = useMemo(
    () => Array.from(new Set((mentorshipPlans || []).map((p) => p.audience))),
    [mentorshipPlans]
  );
  const [mode, setMode] = useState<"plans" | "customize">("plans");
  const [audience, setAudience] = useState(audiences[0] || "");

  const selectedPlans = useMemo(
    () => (mentorshipPlans || []).filter((p) => p.audience === audience),
    [mentorshipPlans, audience]
  );

  return (
    <section id="packages" className="container section">
      <div className="planMode">
        <button
          className={mode === "plans" ? "modePrimary" : "modeSecondary"}
          onClick={() => setMode("plans")}
          type="button"
        >
          {planSectionTitle}
        </button>
        <button
          className={mode === "customize" ? "modePrimary" : "modeSecondary"}
          onClick={() => setMode("customize")}
          type="button"
        >
          Customise Your Mentorship Plan
        </button>
      </div>

      {mode === "plans" ? (
        <>
          <div className="tabs">
            {audiences.map((a) => (
              <button
                key={a}
                type="button"
                className={a === audience ? "tabActive" : "tabBtn"}
                onClick={() => setAudience(a)}
              >
                {a.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="planVisualWrap">
            <span className="blob blobLeft" />
            <span className="blob blobRight" />
            <div className="planRow">
            {selectedPlans.map((plan) => (
              <article key={`${plan.audience}-${plan.tier}-${plan.name}`} className="planCard">
                <span className="tier">{plan.tier.toUpperCase()}</span>
                <h3>{plan.name}</h3>
                <h4>{plan.price}</h4>
                <ul>
                  {(plan.featuresIncluded || []).map((f) => (
                    <li key={`in-${f}`}>✓ {f}</li>
                  ))}
                  {(plan.featuresExcluded || []).map((f) => (
                    <li key={`out-${f}`} className="muted">
                      ✕ {f}
                    </li>
                  ))}
                </ul>
                <button>{plan.ctaLabel || "BUY NOW"}</button>
              </article>
            ))}
            </div>
          </div>
        </>
      ) : (
        <section id="customize">
          <h2 className="customTitle">{customPlansTitle}</h2>
          <p className="customSub">{customPlansSubtitle}</p>
          <div className="grid customGrid">
            {(customPlans || []).map((item) => (
              <article key={item.title} className="customCard">
                {item.image && (
                  <Image
                    src={urlFor(item.image).width(240).height(240).url()}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="customPlanImage"
                  />
                )}
                <div>
                  <h3>{item.title}</h3>
                  <h4>{item.price}</h4>
                  <p>{item.description}</p>
                  <button>{item.ctaLabel || "BUY NOW"}</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
