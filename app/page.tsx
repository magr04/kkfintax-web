"use client";

import { useState, useEffect, useRef } from "react";
import { IMG_P1, IMG_P2, IMG_P3, IMG_P4, IMG_LOGO, IMG_LOGO_WHITE } from "../components/images";

const IMG = { p1: IMG_P1, p2: IMG_P2, p3: IMG_P3, p4: IMG_P4, logo: IMG_LOGO, logoWhite: IMG_LOGO_WHITE };

const Icon = ({ name, size = 22, color = "currentColor", sw = 1.5 }: { name: string; size?: number; color?: string; sw?: number }) => {
  const paths: Record<string, string[]> = {
    clipboard:  ["M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"],
    chartBar:   ["M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"],
    document:   ["M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"],
    chat:       ["M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"],
    users:      ["M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"],
    office:     ["M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"],
    phone:      ["M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"],
    mail:       ["M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"],
    location:   ["M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z","M15 11a3 3 0 11-6 0 3 3 0 016 0z"],
    clock:      ["M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"],
    calendar:   ["M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"],
    check:      ["M5 13l4 4L19 7"],
    shield:     ["M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"],
    lightbulb:  ["M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"],
    arrow:      ["M5 12h14","M12 5l7 7-7 7"],
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {(paths[name] || []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
};

const useW = () => {
  const [w, setW] = useState(1200);
  useEffect(() => {
    setW(window.innerWidth);
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
};

const RED = "#8B0000";
const sf: React.CSSProperties = { fontFamily: "'Helvetica Neue',Arial,sans-serif" };
const ser: React.CSSProperties = { fontFamily: "Georgia,'Times New Roman',serif" };

const Btn = ({ children, variant = "primary", size = "md", onClick, style = {} }: {
  children: React.ReactNode; variant?: string; size?: string; onClick?: () => void; style?: React.CSSProperties;
}) => {
  const [hover, setHover] = useState(false);
  const base: React.CSSProperties = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, ...sf, fontWeight:600, cursor:"pointer", border:"none", transition:"all .18s", letterSpacing:".01em", whiteSpace:"nowrap" };
  const vars: Record<string, any> = {
    primary:      { bg:"#8B0000", hbg:"#6d0000", color:"white" },
    outline:      { bg:"transparent", hbg:"#8B0000", color:"#8B0000", hcolor:"white", border:"2px solid #8B0000" },
    white:        { bg:"white", hbg:"#f1f1f1", color:"#8B0000" },
    whiteOutline: { bg:"transparent", hbg:"rgba(255,255,255,.12)", color:"white", border:"2px solid rgba(255,255,255,.45)" },
  };
  const sizes: Record<string, React.CSSProperties> = {
    sm:{ height:34, padding:"0 16px", fontSize:13 },
    md:{ height:42, padding:"0 24px", fontSize:14 },
    lg:{ height:50, padding:"0 32px", fontSize:15 },
  };
  const v = vars[variant];
  return (
    <button onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{ ...base, ...sizes[size], background: hover?(v.hbg||v.bg):v.bg, color: hover?(v.hcolor||v.color):v.color, border: v.border||"none", ...style }}>
      {children}
    </button>
  );
};

const SERVICES = [
  { icon:"clipboard", title:"Vedení účetnictví",                       desc:"Pro malé a střední podniky, neziskové organizace a spolky." },
  { icon:"chartBar",  title:"Daňová evidence a účetnictví pro OSVČ",  desc:"Přehledná evidence příjmů a výdajů pro živnostníky a podnikatele." },
  { icon:"document",  title:"Finanční účetnictví",                     desc:"Kompletní zpracování finančních operací a výkaznictví." },
  { icon:"users",     title:"Mzdové účetnictví",                       desc:"Zpracování mezd, odvodů a veškeré mzdové agendy." },
  { icon:"shield",    title:"Zpracování podkladů k DPH",               desc:"Včetně kontrolního a souhrnného hlášení. Bez pokut, bez zpoždění." },
  { icon:"document",  title:"Zpracování podkladů k DPPO a DPFO",      desc:"Daňová přiznání právnických i fyzických osob." },
  { icon:"chat",      title:"Účetní konzultace",                       desc:"Srozumitelné odpovědi na vaše otázky. Bez zbytečného žargonu." },
  { icon:"lightbulb", title:"Zajištění konzultace daňového poradce",  desc:"Napojení na externího daňového poradce pro složitější případy." },
  { icon:"office",    title:"Poradenství při zahájení podnikání",      desc:"Pomoc se zahájením podnikání a založením společnosti." },
];

const REVIEWS = [
  { name:"Tomáš N.", role:"Jednatel s.r.o.",           text:"Kateřina přesně ví, co dělá. Přešli jsme k ní po špatné zkušenosti a konečně máme klid." },
  { name:"Lucie M.", role:"OSVČ — grafická designérka", text:"Konečně účetní, která komunikuje normálně. Vše vysvětlí, nic nezapomene, termíny drží." },
  { name:"Petr K.",  role:"E-shop provozovatel",        text:"Skvělá spolupráce od prvního kontaktu. Oceňuji individuální přístup a rychlé reakce." },
];


function CalendlyWidget({ url, mob }: { url: string; mob: boolean }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);
  return (
    <div className="calendly-inline-widget" data-url={url}
      style={{minWidth:320, height: mob ? 600 : 700, border:"1px solid #e5e7eb"}}/>
  );
}

const BOOKING_OPTIONS = [
  {
    label: "30 min",
    tag: "Zdarma",
    price: null,
    desc: "Nezávazná konzultace. Zjistíme, co potřebujete a jak vám můžeme pomoci.",
    url: "https://calendly.com/roland-magera/30min",
  },
  // { label:"60 min", tag:"Placená", price:"1 499 Kč", desc:"Detailní konzultace s konkrétními doporučeními a akčním plánem.", url:"https://calendly.com/roland-magera/30min" },
];

function BookingPicker({ mob }: { mob: boolean }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovCard, setHovCard] = useState<string | null>(null);
  return (
    <div>
      {BOOKING_OPTIONS.map(({label,tag,price,desc,url})=>{
        const active = selected === label;
        const hov = hovCard === label;
        return (
          <div key={label}>
            <button onClick={()=>setSelected(active ? null : label)}
              onMouseEnter={()=>setHovCard(label)} onMouseLeave={()=>setHovCard(null)}
              style={{width:"100%",textAlign:"left",padding:mob?"20px 24px":"28px 36px",
                border:`2px solid ${active?RED:hov?RED:"#e5e7eb"}`,
                background:active?RED:hov?"#fff8f8":"white",
                cursor:"pointer",transition:"all .18s",outline:"none",
                display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{fontWeight:700,fontSize:mob?17:20,color:active?"white":"#111",...ser}}>{label}</span>
                  <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase" as const,letterSpacing:".08em",
                    color:active?"rgba(255,255,255,.8)":"white",
                    background:active?"rgba(255,255,255,.2)":RED,
                    padding:"3px 10px",...sf}}>{price ?? tag}</span>
                </div>
                <p style={{fontSize:14,color:active?"rgba(255,255,255,.8)":hov?"#6b7280":"#6b7280",lineHeight:1.6,margin:0,...sf}}>{desc}</p>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0,
                color:active?"white":RED,fontWeight:700,fontSize:14,...sf,
                background:active?"rgba(255,255,255,.15)":"rgba(139,0,0,.07)",
                padding:"10px 20px",transition:"all .18s"}}>
                <Icon name="calendar" size={16} color={active?"white":RED} sw={2}/>
                {active ? "Skrýt kalendář" : "Vybrat termín"}
                {!active && <Icon name="arrow" size={14} color={RED} sw={2}/>}
              </div>
            </button>
            {active && <div style={{marginTop:0,border:`2px solid ${RED}`,borderTop:"none"}}><CalendlyWidget url={url} mob={mob}/></div>}
          </div>
        );
      })}
    </div>
  );
}

function QuoteForm({ mob }: { mob: boolean }) {
  const [f, setF] = useState({ name:"",email:"",phone:"",entity:"",vat:"",employees:"",dpp:"",invIn:"",invOut:"",cashDocs:"",assets:"",bankAccounts:"",note:"" });
  const [hp, setHp] = useState("");
  const formStart = useRef(Date.now());
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errs = submitted ? {
    name: !f.name,
    email: !f.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email),
    entity: !f.entity,
  } : { name: false, email: false, entity: false };

  const inp = (hasErr = false): React.CSSProperties => ({
    display:"block", width:"100%", height:42, border:`1px solid ${hasErr ? "#dc2626" : "#d1d5db"}`,
    background: hasErr ? "#fff5f5" : "white", padding:"0 12px", fontSize:14, ...sf, outline:"none", boxSizing:"border-box",
  });
  const sel = (hasErr = false): React.CSSProperties => ({
    ...inp(hasErr),
    appearance:"none", WebkitAppearance:"none",
    backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center",
    paddingRight:40, cursor:"pointer",
  });

  const submit = async () => {
    setSubmitted(true);
    if (!f.name || !f.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) || !f.entity) return;
    setLoading(true);
    setSendError(false);
    try {
      const res = await fetch("/api/send-email", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ ...f, website: hp, _t: formStart.current }) });
      if (res.ok) setDone(true);
      else setSendError(true);
    } catch { setSendError(true); }
    finally { setLoading(false); }
  };

  if (done) return (
    <div style={{textAlign:"center",padding:"56px 0"}}>
      <div style={{width:56,height:56,background:RED,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}>
        <Icon name="check" size={26} color="white" sw={2.5}/>
      </div>
      <h3 style={{...ser,fontSize:22,fontWeight:700,color:"#111",margin:"0 0 8px"}}>Poptávka odeslána</h3>
      <p style={{...sf,color:"#6b7280",fontSize:14}}>Ozveme se do 24 hodin s individuální nabídkou.</p>
    </div>
  );

  const errMsg = (msg: string) => <p style={{...sf,fontSize:12,color:"#dc2626",margin:"4px 0 0"}}>{msg}</p>;
  const lbl = (text: string) => <label style={{...sf,fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:5}}>{text}</label>;
  const sHdr = (text: string) => <p style={{...sf,fontSize:11,fontWeight:700,color:RED,textTransform:"uppercase" as const,letterSpacing:".1em",margin:"4px 0 12px",borderTop:"1px solid #f3f4f6",paddingTop:20}}>{text}</p>;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{position:"absolute",left:"-9999px",top:0,width:0,height:0,overflow:"hidden"}} aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={e=>setHp(e.target.value)}/>
      </div>

      {/* Kontaktní údaje */}
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:16}}>
        <div>
          {lbl("Jméno a příjmení *")}
          <input type="text" placeholder="Jana Nováková" value={f.name} onChange={e=>setF(p=>({...p,name:e.target.value}))} style={inp(errs.name)}/>
          {errs.name && errMsg("Toto pole je povinné")}
        </div>
        <div>
          {lbl("Pracovní e-mail *")}
          <input type="email" placeholder="jana@firma.cz" value={f.email} onChange={e=>setF(p=>({...p,email:e.target.value}))} style={inp(errs.email)}/>
          {errs.email && errMsg("Zadejte platný e-mail")}
        </div>
        <div>
          {lbl("Telefon")}
          <input type="tel" placeholder="+420 777 000 000" value={f.phone} onChange={e=>setF(p=>({...p,phone:e.target.value}))} style={inp()}/>
        </div>
        <div>
          {lbl("Typ subjektu *")}
          <select value={f.entity} onChange={e=>setF(p=>({...p,entity:e.target.value}))} style={sel(errs.entity)}>
            <option value="">Vyberte...</option>
            {["OSVČ","s.r.o.","a.s.","Spolek / nezisková org.","Jiné"].map(o=><option key={o}>{o}</option>)}
          </select>
          {errs.entity && errMsg("Toto pole je povinné")}
        </div>
        <div>
          {lbl("Plátce DPH?")}
          <select value={f.vat} onChange={e=>setF(p=>({...p,vat:e.target.value}))} style={sel()}>
            <option value="">Vyberte...</option>
            {["Ano","Ne","Nevím / plánuji se stát"].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Zaměstnanci */}
      {sHdr("Zaměstnanci")}
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:16}}>
        <div>
          {lbl("Počet zaměstnanců")}
          <input type="text" placeholder="např. 3" value={f.employees} onChange={e=>setF(p=>({...p,employees:e.target.value}))} style={inp()}/>
        </div>
        <div>
          {lbl("z toho na DPP")}
          <input type="text" placeholder="např. 1" value={f.dpp} onChange={e=>setF(p=>({...p,dpp:e.target.value}))} style={inp()}/>
        </div>
      </div>

      {/* Doklady */}
      {sHdr("Počet dokladů za měsíc (přibližně)")}
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:16}}>
        {([["Faktury přijaté","invIn"],["Faktury vydané","invOut"],["Pokladní doklady","cashDocs"],["Majetek","assets"],["Počet bankovních účtů","bankAccounts"]] as [string,string][]).map(([label,key])=>(
          <div key={key}>
            {lbl(label)}
            <input type="text" placeholder="0" value={(f as any)[key]} onChange={e=>setF(p=>({...p,[key]:e.target.value}))} style={inp()}/>
          </div>
        ))}
      </div>

      {/* Poznámka */}
      {sHdr("Doplňující informace")}
      <div>
        {lbl("Poznámka")}
        <textarea rows={4} placeholder="Cokoli, co nám pomůže připravit přesnou nabídku..." value={f.note} onChange={e=>setF(p=>({...p,note:e.target.value}))} style={{...inp(),height:"auto",padding:"10px 12px",resize:"none"}}/>
      </div>

      <Btn variant="primary" size="lg" onClick={submit} style={{width:"100%",marginTop:8}}>
        {loading ? "Odesílám…" : <>Odeslat poptávku <Icon name="arrow" size={16} sw={2}/></>}
      </Btn>
      {sendError && <p style={{...sf,fontSize:13,color:"#dc2626",textAlign:"center",margin:0}}>Nastala chyba, zkuste to prosím znovu.</p>}
      <p style={{...sf,fontSize:12,color:"#9ca3af",textAlign:"center",margin:0}}>Ozveme se do 24 hodin. Bez závazků.</p>
    </div>
  );
}

function FloatingCTA({ onClick }: { onClick: () => void }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const h = () => setVis(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{position:"fixed",bottom:24,right:24,zIndex:100,transition:"opacity .3s,transform .3s",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",pointerEvents:vis?"auto":"none"}}>
      <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:10,background:RED,color:"white",border:"none",padding:"13px 22px",cursor:"pointer",...sf,fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(139,0,0,.4)"}}>
        <Icon name="calendar" size={16} color="white" sw={2}/> Rezervovat schůzku
      </button>
    </div>
  );
}

export default function KKFintax() {
  const w = useW();
  const mob = w < 768;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <div style={{margin:0,padding:0,background:"#fff",...ser}}>
      <FloatingCTA onClick={()=>go("booking")}/>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:50,background:"white",borderBottom:"1px solid #e5e7eb",boxShadow:"0 1px 8px rgba(0,0,0,.06)"}}>
        <div style={{maxWidth:1152,margin:"0 auto",padding:"0 20px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <img src={IMG.logo} alt="KKFintax" style={{height:36,width:"auto",objectFit:"contain",display:"block"}}/>
          {mob ? (
            <Btn variant="primary" size="md" onClick={()=>go("booking")}>Rezervovat schůzku <Icon name="arrow" size={14} sw={2}/></Btn>
          ) : (
            <div style={{display:"flex",alignItems:"center",gap:28,...sf}}>
              {[["Služby","services"],["O nás","about"],["Recenze","reviews"],["Poptávka","quote"],["Kontakt","contact"]].map(([l,id])=>(
                <button key={id} onClick={()=>go(id)} style={{fontSize:14,color:"#4b5563",fontWeight:500,background:"none",border:"none",cursor:"pointer",padding:"4px 0",...sf}}
                  onMouseEnter={e=>(e.currentTarget.style.color=RED)}
                  onMouseLeave={e=>(e.currentTarget.style.color="#4b5563")}
                >{l}</button>
              ))}
              <Btn variant="primary" size="md" onClick={()=>go("booking")}>Rezervovat schůzku <Icon name="arrow" size={14} sw={2}/></Btn>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{background:"white",borderBottom:"1px solid #e5e7eb"}}>
        {mob ? (
          <>
            <div style={{padding:"48px 20px 32px"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:9,background:"#f3f4f6",padding:"6px 14px",marginBottom:24,...sf}}>
                <div style={{width:7,height:7,background:RED,borderRadius:"50%"}}/>
                <span style={{color:"#6b7280",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em"}}><span style={{color:RED}}>Účetní & daňová evidence</span> · Litovel</span>
              </div>
              <h1 style={{fontSize:36,fontWeight:700,color:"#111",lineHeight:1.12,margin:"0 0 20px",letterSpacing:"-.025em"}}>
                Účetnictví,<br/>které dává<br/><span style={{color:"#d1d5db"}}>smysl.</span>
              </h1>
              <p style={{fontSize:15,color:"#4b5563",marginBottom:32,lineHeight:1.7,...sf}}>
                Komplexní účetní služby pro OSVČ, s.r.o. i neziskové organizace. Litovel a celá ČR online.
              </p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <Btn variant="primary" size="md" onClick={()=>go("booking")}>Naplánovat schůzku <Icon name="arrow" size={16} sw={2}/></Btn>
                <Btn variant="outline" size="md" onClick={()=>go("quote")}>Cenová nabídka</Btn>
              </div>
              <div style={{display:"flex",gap:28,marginTop:40,paddingTop:36,borderTop:"1px solid #e5e7eb",...sf}}>
                {[["8+","let praxe"],["100%","online možné"]].map(([n,l])=>(
                  <div key={l}><div style={{fontSize:22,fontWeight:700,color:"#111"}}>{n}</div><div style={{fontSize:10,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",marginTop:3}}>{l}</div></div>
                ))}
              </div>
            </div>
            <div style={{padding:"0 20px 0"}}>
              <div style={{position:"relative",overflow:"hidden",height:340}}>
                <img src={IMG.p1} alt="Bc. Kateřina Kerplová" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.72))",padding:"24px 20px 16px"}}>
                  <div style={{color:"white",fontWeight:700,fontSize:14,...ser}}>Bc. Kateřina Kerplová</div>
                  <div style={{color:"rgba(255,255,255,.62)",fontSize:12,marginTop:2,...sf}}>Hlavní účetní</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{maxWidth:1152,margin:"0 auto",padding:"88px 32px",display:"flex",alignItems:"center",gap:72,minHeight:620}}>
            <div style={{flex:1}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:9,background:"#f3f4f6",padding:"6px 14px",marginBottom:24,...sf}}>
                <div style={{width:7,height:7,background:RED,borderRadius:"50%"}}/>
                <span style={{color:"#6b7280",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em"}}><span style={{color:RED}}>Účetní & daňová evidence</span> · Litovel</span>
              </div>
              <h1 style={{fontSize:54,fontWeight:700,color:"#111",lineHeight:1.12,margin:"0 0 20px",letterSpacing:"-.025em"}}>
                Účetnictví,<br/>které dává<br/><span style={{color:"#d1d5db"}}>smysl.</span>
              </h1>
              <p style={{fontSize:17,color:"#4b5563",marginBottom:32,lineHeight:1.7,maxWidth:420,...sf}}>
                Komplexní účetní služby pro OSVČ, s.r.o. i neziskové organizace. Litovel a celá ČR online.
              </p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <Btn variant="primary" size="lg" onClick={()=>go("booking")}>Naplánovat schůzku <Icon name="arrow" size={16} sw={2}/></Btn>
                <Btn variant="outline" size="lg" onClick={()=>go("quote")}>Cenová nabídka</Btn>
              </div>
              <div style={{display:"flex",gap:44,marginTop:40,paddingTop:36,borderTop:"1px solid #e5e7eb",...sf}}>
                {[["8+","let praxe"],["100%","online možné"]].map(([n,l])=>(
                  <div key={l}><div style={{fontSize:28,fontWeight:700,color:"#111"}}>{n}</div><div style={{fontSize:10,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",marginTop:3}}>{l}</div></div>
                ))}
              </div>
            </div>
            <div style={{flexShrink:0,position:"relative",width:320}}>
              <div style={{position:"absolute",top:-14,right:-14,width:"100%",height:"100%",border:`2px solid rgba(139,0,0,.2)`}}/>
              <div style={{position:"relative",zIndex:1,overflow:"hidden",height:480}}>
                <img src={IMG.p1} alt="Bc. Kateřina Kerplová" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.8))",padding:"28px 18px 18px"}}>
                  <div style={{color:"white",fontWeight:700,fontSize:15,...ser}}>Bc. Kateřina Kerplová</div>
                  <div style={{color:"rgba(255,255,255,.62)",fontSize:12,marginTop:2,...sf}}>Hlavní účetní</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* WHY ME */}
      <section style={{background:"#f9fafb",borderBottom:"1px solid #e5e7eb",padding:mob?"40px 0":"56px 0"}}>
        <div style={{maxWidth:1152,margin:"0 auto",padding:`0 ${mob?20:32}px`,display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)",gap:mob?24:36}}>
          {[["lightbulb","Individuální přístup","Každý klient je jiný. Řešení tvoříme přímo na míru."],
            ["chat","Srozumitelná komunikace","Žádný žargon. Vše vysvětlíme lidsky a jasně."],
            ["shield","Spolehlivost","Termíny dodržujeme. Na nic nezapomeneme. Vždy dostupní."],
            ["users","Online i osobně","Spolupracujeme s klienty z celé ČR bez omezení."],
          ].map(([icon,t,d])=>(
            <div key={t} style={{textAlign:"center"}}>
              <div style={{width:44,height:44,background:"rgba(139,0,0,.07)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
                <Icon name={icon} size={20} color={RED} sw={1.5}/>
              </div>
              <h4 style={{fontWeight:700,color:"#111",fontSize:mob?13:14,margin:"0 0 7px",...ser}}>{t}</h4>
              <p style={{color:"#6b7280",fontSize:mob?12:13,lineHeight:1.6,margin:0,...sf}}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{padding:mob?"56px 0":"88px 0",background:"white"}}>
        <div style={{maxWidth:1152,margin:"0 auto",padding:`0 ${mob?20:32}px`}}>
          <p style={{fontSize:11,color:RED,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12,...sf}}>Služby</p>
          <h2 style={{fontSize:mob?28:38,fontWeight:700,color:"#111",margin:"0 0 14px"}}>Čím se zabýváme</h2>
          <p style={{color:"#6b7280",maxWidth:520,marginBottom:40,lineHeight:1.65,fontSize:15,...sf}}>Komplexní účetní služby pro OSVČ, s.r.o. i neziskové organizace — od každodenní evidence po zastupování před finančním úřadem.</p>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":w<1024?"1fr 1fr":"repeat(3,1fr)",gap:16}}>
            {SERVICES.map(({icon,title,desc})=>(
              <div key={title} style={{border:"1px solid #e5e7eb",padding:mob?20:26,transition:"all .2s",cursor:"default"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=RED;(e.currentTarget as HTMLElement).style.boxShadow="0 4px 20px rgba(139,0,0,.1)";(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="#e5e7eb";(e.currentTarget as HTMLElement).style.boxShadow="none";(e.currentTarget as HTMLElement).style.transform="none";}}
              >
                <div style={{width:44,height:44,background:"rgba(139,0,0,.08)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
                  <Icon name={icon} size={22} color={RED} sw={1.5}/>
                </div>
                <h3 style={{fontWeight:700,color:"#111",margin:"0 0 8px",fontSize:15,...ser}}>{title}</h3>
                <p style={{fontSize:14,color:"#6b7280",lineHeight:1.65,margin:0,...sf}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{padding:mob?"56px 0":"88px 0",background:"#f9fafb",borderTop:"1px solid #e5e7eb"}}>
        <div style={{maxWidth:1152,margin:"0 auto",padding:`0 ${mob?20:32}px`}}>
          <p style={{fontSize:11,color:RED,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12,...sf}}>Recenze</p>
          <h2 style={{fontSize:mob?28:38,fontWeight:700,color:"#111",margin:"0 0 40px"}}>Co říkají klienti</h2>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:16}}>
            {REVIEWS.map(({name,role,text})=>(
              <div key={name} style={{background:"white",border:"1px solid #e5e7eb",padding:mob?22:30}}>
                <div style={{display:"flex",gap:3,marginBottom:18}}>
                  {[1,2,3,4,5].map(i=><svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={RED} stroke="none"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>)}
                </div>
                <p style={{color:"#374151",fontSize:14,lineHeight:1.72,margin:"0 0 22px",...sf}}>{`„${text}"`}</p>
                <div style={{display:"flex",alignItems:"center",gap:12,borderTop:"1px solid #f3f4f6",paddingTop:20}}>
                  <div style={{width:36,height:36,background:RED,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{color:"white",fontWeight:700,fontSize:14,...sf}}>{name[0]}</span>
                  </div>
                  <div>
                    <div style={{fontWeight:700,color:"#111",fontSize:14,...ser}}>{name}</div>
                    <div style={{color:"#9ca3af",fontSize:12,...sf}}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{fontSize:12,color:"#9ca3af",textAlign:"center",marginTop:24,...sf}}>* Recenze budou aktualizovány skutečnými referencemi klientů.</p>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" style={{padding:mob?"56px 0":"88px 0",background:"white",borderTop:"1px solid #e5e7eb"}}>
        <div style={{maxWidth:720,margin:"0 auto",padding:`0 ${mob?20:32}px`}}>
          <p style={{fontSize:11,color:RED,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12,...sf}}>Konzultace</p>
          <h2 style={{fontSize:mob?28:38,fontWeight:700,color:"#111",margin:"0 0 32px"}}>Naplánujte si schůzku</h2>
          <BookingPicker mob={mob}/>
        </div>
      </section>

      {/* QUOTE */}
      <section id="quote" style={{padding:mob?"56px 0":"88px 0",background:"#f9fafb",borderTop:"1px solid #e5e7eb"}}>
        <div style={{maxWidth:720,margin:"0 auto",padding:`0 ${mob?20:32}px`}}>
          <p style={{fontSize:11,color:RED,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12,...sf}}>Poptávka</p>
          <h2 style={{fontSize:mob?28:38,fontWeight:700,color:"#111",margin:"0 0 12px"}}>Získejte cenovou nabídku</h2>
          <p style={{color:"#6b7280",fontSize:15,marginBottom:32,...sf}}>Vyplňte formulář a do 24 hodin připravíme nabídku přímo na míru.</p>
          <div style={{background:"white",border:"1px solid #e5e7eb",padding:mob?20:40}}>
            <QuoteForm mob={mob}/>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{padding:mob?"56px 0":"88px 0",background:"white",borderTop:"1px solid #e5e7eb"}}>
        <div style={{maxWidth:1152,margin:"0 auto",padding:`0 ${mob?20:32}px`,display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:mob?40:88,alignItems:"center"}}>
          <div style={{position:"relative"}}>
            <div style={{overflow:"hidden",height:mob?300:540}}>
              <img src={IMG.p4} alt="Bc. Kateřina Kerplová" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}/>
            </div>
            <div style={{position:"absolute",bottom:mob?-12:-18,right:mob?-8:-18,width:mob?100:148,height:mob?100:148,background:RED,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:mob?28:42,fontWeight:700,color:"white",lineHeight:1,...ser}}>8+</span>
              <span style={{fontSize:9,color:"rgba(255,255,255,.6)",textTransform:"uppercase",letterSpacing:".08em",marginTop:4,...sf}}>let praxe</span>
            </div>
          </div>
          <div>
            <p style={{fontSize:11,color:RED,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12,...sf}}>O nás</p>
            <h2 style={{fontSize:mob?28:38,fontWeight:700,color:"#111",margin:"0 0 24px",lineHeight:1.18}}>Bc. Kateřina<br/>Kerplová</h2>
            <div style={{color:"#4b5563",lineHeight:1.78,fontSize:14,...sf}}>
              <p style={{marginTop:0}}>Bc. Kateřina Kerplová působí jako <strong style={{color:"#1f2937"}}>hlavní účetní a mzdová účetní</strong>. Účetnictvím se zabývá přes 8 let — zkušenosti sbírala ve firmách po celé ČR i v neziskovém sektoru.</p>
              <p>Od roku 2020 se věnuje účetnictví naplno. Vystudovala Obchodní akademii v Olomouci a obchodně-podnikatelskou školu v Opavě.</p>
              <p>Věříme, že účetnictví nemusí být jen „nutné zlo" — může být spolehlivou oporou pro vaše podnikání.</p>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,margin:"22px 0 28px"}}>
              {["Vedení účetnictví","Mzdové účetnictví","Neziskový sektor","Online spolupráce","Individuální přístup"].map(t=>(
                <span key={t} style={{padding:"4px 11px",fontSize:12,fontWeight:600,background:"rgba(139,0,0,.08)",color:RED,...sf}}>{t}</span>
              ))}
            </div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <Btn variant="primary" onClick={()=>go("booking")}>Rezervovat schůzku <Icon name="arrow" size={14} sw={2}/></Btn>
              <Btn variant="outline" onClick={()=>go("quote")}>Cenová nabídka</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{background:"#111",padding:mob?"56px 0":"80px 0"}}>
        <div style={{maxWidth:1152,margin:"0 auto",padding:`0 ${mob?20:32}px`,display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:mob?40:64,alignItems:"start"}}>
          <div>
            <img src={IMG.logo} alt="KKFintax" style={{height:40,objectFit:"contain",marginBottom:20,maxWidth:180,display:"block",filter:"brightness(0) invert(1)"}}/>
            <p style={{color:"rgba(255,255,255,.5)",lineHeight:1.72,fontSize:14,maxWidth:340,marginBottom:32,...sf}}>Účetnictví se věnujeme naplno. Ozvěte se — rádi připravíme nabídku na míru.</p>
            <Btn variant="white" size={mob?"md":"lg"} onClick={()=>go("booking")}>Naplánovat schůzku <Icon name="arrow" size={16} sw={2}/></Btn>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:mob?16:22,...sf}}>
            {[["phone","Telefon","605 326 088"],["mail","E-mail","info@kkfintax.cz"],["location","Působiště","Litovel & celá ČR (online)"],["clock","Dostupnost","Po–Pá 8:00–18:00"]].map(([icon,label,val])=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:40,height:40,background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon name={icon} size={19} color="rgba(255,255,255,.6)" sw={1.5}/>
                </div>
                <div>
                  <div style={{color:"rgba(255,255,255,.35)",fontSize:11,textTransform:"uppercase",letterSpacing:".08em"}}>{label}</div>
                  <div style={{color:"rgba(255,255,255,.9)",fontWeight:600,fontSize:14,marginTop:2}}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{background:"#000",padding:"18px 0",textAlign:"center",fontSize:12,color:"rgba(255,255,255,.55)",...sf}}>
        © 2026 KKFintax — Bc. Kateřina Kerplová · Všechna práva vyhrazena
      </footer>
    </div>
  );
}
