import { services } from '../../variables-interfaces/store-variables';

/* eslint-disable-next-line */
export interface FilterMenusProps {
  handleFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isActive: string;
}

export function FilterMenus(props: FilterMenusProps) {
  console.log(props.isActive);
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
          <button
            onClick={props.handleFilter}
            name={item.text}
            key={item.id}
            className={`p-3 w-1/4 bg-white text-zinc-500 border hover:text-zinc-900 hover:scale-110 hover:border hover:rounded-lg hover:border-zinc-900 transition ease-in-out duration-100 cursor-pointer  ${
              props.isActive === item.text &&
              'focus:text-zinc-900 focus:border-zinc-900 focus:scale-110 focus:border focus:rounded-lg'
            }
            `}
          >
            <div className="flex justify-center text-2xl ">{item.type}</div>
            <h4 className="text-base font-bold">{item.text}</h4>
          </button>
        ))}
      </div>
    </>
  );
}

export default FilterMenus;
