import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

import InputForm from '../input-form/input-form';

/* eslint-disable-next-line */
export interface FiltreFormProps {
  searchName: any;
  setPrice: any;
  setSort: any;
  minPrice: number;
  maxPrice: number;
}

export const FiltreForm = (props: FiltreFormProps) => {
  const { searchName, setPrice, setSort, minPrice, maxPrice } = props;

  const [open, setOpen] = useState(false as boolean);

  return (
    <div className="pt-10">
      <button
        className="flex bg-amber-300 hover:bg-amber-200 text-black font-bold py-2 px-4 rounded"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <FaFilter /> <span>Filter</span>
      </button>
      <div>
        <InputForm
          searchName={searchName}
          setPrice={setPrice}
          setSort={setSort}
          minPrice={minPrice}
          maxPrice={maxPrice}
          isOpen={open}
        />
      </div>
    </div>
  );
};

export default FiltreForm;
