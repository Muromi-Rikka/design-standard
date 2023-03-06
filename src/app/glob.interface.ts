interface CommonConfig {
  title: string;
  type: string;
}
export interface ColorConfigItem {
  color: `#${string[6]}`;
  label: string;
}

export interface ColorConfig extends CommonConfig {
  list: Array<ColorConfigItem>;
}

export type Configs = Array<ColorConfig>;
