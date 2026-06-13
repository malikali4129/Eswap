import React from "react";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Cpu,
  Facebook,
  Gamepad2,
  Heart,
  Instagram,
  Laptop,
  Leaf,
  Linkedin,
  Menu,
  PackageCheck,
  Recycle,
  Search,
  ShieldCheck,
  Smartphone,
  Tablet,
  Trash2,
  Truck,
  Twitter,
  Upload,
  WalletCards,
  X
} from "lucide-react";
import {
  brands,
  catalogueItems,
  conditionOptions,
  dashboardStats,
  deviceCategories,
  submissions
} from "./data/mockData";

const iconMap = { Smartphone, Laptop, Tablet, Gamepad2 };
const money = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0
});

function App() {
  const [quote, setQuote] = useState(null);

  return (
    <main className="overflow-hidden">
      <Navbar />
      <Homepage />
      <DeviceWizard onQuoteReady={setQuote} />
      <InstantQuote quote={quote} />
      <UserDashboard />
      <B2BCatalogue />
      <Footer />
    </main>
  );
}

function Footer() {
  const links = {
    product: ["How it Works", "Pricing", "For Business", "Sustainability"],
    company: ["About", "Careers", "Press", "Contact"],
    legal: ["Privacy", "Terms", "Data Policy", "E-Waste Guidelines"]
  };
  const socials = [
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" }
  ];

  return (
    <footer className="border-t border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)_auto]">
          <div>
            <a href="#home" className="flex items-center gap-2 font-black text-2xl tracking-tight">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-ink to-slate-800 text-limepop">
                <Recycle size={22} />
              </span>
              <span>Eswap</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
              Pakistan's circular electronics marketplace. Turn dead devices into cash and help save the environment.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all hover:border-lagoon hover:text-lagoon"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-ink">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-sm font-medium text-slate-400 sm:flex-row">
          <p>© 2026 Eswap. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2">
              <ShieldCheck size={16} /> Data wipe certified
            </a>
            <a href="#" className="flex items-center gap-2">
              <Leaf size={16} /> Eco-certified
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <a href="#home" className="flex items-center gap-2.5 font-black text-2xl tracking-tight transition-transform hover:scale-[1.02]">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-ink to-slate-800 text-limepop shadow-md">
            <Recycle size={22} />
          </span>
          <span className="hidden sm:inline">Eswap</span>
        </a>
        <div className="hidden items-center gap-1 text-sm font-semibold text-slate-600 md:flex">
          {[
            { href: "#wizard", label: "Get Quote" },
            { href: "#dashboard", label: "Dashboard" },
            { href: "#catalogue", label: "B2B Catalogue" }
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="relative px-4 py-2 rounded-lg text-slate-600 transition-all hover:text-ink before:absolute before:inset-0 before:rounded-lg before:bg-slate-100/50 before:opacity-0 before:transition-opacity hover:before:opacity-100"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#wizard"
            className="hidden rounded-xl bg-gradient-to-r from-lagoon to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] sm:block"
          >
            Get Quote
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 md:hidden"
          >
            <span className="text-xl">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {[
              { href: "#wizard", label: "Get Quote" },
              { href: "#dashboard", label: "Dashboard" },
              { href: "#catalogue", label: "B2B Catalogue" }
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Homepage() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(21,128,255,0.08),_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_rgba(25,211,162,0.06),_transparent_50%)]" />
      <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative">
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2.5 rounded-full border border-mint/40 bg-white/80 px-5 py-2.5 text-sm font-bold text-emerald-700 shadow-md backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Pakistan's circular electronics marketplace
          </div>
          <h1 className="animate-slide-up max-w-3xl text-5xl font-black leading-[1.03] tracking-normal text-ink sm:text-6xl lg:text-7xl">
            Turn Dead <span className="text-transparent bg-clip-text bg-gradient-to-r from-lagoon to-mint">Devices</span> Into Cash
          </h1>
          <p className="animate-slide-up mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Get instant value for broken electronics. We route reusable parts to repair businesses that need reliable components fast — <span className="text-emerald-600 font-semibold">saving e-waste from landfills</span>.
          </p>
          <div className="animate-slide-up mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#wizard"
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ink to-slate-800 px-7 py-4 text-center font-extrabold text-white shadow-lg shadow-slate-800/20 transition-all hover:shadow-xl hover:shadow-slate-800/30 hover:-translate-y-0.5"
            >
              Get Instant Quote
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={20} />
            </a>
            <a
              href="#catalogue"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-7 py-4 text-center font-extrabold text-ink backdrop-blur-sm transition-all hover:border-slate-300 hover:bg-white"
            >
              Browse Components
              <Search size={18} className="text-slate-400" />
            </a>
          </div>
          <div className="animate-fade-in mt-10 flex items-center gap-6 text-sm">
            <div className="flex -space-x-2">
              {["bg-rose-400", "bg-amber-400", "bg-emerald-400", "bg-cyan-400"].map((color, i) => (
                <div key={i} className={`h-8 w-8 rounded-full border-2 border-white ${color}`} />
              ))}
            </div>
            <p className="text-slate-500">
              <strong className="text-ink">2,840+</strong> devices recycled
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="relative animate-float rounded-[32px] border border-slate-200/60 bg-white p-6 shadow-2xl shadow-slate-200/50">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl bg-gradient-to-br from-limepop to-mint p-4 shadow-lg">
              <Trash2 className="h-full w-full text-ink/80" />
            </div>
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 rotate-[-8deg] rounded-xl bg-white px-3 py-1.5 text-xs font-bold shadow-md">
              ⚡ Instant Pay
            </div>
            <div className="rounded-[24px] bg-gradient-to-br from-ink to-slate-900 p-8 text-white">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">Live Impact</span>
                <Recycle className="text-limepop" size={24} />
              </div>
              <div className="counter-pulse mt-10">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-limepop">E-waste diverted</p>
                <p className="mt-2 text-5xl font-black sm:text-6xl lg:text-7xl">128,420<span className="text-2xl text-slate-400">kg</span></p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3">
                {[
                  { icon: Smartphone, label: "Phones", value: "4,820" },
                  { icon: Laptop, label: "Laptops", value: "1,710" },
                  { icon: Tablet, label: "Tablets", value: "990" },
                  { icon: Gamepad2, label: "Consoles", value: "640" }
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="group rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Icon size={16} className="transition-transform group-hover:scale-110" />
                      <p className="text-sm">{label}</p>
                    </div>
                    <p className="mt-1 text-xl font-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <HowItWorks />
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Search, title: "Describe Device", text: "Pick category, model, and condition in under a minute." },
    { icon: WalletCards, title: "Get Paid", text: "See the offer instantly and schedule pickup." },
    { icon: Cpu, title: "Parts Reused", text: "Reusable components enter a trusted B2B catalogue." }
  ];
  const badges = [
    { icon: ShieldCheck, label: "Data wipe certified" },
    { icon: Banknote, label: "Instant payment" },
    { icon: Leaf, label: "Eco-responsible" }
  ];

  return (
    <div className="col-span-full mt-8 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <Icon className="text-lagoon" />
            <h3 className="mt-4 text-lg font-black">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
      <div className="grid gap-3 rounded-lg bg-limepop p-5 sm:grid-cols-3 lg:grid-cols-1">
        {badges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 rounded-lg bg-white/80 p-4 font-extrabold">
            <Icon size={20} /> {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function DeviceWizard({ onQuoteReady }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(deviceCategories[0]);
  const [brand, setBrand] = useState(brands[0].name);
  const [model, setModel] = useState(brands[0].models[0]);
  const [conditions, setConditions] = useState(["powersOn", "screenGood"]);
  const [photos, setPhotos] = useState([]);
  const selectedBrand = brands.find((item) => item.name === brand) ?? brands[0];
  const quote = useQuoteEstimate(category, model, conditions);

  function toggleCondition(id) {
    setConditions((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function handleFiles(files) {
    const next = Array.from(files).slice(0, 4 - photos.length);
    setPhotos((current) => [...current, ...next].slice(0, 4));
  }

  function finish() {
    onQuoteReady({ category, brand, model, conditions, photos, ...quote });
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="wizard" className="bg-gradient-to-b from-white to-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-coral/10 px-3 py-1 text-xs font-bold text-coral">
              <Heart size={12} /> Consumer Portal
            </div>
            <h2 className="text-4xl font-black tracking-normal text-ink">Device Submission Wizard</h2>
            <p className="mt-2 text-slate-500">Complete 4 simple steps to get your instant quote</p>
          </div>
          <StepTabs step={step} setStep={setStep} />
        </div>
        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lagoon to-mint transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/30">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-400">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs">{step}</span>
              <span className="text-slate-600">of 4 steps completed</span>
            </div>
            {step === 1 && <CategoryStep category={category} setCategory={setCategory} />}
            {step === 2 && (
              <ModelStep
                brand={brand}
                setBrand={(value) => {
                  setBrand(value);
                  setModel((brands.find((item) => item.name === value) ?? brands[0]).models[0]);
                }}
                model={model}
                setModel={setModel}
                models={selectedBrand.models}
              />
            )}
            {step === 3 && (
              <ConditionStep conditions={conditions} toggleCondition={toggleCondition} quote={quote} />
            )}
            {step === 4 && <PhotoStep photos={photos} handleFiles={handleFiles} />}
            <div className="mt-8 flex justify-between gap-3 border-t border-slate-100 pt-6">
              <button
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-extrabold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white"
                disabled={step === 1}
                onClick={() => setStep((current) => current - 1)}
              >
                ← Back
              </button>
              {step < 4 ? (
                <button
                  className="rounded-xl bg-gradient-to-r from-ink to-slate-800 px-6 py-3 font-extrabold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                  onClick={() => setStep((current) => current + 1)}
                >
                  Continue →
                </button>
              ) : (
                <button
                  className="rounded-xl bg-gradient-to-r from-lagoon to-blue-600 px-6 py-3 font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
                  onClick={finish}
                >
                  Generate Quote ⚡
                </button>
              )}
            </div>
          </div>
          <QuotePreview category={category} model={model} quote={quote} />
        </div>
      </div>
    </section>
  );
}

function useQuoteEstimate(category, model, conditions) {
  return useMemo(() => {
    const modelBoost = model.toLowerCase().includes("pro") || model.toLowerCase().includes("xps") ? 1.22 : 1;
    const base = { phone: 12500, laptop: 32000, tablet: 15500, console: 21000 }[category.id];
    const conditionBoost = conditionOptions
      .filter((item) => conditions.includes(item.id))
      .reduce((sum, item) => sum + item.impact, 0);
    const amount = Math.round(base * modelBoost * (0.62 + conditionBoost));
    const componentValue = Math.round(amount * 0.78);
    const scrapValue = amount - componentValue;
    return {
      amount,
      componentValue,
      scrapValue,
      divertedKg: Number((category.baseKg * (1 + conditions.length / 12)).toFixed(2))
    };
  }, [category, model, conditions]);
}

function StepTabs({ step, setStep }) {
  const labels = ["Category", "Model", "Condition", "Photos"];
  return (
    <div className="grid grid-cols-4 rounded-xl bg-slate-100 p-1.5">
      {labels.map((label, index) => {
        const num = index + 1;
        return (
          <button
            key={num}
            onClick={() => setStep(num)}
            className={`flex flex-col items-center gap-1 rounded-lg py-2.5 text-xs font-bold transition-all ${
              step === num
                ? "bg-white text-lagoon shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${
              step === num
                ? "bg-lagoon text-white"
                : "bg-slate-200"
            }`}>
              {num}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function CategoryStep({ category, setCategory }) {
  return (
    <div>
      <h3 className="text-2xl font-black">Step 1 - Device category</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {deviceCategories.map((item) => {
          const Icon = iconMap[item.icon];
          const active = category.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCategory(item)}
              className={`flex min-h-36 items-center gap-4 rounded-lg border p-5 text-left transition ${active ? "border-lagoon bg-blue-50 shadow-soft" : "border-slate-200 bg-white hover:border-mint"}`}
            >
              <span className={`grid h-14 w-14 place-items-center rounded-lg ${active ? "bg-lagoon text-white" : "bg-slate-100 text-ink"}`}>
                <Icon size={28} />
              </span>
              <span>
                <span className="block text-xl font-black">{item.label}</span>
                <span className="mt-1 block text-sm font-semibold text-slate-500">Approx. {item.baseKg} kg recoverable</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ModelStep({ brand, setBrand, model, setModel, models }) {
  return (
    <div>
      <h3 className="text-2xl font-black">Step 2 - Brand and model</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-extrabold text-slate-600">Brand</span>
          <select className="mt-2 h-14 w-full rounded-lg border border-slate-200 bg-white px-4 font-bold outline-lagoon" value={brand} onChange={(event) => setBrand(event.target.value)}>
            {brands.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-extrabold text-slate-600">Searchable model</span>
          <input
            list="models"
            className="mt-2 h-14 w-full rounded-lg border border-slate-200 bg-white px-4 font-bold outline-lagoon"
            value={model}
            onChange={(event) => setModel(event.target.value)}
            placeholder="Type model name"
          />
          <datalist id="models">
            {models.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </label>
      </div>
    </div>
  );
}

function ConditionStep({ conditions, toggleCondition, quote }) {
  return (
    <div>
      <h3 className="text-2xl font-black">Step 3 - Condition checklist</h3>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-3">
          {conditionOptions.map((item) => (
            <label key={item.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <input
                type="checkbox"
                checked={conditions.includes(item.id)}
                onChange={() => toggleCondition(item.id)}
                className="h-5 w-5 accent-lagoon"
              />
              <span className="font-bold">{item.label}</span>
            </label>
          ))}
        </div>
        <div className="rounded-lg bg-ink p-5 text-white">
          <p className="text-sm font-black uppercase tracking-[0.15em] text-limepop">Live price preview</p>
          <p className="mt-4 text-4xl font-black">{money.format(quote.amount)}</p>
          <p className="mt-3 text-sm text-slate-300">Changes instantly as condition details improve or reduce resale value.</p>
        </div>
      </div>
    </div>
  );
}

function PhotoStep({ photos, handleFiles }) {
  return (
    <div>
      <h3 className="text-2xl font-black">Step 4 - Photo upload</h3>
      <label
        className="mt-5 flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-lagoon bg-blue-50 p-8 text-center"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFiles(event.dataTransfer.files);
        }}
      >
        <Upload className="text-lagoon" size={36} />
        <span className="mt-4 text-xl font-black">Drag photos here</span>
        <span className="mt-2 text-sm font-semibold text-slate-500">Upload up to 4 device images</span>
        <input type="file" accept="image/*" multiple className="hidden" onChange={(event) => handleFiles(event.target.files)} />
      </label>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[0, 1, 2, 3].map((slot) => (
          <div key={slot} className="grid aspect-square place-items-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-400">
            {photos[slot]?.name ?? `Photo ${slot + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuotePreview({ category, model, quote }) {
  return (
    <aside className="rounded-2xl bg-ink p-6 text-white shadow-soft">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-limepop">Quote preview</p>
      <h3 className="mt-4 text-3xl font-black">{money.format(quote.amount)}</h3>
      <p className="mt-2 text-slate-300">{category.label} - {model}</p>
      <div className="mt-6 space-y-3">
        <Breakdown label="Component value estimate" value={quote.componentValue} />
        <Breakdown label="Scrap value" value={quote.scrapValue} />
      </div>
      <div className="mt-6 rounded-lg bg-white/10 p-4">
        <p className="text-sm font-bold">Approx. {quote.divertedKg} kg diverted from landfill.</p>
      </div>
    </aside>
  );
}

function InstantQuote({ quote }) {
  const [showPickup, setShowPickup] = useState(false);
  const [pickupData, setPickupData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Lahore",
    date: "",
    time: "morning",
    notes: ""
  });

  const display = quote ?? {
    amount: 23500,
    componentValue: 18330,
    scrapValue: 5170,
    divertedKg: 0.42,
    model: "iPhone 13 Pro",
    brand: "Apple"
  };

  const timeSlots = [
    { id: "morning", label: "Morning (9 AM - 12 PM)", icon: "🌅" },
    { id: "afternoon", label: "Afternoon (12 PM - 4 PM)", icon: "☀️" },
    { id: "evening", label: "Evening (4 PM - 7 PM)", icon: "🌆" }
  ];

  const cities = ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Rawalpindi", "Multan", "Peshawar", "Quetta"];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pickup scheduled!\n\nName: ${pickupData.name}\nPhone: ${pickupData.phone}\nAddress: ${pickupData.address}, ${pickupData.city}\nDate: ${pickupData.date}\nTime: ${pickupData.time}`);
    setShowPickup(false);
  };

  return (
    <section id="quote" className="bg-[#f6fff9] py-20">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="font-black uppercase tracking-[0.18em] text-emerald-700">Instant Quote Screen</p>
          <h2 className="mt-3 text-5xl font-black tracking-normal text-ink">{money.format(display.amount)}</h2>
          <p className="mt-4 text-lg font-semibold text-slate-600">Offer for {display.brand} {display.model}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setShowPickup(true)} className="rounded-lg bg-mint px-6 py-4 font-black text-ink shadow-soft hover:bg-mint/90 transition-colors">
              Accept & Schedule Pickup
            </button>
            <button className="rounded-lg border border-slate-300 bg-white px-6 py-4 font-black text-ink hover:bg-slate-50 transition-colors">
              Decline
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-black">Itemised breakdown</h3>
          <div className="mt-5 space-y-4">
            <Breakdown label="Component value estimate" value={display.componentValue} dark={false} />
            <Breakdown label="Scrap value" value={display.scrapValue} dark={false} />
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-lg bg-limepop p-4 font-extrabold">
            <Leaf className="mt-0.5 shrink-0" size={20} />
            This submission diverts approx. {display.divertedKg} kg from landfill.
          </div>
        </div>
      </div>

      {/* Pickup Scheduling Modal */}
      {showPickup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="animate-slide-up mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs">✓</span>
                  Quote Accepted
                </div>
                <h3 className="mt-1 text-2xl font-black text-ink">Schedule Pickup</h3>
              </div>
              <button onClick={() => setShowPickup(false)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                ✕
              </button>
            </div>

            {/* Device Summary Card */}
            <div className="mx-6 mt-5 rounded-xl bg-gradient-to-r from-ink to-slate-800 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Item</p>
                  <p className="mt-1 text-lg font-black">{display.brand} {display.model}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Offer</p>
                  <p className="mt-1 text-2xl font-black text-limepop">{money.format(display.amount)}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                {/* Contact Section */}
                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-slate-400">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600">1</span>
                    Contact Details
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-bold text-slate-600">Full Name</span>
                      <input
                        required
                        type="text"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-ink transition-colors focus:border-lagoon focus:bg-white focus:outline-none focus:ring-2 focus:ring-lagoon/20"
                        placeholder="Your name"
                        value={pickupData.name}
                        onChange={(e) => setPickupData({ ...pickupData, name: e.target.value })}
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-slate-600">Phone Number</span>
                      <input
                        required
                        type="tel"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-ink transition-colors focus:border-lagoon focus:bg-white focus:outline-none focus:ring-2 focus:ring-lagoon/20"
                        placeholder="03XX XXXXXXX"
                        value={pickupData.phone}
                        onChange={(e) => setPickupData({ ...pickupData, phone: e.target.value })}
                      />
                    </label>
                  </div>
                </div>

                {/* Address Section */}
                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-slate-400">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600">2</span>
                    Pickup Address
                  </h4>
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-sm font-bold text-slate-600">Complete Address</span>
                      <textarea
                        required
                        rows={2}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-ink transition-colors focus:border-lagoon focus:bg-white focus:outline-none focus:ring-2 focus:ring-lagoon/20"
                        placeholder="House No., Street, Area..."
                        value={pickupData.address}
                        onChange={(e) => setPickupData({ ...pickupData, address: e.target.value })}
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-slate-600">City</span>
                      <select
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-ink transition-colors focus:border-lagoon focus:bg-white focus:outline-none focus:ring-2 focus:ring-lagoon/20"
                        value={pickupData.city}
                        onChange={(e) => setPickupData({ ...pickupData, city: e.target.value })}
                      >
                        {cities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                {/* Schedule Section */}
                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-slate-400">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600">3</span>
                    Preferred Time
                  </h4>
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-sm font-bold text-slate-600">Pickup Date</span>
                      <input
                        required
                        type="date"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-ink transition-colors focus:border-lagoon focus:bg-white focus:outline-none focus:ring-2 focus:ring-lagoon/20"
                        min={new Date().toISOString().split("T")[0]}
                        value={pickupData.date}
                        onChange={(e) => setPickupData({ ...pickupData, date: e.target.value })}
                      />
                    </label>
                    <div>
                      <span className="mb-2 block text-sm font-bold text-slate-600">Preferred Time Slot</span>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setPickupData({ ...pickupData, time: slot.id })}
                            className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 font-bold transition-all ${
                              pickupData.time === slot.id
                                ? "border-lagoon bg-blue-50 text-lagoon"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <span>{slot.icon}</span>
                            <span className="text-sm">{slot.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block">
                    <span className="text-sm font-bold text-slate-600">Additional Notes (Optional)</span>
                    <textarea
                      rows={2}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-ink transition-colors focus:border-lagoon focus:bg-white focus:outline-none focus:ring-2 focus:ring-lagoon/20"
                      placeholder="Any special instructions for pickup..."
                      value={pickupData.notes}
                      onChange={(e) => setPickupData({ ...pickupData, notes: e.target.value })}
                    />
                  </label>
                </div>
              </div>

              {/* Submit Actions */}
              <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-mint to-emerald-500 px-6 py-4 font-black text-ink shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                >
                  ✓ Confirm Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setShowPickup(false)}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function Breakdown({ label, value, dark = true }) {
  return (
    <div className={`flex items-center justify-between gap-4 rounded-lg p-4 ${dark ? "bg-white/10" : "bg-slate-50"}`}>
      <span className={dark ? "text-slate-300" : "text-slate-600"}>{label}</span>
      <strong>{money.format(value)}</strong>
    </div>
  );
}

function UserDashboard() {
  const [sortBy, setSortBy] = useState("date");
  const statusColor = {
    Pending: "bg-solar/20 text-ink",
    Collected: "bg-lagoon/20 text-lagoon",
    Paid: "bg-emerald-100 text-emerald-700"
  };
  const statsWithIcons = [
    { icon: WalletCards, gradient: "from-amber-400 to-orange-500" },
    { icon: Smartphone, gradient: "from-lagoon to-blue-600" },
    { icon: Leaf, gradient: "from-emerald-400 to-mint" },
    { icon: Heart, gradient: "from-violetpop to-purple-600" }
  ];
  const rows = [...submissions].sort((a, b) => (sortBy === "amount" ? b.amount.localeCompare(a.amount) : b.date.localeCompare(a.date)));

  return (
    <section id="dashboard" className="bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violetpop/10 px-3 py-1 text-xs font-bold text-violetpop">
          <span>📊</span> User Dashboard
        </div>
        <h2 className="mt-2 text-4xl font-black tracking-normal text-ink">Your Recovery Impact</h2>
        <p className="mt-2 text-slate-500">Track your e-waste recycling journey</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((item, index) => {
            const { icon: Icon, gradient } = statsWithIcons[index];
            return (
              <article
                key={item.label}
                className="group card-hover relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
              >
                <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 transition-transform group-hover:scale-150`} />
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
                  <Icon size={22} />
                </div>
                <p className="relative mt-4 text-sm font-semibold text-slate-500">{item.label}</p>
                <p className="relative mt-1 text-3xl font-black text-ink">{item.value}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/30">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <h3 className="text-lg font-black text-ink">Recent Submissions</h3>
            <select
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition-colors focus:border-lagoon focus:outline-none focus:ring-2 focus:ring-lagoon/20"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="date">Sort by date</option>
              <option value="amount">Sort by amount</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <thead className="bg-slate-50 text-sm font-semibold text-slate-500">
                <tr>
                  {["ID", "Device", "Date", "Amount", "Status"].map((head) => (
                    <th key={head} className="px-6 py-4">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-t border-slate-100 transition-colors hover:bg-slate-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-slate-600">{row.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-ink">{row.device}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{row.date}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-ink">{row.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${statusColor[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function B2BCatalogue() {
  const [brand, setBrand] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const filtered = catalogueItems.filter(
    (item) => (brand === "All" || item.brand === brand) && (typeFilter === "All" || item.type === typeFilter)
  );

  return (
    <section id="catalogue" className="relative overflow-hidden bg-slate-950 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(25,211,162,0.05),_transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-limepop/10 px-3 py-1 text-xs font-bold text-limepop">
          <PackageCheck size={12} /> B2B Portal
        </div>
        <h2 className="mt-2 text-4xl font-black tracking-normal">Component Catalogue</h2>
        <p className="mt-2 text-slate-400">Quality-tested parts for repair businesses</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6 rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="flex items-center gap-2 font-black text-white">
              <Search size={18} /> Filters
            </h3>
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Device Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {["All", "Phone", "Laptop", "Tablet"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                        typeFilter === type
                          ? "bg-limepop text-ink"
                          : "bg-white/10 text-slate-300 hover:bg-white/20"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Brand</label>
                <select
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors focus:border-limepop focus:outline-none focus:ring-2 focus:ring-limepop/20"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                >
                  {["All", "Apple", "Dell", "Samsung", "Sony"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Grade</label>
                <div className="flex gap-2">
                  {["A", "B", "C"].map((grade) => (
                    <button
                      key={grade}
                      className="flex-1 rounded-lg border border-white/20 bg-white/5 py-2 text-sm font-semibold text-slate-400 transition-colors hover:bg-white/10"
                    >
                      Grade {grade}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white placeholder:text-slate-500 backdrop-blur-sm"
                  />
                  <span className="text-slate-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white placeholder:text-slate-500 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
            <button className="w-full rounded-xl bg-gradient-to-r from-mint to-emerald-500 py-3 font-bold text-ink transition-all hover:shadow-lg hover:shadow-mint/30">
              Apply Filters
            </button>
          </aside>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item, index) => (
              <article
                key={item.id}
                className="group card-hover overflow-hidden rounded-2xl bg-white text-ink shadow-lg shadow-black/20 transition-all hover:shadow-xl hover:shadow-black/30"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.component}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-limepop px-3 py-1 text-xs font-black">
                    Grade {item.grade}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold text-slate-400">{item.id}</p>
                  <h3 className="mt-1 text-lg font-black">{item.brand}</h3>
                  <p className="text-sm font-semibold text-slate-500">{item.component}</p>
                  <p className="text-xs text-slate-400">{item.type} • {item.condition}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <strong className="text-xl text-ink">{money.format(item.price)}</strong>
                    <button className="rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95">
                      Add +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
