import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div className="bg-amber-200 text-5xl font-bold border-solid border-b-2 border-gray-300 drop-shadow-xl">
      <Link to="/store-selection">
        <p className="mx-8 py-3 hover:text-zinc-700 hover:animate-pulse">
          LEON
        </p>
      </Link>
    </div>
  );
}

export default Header;
