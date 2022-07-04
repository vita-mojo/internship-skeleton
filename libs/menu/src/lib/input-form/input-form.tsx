import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import RangeSlider from '../range-slider/range-slider';

/* eslint-disable-next-line */
export interface InputFormProps {
  isOpen: boolean;
  searchName: any;
  setPrice: any;
  setSort: any;
  minPrice: number;
  maxPrice: number;
}

export const InputForm = (props: InputFormProps) => {
  const { isOpen, searchName, setPrice, setSort, minPrice, maxPrice } = props;

  const { menuId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      {isOpen && (
        <div>
          <form className="flex flex-col gap-y-4 w-1/2">
            <label className="pt-4">
              <input
                className="w-full p-2 border bg-gray-100 rounded-lg"
                type="text"
                placeholder="Search by product name"
                onChange={(e) => {
                  searchName(e.target.value);
                  navigate(`/menu/${menuId}/1`);
                }}
              />
            </label>
            <RangeSlider
              maxValue={maxPrice}
              minValue={minPrice}
              text="Price range:"
              setValue={setPrice}
            />
            <label className="block mb-2 text-sm font-medium text-gray-900">
              <select
                className="w-full mt-10 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="" selected>
                  Sort products by ...
                </option>
                <option value="price_asc">Price</option>
                <option value="calories_asc">Calories</option>
                <option value="name_asc">Name</option>
              </select>
            </label>
          </form>
        </div>
      )}
    </div>
  );
};

export default InputForm;
