import { useMemo, useRef, useState } from "react";
import { InfoForm } from "./components/InfoForm";
import { CompassOverlay, CompassRose } from "./components/CompassRose";
import { VerdictPanel } from "./components/VerdictPanel";
import { CompassLegend, DirectionTable, ProfileSheet } from "./components/ProfileSheet";
import { useCompass } from "./hooks/useCompass";
import {
  DIRECTIONS,
  buildProfile,
  formatHeading,
  mountainRange,
  readHeading,
  type Person,
} from "./lib/fengshui";
import { cn } from "./utils/cn";

type Tab = "compass" | "table" | "profile";

export default function App() {
  const [person, setPerson] = useState<Person | null>(null);
  const [editing, setEditing] = useState(true);
  const [tab, setTab] = useState<Tab>("compass");
  const [zoom, setZoom] = useState(false);
  const roseRef = useRef<HTMLDivElement | null>(null);
  const compass = useCompass({ roseRef });
  const dragRef = useRef<{ a: number } | null>(null);

  const profile = useMemo(() => (person ? buildProfile(person) : null), [person]);
  const reading = useMemo(
    () => (profile ? readHeading(profile, compass.heading) : null),
    [profile, compass.heading],
  );

  /* ---------- chưa có thông tin hoặc đang sửa: màn hình nhập ---------- */
  if (editing || !person || !profile || !reading) {
    return (
      <Shell>
        <InfoForm
          initial={person ?? undefined}
          onSubmit={(p) => {
            setPerson(p);
            setEditing(false);
            setTab("compass");
          }}
          onCancel={person ? () => setEditing(false) : undefined}
        />
      </Shell>
    );
  }

  const isCat = reading.star.quality === "cat";
  const sensorLive = compass.status === "active" && !compass.manualMode;

  /* ---------- kéo mặt la bàn (chế độ thủ công) ---------- */
  const angleOf = (el: HTMLElement, x: number, y: number) => {
    const r = el.getBoundingClientRect();
    const dx = x - (r.left + r.width / 2);
    const dy = y - (r.top + r.height / 2);
    return (Math.atan2(dx, -dy) * 180) / Math.PI;
  };

  return (
    <Shell>
      {/* ================= THANH TRÊN ================= */}
      <header className="sticky top-0 z-20 border-b border-amber-200/10 bg-[#022c22]/85 px-4 py-2.5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-300/40 bg-emerald-900/60 text-lg text-amber-200">
            ☯
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-[15px] leading-tight text-amber-100">
              {profile.person.name}
              <span className="ml-1.5 text-[11.5px] font-sans text-amber-200/60">
                {profile.person.gender === "nam" ? "Nam" : "Nữ"} · {profile.canChi.label}
              </span>
            </p>
            <p className="truncate text-[11px] text-emerald-100/55">
              Mệnh {profile.kuaInfo.name} · Quái {profile.kua} · {profile.kuaInfo.group}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTab("profile")}
            className="shrink-0 rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1.5 text-[11.5px] font-semibold text-amber-200 active:scale-95"
          >
            Hồ sơ
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md px-4 pb-28 pt-4">
        {/* ================= TAB ================= */}
        <div className="mb-4 flex rounded-2xl border border-amber-200/15 bg-emerald-950/50 p-1">
          {(
            [
              { k: "compass", label: "La bàn", icon: "◎" },
              { k: "table", label: "8 hướng", icon: "☰" },
              { k: "profile", label: "Gia chủ", icon: "☖" },
            ] as const
          ).map((t) => (
            <button
              key={t.k}
              type="button"
              onClick={() => setTab(t.k)}
              className={cn(
                "flex-1 rounded-xl py-2 text-[13px] font-semibold transition-all",
                tab === t.k
                  ? "bg-gradient-to-b from-amber-200/25 to-amber-400/10 text-amber-100 shadow-[inset_0_0_0_1px_rgba(212,175,55,.35)]"
                  : "text-emerald-100/55",
              )}
            >
              <span className="mr-1.5">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "compass" && (
          <>
            {/* ================= HUD ================= */}
            <div
              className="mb-3 overflow-hidden rounded-3xl border p-4"
              style={{
                borderColor: isCat ? "rgba(212,175,55,.35)" : "rgba(148,163,255,.25)",
                background: isCat
                  ? "linear-gradient(150deg, rgba(212,175,55,.16), rgba(2,44,34,.6))"
                  : "linear-gradient(150deg, rgba(30,41,90,.32), rgba(2,44,34,.6))",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-100/50">
                    Hướng đang chiếu
                  </p>
                  <p className="font-serif text-[30px] leading-tight text-amber-50">
                    {reading.direction.name}
                  </p>
                  <p className="text-[12px] text-emerald-100/65">
                    Sơn {reading.mountain.name} · cung {reading.direction.trigram} ·{" "}
                    {mountainRange(reading.heading)}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-[27px] leading-none text-amber-200">
                    {formatHeading(reading.heading)}
                  </p>
                  <p className="mt-1 text-[10.5px] uppercase tracking-wider text-emerald-100/45">
                    {compass.manualMode ? "Chế độ kéo tay" : "Cảm biến từ"}
                  </p>
                  <p
                    className={cn(
                      "mt-1 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold",
                      compass.stable ? "bg-emerald-400/15 text-emerald-200" : "bg-amber-400/15 text-amber-200",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        compass.stable ? "bg-emerald-300" : "animate-pulse bg-amber-300",
                      )}
                    />
                    {compass.stable ? "Ổn định" : "Đang xoay"}
                  </p>
                </div>
              </div>

              <div
                key={reading.dirIndex}
                className={cn(
                  "mt-3 flex animate-[fadeIn_.4s_ease-out] items-center justify-between rounded-2xl px-3.5 py-2.5",
                  isCat ? "bg-amber-300/15" : "bg-indigo-400/15",
                )}
              >
                <span
                  className={cn(
                    "font-serif text-[19px] leading-none",
                    isCat ? "text-amber-100" : "text-indigo-100",
                  )}
                >
                  {reading.star.name}
                </span>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider",
                    isCat
                      ? "border-amber-300/50 bg-amber-400/15 text-amber-200"
                      : "border-indigo-300/40 bg-indigo-500/20 text-indigo-200",
                  )}
                >
                  {isCat ? "Hướng tốt" : "Hướng xấu"} · {reading.star.score}/10
                </span>
              </div>
            </div>

            {/* ================= LA BÀN ================= */}
            <div
              className="relative"
              style={{ marginBottom: zoom ? "34%" : undefined }}
            >
              <div
                className={cn(
                  "origin-top transition-transform duration-300 ease-out",
                  zoom ? "scale-[1.36]" : "scale-100",
                )}
              >
              <div
                className="relative aspect-square w-full touch-none select-none rounded-full p-[2px]"
                onPointerDown={(e) => {
                  if (!compass.manualMode) return;
                  const el = e.currentTarget as HTMLElement;
                  dragRef.current = { a: angleOf(el, e.clientX, e.clientY) };
                  el.setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  if (!dragRef.current || !compass.manualMode) return;
                  const el = e.currentTarget as HTMLElement;
                  const a = angleOf(el, e.clientX, e.clientY);
                  let d = a - dragRef.current.a;
                  if (d > 180) d -= 360;
                  if (d < -180) d += 360;
                  compass.rotateBy(d);
                  dragRef.current = { a };
                }}
                onPointerUp={() => (dragRef.current = null)}
                onPointerCancel={() => (dragRef.current = null)}
                style={{
                  background:
                    "conic-gradient(from 180deg, #8a6c14, #f7e7ae, #d4af37, #6b5310, #f2d489, #8a6c14)",
                  boxShadow:
                    "0 18px 50px -18px rgba(0,0,0,.85), 0 0 60px -30px rgba(212,175,55,.6)",
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <div ref={roseRef} className="h-full w-full will-change-transform">
                    <CompassRose kua={profile.kua} />
                  </div>
                  <CompassOverlay />
                </div>
              </div>

                {/* nhãn cố định dưới kim */}
                <div className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 rounded-full border border-amber-300/50 bg-[#022c22]/90 px-3 py-1 text-[11px] font-bold tracking-wider text-amber-200">
                  HƯỚNG NHÌN
                </div>
              </div>

              {/* nút phóng to / thu nhỏ */}
              <button
                type="button"
                onClick={() => setZoom((z) => !z)}
                className="absolute bottom-1 right-1 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/50 bg-[#022c22]/90 text-[17px] text-amber-200 shadow-lg active:scale-95"
                aria-label={zoom ? "Thu nhỏ la bàn" : "Phóng to la bàn"}
              >
                {zoom ? "−" : "＋"}
              </button>
            </div>

            {/* ================= ĐIỀU KHIỂN CẢM BIẾN ================= */}
            {!sensorLive ? (
              <div className="mb-3 rounded-3xl border border-amber-300/25 bg-emerald-950/60 p-4">
                <p className="mb-1 font-serif text-[15px] text-amber-100">
                  Bật la bàn từ tính của điện thoại
                </p>
                <p className="mb-3 text-[12.5px] leading-relaxed text-emerald-100/65">
                  Nhấn nút bên dưới rồi cho phép truy cập cảm biến chuyển động. Giữ điện thoại
                  nằm ngang mặt đất, mặt điện thoại hướng ra trước và xoay người theo hướng cần đo.
                </p>
                <button
                  type="button"
                  onClick={() => compass.start()}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 py-3.5 font-serif text-[15px] font-bold text-emerald-950 active:scale-[0.985]"
                >
                  ⊙ Bật la bàn
                </button>
                <button
                  type="button"
                  onClick={compass.enableManual}
                  className="mt-2 w-full rounded-2xl border border-amber-200/25 py-2.5 text-[12.5px] font-semibold text-amber-200/90 active:scale-[0.985]"
                >
                  Không có cảm biến? Dùng chế độ kéo tay
                </button>
                {compass.status === "denied" && (
                  <p className="mt-2 text-[12px] leading-relaxed text-rose-300">
                    Bạn đã từ chối quyền truy cập. Vào Cài đặt của trình duyệt → quyền chuyển động
                    / Hỗ trợ cảm biến → cho phép, rồi tải lại trang.
                  </p>
                )}
                {compass.status === "unsupported" && (
                  <p className="mt-2 text-[12px] leading-relaxed text-amber-200/80">
                    Thiết bị hoặc trình duyệt không cung cấp cảm biến la bàn. Hãy dùng chế độ kéo
                    tay: kéo mặt la bàn để xoay, hoặc chọn nhanh một hướng bên dưới.
                  </p>
                )}
              </div>
            ) : (
              <div className="mb-3 rounded-3xl border border-emerald-300/20 bg-emerald-950/50 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[12px] text-emerald-100/70">
                    <b className="text-emerald-200">La bàn đang chạy</b>{" "}
                    {compass.source === "ios"
                      ? "· iOS compass"
                      : compass.source === "absolute"
                        ? "· tuyệt đối"
                        : "· tương đối"}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => compass.calibrate(-2)}
                      className="h-8 w-8 rounded-lg border border-amber-200/25 text-[13px] font-bold text-amber-200 active:scale-95"
                    >
                      −
                    </button>
                    <span className="text-[10.5px] uppercase tracking-wider text-emerald-100/45">
                      hiệu chỉnh
                    </span>
                    <button
                      type="button"
                      onClick={() => compass.calibrate(2)}
                      className="h-8 w-8 rounded-lg border border-amber-200/25 text-[13px] font-bold text-amber-200 active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
                {compass.source === "relative" && (
                  <p className="mt-2 text-[11.5px] leading-relaxed text-amber-200/75">
                    Cảm biến đang ở chế độ tương đối (chưa trục Bắc thật). Hãy xoay điện thoại theo
                    hình số 8 vài lần để hiệu chuẩn, hoặc dùng nút − / + để chỉnh lệch.
                  </p>
                )}
              </div>
            )}

            {/* ================= CHỌN NHANH HƯỚNG (chế độ kéo tay) ================= */}
            {compass.manualMode && (
              <div className="mb-3 rounded-3xl border border-amber-200/15 bg-white/[0.03] p-3.5">
                <p className="mb-2 text-[12px] text-emerald-100/65">
                  Kéo mặt la bàn để xoay, hoặc chọn nhanh một hướng:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {DIRECTIONS.map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => compass.setTarget(d.center)}
                      className={cn(
                        "rounded-xl border py-2 text-[12px] font-semibold active:scale-95",
                        reading.dirIndex === d.index
                          ? "border-amber-300/60 bg-amber-300/20 text-amber-100"
                          : "border-amber-200/15 bg-emerald-950/40 text-emerald-100/70",
                      )}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ================= KẾT QUẢ CHI TIẾT ================= */}
            <VerdictPanel profile={profile} reading={reading} />

            {/* ================= CHÚ GIẢI ================= */}
            <div className="mt-3">
              <CompassLegend />
            </div>

            <div className="mt-3 rounded-3xl border border-amber-200/15 bg-white/[0.03] p-4">
              <h3 className="mb-2.5 font-serif text-[15px] uppercase tracking-[0.14em] text-amber-200/90">
                Cách đo đúng chuẩn
              </h3>
              <ol className="space-y-2 text-[12.5px] leading-relaxed text-emerald-100/75">
                <li>
                  <b className="text-amber-200">1.</b> Đứng ở tâm ngôi nhà (hoặc vị trí cần đo),
                  giữ điện thoại nằm ngang, cách xa vật kim loại và đồ điện tử.
                </li>
                <li>
                  <b className="text-amber-200">2.</b> Xoay người để kim chỉ vàng ở mép trên la bàn
                  trùng với hướng cần xem — mặt trước điện thoại chính là hướng nhìn.
                </li>
                <li>
                  <b className="text-amber-200">3.</b> Đọc kết quả: tên sao Bát Trạch hiện lên ngay
                  lập tức cùng giải thích và cách hóa giải cho đúng gia chủ.
                </li>
                <li>
                  <b className="text-amber-200">4.</b> Đo hướng nhà: đứng ở cửa chính, lưng dựa vào
                  cửa, đo theo hướng mặt nhìn ra ngoài. Đo hướng bếp: đứng tại lò, đo theo hướng
                  người nấu. Đo hướng giường: theo hướng đầu giường.
                </li>
              </ol>
            </div>
          </>
        )}

        {tab === "table" && <DirectionTable profile={profile} />}
        {tab === "profile" && <ProfileSheet profile={profile} onEdit={() => setEditing(true)} />}
      </main>

      {/* ================= THÔNG BÁO NHANH ================= */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-5"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <div
          key={`${reading.dirIndex}-${isCat}`}
          className={cn(
            "animate-[slideUp_.35s_ease-out] rounded-full border px-4 py-2 text-[12.5px] font-bold shadow-2xl backdrop-blur-xl",
            isCat
              ? "border-amber-300/50 bg-[#0b3b2c]/90 text-amber-100"
              : "border-indigo-300/40 bg-[#141c33]/90 text-indigo-100",
          )}
        >
          {reading.direction.name} · {reading.star.name} · {isCat ? "CÁT" : "HUNG"}
        </div>
      </div>
    </Shell>
  );
}

/* ---------------------- khung trang ---------------------- */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#022c22] font-sans text-emerald-50 antialiased">
      {/* nền vàng ánh kim */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 70% at 50% -10%, rgba(212,175,55,.18), transparent 55%)," +
            "radial-gradient(90% 60% at 100% 100%, rgba(6,78,59,.85), transparent 60%)," +
            "linear-gradient(180deg, #064e3b 0%, #023a2c 45%, #022c22 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
