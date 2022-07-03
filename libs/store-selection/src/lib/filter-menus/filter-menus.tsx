import { Link, useLocation, useParams } from 'react-router-dom';

import { services } from '../../variables-interfaces/store-variables';

/* eslint-disable-next-line */
export interface FilterMenusProps {
  // handleFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isActive: string;
  // storeNameFn: (store: string) => void;
}

export function FilterMenus(props: FilterMenusProps) {
  const { page, deliveryType, nameOfStore } = useParams();
  const location = useLocation();
  let link;
  let redirectLink;

  const newLinkToRedirect = (name: string) => {
    if (page && deliveryType && nameOfStore) {
      link = location.pathname.split('/');
      link.splice(link.length - 2, 2, name, nameOfStore);
      redirectLink = link.join('/');
      return redirectLink;
    }
    if (page && deliveryType) {
      console.log('page and delivery');
      link = location.pathname.split('/');
      if (!link[link.length - 1]) {
        link.pop();
      }
      link.splice(link.length - 1, 1, name);
      redirectLink = link.join('/');
      return redirectLink;
    }
    if (page && nameOfStore) {
      link = location.pathname.split('/');
      link.splice(3, 2, 'menu', name, nameOfStore);
      redirectLink = link.join('/');
      return redirectLink;
    }
    if (page) {
      link = location.pathname.split('/');
      if (!link[link.length - 1]) {
        link.pop();
      }
      link.splice(link.length - 1, 1, page, 'menu', name);
      redirectLink = link.join('/');
      return redirectLink;
    }
    return `1/menu/${name}`;
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-bold">Our restaurants</h2>
        <h3 className="font-thin">
          Enter your postcode to find the nearest restaurant
        </h3>
      </div>
      <div className="flex m-8 justify-around">
        {services.map((item) => (
          <Link
            to={`${newLinkToRedirect(item.alternativeName)}`}
            key={item.id}
            className={`p-3 w-1/4 bg-white text-zinc-500 border hover:text-zinc-900 hover:scale-110 hover:border hover:rounded-lg hover:border-zinc-900 transition ease-in-out duration-100 cursor-pointer  ${
              props.isActive === item.text &&
              'focus:text-zinc-900 focus:border-zinc-900 focus:scale-110 focus:border focus:rounded-lg'
            }
            `}
          >
            <div className="flex justify-center text-2xl ">{item.type}</div>
            <h4 className="text-base font-bold">{item.text}</h4>
          </Link>
        ))}
      </div>
    </>
  );
}

export default FilterMenus;
