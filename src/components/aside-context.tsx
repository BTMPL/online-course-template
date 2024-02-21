import { createContext } from "react";

export const CAside = createContext({
  aside: "",
  toggle: (slug: string) => {
    alert("!");
  },
});
