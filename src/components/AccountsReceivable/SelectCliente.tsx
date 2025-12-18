import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface ClienteOption {
  value: string;
  label: string;
}

interface ParsedCliente {
  codigo: string;
  nome: string;
  documento: string;
}

interface SelectClienteProps {
  value: string;
  options: ClienteOption[];
  onChange: (value: string) => void;
}

function parseCliente(label: string): ParsedCliente {
  const regex = /^(\d+)\s-\s(.+?)\s-\s(.+)$/;
  const match = label.match(regex);

  if (!match) {
    return {
      codigo: "",
      nome: label,
      documento: "",
    };
  }

  return {
    codigo: match[1],
    nome: match[2],
    documento: match[3],
  };
}

export default function SelectCliente({
  value,
  options,
  onChange,
}: SelectClienteProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const selected = options.find((o) => o.value === value);

  // Sincroniza o inputValue com o selected quando o value muda
  useEffect(() => {
    if (selected) {
      const parsed = parseCliente(selected.label);
      setInputValue(parsed.nome); // Mostra apenas o nome no input
    } else {
      setInputValue("");
    }
  }, [selected]);

  const filteredOptions = useMemo(() => {
    if (!filter.trim()) return options;

    const searchTerm = filter.toLowerCase();
    return options.filter((option) => {
      const parsed = parseCliente(option.label);
      // Busca pelo nome OU pelo documento OU pelo código
      return (
        parsed.nome.toLowerCase().includes(searchTerm) ||
        parsed.documento.toLowerCase().includes(searchTerm) ||
        parsed.codigo.toLowerCase().includes(searchTerm)
      );
    });
  }, [filter, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setFilter(newValue);
    setOpen(true);
  };

  const handleOptionSelect = (selectedValue: string): void => {
    onChange(selectedValue);
    setFilter("");
    setOpen(false);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    // Remove classes de foco (fallback)
    e.target.parentElement?.classList.remove(
      "border-orange-500",
      "ring-1",
      "ring-orange-500"
    );

    // Se não houver valor selecionado, mantém o que foi digitado
    if (!selected && inputValue) {
      // Opcional: você pode querer limpar ou manter o texto
      // setInputValue("");
      // setFilter("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="
            w-full
            lg:w-[930px]
            h-[28px]
            flex items-center
            border border-gray-300 dark:border-gray-600
            rounded
            px-3
            bg-white dark:bg-slate-800
            text-sm
            cursor-pointer
            text-gray-900 dark:text-gray-100
            transition-colors duration-200
            focus-within:border-orange-500
            focus-within:ring-1 focus-within:ring-orange-500
          "
        >
          <input
            className="
              flex-1
              bg-transparent
              outline-none
              text-gray-900 dark:text-gray-100
              placeholder-gray-500 dark:placeholder-gray-400
            "
            placeholder="Selecione"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={(e) => {
              e.target.select(); // Seleciona todo o texto ao focar
              if (
                !e.target.parentElement?.classList.contains("border-orange-500")
              ) {
                e.target.parentElement?.classList.add(
                  "border-orange-500",
                  "ring-1",
                  "ring-orange-500"
                );
              }
              setOpen(true); // Abre o dropdown ao focar
            }}
            onBlur={handleInputBlur}
          />
          <Search
            className="w-4 h-4"
            style={{ color: "var(--orange-primary)" }}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={4}
        className="
          p-0 bg-white dark:bg-slate-800 border border-orange-500 shadow-xl
          w-full
          sm:w-[420px]
          md:w-[520px]
          lg:w-[930px]
        "
        onOpenAutoFocus={(e) => e.preventDefault()} // Previne foco automático no Command
      >
        <Command>
          <CommandList>
            <CommandEmpty className="text-gray-500 dark:text-gray-400">
              {filter.trim()
                ? "Nenhum cliente encontrado"
                : "Digite para buscar..."}
            </CommandEmpty>

            <CommandGroup>
              {filteredOptions.map((option) => {
                const parsedCliente = parseCliente(option.label);

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleOptionSelect(option.value)}
                    className="px-4 py-2 cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-700"
                  >
                    <div className="flex flex-col w-full">
                      <span className="text-[12px] font-semibold text-black dark:text-white">
                        {parsedCliente.nome}
                      </span>

                      <div className="flex justify-between w-full text-orange-600 dark:text-orange-400 text-[12px]">
                        <span>{parsedCliente.codigo}</span>
                        <span>{parsedCliente.documento}</span>
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
