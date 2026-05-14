"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

    const res = await fetch("/api/review", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
    }
  };

  return (
    <main dir="rtl" style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #dff0ec 0%, #eee8f0 40%, #e8eef8 100%)",
      fontFamily: "'Cairo', 'Tajawal', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@400;500;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .prose h2 { font-size:1.15rem; font-weight:800; color:#1e3a3c; margin:1.4rem 0 0.6rem; font-family:'Cairo',sans-serif; }
.prose { direction: rtl; }
.prose h2 { 
  font-size:1.1rem; font-weight:900; color:#fff; 
  margin:1.5rem 0 0.8rem; font-family:'Cairo',sans-serif;
  background: linear-gradient(135deg, #3a7a7c, #5f9ea0);
  padding: 8px 16px; border-radius: 10px;
  display: flex; align-items: center; gap: 8px;
}
.prose h3 { font-size:0.95rem; font-weight:700; color:#2d5a5c; margin:1rem 0 0.4rem; font-family:'Cairo',sans-serif; }
.prose p { color:#4a6a6c; font-size:0.88rem; line-height:1.9; margin-bottom:0.6rem; font-family:'Tajawal',sans-serif; }
.prose ul { padding-right:1.4rem; margin-bottom:0.8rem; }
.prose li { color:#4a6a6c; font-size:0.88rem; line-height:1.9; font-family:'Tajawal',sans-serif; margin-bottom:0.3rem; }
.prose strong { color:#1e3a3c; font-weight:900; font-family:'Cairo',sans-serif; }
.prose p strong { 
  color:#1e3a3c; font-weight:900; font-size:0.95rem;
  background: rgba(95,158,160,0.1); 
  padding: 1px 6px; border-radius: 4px;
}
.prose li strong { color:#1e3a3c; font-weight:900; font-size:0.95rem; }
.prose hr { border:none; border-top:1px solid rgba(95,158,160,0.15); margin:1.2rem 0; }
.prose table { 
  width:100%; border-collapse:collapse; margin:0.8rem 0; 
  font-size:0.82rem; border-radius:12px; overflow:hidden;
  box-shadow: 0 2px 15px rgba(95,158,160,0.1);
}
.prose thead tr { background: linear-gradient(135deg, #3a7a7c, #5f9ea0); }
.prose th { 
  color:#fff; padding:10px 14px; 
  font-family:'Cairo',sans-serif; font-weight:700; 
  text-align:right; border:none;
}
.prose td { 
  padding:9px 14px; color:#4a6a6c; 
  border-bottom:1px solid rgba(95,158,160,0.1); 
  font-family:'Tajawal',sans-serif; background:#fff;
}
.prose tr:last-child td { border-bottom: none; }
.prose tr:nth-child(even) td { background:rgba(95,158,160,0.04); }
.prose tr:hover td { background:rgba(95,158,160,0.08); transition: background 0.2s; }
.prose blockquote { 
  background:rgba(95,158,160,0.06); border-right:3px solid #5f9ea0; 
  padding:0.6rem 1rem; border-radius:8px; margin:0.6rem 0; 
  font-size:0.82rem; color:#5a7a7c; font-family:'Tajawal',sans-serif; 
}
        * { box-sizing:border-box; }
      `}</style>

      {/* Header */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.2rem 4rem",
        borderBottom: "1px solid rgba(95,158,160,0.15)",
        background: "rgba(223,240,236,0.9)",
        backdropFilter: "blur(20px)",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 20px rgba(95,158,160,0.08)",
      }}>
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: "12px",
          textDecoration: "none",
        }}>
          <div style={{
            width: "36px", height: "36px",
            background: "linear-gradient(135deg, #5f9ea0, #7b5ea7)",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: "8px", height: "8px", background: "#fff", borderRadius: "50%", animation: "pulse 2s ease-in-out infinite" }} />
          </div>
          <span style={{ fontFamily: "'Cairo', sans-serif", fontSize: "1.4rem", fontWeight: "900", color: "#3a5a60", letterSpacing: "2px" }}>
            ميسر
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#5a7a7c", fontFamily: "'Tajawal', sans-serif", fontSize: "0.9rem" }}>
          <span>⚖️</span>
          <span>تحليل العقود</span>
        </div>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        {/* Page title */}
        <div style={{ textAlign: "center", marginBottom: "3rem", animation: "fadeUp 0.8s ease" }}>
          <h1 style={{
            fontFamily: "'Cairo', sans-serif",
            fontSize: "2.5rem", fontWeight: "900",
            color: "#1e3a3c", marginBottom: "0.5rem",
          }}>
            تحليل العقود بالذكاء الاصطناعي
          </h1>
          <p style={{ color: "#7a9a9c", fontFamily: "'Tajawal', sans-serif", fontSize: "1rem" }}>
            ارفع عقدك واحصل على تحليل قانوني شامل وفق النظام السعودي
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>

          {/* Left: Upload + Question */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Upload area */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput")?.click()}
              style={{
                border: `2px dashed ${dragging ? "#5f9ea0" : file ? "#5f9ea0" : "rgba(95,158,160,0.3)"}`,
                borderRadius: "20px",
                padding: "3rem 2rem",
                textAlign: "center",
                cursor: "pointer",
                background: dragging
                  ? "rgba(95,158,160,0.08)"
                  : file
                    ? "rgba(95,158,160,0.05)"
                    : "rgba(255,255,255,0.7)",
                backdropFilter: "blur(15px)",
                transition: "all 0.3s ease",
              }}
            >
              <input
                id="fileInput"
                type="file"
                accept=".pdf"
                style={{ display: "none" }}
                onChange={e => setFile(e.target.files?.[0] || null)}
              />
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                {file ? "✅" : "📄"}
              </div>
              {file ? (
                <>
                  <p style={{ color: "#3a7a7c", fontFamily: "'Cairo', sans-serif", fontWeight: "700", fontSize: "1rem" }}>
                    {file.name}
                  </p>
                  <p style={{ color: "#7a9a9c", fontFamily: "'Tajawal', sans-serif", fontSize: "0.82rem", marginTop: "0.4rem" }}>
                    اضغط لتغيير الملف
                  </p>
                </>
              ) : (
                <>
                  <p style={{ color: "#3a7a7c", fontFamily: "'Cairo', sans-serif", fontWeight: "700", fontSize: "1rem", marginBottom: "0.4rem" }}>
                    اسحب ملف PDF هنا
                  </p>
                  <p style={{ color: "#7a9a9c", fontFamily: "'Tajawal', sans-serif", fontSize: "0.85rem" }}>
                    أو اضغط للاختيار من جهازك
                  </p>
                </>
              )}
            </div>

            {/* Question */}
            <div style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(15px)",
              borderRadius: "20px",
              padding: "1.5rem",
              border: "1px solid rgba(95,158,160,0.15)",
            }}>
              <label style={{ display: "block", fontFamily: "'Cairo', sans-serif", fontWeight: "700", color: "#1e3a3c", fontSize: "0.95rem", marginBottom: "0.8rem" }}>
                ماذا تريد أن تعرف؟
              </label>
              <textarea
                placeholder="مثال: ما هي مدة العقد؟ هل فيه بنود خطرة؟ ما حقوقي في حالة الفسخ؟"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                style={{
                  width: "100%", height: "130px",
                  border: "1.5px solid rgba(95,158,160,0.2)",
                  borderRadius: "12px", padding: "1rem",
                  fontFamily: "'Tajawal', sans-serif", fontSize: "0.9rem",
                  color: "#1e3a3c", background: "rgba(255,255,255,0.8)",
                  resize: "none", outline: "none",
                  lineHeight: "1.8",
                }}
              />
            </div>

            {/* Suggested questions */}
            <div>
              <p style={{ color: "#7a9a9c", fontFamily: "'Tajawal', sans-serif", fontSize: "0.82rem", marginBottom: "0.8rem" }}>
                أسئلة مقترحة:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {[
                  "حلل العقد كاملاً",
                  "ما البنود الخطرة؟",
                  "ما حقوقي عند الفسخ؟",
                  "هل العقد متوافق مع نظام العمل؟",
                  "ما مدة العقد وشروط تجديده؟",
                ].map(q => (
                  <button key={q} onClick={() => setQuestion(q)} style={{
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(95,158,160,0.2)",
                    color: "#3a7a7c", padding: "6px 16px",
                    borderRadius: "50px", fontSize: "0.8rem",
                    fontFamily: "'Tajawal', sans-serif",
                    cursor: "pointer", transition: "all 0.2s ease",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#5f9ea0"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.color = "#3a7a7c"; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !file || !question}
              style={{
                background: loading || !file || !question
                  ? "rgba(95,158,160,0.3)"
                  : "linear-gradient(135deg, #3a7a7c, #5f9ea0)",
                color: "#fff", padding: "18px",
                borderRadius: "14px", border: "none",
                fontFamily: "'Cairo', sans-serif", fontWeight: "700",
                fontSize: "1.05rem", cursor: loading || !file || !question ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: !loading && file && question ? "0 10px 30px rgba(95,158,160,0.3)" : "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              }}
            >
              {loading ? (
                <>
                  <div style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  جاري التحليل...
                </>
              ) : "⚖️ حلل العقد الآن"}
            </button>
          </div>

          {/* Right: Result */}
          <div style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(15px)",
            borderRadius: "20px",
            border: "1px solid rgba(95,158,160,0.15)",
            minHeight: "500px",
            padding: "2rem",
            boxShadow: "0 8px 40px rgba(95,158,160,0.08)",
          }}>
            {!answer && !loading && (
              <div style={{ textAlign: "center", padding: "5rem 2rem", color: "#b0c8ca" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem", opacity: 0.5 }}>⚖️</div>
                <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "0.95rem", lineHeight: "1.9" }}>
                  ارفع عقدك واكتب سؤالك<br />وسيظهر التحليل هنا
                </p>
              </div>
            )}

            {loading && (
              <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
                <div style={{ width: "50px", height: "50px", border: "3px solid rgba(95,158,160,0.2)", borderTop: "3px solid #5f9ea0", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1.5rem" }} />
                <p style={{ color: "#5a7a7c", fontFamily: "'Tajawal', sans-serif", fontSize: "0.95rem" }}>
                  جاري تحليل العقد...
                </p>
              </div>
            )}

            {answer && (
              <div style={{ animation: "fadeUp 0.5s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(95,158,160,0.12)" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#5f9ea0", animation: "pulse 2s ease-in-out infinite" }} />
                  <span style={{ fontFamily: "'Cairo', sans-serif", fontWeight: "700", color: "#1e3a3c", fontSize: "0.95rem" }}>
                    نتيجة التحليل
                  </span>
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