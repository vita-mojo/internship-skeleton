import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../apps/online-store/src/utils/APIrequest';
import PaginationTab from './pagination-tab/pagination-tab';
import Portal from './portal/portal';
import ProductCard from './product-card/product-card';

/* eslint-disable-next-line */
export interface MenuDataProps {
  data: any[];
  howManyPages: number;
  page: number;
  totalProducts: number;
}

export const Menu = () => {
  const [menuData, setMenuData] = useState({} as MenuDataProps);
  const [page, setPage] = useState([] as number[]);

  const { menuId, pageNumber } = useParams();

  useEffect(() => {
    getData(`/api/menu/products/${menuId}?page=${pageNumber}`).then(
      (data: any) => setMenuData(data.data)
    );

    const pages: number[] = [...Array(menuData.howManyPages)].map(
      (x, index) => (x = index + 1)
    );
    setPage(pages);
  }, [menuData.howManyPages, menuId, pageNumber]);

  return (
    <div>
      <Routes>
        <Route path=":product/:id" element={<Portal />} />
      </Routes>
      <div className="bg-amber-100">
        <div className="min-h-screen flex justify-center items-center py-10">
          <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
            <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 space-y-4 sm:space-y-0">
              {menuData.data &&
                menuData.data.map((product) => (
                  <ProductCard prod={product} key={product.id} />
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-20">
          {page.map((elem) => (
            <Link to={`/menu/${menuId}/${elem}`}>
              <PaginationTab key={elem} pageNumber={elem} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
