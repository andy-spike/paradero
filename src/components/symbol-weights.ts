export type Weight = "medium" | "semibold" | "bold";

/** iOS draws SF Symbols with its own weights, so only Android loads Material Symbols faces (see symbol-weights.android.ts). */
export function androidSymbolWeight(_weight: Weight, _filled: boolean): undefined {
  return undefined;
}
