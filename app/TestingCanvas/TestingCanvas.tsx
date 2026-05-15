import React, { useState } from "react";
import FanComponent from "../FanComponent/FanComponent";
import LightComponent from "../LightComponent/LightCompoennt";
import { type Preset } from "../types";

type Props = {
  canvas: "fan" | "light" | null;
  setCanvas: React.Dispatch<React.SetStateAction<"fan" | "light" | null>>;
  addPreset: (name: string) => void;
  clearCanvas: () => void;
  fanOn: boolean;
  setFanOn: (v: boolean) => void;
  fanSpeed: number;
  setFanSpeed: (n: number) => void;
  lightOn: boolean;
  setLightOn: (v: boolean) => void;
  brightness: number;
  setBrightness: (n: number) => void;
  colorTemp: string;
  setColorTemp: (hex: string) => void;
  applyPreset: (p: Preset) => void;
};

const isPreset = (value: unknown): value is Preset => {
  if (typeof value !== "object" || value === null) return false;
  const maybePreset = value as Partial<Preset>;
  return (
    typeof maybePreset.id === "string" &&
    typeof maybePreset.name === "string" &&
    (maybePreset.type === "fan" || maybePreset.type === "light")
  );
};

const parsePreset = (json: string): Preset | null => {
  try {
    const parsed: unknown = JSON.parse(json);
    return isPreset(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export default function TestingCanvas({
  canvas,
  setCanvas,
  addPreset,
  clearCanvas,
  fanOn,
  setFanOn,
  fanSpeed,
  setFanSpeed,
  lightOn,
  setLightOn,
  brightness,
  setBrightness,
  colorTemp,
  setColorTemp,
  applyPreset,
}: Readonly<Props>) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [presetName, setPresetName] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const presetJson = e.dataTransfer.getData("application/x-preset");
    if (presetJson) {
      const pr = parsePreset(presetJson);
      if (pr) {
        applyPreset(pr);
        setIsDragOver(false);
        return;
      }
    }
    const type = e.dataTransfer.getData("application/x-device-type") as
      | "fan"
      | "light"
      | "";
    if (type === "fan" || type === "light") {
      setCanvas(type);
    }
    setIsDragOver(false);
  };

  const openSaveModal = () => {
    if (!canvas) return;
    setPresetName("");
    setShowModal(true);
  };

  const savePreset = () => {
    if (!presetName || !canvas) return;
    addPreset(presetName);
    setShowModal(false);
  };

  const hasCanvas = canvas !== null;

  let canvasContent: React.ReactNode;
  if (canvas === "fan") {
    canvasContent = (
      <div className="w-full h-full text-md bg-[#090F1D] rounded-lg border border-solid border-[#101828] text-[#62748e]">
        <FanComponent
          startFan={fanOn}
          onStartFanChange={setFanOn}
          speed={fanSpeed}
          onSpeedChange={setFanSpeed}
        />
      </div>
    );
  } else if (canvas === "light") {
    canvasContent = (
      <div className="w-full h-full bg-[#090F1D] rounded-lg border border-solid border-[#101828] flex items-center justify-center text-[#62748e]">
        <LightComponent
          power={lightOn}
          onPowerChange={setLightOn}
          brightness={brightness}
          onBrightnessChange={setBrightness}
          colorTemp={colorTemp}
          onColorTempChange={setColorTemp}
        />
      </div>
    );
  } else {
    canvasContent = (
      <div className="w-full h-full bg-[#090F1D] rounded-lg border border-solid border-[#101828] flex items-center justify-center text-[#62748e]">
        {isDragOver ? (
          <div className="text-green-400 font-semibold">
            Release to add device!
          </div>
        ) : (
          "Drag anything here"
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="flex items-end justify-between w-full h-1/20">
        <div className="w-full flex items-end pl-5">TestingCanvas</div>
        {hasCanvas && (
          <div className="absolute right-4 flex items-center gap-3">
            <button
              onClick={() => {
                clearCanvas();
              }}
              className="bg-[#0f1724] text-slate-300 px-3 py-1 rounded-lg border border-[#22303b] hover:bg-slate-800"
            >
              Clear
            </button>
            <button
              onClick={openSaveModal}
              className={`bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-500 ${hasCanvas ? "" : "opacity-50 cursor-not-allowed"}`}
              disabled={!hasCanvas}
            >
              Save Preset
            </button>
          </div>
        )}
      </div>
      <div className="relative w-full h-19/20">
        <section
          className={`w-full h-full flex items-center justify-center p-4 sm:p-5 ${isDragOver ? "border-2 border-green-500 rounded-lg" : ""}`}
          aria-label="Testing canvas drop zone"
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {canvasContent}
        </section>

        {showModal && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-[#0b1220] rounded-xl w-105 p-6 border border-[#17202b]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">Give me a name</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400"
                >
                  ✕
                </button>
              </div>
              <input
                autoFocus
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Preset name"
                className="w-full p-3 rounded-md bg-[#0f1724] border border-[#1f2933] text-white mb-3"
              />
              <p className="text-sm text-slate-400 mb-4">
                By adding this effect as a preset you can reuse this anytime.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md bg-[#0f1724] text-slate-300 border border-[#22303b]"
                >
                  Cancel
                </button>
                <button
                  onClick={savePreset}
                  disabled={!presetName || !hasCanvas}
                  className={`px-4 py-2 rounded-md bg-blue-600 text-white ${!presetName || !hasCanvas ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500"}`}
                >
                  Save Preset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
