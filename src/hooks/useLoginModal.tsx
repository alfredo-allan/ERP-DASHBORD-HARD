import { useState, useCallback } from "react";

interface LoginModalConfig {
  title?: string;
  message?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const useLoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<LoginModalConfig>({});

  const openLoginModal = useCallback((config?: LoginModalConfig) => {
    setConfig(config || {});
    setIsOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsOpen(false);
    if (config.onCancel) {
      config.onCancel();
    }
    // Limpa o config após fechar
    setTimeout(() => setConfig({}), 300);
  }, [config]);

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      // Aqui você implementa a lógica de autenticação real
      console.log("Tentando login:", { username, password });

      // Simulação de API
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (username && password) {
            if (config.onSuccess) {
              config.onSuccess();
            }
            resolve();
          } else {
            reject(new Error("Credenciais inválidas"));
          }
        }, 1000);
      });
    },
    [config]
  );

  return {
    isOpen,
    openLoginModal,
    closeLoginModal,
    handleLogin,
    config,
  };
};
