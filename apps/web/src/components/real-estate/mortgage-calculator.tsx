"use client";

import * as React from "react";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function calcMonthly(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0 || months === 0) return principal / Math.max(months, 1);
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function fmt(n: number) {
  return formatCurrency(Math.round(n * 100), {
    currency: "EUR",
    locale: "fr-FR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

interface SliderRowProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}

function SliderRow({ id, label, min, max, step, value, onChange }: SliderRowProps) {
  return (
    <div className="grid gap-1">
      <div className="flex justify-between text-xs">
        <label htmlFor={id} className="text-muted-foreground">{label}</label>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}

interface MortgageCalculatorProps {
  defaultPrice?: number;
  className?: string;
}

export function MortgageCalculator({
  defaultPrice = 400000,
  className,
}: MortgageCalculatorProps) {
  const [price, setPrice] = React.useState(defaultPrice);
  const [downPct, setDownPct] = React.useState(20);
  const [rate, setRate] = React.useState(3.5);
  const [years, setYears] = React.useState(20);

  const principal = price * (1 - downPct / 100);
  const monthly = calcMonthly(principal, rate, years * 12);
  const totalCost = monthly * years * 12;
  const totalInterest = totalCost - principal;

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Calculator className="h-4 w-4" />
          Simulateur de pret
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3">
          <SliderRow
            id="mc-price"
            label={`Prix du bien : ${fmt(price)}`}
            min={50000}
            max={2000000}
            step={5000}
            value={price}
            onChange={setPrice}
          />
          <SliderRow
            id="mc-down"
            label={`Apport : ${downPct}%`}
            min={0}
            max={50}
            step={5}
            value={downPct}
            onChange={setDownPct}
          />
          <SliderRow
            id="mc-rate"
            label={`Taux : ${rate.toFixed(1)}%`}
            min={0.5}
            max={8}
            step={0.1}
            value={rate}
            onChange={(v) => setRate(Math.round(v * 10) / 10)}
          />
          <SliderRow
            id="mc-years"
            label={`Duree : ${years} ans`}
            min={5}
            max={30}
            step={5}
            value={years}
            onChange={setYears}
          />
        </div>

        <div className="grid gap-2 border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Mensualite estimee</span>
            <span className="text-xl font-semibold text-primary">
              {fmt(monthly)}/mois
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Montant emprunte</span>
            <span>{fmt(principal)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Cout total des interets</span>
            <span>{fmt(totalInterest)}</span>
          </div>
          <p className="pt-1 text-[10px] text-muted-foreground">
            Simulation indicative. Consultez un courtier pour une offre personnalisee.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
