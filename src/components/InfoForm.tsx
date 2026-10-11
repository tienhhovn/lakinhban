import { useMemo, useState } from "react";
import {
  DIRECTIONS,
  buildProfile,
  canChiOf,
  daysInMonth,
  isBeforeLapXuan,
  type Person,
} from "../lib/fengshui";
import { ELEMENT_COLOR } from "../lib/elements";
import { cn } from "../utils/cn";

const MONTHS = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

interface Props {
  initial?: Person;
  onSubmit: (p: Person) => void;
  onCancel?: () => void;
}

export function InfoForm({ initial, onSubmit, onCancel }: Props) {
  const nowYear = new Date().getFullYear();
  const [name, setName] = useState(initial?.name ?? "");
  const [day, setDay] = useState(initial?.day ?? 1);
  const [month, setMonth] = useState(initial?.month ?? 1);
  const [year, setYear] = useState(initial?.year ?? 1990);
  const [gender, setGender] = useState<Person["gender"]>(initial?.gender ?? "nam");
  const [beforeLapXuan, setBeforeLapXuan] = useState(
    initial?.beforeLapXuan ?? isBeforeLapXuan(initial?.day ?? 1, initial?.month ?? 1),
  );

  const maxDay = daysInMonth(month, year);
  const invalidDay = day > maxDay;
  const autoLapXuan = isBeforeLapXuan(day, month);

  const preview = useMemo(() => {
    const p: Person = {
      name: name.trim() || "Gia chủ",
      day: Math.min(day, maxDay),
      month,
      year,
      gender,
      beforeLapXuan,
    };
    return buildProfile(p);
  }, [name, day, maxDay, month, year, gender, beforeLapXuan]);

  const best = preview.best;
  const worst = preview.worst;

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-16 pt-10">
      {/* ---------- Tiêu đề ---------- */}
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-amber-300/40 bg-gradient-to-br from-emerald-800/70 to-emerald-950/80 shadow-[0_0_40px_-8px_rgba(212,175,55,0.45)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/50">
            <span className="text-3xl leading-none text-amber-200">☯</span>
          </div>
        </div>
        <h1 className="font-serif text-[27px] leading-tight tracking-tight text-transparent bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500 bg-clip-text">
          La Bàn Phong Thủy
        </h1>
        <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.22em] text-amber-200/60">
          Bát Trạch · Hướng Nhà
        </p>
        <p className="mx-auto mt-3 max-w-xs text-[13px] leading-relaxed text-emerald-100/70">
          Nhập ngày sinh &amp; giới tính để xác định cung mệnh. Sau đó chỉ cần xoay điện thoại,
          la bàn sẽ lập tức báo tốt – xấu và cách hóa giải chi tiết theo đúng gia chủ.
        </p>
      </div>

      {/* ---------- Form ---------- */}
      <div className="rounded-3xl border border-amber-200/20 bg-white/[0.045] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-300/40" />
          <h2 className="font-serif text-[15px] uppercase tracking-[0.18em] text-amber-200/90">
            Thông tin gia chủ
          </h2>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-300/40" />
        </div>

        {/* Họ tên */}
        <label className="mb-4 block">
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-emerald-100/60">
            Họ tên gia chủ
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: Nguyễn Văn A"
            className="w-full rounded-xl border border-amber-200/20 bg-emerald-950/50 px-4 py-3 text-[15px] text-amber-50 placeholder:text-emerald-100/30 focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/20"
          />
        </label>

        {/* Ngày sinh */}
        <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-emerald-100/60">
          Ngày sinh (dương lịch)
        </span>
        <div className="mb-2 grid grid-cols-3 gap-2.5">
          <Field label="Ngày">
            <select
              value={day}
              onChange={(e) => {
                const v = Number(e.target.value);
                setDay(v);
                setBeforeLapXuan(isBeforeLapXuan(v, month));
              }}
              className={selCls}
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d} className="bg-emerald-950">
                  {d}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Tháng">
            <select
              value={month}
              onChange={(e) => {
                const v = Number(e.target.value);
                setMonth(v);
                setBeforeLapXuan(isBeforeLapXuan(day, v));
              }}
              className={selCls}
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1} className="bg-emerald-950">
                  {m}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Năm">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className={selCls}
            >
              {Array.from({ length: nowYear - 1919 }, (_, i) => nowYear - i).map((y) => (
                <option key={y} value={y} className="bg-emerald-950">
                  {y}
                </option>
              ))}
            </select>
          </Field>
        </div>
        {invalidDay && (
          <p className="mb-3 text-[12px] text-rose-300">
            Tháng {month}/{year} chỉ có {maxDay} ngày — hệ thống sẽ tự lấy ngày {maxDay}.
          </p>
        )}

        {/* Giới tính */}
        <span className="mb-1.5 mt-4 block text-[12px] font-semibold uppercase tracking-wider text-emerald-100/60">
          Giới tính
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {([
            { v: "nam", label: "Nam", icon: "☰", note: "Dương" },
            { v: "nu", label: "Nữ", icon: "☷", note: "Âm" },
          ] as const).map((g) => (
            <button
              key={g.v}
              type="button"
              onClick={() => setGender(g.v)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl border px-3 py-3.5 text-[15px] font-semibold transition-all",
                gender === g.v
                  ? "border-amber-300/70 bg-gradient-to-br from-amber-300/25 to-amber-500/10 text-amber-100 shadow-[0_0_22px_-6px_rgba(212,175,55,0.6)]"
                  : "border-amber-200/15 bg-emerald-950/40 text-emerald-100/60 active:scale-[0.98]",
              )}
            >
              <span className="text-lg leading-none">{g.icon}</span>
              {g.label}
              <span className="text-[11px] font-normal opacity-60">{g.note}</span>
            </button>
          ))}
        </div>

        {/* Lập xuân */}
        <button
          type="button"
          onClick={() => setBeforeLapXuan((s) => !s)}
          className="mt-4 flex w-full items-start gap-3 rounded-xl border border-amber-200/15 bg-emerald-950/30 p-3 text-left"
        >
          <span
            className={cn(
              "mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors",
              beforeLapXuan ? "bg-amber-400/80" : "bg-emerald-100/20",
            )}
          >
            <span
              className={cn(
                "h-4 w-4 rounded-full bg-emerald-950 transition-transform",
                beforeLapXuan ? "translate-x-4" : "translate-x-0",
              )}
            />
          </span>
          <span className="text-[12px] leading-relaxed text-emerald-100/70">
            <b className="text-amber-200/90">Sinh trước Tiết Lập Xuân</b> (trước khoảng 4/2 dương lịch).
            Khi bật, tuổi tính theo năm âm lịch trước đó — chuẩn cách tính cung phi Bát Trạch.
            {autoLapXuan && <i className="block text-amber-300/70">Ngày bạn chọn nên bật mục này.</i>}
          </span>
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="mt-3 w-full rounded-2xl border border-amber-200/25 py-2.5 text-[13px] font-semibold text-amber-200/90 active:scale-[0.985]"
          >
            ← Quay lại la bàn
          </button>
        )}

        {/* Nút khởi động */}
        <button
          type="button"
          onClick={() =>
            onSubmit({
              name: name.trim() || "Gia chủ",
              day: Math.min(day, maxDay),
              month,
              year,
              gender,
              beforeLapXuan,
            })
          }
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 py-4 font-serif text-[16px] font-bold tracking-wide text-emerald-950 shadow-lg shadow-amber-900/40 transition-transform active:scale-[0.985]"
        >
          ☯ Kích hoạt la bàn
        </button>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-emerald-100/40">
          Thông tin chỉ được dùng để tính cung phi ngay trên máy bạn, không gửi đi đâu.
        </p>
      </div>

      {/* ---------- Xem trước cung mệnh ---------- */}
      <div className="mt-5 rounded-3xl border border-amber-200/15 bg-gradient-to-br from-emerald-900/40 to-emerald-950/50 p-5">
        <h3 className="mb-3 font-serif text-[15px] uppercase tracking-[0.15em] text-amber-200/90">
          Cung mệnh của bạn
        </h3>
        <div className="mb-4 flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border text-3xl"
            style={{
              borderColor: ELEMENT_COLOR[preview.kuaInfo.element] + "66",
              background: ELEMENT_COLOR[preview.kuaInfo.element] + "1a",
              color: ELEMENT_COLOR[preview.kuaInfo.element],
            }}
          >
            {preview.kuaInfo.glyph}
          </div>
          <div className="min-w-0">
            <p className="font-serif text-xl text-amber-100">
              {preview.kuaInfo.name}
              <span className="ml-2 text-[13px] font-sans font-medium text-amber-200/70">
                Quái số {preview.kua}
              </span>
            </p>
            <p className="text-[12.5px] text-emerald-100/70">
              {preview.kuaInfo.group} · hành {preview.kuaInfo.element}
            </p>
            <p className="text-[12.5px] text-emerald-100/60">
              Tuổi {preview.canChi.label} · {preview.canChi.napAm}
            </p>
          </div>
        </div>
        <p className="text-[12.5px] leading-relaxed text-emerald-100/60">{preview.kuaInfo.desc}</p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <MiniCard
            title="Hướng tốt nhất"
            main={best.direction.name}
            sub={best.star.name}
            tone="good"
          />
          <MiniCard
            title="Hướng xấu nhất"
            main={worst.direction.name}
            sub={worst.star.name}
            tone="bad"
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {preview.ranked.map((r) => (
            <div
              key={r.dirIndex}
              className="flex items-center justify-between rounded-lg border border-amber-200/10 bg-emerald-950/40 px-2.5 py-1.5"
            >
              <span className="text-[11.5px] text-emerald-100/80">{r.direction.name}</span>
              <span
                className={cn(
                  "text-[11.5px] font-semibold",
                  r.star.quality === "cat" ? "text-amber-200" : "text-sky-300/80",
                )}
              >
                {r.star.name}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-emerald-100/40">
          Năm sinh dùng để tính cung phi là {preview.effectiveYear} (
          {canChiOf(preview.effectiveYear).label}). Bảng trên xếp hạng cả {DIRECTIONS.length} hướng
          theo Bát Trạch chuẩn: 4 hướng cát (đỏ / vàng) và 4 hướng hung (xanh thẫm).
        </p>
      </div>
    </div>
  );
}

const selCls =
  "w-full appearance-none rounded-xl border border-amber-200/20 bg-emerald-950/50 px-3 py-3 text-center text-[15px] font-medium text-amber-50 focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-center text-[11px] uppercase tracking-wider text-emerald-100/40">
        {label}
      </span>
      {children}
    </label>
  );
}

function MiniCard({
  title,
  main,
  sub,
  tone,
}: {
  title: string;
  main: string;
  sub: string;
  tone: "good" | "bad";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3",
        tone === "good"
          ? "border-amber-300/30 bg-amber-300/10"
          : "border-sky-300/20 bg-sky-400/5",
      )}
    >
      <p className="text-[10.5px] uppercase tracking-wider text-emerald-100/50">{title}</p>
      <p
        className={cn(
          "font-serif text-lg leading-tight",
          tone === "good" ? "text-amber-100" : "text-sky-200",
        )}
      >
        {main}
      </p>
      <p className={cn("text-[11.5px]", tone === "good" ? "text-amber-200/70" : "text-sky-300/70")}>
        {sub}
      </p>
    </div>
  );
}
