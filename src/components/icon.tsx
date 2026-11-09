import { SymbolView, type SymbolViewProps } from "expo-symbols";
import type { ColorValue } from "react-native";

import { size as sizes } from "@/theme/tokens";

import { androidSymbolWeight, type Weight } from "./symbol-weights";

type Name = Extract<SymbolViewProps["name"], { ios?: unknown }>;

interface IconProps {
  name: Name;
  color: ColorValue;
  size?: keyof typeof sizes.icon;
  weight?: Weight;
}

export function Icon({ name, color, size = "md", weight = "semibold" }: IconProps) {
  const side = sizes.icon[size];
  // A filled SF Symbol gets the filled Material face, so a saved star still looks different from an empty one on Android.
  const filled = String(name.ios).endsWith(".fill");
  const android = androidSymbolWeight(weight, filled);
  // On Android, SymbolView loads its font once on mount, so a new face (outline to filled, or another weight) needs a fresh mount to load.
  return <SymbolView key={`${weight}-${filled}`} name={name} size={side} tintColor={color} weight={android ? { ios: weight, android } : weight} resizeMode="scaleAspectFit" style={{ width: side, height: side }} />;
}

/** The save star for a header toolbar: an SF Symbol on iOS, and on Android a Material Symbols image, since its toolbar only takes images. */
export function toolbarStar(filled: boolean) {
  if (process.env.EXPO_OS === "ios") return filled ? "star.fill" : "star";
  return filled ? require("@/assets/images/toolbar/star-fill.png") : require("@/assets/images/toolbar/star.png");
}

export const icons = {
  bus: { ios: "bus.fill", android: "directions_bus" },
  station: { ios: "tram.fill", android: "tram" },
  stop: { ios: "signpost.right.fill", android: "signpost" },
  star: { ios: "star", android: "star" },
  starFill: { ios: "star.fill", android: "star" },
  location: { ios: "location.fill", android: "my_location" },
  search: { ios: "magnifyingglass", android: "search" },
  chevron: { ios: "chevron.right", android: "chevron_right" },
  wheelchair: { ios: "figure.roll", android: "accessible" },
  warning: { ios: "exclamationmark.triangle.fill", android: "warning" },
  clock: { ios: "clock", android: "schedule" },
  walk: { ios: "figure.walk", android: "directions_walk" },
  heart: { ios: "heart.fill", android: "favorite" },
  info: { ios: "info.circle", android: "info" },
  close: { ios: "xmark", android: "close" },
  person: { ios: "person.crop.circle.badge.checkmark", android: "person" },
  noAds: { ios: "nosign", android: "block" },
  code: { ios: "chevron.left.forwardslash.chevron.right", android: "code" },
  sparkles: { ios: "sparkles", android: "auto_awesome" },
  lock: { ios: "lock.fill", android: "lock" },
  check: { ios: "checkmark", android: "check" },
  flag: { ios: "exclamationmark.bubble", android: "feedback" },
} satisfies Record<string, Name>;
