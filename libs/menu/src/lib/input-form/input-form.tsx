import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

  const [maximumPrice, setMaximumPrice] = useState<number>(maxPrice);

  return (
    <div>
      {isOpen && (
        <div>
          <form className="flex flex-col">
            <label>
              <input
                type="text"
                placeholder="Search by product name"
                onChange={(e) => {
                  searchName(e.target.value);
                  navigate(`/menu/${menuId}/1`);
                }}
              />
            </label>
            <label>
              <span>Min price: {minPrice}</span>
              <input
                className="range"
                type="range"
                min={minPrice}
                max={maxPrice}
                step="0.01"
                onChange={(e) => {
                  setMaximumPrice(parseFloat(e.target.value));
                  setPrice(parseFloat(e.target.value));
                  navigate(`/menu/${menuId}/1`);
                }}
              />
              <span>Max price: {!maximumPrice ? maxPrice : maximumPrice}</span>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
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
