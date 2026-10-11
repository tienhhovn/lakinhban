import { useState } from "react";
import { APP_LEVEL } from "../lib/stars";
import { ELEMENT_COLOR, ELEMENT_NAME } from "../lib/elements";
import type { Profile } from "../lib/fengshui";
import { cn } from "../utils/cn";

/* ================= BẢNG 8 HƯỚNG ================= */
export function DirectionTable({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-amber-200/15 bg-white/[0.03] p-4">
        <h2 className="font-serif text-[17px] uppercase tracking-[0.14em] text-amber-200/90">
          Bát Trạch · 8 hướng
        </h2>
        <p className="mt-1 text-[12.5px] leading-relaxed text-emerald-100/60">
          Xếp hạng dành riêng cho gia chủ <b className="text-amber-200/90">{profile.person.name}</b>{" "}
          (mệnh {profile.kuaInfo.name}, {profile.kuaInfo.group}). Chạm vào từng hướng để xem chi
          tiết và cách hóa giải.
        </p>
      </div>

      {profile.ranked.map((r) => {
        const isCat = r.star.quality === "cat";
        const isOpen = open === r.dirIndex;
        return (
          <div
            key={r.dirIndex}
            className="overflow-hidden rounded-2xl border"
            style={{
              borderColor: isCat ? "rgba(212,175,55,.28)" : "rgba(120,140,220,.2)",
              background: isCat
                ? "linear-gradient(150deg, rgba(212,175,55,.1), rgba(2,44,34,.5))"
                : "linear-gradient(150deg, rgba(30,41,90,.28), rgba(2,44,34,.5))",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : r.dirIndex)}
              className="flex w-full items-center gap-3 p-3.5 text-left"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-center font-serif text-[13px] font-bold"
                style={{
                  borderColor: r.star.ringColor + "99",
                  background: r.star.ringColor + "2a",
                  color: r.star.textColor,
                }}
              >
                {r.direction.short}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2">
                  <span className="font-serif text-[19px] text-amber-50">{r.direction.name}</span>
                  <span className="text-[11px] text-emerald-100/50">
                    {r.direction.from}°–{r.direction.to}°
                  </span>
                </span>
                <span className="mt-0.5 flex items-center gap-2">
                  <span
                    className={cn(
                      "text-[13px] font-bold",
                      isCat ? "text-amber-200" : "text-indigo-200",
                    )}
                  >
                    {r.star.name}
                  </span>
                  <span className="text-[11px] text-emerald-100/50">
                    {r.star.grade} · {r.star.score}/10
                  </span>
                </span>
                <span className="mt-1.5 flex gap-1">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span
                      key={i}
                      className="h-1 flex-1 rounded-full"
                      style={{
                        background:
                          i < r.star.score
                            ? isCat
                              ? "linear-gradient(90deg,#f2d489,#d4af37)"
                              : "linear-gradient(90deg,#7f9cf5,#4c1d95)"
                            : "rgba(255,255,255,.1)",
                      }}
                    />
                  ))}
                </span>
              </span>
              <span className="shrink-0 text-amber-200/50">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <div className="space-y-3 border-t border-amber-200/10 px-3.5 pb-4 pt-3">
                <p className="text-[12.5px] leading-relaxed text-emerald-50/85">{r.star.summary}</p>

                <div className="grid grid-cols-2 gap-2">
                  <MiniInfo label="Cung quẻ" value={`${r.direction.trigram} ${r.direction.glyph}`} note={ELEMENT_NAME[r.direction.element]} />
                  <MiniInfo label="Nhóm trạch" value={r.direction.group} note={r.star.alias} />
                </div>

                {(isCat ? r.star.governs : r.star.risks).length > 0 && (
                  <div>
                    <p className="mb-1.5 text-[11.5px] font-bold uppercase tracking-wider text-amber-200/80">
                      {isCat ? "Bổ trợ" : "Rủi ro"}
                    </p>
                    <ul className="space-y-1.5">
                      {(isCat ? r.star.governs : r.star.risks).map((t, i) => (
                        <li key={i} className="flex gap-2 text-[12.3px] leading-relaxed text-emerald-50/80">
                          <span className={isCat ? "text-amber-300/70" : "text-rose-300/70"}>•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <p className="mb-1.5 text-[11.5px] font-bold uppercase tracking-wider text-amber-200/80">
                    {isCat ? "Cách khai thác" : "Cách hóa giải"}
                  </p>
                  <ul className="space-y-1.5">
                    {(isCat ? r.star.best : r.star.remedies.map((x) => `${x.title}: ${x.detail}`)).slice(0, 4).map((t, i) => (
                      <li key={i} className="flex gap-2 text-[12.3px] leading-relaxed text-emerald-50/80">
                        <span className="text-amber-300/70">▸</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-1.5">
                  {r.star.applications.map((a) => {
                    const lv = APP_LEVEL[a.level];
                    return (
                      <div key={a.label} className={cn("flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5", lv.cls)}>
                        <span className="text-[12px] font-medium">{a.label}</span>
                        <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide">
                          <span className={cn("h-1.5 w-1.5 rounded-full", lv.dot)} />
                          {lv.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MiniInfo({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl border border-amber-200/12 bg-emerald-950/40 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-emerald-100/45">{label}</p>
      <p className="font-serif text-[15px] text-amber-100">{value}</p>
      <p className="text-[11px] text-emerald-100/55">{note}</p>
    </div>
  );
}

/* ================= HỒ SƠ GIA CHỦ ================= */
export function ProfileSheet({ profile, onEdit }: { profile: Profile; onEdit: () => void }) {
  const p = profile.person;
  const el = ELEMENT_COLOR[profile.kuaInfo.element];
  const rows: { k: string; v: string }[] = [
    { k: "Họ tên", v: p.name },
    { k: "Giới tính", v: p.gender === "nam" ? "Nam (Dương)" : "Nữ (Âm)" },
    {
      k: "Ngày sinh",
      v: `${String(p.day).padStart(2, "0")}/${String(p.month).padStart(2, "0")}/${p.year}${p.beforeLapXuan ? " (trước Lập Xuân)" : ""}`,
    },
    { k: "Tuổi (âm lịch)", v: `${profile.canChi.label} — ${profile.canChi.conGiap}` },
    { k: "Nạp âm ngũ hành", v: profile.canChi.napAm },
    { k: "Quái số (Cung Phi)", v: String(profile.kua) },
    { k: "Cung mệnh", v: `${profile.kuaInfo.name} ${profile.kuaInfo.glyph}` },
    { k: "Nhóm mệnh", v: profile.kuaInfo.group },
    { k: "Ngũ hành cung mệnh", v: ELEMENT_NAME[profile.kuaInfo.element] },
    { k: "Con số may mắn", v: profile.elementAdvice.numbers },
  ];

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-amber-200/20 bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 p-4">
        <div className="flex items-start gap-4">
          <div
            className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border text-4xl"
            style={{ borderColor: el + "66", background: el + "1a", color: el }}
          >
            {profile.kuaInfo.glyph}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-2xl text-amber-100">{profile.kuaInfo.name}</h2>
            <p className="text-[12.5px] text-emerald-100/70">
              Quái số {profile.kua} · {profile.kuaInfo.group}
            </p>
            <p className="text-[12.5px]" style={{ color: el }}>
              Hành {ELEMENT_NAME[profile.kuaInfo.element]} · {profile.canChi.napAm}
            </p>
            <button
              type="button"
              onClick={onEdit}
              className="mt-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-[11.5px] font-semibold text-amber-200 active:scale-95"
            >
              ✎ Sửa thông tin
            </button>
          </div>
        </div>
        <p className="mt-3 text-[12.5px] leading-relaxed text-emerald-100/65">{profile.kuaInfo.desc}</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-amber-200/15 bg-white/[0.03]">
        {rows.map((r, i) => (
          <div
            key={r.k}
            className={cn(
              "flex items-start justify-between gap-3 px-4 py-2.5",
              i % 2 === 1 && "bg-emerald-950/25",
            )}
          >
            <span className="text-[12.5px] text-emerald-100/55">{r.k}</span>
            <span className="text-right text-[12.8px] font-semibold text-amber-50">{r.v}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <AdviceCard title="Màu sắc hợp" text={profile.elementAdvice.favorable} extra={profile.elementAdvice.supportive} tone="good" />
        <AdviceCard title="Màu sắc kỵ" text={profile.elementAdvice.avoid} extra={profile.elementAdvice.lessen} tone="bad" />
      </div>

      <div className="rounded-3xl border border-amber-200/15 bg-white/[0.03] p-4">
        <h3 className="mb-2.5 font-serif text-[15px] uppercase tracking-[0.14em] text-amber-200/90">
          4 hướng tốt · 4 hướng xấu
        </h3>
        <div className="space-y-1.5">
          {[...profile.good, ...profile.bad].map((r) => (
            <div key={r.dirIndex} className="flex items-center gap-2.5">
              <span className="w-[74px] shrink-0 text-[12.5px] text-emerald-100/80">{r.direction.name}</span>
              <span className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        i < r.star.score
                          ? r.star.quality === "cat"
                            ? "#e9c34d"
                            : "#6d8ae8"
                          : "rgba(255,255,255,.12)",
                    }}
                  />
                ))}
              </span>
              <span
                className={cn(
                  "ml-auto text-[12px] font-semibold",
                  r.star.quality === "cat" ? "text-amber-200" : "text-indigo-200",
                )}
              >
                {r.star.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdviceCard({
  title,
  text,
  extra,
  tone,
}: {
  title: string;
  text: string;
  extra: string;
  tone: "good" | "bad";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3.5",
        tone === "good" ? "border-amber-300/30 bg-amber-300/10" : "border-sky-300/20 bg-sky-400/5",
      )}
    >
      <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-100/50">{title}</p>
      <p className={cn("text-[12.8px] font-semibold leading-snug", tone === "good" ? "text-amber-100" : "text-sky-200")}>
        {text}
      </p>
      <p className="mt-1 text-[11.5px] leading-relaxed text-emerald-100/60">{extra}</p>
    </div>
  );
}

/* ================= CHÚ GIẢI CÁC VÒNG LA BÀN ================= */
export function CompassLegend() {
  const rings = [
    {
      color: "#f3dc9a",
      title: "1 · Vòng thước đo độ (0° – 360°)",
      text: "Vạch chia chi tiết từng 2°, mỗi 5° và 15°; số độ hiển thị theo chu vi giúp định vị chính xác đến từng độ.",
    },
    {
      color: "#c62828",
      title: "2 · Vòng 64 cung tiểu cát / tiểu hung",
      text: "Hoan Lạc, Vượng Tài, Cô Quả, Tuyệt Tự… mỗi cung 5,625°. Nền đỏ = tiểu cát, nền xanh thẫm = tiểu hung (chuẩn la bàn cổ).",
    },
    {
      color: "#ffe9a8",
      title: "3 · Vòng Nhị thập tứ sơn (24 sơn)",
      text: "Nhâm, Tý, Quý, Sửu, Cấn, Dần, Giáp, Mão, Ất… mỗi sơn 15°, gồm Thiên can, Địa chi và Tứ duy (Càn, Khôn, Cấn, Tốn).",
    },
    {
      color: "#8ec5f0",
      title: "4 · Vòng Bát Quái & tên hướng",
      text: "Bắc, Đông Bắc, Đông, Đông Nam… đi kèm cung mệnh Khảm, Cấn, Chấn, Tốn, Ly, Khôn, Doài, Càn và tên sao Bát Trạch của gia chủ.",
    },
    {
      color: "#f0d98a",
      title: "5 · Vòng hào quẻ",
      text: "Vạch âm dương (liền = dương, đứt = âm) của 8 quẻ, xoay ra ngoài theo đúng trật tự Hậu Thiên Bát Quái.",
    },
    {
      color: "#d4af37",
      title: "6 · Tâm Thái Cực Đồ",
      text: "Thái Cực Âm Dương xoay thuận tại tâm la bàn, biểu thị nguồn khí của cả tám hướng.",
    },
  ];
  return (
    <div className="rounded-3xl border border-amber-200/15 bg-white/[0.03] p-4">
      <h3 className="mb-3 font-serif text-[15px] uppercase tracking-[0.14em] text-amber-200/90">
        Cấu trúc la bàn
      </h3>
      <div className="space-y-2.5">
        {rings.map((r) => (
          <div key={r.title} className="flex gap-2.5">
            <span
              className="mt-1 h-3 w-3 shrink-0 rounded-full border"
              style={{ borderColor: r.color, background: r.color + "33" }}
            />
            <div>
              <p className="text-[12.8px] font-bold text-amber-100">{r.title}</p>
              <p className="text-[12px] leading-relaxed text-emerald-100/65">{r.text}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t border-amber-200/10 pt-3 text-[11px] leading-relaxed text-emerald-100/40">
        Màu trên la bàn: đỏ / vàng = cung Cát (Sinh Khí, Thiên Y, Diên Niên – Phước Đức, Phục Vị);
        xanh thẫm / đen = cung Hung (Họa Hại, Lục Sát, Ngũ Quỷ, Tuyệt Mệnh).
      </p>
    </div>
  );
}
