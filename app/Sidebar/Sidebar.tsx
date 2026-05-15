'use client'
import React from 'react'
import { type Preset } from '../types'
import Image from 'next/image'

type CanvasSetter = React.Dispatch<React.SetStateAction<"fan" | "light" | null>>

const FanIconSmall = "/fan.svg";
const LightIconSmall = "/light.svg";

type Props = {
  setCanvas: CanvasSetter
  presets?: Preset[]
  applyPreset?: (p: Preset) => void
}

export default function Sidebar({ setCanvas, presets, applyPreset }: Readonly<Props>) {

  const handleDragStart = (e: React.DragEvent, type: "fan" | "light") => {
    e.dataTransfer.setData('application/x-device-type', type)
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div className="w-full p-5 ml-2 flex flex-col justify-center items-center">
      <div className="w-full text-left">
        <div className="mt-4 text-slate-300">
          Devices (2)
        </div>
        <div>
          <button
            type="button"
            draggable
            onDragStart={(e) => handleDragStart(e, 'fan')}
            onClick={() => setCanvas("fan")}
            className="bg-slate-800 text-slate-300 w-11/12 p-2 mt-2 rounded-lg border border-[#364153] hover:bg-slate-700 cursor-pointer transition-all hover:text-white flex items-center gap-3"
          >
            <Image src={FanIconSmall} alt="Fan" width={20} height={20} />
            <span>Living Room Fan</span>
          </button>
        </div>
        <div>
          <button
            type="button"
            draggable
            onDragStart={(e) => handleDragStart(e, 'light')}
            onClick={() => setCanvas("light")}
            className="bg-slate-800  text-slate-300 w-11/12 p-2 mt-2 rounded-lg border border-[#364153] hover:bg-slate-700 cursor-pointer transition-all hover:text-white flex items-center gap-3"
          >
            <Image src={LightIconSmall} alt="Light" width={20} height={20} />
            <span>Kitchen Light</span>
          </button>
        </div>
        <div className="mt-5 text-slate-300">Saved Presets ({presets?.length ?? 0})</div>
        <div>
          {presets && presets.length > 0 ? (
            presets.map((pr) => (
              <button
                type="button"
                  key={pr.id}
                  draggable
                  onDragStart={(e) => { e.dataTransfer.setData('application/x-preset', JSON.stringify(pr)); e.dataTransfer.effectAllowed = 'copy' }}
                  onClick={() => applyPreset ? applyPreset(pr) : setCanvas(pr.type)}
                  className="bg-slate-800 text-slate-300 w-11/12 p-2 mt-2 rounded-lg border border-[#364153] hover:bg-slate-700 cursor-pointer transition-all hover:text-white flex items-center gap-3"
                >
                  <Image src={pr.type === 'fan' ? FanIconSmall : LightIconSmall} alt={pr.type} width={20} height={20} />
                  <span>{pr.name}</span>
                </button>
            ))
          ) : (
            <button type="button" disabled className="bg-transparent w-11/12 p-2 mt-2 rounded-lg border border-[#364153] text-[#E5E7EB]/40">
              Nothing added yet
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
