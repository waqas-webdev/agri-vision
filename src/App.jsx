import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Leaf,
  LayoutDashboard,
  Sprout,
  ScanSearch,
  Wallet,
  Wheat,
  History as HistoryIcon,
  Bot,
  User,
  LogIn,
  UserPlus,
  Info,
  Menu,
  X,
  Plus,
  Trash2,
  Pencil,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Search,
  Users,
  Stethoscope,
  ClipboardList,
  BarChart3,
  LogOut,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const cropSeed = [
  {
    id: 1,
    name: "Tomato",
    area: "2 Acres",
    season: "Kharif",
    status: "Healthy",
  },
  { id: 2, name: "Wheat", area: "3 Acres", season: "Rabi", status: "Healthy" },
  {
    id: 3,
    name: "Potato",
    area: "1.5 Acres",
    season: "Rabi",
    status: "Needs attention",
  },
];
const expenseSeed = [
  {
    id: 1,
    title: "Seeds",
    amount: 12500,
    date: "2026-08-12",
    category: "Inputs",
  },
  {
    id: 2,
    title: "Fertilizer",
    amount: 8500,
    date: "2026-08-18",
    category: "Inputs",
  },
  {
    id: 3,
    title: "Irrigation",
    amount: 4200,
    date: "2026-08-24",
    category: "Utilities",
  },
];
const harvestSeed = [
  {
    id: 1,
    crop: "Wheat",
    quantity: "18 Quintal",
    date: "2026-08-20",
    value: 54000,
  },
  {
    id: 2,
    crop: "Tomato",
    quantity: "12 Quintal",
    date: "2026-08-28",
    value: 36000,
  },
];
const diseases = [
  {
    name: "Healthy Leaf",
    confidence: 98,
    symptoms:
      "Leaf is green and uniform with no visible lesions, spots or fungal growth.",
    cause: "No active disease detected.",
    treatment:
      "No chemical treatment is required. Continue balanced nutrition and irrigation.",
    prevention:
      "Keep foliage dry where possible, monitor fields weekly and remove damaged leaves.",
    crop: "General",
  },
  {
    name: "Early Blight",
    confidence: 94,
    symptoms:
      "Brown circular spots, often with concentric rings; older leaves may yellow and fall.",
    cause:
      "Commonly associated with Alternaria fungi and prolonged leaf wetness.",
    treatment:
      "Remove infected leaves, improve airflow and use a locally approved fungicide according to its label.",
    prevention:
      "Use crop rotation, avoid overhead irrigation, sanitize tools and remove crop debris.",
    crop: "Tomato / Potato",
  },
  {
    name: "Late Blight",
    confidence: 91,
    symptoms:
      "Dark water-soaked lesions that can expand quickly; white growth may appear under humid conditions.",
    cause: "Phytophthora infestans thrives in cool, wet weather.",
    treatment:
      "Remove severely affected tissue and use an approved late-blight management program based on local advice.",
    prevention:
      "Improve drainage, avoid prolonged leaf wetness, monitor weather and scout frequently.",
    crop: "Tomato / Potato",
  },
  {
    name: "Leaf Spot",
    confidence: 89,
    symptoms:
      "Small tan, brown or dark lesions that may merge into larger patches.",
    cause:
      "Several fungal or bacterial pathogens can cause leaf spot symptoms.",
    treatment:
      "Prune affected leaves, reduce humidity around foliage and use an approved treatment if diagnosis is confirmed.",
    prevention:
      "Field sanitation, adequate spacing, clean irrigation water and crop rotation.",
    crop: "Multiple crops",
  },
  {
    name: "Powdery Mildew",
    confidence: 93,
    symptoms:
      "White powder-like growth on leaf surfaces, followed by yellowing or distortion.",
    cause:
      "Powdery mildew fungi spread readily in warm conditions with poor airflow.",
    treatment:
      "Remove heavily infected leaves and apply an approved mildew treatment as directed.",
    prevention:
      "Increase airflow, avoid excessive nitrogen and inspect new growth regularly.",
    crop: "Multiple crops",
  },
];

function useStore(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? initial;
    } catch {
      return initial;
    }
  });
  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [key, value],
  );
  return [value, setValue];
}
function go(path) {
  window.location.hash = path;
}
function useRoute() {
  const [route, setRoute] = useState(location.hash.slice(1) || "/");
  useEffect(() => {
    const f = () => setRoute(location.hash.slice(1) || "/");
    addEventListener("hashchange", f);
    return () => removeEventListener("hashchange", f);
  }, []);
  return route;
}
function Link({ to, children, className = "" }) {
  return (
    <a className={className} href={"#" + to}>
      {children}
    </a>
  );
}

function Header() {
  return (
    <header className="top-header">
      <Link to="/" className="brand">
        <span className="brand-icon">
          <Leaf size={22} />
        </span>
        <span>
          AgriVision <b>AI</b>
        </span>
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <a href="#features">Features</a>
        <Link to="/about">About Us</Link>
        <a href="#contact">Contact</a>
      </nav>
      <div className="header-actions">
        <Link to="/login" className="btn btn-outline">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-icon">
              <Leaf size={20} />
            </span>
            <span>
              AgriVision <b>AI</b>
            </span>
          </div>
          <p>Smart technology for better agriculture.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/about">About Us</Link>
          <a href="mailto:info@agrivisionai.com">Contact</a>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <h4>Platform</h4>
          <Link to="/disease">Disease Detection</Link>
          <Link to="/dashboard">Farm Management</Link>
          <Link to="/assistant">AI Assistant</Link>
          <Link to="/dashboard">Farm Insights</Link>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p>
            <Phone size={15} /> +91 98765 43210
          </p>
          <p>
            <Mail size={15} /> info@agrivisionai.com
          </p>
          <p>
            <MapPin size={15} /> India
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} AgriVision AI. All rights reserved.
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <Header />
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="eyebrow">AI-POWERED SMART FARMING</span>
            <h1>
              Smart Farming with <span>Artificial Intelligence</span>
            </h1>
            <p>
              Detect crop diseases, manage your farm, track expenses and get
              intelligent farming guidance from one simple platform.
            </p>
            <div className="hero-buttons">
              <Link to="/disease" className="btn btn-primary btn-lg">
                Start Detection <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-light btn-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="section">
        <div className="section-heading">
          <span className="eyebrow">POWERFUL FEATURES</span>
          <h2>Everything your farm needs</h2>
          <p>Simple tools designed for modern farmers.</p>
        </div>
        <div className="feature-grid">
          {[
            [
              ScanSearch,
              "AI Disease Detection",
              "Upload a crop image and receive a guided disease assessment.",
            ],
            [
              LayoutDashboard,
              "Farm Dashboard",
              "See crops, harvest, expenses and important farm activity in one place.",
            ],
            [
              Bot,
              "AI Farming Assistant",
              "Ask farming questions and get quick practical guidance.",
            ],
            [
              BarChart3,
              "Farm Insights",
              "Track performance and make better decisions using your farm records.",
            ],
          ].map(([I, t, d]) => (
            <div className="feature-card" key={t}>
              <div className="feature-icon">
                <I />
              </div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="cta">
        <div>
          <h2>Ready to make farming smarter?</h2>
          <p>Start with disease detection or create your farmer account.</p>
        </div>
        <Link to="/register" className="btn btn-light">
          Get Started <ArrowRight size={18} />
        </Link>
      </section>
      <Footer />
    </>
  );
}

function Auth({ register = false }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem("agrivisionUser", JSON.stringify(form));
    go("/dashboard");
  };
  return (
    <>
      <Header />
      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-icon">{register ? <UserPlus /> : <LogIn />}</div>
          <h1>{register ? "Create your account" : "Welcome back"}</h1>
          <p>
            {register
              ? "Join AgriVision AI and manage your farm smarter."
              : "Sign in to your AgriVision AI dashboard."}
          </p>
          <form onSubmit={submit}>
            {register && (
              <label>
                Full Name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Farmer Ali"
                />
              </label>
            )}
            <label>
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
              />
            </label>
            <button className="btn btn-primary full">
              {register ? "Create Account" : "Login"}
            </button>
          </form>
          <p className="switch">
            {register ? "Already have an account? " : "New to AgriVision AI? "}
            <Link to={register ? "/login" : "/register"}>
              {register ? "Login" : "Register"}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
function About() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <span className="eyebrow">ABOUT AGRIVISION AI</span>
          <h1>Technology that works with the farmer</h1>
          <p>
            AgriVision AI brings crop monitoring, disease guidance and farm
            records into a single farmer-friendly experience.
          </p>
        </section>
        <section className="section two-col">
          <div>
            <span className="eyebrow">OUR MISSION</span>
            <h2>Better decisions, healthier crops, stronger farms.</h2>
            <p>
              Our platform is designed to make useful agricultural information
              easier to access. Farmers can maintain crop records, understand
              disease symptoms, review treatments and keep track of operational
              costs.
            </p>
            <p className="muted">
              The disease detector in this frontend project is a demonstration
              UI. A production deployment should connect it to a trained
              machine-learning service and verified local agronomy guidance.
            </p>
          </div>
          <div className="about-points">
            {[
              "Simple farmer-first interface",
              "Crop and expense management",
              "Disease history and treatment notes",
              "AI assistant for common questions",
            ].map((x) => (
              <div className="check-row" key={x}>
                <CheckCircle2 />
                <span>{x}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Side({ admin = false }) {
  const [open, setOpen] = useState(false);
  const items = admin
    ? [
        ["/admin", LayoutDashboard, "Admin Dashboard"],
        ["/admin/users", Users, "Users"],
        ["/admin/diseases", Stethoscope, "Diseases"],
        ["/admin/treatments", ClipboardList, "Treatments"],
      ]
    : [
        ["/dashboard", LayoutDashboard, "Dashboard"],
        ["/crops", Sprout, "My Crops"],
        ["/disease", ScanSearch, "Disease Detection"],
        ["/expenses", Wallet, "Expenses"],
        ["/harvest", Wheat, "Harvest"],
        ["/history", HistoryIcon, "Disease History"],
        ["/assistant", Bot, "AI Assistant"],
        ["/profile", User, "Profile"],
      ];
  return (
    <>
      <button className="mobile-menu" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <aside className={"sidebar " + (open ? "show" : "")}>
        <Link to="/" className="side-brand">
          <Leaf />{" "}
          <span>
            AgriVision <b>AI</b>
          </span>
        </Link>
        <div className="side-label">{admin ? "ADMIN" : "FARMER PORTAL"}</div>
        {items.map(([to, I, label]) => (
          <Link
            onClick={() => setOpen(false)}
            key={to}
            to={to}
            className="side-link"
          >
            <I size={19} />
            <span>{label}</span>
          </Link>
        ))}
        <div className="side-spacer" />
        <Link to="/" className="side-link">
          <LogOut size={19} />
          <span>Exit</span>
        </Link>
      </aside>
    </>
  );
}
function AppShell({ children, admin = false }) {
  return (
    <div className="app-shell">
      <Side admin={admin} />
      <main className="app-main">{children}</main>
    </div>
  );
}
function DashTop({ title, subtitle }) {
  return (
    <div className="dash-top">
      <div>
        <span className="eyebrow">AGRIVISION AI</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="user-chip">
        <User size={18} /> Farmer Ali
      </div>
    </div>
  );
}

function Dashboard() {
  const [crops] = useStore("crops", cropSeed),
    [expenses] = useStore("expenses", expenseSeed),
    [harvest] = useStore("harvest", harvestSeed),
    [history] = useStore("history", [
      {
        id: 1,
        disease: "Early Blight",
        crop: "Tomato",
        confidence: 94,
        date: "2026-08-29",
      },
    ]);
  const total = expenses.reduce((a, b) => a + Number(b.amount), 0);
  return (
    <AppShell>
      <DashTop
        title="Welcome back, Farmer Ali! 🌱"
        subtitle="Here is your farm overview for today."
      />
      <div className="stats-grid">
        <Stat icon={Sprout} label="My Crops" value={crops.length} />
        <Stat
          icon={ScanSearch}
          label="Diseases Detected"
          value={history.length}
        />
        <Stat icon={Wheat} label="Total Harvest" value={harvest.length} />
        <Stat
          icon={Wallet}
          label="Total Expenses"
          value={"₹" + total.toLocaleString("en-IN")}
        />
      </div>
      <div className="panel-grid">
        <Panel title="Recent Disease Detections">
          <DataTable
            headers={["Disease", "Crop", "Confidence", "Date"]}
            rows={history
              .slice(-5)
              .reverse()
              .map((x) => [x.disease, x.crop, x.confidence + "%", x.date])}
          />
        </Panel>
        <Panel title="Recent Expenses">
          <DataTable
            headers={["Expense", "Category", "Amount", "Date"]}
            rows={expenses
              .slice(-5)
              .reverse()
              .map((x) => [
                x.title,
                x.category,
                "₹" + Number(x.amount).toLocaleString("en-IN"),
                x.date,
              ])}
          />
        </Panel>
      </div>
    </AppShell>
  );
}
function Stat({ icon: I, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <I />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
function Panel({ title, children, action }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
function DataTable({ headers, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="empty">
                No records yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function CrudPage({ type }) {
  const configs = {
    crops: {
      title: "My Crops",
      icon: Sprout,
      key: "crops",
      seed: cropSeed,
      fields: [
        ["name", "Crop Name"],
        ["area", "Area"],
        ["season", "Season"],
      ],
      headers: ["Crop", "Area", "Season", "Status"],
    },
    expenses: {
      title: "Expenses",
      icon: Wallet,
      key: "expenses",
      seed: expenseSeed,
      fields: [
        ["title", "Expense"],
        ["amount", "Amount"],
        ["category", "Category"],
      ],
      headers: ["Expense", "Amount", "Category", "Date"],
    },
    harvest: {  
      title: "Harvest",
      icon: Wheat,
      key: "harvest",
      seed: harvestSeed,
      fields: [
        ["crop", "Crop"],
        ["quantity", "Quantity"],
        ["value", "Value"],
      ],
      headers: ["Crop", "Quantity", "Value", "Date"],
    },
  };
  const c = configs[type];
  const [items, setItems] = useStore(c.key, c.seed);
  const [form, setForm] = useState({});
  const add = (e) => {
    e.preventDefault();
    setItems([
      ...items,
      {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().slice(0, 10),
        status: "Healthy",
      },
    ]);
    setForm({});
  };
  return (
    <AppShell>
      <DashTop title={c.title} subtitle={"Manage your " + type + " records."} />
      <Panel title={"Add " + type.slice(0, -1)}>
        <form className="inline-form" onSubmit={add}>
          {c.fields.map(([key, label]) => (
            <input
              key={key}
              required
              value={form[key] || ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={label}
            />
          ))}
          <button className="btn btn-primary">
            <Plus size={17} /> Add
          </button>
        </form>
      </Panel>
      <Panel title="All Records">
        <div className="record-list">
          {items.map((item) => (
            <div className="record-row" key={item.id}>
              <div>
                <b>
                  {type === "expenses"
                    ? item.title
                    : type === "harvest"
                      ? item.crop
                      : item.name}
                </b>
                <span>{item.date || item.season || ""}</span>
              </div>
              <div className="record-meta">
                {type === "expenses"
                  ? "₹" + Number(item.amount).toLocaleString("en-IN")
                  : type === "harvest"
                    ? item.quantity
                    : item.area}
              </div>
              <button
                className="icon-btn danger"
                onClick={() => setItems(items.filter((x) => x.id !== item.id))}
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}

function Disease() {
  const [file, setFile] = useState(null),
    [result, setResult] = useState(null),
    input = useRef();
  const detect = () => {
    if (!file) return;
    const r = diseases[Math.floor(Math.random() * 4) + 1];
    setResult(r);
  };
  const historySeed = [
    {
      id: 1,
      disease: "Early Blight",
      crop: "Tomato",
      confidence: 94,
      date: "2026-08-29",
    },
  ];
  const [history, setHistory] = useStore("history", historySeed);
  const save = () => {
    if (result)
      setHistory([
        ...history,
        {
          id: Date.now(),
          disease: result.name,
          crop: result.crop,
          confidence: result.confidence,
          date: new Date().toISOString().slice(0, 10),
        },
      ]);
  };
  return (
    <AppShell>
      <DashTop
        title="Disease Detection"
        subtitle="Upload a clear crop leaf image for a guided AI-style assessment."
      />
      <div className="disease-grid">
        <Panel title="Upload Crop Image">
          <div
            className="dropzone"
            onClick={() => input.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              setFile(e.dataTransfer.files[0]);
            }}
          >
            <Upload />
            <h3>
              {file ? "Image selected" : "Drop image here or click to browse"}
            </h3>
            <p>PNG, JPG or JPEG</p>
            <input
              ref={input}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && (
              <img
                className="preview"
                src={URL.createObjectURL(file)}
                alt="Crop preview"
              />
            )}
          </div>
          <button
            disabled={!file}
            onClick={detect}
            className="btn btn-primary full"
          >
            Analyze Disease
          </button>
        </Panel>
        {result ? (
          <Panel title="Detection Result">
            <div className="result-badge">
              <AlertTriangle /> <span>{result.name}</span>
              <b>{result.confidence}% confidence</b>
            </div>
            <div className="detail-grid">
              <Detail t="Crop" v={result.crop} />
              <Detail t="Symptoms" v={result.symptoms} />
              <Detail t="Cause" v={result.cause} />
              <Detail t="Treatment / Cure" v={result.treatment} />
              <Detail t="Prevention" v={result.prevention} />
              <Detail
                t="Field Note"
                v="Confirm severe or unusual cases with a qualified local agriculture professional before applying treatments."
              />
            </div>
            <button className="btn btn-secondary" onClick={save}>
              Save to Disease History
            </button>
          </Panel>
        ) : (
          <Panel title="What you will receive">
            <div className="info-list">
              <div>
                <CheckCircle2 />
                <span>Disease name and confidence estimate</span>
              </div>
              <div>
                <CheckCircle2 />
                <span>Symptoms and likely cause</span>
              </div>
              <div>
                <CheckCircle2 />
                <span>Treatment / cure guidance</span>
              </div>
              <div>
                <CheckCircle2 />
                <span>Prevention and field-care tips</span>
              </div>
            </div>
          </Panel>
        )}
      </div>
    </AppShell>
  );
}
function Detail({ t, v }) {
  return (
    <div className="detail">
      <b>{t}</b>
      <p>{v}</p>
    </div>
  );
}
function History() {
  const [history, setHistory] = useStore("history", [
    {
      id: 1,
      disease: "Early Blight",
      crop: "Tomato",
      confidence: 94,
      date: "2026-08-29",
    },
  ]);
  return (
    <AppShell>
      <DashTop
        title="Disease History"
        subtitle="Review previous crop disease assessments."
      />
      <Panel title="Detection Records">
        <DataTable
          headers={["Disease", "Crop", "Confidence", "Date", "Action"]}
          rows={history.map((x) => [
            x.disease,
            x.crop,
            x.confidence + "%",
            x.date,
            <button
              className="icon-btn danger"
              onClick={() => setHistory(history.filter((y) => y.id !== x.id))}
            >
              <Trash2 size={16} />
            </button>,
          ])}
        />
      </Panel>
    </AppShell>
  );
}
function Assistant() {
  const [q, setQ] = useState(""),
    [messages, setMessages] = useState([
      {
        from: "ai",
        text: "Hello Farmer Ali! Ask me about crops, irrigation, fertilizer, pests or disease prevention.",
      },
    ]);
  const ask = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    const low = q.toLowerCase();
    let a =
      "For a reliable recommendation, inspect the crop, soil and local weather conditions. I can help you organize the next steps.";
    if (low.includes("water") || low.includes("irrigation"))
      a =
        "Irrigate according to crop stage, soil moisture and weather. Avoid prolonged leaf wetness when fungal disease is a concern.";
    else if (low.includes("fertil"))
      a =
        "Use soil-test results where available and avoid over-applying nitrogen. Match fertilizer to crop stage and local recommendations.";
    else if (low.includes("disease"))
      a =
        "Start with clear leaf photos, check symptoms on multiple plants and record the date and affected crop area.";
    setMessages([
      ...messages,
      { from: "user", text: q },
      { from: "ai", text: a },
    ]);
    setQ("");
  };
  return (
    <AppShell>
      <DashTop
        title="AI Farming Assistant"
        subtitle="Get quick guidance for common farm questions."
      />
      <section className="chat panel">
        <div className="messages">
          {messages.map((m, i) => (
            <div className={"message " + m.from} key={i}>
              {m.text}
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={ask}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask: How often should I irrigate tomatoes?"
          />
          <button className="btn btn-primary">Ask</button>
        </form>
      </section>
    </AppShell>
  );
}
function Profile() {
  const [p, setP] = useStore("profile", {
    name: "Farmer Ali",
    email: "farmer@example.com",
    phone: "+91 98765 43210",
    farm: "Green Valley Farm",
  });
  const save = (e) => {
    e.preventDefault();
    alert("Profile updated successfully.");
  };
  return (
    <AppShell>
      <DashTop title="Profile" subtitle="Manage your farmer information." />
      <Panel title="Profile Details">
        <form className="form-grid" onSubmit={save}>
          {Object.entries(p).map(([k, v]) => (
            <label key={k}>
              {k[0].toUpperCase() + k.slice(1)}
              <input
                value={v}
                onChange={(e) => setP({ ...p, [k]: e.target.value })}
              />
            </label>
          ))}
          <button className="btn btn-primary">Save Changes</button>
        </form>
      </Panel>
    </AppShell>
  );
}

function AdminDashboard() {
  return (
    <AppShell admin>
      <DashTop
        title="Admin Dashboard"
        subtitle="Platform overview and management controls."
      />
      <div className="stats-grid">
        <Stat icon={Users} label="Registered Users" value="128" />
        <Stat
          icon={Stethoscope}
          label="Disease Library"
          value={diseases.length}
        />
        <Stat icon={ClipboardList} label="Treatments" value="18" />
        <Stat icon={BarChart3} label="Analyses This Month" value="342" />
      </div>
      <Panel title="Admin Overview">
        <div className="admin-note">
          <CheckCircle2 />
          <div>
            <b>System ready</b>
            <p>
              Use the admin pages in the sidebar to manage users, diseases and
              treatment guidance.
            </p>
          </div>
        </div>
      </Panel>
    </AppShell>
  );
}
function AdminUsers() {
  const [users, setUsers] = useStore("users", [
    { id: 1, name: "Farmer Ali", email: "farmer@example.com", role: "Farmer" },
    { id: 2, name: "Demo User", email: "demo@example.com", role: "Farmer" },
  ]);
  return (
    <AppShell admin>
      <DashTop title="Users" subtitle="Manage registered platform users." />
      <Panel title="User Directory">
        <DataTable
          headers={["Name", "Email", "Role", "Action"]}
          rows={users.map((u) => [
            u.name,
            u.email,
            u.role,
            <button
              className="icon-btn danger"
              onClick={() => setUsers(users.filter((x) => x.id !== u.id))}
            >
              <Trash2 size={16} />
            </button>,
          ])}
        />
      </Panel>
    </AppShell>
  );
}
function AdminDiseases() {
  const [items, setItems] = useStore("diseaseLibrary", diseases);
  const [q, setQ] = useState("");
  const filtered = items.filter((x) =>
    x.name.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <AppShell admin>
      <DashTop
        title="Diseases"
        subtitle="Manage the disease knowledge library."
      />
      <Panel
        title="Disease Library"
        action={
          <div className="search">
            <Search size={16} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search diseases"
            />
          </div>
        }
      >
        <div className="card-list">
          {filtered.map((d, i) => (
            <div className="library-card" key={d.name}>
              <div>
                <b>{d.name}</b>
                <p>{d.symptoms}</p>
                <small>{d.crop}</small>
              </div>
              <button
                className="icon-btn danger"
                onClick={() => setItems(items.filter((_, j) => j !== i))}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
function AdminTreatments() {
  const treatments = [
    [
      "Early Blight",
      "Remove infected leaves; use approved fungicide according to local label.",
    ],
    [
      "Late Blight",
      "Sanitation, airflow and locally approved late-blight management.",
    ],
    [
      "Powdery Mildew",
      "Improve airflow and use approved mildew treatment if confirmed.",
    ],
    ["Leaf Spot", "Prune affected tissue and reduce foliage humidity."],
  ];
  return (
    <AppShell admin>
      <DashTop
        title="Treatments"
        subtitle="Review treatment and prevention guidance."
      />
      <Panel title="Treatment Library">
        <div className="card-list">
          {treatments.map(([n, t]) => (
            <div className="library-card" key={n}>
              <div>
                <b>{n}</b>
                <p>{t}</p>
              </div>
              <Pencil size={17} />
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}

export default function App() {
  const route = useRoute();
  const map = {
    "/": <Home />,
    "/login": <Auth />,
    "/register": <Auth register />,
    "/about": <About />,
    "/dashboard": <Dashboard />,
    "/crops": <CrudPage type="crops" />,
    "/disease": <Disease />,
    "/expenses": <CrudPage type="expenses" />,
    "/harvest": <CrudPage type="harvest" />,
    "/history": <History />,
    "/assistant": <Assistant />,
    "/profile": <Profile />,
    "/admin": <AdminDashboard />,
    "/admin/users": <AdminUsers />,
    "/admin/diseases": <AdminDiseases />,
    "/admin/treatments": <AdminTreatments />,
  };
  return map[route] || <Home />;
}
