import { Link } from 'react-router-dom';

import { Menu, StoreInfo } from '../../variables-interfaces/store-interfaces';
/* eslint-disable-next-line */
import { isOpenStore } from '../../variables-interfaces/store-variables';

export interface StoreCardProps {
  storesInfo: StoreInfo;
}

export function StoreCard(props: StoreCardProps) {
  const date = {
    hour: new Date().getHours(),
    minutes: new Date().getMinutes()
  };

  return (
    <div className="menucard w-3/4 mx-auto m-3 p-3 bg-white">
      <div className="m-2">
        <h1 className="font-bold m-2">{props.storesInfo.name}</h1>
        <h3 className="font-thin  m-2">{props.storesInfo.geo.address}</h3>
      </div>
      {!props.storesInfo.menus.length ? (
        <div className="flex justify-between m-2">Nothing found</div>
      ) : (
        props.storesInfo.menus.map((menu: Menu) => (
          <div key={menu.id} className="flex justify-between m-2">
            <div className="w-2/3">
              <h1 className="font-bold  m-2">{menu.name}</h1>
              <h3 className="font-thin  m-2">
                <span
                  className={
                    isOpenStore(
                      menu.workingHours.from,
                      menu.workingHours.to,
                      date
                    ).spanStyle
                  }
                >
                  {
                    isOpenStore(
                      menu.workingHours.from,
                      menu.workingHours.to,
                      date
                    ).status
                  }
                </span>
                &nbsp;From {menu.workingHours.from}- To
                {menu.workingHours.to}
              </h3>
            </div>
            <div className="flex w-1/3 justify-center items-center">
              <Link
                to={`/menu/${menu.id}/1`}
                className={
                  isOpenStore(
                    menu.workingHours.from,
                    menu.workingHours.to,
                    date
                  ).buttonStyle
                }
              >
                {
                  isOpenStore(
                    menu.workingHours.from,
                    menu.workingHours.to,
                    date
                  ).action
                }
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default StoreCard;
