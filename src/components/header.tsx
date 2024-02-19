import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-2 border-b border-gray-200">
      <Link href="/" className="text-pink-800 text-lg flex space-x-2">
        Next.js course template
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/course" className="text-pink-800 hover:underline">
              Course
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
