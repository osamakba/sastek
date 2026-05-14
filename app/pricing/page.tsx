"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PricingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const plans = [
    {
      name: "مجاني",
      nameEn: "Free",
      price: { monthly: 0, annual: 0 },
      desc: "للأفراد الراغبين في التجربة",
      color: "#64748b",
      available: true,
      features: [
        "٣ تحليلات عقود شهرياً",
        "تقرير أساسي",
        "دعم عبر البريد",
        "واجهة عربية كاملة",
      ],
      notIncluded: [
        "تحليل غير محدود",
        "تقارير متقدمة",
        "تحليل المخاطر التفصيلي",
        "تصدير PDF",
      ],
      cta: "ابدأ مجاناً",
      popular: false,
    },
    {
      name: "فردي",
      nameEn: "Individual",
      price: { monthly: 79, annual: 59 },
      desc: "للأفراد الذين يحتاجون تحليلاً مستمراً",
      color: "#0ea5e9",
      available: true,
      features: [
        "تحليل غير محدود للعقود",
        "تقارير قانونية متقدمة",
        "تحليل المخاطر التفصيلي",
        "تصدير التقارير PDF",
        "دعم أولوية ٢٤/٧",
        "واجهة عربية كاملة",
        "متوافق مع نظام العمل السعودي",
      ],
      notIncluded: [],
      cta: "اشترك الآن",
      popular: true,
    },
    {
      name: "برو",
      nameEn: "Pro",
      price: { monthly: 199, annual: 149 },
      desc: "للأفراد والمحترفين",
      color: "#6366f1",
      available: false,
      features: [
        "كل مميزات الفردي",
        "تحليل متعدد العقود",
        "مقارنة العقود",
        "تنبيهات ذكية",
        "تاريخ التحليلات",
      ],
      notIncluded: [],
      cta: "قريباً",
      popular: false,
    },
    {
      name: "ماكس",
      nameEn: "Max",
      price: { monthly: 399, annual: 299 },
      desc: "للاستخدام المكثف",
      color: "#8b5cf6",
      available: false,
      features: [
        "كل مميزات البرو",
        "مستخدمين متعددين",
        "تقارير مخصصة",
        "API للمطورين",
        "مدير حساب مخصص",
      ],
      notIncluded: [],
      cta: "قريباً",
      popular: false,
    },
  ];

  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "'Cairo', sans-serif", color: "#0f172a" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .cta-btn { transition:all .3s ease; }
        .cta-btn:hover { transform:translateY(-2px); }
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
          <Link href="/contracts" className="cta-btn" style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", color: "#fff", padding: "9px 22px", borderRadius: "10px", fontFamily: "'Cairo',sans-serif", fontSize: ".85rem", fontWeight: "800", textDecoration: "none", boxShadow: "0 4px 16px rgba(14,165,233,.28)" }}>
            ابدأ مجاناً
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: "10rem 3rem 5rem", textAlign: "center", background: "linear-gradient(180deg,#fff 0%,#f0f9ff 100%)" }}>
        <div style={{ animation: "fadeUp .8s ease both" }}>
          <div style={{ display: "inline-block", background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.18)", color: "#0ea5e9", padding: "5px 18px", borderRadius: "50px", fontSize: ".7rem", fontWeight: "800", letterSpacing: "3px", marginBottom: "1.5rem", textTransform: "uppercase" }}>
            الأسعار
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "900", letterSpacing: "-2px", lineHeight: "1.1", marginBottom: "1.2rem" }}>
            خطط تناسب
            <br />
            <span style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>
              جميع احتياجاتك
            </span>
          </h1>
          <p style={{ fontSize: "1rem", color: "#64748b", maxWidth: "480px", margin: "0 auto 2.5rem", lineHeight: "1.9" }}>
            ابدأ مجاناً وطور خطتك عند الحاجة. لا رسوم خفية، إلغاء في أي وقت.
          </p>

          {/* Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "#f1f5f9", padding: "6px", borderRadius: "50px" }}>
            <button onClick={() => setAnnual(false)} style={{ padding: "8px 20px", borderRadius: "50px", border: "none", cursor: "pointer", fontFamily: "'Cairo',sans-serif", fontSize: ".85rem", fontWeight: "700", background: !annual ? "#fff" : "transparent", color: !annual ? "#0f172a" : "#64748b", boxShadow: !annual ? "0 2px 8px rgba(0,0,0,.08)" : "none", transition: "all .3s" }}>
              شهري
            </button>
            <button onClick={() => setAnnual(true)} style={{ padding: "8px 20px", borderRadius: "50px", border: "none", cursor: "pointer", fontFamily: "'Cairo',sans-serif", fontSize: ".85rem", fontWeight: "700", background: annual ? "#fff" : "transparent", color: annual ? "#0f172a" : "#64748b", boxShadow: annual ? "0 2px 8px rgba(0,0,0,.08)" : "none", transition: "all .3s", display: "flex", alignItems: "center", gap: "8px" }}>
              سنوي
              <span style={{ background: "#22c55e", color: "#fff", fontSize: ".65rem", padding: "2px 8px", borderRadius: "50px", fontWeight: "700" }}>وفر ٢٥٪</span>
            </button>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section style={{ padding: "2rem 3rem 6rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem", alignItems: "start" }}>
          {plans.map((plan, i) => (
            <div key={plan.name} style={{
              borderRadius: "20px", overflow: "hidden",
              border: plan.popular ? `2px solid ${plan.color}` : "1px solid #e8f0fe",
              background: plan.available ? "#fff" : "rgba(255,255,255,0.6)",
              boxShadow: plan.popular ? `0 24px 60px ${plan.color}20` : "0 2px 16px rgba(14,165,233,.04)",
              position: "relative",
              transform: plan.popular ? "scale(1.04)" : "scale(1)",
              opacity: plan.available ? 1 : 0.7,
              animation: `fadeUp .6s ease ${i * .1}s both`,
            }}>
              {plan.popular && (
                <div style={{ background: `linear-gradient(135deg,${plan.color},#6366f1)`, color: "#fff", textAlign: "center", padding: "8px", fontSize: ".7rem", fontWeight: "800", letterSpacing: "2px" }}>
                  ⭐ الأكثر شيوعاً
                </div>
              )}

              {!plan.available && (
                <div style={{ position: "absolute", top: "1rem", left: "1rem", background: "rgba(100,116,139,.1)", color: "#64748b", fontSize: ".62rem", fontWeight: "800", padding: "3px 10px", borderRadius: "50px", letterSpacing: "1px" }}>
                  قريباً
                </div>
              )}

              <div style={{ padding: "1.8rem 1.5rem" }}>
                <div style={{ fontSize: ".72rem", fontWeight: "800", color: plan.available ? plan.color : "#94a3b8", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".6rem" }}>
                  {plan.name}
                </div>

                <div style={{ marginBottom: ".8rem" }}>
                  <span style={{ fontSize: "2.5rem", fontWeight: "900", color: plan.available ? "#0f172a" : "#94a3b8", letterSpacing: "-2px" }}>
                    {plan.price[annual ? "annual" : "monthly"] === 0 ? "0" : plan.price[annual ? "annual" : "monthly"]}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span style={{ fontSize: ".8rem", color: "#94a3b8", fontWeight: "500" }}> ريال/شهر</span>
                  )}
                </div>

                <p style={{ fontSize: ".78rem", color: "#64748b", marginBottom: "1.2rem", lineHeight: "1.6" }}>{plan.desc}</p>

                {plan.available ? (
                  <Link href={plan.name === "مجاني" ? "/contracts" : "/contracts"} className="cta-btn" style={{
                    display: "block", textAlign: "center",
                    background: plan.popular ? `linear-gradient(135deg,${plan.color},#6366f1)` : "transparent",
                    color: plan.popular ? "#fff" : plan.color,
                    padding: "11px 20px", borderRadius: "10px",
                    border: plan.popular ? "none" : `1.5px solid ${plan.color}`,
                    fontFamily: "'Cairo',sans-serif", fontWeight: "800", fontSize: ".85rem",
                    textDecoration: "none", marginBottom: "1.2rem",
                    boxShadow: plan.popular ? `0 8px 24px ${plan.color}35` : "none",
                  }}>
                    {plan.cta}
                  </Link>
                ) : (
                  <div style={{
                    display: "block", textAlign: "center",
                    background: "rgba(100,116,139,.08)",
                    color: "#94a3b8", padding: "11px 20px", borderRadius: "10px",
                    fontFamily: "'Cairo',sans-serif", fontWeight: "800", fontSize: ".85rem",
                    marginBottom: "1.2rem", border: "1.5px solid rgba(100,116,139,.15)",
                  }}>
                    {plan.cta}
                  </div>
                )}

                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1.2rem" }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: ".6rem" }}>
                      <span style={{ color: plan.available ? "#22c55e" : "#94a3b8", fontSize: ".9rem", flexShrink: 0, marginTop: "1px" }}>✓</span>
                      <span style={{ fontSize: ".78rem", color: plan.available ? "#334155" : "#94a3b8", lineHeight: "1.5" }}>{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: ".6rem" }}>
                      <span style={{ color: "#cbd5e1", fontSize: ".9rem", flexShrink: 0, marginTop: "1px" }}>✕</span>
                      <span style={{ fontSize: ".78rem", color: "#94a3b8", lineHeight: "1.5" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "4rem 3rem 6rem", background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.18)", color: "#0ea5e9", padding: "5px 18px", borderRadius: "50px", fontSize: ".7rem", fontWeight: "800", letterSpacing: "3px", marginBottom: "1rem", textTransform: "uppercase" }}>أسئلة شائعة</div>
            <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px" }}>لديك سؤال؟</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { q: "هل يمكنني إلغاء الاشتراك في أي وقت؟", a: "نعم، يمكنك الإلغاء في أي وقت بدون رسوم إضافية." },
              { q: "هل بياناتي آمنة؟", a: "نعم، نستخدم أعلى معايير التشفير والأمان لحماية بياناتك." },
              { q: "هل يوجد فترة تجريبية؟", a: "نعم، الخطة المجانية تتيح لك تجربة الخدمة بدون قيود زمنية." },
              { q: "هل الأسعار تشمل ضريبة القيمة المضافة؟", a: "الأسعار المعروضة لا تشمل ضريبة القيمة المضافة (١٥٪)." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "1.4rem 1.8rem", borderRadius: "14px", background: "#f8faff", border: "1px solid #e8f0fe", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,.3)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(14,165,233,.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8f0fe"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: ".92rem", fontWeight: "800", color: "#0f172a", marginBottom: ".5rem" }}>{item.q}</div>
                <div style={{ fontSize: ".82rem", color: "#64748b", lineHeight: "1.7" }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
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