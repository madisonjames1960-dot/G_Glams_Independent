import { useState } from "react";
import { ArrowRight, RotateCcw, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { waLink } from "@/lib/siteConfig";

const CONCERNS = ["Acne & Breakouts", "Dark Spots", "Hyperpigmentation", "Dry Skin", "Oily Skin", "Uneven Texture", "Glow & Radiance", "Body Care"];
const TYPES = ["Dry", "Oily", "Combination", "Normal", "Sensitive"];
const ROUTINES = ["Just starting out", "Basic (cleanse + moisturise)", "A few steps", "Full routine"];

export default function RoutineBuilder() {
  const [step, setStep] = useState(0);
  const [concern, setConcern] = useState(null);
  const [type, setType] = useState(null);
  const [routine, setRoutine] = useState(null);

  const reset = () => { setStep(0); setConcern(null); setType(null); setRoutine(null); };

  const Option = ({ label, selected, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border hairline transition-colors ${
        selected ? "border-ochre bg-sandstone/60" : "border-ochre/20 bg-cream hover:border-ochre/50"
      }`}
    >
      <span className="font-heading text-lg text-coffee">{label}</span>
    </button>
  );

  return (
    <section id="routine" className="py-16 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Guided Skincare"
          title="Build Your Skincare Routine"
          intro="Answer three quick questions and we'll suggest where to start."
        />

        <div className="mt-10 bg-cream border hairline border-ochre/15 p-6 sm:p-10">
          {/* progress */}
          <div className="flex items-center gap-2 mb-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`h-0.5 flex-1 ${i <= step ? "bg-ochre" : "bg-ochre/20"}`} />
            ))}
          </div>

          {step === 0 && (
            <div className="animate-fade-up">
              <h3 className="font-heading text-2xl text-coffee mb-1">What's your main skin concern?</h3>
              <p className="text-sm text-muted-foreground mb-5">Choose the one that matters most right now.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {CONCERNS.map((c) => (
                  <Option key={c} label={c} selected={concern === c} onClick={() => { setConcern(c); setStep(1); }} />
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-up">
              <h3 className="font-heading text-2xl text-coffee mb-1">What's your skin type?</h3>
              <p className="text-sm text-muted-foreground mb-5">An honest guess is fine.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {TYPES.map((t) => (
                  <Option key={t} label={t} selected={type === t} onClick={() => { setType(t); setStep(2); }} />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <h3 className="font-heading text-2xl text-coffee mb-1">What's your current routine?</h3>
              <p className="text-sm text-muted-foreground mb-5">So we recommend the right starting point.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {ROUTINES.map((r) => (
                  <Option key={r} label={r} selected={routine === r} onClick={() => setRoutine(r)} />
                ))}
              </div>
              <button
                disabled={!routine}
                onClick={() => setStep(3)}
                className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-coffee text-cream h-12 px-7 text-[12px] tracking-[0.14em] uppercase disabled:opacity-40 hover:bg-ochre transition-colors"
              >
                See Recommendations <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up text-center">
              <p className="text-[11px] tracking-luxe uppercase text-ochre mb-2">Your routine starter</p>
              <h3 className="font-heading text-3xl text-coffee">For {concern?.toLowerCase()}</h3>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
                Based on {type} skin and a {routine?.toLowerCase()} routine, we recommend starting with products from our{" "}
                <a href="#shop" className="text-ochre underline underline-offset-4">{concern}</a> range.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Not sure which exact product is right for you? Our team can build a personalised routine for your skin.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={waLink(`Hi G_Glams Naturals, my main concern is ${concern}, my skin type is ${type}, and my current routine is ${routine}. Can you recommend products for me?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-botanical text-cream h-12 px-7 text-[12px] tracking-[0.14em] uppercase"
                >
                  <MessageCircle className="w-4 h-4" /> Get My Routine on WhatsApp
                </a>
                <a
                  href="#shop"
                  className="inline-flex items-center justify-center border hairline border-ochre/40 text-coffee h-12 px-7 text-[12px] tracking-[0.14em] uppercase hover:bg-sandstone transition-colors"
                >
                  Shop {concern}
                </a>
              </div>
              <button onClick={reset} className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-ochre">
                <RotateCcw className="w-3.5 h-3.5" /> Start over
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
