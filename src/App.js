import { useState, useEffect, useRef, useCallback } from "react"; // v20260310091319// ===================== INITIAL DATA =====================
const INITIAL_DATA = {
  notices: [
    { id: 1, text: "আগামী ১৫ই মার্চ অফিস বন্ধ থাকবে।", date: "2026-03-03" },
    { id: 2, text: "নতুন প্রোডাক্ট অফার: BL SIM ক্রয়ে বিশেষ ছাড় পাওয়া যাচ্ছে!", date: "2026-03-02" },
    { id: 3, text: "সকল কর্মচারীকে সময়মতো হাজিরা দেওয়ার অনুরোধ করা হচ্ছে।", date: "2026-03-01" },
  ],
  owner: {
    name: "রহিম উল্লাহ",
    address: "টেকনাফ, কক্সবাজার, চট্টগ্রাম",
    photo: "https://i.ibb.co.com/SDxXMnr7/Rahim-Bhai.jpg",
    logo: "https://i.ibb.co.com/Bp60s1J/Blue-Minimalist-Globe-Logo.jpg",
  },
  distributionInfo: {
    products: "বাংলালিংক সিম, ডেটা প্যাক, রিচার্জ",
    coverage: "টেকনাফ, হ্নীলা, বাহারছড়া, শাহপরীর দ্বীপ",
    helpline: "01994-614914",
  },
  distributionManager: {
    name: "মো. আব্দুল করিম",
    mobile: "01900-000001",
    photo: "https://i.pravatar.cc/80?img=5",
    address: "টেকনাফ সদর",
  },
  areaManager: {
    name: "মো. জাহাঙ্গীর আলম",
    mobile: "01900-000002",
    photo: "https://i.pravatar.cc/80?img=8",
    address: "টেকনাফ সদর",
  },
  showAreaManager: true,
  staff: [
    { id: 1, code: "ST001", name: "মো. রফিক উদ্দিন", designation: "সেলস রিপ্রেজেন্টেটিভ", father: "মো. করিম উদ্দিন", address: "টেকনাফ সদর", mobile: "01811-111111", idNo: "1234567890", area: "টেকনাফ", photo: "https://i.pravatar.cc/80?img=11" },
    { id: 2, code: "ST002", name: "সালমা বেগম", designation: "অফিস সহকারী", father: "মো. আলী হোসেন", address: "হ্নীলা, টেকনাফ", mobile: "01822-222222", idNo: "0987654321", area: "হ্নীলা", photo: "https://i.pravatar.cc/80?img=20" },
    { id: 3, code: "ST003", name: "কামাল হোসেন", designation: "ডেলিভারি ম্যান", father: "নুরুল ইসলাম", address: "শাহপরীর দ্বীপ", mobile: "01833-333333", idNo: "1122334455", area: "শাহপরীর দ্বীপ", photo: "https://i.pravatar.cc/80?img=33" },
    { id: 4, code: "ST004", name: "নাসরিন আক্তার", designation: "হিসাবরক্ষক", father: "মো. জাহাঙ্গীর", address: "বাহারছড়া, টেকনাফ", mobile: "01844-444444", idNo: "5566778899", area: "বাহারছড়া", photo: "https://i.pravatar.cc/80?img=47" },
  ],
  events: [
    { id: 1, name: "বার্ষিক বিতরণ সভা ২০২৬", caption: "সফলভাবে সম্পন্ন হলো আমাদের বার্ষিক বিতরণ সভা।", img: "https://picsum.photos/seed/event1/400/250" },
    { id: 2, name: "নতুন পণ্য লঞ্চ ইভেন্ট", caption: "বাংলালিংক-এর নতুন প্যাকেজ উদ্বোধনী অনুষ্ঠান।", img: "https://picsum.photos/seed/event2/400/250" },
  ],
  accounting: [
    { id: 1, date: "2026-03-03", todayBalance: 125000, totalSales: 85000, returns: 5000, totalBalance: 205000 },
    { id: 2, date: "2026-03-02", todayBalance: 98000, totalSales: 72000, returns: 3000, totalBalance: 167000 },
    { id: 3, date: "2026-03-01", todayBalance: 110000, totalSales: 91000, returns: 4500, totalBalance: 196500 },
  ],
  accountingRules: [],
  attendance: [
    { id: 1, code: "ST001", name: "মো. রফিক উদ্দিন", time: "2026-03-03 09:02", status: "pending" },
    { id: 2, code: "ST002", name: "সালমা বেগম", time: "2026-03-03 09:15", status: "pending" },
    { id: 3, code: "ST003", name: "কামাল হোসেন", time: "2026-03-02 09:05", status: "approved" },
    { id: 4, code: "ST004", name: "নাসরিন আক্তার", time: "2026-03-02 09:30", status: "rejected", reason: "সময়মতো আসেননি" },
  ],
  offers: [
    { id: 1, title: "রমজান স্পেশাল অফার", desc: "১০০ টাকা রিচার্জে ৫ GB ডেটা ফ্রি", img: "https://picsum.photos/seed/offer1/300/180" },
  ],
  customTabs: [],
  products: [
    { id: 1, name: "বাংলালিংক সিম", price: 100, stock: 50, img: "https://picsum.photos/seed/sim/300/200", desc: "নতুন বাংলালিংক সিম কার্ড" },
    { id: 2, name: "ডেটা প্যাক ১GB", price: 49, stock: 100, img: "https://picsum.photos/seed/data/300/200", desc: "৭ দিনের জন্য ১GB ডেটা" },
  ],
  promoCodes: [
    { id: 1, code: "RAHIM10", discount: 10, type: "percent", active: true },
    { id: 2, code: "FLAT20", discount: 20, type: "flat", active: true },
  ],
  orders: [],
  complaints: [],
};

const DEFAULT_USERS = { admin: "admin123", readonly: "view123" };

// ===================== NETLIFY BLOBS API =====================
const BLOB_DATA_KEY = "rahim_data";
const BLOB_USERS_KEY = "rahim_users";
const LS_ROLE_KEY = "rahim_role_v1";

// Login session শুধু localStorage-এ (device-specific, ঠিকই আছে)
const lsSave = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };
const lsLoad = (key) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; } };
const lsRemove = (key) => { try { localStorage.removeItem(key); } catch {} };

// Netlify Blobs — server থেকে ডেটা লোড করুন
const blobLoad = async (key) => {
  try {
    const res = await fetch(`/api/data?key=${encodeURIComponent(key)}`);
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.value) return null;
    return JSON.parse(json.value);
  } catch (e) {
    console.warn("blobLoad error:", e);
    return null;
  }
};

// Netlify Blobs — server-এ ডেটা সেভ করুন
const blobSave = async (key, value) => {
  try {
    const res = await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: JSON.stringify(value) }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    console.error("blobSave error:", e);
  }
};

// ===================== IMAGE COMPRESSION =====================
const compressImage = (dataUrl, maxDim = 400, quality = 0.55) => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    let w = img.width, h = img.height;
    if (w > maxDim || h > maxDim) {
      if (w >= h) { h = Math.round(h * maxDim / w); w = maxDim; }
      else { w = Math.round(w * maxDim / h); h = maxDim; }
    }
    canvas.width = w; canvas.height = h;
    canvas.getContext("2d").drawImage(img, 0, 0, w, h);
    resolve(canvas.toDataURL("image/jpeg", quality));
  };
  img.onerror = () => resolve(dataUrl);
  img.src = dataUrl;
});

// ===================== HELPERS =====================
const evalFormula = (formula, entry) => {
  try {
    const { todayBalance = 0, totalSales = 0, returns = 0, totalBalance = 0 } = entry;
    // eslint-disable-next-line no-new-func
    return new Function("todayBalance", "totalSales", "returns", "totalBalance",
      `"use strict"; return (${formula})`)(todayBalance, totalSales, returns, totalBalance);
  } catch { return "ত্রুটি"; }
};

// ===================== IMAGE UPLOAD HELPER =====================
function ImageInputWithUpload({ value, onChange, placeholder, previewStyle, showPreview = true }) {
  const fileRef = useRef(null);
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressImage(ev.target.result);
      onChange(compressed);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const isDataUrl = value && value.startsWith("data:");
  return (
    <div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input value={isDataUrl ? "" : (value || "")} onChange={e => onChange(e.target.value)}
          placeholder={placeholder || "ছবির URL অথবা আপলোড করুন"} style={{ flex: 1 }} />
        <button className="btn btn-ghost" style={{ fontSize: 11, padding: "6px 10px", whiteSpace: "nowrap", flexShrink: 0 }}
          onClick={() => fileRef.current?.click()} type="button">📷 আপলোড</button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
      </div>
      {showPreview && value && (
        <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
          <ImgWithFallback src={value} alt="preview" style={previewStyle || { width: 60, height: 60, objectFit: "cover", borderRadius: 8 }} />
          <button className="btn btn-ghost" style={{ fontSize: 11, padding: "3px 8px" }} onClick={() => onChange("")} type="button">সরিয়ে দিন</button>
        </div>
      )}
    </div>
  );
}

// ===================== STYLES =====================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Tiro+Bangla:ital@0;1&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Hind Siliguri', sans-serif; background: #0f1923; color: #e8eaf0; }
  :root {
    --navy: #0f1923; --navy2: #162032; --navy3: #1e2d42;
    --gold: #e8a020; --gold2: #f5c460;
    --red: #e84040; --green: #28a745; --blue: #2a7de1;
    --text: #e8eaf0; --muted: #8a9ab5; --border: #2a3f5a; --card: #162032;
  }
  .scrollbar-thin::-webkit-scrollbar { width: 4px; height: 4px; }
  .scrollbar-thin::-webkit-scrollbar-track { background: var(--navy3); }
  .scrollbar-thin::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
  @keyframes scrollText { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(232,160,32,0.4); } 50% { box-shadow: 0 0 0 8px rgba(232,160,32,0); } }
  @keyframes savePop { 0%{opacity:0;transform:translateY(10px)} 20%{opacity:1;transform:translateY(0)} 80%{opacity:1} 100%{opacity:0;transform:translateY(-10px)} }
  @keyframes spin { to { transform: rotate(360deg); } }
  .animate-in { animation: fadeIn 0.4s ease forwards; }
  .save-toast { position:fixed; bottom:24px; right:24px; background:var(--green); color:white; padding:10px 20px; border-radius:10px; font-size:13px; font-weight:600; z-index:9999; animation: savePop 2.5s ease forwards; pointer-events:none; box-shadow: 0 4px 20px rgba(40,167,69,0.4); }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; }
  .btn { padding: 8px 18px; border-radius: 8px; border: none; cursor: pointer; font-family: 'Hind Siliguri', sans-serif; font-weight: 600; font-size: 14px; transition: all 0.2s; }
  .btn-gold { background: var(--gold); color: #0f1923; }
  .btn-gold:hover { background: var(--gold2); transform: translateY(-1px); }
  .btn-red { background: var(--red); color: white; }
  .btn-red:hover { filter: brightness(1.15); }
  .btn-green { background: var(--green); color: white; }
  .btn-green:hover { filter: brightness(1.15); }
  .btn-blue { background: var(--blue); color: white; }
  .btn-blue:hover { filter: brightness(1.15); }
  .btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--navy3); color: var(--text); }
  input, select, textarea { background: var(--navy3); border: 1px solid var(--border); border-radius: 8px; color: var(--text); padding: 9px 12px; font-family: 'Hind Siliguri', sans-serif; font-size: 14px; width: 100%; outline: none; transition: border 0.2s; }
  input:focus, select:focus, textarea:focus { border-color: var(--gold); }
  label { display: block; font-size: 13px; color: var(--muted); margin-bottom: 5px; font-weight: 500; }
  .tab-btn { padding: 9px 16px; border-radius: 8px; border: none; cursor: pointer; font-family: 'Hind Siliguri', sans-serif; font-weight: 600; font-size: 13px; background: transparent; color: var(--muted); transition: all 0.2s; }
  .tab-btn.active { background: var(--gold); color: #0f1923; }
  .tab-btn:hover:not(.active) { background: var(--navy3); color: var(--text); }
  .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-pending { background: rgba(232,160,32,0.15); color: var(--gold); border: 1px solid rgba(232,160,32,0.3); }
  .badge-approved { background: rgba(40,167,69,0.15); color: var(--green); border: 1px solid rgba(40,167,69,0.3); }
  .badge-rejected { background: rgba(232,64,64,0.15); color: var(--red); border: 1px solid rgba(232,64,64,0.3); }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
  .modal { background: var(--navy2); border: 1px solid var(--border); border-radius: 16px; padding: 28px; width: 90%; max-width: 460px; animation: fadeIn 0.3s ease; }
  nav a { color: var(--muted); text-decoration: none; font-size: 14px; font-weight: 500; padding: 6px 12px; border-radius: 6px; transition: all 0.2s; cursor: pointer; }
  nav a:hover, nav a.active { color: var(--gold); }
  .notice-bar { background: linear-gradient(135deg, #162032, #1e2d42); border-bottom: 2px solid var(--gold); overflow: hidden; white-space: nowrap; }
  .notice-scroll { display: inline-block; animation: scrollText 25s linear infinite; }
  .hero-pattern { background-image: radial-gradient(circle at 20% 50%, rgba(232,160,32,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(42,125,225,0.08) 0%, transparent 40%); }
  .section-title { font-family: 'Tiro Bangla', serif; font-size: 22px; color: var(--gold); }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; padding: 11px 14px; font-size: 12px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; background: var(--navy3); }
  td { padding: 11px 14px; font-size: 14px; border-bottom: 1px solid rgba(42,63,90,0.5); vertical-align: middle; }
  tr:hover td { background: rgba(42,63,90,0.2); }
  .public-section { padding: 48px 0; }
  .dev-link { color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .dev-link:hover { color: var(--gold); text-decoration: underline; }
  .loading-screen { min-height: 100vh; background: #0f1923; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px; }
  .spinner { width: 52px; height: 52px; border: 3px solid #2a3f5a; border-top-color: #e8a020; border-radius: 50%; animation: spin 0.9s linear infinite; }
`;

// ===================== IMAGE WITH FALLBACK =====================
function ImgWithFallback({ src, alt, style, className }) {
  const [err, setErr] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => { setErr(false); setKey(k => k + 1); }, [src]);
  const isDataUrl = src && src.startsWith("data:");
  const finalSrc = isDataUrl ? src : src
    ? `https://images.weserv.nl/?url=${encodeURIComponent(src)}&default=https://placehold.co/400x250/162032/8a9ab5?text=No+Image`
    : "";
  return err || !src ? (
    <div style={{ ...style, background: "var(--navy3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontSize: 12, flexShrink: 0 }} className={className}>🖼 ছবি নেই</div>
  ) : (
    <img key={key} src={finalSrc} alt={alt || ""} style={style} className={className}
      {...(!isDataUrl && { referrerPolicy: "no-referrer", crossOrigin: "anonymous" })}
      onError={() => setErr(true)} />
  );
}

// ===================== LOADING SCREEN =====================
function LoadingScreen() {
  return (
    <>
      <style>{styles}</style>
      <div className="loading-screen">
        <div className="spinner" />
        <div style={{ color: "#8a9ab5", fontSize: 15 }}>ডেটা লোড হচ্ছে...</div>
        <div style={{ color: "#4a5a70", fontSize: 12 }}>রহিম এন্টারপ্রাইজ বাংলালিংক</div>
      </div>
    </>
  );
}

// ===================== SAVE TOAST =====================
function SaveToast({ show }) {
  if (!show) return null;
  return <div className="save-toast">✅ সেভ হয়েছে!</div>;
}

// ===================== CONFIRM DELETE MODAL =====================
function ConfirmDeleteModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal" style={{ textAlign: "center", maxWidth: 380 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>নিশ্চিত করুন</div>
        <div style={{ color: "var(--muted)", marginBottom: 20, fontSize: 14 }}>{message || "আপনি কি সত্যিই এটি মুছে দিতে চান?"}</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button className="btn btn-ghost" onClick={onCancel}>বাতিল</button>
          <button className="btn btn-red" onClick={onConfirm}>মুছে দিন</button>
        </div>
      </div>
    </div>
  );
}

// ===================== NOTICE BAR =====================
function NoticeBar({ notices }) {
  if (!notices || notices.length === 0) return null;
  const text = notices.map(n => n.text).join("   ❖   ");
  return (
    <div className="notice-bar" style={{ padding: "9px 0" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ background: "var(--gold)", color: "#0f1923", fontWeight: 700, fontSize: 13, padding: "2px 14px", whiteSpace: "nowrap", flexShrink: 0 }}>নোটিশ:</span>
        <div style={{ overflow: "hidden", flex: 1 }}>
          <span className="notice-scroll" style={{ color: "#e8eaf0", fontSize: 14, paddingLeft: 30 }}>{text}</span>
        </div>
      </div>
    </div>
  );
}

// ===================== HEADER =====================
function Header({ onLoginClick, role, onLogout, activePage, setActivePage, logo, onLogoUpload }) {
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressImage(ev.target.result, 200, 0.8);
      onLogoUpload(compressed);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  return (
    <header style={{ background: "linear-gradient(135deg, #0f1923 0%, #162032 100%)", borderBottom: "2px solid var(--gold)", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            {logo ? (
              <img src={logo} alt="logo" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)", animation: "pulse 2.5s infinite", display: "block" }} />
            ) : (
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 2.5s infinite" }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "#0f1923" }}>র</span>
              </div>
            )}
            {role === "admin" && (
              <>
                <div onClick={() => fileInputRef.current?.click()}
                  style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(0,0,0,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: 0, transition: "opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                  <span style={{ fontSize: 11, color: "#fff", fontWeight: 700, lineHeight: 1.2, textAlign: "center" }}>📷<br />লোগো</span>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
              </>
            )}
          </div>
          <div>
            <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 18, fontWeight: 700, color: "var(--gold)", lineHeight: 1.2 }}>রহিম এন্টারপ্রাইজ</div>
            <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 2 }}>BANGLALINK DISTRIBUTION</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
          {[["home", "হোম"], ["staff", "কর্মচারী"], ["events", "ইভেন্ট"], ["products", "পণ্য"], ["orders", "অর্ডার"], ["complaints", "কমপ্লেইন"], ["tracking", "ট্র্যাকিং"], ["attendance", "হাজিরা"]].map(([k, v]) => (
            <a key={k} className={activePage === k ? "active" : ""} onClick={() => setActivePage(k)}>{v}</a>
          ))}
          {role === null ? (
            <button className="btn btn-gold" onClick={onLoginClick} style={{ marginLeft: 8 }}>লগইন</button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
              <span style={{ background: "var(--navy3)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: role === "admin" ? "var(--gold)" : "var(--blue)" }}>
                {role === "admin" ? "অ্যাডমিন" : "রিড-অনলি"}
              </span>
              <button className="btn btn-ghost" onClick={() => setActivePage("dashboard")} style={{ fontSize: 12, padding: "6px 12px" }}>ড্যাশবোর্ড</button>
              <button className="btn btn-red" onClick={onLogout} style={{ fontSize: 12, padding: "6px 12px" }}>লগআউট</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

// ===================== PUBLIC HOME =====================
function PublicHome({ data }) {
  const info = data.distributionInfo || {};
  return (
    <div>
      <div className="hero-pattern" style={{ padding: "60px 20px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: "var(--gold)", marginBottom: 12, textTransform: "uppercase" }}>Official Distributor · Banglalink</div>
          <h1 style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 42, color: "var(--text)", lineHeight: 1.3, marginBottom: 16 }}>রহিম এন্টারপ্রাইজ<br /><span style={{ color: "var(--gold)" }}>বাংলালিংক</span></h1>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>টেকনাফ, কক্সবাজার-এর বিশ্বস্ত বাংলালিংক ডিস্ট্রিবিউটর</p>
        </div>
      </div>
      <div className="public-section" style={{ background: "var(--navy2)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div className="section-title" style={{ marginBottom: 24 }}>ডিস্ট্রিবিউশন তথ্য</div>
          <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            <div className="card" style={{ padding: 24, display: "flex", alignItems: "center", gap: 24, flex: "1 1 400px" }}>
              <ImgWithFallback src={data.owner.photo} alt="owner" style={{ width: 90, height: 90, borderRadius: "50%", border: "3px solid var(--gold)", objectFit: "cover", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>মালিকের নাম</div>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 22, color: "var(--gold)", marginBottom: 6 }}>{data.owner.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 3 }}>ঠিকানা</div>
                <div style={{ fontSize: 14, color: "var(--text)" }}>{data.owner.address}</div>
              </div>
            </div>
            <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 12 }}>
              {[["📦", "পণ্য", info.products || ""], ["🗺️", "কভারেজ এরিয়া", info.coverage || ""], ["📞", "হেল্পলাইন", info.helpline || ""]].map(([icon, label, val]) => (
                <div key={label} className="card" style={{ padding: "12px 16px", display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <div><div style={{ fontSize: 11, color: "var(--muted)" }}>{label}</div><div style={{ fontSize: 13, color: "var(--text)" }}>{val}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Area Manager Panel */}
      {data.showAreaManager && data.areaManager?.name && (
        <div className="public-section" style={{ background: "linear-gradient(135deg,#1a2535,#1e2d42)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div className="section-title" style={{ marginBottom: 20 }}>এরিয়া ম্যানেজার</div>
            <div className="card" style={{ padding: 24, display: "flex", alignItems: "center", gap: 20, maxWidth: 480, background: "linear-gradient(135deg,#1e2d42,#243550)", border: "1px solid rgba(42,125,225,0.3)" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <ImgWithFallback src={data.areaManager?.photo} alt="" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--blue)" }} />
                <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", background: "var(--blue)", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10, whiteSpace: "nowrap" }}>AM</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--blue)", fontWeight: 600, marginBottom: 4, letterSpacing: 1 }}>AREA MANAGER</div>
                <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 20, color: "var(--text)", marginBottom: 4 }}>{data.areaManager?.name}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 2 }}>📍 {data.areaManager?.address}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>📞 {data.areaManager?.mobile}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Distribution Manager Panel */}
      <div className="public-section" style={{ background: "linear-gradient(135deg,#162032,#1a2a3e)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div className="section-title" style={{ marginBottom: 20 }}>ডিস্ট্রিবিউশন ম্যানেজার</div>
          <div className="card" style={{ padding: 24, display: "flex", alignItems: "center", gap: 20, maxWidth: 480, background: "linear-gradient(135deg,#1e2d42,#243550)", border: "1px solid rgba(232,160,32,0.3)" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <ImgWithFallback src={data.distributionManager?.photo} alt="" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--gold)" }} />
              <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", background: "var(--gold)", color: "#0f1923", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10, whiteSpace: "nowrap" }}>DM</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 600, marginBottom: 4, letterSpacing: 1 }}>DISTRIBUTION MANAGER</div>
              <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 20, color: "var(--text)", marginBottom: 4 }}>{data.distributionManager?.name}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 2 }}>📍 {data.distributionManager?.address}</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>📞 {data.distributionManager?.mobile}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff List */}
      <div className="public-section">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div className="section-title" style={{ marginBottom: 24 }}>কর্মচারী তালিকা</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {data.staff.map(s => (
              <div key={s.id} className="card animate-in" style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8 }}>
                <ImgWithFallback src={s.photo} alt={s.name} style={{ width: 70, height: 70, borderRadius: "50%", border: "2px solid var(--border)", objectFit: "cover" }} />
                <div style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</div>
                {s.designation && <div style={{ background: "rgba(232,160,32,0.12)", border: "1px solid rgba(232,160,32,0.25)", borderRadius: 6, padding: "2px 10px", fontSize: 11, color: "var(--gold)", fontWeight: 600 }}>{s.designation}</div>}
                <div style={{ background: "var(--navy3)", borderRadius: 6, padding: "2px 10px", fontSize: 11, color: "var(--muted)" }}>{s.area}</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>📞 {s.mobile}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="public-section" style={{ background: "var(--navy2)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div className="section-title" style={{ marginBottom: 24 }}>ইভেন্ট</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {data.events.map(e => (
              <div key={e.id} className="card" style={{ overflow: "hidden" }}>
                <ImgWithFallback src={e.img} alt={e.name} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                <div style={{ padding: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: "var(--gold)" }}>{e.name}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{e.caption}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {data.offers && data.offers.length > 0 && (
        <div className="public-section">
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div className="section-title" style={{ marginBottom: 24 }}>প্রোডাক্ট অফার</div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {data.offers.map(o => (
                <div key={o.id} className="card" style={{ overflow: "hidden", width: 300 }}>
                  <ImgWithFallback src={o.img} alt={o.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  <div style={{ padding: 14 }}>
                    <div style={{ fontWeight: 700, color: "var(--gold)", marginBottom: 4 }}>{o.title}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>{o.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===================== ATTENDANCE PAGE (Public) =====================
function AttendancePage({ onSubmit }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");
  const handleSubmit = () => {
    if (!code.trim() || !name.trim()) { setErr("কর্মচারী কোড এবং নাম অবশ্যই দিতে হবে।"); return; }
    onSubmit({ code: code.trim(), name: name.trim() });
    setSubmitted(true);
  };
  if (submitted) return (
    <div style={{ maxWidth: 500, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
      <div className="card" style={{ padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 22, color: "var(--green)", marginBottom: 8 }}>সফলভাবে জমা হয়েছে!</div>
        <div style={{ color: "var(--muted)", fontSize: 14 }}>আপনার হাজিরা রিকোয়েস্ট পেন্ডিং আছে। অ্যাডমিন অ্যাপ্রুভ করবেন।</div>
        <button className="btn btn-gold" style={{ marginTop: 20 }} onClick={() => { setSubmitted(false); setCode(""); setName(""); }}>আবার জমা দিন</button>
      </div>
    </div>
  );
  return (
    <div style={{ maxWidth: 480, margin: "60px auto", padding: "0 20px" }}>
      <div className="card" style={{ padding: 36 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, background: "var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 24 }}>✋</div>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 24, color: "var(--gold)" }}>হাজিরা রিকোয়েস্ট</div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>আপনার তথ্য দিন</div>
        </div>
        {err && <div style={{ background: "rgba(232,64,64,0.1)", border: "1px solid var(--red)", borderRadius: 8, padding: "10px 14px", color: "var(--red)", fontSize: 13, marginBottom: 16 }}>{err}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label>কর্মচারী কোড</label><input value={code} onChange={e => { setCode(e.target.value); setErr(""); }} placeholder="যেমন: ST001" /></div>
          <div><label>নাম</label><input value={name} onChange={e => { setName(e.target.value); setErr(""); }} placeholder="আপনার নাম লিখুন" /></div>
          <button className="btn btn-gold" style={{ width: "100%", padding: "12px", fontSize: 16 }} onClick={handleSubmit}>সাবমিট করুন</button>
        </div>
      </div>
    </div>
  );
}

function StaffPage({ data }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
      {/* Area Manager */}
      {data.showAreaManager && data.areaManager?.name && (
        <div style={{ marginBottom: 32 }}>
          <div className="section-title" style={{ marginBottom: 16 }}>এরিয়া ম্যানেজার</div>
          <div className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16, maxWidth: 420, border: "1px solid rgba(42,125,225,0.3)" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <ImgWithFallback src={data.areaManager.photo} alt="" style={{ width: 70, height: 70, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--blue)" }} />
              <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", background: "var(--blue)", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 10 }}>AM</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--blue)", fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>AREA MANAGER</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 3 }}>{data.areaManager.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>📞 {data.areaManager.mobile}</div>
            </div>
          </div>
        </div>
      )}
      {/* Distribution Manager */}
      {data.distributionManager?.name && (
        <div style={{ marginBottom: 32 }}>
          <div className="section-title" style={{ marginBottom: 16 }}>ডিস্ট্রিবিউশন ম্যানেজার</div>
          <div className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16, maxWidth: 420, border: "1px solid rgba(232,160,32,0.3)" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <ImgWithFallback src={data.distributionManager.photo} alt="" style={{ width: 70, height: 70, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--gold)" }} />
              <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", background: "var(--gold)", color: "#0f1923", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 10 }}>DM</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--gold)", fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>DISTRIBUTION MANAGER</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 3 }}>{data.distributionManager.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>📞 {data.distributionManager.mobile}</div>
            </div>
          </div>
        </div>
      )}
      {/* Staff */}
      <div className="section-title" style={{ marginBottom: 20 }}>কর্মচারী তালিকা</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {data.staff.map(s => (
          <div key={s.id} className="card animate-in" style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8 }}>
            <ImgWithFallback src={s.photo} alt={s.name} style={{ width: 70, height: 70, borderRadius: "50%", border: "2px solid var(--gold)", objectFit: "cover" }} />
            <div style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</div>
            {s.designation && <div style={{ background: "rgba(232,160,32,0.12)", border: "1px solid rgba(232,160,32,0.25)", borderRadius: 6, padding: "2px 10px", fontSize: 11, color: "var(--gold)", fontWeight: 600 }}>{s.designation}</div>}
            <div style={{ background: "var(--navy3)", borderRadius: 6, padding: "2px 10px", fontSize: 11, color: "var(--muted)" }}>{s.area}</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>📞 {s.mobile}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsPage({ data }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
      <div className="section-title" style={{ marginBottom: 24 }}>ইভেন্ট সমূহ</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {data.events.map(e => (
          <div key={e.id} className="card" style={{ overflow: "hidden" }}>
            <ImgWithFallback src={e.img} alt={e.name} style={{ width: "100%", height: 220, objectFit: "cover" }} />
            <div style={{ padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: "var(--gold)" }}>{e.name}</div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{e.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== DASHBOARD =====================
function Dashboard({ data, setData, role, onChangePassword }) {
  const [activeTab, setActiveTab] = useState("attendance");
  const [newTabModal, setNewTabModal] = useState(false);
  const isAdmin = role === "admin";
  const builtinTabs = [
    { key: "attendance", label: "হাজিরা" },
    { key: "staff", label: "কর্মচারী" },
    { key: "accounting", label: "দৈনিক হিসাব" },
    { key: "content", label: "কন্টেন্ট" },
    { key: "products_admin", label: "পণ্য ও অর্ডার" },
    { key: "complaints_admin", label: "কমপ্লেইন" },
  ];
  const allTabs = [...builtinTabs, ...(data.customTabs || []).map(ct => ({ key: `custom_${ct.id}`, label: ct.label, custom: true, tabData: ct }))];
  const deleteCustomTab = (tabKey, tabLabel) => {
    if (window.confirm(`"${tabLabel}" ট্যাবটি মুছে ফেলবেন?`)) {
      setData(d => ({ ...d, customTabs: d.customTabs.filter(ct => `custom_${ct.id}` !== tabKey) }));
      if (activeTab === tabKey) setActiveTab("attendance");
    }
  };
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "30px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 26, color: "var(--gold)" }}>ড্যাশবোর্ড</div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>{isAdmin ? "অ্যাডমিন প্যানেল — সম্পূর্ণ অ্যাক্সেস" : "রিড-অনলি মোড"}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isAdmin && <button className="btn btn-ghost" style={{ fontSize: 12, padding: "6px 14px" }} onClick={onChangePassword}>🔑 পাসওয়ার্ড পরিবর্তন</button>}
          {!isAdmin && <div style={{ background: "rgba(42,125,225,0.1)", border: "1px solid rgba(42,125,225,0.3)", borderRadius: 8, padding: "8px 16px", color: "var(--blue)", fontSize: 13 }}>👁 রিড-অনলি</div>}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[["👥", "মোট কর্মচারী", data.staff.length, "var(--blue)"],
          ["⏳", "পেন্ডিং হাজিরা", data.attendance.filter(a => a.status === "pending").length, "var(--gold)"],
          ["✅", "অ্যাপ্রুভড হাজিরা", data.attendance.filter(a => a.status === "approved").length, "var(--green)"],
          ["💰", "আজকের সেলস", `৳${(data.accounting[0]?.totalSales || 0).toLocaleString()}`, "var(--red)"]
        ].map(([icon, label, val, color]) => (
          <div key={label} className="card" style={{ padding: 18, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{icon}</div>
            <div><div style={{ color: "var(--muted)", fontSize: 11, marginBottom: 2 }}>{label}</div><div style={{ fontSize: 20, fontWeight: 700, color }}>{val}</div></div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        {allTabs.map(t => (
          <div key={t.key} style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <button className={`tab-btn ${activeTab === t.key ? "active" : ""}`} onClick={() => setActiveTab(t.key)}
              style={{ paddingRight: t.custom && isAdmin ? 26 : undefined }}>{t.label}</button>
            {t.custom && isAdmin && (
              <button onClick={() => deleteCustomTab(t.key, t.label)}
                style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: "50%", background: "var(--red)", border: "2px solid var(--navy2)", cursor: "pointer", fontSize: 9, color: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>✕</button>
            )}
          </div>
        ))}
        {isAdmin && <button className="btn btn-ghost" style={{ fontSize: 13, padding: "7px 14px" }} onClick={() => setNewTabModal(true)}>+ নতুন ট্যাব</button>}
      </div>
      {activeTab === "attendance" && <AttendanceTab data={data} setData={setData} isAdmin={isAdmin} />}
      {activeTab === "staff" && <StaffTab data={data} setData={setData} isAdmin={isAdmin} />}
      {activeTab === "accounting" && <AccountingTab data={data} setData={setData} isAdmin={isAdmin} />}
      {activeTab === "content" && <ContentTab data={data} setData={setData} isAdmin={isAdmin} />}
      {activeTab === "products_admin" && <ProductsAdminTab data={data} setData={setData} isAdmin={isAdmin} />}
      {activeTab === "complaints_admin" && <ComplaintsAdminTab data={data} setData={setData} isAdmin={isAdmin} />}
      {(data.customTabs || []).map(ct => activeTab === `custom_${ct.id}` && (
        <CustomTabView key={ct.id} tabData={ct} data={data} setData={setData} isAdmin={isAdmin} />
      ))}
      {newTabModal && <NewTabModal onClose={() => setNewTabModal(false)} onCreate={(tab) => {
        setData(d => ({ ...d, customTabs: [...(d.customTabs || []), tab] }));
        setNewTabModal(false); setActiveTab(`custom_${tab.id}`);
      }} />}
    </div>
  );
}

function NewTabModal({ onClose, onCreate }) {
  const [label, setLabel] = useState("");
  const [fields, setFields] = useState([{ key: "col1", label: "কলাম ১", type: "text" }]);
  const [rules, setRules] = useState("");
  const addField = () => setFields(f => [...f, { key: `col${Date.now()}`, label: "", type: "text" }]);
  const removeField = (i) => setFields(f => f.filter((_, idx) => idx !== i));
  const updateField = (i, k, v) => setFields(f => f.map((fld, idx) => idx === i ? { ...fld, [k]: v } : fld));
  const handleCreate = () => {
    if (!label.trim()) return;
    const validFields = fields.filter(f => f.label.trim());
    onCreate({ id: Date.now(), label: label.trim(), fields: validFields, entries: [], rules: rules.trim() });
  };
  return (
    <div className="modal-overlay">
      <div className="modal scrollbar-thin" style={{ maxWidth: 520, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--gold)" }}>নতুন ট্যাব তৈরি করুন</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label>ট্যাবের নাম</label><input value={label} onChange={e => setLabel(e.target.value)} placeholder="যেমন: ডেলিভারি ট্র্যাকার" /></div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <label style={{ marginBottom: 0 }}>কলাম সমূহ</label>
              <button className="btn btn-ghost" style={{ fontSize: 11, padding: "4px 10px" }} onClick={addField}>+ কলাম যোগ</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {fields.map((f, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "center" }}>
                  <input value={f.label} onChange={e => updateField(i, "label", e.target.value)} placeholder="কলামের নাম" />
                  <select value={f.type} onChange={e => updateField(i, "type", e.target.value)}>
                    <option value="text">টেক্সট</option>
                    <option value="number">নম্বর</option>
                    <option value="date">তারিখ</option>
                    <option value="image">ছবির URL</option>
                  </select>
                  <button className="btn btn-red" style={{ padding: "6px 10px", fontSize: 12 }} onClick={() => removeField(i)}>✕</button>
                </div>
              ))}
            </div>
          </div>
          <div><label>নিয়ম / নোট (ঐচ্ছিক)</label>
            <textarea value={rules} onChange={e => setRules(e.target.value)} rows={2} style={{ resize: "none" }} placeholder="এই ট্যাবের জন্য বিশেষ নিয়ম..." /></div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={onClose}>বাতিল</button>
          <button className="btn btn-gold" onClick={handleCreate}>তৈরি করুন</button>
        </div>
      </div>
    </div>
  );
}

function CustomTabView({ tabData, data, setData, isAdmin }) {
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [delId, setDelId] = useState(null);
  const [form, setForm] = useState({});
  const [rulesModal, setRulesModal] = useState(false);
  const [newRules, setNewRules] = useState(tabData.rules || "");
  const openAdd = () => { const blank = {}; tabData.fields.forEach(f => blank[f.key] = ""); setForm(blank); setModal(true); setEditId(null); };
  const openEdit = (entry) => { setForm({ ...entry }); setEditId(entry.id); setModal(true); };
  const saveEntry = () => {
    if (editId) setData(d => ({ ...d, customTabs: d.customTabs.map(ct => ct.id === tabData.id ? { ...ct, entries: ct.entries.map(e => e.id === editId ? { ...form, id: editId } : e) } : ct) }));
    else setData(d => ({ ...d, customTabs: d.customTabs.map(ct => ct.id === tabData.id ? { ...ct, entries: [...(ct.entries || []), { id: Date.now(), ...form }] } : ct) }));
    setModal(false); setEditId(null);
  };
  const deleteEntry = () => { setData(d => ({ ...d, customTabs: d.customTabs.map(ct => ct.id === tabData.id ? { ...ct, entries: ct.entries.filter(e => e.id !== delId) } : ct) })); setDelId(null); };
  const saveRules = () => { setData(d => ({ ...d, customTabs: d.customTabs.map(ct => ct.id === tabData.id ? { ...ct, rules: newRules } : ct) })); setRulesModal(false); };
  const entries = tabData.entries || [];
  return (
    <>
      {tabData.rules && <div style={{ background: "rgba(232,160,32,0.08)", border: "1px solid rgba(232,160,32,0.2)", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "var(--muted)" }}><span style={{ color: "var(--gold)", fontWeight: 600 }}>নিয়ম: </span>{tabData.rules}</div>}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{tabData.label}</div>
          {isAdmin && <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: "5px 12px" }} onClick={() => { setNewRules(tabData.rules || ""); setRulesModal(true); }}>⚙ নিয়ম</button>
            <button className="btn btn-gold" style={{ fontSize: 12, padding: "5px 12px" }} onClick={openAdd}>+ এন্ট্রি যোগ</button>
          </div>}
        </div>
        {entries.length === 0 ? <div style={{ padding: 40, textAlign: "center", color: "var(--muted)", fontSize: 14 }}>কোনো এন্ট্রি নেই।</div> : (
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead><tr>{tabData.fields.map(f => <th key={f.key}>{f.label}</th>)}{isAdmin && <th>অ্যাকশন</th>}</tr></thead>
              <tbody>{entries.map(entry => (
                <tr key={entry.id}>
                  {tabData.fields.map(f => <td key={f.key}>{f.type === "image" ? <ImgWithFallback src={entry[f.key]} alt="" style={{ width: 50, height: 40, objectFit: "cover", borderRadius: 6 }} /> : entry[f.key]}</td>)}
                  {isAdmin && <td><div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-blue" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => openEdit(entry)}>সম্পাদনা</button>
                    <button className="btn btn-red" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => setDelId(entry.id)}>মুছুন</button>
                  </div></td>}
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
      {modal && <div className="modal-overlay"><div className="modal scrollbar-thin" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--gold)" }}>{editId ? "এন্ট্রি সম্পাদনা" : "নতুন এন্ট্রি"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tabData.fields.map(f => <div key={f.key}><label>{f.label}</label>
            {f.type === "image" ? <ImageInputWithUpload value={form[f.key] || ""} onChange={v => setForm(fm => ({ ...fm, [f.key]: v }))} previewStyle={{ width: 80, height: 60, objectFit: "cover", borderRadius: 6 }} />
              : <input type={f.type} value={form[f.key] || ""} onChange={e => setForm(fm => ({ ...fm, [f.key]: e.target.value }))} />}
          </div>)}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={() => { setModal(false); setEditId(null); }}>বাতিল</button>
          <button className="btn btn-gold" onClick={saveEntry}>সংরক্ষণ করুন</button>
        </div>
      </div></div>}
      {delId && <ConfirmDeleteModal message="এই এন্ট্রিটি মুছে দিতে চান?" onConfirm={deleteEntry} onCancel={() => setDelId(null)} />}
      {rulesModal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--gold)" }}>নিয়ম সম্পাদনা</div>
        <label>নিয়ম / নির্দেশনা</label>
        <textarea value={newRules} onChange={e => setNewRules(e.target.value)} rows={4} style={{ marginBottom: 16, resize: "none" }} />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button className="btn btn-ghost" onClick={() => setRulesModal(false)}>বাতিল</button>
          <button className="btn btn-gold" onClick={saveRules}>সংরক্ষণ করুন</button>
        </div>
      </div></div>}
    </>
  );
}

function AttendanceTab({ data, setData, isAdmin }) {
  const [rejectModal, setRejectModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [delId, setDelId] = useState(null);
  const [reason, setReason] = useState("");
  const [editForm, setEditForm] = useState({});
  const approve = (id) => setData(d => ({ ...d, attendance: d.attendance.map(a => a.id === id ? { ...a, status: "approved" } : a) }));
  const confirmReject = () => {
    if (!reason.trim()) return;
    setData(d => ({ ...d, attendance: d.attendance.map(a => a.id === rejectModal ? { ...a, status: "rejected", reason } : a) }));
    setRejectModal(null);
  };
  const saveEdit = () => { setData(d => ({ ...d, attendance: d.attendance.map(a => a.id === editModal ? { ...editForm } : a) })); setEditModal(null); };
  const confirmDelete = () => { setData(d => ({ ...d, attendance: d.attendance.filter(a => a.id !== delId) })); setDelId(null); };
  return (
    <>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>হাজিরা তালিকা</div>
          <span className="badge badge-pending">{data.attendance.filter(a => a.status === "pending").length} পেন্ডিং</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>কোড</th><th>নাম</th><th>সময়</th><th>অবস্থা</th>{isAdmin && <th>অ্যাকশন</th>}</tr></thead>
            <tbody>
              {data.attendance.length === 0 ? <tr><td colSpan={isAdmin ? 5 : 4} style={{ textAlign: "center", color: "var(--muted)", padding: 30 }}>কোনো হাজিরা নেই।</td></tr>
                : data.attendance.map(a => (
                  <tr key={a.id}>
                    <td><span style={{ fontFamily: "monospace", color: "var(--gold)", fontSize: 13 }}>{a.code}</span></td>
                    <td style={{ fontWeight: 500 }}>{a.name}</td>
                    <td style={{ color: "var(--muted)", fontSize: 13 }}>{a.time}</td>
                    <td>
                      <span className={`badge badge-${a.status}`}>{a.status === "pending" ? "পেন্ডিং" : a.status === "approved" ? "অ্যাপ্রুভড" : "রিজেক্টেড"}</span>
                      {a.status === "rejected" && a.reason && <div style={{ fontSize: 11, color: "var(--red)", marginTop: 3 }}>কারণ: {a.reason}</div>}
                    </td>
                    {isAdmin && <td><div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {a.status === "pending" && <>
                        <button className="btn btn-green" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => approve(a.id)}>অ্যাপ্রুভ</button>
                        <button className="btn btn-red" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => { setRejectModal(a.id); setReason(""); }}>রিজেক্ট</button>
                      </>}
                      <button className="btn btn-blue" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => { setEditForm({ ...a }); setEditModal(a.id); }}>সম্পাদনা</button>
                      <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 12, color: "var(--red)", borderColor: "var(--red)" }} onClick={() => setDelId(a.id)}>মুছুন</button>
                    </div></td>}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {rejectModal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--red)" }}>রিজেক্ট করুন</div>
        <label>কারণ লিখুন</label>
        <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} style={{ marginBottom: 16, resize: "none" }} placeholder="কারণ লিখুন..." />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button className="btn btn-ghost" onClick={() => setRejectModal(null)}>বাতিল</button>
          <button className="btn btn-red" onClick={confirmReject}>নিশ্চিত করুন</button>
        </div>
      </div></div>}
      {editModal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--gold)" }}>হাজিরা সম্পাদনা</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div><label>কোড</label><input value={editForm.code || ""} onChange={e => setEditForm(f => ({ ...f, code: e.target.value }))} /></div>
          <div><label>নাম</label><input value={editForm.name || ""} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} /></div>
          <div><label>সময়</label><input value={editForm.time || ""} onChange={e => setEditForm(f => ({ ...f, time: e.target.value }))} /></div>
          <div><label>অবস্থা</label>
            <select value={editForm.status || "pending"} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}>
              <option value="pending">পেন্ডিং</option><option value="approved">অ্যাপ্রুভড</option><option value="rejected">রিজেক্টেড</option>
            </select>
          </div>
          {editForm.status === "rejected" && <div><label>কারণ</label><input value={editForm.reason || ""} onChange={e => setEditForm(f => ({ ...f, reason: e.target.value }))} /></div>}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={() => setEditModal(null)}>বাতিল</button>
          <button className="btn btn-gold" onClick={saveEdit}>সংরক্ষণ করুন</button>
        </div>
      </div></div>}
      {delId && <ConfirmDeleteModal message="এই হাজিরা মুছে দিতে চান?" onConfirm={confirmDelete} onCancel={() => setDelId(null)} />}
    </>
  );
}

function StaffTab({ data, setData, isAdmin }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [delId, setDelId] = useState(null);
  const openAdd = () => { setForm({ code: "", name: "", father: "", address: "", mobile: "", idNo: "", area: "", photo: "https://i.pravatar.cc/80?img=" + Math.floor(Math.random() * 70) }); setModal("add"); };
  const openEdit = (s) => { setForm({ ...s }); setModal("edit"); };
  const saveAdd = () => { if (!form.name || !form.code) return; setData(d => ({ ...d, staff: [...d.staff, { ...form, id: Date.now() }] })); setModal(null); };
  const saveEdit = () => { setData(d => ({ ...d, staff: d.staff.map(s => s.id === form.id ? { ...form } : s) })); setModal(null); };
  const confirmDel = () => { setData(d => ({ ...d, staff: d.staff.filter(s => s.id !== delId) })); setDelId(null); };
  return (
    <>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>কর্মচারী প্রোফাইল</div>
          {isAdmin && <button className="btn btn-gold" style={{ fontSize: 13, padding: "6px 14px" }} onClick={openAdd}>+ নতুন যোগ করুন</button>}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>ছবি</th><th>কোড</th><th>নাম</th><th>পদবী</th><th>পিতা/মাতা</th><th>মোবাইল</th><th>এরিয়া</th>{isAdmin && <th>অ্যাকশন</th>}</tr></thead>
            <tbody>
              {data.staff.length === 0 ? <tr><td colSpan={isAdmin ? 7 : 6} style={{ textAlign: "center", color: "var(--muted)", padding: 30 }}>কোনো কর্মচারী নেই।</td></tr>
                : data.staff.map(s => (
                  <tr key={s.id}>
                    <td><ImgWithFallback src={s.photo} alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }} /></td>
                    <td><span style={{ fontFamily: "monospace", color: "var(--gold)", fontSize: 13 }}>{s.code}</span></td>
                    <td style={{ fontWeight: 500 }}>{s.name}</td>
                    <td><span style={{ background: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.2)", borderRadius: 6, padding: "2px 8px", fontSize: 12, color: "var(--gold)" }}>{s.designation || "—"}</span></td>
                    <td style={{ color: "var(--muted)", fontSize: 13 }}>{s.father}</td>
                    <td style={{ fontSize: 13 }}>{s.mobile}</td>
                    <td><span style={{ background: "var(--navy3)", borderRadius: 6, padding: "2px 8px", fontSize: 12, color: "var(--muted)" }}>{s.area}</span></td>
                    {isAdmin && <td><div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-blue" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => openEdit(s)}>সম্পাদনা</button>
                      <button className="btn btn-red" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => setDelId(s.id)}>মুছুন</button>
                    </div></td>}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {(modal === "add" || modal === "edit") && <div className="modal-overlay"><div className="modal scrollbar-thin" style={{ maxWidth: 540, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--gold)" }}>{modal === "add" ? "নতুন কর্মচারী" : "কর্মচারী সম্পাদনা"}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[["code", "কোড"], ["name", "নাম"], ["designation", "পদবী"], ["father", "পিতা/মাতা"], ["address", "ঠিকানা"], ["mobile", "মোবাইল"], ["idNo", "আইডি নম্বর"], ["area", "এরিয়া"]].map(([k, l]) => (
            <div key={k} style={{ gridColumn: ["address", "father"].includes(k) ? "span 2" : "span 1" }}>
              <label>{l}</label><input value={form[k] || ""} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
            </div>
          ))}
          <div style={{ gridColumn: "span 2" }}><label>ছবি</label>
            <ImageInputWithUpload value={form.photo || ""} onChange={v => setForm(f => ({ ...f, photo: v }))} previewStyle={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={() => setModal(null)}>বাতিল</button>
          <button className="btn btn-gold" onClick={modal === "add" ? saveAdd : saveEdit}>সংরক্ষণ করুন</button>
        </div>
      </div></div>}
      {delId && <ConfirmDeleteModal message="এই কর্মচারীকে মুছে দিতে চান?" onConfirm={confirmDel} onCancel={() => setDelId(null)} />}
    </>
  );
}

function AccountingTab({ data, setData, isAdmin }) {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [delId, setDelId] = useState(null);
  const [ruleModal, setRuleModal] = useState(false);
  const [ruleForm, setRuleForm] = useState({ name: "", formula: "" });
  const [form, setForm] = useState({ date: new Date().toISOString().split("T")[0], todayBalance: "", totalSales: "", returns: "", totalBalance: "" });
  const [editForm, setEditForm] = useState({});
  const rules = data.accountingRules || [];
  const autoCalc = (f) => (parseFloat(f.todayBalance || 0) + parseFloat(f.totalSales || 0) - parseFloat(f.returns || 0)).toFixed(0);
  const save = () => {
    const entry = { ...form, id: Date.now(), todayBalance: +form.todayBalance, totalSales: +form.totalSales, returns: +form.returns, totalBalance: form.totalBalance !== "" ? +form.totalBalance : +autoCalc(form) };
    setData(d => ({ ...d, accounting: [entry, ...d.accounting] }));
    setModal(false);
    setForm({ date: new Date().toISOString().split("T")[0], todayBalance: "", totalSales: "", returns: "", totalBalance: "" });
  };
  const saveEdit = () => {
    const updated = { ...editForm, todayBalance: +editForm.todayBalance, totalSales: +editForm.totalSales, returns: +editForm.returns, totalBalance: editForm.totalBalance !== "" ? +editForm.totalBalance : +autoCalc(editForm) };
    setData(d => ({ ...d, accounting: d.accounting.map(a => a.id === editModal ? updated : a) }));
    setEditModal(null);
  };
  const confirmDelete = () => { setData(d => ({ ...d, accounting: d.accounting.filter(a => a.id !== delId) })); setDelId(null); };
  const addRule = () => {
    if (!ruleForm.name.trim() || !ruleForm.formula.trim()) return;
    setData(d => ({ ...d, accountingRules: [...(d.accountingRules || []), { id: Date.now(), ...ruleForm }] }));
    setRuleForm({ name: "", formula: "" }); setRuleModal(false);
  };
  const deleteRule = (rid) => setData(d => ({ ...d, accountingRules: d.accountingRules.filter(r => r.id !== rid) }));
  return (
    <>
      {rules.length > 0 && <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {rules.map(r => <div key={r.id} style={{ background: "rgba(42,125,225,0.1)", border: "1px solid rgba(42,125,225,0.25)", borderRadius: 8, padding: "6px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--blue)", fontWeight: 600 }}>{r.name}:</span>
          <span style={{ color: "var(--muted)", fontFamily: "monospace" }}>{r.formula}</span>
          {isAdmin && <button onClick={() => deleteRule(r.id)} style={{ background: "none", border: "none", color: "var(--red)", cursor: "pointer", fontSize: 12 }}>✕</button>}
        </div>)}
      </div>}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>দৈনিক হিসাব</div>
          {isAdmin && <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: "5px 12px" }} onClick={() => setRuleModal(true)}>+ ফর্মুলা</button>
            <button className="btn btn-gold" style={{ fontSize: 13, padding: "6px 14px" }} onClick={() => setModal(true)}>+ হিসাব যোগ</button>
          </div>}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>তারিখ</th><th>আজকের ব্যালেন্স</th><th>মোট সেলস</th><th>রিটার্ন</th><th>মোট ব্যালেন্স</th>
              {rules.map(r => <th key={r.id} style={{ color: "var(--blue)" }}>{r.name}</th>)}{isAdmin && <th>অ্যাকশন</th>}</tr></thead>
            <tbody>
              {data.accounting.length === 0 ? <tr><td colSpan={5 + rules.length + (isAdmin ? 1 : 0)} style={{ textAlign: "center", color: "var(--muted)", padding: 30 }}>কোনো হিসাব নেই।</td></tr>
                : data.accounting.map(a => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 500 }}>{a.date}</td>
                    <td style={{ color: "var(--blue)" }}>৳ {a.todayBalance.toLocaleString()}</td>
                    <td style={{ color: "var(--green)" }}>৳ {a.totalSales.toLocaleString()}</td>
                    <td style={{ color: "var(--red)" }}>৳ {a.returns.toLocaleString()}</td>
                    <td style={{ color: "var(--gold)", fontWeight: 700 }}>৳ {a.totalBalance.toLocaleString()}</td>
                    {rules.map(r => { const val = evalFormula(r.formula, a); return <td key={r.id} style={{ color: "var(--blue)", fontFamily: "monospace" }}>{typeof val === "number" ? `৳ ${val.toLocaleString()}` : val}</td>; })}
                    {isAdmin && <td><div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-blue" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => { setEditForm({ ...a, todayBalance: String(a.todayBalance), totalSales: String(a.totalSales), returns: String(a.returns), totalBalance: String(a.totalBalance) }); setEditModal(a.id); }}>সম্পাদনা</button>
                      <button className="btn btn-red" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => setDelId(a.id)}>মুছুন</button>
                    </div></td>}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--gold)" }}>নতুন হিসাব যোগ করুন</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[["date", "তারিখ", "date"], ["todayBalance", "আজকের ব্যালেন্স", "number"], ["totalSales", "মোট সেলস", "number"], ["returns", "রিটার্ন", "number"]].map(([k, l, t]) => (
            <div key={k}><label>{l}</label><input type={t} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} /></div>
          ))}
          <div><label>মোট ব্যালেন্স <span style={{ color: "var(--muted)", fontSize: 11 }}>(খালি রাখলে অটো: {parseFloat(autoCalc(form)).toLocaleString()})</span></label>
            <input type="number" value={form.totalBalance} onChange={e => setForm(f => ({ ...f, totalBalance: e.target.value }))} placeholder={`অটো: ৳ ${parseFloat(autoCalc(form)).toLocaleString()}`} /></div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={() => setModal(false)}>বাতিল</button>
          <button className="btn btn-gold" onClick={save}>সংরক্ষণ করুন</button>
        </div>
      </div></div>}
      {editModal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--gold)" }}>হিসাব সম্পাদনা</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[["date", "তারিখ", "date"], ["todayBalance", "আজকের ব্যালেন্স", "number"], ["totalSales", "মোট সেলস", "number"], ["returns", "রিটার্ন", "number"], ["totalBalance", "মোট ব্যালেন্স", "number"]].map(([k, l, t]) => (
            <div key={k}><label>{l}</label><input type={t} value={editForm[k] || ""} onChange={e => setEditForm(f => ({ ...f, [k]: e.target.value }))} /></div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={() => setEditModal(null)}>বাতিল</button>
          <button className="btn btn-gold" onClick={saveEdit}>আপডেট করুন</button>
        </div>
      </div></div>}
      {delId && <ConfirmDeleteModal message="এই হিসাব মুছে দিতে চান?" onConfirm={confirmDelete} onCancel={() => setDelId(null)} />}
      {ruleModal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: "var(--gold)" }}>নতুন ফর্মুলা</div>
        <div style={{ background: "var(--navy3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
          ভেরিয়েবল: <span style={{ color: "var(--blue)", fontFamily: "monospace" }}>todayBalance · totalSales · returns · totalBalance</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div><label>ফর্মুলার নাম</label><input value={ruleForm.name} onChange={e => setRuleForm(f => ({ ...f, name: e.target.value }))} placeholder="যেমন: নিট মুনাফা" /></div>
          <div><label>ফর্মুলা</label><input value={ruleForm.formula} onChange={e => setRuleForm(f => ({ ...f, formula: e.target.value }))} placeholder="যেমন: totalSales - returns" style={{ fontFamily: "monospace" }} /></div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={() => setRuleModal(false)}>বাতিল</button>
          <button className="btn btn-gold" onClick={addRule}>যোগ করুন</button>
        </div>
      </div></div>}
    </>
  );
}

function ContentTab({ data, setData, isAdmin }) {
  const [noticeModal, setNoticeModal] = useState(false);
  const [editNoticeModal, setEditNoticeModal] = useState(null);
  const [eventModal, setEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState(null);
  const [offerModal, setOfferModal] = useState(false);
  const [editOfferModal, setEditOfferModal] = useState(null);
  const [distModal, setDistModal] = useState(false);
  const [delModal, setDelModal] = useState(null);
  const [nForm, setNForm] = useState({ text: "", date: "" });
  const [eForm, setEForm] = useState({ name: "", caption: "", img: "" });
  const [oForm, setOForm] = useState({ title: "", desc: "", img: "" });
  const [dForm, setDForm] = useState({});
  const openDistModal = () => { setDForm({ ...data.distributionInfo, logo: data.owner?.logo || "", ownerName: data.owner?.name || "", ownerAddress: data.owner?.address || "", ownerPhoto: data.owner?.photo || "", dmName: data.distributionManager?.name || "", dmMobile: data.distributionManager?.mobile || "", dmAddress: data.distributionManager?.address || "", dmPhoto: data.distributionManager?.photo || "", amName: data.areaManager?.name || "", amMobile: data.areaManager?.mobile || "", amAddress: data.areaManager?.address || "", amPhoto: data.areaManager?.photo || "", showAM: data.showAreaManager !== false }); setDistModal(true); };
  const saveDist = () => { const { logo, ownerName, ownerAddress, ownerPhoto, dmName, dmMobile, dmAddress, dmPhoto, amName, amMobile, amAddress, amPhoto, showAM, ...distInfo } = dForm; setData(d => ({ ...d, distributionInfo: { ...distInfo }, owner: { ...d.owner, logo: logo || d.owner.logo, name: ownerName || d.owner.name, address: ownerAddress || d.owner.address, photo: ownerPhoto || d.owner.photo }, distributionManager: { name: dmName, mobile: dmMobile, address: dmAddress, photo: dmPhoto }, areaManager: { name: amName, mobile: amMobile, address: amAddress, photo: amPhoto }, showAreaManager: showAM })); setDistModal(false); };
  const openEditNotice = (n) => { setNForm({ text: n.text, date: n.date }); setEditNoticeModal(n.id); };
  const saveEditNotice = () => { setData(d => ({ ...d, notices: d.notices.map(n => n.id === editNoticeModal ? { ...n, text: nForm.text, date: nForm.date || n.date } : n) })); setEditNoticeModal(null); setNForm({ text: "", date: "" }); };
  const openEditEvent = (e) => { setEForm({ name: e.name, caption: e.caption, img: e.img }); setEditEventModal(e.id); };
  const saveEditEvent = () => { setData(d => ({ ...d, events: d.events.map(e => e.id === editEventModal ? { ...e, ...eForm } : e) })); setEditEventModal(null); setEForm({ name: "", caption: "", img: "" }); };
  const openEditOffer = (o) => { setOForm({ title: o.title, desc: o.desc, img: o.img }); setEditOfferModal(o.id); };
  const saveEditOffer = () => { setData(d => ({ ...d, offers: d.offers.map(o => o.id === editOfferModal ? { ...o, ...oForm } : o) })); setEditOfferModal(null); setOForm({ title: "", desc: "", img: "" }); };
  const confirmDel = () => {
    if (!delModal) return;
    const { type, id } = delModal;
    if (type === "notice") setData(d => ({ ...d, notices: d.notices.filter(x => x.id !== id) }));
    if (type === "event") setData(d => ({ ...d, events: d.events.filter(x => x.id !== id) }));
    if (type === "offer") setData(d => ({ ...d, offers: d.offers.filter(x => x.id !== id) }));
    setDelModal(null);
  };
  const info = data.distributionInfo || {};
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700 }}>ডিস্ট্রিবিউশন তথ্য</div>
          {isAdmin && <button className="btn btn-gold" style={{ fontSize: 12, padding: "5px 12px" }} onClick={openDistModal}>সম্পাদনা করুন</button>}
        </div>
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--navy3)", borderRadius: 8, padding: "10px 14px" }}>
            <ImgWithFallback src={data.owner?.photo} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)", flexShrink: 0 }} />
            <div><div style={{ fontSize: 11, color: "var(--muted)" }}>মালিক</div><div style={{ fontSize: 14, fontWeight: 600, color: "var(--gold)" }}>{data.owner?.name}</div><div style={{ fontSize: 12, color: "var(--muted)" }}>{data.owner?.address}</div></div>
          </div>
          {[["📦", "পণ্য", info.products], ["🗺️", "কভারেজ", info.coverage], ["📞", "হেল্পলাইন", info.helpline]].map(([icon, label, val]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--navy3)", borderRadius: 8, padding: "10px 14px" }}>
              <span style={{ fontSize: 18 }}>{icon}</span><div><div style={{ fontSize: 11, color: "var(--muted)" }}>{label}</div><div style={{ fontSize: 13 }}>{val}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700 }}>নোটিশ <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 400 }}>({data.notices.length}টি)</span></div>
          {isAdmin && <button className="btn btn-gold" style={{ fontSize: 12, padding: "5px 12px" }} onClick={() => { setNForm({ text: "", date: "" }); setNoticeModal(true); }}>+ নোটিশ যোগ</button>}
        </div>
        <div style={{ padding: "0 20px" }}>
          {data.notices.length === 0 ? <div style={{ padding: 24, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>কোনো নোটিশ নেই।</div>
            : data.notices.map((n, i) => (
              <div key={n.id} style={{ padding: "12px 0", borderBottom: i < data.notices.length - 1 ? "1px solid var(--border)" : "none", display: "flex", justifyContent: "space-between", alignItems: "start", gap: 10 }}>
                <div style={{ flex: 1 }}><div style={{ fontSize: 14 }}>{n.text}</div><div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{n.date}</div></div>
                {isAdmin && <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button className="btn btn-blue" style={{ padding: "3px 9px", fontSize: 11 }} onClick={() => openEditNotice(n)}>সম্পাদনা</button>
                  <button className="btn btn-red" style={{ padding: "3px 9px", fontSize: 11 }} onClick={() => setDelModal({ type: "notice", id: n.id })}>মুছুন</button>
                </div>}
              </div>
            ))}
        </div>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700 }}>ইভেন্ট <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 400 }}>({data.events.length}টি)</span></div>
          {isAdmin && <button className="btn btn-gold" style={{ fontSize: 12, padding: "5px 12px" }} onClick={() => { setEForm({ name: "", caption: "", img: "" }); setEventModal(true); }}>+ ইভেন্ট যোগ</button>}
        </div>
        <div style={{ padding: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {data.events.length === 0 && <div style={{ color: "var(--muted)", fontSize: 13 }}>কোনো ইভেন্ট নেই।</div>}
          {data.events.map(e => (
            <div key={e.id} className="card" style={{ width: 220, overflow: "hidden", border: "1px solid var(--border)" }}>
              <ImgWithFallback src={e.img} alt="" style={{ width: "100%", height: 120, objectFit: "cover" }} />
              <div style={{ padding: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "var(--gold)" }}>{e.name}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{e.caption}</div>
                {isAdmin && <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <button className="btn btn-blue" style={{ fontSize: 11, padding: "3px 8px" }} onClick={() => openEditEvent(e)}>সম্পাদনা</button>
                  <button className="btn btn-red" style={{ fontSize: 11, padding: "3px 8px" }} onClick={() => setDelModal({ type: "event", id: e.id })}>মুছুন</button>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700 }}>প্রোডাক্ট অফার <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 400 }}>({data.offers.length}টি)</span></div>
          {isAdmin && <button className="btn btn-gold" style={{ fontSize: 12, padding: "5px 12px" }} onClick={() => { setOForm({ title: "", desc: "", img: "" }); setOfferModal(true); }}>+ অফার যোগ</button>}
        </div>
        <div style={{ padding: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {data.offers.length === 0 && <div style={{ color: "var(--muted)", fontSize: 13 }}>কোনো অফার নেই।</div>}
          {data.offers.map(o => (
            <div key={o.id} className="card" style={{ width: 220, overflow: "hidden" }}>
              <ImgWithFallback src={o.img} alt="" style={{ width: "100%", height: 100, objectFit: "cover" }} />
              <div style={{ padding: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "var(--gold)" }}>{o.title}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{o.desc}</div>
                {isAdmin && <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <button className="btn btn-blue" style={{ fontSize: 11, padding: "3px 8px" }} onClick={() => openEditOffer(o)}>সম্পাদনা</button>
                  <button className="btn btn-red" style={{ fontSize: 11, padding: "3px 8px" }} onClick={() => setDelModal({ type: "offer", id: o.id })}>মুছুন</button>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {distModal && <div className="modal-overlay"><div className="modal scrollbar-thin" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--gold)" }}>ডিস্ট্রিবিউশন তথ্য সম্পাদনা</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "var(--navy3)", borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>👤 মালিকের তথ্য</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div><label>মালিকের নাম</label><input value={dForm.ownerName || ""} onChange={e => setDForm(f => ({ ...f, ownerName: e.target.value }))} /></div>
              <div><label>ঠিকানা</label><input value={dForm.ownerAddress || ""} onChange={e => setDForm(f => ({ ...f, ownerAddress: e.target.value }))} /></div>
              <div><label>মালিকের ছবি</label><ImageInputWithUpload value={dForm.ownerPhoto || ""} onChange={v => setDForm(f => ({ ...f, ownerPhoto: v }))} previewStyle={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)" }} /></div>
            </div>
          </div>
          <div><label>🏷️ কোম্পানি লোগো</label><ImageInputWithUpload value={dForm.logo || ""} onChange={v => setDForm(f => ({ ...f, logo: v }))} previewStyle={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)" }} /></div>
          <div><label>📦 পণ্য</label><input value={dForm.products || ""} onChange={e => setDForm(f => ({ ...f, products: e.target.value }))} /></div>
          <div><label>🗺️ কভারেজ এরিয়া</label><input value={dForm.coverage || ""} onChange={e => setDForm(f => ({ ...f, coverage: e.target.value }))} /></div>
          <div><label>📞 হেল্পলাইন</label><input value={dForm.helpline || ""} onChange={e => setDForm(f => ({ ...f, helpline: e.target.value }))} /></div>
          <div style={{ background: "var(--navy3)", borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: "var(--blue)", fontWeight: 700 }}>🗺️ এরিয়া ম্যানেজার</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>পাবলিকে দেখাবে?</span>
                <div onClick={() => setDForm(f => ({ ...f, showAM: !f.showAM }))} style={{ width: 40, height: 22, borderRadius: 11, background: dForm.showAM ? "var(--green)" : "var(--border)", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 3, left: dForm.showAM ? 20 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div><label>নাম</label><input value={dForm.amName || ""} onChange={e => setDForm(f => ({ ...f, amName: e.target.value }))} /></div>
              <div><label>মোবাইল</label><input value={dForm.amMobile || ""} onChange={e => setDForm(f => ({ ...f, amMobile: e.target.value }))} /></div>
              <div><label>ঠিকানা</label><input value={dForm.amAddress || ""} onChange={e => setDForm(f => ({ ...f, amAddress: e.target.value }))} /></div>
              <div><label>ছবি</label><ImageInputWithUpload value={dForm.amPhoto || ""} onChange={v => setDForm(f => ({ ...f, amPhoto: v }))} previewStyle={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--blue)" }} /></div>
            </div>
          </div>
          <div style={{ background: "var(--navy3)", borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>🏢 ডিস্ট্রিবিউশন ম্যানেজার</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div><label>নাম</label><input value={dForm.dmName || ""} onChange={e => setDForm(f => ({ ...f, dmName: e.target.value }))} /></div>
              <div><label>মোবাইল</label><input value={dForm.dmMobile || ""} onChange={e => setDForm(f => ({ ...f, dmMobile: e.target.value }))} /></div>
              <div><label>ঠিকানা</label><input value={dForm.dmAddress || ""} onChange={e => setDForm(f => ({ ...f, dmAddress: e.target.value }))} /></div>
              <div><label>ছবি</label><ImageInputWithUpload value={dForm.dmPhoto || ""} onChange={v => setDForm(f => ({ ...f, dmPhoto: v }))} previewStyle={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)" }} /></div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={() => setDistModal(false)}>বাতিল</button>
          <button className="btn btn-gold" onClick={saveDist}>সংরক্ষণ করুন</button>
        </div>
      </div></div>}
      {noticeModal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--gold)" }}>নতুন নোটিশ</div>
        <div><label>নোটিশ লিখুন</label><textarea value={nForm.text} onChange={e => setNForm(f => ({ ...f, text: e.target.value }))} rows={3} style={{ resize: "none", marginBottom: 16 }} /></div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button className="btn btn-ghost" onClick={() => setNoticeModal(false)}>বাতিল</button>
          <button className="btn btn-gold" onClick={() => { if (!nForm.text.trim()) return; setData(d => ({ ...d, notices: [{ id: Date.now(), text: nForm.text, date: new Date().toISOString().split("T")[0] }, ...d.notices] })); setNoticeModal(false); setNForm({ text: "", date: "" }); }}>প্রকাশ করুন</button>
        </div>
      </div></div>}
      {editNoticeModal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--gold)" }}>নোটিশ সম্পাদনা</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          <div><label>নোটিশ</label><textarea value={nForm.text} onChange={e => setNForm(f => ({ ...f, text: e.target.value }))} rows={3} style={{ resize: "none" }} /></div>
          <div><label>তারিখ</label><input type="date" value={nForm.date || ""} onChange={e => setNForm(f => ({ ...f, date: e.target.value }))} /></div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button className="btn btn-ghost" onClick={() => setEditNoticeModal(null)}>বাতিল</button>
          <button className="btn btn-gold" onClick={saveEditNotice}>সংরক্ষণ করুন</button>
        </div>
      </div></div>}
      {eventModal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--gold)" }}>নতুন ইভেন্ট</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div><label>ইভেন্টের নাম</label><input value={eForm.name} onChange={e => setEForm(f => ({ ...f, name: e.target.value }))} /></div>
          <div><label>ক্যাপশন</label><input value={eForm.caption} onChange={e => setEForm(f => ({ ...f, caption: e.target.value }))} /></div>
          <div><label>ছবি</label><ImageInputWithUpload value={eForm.img} onChange={v => setEForm(f => ({ ...f, img: v }))} previewStyle={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} /></div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <button className="btn btn-ghost" onClick={() => setEventModal(false)}>বাতিল</button>
          <button className="btn btn-gold" onClick={() => { if (!eForm.name) return; setData(d => ({ ...d, events: [...d.events, { id: Date.now(), ...eForm }] })); setEventModal(false); setEForm({ name: "", caption: "", img: "" }); }}>প্রকাশ করুন</button>
        </div>
      </div></div>}
      {editEventModal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--gold)" }}>ইভেন্ট সম্পাদনা</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div><label>ইভেন্টের নাম</label><input value={eForm.name} onChange={e => setEForm(f => ({ ...f, name: e.target.value }))} /></div>
          <div><label>ক্যাপশন</label><input value={eForm.caption} onChange={e => setEForm(f => ({ ...f, caption: e.target.value }))} /></div>
          <div><label>ছবি</label><ImageInputWithUpload value={eForm.img} onChange={v => setEForm(f => ({ ...f, img: v }))} previewStyle={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} /></div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <button className="btn btn-ghost" onClick={() => setEditEventModal(null)}>বাতিল</button>
          <button className="btn btn-gold" onClick={saveEditEvent}>সংরক্ষণ করুন</button>
        </div>
      </div></div>}
      {offerModal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--gold)" }}>নতুন অফার</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div><label>শিরোনাম</label><input value={oForm.title} onChange={e => setOForm(f => ({ ...f, title: e.target.value }))} /></div>
          <div><label>বিবরণ</label><input value={oForm.desc} onChange={e => setOForm(f => ({ ...f, desc: e.target.value }))} /></div>
          <div><label>ছবি</label><ImageInputWithUpload value={oForm.img} onChange={v => setOForm(f => ({ ...f, img: v }))} previewStyle={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 8 }} /></div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <button className="btn btn-ghost" onClick={() => setOfferModal(false)}>বাতিল</button>
          <button className="btn btn-gold" onClick={() => { if (!oForm.title) return; setData(d => ({ ...d, offers: [...d.offers, { id: Date.now(), ...oForm }] })); setOfferModal(false); setOForm({ title: "", desc: "", img: "" }); }}>প্রকাশ করুন</button>
        </div>
      </div></div>}
      {editOfferModal && <div className="modal-overlay"><div className="modal">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--gold)" }}>অফার সম্পাদনা</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div><label>শিরোনাম</label><input value={oForm.title} onChange={e => setOForm(f => ({ ...f, title: e.target.value }))} /></div>
          <div><label>বিবরণ</label><input value={oForm.desc} onChange={e => setOForm(f => ({ ...f, desc: e.target.value }))} /></div>
          <div><label>ছবি</label><ImageInputWithUpload value={oForm.img} onChange={v => setOForm(f => ({ ...f, img: v }))} previewStyle={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 8 }} /></div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <button className="btn btn-ghost" onClick={() => setEditOfferModal(null)}>বাতিল</button>
          <button className="btn btn-gold" onClick={saveEditOffer}>সংরক্ষণ করুন</button>
        </div>
      </div></div>}
      {delModal && <ConfirmDeleteModal message="এই আইটেমটি মুছে দিতে চান?" onConfirm={confirmDel} onCancel={() => setDelModal(null)} />}
    </div>
  );
}

function PasswordChangeModal({ onClose, users, setUsers }) {
  const [form, setForm] = useState({ adminOld: "", adminNew: "", adminConfirm: "", roOld: "", roNew: "", roConfirm: "" });
  const [msg, setMsg] = useState({ admin: "", ro: "" });
  const [err, setErr] = useState({ admin: "", ro: "" });
  const changeAdmin = () => {
    if (!form.adminOld || !form.adminNew || !form.adminConfirm) { setErr(e => ({ ...e, admin: "সব ঘর পূরণ করুন।" })); return; }
    if (form.adminOld !== users.admin) { setErr(e => ({ ...e, admin: "পুরনো পাসওয়ার্ড ভুল।" })); return; }
    if (form.adminNew.length < 6) { setErr(e => ({ ...e, admin: "কমপক্ষে ৬ অক্ষর লাগবে।" })); return; }
    if (form.adminNew !== form.adminConfirm) { setErr(e => ({ ...e, admin: "পাসওয়ার্ড মিলছে না।" })); return; }
    setUsers(u => ({ ...u, admin: form.adminNew }));
    setMsg(m => ({ ...m, admin: "✅ পরিবর্তন হয়েছে!" }));
    setErr(e => ({ ...e, admin: "" }));
    setForm(f => ({ ...f, adminOld: "", adminNew: "", adminConfirm: "" }));
  };
  const changeRo = () => {
    if (!form.roOld || !form.roNew || !form.roConfirm) { setErr(e => ({ ...e, ro: "সব ঘর পূরণ করুন।" })); return; }
    if (form.roOld !== users.readonly) { setErr(e => ({ ...e, ro: "পুরনো পাসওয়ার্ড ভুল।" })); return; }
    if (form.roNew.length < 6) { setErr(e => ({ ...e, ro: "কমপক্ষে ৬ অক্ষর লাগবে।" })); return; }
    if (form.roNew !== form.roConfirm) { setErr(e => ({ ...e, ro: "পাসওয়ার্ড মিলছে না।" })); return; }
    setUsers(u => ({ ...u, readonly: form.roNew }));
    setMsg(m => ({ ...m, ro: "✅ পরিবর্তন হয়েছে!" }));
    setErr(e => ({ ...e, ro: "" }));
    setForm(f => ({ ...f, roOld: "", roNew: "", roConfirm: "" }));
  };
  return (
    <div className="modal-overlay">
      <div className="modal scrollbar-thin" style={{ maxWidth: 500, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--gold)" }}>🔑 পাসওয়ার্ড পরিবর্তন</div>
        {[["admin", "অ্যাডমিন পাসওয়ার্ড", "var(--gold)", changeAdmin, "adminOld", "adminNew", "adminConfirm", "btn-gold"],
          ["ro", "রিড-অনলি পাসওয়ার্ড", "var(--blue)", changeRo, "roOld", "roNew", "roConfirm", "btn-blue"]
        ].map(([key, title, color, fn, oldK, newK, confirmK, btnClass]) => (
          <div key={key} style={{ background: "var(--navy3)", borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color, marginBottom: 12 }}>{title}</div>
            {err[key] && <div style={{ background: "rgba(232,64,64,0.1)", border: "1px solid var(--red)", borderRadius: 8, padding: "8px 12px", color: "var(--red)", fontSize: 12, marginBottom: 10 }}>{err[key]}</div>}
            {msg[key] && <div style={{ background: "rgba(40,167,69,0.1)", border: "1px solid var(--green)", borderRadius: 8, padding: "8px 12px", color: "var(--green)", fontSize: 12, marginBottom: 10 }}>{msg[key]}</div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div><label>পুরনো পাসওয়ার্ড</label><input type="password" value={form[oldK]} onChange={e => { setForm(f => ({ ...f, [oldK]: e.target.value })); setErr(er => ({ ...er, [key]: "" })); setMsg(m => ({ ...m, [key]: "" })); }} /></div>
              <div><label>নতুন পাসওয়ার্ড</label><input type="password" value={form[newK]} onChange={e => { setForm(f => ({ ...f, [newK]: e.target.value })); setErr(er => ({ ...er, [key]: "" })); }} /></div>
              <div><label>নিশ্চিত করুন</label><input type="password" value={form[confirmK]} onChange={e => { setForm(f => ({ ...f, [confirmK]: e.target.value })); setErr(er => ({ ...er, [key]: "" })); }} /></div>
              <button className={`btn ${btnClass}`} style={{ fontSize: 13, padding: "8px" }} onClick={fn}>পরিবর্তন করুন</button>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}><button className="btn btn-ghost" onClick={onClose}>বন্ধ করুন</button></div>
      </div>
    </div>
  );
}

function LoginModal({ onClose, onLogin, users }) {
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const submit = () => {
    if ((user === "admin" && pass === users.admin) || (user === "readonly" && pass === users.readonly)) {
      onLogin(user === "admin" ? "admin" : "readonly");
    } else { setErr("ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।"); }
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 52, height: 52, background: "var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 22 }}>🔐</div>
          <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 22, color: "var(--gold)" }}>লগইন</div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 3 }}>রহিম এন্টারপ্রাইজ পোর্টাল</div>
        </div>
        {err && <div style={{ background: "rgba(232,64,64,0.1)", border: "1px solid var(--red)", borderRadius: 8, padding: "9px 14px", color: "var(--red)", fontSize: 13, marginBottom: 14 }}>{err}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label>ব্যবহারকারীর ধরন</label>
            <select value={user} onChange={e => setUser(e.target.value)}>
              <option value="admin">অ্যাডমিন</option>
              <option value="readonly">রিড-অনলি ইউজার</option>
            </select>
          </div>
          <div><label>পাসওয়ার্ড</label>
            <input type="password" value={pass} onChange={e => { setPass(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && submit()} placeholder="পাসওয়ার্ড দিন" /></div>
          <button className="btn btn-gold" style={{ width: "100%", padding: 12, fontSize: 15 }} onClick={submit}>লগইন করুন</button>
          <button className="btn btn-ghost" style={{ width: "100%", padding: 10 }} onClick={onClose}>বাতিল</button>
        </div>
      </div>
    </div>
  );
}


// ===================== PRODUCTS PAGE (Public) =====================
function ProductsPage({ data, onOrder }) {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", mobile: "", address: "", qty: 1, promo: "" });
  const [promoMsg, setPromoMsg] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

  const applyPromo = () => {
    const code = (data.promoCodes || []).find(p => p.code === form.promo.trim().toUpperCase() && p.active);
    if (!code) { setPromoMsg("❌ অকার্যকর প্রোমো কোড"); setPromoDiscount(0); return; }
    const disc = code.type === "percent" ? Math.round(selected.price * form.qty * code.discount / 100) : code.discount;
    setPromoDiscount(disc);
    setPromoMsg(`✅ ${code.discount}${code.type === "percent" ? "%" : " টাকা"} ছাড় প্রযোজ্য!`);
  };

  const totalPrice = selected ? Math.max(0, selected.price * form.qty - promoDiscount) : 0;

  const submitOrder = () => {
    if (!form.name.trim() || !form.mobile.trim() || !form.address.trim()) { setErr("নাম, মোবাইল ও ঠিকানা দিতে হবে।"); return; }
    if (form.qty > selected.stock) { setErr(`স্টকে মাত্র ${selected.stock}টি আছে। এর বেশি অর্ডার দেওয়া যাবে না।`); return; }
    onOrder({ id: Date.now(), productId: selected.id, productName: selected.name, ...form, originalPrice: selected.price * form.qty, discount: promoDiscount, totalPrice, status: "pending", assignedStaff: null, tracking: [{status: "অর্ডার গৃহীত", time: new Date().toLocaleString("bn-BD")}], time: new Date().toLocaleString("bn-BD") });
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ maxWidth: 500, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
      <div className="card" style={{ padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 22, color: "var(--green)", marginBottom: 8 }}>অর্ডার সফলভাবে দেওয়া হয়েছে!</div>
        <div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20 }}>অ্যাডমিন শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</div>
        <button className="btn btn-gold" onClick={() => { setSubmitted(false); setSelected(null); setForm({ name: "", mobile: "", address: "", qty: 1, promo: "" }); setPromoDiscount(0); setPromoMsg(""); }}>আরেকটি অর্ডার দিন</button>
      </div>
    </div>
  );

  if (selected) return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: "0 20px" }}>
      <button className="btn btn-ghost" style={{ marginBottom: 16, fontSize: 13 }} onClick={() => { setSelected(null); setPromoDiscount(0); setPromoMsg(""); setErr(""); }}>← ফিরে যান</button>
      <div className="card" style={{ padding: 28 }}>
        <ImgWithFallback src={selected.img} alt={selected.name} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8, marginBottom: 16 }} />
        <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 22, color: "var(--gold)", marginBottom: 4 }}>{selected.name}</div>
        <div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 12 }}>{selected.desc}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--green)", marginBottom: 20 }}>মূল্য: ৳{selected.price}</div>
        {err && <div style={{ background: "rgba(232,64,64,0.1)", border: "1px solid var(--red)", borderRadius: 8, padding: "10px 14px", color: "var(--red)", fontSize: 13, marginBottom: 16 }}>{err}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label>আপনার নাম *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="নাম লিখুন" /></div>
          <div><label>মোবাইল নম্বর *</label><input value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))} placeholder="01XXXXXXXXX" /></div>
          <div><label>ঠিকানা *</label><input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="ডেলিভারি ঠিকানা" /></div>
          <div><label>পরিমাণ</label><input type="number" min="1" max={selected.stock} value={form.qty} onChange={e => setForm(f => ({ ...f, qty: Math.max(1, parseInt(e.target.value)||1) }))} />{form.qty > selected.stock && <div style={{ fontSize: 12, color: "var(--red)", marginTop: 4 }}>⚠️ স্টকে মাত্র {selected.stock}টি আছে!</div>}</div>
          <div>
            <label>প্রোমো কোড (ঐচ্ছিক)</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={form.promo} onChange={e => setForm(f => ({ ...f, promo: e.target.value }))} placeholder="PROMO CODE" style={{ flex: 1 }} />
              <button className="btn btn-ghost" style={{ padding: "0 14px", fontSize: 13 }} onClick={applyPromo}>প্রয়োগ</button>
            </div>
            {promoMsg && <div style={{ fontSize: 12, marginTop: 4, color: promoDiscount > 0 ? "var(--green)" : "var(--red)" }}>{promoMsg}</div>}
          </div>
          <div style={{ background: "var(--navy3)", borderRadius: 8, padding: "12px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted)", marginBottom: 4 }}><span>মূল মূল্য</span><span>৳{selected.price * form.qty}</span></div>
            {promoDiscount > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--green)", marginBottom: 4 }}><span>ছাড়</span><span>-৳{promoDiscount}</span></div>}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: "var(--gold)", borderTop: "1px solid var(--border)", paddingTop: 8 }}><span>মোট</span><span>৳{totalPrice}</span></div>
          </div>
          <button className="btn btn-gold" style={{ width: "100%", padding: 14, fontSize: 16 }} onClick={submitOrder}>অর্ডার নিশ্চিত করুন</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
      <div className="section-title" style={{ marginBottom: 24 }}>পণ্য তালিকা</div>
      {(!data.products || data.products.length === 0) && <div style={{ color: "var(--muted)", textAlign: "center", padding: 40 }}>কোনো পণ্য নেই।</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
        {(data.products || []).map(p => (
          <div key={p.id} className="card animate-in" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => { setSelected(p); setErr(""); }}>
            <ImgWithFallback src={p.img} alt={p.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--gold)", marginBottom: 6 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10 }}>{p.desc}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--green)" }}>৳{p.price}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>স্টক: {p.stock}</div>
              </div>
              <button className="btn btn-gold" style={{ width: "100%", marginTop: 12, padding: "8px 0" }} onClick={e => { e.stopPropagation(); setSelected(p); setErr(""); }}>অর্ডার করুন</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== ORDERS PAGE (Public Manual Order) =====================
function OrdersPage({ data, onOrder }) {
  const [form, setForm] = useState({ name: "", mobile: "", address: "", productId: "", qty: 1, promo: "", note: "" });
  const [promoMsg, setPromoMsg] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

  const selectedProduct = (data.products || []).find(p => p.id === parseInt(form.productId));

  const applyPromo = () => {
    if (!selectedProduct) return;
    const code = (data.promoCodes || []).find(p => p.code === form.promo.trim().toUpperCase() && p.active);
    if (!code) { setPromoMsg("❌ অকার্যকর প্রোমো কোড"); setPromoDiscount(0); return; }
    const disc = code.type === "percent" ? Math.round(selectedProduct.price * form.qty * code.discount / 100) : code.discount;
    setPromoDiscount(disc);
    setPromoMsg(`✅ ${code.discount}${code.type === "percent" ? "%" : " টাকা"} ছাড়!`);
  };

  const totalPrice = selectedProduct ? Math.max(0, selectedProduct.price * form.qty - promoDiscount) : 0;

  const submit = () => {
    if (!form.name.trim() || !form.mobile.trim() || !form.address.trim() || !form.productId) { setErr("নাম, মোবাইল, ঠিকানা ও পণ্য নির্বাচন করতে হবে।"); return; }
    if (selectedProduct && form.qty > selectedProduct.stock) { setErr(`স্টকে মাত্র ${selectedProduct.stock}টি আছে। এর বেশি অর্ডার দেওয়া যাবে না।`); return; }
    onOrder({ id: Date.now(), productId: parseInt(form.productId), productName: selectedProduct?.name, name: form.name, mobile: form.mobile, address: form.address, qty: form.qty, note: form.note, promo: form.promo, originalPrice: (selectedProduct?.price || 0) * form.qty, discount: promoDiscount, totalPrice, status: "pending", assignedStaff: null, tracking: [{status: "অর্ডার গৃহীত", time: new Date().toLocaleString("bn-BD")}], time: new Date().toLocaleString("bn-BD") });
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ maxWidth: 500, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
      <div className="card" style={{ padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 22, color: "var(--green)", marginBottom: 8 }}>অর্ডার সফলভাবে দেওয়া হয়েছে!</div>
        <div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20 }}>অ্যাডমিন শীঘ্রই যোগাযোগ করবেন।</div>
        <button className="btn btn-gold" onClick={() => { setSubmitted(false); setForm({ name: "", mobile: "", address: "", productId: "", qty: 1, promo: "", note: "" }); setPromoDiscount(0); setPromoMsg(""); setErr(""); }}>আরেকটি অর্ডার</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: "40px auto", padding: "0 20px" }}>
      <div className="section-title" style={{ marginBottom: 24 }}>অর্ডার ফর্ম</div>
      <div className="card" style={{ padding: 28 }}>
        {err && <div style={{ background: "rgba(232,64,64,0.1)", border: "1px solid var(--red)", borderRadius: 8, padding: "10px 14px", color: "var(--red)", fontSize: 13, marginBottom: 16 }}>{err}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label>পণ্য নির্বাচন *</label>
            <select value={form.productId} onChange={e => { setForm(f => ({ ...f, productId: e.target.value })); setPromoDiscount(0); setPromoMsg(""); }} style={{ width: "100%", background: "var(--navy3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontSize: 14 }}>
              <option value="">-- পণ্য বেছে নিন --</option>
              {(data.products || []).map(p => <option key={p.id} value={p.id}>{p.name} — ৳{p.price}</option>)}
            </select>
          </div>
          <div><label>আপনার নাম *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="নাম লিখুন" /></div>
          <div><label>মোবাইল নম্বর *</label><input value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))} placeholder="01XXXXXXXXX" /></div>
          <div><label>ঠিকানা</label><input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="ডেলিভারি ঠিকানা" /></div>
          <div>
            <label>পরিমাণ</label>
            <input type="number" min="1" max={selectedProduct?.stock || 999} value={form.qty} onChange={e => setForm(f => ({ ...f, qty: Math.max(1, parseInt(e.target.value)||1) }))} />
            {selectedProduct && form.qty > selectedProduct.stock && <div style={{ fontSize: 12, color: "var(--red)", marginTop: 4 }}>❌ স্টকে মাত্র {selectedProduct.stock}টি আছে!</div>}
            {selectedProduct && form.qty <= selectedProduct.stock && selectedProduct.stock <= 5 && <div style={{ fontSize: 12, color: "var(--gold)", marginTop: 4 }}>⚠️ মাত্র {selectedProduct.stock}টি স্টকে আছে!</div>}
          </div>
          <div>
            <label>প্রোমো কোড (ঐচ্ছিক)</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={form.promo} onChange={e => setForm(f => ({ ...f, promo: e.target.value }))} placeholder="PROMO CODE" style={{ flex: 1 }} />
              <button className="btn btn-ghost" style={{ padding: "0 14px", fontSize: 13 }} onClick={applyPromo}>প্রয়োগ</button>
            </div>
            {promoMsg && <div style={{ fontSize: 12, marginTop: 4, color: promoDiscount > 0 ? "var(--green)" : "var(--red)" }}>{promoMsg}</div>}
          </div>
          <div><label>বিশেষ নোট</label><input value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন" /></div>
          {selectedProduct && (
            <div style={{ background: "var(--navy3)", borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted)", marginBottom: 4 }}><span>মূল মূল্য</span><span>৳{selectedProduct.price * form.qty}</span></div>
              {promoDiscount > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--green)", marginBottom: 4 }}><span>ছাড়</span><span>-৳{promoDiscount}</span></div>}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: "var(--gold)", borderTop: "1px solid var(--border)", paddingTop: 8 }}><span>মোট</span><span>৳{totalPrice}</span></div>
            </div>
          )}
          <button className="btn btn-gold" style={{ width: "100%", padding: 14, fontSize: 16 }} onClick={submit}>অর্ডার দিন</button>
        </div>
      </div>
    </div>
  );
}

// ===================== COMPLAINTS PAGE (Public) =====================
function ComplaintsPage({ data, onSubmit }) {
  const [form, setForm] = useState({ name: "", mobile: "", type: "product", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

  const submit = () => {
    if (!form.message.trim()) { setErr("বিষয়বস্তু লিখতে হবে।"); return; }
    onSubmit({ id: Date.now(), ...form, name: form.name.trim() || "Anonymous", status: "new", time: new Date().toLocaleString("bn-BD") });
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ maxWidth: 500, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
      <div className="card" style={{ padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📩</div>
        <div style={{ fontFamily: "'Tiro Bangla', serif", fontSize: 22, color: "var(--green)", marginBottom: 8 }}>সফলভাবে জমা হয়েছে!</div>
        <div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20 }}>আপনার কমপ্লেইন/মতামত আমরা পর্যালোচনা করব।</div>
        <button className="btn btn-gold" onClick={() => { setSubmitted(false); setForm({ name: "", mobile: "", type: "product", subject: "", message: "" }); setErr(""); }}>আরেকটি জমা দিন</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: "40px auto", padding: "0 20px" }}>
      <div className="section-title" style={{ marginBottom: 24 }}>কমপ্লেইন ও মতামত</div>
      <div className="card" style={{ padding: 28 }}>
        {err && <div style={{ background: "rgba(232,64,64,0.1)", border: "1px solid var(--red)", borderRadius: 8, padding: "10px 14px", color: "var(--red)", fontSize: 13, marginBottom: 16 }}>{err}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label>আপনার নাম (ঐচ্ছিক)</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="পরিচয় গোপন রাখতে খালি রাখুন" /></div>
          <div><label>মোবাইল (ঐচ্ছিক)</label><input value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))} placeholder="01XXXXXXXXX" /></div>
          <div><label>ধরন</label>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              {[["product", "🛍️ পণ্য বিষয়ক"], ["staff", "👤 কর্মচারী বিষয়ক"], ["other", "💬 অন্যান্য"]].map(([val, label]) => (
                <div key={val} onClick={() => setForm(f => ({ ...f, type: val }))} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: `1px solid ${form.type === val ? "var(--gold)" : "var(--border)"}`, background: form.type === val ? "rgba(232,160,32,0.1)" : "var(--navy3)", cursor: "pointer", textAlign: "center", fontSize: 12, color: form.type === val ? "var(--gold)" : "var(--muted)" }}>{label}</div>
              ))}
            </div>
          </div>
          {form.type === "staff" && (
            <div><label>কর্মচারী</label>
              <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={{ width: "100%", background: "var(--navy3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontSize: 14 }}>
                <option value="">-- কর্মচারী বেছে নিন --</option>
                {(data.staff || []).map(s => <option key={s.id} value={s.name}>{s.name} ({s.code})</option>)}
              </select>
            </div>
          )}
          {form.type === "product" && (
            <div><label>পণ্য</label>
              <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={{ width: "100%", background: "var(--navy3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontSize: 14 }}>
                <option value="">-- পণ্য বেছে নিন --</option>
                {(data.products || []).map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
          )}
          <div><label>বিস্তারিত *</label><textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="আপনার কমপ্লেইন বা মতামত লিখুন..." rows={4} style={{ width: "100%", boxSizing: "border-box", background: "var(--navy3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontSize: 14, resize: "vertical" }} /></div>
          <button className="btn btn-gold" style={{ width: "100%", padding: 14, fontSize: 16 }} onClick={submit}>জমা দিন</button>
        </div>
      </div>
    </div>
  );
}

// ===================== PRODUCTS ADMIN TAB =====================
function ProductsAdminTab({ data, setData, isAdmin }) {
  const [tab, setTab] = useState("products");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [promoForm, setPromoForm] = useState({});
  const [orderFilter, setOrderFilter] = useState("all");

  const openAddProduct = () => { setForm({ name: "", price: "", stock: "", img: "", desc: "" }); setModal("addProduct"); };
  const openEditProduct = (p) => { setForm({ ...p }); setModal("editProduct"); };
  const saveProduct = () => {
    if (modal === "addProduct") setData(d => ({ ...d, products: [...(d.products||[]), { ...form, id: Date.now(), price: parseInt(form.price)||0, stock: parseInt(form.stock)||0 }] }));
    else setData(d => ({ ...d, products: (d.products||[]).map(p => p.id === form.id ? { ...form, price: parseInt(form.price)||0, stock: parseInt(form.stock)||0 } : p) }));
    setModal(null);
  };
  const deleteProduct = (id) => { if (window.confirm("পণ্যটি মুছে দেবেন?")) setData(d => ({ ...d, products: (d.products||[]).filter(p => p.id !== id) })); };

  const savePromo = () => {
    if (modal === "addPromo") setData(d => ({ ...d, promoCodes: [...(d.promoCodes||[]), { ...promoForm, id: Date.now(), discount: parseInt(promoForm.discount)||0, active: true }] }));
    else setData(d => ({ ...d, promoCodes: (d.promoCodes||[]).map(p => p.id === promoForm.id ? { ...promoForm, discount: parseInt(promoForm.discount)||0 } : p) }));
    setModal(null);
  };
  const togglePromo = (id) => setData(d => ({ ...d, promoCodes: (d.promoCodes||[]).map(p => p.id === id ? { ...p, active: !p.active } : p) }));
  const deletePromo = (id) => { if (window.confirm("প্রোমো কোড মুছে দেবেন?")) setData(d => ({ ...d, promoCodes: (d.promoCodes||[]).filter(p => p.id !== id) })); };

  const [assignModal, setAssignModal] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [trackingNote, setTrackingNote] = useState("");

  const updateOrderStatus = (id, status) => {
    const statusMap = { confirmed: "অর্ডার কনফার্ম হয়েছে", delivered: "ডেলিভারি সম্পন্ন", cancelled: "অর্ডার বাতিল" };
    setData(d => ({ ...d, orders: (d.orders||[]).map(o => o.id === id ? { ...o, status, tracking: [...(o.tracking||[]), {status: statusMap[status], time: new Date().toLocaleString("bn-BD")}] } : o) }));
  };

  const assignStaff = (orderId) => {
    const staff = (data.staff||[]).find(s => s.id === parseInt(selectedStaffId));
    if (!staff) return;
    setData(d => ({ ...d, orders: (d.orders||[]).map(o => o.id === orderId ? { ...o, assignedStaff: { id: staff.id, name: staff.name, mobile: staff.mobile, area: staff.area }, tracking: [...(o.tracking||[]), {status: trackingNote || `${staff.name} এর মাধ্যমে ডেলিভারি শুরু`, time: new Date().toLocaleString("bn-BD")}] } : o) }));
    setAssignModal(null); setSelectedStaffId(""); setTrackingNote("");
  };
  const deleteOrder = (id) => { if (window.confirm("অর্ডার মুছে দেবেন?")) setData(d => ({ ...d, orders: (d.orders||[]).filter(o => o.id !== id) })); };

  const filteredOrders = (data.orders||[]).filter(o => orderFilter === "all" || o.status === orderFilter).sort((a,b) => b.id - a.id);
  const statusColor = { pending: "var(--gold)", confirmed: "var(--blue)", delivered: "var(--green)", cancelled: "var(--red)" };
  const statusLabel = { pending: "পেন্ডিং", confirmed: "কনফার্ম", delivered: "ডেলিভারি", cancelled: "বাতিল" };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[["products","🛍️ পণ্য"], ["promos","🏷️ প্রোমো কোড"], ["orders","📦 অর্ডার"]].map(([k,l]) => (
          <button key={k} className={`btn ${tab===k?"btn-gold":"btn-ghost"}`} style={{ fontSize: 13 }} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {/* Products */}
      {tab === "products" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 700 }}>পণ্য তালিকা ({(data.products||[]).length}টি)</div>
            {isAdmin && <button className="btn btn-gold" style={{ fontSize: 13 }} onClick={openAddProduct}>+ নতুন পণ্য</button>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {(data.products||[]).map(p => (
              <div key={p.id} className="card" style={{ overflow: "hidden" }}>
                <ImgWithFallback src={p.img} alt={p.name} style={{ width: "100%", height: 150, objectFit: "cover" }} />
                <div style={{ padding: 14 }}>
                  <div style={{ fontWeight: 700, color: "var(--gold)", marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6 }}>{p.desc}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ color: "var(--green)", fontWeight: 700 }}>৳{p.price}</span>
                    <span style={{ color: "var(--muted)", fontSize: 12 }}>স্টক: {p.stock}</span>
                  </div>
                  {isAdmin && <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-ghost" style={{ flex: 1, fontSize: 12 }} onClick={() => openEditProduct(p)}>সম্পাদনা</button>
                    <button className="btn" style={{ flex: 1, fontSize: 12, background: "rgba(232,64,64,0.15)", color: "var(--red)", border: "1px solid var(--red)" }} onClick={() => deleteProduct(p.id)}>মুছুন</button>
                  </div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Promo Codes */}
      {tab === "promos" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 700 }}>প্রোমো কোড ({(data.promoCodes||[]).length}টি)</div>
            {isAdmin && <button className="btn btn-gold" style={{ fontSize: 13 }} onClick={() => { setPromoForm({ code: "", discount: "", type: "percent" }); setModal("addPromo"); }}>+ নতুন কোড</button>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {(data.promoCodes||[]).map(p => (
              <div key={p.id} className="card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ background: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.3)", borderRadius: 8, padding: "6px 14px", fontFamily: "monospace", fontWeight: 700, color: "var(--gold)", fontSize: 15 }}>{p.code}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{p.discount}{p.type === "percent" ? "%" : " টাকা"} ছাড়</div>
                  <div style={{ fontSize: 11, color: p.active ? "var(--green)" : "var(--red)" }}>{p.active ? "✅ সক্রিয়" : "❌ নিষ্ক্রিয়"}</div>
                </div>
                {isAdmin && <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn btn-ghost" style={{ fontSize: 11, padding: "4px 10px" }} onClick={() => togglePromo(p.id)}>{p.active ? "বন্ধ" : "চালু"}</button>
                  <button className="btn btn-ghost" style={{ fontSize: 11, padding: "4px 10px" }} onClick={() => { setPromoForm({...p}); setModal("editPromo"); }}>এডিট</button>
                  <button className="btn" style={{ fontSize: 11, padding: "4px 10px", background: "rgba(232,64,64,0.15)", color: "var(--red)", border: "1px solid var(--red)" }} onClick={() => deletePromo(p.id)}>মুছুন</button>
                </div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders */}
      {tab === "orders" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontWeight: 700 }}>অর্ডার ({(data.orders||[]).length}টি)</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[["all","সব"], ["pending","পেন্ডিং"], ["confirmed","কনফার্ম"], ["delivered","ডেলিভারি"], ["cancelled","বাতিল"]].map(([k,l]) => (
                <button key={k} className={`btn ${orderFilter===k?"btn-gold":"btn-ghost"}`} style={{ fontSize: 11, padding: "4px 10px" }} onClick={() => setOrderFilter(k)}>{l}</button>
              ))}
            </div>
          </div>
          {filteredOrders.length === 0 && <div style={{ color: "var(--muted)", textAlign: "center", padding: 40 }}>কোনো অর্ডার নেই।</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredOrders.map(o => (
              <div key={o.id} className="card" style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{o.productName} × {o.qty}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>👤 {o.name} | 📞 {o.mobile}</div>
                    {o.address && <div style={{ fontSize: 12, color: "var(--muted)" }}>📍 {o.address}</div>}
                    {o.note && <div style={{ fontSize: 12, color: "var(--muted)" }}>📝 {o.note}</div>}
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>🕐 {o.time}</div>
                    {o.assignedStaff && <div style={{ marginTop: 6, padding: "8px 10px", background: "rgba(42,125,225,0.08)", border: "1px solid rgba(42,125,225,0.2)", borderRadius: 6 }}>
                      <div style={{ fontSize: 11, color: "var(--blue)", fontWeight: 700, marginBottom: 2 }}>📦 ডেলিভারি কর্মী</div>
                      <div style={{ fontSize: 12 }}>👤 {o.assignedStaff.name} | 📞 {o.assignedStaff.mobile}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>📍 এরিয়া: {o.assignedStaff.area}</div>
                    </div>}
                    {o.tracking && o.tracking.length > 0 && <div style={{ marginTop: 6 }}>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>📍 ট্র্যাকিং:</div>
                      {o.tracking.map((t, i) => <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 3 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === o.tracking.length-1 ? "var(--green)" : "var(--border)", marginTop: 5, flexShrink: 0 }} />
                        <div><div style={{ fontSize: 12 }}>{t.status}</div><div style={{ fontSize: 10, color: "var(--muted)" }}>{t.time}</div></div>
                      </div>)}
                    </div>}
                    <div style={{ marginTop: 6 }}>
                      {o.discount > 0 && <span style={{ fontSize: 12, color: "var(--muted)", textDecoration: "line-through", marginRight: 8 }}>৳{o.originalPrice}</span>}
                      <span style={{ fontWeight: 700, color: "var(--green)" }}>৳{o.totalPrice}</span>
                      {o.promo && <span style={{ fontSize: 11, marginLeft: 8, background: "rgba(232,160,32,0.1)", color: "var(--gold)", padding: "2px 6px", borderRadius: 4 }}>{o.promo}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: `${statusColor[o.status]}22`, color: statusColor[o.status], border: `1px solid ${statusColor[o.status]}` }}>{statusLabel[o.status]}</span>
                    {isAdmin && <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      {o.status !== "confirmed" && <button className="btn" style={{ fontSize: 10, padding: "3px 8px", background: "rgba(42,125,225,0.15)", color: "var(--blue)", border: "1px solid var(--blue)" }} onClick={() => updateOrderStatus(o.id, "confirmed")}>কনফার্ম</button>}
                      {o.status !== "delivered" && <button className="btn" style={{ fontSize: 10, padding: "3px 8px", background: "rgba(39,174,96,0.15)", color: "var(--green)", border: "1px solid var(--green)" }} onClick={() => updateOrderStatus(o.id, "delivered")}>ডেলিভারি</button>}
                      {o.status !== "cancelled" && <button className="btn" style={{ fontSize: 10, padding: "3px 8px", background: "rgba(232,64,64,0.15)", color: "var(--red)", border: "1px solid var(--red)" }} onClick={() => updateOrderStatus(o.id, "cancelled")}>বাতিল</button>}
                      <button className="btn" style={{ fontSize: 10, padding: "3px 8px", background: "rgba(232,160,32,0.15)", color: "var(--gold)", border: "1px solid var(--gold)" }} onClick={() => setAssignModal(o.id)}>ট্র্যাক</button>
                      <button className="btn" style={{ fontSize: 10, padding: "3px 8px", background: "rgba(232,64,64,0.15)", color: "var(--red)", border: "1px solid var(--red)" }} onClick={() => deleteOrder(o.id)}>মুছুন</button>
                    </div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Modal */}
      {(modal === "addProduct" || modal === "editProduct") && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--gold)" }}>{modal === "addProduct" ? "নতুন পণ্য" : "পণ্য সম্পাদনা"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div><label>পণ্যের নাম</label><input value={form.name||""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><label>মূল্য (টাকা)</label><input type="number" value={form.price||""} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></div>
              <div><label>স্টক পরিমাণ</label><input type="number" value={form.stock||""} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} /></div>
              <div><label>বিবরণ</label><input value={form.desc||""} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} /></div>
              <div><label>ছবি</label><ImageInputWithUpload value={form.img||""} onChange={v => setForm(f => ({ ...f, img: v }))} previewStyle={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} /></div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>বাতিল</button>
              <button className="btn btn-gold" style={{ flex: 1 }} onClick={saveProduct}>সেভ করুন</button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Staff / Tracking Modal */}
      {assignModal && (
        <div className="modal-overlay" onClick={() => setAssignModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--gold)" }}>📦 ডেলিভারি ট্র্যাকিং</div>
            {(() => { const o = (data.orders||[]).find(x => x.id === assignModal); return o ? (
              <div>
                <div style={{ background: "var(--navy3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
                  <div style={{ fontWeight: 600 }}>{o.productName} × {o.qty}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>👤 {o.name} | 📍 {o.address}</div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label>কর্মচারী নির্বাচন করুন</label>
                  <select value={selectedStaffId} onChange={e => setSelectedStaffId(e.target.value)} style={{ width: "100%", background: "var(--navy3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontSize: 14, marginTop: 6 }}>
                    <option value="">-- কর্মচারী বেছে নিন --</option>
                    {(data.staff||[]).map(s => <option key={s.id} value={s.id}>{s.name} — {s.area}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label>ট্র্যাকিং নোট (ঐচ্ছিক)</label>
                  <input value={trackingNote} onChange={e => setTrackingNote(e.target.value)} placeholder="যেমন: হ্নীলা পর্যন্ত পৌঁছেছে" style={{ marginTop: 6 }} />
                </div>
                {o.tracking && o.tracking.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>📍 ট্র্যাকিং ইতিহাস:</div>
                    {o.tracking.map((t, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === o.tracking.length-1 ? "var(--green)" : "var(--muted)", marginTop: 5, flexShrink: 0 }} />
                      <div><div style={{ fontSize: 13 }}>{t.status}</div><div style={{ fontSize: 11, color: "var(--muted)" }}>{t.time}</div></div>
                    </div>)}
                  </div>
                )}
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setAssignModal(null)}>বন্ধ করুন</button>
                  <button className="btn btn-gold" style={{ flex: 1 }} onClick={() => assignStaff(assignModal)} disabled={!selectedStaffId}>কর্মী নিয়োগ করুন</button>
                </div>
              </div>
            ) : null; })()}
          </div>
        </div>
      )}

      {/* Promo Modal */}
      {(modal === "addPromo" || modal === "editPromo") && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--gold)" }}>{modal === "addPromo" ? "নতুন প্রোমো কোড" : "প্রোমো সম্পাদনা"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div><label>কোড</label><input value={promoForm.code||""} onChange={e => setPromoForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="যেমন: RAHIM10" /></div>
              <div><label>ধরন</label>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  {[["percent","% শতাংশ"], ["flat","৳ নির্দিষ্ট টাকা"]].map(([v,l]) => (
                    <div key={v} onClick={() => setPromoForm(f => ({ ...f, type: v }))} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: `1px solid ${promoForm.type===v?"var(--gold)":"var(--border)"}`, background: promoForm.type===v?"rgba(232,160,32,0.1)":"var(--navy3)", cursor: "pointer", textAlign: "center", fontSize: 13, color: promoForm.type===v?"var(--gold)":"var(--muted)" }}>{l}</div>
                  ))}
                </div>
              </div>
              <div><label>ছাড়ের পরিমাণ</label><input type="number" value={promoForm.discount||""} onChange={e => setPromoForm(f => ({ ...f, discount: e.target.value }))} placeholder={promoForm.type === "percent" ? "যেমন: 10 (১০%)" : "যেমন: 50 (৫০ টাকা)"} /></div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>বাতিল</button>
              <button className="btn btn-gold" style={{ flex: 1 }} onClick={savePromo}>সেভ করুন</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===================== COMPLAINTS ADMIN TAB =====================
function ComplaintsAdminTab({ data, setData, isAdmin }) {
  const [filter, setFilter] = useState("all");
  const updateStatus = (id, status) => setData(d => ({ ...d, complaints: (d.complaints||[]).map(c => c.id === id ? { ...c, status } : c) }));
  const deleteComplaint = (id) => { if (window.confirm("কমপ্লেইনটি মুছে দেবেন?")) setData(d => ({ ...d, complaints: (d.complaints||[]).filter(c => c.id !== id) })); };

  const typeLabel = { product: "🛍️ পণ্য", staff: "👤 কর্মচারী", other: "💬 অন্যান্য" };
  const statusColor = { new: "var(--gold)", reviewed: "var(--blue)", resolved: "var(--green)" };
  const statusLabel = { new: "নতুন", reviewed: "পর্যালোচিত", resolved: "সমাধান" };

  const filtered = (data.complaints||[]).filter(c => filter === "all" || c.status === filter || c.type === filter).sort((a,b) => b.id - a.id);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontWeight: 700 }}>কমপ্লেইন ও মতামত ({(data.complaints||[]).length}টি)</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[["all","সব"], ["new","নতুন"], ["reviewed","পর্যালোচিত"], ["resolved","সমাধান"], ["product","পণ্য"], ["staff","কর্মচারী"]].map(([k,l]) => (
            <button key={k} className={`btn ${filter===k?"btn-gold":"btn-ghost"}`} style={{ fontSize: 11, padding: "4px 10px" }} onClick={() => setFilter(k)}>{l}</button>
          ))}
        </div>
      </div>
      {filtered.length === 0 && <div style={{ color: "var(--muted)", textAlign: "center", padding: 40 }}>কোনো কমপ্লেইন নেই।</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(c => (
          <div key={c.id} className="card" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, background: "rgba(232,160,32,0.1)", color: "var(--gold)", padding: "2px 8px", borderRadius: 4 }}>{typeLabel[c.type]}</span>
                  {c.subject && <span style={{ fontSize: 12, color: "var(--muted)" }}>→ {c.subject}</span>}
                </div>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>👤 {c.name} {c.mobile && `| 📞 ${c.mobile}`}</div>
                <div style={{ fontSize: 14, color: "var(--text)", marginBottom: 4, lineHeight: 1.6 }}>{c.message}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>🕐 {c.time}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: `${statusColor[c.status||"new"]}22`, color: statusColor[c.status||"new"], border: `1px solid ${statusColor[c.status||"new"]}` }}>{statusLabel[c.status||"new"]}</span>
                {isAdmin && <div style={{ display: "flex", gap: 4 }}>
                  {c.status !== "reviewed" && <button className="btn" style={{ fontSize: 10, padding: "3px 8px", background: "rgba(42,125,225,0.15)", color: "var(--blue)", border: "1px solid var(--blue)" }} onClick={() => updateStatus(c.id, "reviewed")}>পর্যালোচনা</button>}
                  {c.status !== "resolved" && <button className="btn" style={{ fontSize: 10, padding: "3px 8px", background: "rgba(39,174,96,0.15)", color: "var(--green)", border: "1px solid var(--green)" }} onClick={() => updateStatus(c.id, "resolved")}>সমাধান</button>}
                  <button className="btn" style={{ fontSize: 10, padding: "3px 8px", background: "rgba(232,64,64,0.15)", color: "var(--red)", border: "1px solid var(--red)" }} onClick={() => deleteComplaint(c.id)}>মুছুন</button>
                </div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ===================== ORDER TRACKING PAGE (Public) =====================
function TrackingPage({ data }) {
  const [mobile, setMobile] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const search = () => {
    if (!mobile.trim()) return;
    const orders = (data.orders || []).filter(o => o.mobile === mobile.trim()).sort((a,b) => b.id - a.id);
    setResult(orders);
    setSearched(true);
  };

  const statusColor = { pending: "var(--gold)", confirmed: "var(--blue)", delivered: "var(--green)", cancelled: "var(--red)" };
  const statusLabel = { pending: "⏳ পেন্ডিং", confirmed: "✅ কনফার্ম", delivered: "🎉 ডেলিভারি সম্পন্ন", cancelled: "❌ বাতিল" };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 20px" }}>
      <div className="section-title" style={{ marginBottom: 24 }}>📦 অর্ডার ট্র্যাকিং</div>
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 12 }}>আপনার মোবাইল নম্বর দিয়ে অর্ডারের অবস্থান জানুন</div>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={mobile} onChange={e => setMobile(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder="01XXXXXXXXX" style={{ flex: 1 }} />
          <button className="btn btn-gold" style={{ padding: "0 20px" }} onClick={search}>খুঁজুন</button>
        </div>
      </div>

      {searched && result !== null && result.length === 0 && (
        <div className="card" style={{ padding: 24, textAlign: "center", color: "var(--muted)" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
          <div>এই নম্বরে কোনো অর্ডার পাওয়া যায়নি।</div>
        </div>
      )}

      {result && result.map(o => (
        <div key={o.id} className="card" style={{ padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--gold)", marginBottom: 4 }}>{o.productName}</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>পরিমাণ: {o.qty} | মূল্য: ৳{o.totalPrice}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>📅 {o.time}</div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, padding: "6px 12px", borderRadius: 8, background: `${statusColor[o.status]}22`, color: statusColor[o.status], border: `1px solid ${statusColor[o.status]}`, whiteSpace: "nowrap" }}>
              {statusLabel[o.status] || o.status}
            </span>
          </div>

          {/* Assigned Staff */}
          {o.assignedStaff && (
            <div style={{ background: "rgba(42,125,225,0.08)", border: "1px solid rgba(42,125,225,0.25)", borderRadius: 8, padding: "12px 14px", marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "var(--blue)", fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>🚴 ডেলিভারি কর্মী</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--navy3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>👤</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{o.assignedStaff.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>📞 {o.assignedStaff.mobile}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>📍 {o.assignedStaff.area}</div>
                </div>
              </div>
            </div>
          )}

          {/* Tracking Timeline */}
          {o.tracking && o.tracking.length > 0 && (
            <div>
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, marginBottom: 10 }}>📍 ট্র্যাকিং ইতিহাস</div>
              <div style={{ position: "relative", paddingLeft: 20 }}>
                <div style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: "var(--border)" }} />
                {o.tracking.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10, position: "relative" }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: i === o.tracking.length-1 ? "var(--green)" : "var(--border)", border: `2px solid ${i === o.tracking.length-1 ? "var(--green)" : "var(--muted)"}`, flexShrink: 0, marginTop: 2, position: "absolute", left: -16 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: i === o.tracking.length-1 ? 600 : 400, color: i === o.tracking.length-1 ? "var(--text)" : "var(--muted)" }}>{t.status}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{t.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ===================== MAIN APP =====================
export default function App() {
  const [data, setDataRaw] = useState(INITIAL_DATA);
  const [users, setUsersRaw] = useState(DEFAULT_USERS);
  const [role, setRole] = useState(() => lsLoad(LS_ROLE_KEY));
  const [loaded, setLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPassChange, setShowPassChange] = useState(false);
  const [activePage, setActivePage] = useState(() => lsLoad(LS_ROLE_KEY) ? "dashboard" : "home");
  const [saveToast, setSaveToast] = useState(false);
  const toastTimerRef = useRef(null);

  // ── Netlify Blobs থেকে ডেটা লোড ──
  useEffect(() => {
    const loadAll = async () => {
      try {
        const [savedData, savedUsers] = await Promise.all([
          blobLoad(BLOB_DATA_KEY),
          blobLoad(BLOB_USERS_KEY),
        ]);
        if (savedData) setDataRaw(savedData);
        if (savedUsers) setUsersRaw(savedUsers);
      } catch (e) {
        console.error("Initial load error:", e);
      } finally {
        setLoaded(true);
      }
    };
    loadAll();
  }, []);

  const showSaveToast = useCallback(() => {
    setSaveToast(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setSaveToast(false), 2500);
  }, []);

  // ── ডেটা আপডেট → Netlify Blobs-এ সেভ ──
  const updateData = useCallback((updater) => {
    setDataRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      blobSave(BLOB_DATA_KEY, next);
      return next;
    });
    showSaveToast();
  }, [showSaveToast]);

  // ── Users আপডেট → Netlify Blobs-এ সেভ ──
  const updateUsers = useCallback((updater) => {
    setUsersRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      blobSave(BLOB_USERS_KEY, next);
      return next;
    });
    showSaveToast();
  }, [showSaveToast]);

  const handleLogin = (r) => {
    setRole(r);
    lsSave(LS_ROLE_KEY, r);
    setShowLogin(false);
    setActivePage("dashboard");
  };

  const handleLogout = () => {
    setRole(null);
    lsRemove(LS_ROLE_KEY);
    setActivePage("home");
  };

  const handleAttendanceSubmit = (entry) => {
    const now = new Date();
    const timeStr = now.toLocaleDateString("bn-BD") + " " + now.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" });
    updateData(d => ({ ...d, attendance: [{ id: Date.now(), ...entry, time: timeStr, status: "pending" }, ...d.attendance] }));
  };

  const handleLogoUpload = async (base64) => {
    const compressed = await compressImage(base64, 200, 0.8);
    updateData(d => ({ ...d, owner: { ...d.owner, logo: compressed } }));
  };

  // Loading screen
  if (!loaded) return <LoadingScreen />;

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", background: "var(--navy)" }}>
        <NoticeBar notices={data.notices} />
        <Header
          onLoginClick={() => setShowLogin(true)}
          role={role}
          onLogout={handleLogout}
          activePage={activePage}
          setActivePage={setActivePage}
          logo={data.owner?.logo}
          onLogoUpload={handleLogoUpload}
        />
        <main>
          {activePage === "home" && <PublicHome data={data} />}
          {activePage === "staff" && <StaffPage data={data} />}
          {activePage === "events" && <EventsPage data={data} />}
          {activePage === "products" && <ProductsPage data={data} onOrder={(order) => updateData(d => ({ ...d, orders: [...(d.orders||[]), order], products: (d.products||[]).map(p => p.id === order.productId ? { ...p, stock: Math.max(0, p.stock - order.qty) } : p) }))} />}
          {activePage === "orders" && <OrdersPage data={data} onOrder={(order) => updateData(d => ({ ...d, orders: [...(d.orders||[]), order], products: (d.products||[]).map(p => p.id === order.productId ? { ...p, stock: Math.max(0, p.stock - order.qty) } : p) }))} />}
          {activePage === "complaints" && <ComplaintsPage data={data} onSubmit={(c) => updateData(d => ({ ...d, complaints: [...(d.complaints||[]), c] }))} />}
          {activePage === "tracking" && <TrackingPage data={data} />}
          {activePage === "attendance" && <AttendancePage onSubmit={handleAttendanceSubmit} />}
          {activePage === "dashboard" && role && <Dashboard data={data} setData={updateData} role={role} onChangePassword={() => setShowPassChange(true)} />}
          {activePage === "dashboard" && !role && (
            <div style={{ textAlign: "center", padding: 80 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
              <div style={{ color: "var(--muted)", fontSize: 16, marginBottom: 20 }}>ড্যাশবোর্ড দেখতে লগইন করুন।</div>
              <button className="btn btn-gold" onClick={() => setShowLogin(true)}>লগইন করুন</button>
            </div>
          )}
        </main>
        <footer style={{ background: "var(--navy2)", borderTop: "1px solid var(--border)", padding: "20px", textAlign: "center", marginTop: 40 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Tiro Bangla', serif", color: "var(--gold)", fontSize: 15, marginBottom: 4 }}>রহিম এন্টারপ্রাইজ বাংলালিংক</div>
            <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 8 }}>টেকনাফ, কক্সবাজার</div>
            <div style={{ height: 1, background: "var(--border)", margin: "10px auto", maxWidth: 300 }} />
            <div style={{ color: "var(--muted)", fontSize: 12 }}>
              developed by{" "}
              <a href="https://www.facebook.com/abubakkar.253/" target="_blank" rel="noopener noreferrer" className="dev-link">Abu Bakkar Siddique</a>
            </div>
          </div>
        </footer>
      </div>
      <SaveToast show={saveToast} />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} users={users} />}
      {showPassChange && <PasswordChangeModal onClose={() => setShowPassChange(false)} users={users} setUsers={updateUsers} />}
    </>
  );
}
