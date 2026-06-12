import React from "react";
import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Banknote,
  Cpu,
  Gamepad2,
  Laptop,
  Leaf,
  PackageCheck,
  Recycle,
  Search,
  ShieldCheck,
  Smartphone,
  Tablet,
  Truck,
  Upload,
  WalletCards
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
    </main>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#home" className="flex items-center gap-2 font-black text-2xl tracking-tight">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-limepop">
            <Recycle size={23} />
          </span>
          Eswap
        </a>
        <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          <a href="#wizard">Quote</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#catalogue">B2B Catalogue</a>
        </div>
        <a
          href="#wizard"
          className="rounded-lg bg-lagoon px-4 py-2 text-sm font-bold text-white shadow-glow"
        >
          Get Instant Quote
        </a>
      </nav>
    </header>
  );
}

function Homepage() {
  return (
    <section id="home" className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.02fr_0.98fr]">
      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint/35 bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
          <Leaf size={16} /> Pakistan's circular electronics marketplace
        </div>
        <h1 className="max-w-3xl text-5xl font-black leading-[1.03] tracking-normal text-ink sm:text-6xl lg:text-7xl">
          Turn Dead Devices Into Cash
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Eswap gives consumers instant value for broken electronics and routes reusable
          parts to repair businesses that need reliable components fast.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#wizard" className="rounded-lg bg-ink px-6 py-4 text-center font-extrabold text-white shadow-soft">
            Get Instant Quote
          </a>
          <a href="#catalogue" className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-center font-extrabold text-ink">
            Browse Components
          </a>
        </div>
      </div>
      <div className="relative">
        <div className="rounded-[32px] border border-white bg-white p-5 shadow-glow">
          <div className="rounded-[24px] bg-ink p-8 text-white">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">Live impact</span>
              <Recycle className="text-limepop" />
            </div>
            <div className="counter-pulse mt-12">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-limepop">E-waste diverted</p>
              <p className="mt-2 text-6xl font-black sm:text-7xl">128,420 kg</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3">
              {["Phones", "Laptops", "Tablets", "Consoles"].map((label, index) => (
                <div key={label} className="rounded-xl bg-white/10 p-4">
                  <p className="text-2xl font-black">{[4820, 1710, 990, 640][index]}</p>
                  <p className="text-sm text-slate-300">{label} recovered</p>
                </div>
              ))}
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
    <section id="wizard" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-black uppercase tracking-[0.18em] text-coral">Consumer Portal</p>
            <h2 className="mt-2 text-4xl font-black tracking-normal text-ink">Device Submission Wizard</h2>
          </div>
          <StepTabs step={step} setStep={setStep} />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-soft">
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
            <div className="mt-6 flex justify-between gap-3">
              <button
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-extrabold disabled:opacity-40"
                disabled={step === 1}
                onClick={() => setStep((current) => current - 1)}
              >
                Back
              </button>
              {step < 4 ? (
                <button
                  className="rounded-lg bg-ink px-5 py-3 font-extrabold text-white"
                  onClick={() => setStep((current) => current + 1)}
                >
                  Continue
                </button>
              ) : (
                <button className="rounded-lg bg-lagoon px-5 py-3 font-extrabold text-white shadow-glow" onClick={finish}>
                  Generate Quote
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
  return (
    <div className="grid grid-cols-4 rounded-lg bg-slate-100 p-1">
      {[1, 2, 3, 4].map((item) => (
        <button
          key={item}
          onClick={() => setStep(item)}
          className={`h-10 min-w-12 rounded-md text-sm font-black ${step === item ? "bg-white text-lagoon shadow-sm" : "text-slate-500"}`}
        >
          {item}
        </button>
      ))}
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
  const display = quote ?? {
    amount: 23500,
    componentValue: 18330,
    scrapValue: 5170,
    divertedKg: 0.42,
    model: "iPhone 13 Pro",
    brand: "Apple"
  };
  return (
    <section id="quote" className="bg-[#f6fff9] py-20">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="font-black uppercase tracking-[0.18em] text-emerald-700">Instant Quote Screen</p>
          <h2 className="mt-3 text-5xl font-black tracking-normal text-ink">{money.format(display.amount)}</h2>
          <p className="mt-4 text-lg font-semibold text-slate-600">Offer for {display.brand} {display.model}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="rounded-lg bg-mint px-6 py-4 font-black text-ink shadow-soft">
              Accept & Schedule Pickup
            </button>
            <button className="rounded-lg border border-slate-300 bg-white px-6 py-4 font-black text-ink">
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
  const statusColor = { Pending: "bg-solar text-ink", Collected: "bg-blue-100 text-lagoon", Paid: "bg-emerald-100 text-emerald-700" };
  const rows = [...submissions].sort((a, b) => (sortBy === "amount" ? b.amount.localeCompare(a.amount) : b.date.localeCompare(a.date)));

  return (
    <section id="dashboard" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        <p className="font-black uppercase tracking-[0.18em] text-violetpop">User Dashboard</p>
        <h2 className="mt-2 text-4xl font-black tracking-normal">Your recovery impact</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((item) => (
            <article key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-bold text-slate-500">{item.label}</p>
              <p className="mt-3 text-3xl font-black">{item.value}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-4">
            <h3 className="font-black">Submissions</h3>
            <select className="rounded-lg border border-slate-200 px-3 py-2 font-bold" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="date">Sort by date</option>
              <option value="amount">Sort by amount</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  {["ID", "Device", "Date", "Amount", "Status"].map((head) => (
                    <th key={head} className="px-4 py-3">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100">
                    <td className="px-4 py-4 font-bold">{row.id}</td>
                    <td className="px-4 py-4">{row.device}</td>
                    <td className="px-4 py-4">{row.date}</td>
                    <td className="px-4 py-4 font-bold">{row.amount}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${statusColor[row.status]}`}>{row.status}</span>
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
  const filtered = brand === "All" ? catalogueItems : catalogueItems.filter((item) => item.brand === brand);

  return (
    <section id="catalogue" className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-5">
        <p className="font-black uppercase tracking-[0.18em] text-limepop">B2B Portal</p>
        <h2 className="mt-2 text-4xl font-black tracking-normal">Component Catalogue</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-2xl bg-white p-5 text-ink">
            <h3 className="font-black">Filters</h3>
            {["Device type", "Brand", "Component", "Grade", "Price range"].map((label) => (
              <label key={label} className="mt-4 block">
                <span className="text-sm font-extrabold text-slate-500">{label}</span>
                {label === "Brand" ? (
                  <select className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-bold" value={brand} onChange={(event) => setBrand(event.target.value)}>
                    {["All", "Apple", "Dell", "Samsung", "Sony"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                ) : (
                  <div className="mt-2 h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-400">Showcase filter</div>
                )}
              </label>
            ))}
          </aside>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-lg bg-white text-ink shadow-soft">
                <img src={item.image} alt={item.component} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black text-slate-500">{item.id}</p>
                    <span className="rounded-full bg-limepop px-3 py-1 text-xs font-black">Grade {item.grade}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-black">{item.brand} {item.component}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{item.type} component</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <strong className="text-xl">{money.format(item.price)}</strong>
                    <button className="rounded-lg bg-ink px-4 py-2 text-sm font-black text-white">
                      Add to Order
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
