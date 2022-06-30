import { Link, useParams } from 'react-router-dom';
/* eslint-disable-next-line */
export interface PageButtonsProps {
  pages: number;
}

export function PageButtons(props: PageButtonsProps) {
  const { deliveryType } = useParams();

  return (
    <>
      {Array.from(Array(props.pages), (_, index) => index + 1).map((item) => (
        <Link
          key={item}
          to={
            !deliveryType
              ? `/store-selection/${item}`
              : `/store-selection/${item}/menu/${deliveryType}`
          }
        >
          <button
            value={item}
            className="w-4 hover:scale-105 transition ease-in-out duration-200 font-bold"
          >
            {item}
          </button>
        </Link>
      ))}
    </>
  );
}

export default PageButtons;
