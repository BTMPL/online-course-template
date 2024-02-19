import { createContext, useEffect, useState, useContext } from "react";
import hydrate from "next-mdx-remote/hydrate";
import { Lesson } from "@/lib/lessons";

const CAside = createContext({
  aside: "",
  toggle: (slug: string) => {
    alert("!");
  },
});

export const Aside = ({ aside }: { aside: Lesson }) => {
  if (!aside.content) return null;

  const content = hydrate(aside.content);
  const asideControl = useContext(CAside);
  useEffect(() => {
    if (asideControl.aside) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [asideControl.aside]);

  if (asideControl.aside !== aside.meta.slug) return null;
  return (
    <div className="fixed right-0 top-0 bottom-0 w-2/3 p-10 overflow-auto bg-white shadow-2xl">
      {content}
    </div>
  );
};

export const AsideLink = ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) => {
  const aside = useContext(CAside);
  return (
    <button onClick={() => aside.toggle(slug)}>
      {children} - {aside.aside ? "enabled" : "disabled"}
    </button>
  );
};

export const AsideContext = ({ children }: { children: React.ReactNode }) => {
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
