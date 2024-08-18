import postcss from "postcss";
import tailwindcss, { Config } from "tailwindcss";
import { expect, it } from "vitest";
import plugin from ".";

async function generateCss(config: Config) {
  config = {
    ...config,
    plugins: [plugin],
  };

  const { css } = await postcss(tailwindcss(config)).process(
    "@tailwind utilities;",
    { from: undefined },
  );

  return css;
}

it("generates text shadow utilities", async () => {
  const css = await generateCss({
    content: [
      { raw: '<div class="text-stroke-1-black text-stroke-2-white"></div>' },
    ],
  });

  expect(css).toContain(".text-stroke-1-black");
  expect(css).toContain(".text-stroke-2-white");
  expect(css).toContain(
    "text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;",
  );
  expect(css).toContain(
    "text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;",
  );
});
