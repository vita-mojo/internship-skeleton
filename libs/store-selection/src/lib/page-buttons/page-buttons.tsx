import { Link, useLocation, useParams } from 'react-router-dom';
/* eslint-disable-next-line */
export interface PageButtonsProps {
  pages: number;
}

export function PageButtons(props: PageButtonsProps) {
  const { page } = useParams();
  const location = useLocation();
  const link = location.pathname.split('/');
  let redirectLink;
  const redirect = (item: any) => {
    if (page) {
      link.splice(2, 1, item);
      redirectLink = link.join('/');
      return redirectLink;
    }
    link.splice(2, 1, item);
    redirectLink = link.join('/');
    return redirectLink;
  };

  return (
    <>
      {Array.from(Array(props.pages), (_, index) => index + 1).map((item) => (
        <Link key={item} to={`${redirect(item)}`}>
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
