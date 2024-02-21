import { useContext } from "react";
import { CAside } from "./aside-context";

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
