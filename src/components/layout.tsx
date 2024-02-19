import Head from "next/head";
import { Footer } from "./footer";
import Header from "./header";

type Props = {
  children: React.ReactNode;
  title?: string;
  widthClass?: string;
};

const Layout = ({
  children,
  title,
  widthClass = "w-full max-w-3xl",
}: Props) => (
  <div className="flex flex-col items-stretch min-h-screen">
    <Head>
      <title>
        {title
          ? `${title.replace(/<[^>]*>/g, "")} - Next.js course template`
          : `Next.js course template`}
      </title>
    </Head>

    <Header />

    <main className={`flex-auto self-center ${widthClass} px-2 pt-6`}>
      {children}
    </main>

    <Footer />
  </div>
);

export default Layout;
