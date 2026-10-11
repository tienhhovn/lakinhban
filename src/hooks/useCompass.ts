import { useCallback, useEffect, useRef, useState } from "react";
import { angleDiff, normalizeDeg } from "../lib/fengshui";

export type CompassStatus = "idle" | "requesting" | "active" | "denied" | "unsupported";
export type CompassSource = "ios" | "absolute" | "relative" | "manual";

interface Options {
  /** thẻ div chứa mặt la bàn, sẽ được quay trực tiếp qua style (mượt, không re-render) */
  roseRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Đọc hướng la bàn từ cảm biến của điện thoại.
 * - iOS: DeviceOrientationEvent.requestPermission() + webkitCompassHeading
 * - Android/Chrome: deviceorientationabsolute → heading = 360 - alpha
 * - Thiết bị không có cảm biến: chế độ kéo tay (manual)
 * Mặt la bàn được quay bằng transform trực tiếp trong vòng rAF để chuyển động mượt.
 */
export function useCompass({ roseRef }: Options) {
  const [status, setStatus] = useState<CompassStatus>("idle");
  const [source, setSource] = useState<CompassSource>("manual");
  const [heading, setHeading] = useState(0);
  const [stable, setStable] = useState(true);
  const [manualMode, setManualMode] = useState(false);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const emitRef = useRef(0);
  const stableRef = useRef(true);
  const sourceRef = useRef<CompassSource>("manual");
  const manualRef = useRef(false);
  const offsetRef = useRef(0);
  const gotEventRef = useRef(false);
  /** đã nhận được dữ liệu la bàn tuyệt đối (iOS compass hoặc absolute === true) */
  const lockedRef = useRef(false);

  /* ---------- vòng lặp làm mượt + quay mặt la bàn ---------- */
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const diff = angleDiff(targetRef.current, currentRef.current);
      if (Math.abs(diff) > 60) currentRef.current = targetRef.current;
      else currentRef.current = normalizeDeg(currentRef.current + diff * 0.16);

      const el = roseRef.current;
      if (el) el.style.transform = `rotate(${-currentRef.current}deg)`;

      const now = performance.now();
      const st = Math.abs(diff) < 1.2;
      if (st !== stableRef.current) {
        stableRef.current = st;
        setStable(st);
      }
      if (now - emitRef.current > 70) {
        emitRef.current = now;
        setHeading(Math.round(currentRef.current * 10) / 10);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [roseRef]);

  /* ---------- nhận sự kiện cảm biến ---------- */
  useEffect(() => {
    const handler = (ev: DeviceOrientationEvent) => {
      const e = ev as DeviceOrientationEvent & { webkitCompassHeading?: number };
      const screenAngle =
        (typeof window !== "undefined" && window.screen?.orientation?.angle) || 0;

      /* iOS: la bàn thật, ưu tiên cao nhất */
      if (typeof e.webkitCompassHeading === "number" && !Number.isNaN(e.webkitCompassHeading)) {
        gotEventRef.current = true;
        setStatus("active");
        lockedRef.current = true;
        if (sourceRef.current !== "ios") {
          sourceRef.current = "ios";
          setSource("ios");
        }
        targetRef.current = normalizeDeg(e.webkitCompassHeading + offsetRef.current);
        return;
      }

      if (typeof e.alpha !== "number" || e.alpha === null) return;
      const isAbs = (ev as DeviceOrientationEvent & { absolute?: boolean }).absolute === true;

      /* đã có dữ liệu tuyệt đối thì bỏ qua dữ liệu tương đối */
      if (lockedRef.current && !isAbs) return;
      if (isAbs) lockedRef.current = true;

      gotEventRef.current = true;
      setStatus("active");
      const src: CompassSource = isAbs ? "absolute" : "relative";
      if (sourceRef.current !== src) {
        sourceRef.current = src;
        setSource(src);
      }
      targetRef.current = normalizeDeg(360 - e.alpha + screenAngle + offsetRef.current);
    };

    const supported = typeof window !== "undefined" && "DeviceOrientationEvent" in window;
    if (supported) {
      if ("ondeviceorientationabsolute" in window) {
        window.addEventListener("deviceorientationabsolute", handler as EventListener, true);
      }
      window.addEventListener("deviceorientation", handler as EventListener, true);
    }
    return () => {
      if (supported) {
        if ("ondeviceorientationabsolute" in window) {
          window.removeEventListener("deviceorientationabsolute", handler as EventListener, true);
        }
        window.removeEventListener("deviceorientation", handler as EventListener, true);
      }
    };
  }, []);

  /* ---------- bắt đầu (cần thao tác chạm của người dùng trên iOS) ---------- */
  const start = useCallback(async () => {
    setManualMode(false);
    manualRef.current = false;
    const DOE = (typeof window !== "undefined" ? (window as unknown as { DeviceOrientationEvent?: { requestPermission?: () => Promise<string> } }).DeviceOrientationEvent : undefined);
    if (!DOE) {
      setStatus("unsupported");
      return;
    }
    if (typeof DOE.requestPermission === "function") {
      setStatus("requesting");
      try {
        const res = await DOE.requestPermission();
        if (res !== "granted") {
          setStatus("denied");
          return;
        }
      } catch {
        setStatus("denied");
        return;
      }
    }
    setStatus("active");
    // nếu sau 2.5s không có dữ liệu cảm biến thì chuyển sang chế độ kéo tay
    window.setTimeout(() => {
      if (!gotEventRef.current) {
        setStatus("unsupported");
        setManualMode(true);
        manualRef.current = true;
      }
    }, 2500);
  }, []);

  /* ---------- chế độ kéo tay khi không có cảm biến ---------- */
  const enableManual = useCallback(() => {
    manualRef.current = true;
    setManualMode(true);
    sourceRef.current = "manual";
    setSource("manual");
    setStatus("idle");
  }, []);

  const rotateBy = useCallback((delta: number) => {
    targetRef.current = normalizeDeg(targetRef.current + delta);
  }, []);

  const setTarget = useCallback((deg: number) => {
    targetRef.current = normalizeDeg(deg);
  }, []);

  /** hiệu chỉnh độ lệch (khi la bàn lệch so với hướng thật) */
  const calibrate = useCallback((delta: number) => {
    offsetRef.current = normalizeDeg(offsetRef.current + delta);
    targetRef.current = normalizeDeg(targetRef.current + delta);
  }, []);

  const resetCalibration = useCallback(() => {
    offsetRef.current = 0;
  }, []);

  return {
    heading,
    status,
    source,
    stable,
    manualMode,
    start,
    enableManual,
    rotateBy,
    setTarget,
    calibrate,
    resetCalibration,
  };
}
