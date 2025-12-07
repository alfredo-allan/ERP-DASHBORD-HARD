import React, { useState } from "react";
import { Eye, Copy, Send, Printer, Clipboard } from "lucide-react";

interface TableActionsHoverProps {
  onView?: () => void;
  onCopy?: () => void;
  onSend?: () => void;
  onPrint?: () => void;
  className?: string;
  rowData?: any;
  rowStatus?: "aberta" | "baixada" | "cancelada";
  position?: { x: number; y: number };
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const TableActionsHover: React.FC<TableActionsHoverProps> = ({
  onView,
  onCopy,
  onSend,
  onPrint,
  className = "",
  rowData,
  rowStatus = "aberta",
  position,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [copied, setCopied] = useState(false);

  // CORES DOS ÍCONES BASEADAS NO STATUS DA LINHA
  const getIconColorClass = () => {
    switch (rowStatus) {
      case "baixada":
        return {
          icon: "text-[#008A45] dark:text-[#008A45]",
          hover: "hover:text-[#008A45]/90 dark:hover:text-[#008A45]/80",
          bg: "hover:bg-[#008A45]/10 dark:hover:bg-[#008A45]/20",
        };
      case "cancelada":
        return {
          icon: "text-[#0047CC] dark:text-[#0047CC]",
          hover: "hover:text-[#0047CC]/90 dark:hover:text-[#0047CC]/80",
          bg: "hover:bg-[#0047CC]/10 dark:hover:bg-[#0047CC]/20",
        };
      default: // aberta
        return {
          icon: "text-gray-700 dark:text-gray-300",
          hover: "hover:text-gray-900 dark:hover:text-white",
          bg: "hover:bg-gray-700/20 dark:hover:bg-gray-700",
        };
    }
  };

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    } else {
      const textToCopy = rowData ? JSON.stringify(rowData, null, 2) : "";
      navigator.clipboard.writeText(textToCopy);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      // Função de impressão padrão
      const printContent = `
        <html>
          <head>
            <title>Imprimir Dados</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                padding: 30px;
                max-width: 800px;
                margin: 0 auto;
              }
              .header {
                text-align: center;
                border-bottom: 2px solid #333;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .company-name {
                font-size: 24px;
                font-weight: bold;
                color: #2c3e50;
              }
              .content {
                margin: 20px 0;
              }
              .row {
                display: flex;
                justify-content: space-between;
                margin: 12px 0;
                padding: 8px 0;
                border-bottom: 1px dashed #ddd;
              }
              .label {
                font-weight: bold;
                color: #2c3e50;
                min-width: 150px;
              }
              .value {
                color: #34495e;
                text-align: right;
                flex: 1;
              }
              .total-row {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                margin-top: 25px;
                border: 2px solid #3498db;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                color: #7f8c8d;
                font-size: 12px;
              }
              @media print {
                body { padding: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="company-name">PALMAS TEC DISTRIBUIDORA</div>
              <div style="font-size: 14px; color: #7f8c8d; margin-top: 10px;">
                COMPROVANTE DE CONTA A RECEBER
              </div>
              <div style="font-size: 12px; color: #95a5a6; margin-top: 5px;">
                Data: ${new Date().toLocaleDateString()} | Hora: ${new Date().toLocaleTimeString()}
              </div>
            </div>

            <div class="content">
              ${
                rowData
                  ? Object.entries(rowData)
                      .map(
                        ([key, value]) => `
                <div class="row">
                  <div class="label">${key}:</div>
                  <div class="value">${value}</div>
                </div>
              `
                      )
                      .join("")
                  : "<p>Nenhum dado disponível</p>"
              }
            </div>

            <div class="footer">
              <div>Documento gerado automaticamente pelo sistema</div>
            </div>

            <div class="no-print" style="text-align: center; margin-top: 30px;">
              <button onclick="window.print()" style="
                background: #3498db;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
              ">
                🖨️ Imprimir Documento
              </button>
              <button onclick="window.close()" style="
                background: #e74c3c;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                margin-left: 10px;
              ">
                ✖️ Fechar
              </button>
            </div>
          </body>
        </html>
      `;

      const printWindow = window.open("", "_blank", "width=900,height=700");
      printWindow?.document.write(printContent);
      printWindow?.document.close();
    }
  };

  const containerStyle = position
    ? {
        position: "fixed" as const,
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translateY(-50%)",
      }
    : {
        right: "20px",
      };

  const iconColors = getIconColorClass();

  return (
    <div
      className={`
        w-[280px] h-[32px]
        bg-gradient-to-r from-transparent via-[#FDEFE5]/40 to-[#FDEFE5]
        dark:bg-gradient-to-r dark:from-transparent dark:via-gray-800/40 dark:to-gray-900
        shadow-lg shadow-orange-100/30
        dark:shadow-gray-900/50
        rounded-lg
        flex items-center justify-center gap-3
        px-4
        z-50
        pointer-events-auto
        backdrop-blur-sm
        border border-white/20
        dark:border-gray-700/50
        ${position ? "fixed" : "fixed"}
        ${className}
      `}
      style={containerStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Botão Visualizar */}
      <button
        onClick={onView}
        className={`
          p-1.5 rounded-md
          transition-colors duration-200
          ${iconColors.icon}
          ${iconColors.hover}
          ${iconColors.bg}
          focus:outline-none focus:ring-1 focus:ring-blue-400
        `}
        title="Visualizar detalhes"
        type="button"
      >
        <Eye size={16} />
      </button>

      {/* Botão Copiar */}
      <button
        onClick={handleCopy}
        className={`
          p-1.5 rounded-md
          transition-colors duration-200
          ${
            copied
              ? "text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300"
              : `${iconColors.icon} ${iconColors.hover} ${iconColors.bg}`
          }
          focus:outline-none focus:ring-1 focus:ring-blue-400
          relative
        `}
        title={copied ? "Copiado!" : "Copiar dados"}
        type="button"
      >
        {copied ? <Clipboard size={16} /> : <Copy size={16} />}
        {copied && (
          <span
            className="
            absolute -top-8 left-1/2 transform -translate-x-1/2
            bg-green-500 text-white text-xs
            px-2 py-1 rounded
            whitespace-nowrap
            animate-pulse
          "
          >
            Copiado!
          </span>
        )}
      </button>

      {/* Botão Enviar */}
      <button
        onClick={onSend}
        className={`
          p-1.5 rounded-md
          transition-colors duration-200
          ${iconColors.icon}
          ${iconColors.hover}
          ${iconColors.bg}
          focus:outline-none focus:ring-1 focus:ring-blue-400
        `}
        title="Enviar/Compartilhar"
        type="button"
      >
        <Send size={16} />
      </button>

      {/* Botão Imprimir */}
      <button
        onClick={handlePrint}
        className={`
          p-1.5 rounded-md
          transition-colors duration-200
          ${iconColors.icon}
          ${iconColors.hover}
          ${iconColors.bg}
          focus:outline-none focus:ring-1 focus:ring-blue-400
        `}
        title="Imprimir"
        type="button"
      >
        <Printer size={16} />
      </button>
    </div>
  );
};

// Componente Wrapper otimizado (ATUALIZADO para passar o status)
interface TableActionsWrapperProps {
  children: React.ReactNode;
  rowData?: any;
  rowStatus?: "aberta" | "baixada" | "cancelada"; // ← ADICIONEI AQUI
  onView?: (rowData: any) => void;
  onCopy?: (rowData: any) => void;
  onSend?: (rowData: any) => void;
  onPrint?: (rowData: any) => void;
  showActions?: boolean;
}

export const TableActionsWrapper: React.FC<TableActionsWrapperProps> = ({
  children,
  rowData,
  rowStatus = "aberta", // ← VALOR PADRÃO
  onView,
  onCopy,
  onSend,
  onPrint,
  showActions = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActionsHovered, setIsActionsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
    updatePosition(e);
  };

  const handleMouseLeave = () => {
    if (!isActionsHovered) {
      hoverTimeoutRef.current = setTimeout(() => {
        if (!isActionsHovered) {
          setIsHovered(false);
        }
      }, 200);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updatePosition(e);
  };

  const handleActionsMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsActionsHovered(true);
  };

  const handleActionsMouseLeave = () => {
    setIsActionsHovered(false);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  const updatePosition = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    setPosition({
      x: rect.right - 280, // 280px do componente
      y: rect.top + scrollTop + rect.height / 2,
    });
  };

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}

      {showActions && isHovered && (
        <TableActionsHover
          rowData={rowData}
          rowStatus={rowStatus} // ← PASSA O STATUS PARA O COMPONENTE
          position={position}
          onView={() => onView?.(rowData)}
          onCopy={() => onCopy?.(rowData)}
          onSend={() => onSend?.(rowData)}
          onPrint={() => onPrint?.(rowData)}
          onMouseEnter={handleActionsMouseEnter}
          onMouseLeave={handleActionsMouseLeave}
        />
      )}
    </div>
  );
};

export default TableActionsHover;
