// components/ViewInstallmentModal.tsx
import React from "react";
import { X } from "lucide-react";

interface ViewInstallmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const ViewInstallmentModal: React.FC<ViewInstallmentModalProps> = ({
  isOpen,
  onClose,
  title = "Visualizar Parcela",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      {/* Modal Container - 1230x680 para desktop */}
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl
                    w-[1230px] h-[680px]
                    max-lg:w-[95vw] max-lg:h-[90vh] max-lg:overflow-auto"
      >
        {/* Header simples */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 h-[calc(680px-57px)] overflow-auto">
          {children || (
            <div className="text-gray-500 dark:text-gray-400">
              {/* Conteúdo padrão caso não tenha children */}
              <p>Detalhes da parcela serão exibidos aqui.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewInstallmentModal;
