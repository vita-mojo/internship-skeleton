import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../apps/online-store/src/utils/APIrequest';
import FiltreForm from './filtre-form/filtre-form';
import PaginationTab from './pagination-tab/pagination-tab';
import Portal from './portal/portal';
import ProductCard from './product-card/product-card';

/* eslint-disable-next-line */
export interface MenuDataProps {
  data: any[];
  maxPrice: number;
  minPrice: number;
  howManyPages: number;
  page: number;
  totalProducts: number;
}

export const Menu = () => {
  const [menuData, setMenuData] = useState({} as MenuDataProps);
  const [page, setPage] = useState([] as number[]);
  const [search, setSearch] = useState('' as string);
  const [maximumPrice, setMaximumPrice] = useState<number>();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const { data, maxPrice, minPrice, howManyPages } = menuData;

  const { menuId, pageNumber } = useParams();

  const setSearchData = (value: string) => setSearch(value);
  const setPrice = (maxValue: number) => setMaximumPrice(maxValue);
  const setSort = (sort: string) => setSelectedOption(sort);

  useEffect(() => {
    maximumPrice
      ? getData(
          `/api/menu/products/${menuId}?page=${pageNumber}&name=${search}&sort=${selectedOption}&min_price=${minPrice}&max_price=${maximumPrice}`
        ).then((data: any) => setMenuData(data.data))
      : getData(
          `/api/menu/products/${menuId}?page=${pageNumber}&name=${search}&sort=${selectedOption}`
        ).then((data: any) => setMenuData(data.data));

    const pages: number[] = [...Array(howManyPages)].map(
      (x, index) => (x = index + 1)
    );
    setPage(pages);
  }, [
    howManyPages,
    maximumPrice,
    menuId,
    minPrice,
    pageNumber,
    search,
    selectedOption
  ]);

  return (
    <div className="bg-amber-100">
      <Routes>
        <Route path=":product/:id" element={<Portal />} />
      </Routes>
      <div className="container mx-auto">
        <FiltreForm
          searchName={setSearchData}
          setPrice={setPrice}
          setSort={setSort}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
        <div className="min-h-screen flex justify-center py-10">
          <div className="p-12 bg-gray-100 rounded-xl">
            <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 space-y-4 sm:space-y-0">
              {data &&
                data.map((product) => (
                  <ProductCard prod={product} key={product.id} />
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-20">
          {page.map((elem) => (
            <Link key={elem} to={`/menu/${menuId}/${elem}`}>
              <PaginationTab page={elem} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
