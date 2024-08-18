import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import plugin from "tailwindcss/plugin";
import { PluginAPI } from "tailwindcss/types/config";

const textStrokePlugin = plugin(function ({
  matchUtilities,
  theme,
}: PluginAPI) {
  const colors = flattenColorPalette(theme("colors"));
  const widths = [["1", "1px"], ...Object.entries(theme("borderWidth") ?? {})];

  widths.forEach(([key, value]) => {
    matchUtilities(
      {
        [`text-stroke-${key}`]: (color) => ({
          textShadow: `
            -${value} -${value} 0 ${color},
            ${value} -${value} 0 ${color},
            -${value} ${value} 0 ${color},
            ${value} ${value} 0 ${color};
          `
            .replace(/\s+/g, " ")
            .trim(),
        }),
      },
      { values: colors, type: "color" },
    );
  });
});

export default textStrokePlugin;
