export type DeviceType = "fan" | "light";

export type FanSettings = {
  startFan: boolean;
  speed: number;
};

export type LightSettings = {
  power: boolean;
  brightness: number;
  colorTemp: string;
};

export type Preset =
  | {
      id: string;
      name: string;
      type: "fan";
      settings: FanSettings;
    }
  | {
      id: string;
      name: string;
      type: "light";
      settings: LightSettings;
    };
