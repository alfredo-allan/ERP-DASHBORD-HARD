import { useState } from "react";
import Header from "../components/AccountsReceivable/Header";
import DataFilter from "../components/AccountsReceivable/DataFilter";
import type { FilterField } from "../components/AccountsReceivable/DataFilter";
import DataTable, {
  type TableRow,
} from "../components/AccountsReceivable/DataTable";
import ModalIncludeInstallment from "../components/AccountsReceivable/ModalIncludeInstallment";
import ModalGenerateInstallments from "../components/AccountsReceivable/ModalGenerateInstallment";
import { useGenerateInstallmentsModal } from "@/components/AccountsReceivable/hooks/useGenerateInstallmentsModal";

// Interface para os dados do formulário do modal
interface ParcelaData {
  fatura: string;
  cliente: string;
  empresa: string;
  vendedor: string;
  dataFatura: string;
  valorTotal: string;
  pedido: string;
  nota: string;
  cupom: string;
  os: string;
  historico: string;
  observacao: string;
}

// Dados fictícios para o modal
const mockParcelaData: ParcelaData = {
  fatura: "77",
  cliente: "1652 - WEB PALMAS PAPELARIA E INFORMATICA - 10.552.934/0001-90",
  empresa: "2 - PALMAS TEC DISTRIBUIDORA EIRELI - 11.882.938/0001-00",
  vendedor: "12 - ICARO ALERRANDRO PEREIRA NASCIMENTO - 886.654.258-33",
  dataFatura: "10/10/2021",
  valorTotal: "730.000,00",
  pedido: "23154",
  nota: "5312",
  cupom: "231",
  os: "",
  historico: "",
  observacao: "",
};

export default function AccountsReceivable() {
  // Estado para controlar o modal Incluir Parcela
  const [isIncludeModalOpen, setIsIncludeModalOpen] = useState(false);

  // Hook para controlar o modal Gerar Parcelas
  const generateModal = useGenerateInstallmentsModal();

  const [filters, setFilters] = useState<FilterField[][]>([
    [
      {
        label: "Cliente",
        value: "1652 - WEB PALMAS PAPELARIA E INFORMATICA - 10.552.934/0001-90",
        type: "select",
        options: [
          {
            value: "1652",
            label:
              "1652 - WEB PALMAS PAPELARIA E INFORMATICA - 10.552.934/0001-90",
          },
          { value: "outro", label: "Outro cliente" },
        ],
      },
      {
        label: "Período",
        value: "31/10/2010 até 31/10/2020",
        type: "text",
      },
      {
        label: "Tipo Data",
        value: "Vencimento",
        type: "select",
        options: [
          { value: "vencimento", label: "Vencimento" },
          { value: "emissao", label: "Emissão" },
        ],
      },
    ],
    [
      {
        label: "Empresa",
        value: "0- TODAS AS EMPRESAS",
        type: "select",
        options: [
          { value: "0", label: "0- TODAS AS EMPRESAS" },
          { value: "1", label: "1- EMPRESA A" },
        ],
      },
      {
        label: "Nota Fiscal",
        value: "",
        type: "text",
        placeholder: "Número da nota",
      },
      {
        label: "Duplicata",
        value: "",
        type: "text",
        placeholder: "Número duplicata",
      },
      {
        label: "Pedido",
        value: "",
        type: "text",
        placeholder: "Número pedido",
      },
      {
        label: "Orçamento",
        value: "",
        type: "text",
        placeholder: "Número orçamento",
      },
    ],
    [
      {
        label: "Vendedor",
        value: "12 - ICARO ALEGRANDRO PEREIRA NASCIMENTO - 886.654.258-33",
        type: "select",
        options: [
          {
            value: "12",
            label: "12 - ICARO ALEGRANDRO PEREIRA NASCIMENTO - 886.654.258-33",
          },
          { value: "outro", label: "Outro vendedor" },
        ],
      },
      {
        label: "Situação",
        value: "abertas",
        type: "radio",
        options: [
          { value: "abertas", label: "Abertas" },
          { value: "baixadas", label: "Baixadas" },
          { value: "canceladas", label: "Canceladas" },
          { value: "todos", label: "Todos" },
        ],
      },
    ],
  ]);

  // const tableData: TableRow[] = [
  //   {
  //     id: "1",
  //     cliente:
  //       "15 - SOLUGAO TI ASSISTENCIA TECNICA EM INFORMATICA LTDA - 10.552.934/C 2",
  //     emp: "2",
  //     pedido: "752",
  //     nota: "567",
  //     parc: "10",
  //     vencimento: "04/11/2022",
  //     valor: "R$ 238,92",
  //     dias: "5",
  //     multa: "R$ 11,95",
  //     juros: "R$ 4,78",
  //     valorTotal: "R$ 522,10",
  //   },
  //   {
  //     id: "2",
  //     cliente:
  //       "15- SOLUGAO TI ASSISTENCIA TECNICA EM INFORMATICA LTDA - 10.552.934/C 2",
  //     emp: "2",
  //     pedido: "752",
  //     nota: "567",
  //     parc: "10",
  //     vencimento: "04/14/2022",
  //     valor: "R$ 238,92",
  //     dias: "8",
  //     multa: "R$ 19,11",
  //     juros: "R$ 7,64",
  //     valorTotal: "R$ 522,10",
  //   },
  //   {
  //     id: "3",
  //     cliente: "1652 - WEB PALMAS PAPELARIA E INFORMATICA - 10.552.934/0001-90",
  //     emp: "2",
  //     pedido: "752",
  //     nota: "567",
  //     parc: "10",
  //     vencimento: "31/10/2020",
  //     valor: "R$ 1.500,00",
  //     dias: "15",
  //     multa: "R$ 75,00",
  //     juros: "R$ 30,00",
  //     valorTotal: "R$ 1.650,00",
  //   },
  // ];
  const mockAbertas: TableRow[] = [
    {
      id: "1",
      cliente: "15 - SOLUGAO TI ASSISTENCIA...",
      emp: "2",
      pedido: "752",
      nota: "567",
      parc: "10",
      vencimento: "04/11/2022",
      valor: "R$ 238,92",
      dias: "5",
      multa: "R$ 11,95",
      juros: "R$ 4,78",
      valorTotal: "R$ 522,10",
    },
    {
      id: "3",
      cliente: "1652 - WEB PALMAS PAPELARIA...",
      emp: "2",
      pedido: "752",
      nota: "567",
      parc: "10",
      vencimento: "31/10/2020",
      valor: "R$ 1.500,00",
      dias: "15",
      multa: "R$ 75,00",
      juros: "R$ 30,00",
      valorTotal: "R$ 1.650,00",
    },
  ];

  const mockBaixadas: TableRow[] = [
    {
      id: "10",
      cliente: "564 - MERCADINHO POPULAR",
      emp: "3",
      pedido: "3321",
      nota: "883",
      parc: "03",
      vencimento: "10/02/2024",
      valor: "R$ 820,00",
      dias: "0",
      multa: "R$ 0,00",
      juros: "R$ 0,00",
      valorTotal: "R$ 820,00",
      status: "baixada",
    },
    {
      id: "11",
      cliente: "98 - BARATÃO SUPERMERCADO",
      emp: "1",
      pedido: "4412",
      nota: "982",
      parc: "02",
      vencimento: "03/02/2024",
      valor: "R$ 452,00",
      dias: "0",
      multa: "R$ 0,00",
      juros: "0,00",
      valorTotal: "R$ 452,00",
      status: "baixada",
    },
  ];

  const mockCanceladas: TableRow[] = [
    {
      id: "20",
      cliente: "87 - PEDRO DISTRIBUIDORA",
      emp: "9",
      pedido: "7782",
      nota: "8821",
      parc: "01",
      vencimento: "20/11/2023",
      valor: "R$ 199,00",
      dias: "—",
      multa: "—",
      juros: "—",
      valorTotal: "R$ 199,00",
      status: "cancelada",
    },
  ];

  const [situacao, setSituacao] = useState("abertas");
  const [tableData, setTableData] = useState<TableRow[]>(mockAbertas);

  const handleRowSelect = (selectedRows: string[]) => {
    console.log("Linhas selecionadas:", selectedRows);
  };
  const handleFilterChange = (newFilters: FilterField[][]) => {
    setFilters(newFilters);

    const novaSituacao = newFilters[2][1]?.value || "abertas";

    setSituacao(novaSituacao);

    switch (novaSituacao) {
      case "baixadas":
        setTableData(mockBaixadas);
        break;
      case "canceladas":
        setTableData(mockCanceladas);
        break;
      case "todos":
        setTableData([...mockAbertas, ...mockBaixadas, ...mockCanceladas]);
        break;
      default:
        setTableData(mockAbertas);
    }
  };

  // Função quando clica em "Incluir" no Header
  const handleOpenIncludeModal = () => {
    setIsIncludeModalOpen(true);
  };

  // Função quando confirma dados no modal Incluir Parcela
  const handleConfirmIncludeModal = (data: ParcelaData) => {
    console.log("✅ Dados da parcela incluída:", data);

    // Fecha o modal de Incluir
    setIsIncludeModalOpen(false);

    // Abre o modal de Gerar Parcelas com os dados preenchidos
    generateModal.openModal({
      empresa: data.empresa,
      cliente: data.cliente,
      valor: data.valorTotal,
      tipo: "À Vista",
      acrescimo: false,
      desconto: false,
      outros: false,
      especie: "Dinheiro",
      portador: "",
      prazo: "30",
    });

    // Opcional: mostrar alerta
    // alert("Parcela incluída com sucesso! Agora gere as parcelas.");
  };

  // Função quando clica em "Gerar Parcelas" diretamente (botão dentro do modal)
  const handleOpenGenerateModalFromButton = () => {
    setIsIncludeModalOpen(false);
    generateModal.openModal();
  };

  // Função quando confirma as parcelas geradas
  const handleConfirmGeneratedParcelas = (parcelas: any[]) => {
    console.log("📦 Parcelas geradas para salvar:", parcelas);
    console.log("💰 Total:", generateModal.calcularTotal());
    console.log("🔢 Quantidade:", generateModal.contarParcelas());

    // Aqui você faria a chamada para a API
    alert(
      `${
        parcelas.length
      } parcelas geradas com sucesso! Total: R$ ${generateModal.calcularTotal()}`
    );

    generateModal.closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Passa a função para abrir o modal para o Header */}
      <Header onIncluirClick={handleOpenIncludeModal} />

      <DataFilter filters={filters} onFilterChange={handleFilterChange} />

      <main className="max-w-full mx-auto py-8">
        <div className="space-y-6">
          <DataTable data={tableData} onRowSelect={handleRowSelect} />
        </div>
      </main>

      {/* Modal de Incluir Parcela */}
      <ModalIncludeInstallment
        isOpen={isIncludeModalOpen}
        onClose={() => setIsIncludeModalOpen(false)}
        onConfirm={handleConfirmIncludeModal}
        onGenerateClick={handleOpenGenerateModalFromButton}
        initialData={mockParcelaData}
      />

      {/* Modal de Gerar Parcelas Avulsas */}
      <ModalGenerateInstallments
        isOpen={generateModal.isOpen}
        onClose={generateModal.closeModal}
        onConfirm={handleConfirmGeneratedParcelas}
        onGenerateParcelas={generateModal.generateParcelas}
        onUpdateParcelas={generateModal.updateParcelas}
        initialData={generateModal.modalData || undefined}
        parcelas={generateModal.parcelas}
      />
    </div>
  );
}
