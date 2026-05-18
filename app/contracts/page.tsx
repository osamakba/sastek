"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { UserButton } from "@clerk/nextjs";

export default function ContractsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleSubmit = async () => {
    if (!file || !question) return;
    setLoading(true);
    setAnswer("");
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("question", question);
    const res = await fetch("/api/review", { method: "POST", body: formData });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") setFile(dropped);
  };

  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "'Cairo', sans-serif", color: "#0f172a" }}>
      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .prose h2 { font-size:1rem; font-weight:800; color:#0f172a; margin:1.2rem 0 .5rem; font-family:'Cairo',sans-serif; background:linear-gradient(135deg,#0ea5e9,#6366f1); color:#fff; padding:8px 14px; border-radius:8px; }
        .prose h3 { font-size:.92rem; font-weight:700; color:#0ea5e9; margin:.9rem 0 .4rem; font-family:'Cairo',sans-serif; }
        .prose p { color:#475569; font-size:.86rem; line-height:1.9; margin-bottom:.5rem; font-family:'Tajawal',sans-serif; }
        .prose ul { padding-right:1.2rem; margin-bottom:.8rem; }
        .prose ul li { color:#475569; font-size:.88rem; line-height:1.85; font-family:'Tajawal',sans-serif; margin-bottom:.25rem; }
        .prose ul ul { padding-right:1rem; margin-top:.25rem; }
        .prose ul ul li { font-size:.8rem; color:#64748b; }
        .prose ol li { color:#475569; font-size:.88rem; line-height:1.85; font-family:'Tajawal',sans-serif; margin-bottom:.25rem; }
        .prose strong { color:#0f172a; font-weight:800; }
        .prose blockquote { background:rgba(14,165,233,.06); border-right:3px solid #0ea5e9; padding:.6rem 1rem; border-radius:8px; margin:.6rem 0; }
        .prose blockquote p { font-size:.8rem; color:#64748b; margin:0; }
        .prose hr { border:none; border-top:1px solid #e8f0fe; margin:1rem 0; }
        .prose table { width:100%; border-collapse:collapse; margin:.8rem 0; font-size:.8rem; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(14,165,233,.08); }
        .prose thead tr { background:linear-gradient(135deg,#0ea5e9,#6366f1); }
        .prose th { color:#fff; padding:9px 12px; font-family:'Cairo',sans-serif; font-weight:700; text-align:right; border:none; }
        .prose td { padding:8px 12px; color:#475569; border-bottom:1px solid #e8f0fe; font-family:'Tajawal',sans-serif; background:#fff; }
        .prose tr:last-child td { border-bottom:none; }
        .prose tr:hover td { background:#f8faff; transition:background .2s; }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:#0ea5e9; border-radius:2px; }
      `}</style>

      {/* HEADER */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.2rem 4rem",
        borderBottom: "1px solid rgba(14,165,233,0.1)",
        background: "rgba(248,250,255,0.95)",
        backdropFilter: "blur(20px)",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 20px rgba(14,165,233,0.06)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src="/logo.png" alt="SASTEK" style={{ height: "36px", width: "auto" }} />
          <span style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.2rem", fontWeight: "900", color: "#0f172a", letterSpacing: "2px" }}>SASTEK</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#64748b", fontSize: ".85rem", fontWeight: "600" }}>⚖️ تحليل العقود</span>
          <UserButton />
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        {/* Page title */}
        <div style={{ textAlign: "center", marginBottom: "3rem", animation: "fadeUp .8s ease" }}>
          <div style={{ display: "inline-block", background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.18)", color: "#0ea5e9", padding: "5px 18px", borderRadius: "50px", fontSize: ".7rem", fontWeight: "800", letterSpacing: "3px", marginBottom: "1rem", textTransform: "uppercase" }}>
            تحليل العقود
          </div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px", marginBottom: ".5rem" }}>
            تحليل العقود بالذكاء الاصطناعي
          </h1>
          <p style={{ color: "#64748b", fontSize: ".95rem" }}>
            ارفع عقدك واحصل على تحليل قانوني شامل وفق النظام السعودي
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "2rem", alignItems: "start" }}>

          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

            {/* Upload */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput")?.click()}
              style={{
                border: `2px dashed ${dragging ? "#0ea5e9" : file ? "#0ea5e9" : "rgba(14,165,233,0.25)"}`,
                borderRadius: "16px", padding: "2.5rem 2rem",
                textAlign: "center", cursor: "pointer",
                background: dragging ? "rgba(14,165,233,0.06)" : file ? "rgba(14,165,233,0.04)" : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(15px)",
                transition: "all .3s ease",
                boxShadow: "0 2px 16px rgba(14,165,233,0.06)",
              }}
            >
              <input id="fileInput" type="file" accept=".pdf" style={{ display: "none" }} onChange={e => setFile(e.target.files?.[0] || null)} />
              <div style={{ fontSize: "2.5rem", marginBottom: ".8rem" }}>{file ? "✅" : "📄"}</div>
              {file ? (
                <>
                  <p style={{ color: "#0ea5e9", fontFamily: "'Cairo',sans-serif", fontWeight: "700", fontSize: ".95rem" }}>{file.name}</p>
                  <p style={{ color: "#94a3b8", fontFamily: "'Tajawal',sans-serif", fontSize: ".78rem", marginTop: ".3rem" }}>اضغط لتغيير الملف</p>
                </>
              ) : (
                <>
                  <p style={{ color: "#0f172a", fontFamily: "'Cairo',sans-serif", fontWeight: "700", fontSize: ".95rem", marginBottom: ".3rem" }}>اسحب ملف PDF هنا</p>
                  <p style={{ color: "#94a3b8", fontFamily: "'Tajawal',sans-serif", fontSize: ".82rem" }}>أو اضغط للاختيار من جهازك</p>
                </>
              )}
            </div>

            {/* Question */}
            <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(15px)", borderRadius: "16px", padding: "1.4rem", border: "1px solid rgba(14,165,233,0.1)", boxShadow: "0 2px 16px rgba(14,165,233,0.06)" }}>
              <label style={{ display: "block", fontFamily: "'Cairo',sans-serif", fontWeight: "700", color: "#0f172a", fontSize: ".9rem", marginBottom: ".7rem" }}>
                ماذا تريد أن تعرف؟
              </label>
              <textarea
                placeholder="مثال: ما هي مدة العقد؟ هل فيه بنود خطرة؟"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                style={{
                  width: "100%", height: "110px",
                  border: "1.5px solid rgba(14,165,233,0.15)",
                  borderRadius: "10px", padding: ".9rem",
                  fontFamily: "'Tajawal',sans-serif", fontSize: ".88rem",
                  color: "#0f172a", background: "rgba(255,255,255,0.8)",
                  resize: "none", outline: "none", lineHeight: "1.8",
                  transition: "border-color .2s",
                }}
                onFocus={e => (e.target.style.borderColor = "#0ea5e9")}
                onBlur={e => (e.target.style.borderColor = "rgba(14,165,233,0.15)")}
              />
            </div>

            {/* Suggested */}
            <div>
              <p style={{ color: "#94a3b8", fontFamily: "'Tajawal',sans-serif", fontSize: ".78rem", marginBottom: ".6rem" }}>أسئلة مقترحة:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                {["حلل العقد كاملاً", "ما البنود الخطرة؟", "ما حقوقي عند الفسخ؟", "هل العقد متوافق مع نظام العمل؟"].map(q => (
                  <button key={q} onClick={() => setQuestion(q)} style={{
                    background: "rgba(255,255,255,0.85)", border: "1px solid rgba(14,165,233,0.15)",
                    color: "#0ea5e9", padding: "5px 14px", borderRadius: "50px",
                    fontSize: ".75rem", fontFamily: "'Tajawal',sans-serif",
                    cursor: "pointer", transition: "all .2s ease",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.85)"; e.currentTarget.style.color = "#0ea5e9"; }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} disabled={loading || !file || !question}
              style={{
                background: loading || !file || !question ? "rgba(14,165,233,0.3)" : "linear-gradient(135deg,#0ea5e9,#6366f1)",
                color: "#fff", padding: "16px",
                borderRadius: "12px", border: "none",
                fontFamily: "'Cairo',sans-serif", fontWeight: "800",
                fontSize: "1rem", cursor: loading || !file || !question ? "not-allowed" : "pointer",
                boxShadow: !loading && file && question ? "0 10px 30px rgba(14,165,233,0.3)" : "none",
                transition: "all .3s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              }}>
              {loading ? (
                <>
                  <div style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,.4)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
                  جاري التحليل...
                </>
              ) : "⚖️ حلل العقد الآن"}
            </button>
          </div>

          {/* Right - Result */}
          <div style={{
            background: "rgba(255,255,255,0.85)", backdropFilter: "blur(15px)",
            borderRadius: "20px", border: "1px solid rgba(14,165,233,0.1)",
            minHeight: "500px", padding: "2rem",
            boxShadow: "0 4px 30px rgba(14,165,233,0.08)",
          }}>
            {!answer && !loading && (
              <div style={{ textAlign: "center", padding: "5rem 2rem", color: "#cbd5e1" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem", opacity: .5 }}>⚖️</div>
                <p style={{ fontFamily: "'Tajawal',sans-serif", fontSize: ".9rem", lineHeight: "1.9", color: "#94a3b8" }}>
                  ارفع عقدك واكتب سؤالك
                  <br />وسيظهر التحليل هنا
                </p>
              </div>
            )}
            {loading && (
              <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
                <div style={{ width: "50px", height: "50px", border: "3px solid rgba(14,165,233,.15)", borderTop: "3px solid #0ea5e9", borderRadius: "50%", animation: "spin .8s linear infinite", margin: "0 auto 1.5rem" }} />
                <p style={{ color: "#64748b", fontFamily: "'Tajawal',sans-serif", fontSize: ".9rem" }}>جاري تحليل العقد...</p>
              </div>
            )}
            {answer && (
              <div style={{ animation: "fadeUp .5s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(14,165,233,0.1)" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0ea5e9" }} />
                  <span style={{ fontFamily: "'Cairo',sans-serif", fontWeight: "700", color: "#0f172a", fontSize: ".92rem" }}>نتيجة التحليل</span>
                </div>
                <div className="prose">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}