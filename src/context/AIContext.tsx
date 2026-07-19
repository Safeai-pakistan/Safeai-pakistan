import { createContext, useContext, useState } from "react";

type AIContextType = {
  prompt: string;
  setPrompt: (text: string) => void;
};

const AIContext = createContext<AIContextType>({
  prompt: "",
  setPrompt: () => {},
});

export function AIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prompt, setPrompt] = useState("");

  return (
    <AIContext.Provider value={{ prompt, setPrompt }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  return useContext(AIContext);
}