"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xgodbrkq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSent(true);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "'Cairo', sans-serif", color: "#0f172a" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .cta-btn { transition:all .3s ease; }
        .cta-btn:hover { transform:translateY(-2px); }
        input, textarea, select {
          width: 100%; padding: 12px 16px;
          border: 1.5px solid #e2e8f0; border-radius: 10px;
          fontFamily: 'Cairo', sans-serif; font-size: .88rem;
          color: #0f172a; background: #fff; outline: none;
          transition: border-color .2s;
        }
        input:focus, textarea:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,.08); }
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
            تواصل معنا
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "900", letterSpacing: "-2px", lineHeight: "1.1", marginBottom: "1.2rem" }}>
            نحن هنا
            <br />
            <span style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>
              لمساعدتك
            </span>
          </h1>
          <p style={{ fontSize: "1rem", color: "#64748b", maxWidth: "440px", margin: "0 auto", lineHeight: "1.9" }}>
            لديك سؤال أو تريد معرفة المزيد؟ فريقنا جاهز للرد عليك
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ padding: "2rem 3rem 8rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "3rem", alignItems: "start" }}>

          {/* Left - Info */}
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#0f172a", marginBottom: ".8rem" }}>
              معلومات التواصل
            </h2>
            <p style={{ fontSize: ".88rem", color: "#64748b", lineHeight: "1.8", marginBottom: "2rem" }}>
              يمكنك التواصل معنا عبر أي من القنوات التالية وسنرد عليك في أقرب وقت ممكن.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[
                { icon: "📧", title: "البريد الإلكتروني", value: "info@sastek.sa", sub: "نرد خلال 24 ساعة" },
                { icon: "📱", title: "واتساب", value: "+966 50 000 0000", sub: "متاح 9 ص - 6 م" },
                { icon: "📍", title: "الموقع", value: "الرياض، المملكة العربية السعودية", sub: "مدينة الرياض" },
                { icon: "🕐", title: "ساعات العمل", value: "الأحد - الخميس", sub: "9:00 ص - 6:00 م" },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", gap: "1rem", padding: "1.2rem", borderRadius: "14px", background: "#fff", border: "1px solid #e8f0fe", transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,.25)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(14,165,233,.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8f0fe"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: "1.4rem", flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: ".78rem", color: "#94a3b8", fontWeight: "600", marginBottom: "3px" }}>{item.title}</div>
                    <div style={{ fontSize: ".9rem", fontWeight: "700", color: "#0f172a" }}>{item.value}</div>
                    <div style={{ fontSize: ".75rem", color: "#64748b", marginTop: "2px" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div style={{ background: "#fff", borderRadius: "20px", padding: "2.5rem", border: "1px solid #e8f0fe", boxShadow: "0 4px 24px rgba(14,165,233,.06)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "900", color: "#0f172a", marginBottom: ".8rem" }}>تم إرسال رسالتك!</h3>
                <p style={{ fontSize: ".9rem", color: "#64748b", lineHeight: "1.8", marginBottom: "1.5rem" }}>
                  سنتواصل معك في أقرب وقت ممكن.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", color: "#fff", padding: "12px 30px", borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: "'Cairo',sans-serif", fontWeight: "700", fontSize: ".9rem" }}>
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "900", color: "#0f172a", marginBottom: "1.5rem" }}>أرسل لنا رسالة</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: ".78rem", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>الاسم الكامل *</label>
                    <input placeholder="أدخل اسمك" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: ".78rem", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>البريد الإلكتروني *</label>
                    <input type="email" placeholder="example@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: ".78rem", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>رقم الجوال</label>
                    <input placeholder="+966 50 000 0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: ".78rem", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>موضوع الرسالة</label>
                    <input placeholder="استفسار عن الخدمة" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontSize: ".78rem", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>الرسالة *</label>
                  <textarea placeholder="اكتب رسالتك هنا..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ height: "140px", resize: "none" }} />
                </div>
                <button onClick={handleSubmit} disabled={loading || !form.name || !form.email || !form.message}
                  className="cta-btn"
                  style={{
                    width: "100%", background: loading || !form.name || !form.email || !form.message ? "rgba(14,165,233,.3)" : "linear-gradient(135deg,#0ea5e9,#6366f1)",
                    color: "#fff", padding: "14px", borderRadius: "10px", border: "none",
                    cursor: loading || !form.name || !form.email || !form.message ? "not-allowed" : "pointer",
                    fontFamily: "'Cairo',sans-serif", fontWeight: "800", fontSize: ".95rem",
                    boxShadow: !loading && form.name && form.email && form.message ? "0 8px 24px rgba(14,165,233,.3)" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  }}>
                  {loading ? (
                    <>
                      <div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,.4)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
                      جاري الإرسال...
                    </>
                  ) : "إرسال الرسالة ←"}
                </button>
              </>
            )}
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