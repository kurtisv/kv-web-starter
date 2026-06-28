import * as React from "react";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CarSpec {
  make: string;
  model: string;
  year: number;
  photo: string;
  score: number;
  specs: Record<string, string>;
}

export interface CarSpecComparisonProps {
  cars: CarSpec[];
  specLabels: Record<string, string>;
  winnerKey?: Record<string, number>;
}

export function CarSpecComparison({ cars, specLabels, winnerKey = {} }: CarSpecComparisonProps) {
  const specKeys = Object.keys(specLabels);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-36 border-b bg-muted/50 py-3 pl-4 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Spec
            </th>
            {cars.map((car) => (
              <th key={car.make + car.model} className="border-b bg-muted/50 px-4 py-2 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-20 w-32 overflow-hidden rounded border">
                    <Image
                      src={car.photo}
                      alt={`${car.make} ${car.model}`}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{car.make}</p>
                    <p className="font-semibold">{car.model}</p>
                    <p className="text-xs text-muted-foreground">{car.year}</p>
                  </div>
                  <Badge variant="soft" size="sm">
                    <Trophy className="h-3 w-3 text-warning" />
                    {car.score}/10
                  </Badge>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specKeys.map((key, rowIdx) => (
            <tr key={key} className={cn(rowIdx % 2 === 0 ? "bg-background" : "bg-muted/30")}>
              <td className="border-b py-3 pl-4 text-xs font-medium text-muted-foreground">
                {specLabels[key]}
              </td>
              {cars.map((car, carIdx) => {
                const isWinner = winnerKey[key] === carIdx;
                return (
                  <td
                    key={car.make + car.model}
                    className={cn(
                      "border-b px-4 py-3 text-center font-medium",
                      isWinner && "text-success"
                    )}
                  >
                    {isWinner && (
                      <Trophy className="mr-1 inline h-3 w-3 text-warning" />
                    )}
                    {car.specs[key] ?? "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
