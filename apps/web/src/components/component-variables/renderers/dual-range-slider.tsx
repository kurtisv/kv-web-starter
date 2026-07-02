"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface SliderValue {
  min: number;
  max: number;
}

export interface DualRangeSliderProps {
  label: string;
  value: SliderValue;
  min: number;
  max: number;
  step?: number;
  formatValue?: (v: number) => string;
  disabled?: boolean;
  error?: string | null;
  onChange: (next: SliderValue) => void;
  className?: string;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function snapToStep(v: number, step: number, absMin: number, absMax: number): number {
  const snapped = Math.round((v - absMin) / step) * step + absMin;
  return clamp(snapped, absMin, absMax);
}

export function DualRangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  formatValue,
  disabled = false,
  error,
  onChange,
  className,
}: DualRangeSliderProps) {
  const fmt = useMemo(() => formatValue ?? String, [formatValue]);
  const trackRef  = useRef<HTMLDivElement>(null);
  const dragging  = useRef<"min" | "max" | null>(null);

  // Always-fresh props without triggering render-phase ref access.
  // useLayoutEffect runs after DOM paint, before next useEffect, so these are
  // in sync before any event handler reads them.
  const propsRef = useRef({ value, onChange, min, max, step });
  useLayoutEffect(() => {
    propsRef.current = { value, onChange, min, max, step };
  });

  const minPct = ((value.min - min) / (max - min)) * 100;
  const maxPct = ((value.max - min) / (max - min)) * 100;

  // Register mouse + touch handlers once; they read propsRef for fresh values.
  useEffect(() => {
    function valueFromClientX(clientX: number): number {
      const track = trackRef.current;
      if (!track) return propsRef.current.min;
      const rect = track.getBoundingClientRect();
      const pct = clamp((clientX - rect.left) / rect.width, 0, 1);
      const { min: lo, max: hi, step: s } = propsRef.current;
      return snapToStep(pct * (hi - lo) + lo, s, lo, hi);
    }

    function applyThumb(which: "min" | "max", raw: number): void {
      const { value: v, onChange: cb, min: lo, max: hi } = propsRef.current;
      if (which === "min") {
        const next = clamp(raw, lo, v.max);
        if (next !== v.min) cb({ min: next, max: v.max });
      } else {
        const next = clamp(raw, v.min, hi);
        if (next !== v.max) cb({ min: v.min, max: next });
      }
    }

    function onMouseMove(e: MouseEvent) {
      const which = dragging.current;
      if (!which) return;
      applyThumb(which, valueFromClientX(e.clientX));
    }
    function onMouseUp() { dragging.current = null; }
    function onTouchMove(e: TouchEvent) {
      const which = dragging.current;
      if (!which || !e.touches[0]) return;
      e.preventDefault();
      applyThumb(which, valueFromClientX(e.touches[0].clientX));
    }
    function onTouchEnd() { dragging.current = null; }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // ── Handlers wired to React events ──────────────────────────────────────────

  const handleTrackPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const track = trackRef.current;
    if (!track) return;
    const { min: lo, max: hi, step: s, value: v, onChange: cb } = propsRef.current;
    const rect  = track.getBoundingClientRect();
    const pct   = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const snapped = snapToStep(pct * (hi - lo) + lo, s, lo, hi);
    const which = Math.abs(snapped - v.min) <= Math.abs(snapped - v.max) ? "min" : "max";
    dragging.current = which;
    if (which === "min") cb({ min: clamp(snapped, lo, v.max), max: v.max });
    else cb({ min: v.min, max: clamp(snapped, v.min, hi) });
  }, [disabled]);

  const handleMinPointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.stopPropagation();
    dragging.current = "min";
  }, [disabled]);

  const handleMaxPointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.stopPropagation();
    dragging.current = "max";
  }, [disabled]);

  const handleMinKey = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const { min: lo, step: s, value: v, onChange: cb } = propsRef.current;
    const delta = e.shiftKey ? s * 10 : s;
    let raw: number;
    if (e.key === "ArrowLeft"  || e.key === "ArrowDown")  raw = v.min - delta;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") raw = v.min + delta;
    else if (e.key === "Home") raw = lo;
    else if (e.key === "End")  raw = v.max;
    else return;
    e.preventDefault();
    cb({ min: clamp(snapToStep(raw, s, lo, propsRef.current.max), lo, v.max), max: v.max });
  }, [disabled]);

  const handleMaxKey = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const { max: hi, step: s, value: v, onChange: cb } = propsRef.current;
    const delta = e.shiftKey ? s * 10 : s;
    let raw: number;
    if (e.key === "ArrowLeft"  || e.key === "ArrowDown")  raw = v.max - delta;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") raw = v.max + delta;
    else if (e.key === "Home") raw = v.min;
    else if (e.key === "End")  raw = hi;
    else return;
    e.preventDefault();
    cb({ min: v.min, max: clamp(snapToStep(raw, s, propsRef.current.min, hi), v.min, hi) });
  }, [disabled]);

  const handleMinInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const { min: lo, step: s, value: v, onChange: cb } = propsRef.current;
    const parsed = parseFloat(e.target.value);
    if (isNaN(parsed)) return;
    cb({ min: clamp(snapToStep(parsed, s, lo, propsRef.current.max), lo, v.max), max: v.max });
  }, [disabled]);

  const handleMaxInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const { max: hi, step: s, value: v, onChange: cb } = propsRef.current;
    const parsed = parseFloat(e.target.value);
    if (isNaN(parsed)) return;
    cb({ min: v.min, max: clamp(snapToStep(parsed, s, propsRef.current.min, hi), v.min, hi) });
  }, [disabled]);

  // When thumbs collapse to same position, max thumb gets higher z-index so
  // the user can drag it left (revealing the min thumb).
  const isCollapsed = value.min === value.max;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={cn("flex flex-col gap-2.5 min-w-52", className)}>
      <span className="text-xs text-muted-foreground select-none">{label}</span>

      {/* Track + thumbs */}
      <div
        ref={trackRef}
        onPointerDown={handleTrackPointerDown}
        className={cn(
          "relative mx-2 h-6 select-none",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        )}
      >
        {/* Rail — pointer-events-none so clicks bubble up to the track div */}
        <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 rounded-full bg-border pointer-events-none" />

        {/* Active fill */}
        <div
          aria-hidden
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-foreground pointer-events-none"
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
        />

        {/* Min thumb */}
        <button
          type="button"
          role="slider"
          aria-label={`${label} minimum`}
          aria-valuemin={min}
          aria-valuemax={value.max}
          aria-valuenow={value.min}
          aria-valuetext={fmt(value.min)}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onPointerDown={handleMinPointerDown}
          onKeyDown={handleMinKey}
          style={{ left: `${minPct}%`, zIndex: isCollapsed ? 1 : 2 }}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
            "h-[18px] w-[18px] rounded-full",
            "border-2 border-foreground bg-background",
            "shadow-sm hover:shadow-md active:shadow-lg",
            "cursor-grab active:cursor-grabbing",
            "transition-shadow duration-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
            disabled && "cursor-not-allowed",
          )}
        />

        {/* Max thumb */}
        <button
          type="button"
          role="slider"
          aria-label={`${label} maximum`}
          aria-valuemin={value.min}
          aria-valuemax={max}
          aria-valuenow={value.max}
          aria-valuetext={fmt(value.max)}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onPointerDown={handleMaxPointerDown}
          onKeyDown={handleMaxKey}
          style={{ left: `${maxPct}%`, zIndex: 2 }}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
            "h-[18px] w-[18px] rounded-full",
            "border-2 border-foreground bg-background",
            "shadow-sm hover:shadow-md active:shadow-lg",
            "cursor-grab active:cursor-grabbing",
            "transition-shadow duration-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
            disabled && "cursor-not-allowed",
          )}
        />
      </div>

      {/* Value display: when formatValue is provided, show formatted labels pinned to
          opposite edges — fill parent width, never affect it, no layout shift on drag.
          Without formatValue, fall back to editable number inputs. */}
      {formatValue ? (
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground tabular-nums select-none">{fmt(value.min)}</span>
          <span className="text-xs text-muted-foreground tabular-nums select-none">{fmt(value.max)}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value.min}
            min={min}
            max={value.max}
            step={step}
            disabled={disabled}
            aria-label={`${label} minimum`}
            onChange={handleMinInput}
            className="h-8 w-24 text-xs"
          />
          <span className="text-xs text-muted-foreground select-none">–</span>
          <Input
            type="number"
            value={value.max}
            min={value.min}
            max={max}
            step={step}
            disabled={disabled}
            aria-label={`${label} maximum`}
            onChange={handleMaxInput}
            className="h-8 w-24 text-xs"
          />
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
