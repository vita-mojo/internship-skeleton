import { GiFoodTruck } from 'react-icons/gi';
import { MdFoodBank } from 'react-icons/md';
import { RiHandbagFill } from 'react-icons/ri';

import { DateType, ServiceType } from './store-interfaces';

export const openType1 = {
  status: 'Open',
  spanStyle: 'text-green-500 font-bold',
  action: 'Order',
  buttonStyle:
    'flex justify-center items-center w-full h-1/2 text-white bg-zinc-900 rounded-2xl border hover:bg-white hover:text-zinc-900'
};

export const openType2 = {
  status: 'Preorder',
  spanStyle: 'text-blue-500 font-bold',
  action: 'Order',
  buttonStyle:
    'flex justify-center items-center w-full h-1/2 text-white bg-zinc-900 rounded-2xl border border-zinc-300 hover:text-zinc-900 hover:bg-white'
};

export const openType3 = {
  status: 'Close',
  spanStyle: 'text-red-500 font-bold',
  action: 'View Menu',
  buttonStyle:
    'flex justify-center items-center w-full h-1/2 text-zinc-900 bg-white rounded-2xl border border-zinc-300 hover:text-white hover:bg-zinc-900'
};

export const isOpenStore = (from: string, to: string, date: DateType) => {
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

export const services: ServiceType[] = [
  {
    type: <RiHandbagFill />,
    text: 'Pickup',
    alternativeName: 'PICK_UP',
    id: 1
  },
  { type: <MdFoodBank />, text: 'Eat In', alternativeName: 'EAT_IN', id: 2 },
  {
    type: <GiFoodTruck />,
    text: 'Delivery',
    alternativeName: 'DELIVERY',
    id: 3
  }
];
