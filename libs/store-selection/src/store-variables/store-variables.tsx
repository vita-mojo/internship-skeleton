import { GiFoodTruck } from 'react-icons/gi';
import { MdFoodBank } from 'react-icons/md';
import { RiHandbagFill } from 'react-icons/ri';

interface ServiceType {
  type: React.ReactElement;
  text: string;
  id: number;
}

export const services: ServiceType[] = [
  { type: <RiHandbagFill />, text: 'Pickup', id: 1 },
  { type: <MdFoodBank />, text: 'Eat In', id: 2 },
  { type: <GiFoodTruck />, text: 'Delivery', id: 3 }
];

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
