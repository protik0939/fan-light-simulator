import React from "react";
import { Slider, Switch } from "@radix-ui/themes";

const LightBulbIcon = ({ power, colorTemp, brightness }: { power: boolean; colorTemp: string; brightness: number }) => (
  <svg width="120" height="180" viewBox="0 0 120 180" className="relative z-10">
    <rect x="45" y="20" width="30" height="10" rx="2" fill="#334155" />
    <rect x="35" y="32" width="50" height="10" rx="3" fill="#334155" />
    <rect x="25" y="44" width="70" height="100" rx="35" fill={power ? colorTemp : "#1E293B"} className="transition-colors duration-300" />
    <rect x="58" y="75" width="4" height="40" rx="2" fill={power ? "#FFFFFF" : "#334155"} className="transition-colors duration-300" style={{ opacity: power ? 0.6 + (brightness / 100) * 0.4 : 1 }} />

    <rect x="25" y="44" width="70" height="100" rx="35" fill="url(#glass-glare)" opacity="0.4" pointerEvents="none" />
    <defs>
      <linearGradient id="glass-glare" x1="25" y1="44" x2="95" y2="144" gradientUnits="userSpaceOnUse" >
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

type Props = {
  power: boolean;
  onPowerChange: (v: boolean) => void;
  brightness: number;
  onBrightnessChange: (n: number) => void;
  colorTemp: string;
  onColorTempChange: (hex: string) => void;
};

export default function LightComponent({ power, onPowerChange, brightness, onBrightnessChange, colorTemp, onColorTempChange }: Readonly<Props>) {
  const colors = [
    { id: "warm", hex: "#FFD68A" },
    { id: "white", hex: "#FFFFFF" },
    { id: "cool", hex: "#BFDBFE" },
    { id: "pink", hex: "#FECACA" },
  ];

  return (
    <div className="flex flex-col justify-between items-center h-full text-white pt-20">
      <div className="relative flex items-center justify-center mt-10">
        <div
          className="absolute w-62.5 h-62.5 rounded-full blur-[70px] transition-all duration-300"
          style={{
            background: colorTemp,
            opacity: power ? (brightness / 100) * 0.7 : 0,
            transform: `scale(${0.7 + (brightness / 100) * 0.5})`,
          }}
        />

        <LightBulbIcon power={power} colorTemp={colorTemp} brightness={brightness} />
      </div>
      <div className="w-full flex justify-center items-center mt-auto mb-10">
        <div className="bg-[#111827] w-100 p-6 rounded-2xl border border-[#1F2937] flex flex-col space-y-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold text-gray-200">Power</h1>
            <Switch style={{ cursor: "pointer" }} checked={power} onCheckedChange={(checked) => onPowerChange(checked)} />
          </div>
          <div className="flex flex-col space-y-3">
            <h1 className="text-sm font-semibold text-gray-200">Color Temperature</h1>
            <div className="flex space-x-3">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onColorTempChange(c.hex)}
                  className={`flex-1 h-12 rounded-lg transition-all border-2 ${
                    colorTemp === c.hex ? "border-white opacity-100 scale-[1.02]" : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <h1 className="text-sm font-semibold text-gray-200">Brightness</h1>
              <h1 className="text-sm font-semibold text-gray-400">{brightness}%</h1>
            </div>
            <div className="relative pt-2 pb-2">
              <div
                className="absolute top-1/2 left-0 h-2 rounded-full -translate-y-1/2 blur-md transition-all"
                style={{
                  width: `${brightness}%`,
                  background: "#3B82F6",
                  opacity: power ? 0.6 : 0.2,
                }}
              />
              <Slider style={{ cursor: "pointer" }} value={[brightness]} max={100} min={0} step={1} onValueChange={(value) => onBrightnessChange(value[0])} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
