import { LucideIcon } from "lucide-react";
import {
  NotebookTabs,
  Store,
  DollarSign,
  Building2,
  ChartColumnIncreasing,
} from "lucide-react";

export interface NavigationItem {
  icon: LucideIcon;
  label: string;
  iconColor: string;
  href?: string; // opcional — habilita rotas
}

export const useNavigation = () => {
  const navigationItems: NavigationItem[] = [
    {
      icon: NotebookTabs,
      label: "Cadastros",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      href: "/cadastros",
    },
    {
      icon: Store,
      label: "Comercial",
      iconColor: "text-blue-600 dark:text-blue-400",
      href: "/comercial",
    },
    {
      icon: DollarSign,
      label: "Financeiro",
      iconColor: "text-amber-600 dark:text-amber-400",
      href: "/financeiro",
    },
    {
      icon: Building2,
      label: "Fiscal",
      iconColor: "text-purple-600 dark:text-purple-400",
      href: "/fiscal",
    },
    {
      icon: ChartColumnIncreasing,
      label: "Relatórios",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      href: "/relatorios",
    },
  ];

  return { navigationItems };
};
