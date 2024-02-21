import { useState, createContext } from "react";

export const CAside = createContext({
  aside: "",
  toggle: (slug: string) => {
    alert("!");
  },
});

export default ({ children }: { children: React.ReactNode }) => {
  const [aside, setAside] = useState("");
  return (
    <CAside.Provider
      value={{
        aside,
        toggle: (newAside) => {
          setAside((currentAside) => {
            if (currentAside === newAside) return "";
            return newAside;
          });
        },
      }}
    >
      {children}
    </CAside.Provider>
  );
};
