import { MaterialSymbols_600SemiBold } from "@expo-google-fonts/material-symbols/600SemiBold";
import { MaterialSymbols_600SemiBold_Filled } from "@expo-google-fonts/material-symbols/600SemiBold_Filled";
import { MaterialSymbols_700Bold } from "@expo-google-fonts/material-symbols/700Bold";
import { MaterialSymbols_700Bold_Filled } from "@expo-google-fonts/material-symbols/700Bold_Filled";
import type { SymbolViewProps } from "expo-symbols";

import type { Weight } from "./symbol-weights";

type AndroidSymbolWeight = Extract<SymbolViewProps["weight"], { android: unknown }>["android"];

const font = (name: string, file: number): AndroidSymbolWeight => ({ name, font: file });

const semibold = { outline: font("MaterialSymbols_600SemiBold", MaterialSymbols_600SemiBold), filled: font("MaterialSymbols_600SemiBold_Filled", MaterialSymbols_600SemiBold_Filled) };
const bold = { outline: font("MaterialSymbols_700Bold", MaterialSymbols_700Bold), filled: font("MaterialSymbols_700Bold_Filled", MaterialSymbols_700Bold_Filled) };

/**
 * Android draws icons from the Material Symbols font, whose default face is outline only.
 * Each font is over a megabyte, so the app ships two weights: medium shares semibold, which looks the same at icon sizes.
 */
export function androidSymbolWeight(weight: Weight, filled: boolean): AndroidSymbolWeight {
  const face = weight === "bold" ? bold : semibold;
  return filled ? face.filled : face.outline;
}
