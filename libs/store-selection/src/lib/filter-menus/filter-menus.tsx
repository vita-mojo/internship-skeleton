import { services } from '../../variables-interfaces/store-variables';

/* eslint-disable-next-line */
export interface FilterMenusProps {
  handleFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function FilterMenus(props: FilterMenusProps) {
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
            className="p-3 w-1/4 bg-white text-zinc-500 border hover:text-zinc-900 hover:scale-110 hover:border hover:rounded-lg hover:border-zinc-900  active:text-zinc-900 active:scale-110  active:border active:rounded-lg active:border-zinc-900 transition ease-in-out duration-300 cursor-pointer"
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
