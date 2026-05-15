'use client'
import Sidebar from "./Sidebar/Sidebar";
import TestingCanvas from "./TestingCanvas/TestingCanvas";
import { useState } from "react";
import { type Preset } from "./types";

export default function Home() {


  const [canvas, setCanvas] = useState<"fan" | "light" | null>(null);
  // device states lifted to page so presets can capture/restore them
  const [fanOn, setFanOn] = useState(false)
  const [fanSpeed, setFanSpeed] = useState(1)

  const [lightOn, setLightOn] = useState(false)
  const [brightness, setBrightness] = useState(100)
  const [colorTemp, setColorTemp] = useState('#FCD34D')

  const [presets, setPresets] = useState<Preset[]>([]);

  const savePresetInternal = (name: string) => {
    if (!canvas) return
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`
    if (canvas === "fan") {
      const preset: Preset = {
        id,
        name,
        type: "fan",
        settings: { startFan: fanOn, speed: fanSpeed },
      }
      setPresets((p) => [preset, ...p])
      return
    }
    const preset: Preset = {
      id,
      name,
      type: "light",
      settings: { power: lightOn, brightness, colorTemp },
    }
    setPresets((p) => [preset, ...p])
  }

  const clearCanvas = () => setCanvas(null)

  const applyPreset = (preset: Preset) => {
    setCanvas(preset.type)
    if (preset.type === 'fan') {
      setFanOn(preset.settings.startFan)
      setFanSpeed(preset.settings.speed)
    } else {
      setLightOn(preset.settings.power)
      setBrightness(preset.settings.brightness)
      setColorTemp(preset.settings.colorTemp)
    }
  }

  return (
    <div className="flex w-full h-screen">
      <div className="w-80 md:w-80 h-screen border-r border-solid border-[#1E2939] bg-[#101828]">
        <Sidebar setCanvas={setCanvas} presets={presets} applyPreset={applyPreset} />
      </div >
      <div className="w-full h-screen bg-[#030712]">
        <TestingCanvas
          canvas={canvas}
          setCanvas={setCanvas}
          addPreset={savePresetInternal}
          clearCanvas={clearCanvas}
          // pass device state and setters
          fanOn={fanOn}
          setFanOn={setFanOn}
          fanSpeed={fanSpeed}
          setFanSpeed={setFanSpeed}
          lightOn={lightOn}
          setLightOn={setLightOn}
          brightness={brightness}
          setBrightness={setBrightness}
          colorTemp={colorTemp}
          setColorTemp={setColorTemp}
          applyPreset={applyPreset}
        />
      </div>
    </div>
  );
}
