import { useEffect, useState, useContext } from "react";
import hydrate from "next-mdx-remote/hydrate";
import { Lesson } from "@/lib/lessons";
import { components } from "@/lib/markdown";
import { CAside } from "./AsideContex";

export default ({ aside }: { aside: Lesson }) => {
  if (!aside.content) return null;

  const content = hydrate(aside.content, { components });
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
