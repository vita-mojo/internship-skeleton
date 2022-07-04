import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../apps/online-store/src/utils/APIrequest';
import { FilterMenus } from './filter-menus/filter-menus';
import { PageButtons } from './page-buttons/page-buttons';
import { StoreCard } from './store-card/store-card';
/* eslint-disable-next-line */
export interface StoreSelectionProps {}

export function StoreSelection(props: StoreSelectionProps) {
  const [storesAndMenus, setStoresAndMenus] = useState<any>([]);
  const [pages, setPages] = useState<number>(0);
  const [storeName, setStoreName] = useState<string>('');
  const [activeBtn, setActiveBtn] = useState<string>('');
  const { page, deliveryType, nameOfStore } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  let link;
  let redirectLink;

  const handleStoreInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setStoreName(inputValue);
    if (page && nameOfStore && deliveryType) {
      link = location.pathname.split('/');
      link.splice(2, link.length - 1, '1', 'menu', deliveryType, inputValue);
      redirectLink = link.join('/');
      navigate('/');
    }
    if (page && nameOfStore) {
      link = location.pathname.split('/');
      link.splice(link.length - 1, 1, inputValue);
      redirectLink = link.join('/');
      navigate(redirectLink);
    } else if (page && deliveryType) {
      link = location.pathname.split('/');
      link.splice(2, link.length - 1, '1', inputValue);
      redirectLink = link.join('/');
      navigate(redirectLink);
    } else if (page) {
      link = location.pathname.split('/');
      if (!link[link.length - 1]) {
        link.pop();
      }
      link.splice(3, 0, inputValue);
      redirectLink = link.join('/');
      navigate(redirectLink);
    } else {
      link = location.pathname.split('/');
      link.splice(2, 0, '1', inputValue);
      redirectLink = link.join('/');
      navigate(redirectLink);
    }
  };

  useEffect(() => {
    if (!page) {
      getData(`/api/stores/1`).then((newData: any) => {
        setStoresAndMenus(newData.data.storeAndItsMenus);
        setPages(newData.data.numOfPages);
      });
    } else if (deliveryType && nameOfStore) {
      getData(
        `/api/stores/${page}?deliveryType=${deliveryType}&storeName=${nameOfStore}`
      ).then((newData: any) => {
        setStoresAndMenus(newData.data.storeAndItsMenus);
        setPages(newData.data.numOfPages);
      });
    } else if (deliveryType) {
      getData(`/api/stores/${page}?deliveryType=${deliveryType}`).then(
        (newData: any) => {
          setStoresAndMenus(newData.data.storeAndItsMenus);
          setPages(newData.data.numOfPages);
        }
      );
    } else if (nameOfStore) {
      getData(`/api/stores/1?deliveryType=&storeName=${nameOfStore}`).then(
        (newData: any) => {
          setStoresAndMenus(newData.data.storeAndItsMenus);
          setPages(newData.data.numOfPages);
        }
      );
    } else {
      getData(`/api/stores/${page}`).then((newData: any) => {
        setStoresAndMenus(newData.data.storeAndItsMenus);
        setPages(newData.data.numOfPages);
      });
    }
  }, [page, deliveryType, storeName, nameOfStore]);

  return (
    <div className="flex bg-amber-100">
      <div className="w-1/2">
        {/* ------------------------------ Select field ----------------------------------------*/}

        <div className="card w-3/4 mx-auto text-center m-3 p-3">
          <FilterMenus isActive={activeBtn} />
        </div>

        {/* ------------------------------ Input field ----------------------------------------*/}

        <div className="card w-3/4 mx-auto text-center m-3 p-3">
          <label>
            Filter by store name &nbsp;
            <input
              onChange={handleStoreInput}
              placeholder="name"
              value={storeName}
            />
          </label>
        </div>

        {/* ------------------------------ Stores cards ----------------------------------------*/}

        <div className="h-96 overflow-auto">
          {storesAndMenus.length ? (
            storesAndMenus.map((store: any) => (
              <StoreCard key={store.id} storesInfo={store} />
            ))
          ) : (
            <p>Nothing found</p>
          )}
        </div>

        {/* ------------------------------ Page buttons ----------------------------------------*/}

        <div className="card w-3/4 mx-auto text-center m-3 p-3">
          {storesAndMenus.length ? <PageButtons pages={pages} /> : <p></p>}
        </div>
      </div>

      {/* ------------------------------ Image card ----------------------------------------*/}

      <div className="w-1/2 h-screen relative text-center md:bg-cover bg-contain bg-repeat bg-[url('https://leon.co/assets/images/hand-orange-optimised.jpg')]">
        <div className="absolute top-1/2 lg:left-10 lg:right-10 right-0 left-0">
          <h1 className="lg:text-7xl md:text-4xl sm:text-2xl font-bold pb-4">
            Smart order
          </h1>
          <h3 className="lg:text-3xl md:text-xl sm:text-xl font-bold">
            Order ahead and skip the queue
          </h3>
        </div>
      </div>
    </div>
  );
}
