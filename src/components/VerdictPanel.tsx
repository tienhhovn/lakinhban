import { APP_LEVEL } from "../lib/stars";
import { formatHeading, mountainRange, type Profile, type Reading } from "../lib/fengshui";
import { ELEMENT_COLOR, ELEMENT_NAME } from "../lib/elements";
import { cn } from "../utils/cn";

interface Props {
  profile: Profile;
  reading: Reading;
}

export function VerdictPanel({ profile, reading }: Props) {
  const { star, direction, mountain, mini } = reading;
  const isCat = star.quality === "cat";

  return (
    <div
      key={reading.dirIndex}
      className="animate-[fadeIn_.45s_ease-out] space-y-4 rounded-3xl border p-4"
      style={{
        borderColor: isCat ? "rgba(212,175,55,.35)" : "rgba(148,163,255,.22)",
        background: isCat
          ? "linear-gradient(160deg, rgba(212,175,55,.14), rgba(2,44,34,.55))"
          : "linear-gradient(160deg, rgba(30,41,90,.30), rgba(2,44,34,.6))",
      }}
    >
      {/* ---------- Phán xét ---------- */}
      <div className="flex items-start gap-3">
        <div
          className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border text-center"
          style={{
            borderColor: star.ringColor + "aa",
            background: star.ringColor + "2e",
          }}
        >
          <span className="text-xl leading-none" style={{ color: star.textColor }}>
            {isCat ? "☰" : "☒"}
          </span>
          <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: star.textColor }}>
            {star.score}/10
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              className="font-serif text-[26px] leading-none"
              style={{ color: isCat ? "#ffe9a8" : "#c9d8f7" }}
            >
              {star.name}
            </h2>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider",
                isCat
                  ? "border-amber-300/50 bg-amber-300/15 text-amber-200"
                  : "border-indigo-300/40 bg-indigo-400/15 text-indigo-200",
              )}
            >
              {star.grade}
            </span>
          </div>
          <p className="mt-1 text-[12.5px] text-emerald-100/70">
            {star.alias} · {star.starName} · hành {ELEMENT_NAME[star.element]}
          </p>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className="h-1.5 flex-1 rounded-full"
                style={{
                  background:
                    i < star.score
                      ? isCat
                        ? "linear-gradient(90deg,#f2d489,#d4af37)"
                        : "linear-gradient(90deg,#7f9cf5,#4c1d95)"
                      : "rgba(255,255,255,.09)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Dòng kết luận nhanh ---------- */}
      <div
        className="rounded-2xl px-3.5 py-3 text-[13.5px] font-semibold leading-relaxed"
        style={{
          background: isCat ? "rgba(212,175,55,.14)" : "rgba(76,29,149,.22)",
          color: isCat ? "#ffeec2" : "#dbe4ff",
        }}
      >
        {isCat ? "✔ " : "✖ "}
        Hướng <b>{direction.name}</b> ({formatHeading(reading.heading)}) đối với gia chủ{" "}
        <b>{profile.person.name}</b> là hướng{" "}
        <b>{isCat ? "TỐT" : "XẤU"}</b> — sao <b>{star.name}</b> chiếu vào cung{" "}
        <b>{direction.trigram}</b>.
      </div>

      {/* ---------- Thông số kỹ thuật ---------- */}
      <div className="grid grid-cols-2 gap-2">
        <Spec label="Hướng đang chiếu" value={direction.name} note={`${direction.trigram} · ${ELEMENT_NAME[direction.element]}`} />
        <Spec label="Độ đo" value={formatHeading(reading.heading)} note={mountainRange(reading.heading)} />
        <Spec label="Sơn (24 sơn)" value={mountain.name} note={`${mountain.cls} · ${mountain.kind}`} />
        <Spec
          label="Cung vòng ngoài"
          value={mini.name}
          note={mini.type === "cat" ? "Tiểu cát" : "Tiểu hung"}
          tone={mini.type}
        />
      </div>

      <p className="text-[12.5px] leading-relaxed text-emerald-100/70">{star.summary}</p>

      {/* ---------- Cung vòng ngoài ---------- */}
      <div
        className="rounded-2xl border px-3.5 py-3 text-[12.5px] leading-relaxed"
        style={{
          borderColor: mini.type === "cat" ? "rgba(212,175,55,.3)" : "rgba(99,132,203,.28)",
          background: mini.type === "cat" ? "rgba(212,175,55,.08)" : "rgba(30,48,110,.22)",
          color: "#e2ecff",
        }}
      >
        <b className={mini.type === "cat" ? "text-amber-200" : "text-sky-200"}>
          Vòng 64 cung · {mini.name}:
        </b>{" "}
        {mini.note}
      </div>

      {/* ---------- Ý nghĩa / Rủi ro ---------- */}
      {(star.governs.length > 0 || star.risks.length > 0) && (
        <Section
          title={isCat ? "Hướng này bổ trợ điều gì" : "Rủi ro khi dùng hướng này"}
          icon={isCat ? "✦" : "⚠"}
        >
          <ul className="space-y-2">
            {(isCat ? star.governs : star.risks).map((t, i) => (
              <li key={i} className="flex gap-2 text-[12.8px] leading-relaxed text-emerald-50/85">
                <span className={isCat ? "text-amber-300/80" : "text-rose-300/80"}>•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ---------- Cách khai thác / hóa giải ---------- */}
      {isCat ? (
        <Section title="Cách khai thác hướng tốt này" icon="☰">
          <ul className="space-y-2">
            {star.best.map((t, i) => (
              <li key={i} className="flex gap-2 text-[12.8px] leading-relaxed text-emerald-50/85">
                <span className="text-amber-300/80">▸</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : (
        <Section title={`Cách hóa giải hướng ${direction.name} (${star.name})`} icon="⚗">
          <div className="space-y-2.5">
            {star.remedies.map((r, i) => (
              <div
                key={i}
                className="rounded-xl border border-amber-200/15 bg-emerald-950/50 p-3"
              >
                <p className="mb-1 text-[12.8px] font-bold text-amber-200">{r.title}</p>
                <p className="text-[12.5px] leading-relaxed text-emerald-50/80">{r.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-sky-300/20 bg-sky-400/5 p-3">
            <p className="mb-1 text-[12px] font-bold uppercase tracking-wider text-sky-200/90">
              Dùng hung làm chỗ dựa
            </p>
            <ul className="space-y-1.5">
              {star.best.map((t, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-emerald-50/80">
                  <span className="text-sky-300/70">▸</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* ---------- Bảng ứng dụng 6 loại hướng ---------- */}
      <Section title="Tra nhanh: nên hay không nên" icon="◈">
        <div className="space-y-1.5">
          {star.applications.map((a) => {
            const lv = APP_LEVEL[a.level];
            return (
              <div
                key={a.label}
                className={cn("rounded-xl border px-3 py-2", lv.cls)}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12.8px] font-semibold">{a.label}</span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wide">
                    <span className={cn("h-1.5 w-1.5 rounded-full", lv.dot)} />
                    {lv.label}
                  </span>
                </div>
                <p className="mt-0.5 text-[12px] leading-relaxed opacity-80">{a.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ---------- Gợi ý chuyển hướng ---------- */}
      <Section title="Gợi ý thay thế ngay" icon="⇄">
        <p className="mb-2 text-[12.5px] leading-relaxed text-emerald-100/70">
          Nếu hướng {direction.name} không tốt, gia chủ{" "}
          <b className="text-amber-200">{profile.person.name}</b> (mệnh{" "}
          {profile.kuaInfo.name}) nên ưu tiên:
        </p>
        <div className="grid gap-1.5">
          {profile.good.map((g) => (
            <div
              key={g.dirIndex}
              className="flex items-center justify-between rounded-xl border border-amber-300/25 bg-amber-300/[0.07] px-3 py-2"
            >
              <span className="text-[13px] font-semibold text-amber-100">{g.direction.name}</span>
              <span className="text-[11.5px] text-amber-200/80">
                {g.star.name} · {g.star.grade}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <p className="border-t border-amber-200/10 pt-3 text-[11px] leading-relaxed text-emerald-100/40">
        Kết quả theo phái Bát Trạch (Cung Phi): mệnh {profile.kuaInfo.name} quái số {profile.kua},{" "}
        {profile.kuaInfo.group}, hành{" "}
        <span style={{ color: ELEMENT_COLOR[profile.kuaInfo.element] }}>
          {ELEMENT_NAME[profile.kuaInfo.element]}
        </span>
        . Hướng tốt – xấu là tương đối theo từng người: cùng một hướng, người khác có thể được
        hướng Sinh Khí. Nên kết hợp thêm Huyền Không Phi Tinh và thế đất thực tế trước khi quyết
        định xây cất.
      </p>
    </div>
  );
}

/* ---------------------- mục con ---------------------- */
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-amber-200/15 bg-white/[0.03] p-3.5">
      <h3 className="mb-2.5 flex items-center gap-2 font-serif text-[14px] uppercase tracking-[0.12em] text-amber-200/90">
        <span className="text-amber-300/70">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Spec({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone?: "cat" | "hung";
}) {
  return (
    <div className="rounded-2xl border border-amber-200/12 bg-emerald-950/40 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-emerald-100/45">{label}</p>
      <p
        className={cn(
          "font-serif text-[17px] leading-tight",
          tone === "hung" ? "text-sky-200" : "text-amber-100",
        )}
      >
        {value}
      </p>
      <p className="text-[11px] text-emerald-100/55">{note}</p>
    </div>
  );
}
