import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
import {
  openType1,
  openType2,
  openType3
} from '../../store-variables/store-variables';

interface Geo {
  lat: string;
  long: string;
  address: string;
}

interface StoreInfo {
  id: string;
  name: string;
  description: string;
  geo: Geo;
  menus: any[];
}

export interface StoreCardProps {
  storesInfo: StoreInfo;
}

export function StoreCard(props: StoreCardProps) {
  const date = {
    hour: new Date().getHours(),
    minutes: new Date().getMinutes()
  };
  const isOpenStore = (from: string, to: string) => {
    const hourFrom = from.split(':');
    const hourTo = to.split(':');
    const toIntHourFrom = hourFrom.map((item: string) => parseInt(item));
    const toIntHourTo = hourTo.map((item: string) => parseInt(item));

    if (toIntHourFrom[0] < date.hour && date.hour < toIntHourTo[0]) {
      return openType1;
    } else if (date.hour === toIntHourFrom[0]) {
      if (toIntHourFrom[1] > date.minutes) {
        return openType2;
      } else {
        return openType1;
      }
    } else if (date.hour === toIntHourTo[0]) {
      if (toIntHourTo[1] > date.minutes) {
        return openType1;
      } else {
        return openType3;
      }
    } else {
      return openType3;
    }
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
        props.storesInfo.menus.map((menu: any) => (
          <div key={menu.id} className="flex justify-between m-2">
            <div className="w-2/3">
              <h1 className="font-bold  m-2">{menu.name}</h1>
              <h3 className="font-thin  m-2">
                <span
                  className={
                    isOpenStore(menu.workingHours.from, menu.workingHours.to)
                      .spanStyle
                  }
                >
                  {
                    isOpenStore(menu.workingHours.from, menu.workingHours.to)
                      .status
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
                  isOpenStore(menu.workingHours.from, menu.workingHours.to)
                    .buttonStyle
                }
              >
                {
                  isOpenStore(menu.workingHours.from, menu.workingHours.to)
                    .action
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
