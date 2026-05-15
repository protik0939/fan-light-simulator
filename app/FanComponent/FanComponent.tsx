import React from "react";
import FanIcon from "./Fan";
import { Slider, Switch } from "@radix-ui/themes";

type Props = {
  startFan: boolean;
  onStartFanChange: (v: boolean) => void;
  speed: number; // 1-2
  onSpeedChange: (n: number) => void;
};

export default function FanComponent({ startFan, onStartFanChange, speed, onSpeedChange }: Readonly<Props>) {
  return (
    <div className="flex flex-col justify-between items-center h-full">
      <div
        className={startFan ? 'animate-spin' : ''}
        style={startFan ? { animationDuration: `${1 / speed}s`, transformOrigin: '50% 50%' } : { transformOrigin: '50% 50%' }}
      >
        <FanIcon />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="bg-[#111827] w-87.5 p-5 rounded-xl border border-slate-700 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white font-semibold text-sm tracking-wide">Power</h1>
            <Switch style={{ cursor: "pointer" }} checked={startFan} onCheckedChange={(checked) => onStartFanChange(checked)} />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="text-white font-semibold text-sm tracking-wide">Speed</h1>
              <h1 className="text-white font-semibold text-sm tracking-wide">{Math.round((speed - 1) * 100)}%</h1>
            </div>
            <Slider style={{ cursor: "pointer" }} value={[speed]} max={2} min={1} step={0.01} onValueChange={(value) => onSpeedChange(value[0])} />
          </div>
        </div>
      </div>
    </div>
  );
}
