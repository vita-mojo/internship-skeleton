import { Link } from 'react-router-dom';
/* eslint-disable-next-line */
export interface PageButtonsProps {
  allStores: number;
  itemsPerPage: number;
}

export function PageButtons(props: PageButtonsProps) {
  return (
    <>
      {Array.from(
        Array(Math.ceil(props.allStores / props.itemsPerPage)),
        (_, index) => index + 1
      ).map((item) => (
        <Link key={item} to={`/store-selection/${item}`}>
          <button
            value={item}
            className="w-4 hover:scale-105 transition ease-in-out duration-200 font-bold"
          >
            {item}
          </button>
        </Link>
      ))}
      ;
    </>
  );
}

export default PageButtons;
