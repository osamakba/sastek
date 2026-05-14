"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "'Cairo', sans-serif", color: "#0f172a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .cta { transition:all .3s ease; }
        .cta:hover { transform:translateY(-2px); }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:#0ea5e9; border-radius:2px; }
      `}</style>

      {/* HEADER */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.9)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(14,165,233,0.1)",
        boxShadow: scrolled ? "0 2px 30px rgba(14,165,233,0.06)" : "none",
        transition: "all .5s ease",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 3rem", height: "66px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <img src="/logo.png" alt="SASTEK" style={{ height: "38px", width: "auto", objectFit: "contain" }} />
            <span style={{ fontSize: "1.2rem", fontWeight: "900", letterSpacing: "2px", color: "#0f172a" }}>SASTEK</span>
          </Link>
          <nav style={{ display: "flex", gap: ".15rem" }}>
            {[["الخدمات", "/"], ["من نحن", "/about"], ["الأسعار", "/pricing"], ["تواصل", "/contact"]].map(([label, href]) => (
              <Link key={label} href={href} style={{ color: "#475569", fontSize: ".84rem", fontWeight: "600", textDecoration: "none", padding: "6px 14px", borderRadius: "8px", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#0f172a"; e.currentTarget.style.background = "#f1f5f9"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "transparent"; }}>
                {label}
              </Link>
            ))}
          </nav>
          <Link href="/contracts" className="cta" style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", color: "#fff", padding: "9px 22px", borderRadius: "10px", fontFamily: "'Cairo',sans-serif", fontSize: ".85rem", fontWeight: "800", textDecoration: "none", boxShadow: "0 4px 16px rgba(14,165,233,.28)" }}>
            ابدأ مجاناً
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: "10rem 3rem 6rem", textAlign: "center", background: "linear-gradient(180deg, #fff 0%, #f0f9ff 100%)" }}>
        <div style={{ opacity: mounted ? 1 : 0, animation: mounted ? "fadeUp .8s ease .1s both" : "none" }}>
          <div style={{ display: "inline-block", background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.18)", color: "#0ea5e9", padding: "5px 18px", borderRadius: "50px", fontSize: ".7rem", fontWeight: "800", letterSpacing: "3px", marginBottom: "1.5rem", textTransform: "uppercase" }}>
            من نحن
          </div>
          <h1 style={{
            fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: "900",
            letterSpacing: "-2px", lineHeight: "1.1", marginBottom: "1.5rem",
          }}>
            نبني مستقبل
            <br />
            <span style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>
              الأعمال الذكية
            </span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "560px", margin: "0 auto", lineHeight: "1.9" }}>
            SASTEK منصة سعودية متخصصة في أتمتة الأعمال بالذكاء الاصطناعي، تساعد الشركات والأفراد على إدارة عقودهم ومشاريعهم بكفاءة عالية
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={{ padding: "5rem 3rem", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {[
            { icon: "🎯", title: "رسالتنا", desc: "تمكين الشركات السعودية من الاستفادة من الذكاء الاصطناعي في إدارة أعمالها اليومية بطريقة سهلة وآمنة ومتوافقة مع الأنظمة المحلية." },
            { icon: "🔭", title: "رؤيتنا", desc: "أن نكون المنصة الرائدة في المملكة العربية السعودية لأتمتة الأعمال بالذكاء الاصطناعي، ونساهم في تحقيق رؤية 2030 في التحول الرقمي." },
          ].map(item => (
            <div key={item.title} style={{ padding: "2.5rem", borderRadius: "20px", border: "1px solid rgba(14,165,233,.12)", background: "#f8faff", transition: "all .3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 50px rgba(14,165,233,.1)"; e.currentTarget.style.borderColor = "rgba(14,165,233,.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(14,165,233,.12)"; }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem" }}>{item.icon}</div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", marginBottom: ".8rem" }}>{item.title}</h3>
              <p style={{ fontSize: ".9rem", color: "#64748b", lineHeight: "1.9" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "5rem 3rem", background: "#f8faff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.18)", color: "#0ea5e9", padding: "5px 18px", borderRadius: "50px", fontSize: ".7rem", fontWeight: "800", letterSpacing: "3px", marginBottom: "1rem", textTransform: "uppercase" }}>قيمنا</div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px" }}>ما يميزنا</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🔒", title: "الأمان أولاً", desc: "بياناتك محمية بأعلى معايير التشفير والأمان" },
              { icon: "⚡", title: "السرعة والدقة", desc: "تحليل فوري بدقة تصل إلى ٩٨٪" },
              { icon: "🇸🇦", title: "سعودي ١٠٠٪", desc: "متوافق مع الأنظمة واللوائح السعودية" },
              { icon: "🤝", title: "دعم متواصل", desc: "فريق دعم متخصص على مدار الساعة" },
              { icon: "🧠", title: "ذكاء متطور", desc: "أحدث نماذج الذكاء الاصطناعي العالمية" },
              { icon: "📈", title: "نتائج حقيقية", desc: "وفر ٨٠٪ من وقت مراجعة العقود" },
            ].map(v => (
              <div key={v.title} style={{ padding: "2rem", borderRadius: "16px", background: "#fff", border: "1px solid #e8f0fe", transition: "all .3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,.3)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(14,165,233,.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8f0fe"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{v.icon}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: "800", color: "#0f172a", marginBottom: ".5rem" }}>{v.title}</h3>
                <p style={{ fontSize: ".82rem", color: "#64748b", lineHeight: "1.7" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: "5rem 3rem", background: "#fff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.18)", color: "#0ea5e9", padding: "5px 18px", borderRadius: "50px", fontSize: ".7rem", fontWeight: "800", letterSpacing: "3px", marginBottom: "1rem", textTransform: "uppercase" }}>الفريق</div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px", marginBottom: ".8rem" }}>فريق متخصص </h2>
          <p style={{ color: "#64748b", fontSize: ".95rem", lineHeight: "1.9", maxWidth: "580px", margin: "0 auto 3rem" }}>
            فريقنا مكون من خبراء في الذكاء الاصطناعي والقانون وإدارة المشاريع، يعملون معاً لتقديم أفضل تجربة لعملائنا
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {[

            ].map((m: { name: string; role: string; emoji: string }, idx: number) => (
              <div key={idx} style={{ padding: "2rem", borderRadius: "16px", background: "#f8faff", border: "1px solid #e8f0fe", transition: "all .3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8f0fe"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{m.emoji}</div>
                <div style={{ fontSize: "1rem", fontWeight: "800", color: "#0f172a", marginBottom: ".3rem" }}>{m.name}</div>
                <div style={{ fontSize: ".8rem", color: "#0ea5e9", fontWeight: "600" }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 3rem", background: "linear-gradient(135deg, #eff6ff, #f0f9ff)", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px", marginBottom: "1rem" }}>
          جاهز تبدأ معنا؟
        </h2>
        <p style={{ color: "#64748b", fontSize: ".95rem", marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: "1.8" }}>
          انضم لمنصة SASTEK وابدأ رحلتك في أتمتة أعمالك
        </p>
        <Link href="/contracts" className="cta" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "linear-gradient(135deg,#0ea5e9,#6366f1)", color: "#fff", padding: "15px 44px", borderRadius: "12px", fontFamily: "'Cairo',sans-serif", fontWeight: "800", fontSize: "1rem", textDecoration: "none", boxShadow: "0 12px 36px rgba(14,165,233,.3)" }}>
          ابدأ مجاناً ←
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#fff", borderTop: "1px solid #e8f0fe", padding: "2rem 3rem" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <img src="/logo.png" alt="SASTEK" style={{ height: "30px", width: "auto" }} />
            <span style={{ fontWeight: "900", color: "#0f172a", fontSize: "1rem", letterSpacing: "2px" }}>SASTEK</span>
          </div>
          <span style={{ color: "#94a3b8", fontSize: ".75rem" }}>© 2026 SASTEK جميع الحقوق محفوظة</span>
        </div>
      </footer>
    </main>
  );
}