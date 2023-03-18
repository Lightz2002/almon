import { createContext, useContext, useState } from "react";

const RemainContext = createContext();
const RemainUpdateContext = createContext();

export function useRemain() {
  return useContext(RemainContext);
}

export function useUpdateRemain() {
  return useContext(RemainUpdateContext);
}

export function RemainProvider({ children }) {
  const [remain, setRemain] = useState({});

  function updateRemain(newRemain) {
    setRemain(newRemain);
  }

  return (
    <RemainContext.Provider value={user}>
      <RemainUpdateContext.Provider value={updateRemain}>
        {children}
      </RemainUpdateContext.Provider>
    </RemainContext.Provider>
  );
}
