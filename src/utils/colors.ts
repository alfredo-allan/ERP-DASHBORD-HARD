// utils/colors.ts
export const labelColors: Record<string, string> = {
  Cadastros: "#008A45",
  Comercial: "#0047CC",
  Financeiro: "#E66400",
  Fiscal: "#8300E6",
  Relatórios: "#0096B8",
};

export const getLabelColor = (label: string): string => {
  return labelColors[label] || "#666666"; // Cor padrão se não encontrar
};
