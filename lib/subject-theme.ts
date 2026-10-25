import type { CSSProperties } from "react";

// Stable colours shared by the subject list, learning content and exam practice.
export const subjectColors: Record<string, string> = {
  "021015": "#235fc4",
  "021021": "#16724d",
  "021038": "#ab510b",
  "021044": "#7740b3",
  "021050": "#b52d68",
  "021067": "#087880",
  "021073": "#896800",
  "021096": "#394fb2",
  "021104": "#865331",
  "901012": "#53751b",
  "901029": "#a4323b",
};
export function subjectTheme(code: string | undefined): CSSProperties {
  const color = subjectColors[code ?? ""] ?? "#34765c";
  return {
    "--subject-color": color,
    "--subject-tint": `${color}0d`,
    "--subject-line": `${color}40`,
  } as CSSProperties;
}
