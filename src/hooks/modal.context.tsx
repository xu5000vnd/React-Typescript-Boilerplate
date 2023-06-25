import React, { createContext, ReactNode } from "react";
import { Modal } from "antd";

type ModalInstance = ReturnType<typeof Modal.useModal>;

interface ModalContextProps {
  modal: ModalInstance;
}

const ModalContext = createContext<ModalContextProps | null>(null);

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const modal = Modal.useModal();

  return (
    <ModalContext.Provider value={{ modal }}>{children}</ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
