"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const services = [
  { id: "contracts", icon: "⚖️", title: "العقود", desc: "تحليل ومراجعة وصياغة العقود بدقة قانونية عالية", href: "/contracts", available: true, color: "#0ea5e9", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80" },
  { id: "projects", icon: "📊", title: "إدارة المشاريع", desc: "أدوات ذكية لتتبع المشاريع وإدارة الفرق", href: "/projects", available: false, color: "#6366f1", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
  { id: "hr", icon: "👥", title: "الموارد البشرية", desc: "إدارة العقود والسياسات والموظفين", href: "/hr", available: false, color: "#8b5cf6", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" },
  { id: "consulting", icon: "🎯", title: "الاستشارات", desc: "استشارات قانونية وتجارية متخصصة", href: "/consulting", available: false, color: "#ec4899", img: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=600&q=80" },
];

const videos = [
  { src: "/video1.mp4", label: "إدارة الأعمال" },
  { src: "/video2.mp4", label: "الذكاء الاصطناعي" },
  { src: "/video3.mp4", label: "خدمة متميزة" },

];

export default function Home() {
  const [videoIdx, setVideoIdx] = useState(0);
  const [mounted, setMounted] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    const t = setInterval(() => setVideoIdx(p => (p + 1) % videos.length), 7000);
    return () => { window.removeEventListener("scroll", handleScroll); clearInterval(t); };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === videoIdx) { v.currentTime = 0; v.play().catch(() => {}); }
      else v.pause();
    });
  }, [videoIdx]);

  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#f0f6ff", fontFamily: "'Cairo', sans-serif", color: "#0f172a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes progress { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes counterPop { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#f0f6ff; }
        ::-webkit-scrollbar-thumb { background:#0ea5e9; border-radius:2px; }
        .card-hover { transition:all 0.4s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform:translateY(-6px); }
        .cta { transition:all .3s cubic-bezier(.4,0,.2,1); }
        .cta:hover { transform:translateY(-2px); }
      `}</style>

      {/* HEADER */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(14,165,233,0.1)" : "none",
        boxShadow: scrolled ? "0 2px 30px rgba(14,165,233,0.06)" : "none",
        transition: "all .5s ease",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 3rem", height: "66px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", opacity: mounted ? 1 : 0, transition: "opacity 1s ease .2s" }}>
            <img src="/logo.png" alt="SASTEK" style={{ height: "40px", width: "auto", objectFit: "contain" }} />



            <span style={{ fontSize: "1.2rem", fontWeight: "900", letterSpacing: "2px", color: scrolled ? "#0f172a" : "#fff", textShadow: scrolled ? "none" : "0 2px 10px rgba(0,0,0,.4)", transition: "color .4s" }}>
              SASTEK
            </span>
          </div>
<nav style={{ display: "flex", gap: ".15rem", opacity: mounted ? 1 : 0, transition: "opacity 1s ease .4s" }}>
  {[["الخدمات", "#services"], ["من نحن", "/about"], ["الأسعار", "/pricing"], ["تواصل", "/contact"]].map(([label, href]) => (
    <a key={label} href={href} style={{ color: scrolled ? "#475569" : "rgba(255,255,255,.88)", fontSize: ".84rem", fontWeight: "600", textDecoration: "none", padding: "6px 14px", borderRadius: "8px", transition: "all .2s" }}
      onMouseEnter={e => { e.currentTarget.style.color = scrolled ? "#0f172a" : "#fff"; e.currentTarget.style.background = scrolled ? "#f1f5f9" : "rgba(255,255,255,.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.color = scrolled ? "#475569" : "rgba(255,255,255,.88)"; e.currentTarget.style.background = "transparent"; }}>
      {label}
    </a>
  ))}
</nav>

          <div style={{ display: "flex", gap: ".6rem", opacity: mounted ? 1 : 0, transition: "opacity 1s ease .6s" }}>
            <button className="cta" style={{ background: scrolled ? "transparent" : "rgba(255,255,255,.1)", color: scrolled ? "#475569" : "#fff", padding: "8px 18px", borderRadius: "9px", border: scrolled ? "1.5px solid #e2e8f0" : "1.5px solid rgba(255,255,255,.35)", cursor: "pointer", fontFamily: "'Cairo',sans-serif", fontSize: ".82rem", fontWeight: "600", transition: "all .3s" }}>
              تسجيل الدخول
            </button>
            <button className="cta" style={{ background: scrolled ? "linear-gradient(135deg,#0ea5e9,#6366f1)" : "rgba(255,255,255,.95)", color: scrolled ? "#fff" : "#0ea5e9", padding: "8px 18px", borderRadius: "9px", border: "none", cursor: "pointer", fontFamily: "'Cairo',sans-serif", fontSize: ".82rem", fontWeight: "800", boxShadow: "0 4px 16px rgba(14,165,233,.28)", transition: "all .3s" }}>
              ابدأ مجاناً
            </button>
          </div>
        </div>
      </header>

      {/* HERO - CINEMATIC VIDEO */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

        {/* Videos - highly visible like The Alon */}
        {videos.map((v, i) => (
          <video key={v.src} ref={el => { videoRefs.current[i] = el; }} src={v.src}
            autoPlay={i === 0} muted playsInline loop
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover",
              opacity: i === videoIdx ? 1 : 0,
              transition: "opacity 2s ease",
              zIndex: i === videoIdx ? 1 : 0,
              filter: "brightness(.5) saturate(1.1)",
            }}
          />
        ))}

        {/* Minimal overlay - just enough for text readability */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 40%, rgba(0,0,0,0.35) 100%)" }} />

        {/* Center content */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 2rem" }}>

          {/* Small label like "WELCOME TO" */}
          <div style={{ fontSize: "1.2rem", letterSpacing: "8px", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", fontWeight: "600", marginBottom: "3rem", marginTop: "5rem", opacity: mounted ? 1 : 0, transition: "opacity 1s ease .3s" }}>
            مرحباً بك في
          </div>

          {/* Big brand name */}
          <h1 style={{
            fontSize: "clamp(4rem, 10vw, 5rem)",
            fontWeight: "900", lineHeight: "1", letterSpacing: "-2px",
            marginBottom: "1rem",
            opacity: mounted ? 1 : 0,
            animation: mounted ? "fadeUp 1.2s cubic-bezier(.23,1,.32,1) .1s both" : "none",
          }}>
            <span style={{
              background: "linear-gradient(135deg, #ffffff 0%, #bfdbfe 50%, #ffffff 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "shimmer 5s linear infinite",
              filter: "drop-shadow(0 4px 30px rgba(14,165,233,0.6))",
            }}>
              منصة الأعمال الذكية
            </span>
          </h1>

          {/* Subtitle like "RESORT & SPA HOTEL" */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "6rem", opacity: mounted ? 1 : 0, transition: "opacity 1s ease .6s" }}>
            <div style={{ height: "1px", width: "50px", background: "rgba(255,255,255,0.5)" }} />
            <span style={{ fontSize: "1.2rem", letterSpacing: "6px", color: "rgba(255,255,255,0.85)", textTransform: "uppercase", fontWeight: "600", whiteSpace: "nowrap" }}>
             SASTEK  
            </span>
            <div style={{ height: "1px", width: "50px", background: "rgba(255,255,255,0.5)" }} />
          </div>

          {/* Description */}
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.78)", maxWidth: "460px", lineHeight: "1.9", marginBottom: "2.5rem", fontWeight: "400", opacity: mounted ? 1 : 0, transition: "opacity 1s ease .8s" }}>
            منصة متكاملة تجمع أدوات الذكاء الاصطناعي لتطوير وأتمتة أعمالك في مكان واحد
          </p>

          {/* CTA Button - like "LEARN MORE" */}
          <div style={{ display: "flex", gap: "1rem", opacity: mounted ? 1 : 0, transition: "opacity 1s ease 1s" }}>
            <Link href="/contracts" className="cta" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "transparent", color: "#fff",
              padding: "14px 40px", borderRadius: "0",
              border: "1px solid rgba(255,255,255,0.6)",
              fontFamily: "'Cairo',sans-serif", fontWeight: "600", fontSize: ".82rem",
              textDecoration: "none", letterSpacing: "3px", textTransform: "uppercase",
              backdropFilter: "blur(8px)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; }}>
              ابدأ الآن
            </Link>
            <button className="cta" style={{
              background: "rgba(255,255,255,0.95)", color: "#0ea5e9",
              padding: "14px 40px", borderRadius: "0",
              border: "1px solid transparent", cursor: "pointer",
              fontFamily: "'Cairo',sans-serif", fontWeight: "800", fontSize: ".82rem",
              letterSpacing: "3px", textTransform: "uppercase",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.95)"; }}>
              اكتشف الخدمات
            </button>
          </div>
        </div>

        {/* Video indicators - bottom center */}
        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 4, display: "flex", gap: "14px", alignItems: "flex-end" }}>
          {videos.map((v, i) => (
            <div key={i} onClick={() => setVideoIdx(i)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: ".58rem", color: i === videoIdx ? "#fff" : "rgba(255,255,255,.4)", letterSpacing: "1px", fontWeight: "600", whiteSpace: "nowrap", transition: "color .4s" }}>
                {v.label}
              </span>
              <div style={{ height: "1.5px", borderRadius: "2px", width: i === videoIdx ? "48px" : "18px", background: i === videoIdx ? "#fff" : "rgba(255,255,255,.25)", transition: "all .4s ease", position: "relative", overflow: "hidden" }}>
                {i === videoIdx && <div style={{ position: "absolute", inset: 0, background: "#38bdf8", animation: "progress 7s linear forwards", transformOrigin: "left" }} />}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll - bottom right */}
        <div style={{ position: "absolute", bottom: "2.5rem", right: "3rem", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: ".58rem", letterSpacing: "3px", color: "rgba(255,255,255,.45)", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom,rgba(255,255,255,.5),transparent)" }} />
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e8f0fe" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {[
            { n: "+١٠٠", l: "عقد محلل", s: "بدقة قانونية" },
            { n: "٩٥٪", l: "رضا العملاء", s: "تقييم المستخدمين" },
            { n: "١٠ ثوانٍ", l: "وقت التحليل", s: "متوسط الاستجابة" },
            { n: "٢٤/٧", l: "خدمة متواصلة", s: "دعم مستمر" },
          ].map((s, i) => (
            <div key={s.l} style={{ textAlign: "center", padding: "2.5rem 2rem", borderRight: i < 3 ? "1px solid #e8f0fe" : "none", transition: "background .3s", animation: mounted ? `counterPop .6s ease ${.3 + i * .1}s both` : "none" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f8faff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
              <div style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0ea5e9", marginBottom: ".2rem", letterSpacing: "-1px", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: ".88rem", fontWeight: "800", color: "#0f172a", marginBottom: ".2rem" }}>{s.l}</div>
              <div style={{ fontSize: ".7rem", color: "#94a3b8" }}>{s.s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: "#f8faff", padding: "6rem 3rem" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.18)", color: "#0ea5e9", padding: "5px 18px", borderRadius: "50px", fontSize: ".7rem", fontWeight: "800", letterSpacing: "3px", marginBottom: "1rem", textTransform: "uppercase" }}>
              الخدمات
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px", marginBottom: ".7rem" }}>
              كل ما تحتاجه في مكان واحد
            </h2>
            <p style={{ color: "#64748b", fontSize: ".92rem", maxWidth: "420px", margin: "0 auto", lineHeight: "1.8" }}>
              منصة متكاملة تجمع أدوات الذكاء الاصطناعي لتطوير وأتمتة أعمالك
            </p>
            <div style={{ width: "40px", height: "2.5px", background: "linear-gradient(90deg,#0ea5e9,#6366f1)", borderRadius: "2px", margin: "1.2rem auto 0" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.2rem" }}>
            {services.map((s, i) => (
              <div key={s.id} className="card-hover"
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: "18px", overflow: "hidden",
                  border: `1px solid ${hovered === s.id ? s.color + "40" : "#e8f0fe"}`,
                  boxShadow: hovered === s.id ? `0 24px 60px ${s.color}18` : "0 2px 16px rgba(14,165,233,.04)",
                  background: "#fff", cursor: s.available ? "pointer" : "default",
                  animation: mounted ? `cardIn .6s ease ${.2 + i * .08}s both` : "none",
                }}>
                <div style={{ height: "175px", overflow: "hidden", position: "relative" }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s ease", transform: hovered === s.id ? "scale(1.06)" : "scale(1)", filter: "brightness(.82) saturate(.9)" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom,${s.color}12,rgba(255,255,255,.96))` }} />
                  <div style={{ position: "absolute", top: ".9rem", right: ".9rem", background: "rgba(255,255,255,.95)", backdropFilter: "blur(10px)", border: `1px solid ${s.available ? s.color + "28" : "rgba(0,0,0,.05)"}`, color: s.available ? s.color : "#94a3b8", fontSize: ".62rem", fontWeight: "800", padding: "3px 10px", borderRadius: "50px" }}>
                    {s.available ? "✓ متاح الآن" : "قريباً"}
                  </div>
                  <div style={{ position: "absolute", bottom: ".9rem", right: "1rem", fontSize: "1.7rem", transition: "transform .4s ease", transform: hovered === s.id ? "scale(1.12) translateY(-3px)" : "scale(1)" }}>
                    {s.icon}
                  </div>
                </div>
                <div style={{ padding: "1.3rem 1.6rem 1.8rem" }}>
                  <h3 style={{ fontSize: "1.08rem", fontWeight: "800", color: s.available ? "#0f172a" : "#94a3b8", marginBottom: ".5rem" }}>{s.title}</h3>
                  <p style={{ fontSize: ".82rem", color: "#64748b", lineHeight: "1.75", marginBottom: "1.3rem" }}>{s.desc}</p>
                  {s.available ? (
                    <Link href={s.href} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: `linear-gradient(135deg,${s.color},${s.color}cc)`, color: "#fff", padding: "11px 22px", borderRadius: "9px", fontFamily: "'Cairo',sans-serif", fontWeight: "800", fontSize: ".85rem", textDecoration: "none", boxShadow: hovered === s.id ? `0 8px 22px ${s.color}38` : "none", transition: "all .3s ease" }}>
                      ابدأ الآن ←
                    </Link>
                  ) : (
                    <div style={{ border: "1.5px solid #e8f0fe", padding: "11px 22px", borderRadius: "9px", color: "#cbd5e1", fontSize: ".82rem", textAlign: "center" }}>سيتوفر قريباً</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SASTEK */}
      <section style={{ position: "relative", overflow: "hidden", padding: "6rem 3rem" }}>
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.5) saturate(.8)" }}
          src="https://assets.mixkit.co/videos/preview/mixkit-overhead-view-of-a-business-meeting-4827-large.mp4" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.4) 100%)" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.18)", color: "#0ea5e9", padding: "5px 18px", borderRadius: "50px", fontSize: ".7rem", fontWeight: "800", letterSpacing: "3px", marginBottom: "1.2rem" }}>
              لماذا SASTEK؟
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px", lineHeight: "1.2", marginBottom: "1.8rem" }}>
              الذكاء الاصطناعي
              <br /><span style={{ color: "#0ea5e9" }}>في خدمة أعمالك</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
              {[
                { icon: "⚡", title: "تحليل فوري", desc: "نتائج دقيقة خلال ثوانٍ لا دقائق" },
                { icon: "🔒", title: "متوافق مع الأنظمة السعودية", desc: "محدّث بآخر اللوائح والقرارات" },
                { icon: "🛡️", title: "آمن وموثوق", desc: "بياناتك محمية بأعلى معايير الأمان" },
                { icon: "🌐", title: "متاح ٢٤/٧", desc: "خدمة على مدار الساعة" },
              ].map(f => (
                <div key={f.title} style={{ display: "flex", gap: ".9rem", alignItems: "flex-start", padding: "1rem 1.2rem", borderRadius: "12px", background: "rgba(255,255,255,.9)", backdropFilter: "blur(10px)", border: "1px solid rgba(14,165,233,.1)", transition: "all .3s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,.28)"; e.currentTarget.style.transform = "translateX(-4px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(14,165,233,.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,.1)"; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: "1.2rem", flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontSize: ".88rem", fontWeight: "800", color: "#0f172a", marginBottom: ".2rem" }}>{f.title}</div>
                    <div style={{ fontSize: ".78rem", color: "#64748b", lineHeight: "1.6" }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 70px rgba(14,165,233,.15)", border: "1px solid rgba(14,165,233,.12)" }}>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="" style={{ width: "100%", height: "360px", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", top: "-16px", left: "-20px", background: "rgba(255,255,255,.98)", borderRadius: "14px", padding: ".9rem 1.3rem", boxShadow: "0 16px 44px rgba(14,165,233,.14)", border: "1px solid rgba(14,165,233,.14)" }}>
              <div style={{ fontSize: ".6rem", color: "#94a3b8", fontWeight: "700", marginBottom: "3px" }}>دقة التحليل</div>
              <div style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0ea5e9" }}>٩٥٪</div>
            </div>
            <div style={{ position: "absolute", bottom: "-16px", right: "-16px", background: "rgba(255,255,255,.98)", borderRadius: "14px", padding: ".9rem 1.3rem", boxShadow: "0 16px 44px rgba(14,165,233,.14)", border: "1px solid rgba(14,165,233,.14)" }}>
              <div style={{ fontSize: ".6rem", color: "#94a3b8", fontWeight: "700", marginBottom: "3px" }}>وقت التحليل</div>
              <div style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0f172a" }}>١٠ ثوانٍ</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", height: "52vh", overflow: "hidden" }}>
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.85) saturate(.9)" }}
          src="https://assets.mixkit.co/videos/preview/mixkit-city-aerial-view-at-night-2505-large.mp4" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(240,249,255,0.8) 0%, rgba(248,252,255,0.75) 50%, rgba(240,249,255,0.8) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 2rem" }}>
          <div style={{ fontSize: "1rem", fontWeight: "800", color: "#0ea5e9", letterSpacing: "4px", marginBottom: "1rem", textTransform: "uppercase" }}>ابدأ اليوم</div>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: "900", color: "#0f172a", letterSpacing: "-1.5px", marginBottom: ".9rem", lineHeight: "1.1" }}>
            جاهز تحول أعمالك؟
          </h2>
          <p style={{ color: "#475569", fontSize: ".95rem", marginBottom: "2rem", maxWidth: "400px", lineHeight: "1.8", fontWeight: "500" }}>
           ابدأ رحلتك مع SASTEK وحول طريقة إدارة أعمالك بالذكاء الاصطناعي
          </p>
          <div style={{ display: "flex", gap: ".9rem" }}>
            <button className="cta" style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", color: "#fff", padding: "14px 40px", borderRadius: "12px", border: "none", cursor: "pointer", fontFamily: "'Cairo',sans-serif", fontWeight: "800", fontSize: ".95rem", boxShadow: "0 10px 36px rgba(14,165,233,.32)" }}>
              ابدأ مجاناً ←
            </button>
            <button className="cta" style={{ background: "rgba(255,255,255,.88)", color: "#334155", padding: "14px 40px", borderRadius: "12px", border: "1.5px solid rgba(14,165,233,.2)", cursor: "pointer", fontFamily: "'Cairo',sans-serif", fontWeight: "700", fontSize: ".95rem", backdropFilter: "blur(10px)" }}>
              تواصل معنا
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#fff", borderTop: "1px solid #e8f0fe", padding: "2rem 3rem" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <img src="/logo.png" alt="SASTEK" style={{ height: "34px", width: "auto", objectFit: "contain" }} />

            <span style={{ fontWeight: "900", color: "#0f172a", fontSize: "1rem", letterSpacing: "2px" }}>SASTEK</span>
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["الخدمات", "من نحن", "تواصل"].map(item => (
              <a key={item} href="#" style={{ color: "#94a3b8", fontSize: ".78rem", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0ea5e9")}
                onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}>
                {item}
              </a>
            ))}
          </div>
          <span style={{ color: "#94a3b8", fontSize: ".75rem" }}>© 2026 SASTEK جميع الحقوق محفوظة</span>
        </div>
      </footer>
    </main>
  );
}