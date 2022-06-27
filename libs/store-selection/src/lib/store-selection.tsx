import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../apps/online-store/src/utils/APIrequest';
import { Menu, StoreInfo } from '../variables-interfaces/store-interfaces';
import { FilterMenus } from './filter-menus/filter-menus';
import { PageButtons } from './page-buttons/page-buttons';
import { StoreCard } from './store-card/store-card';
/* eslint-disable-next-line */
export interface StoreSelectionProps {}

interface PageAndItems {
  allStores: number;
  itemsPerPage: number;
}

export function StoreSelection(props: StoreSelectionProps) {
  const [storesAndMenus, setStoresAndMenus] = useState<any>([]);
  const [filteredStoresAndMenus, setFilteredStoresAndMenus] = useState<any>([]);
  const [itemsAndPages, setItemsAndPages] = useState<PageAndItems>({
    allStores: 0,
    itemsPerPage: 0
  });
  const [storeName, setStoreName] = useState<string>('');
  const [activeBtn, setActiveBtn] = useState<string>('');
  const { page } = useParams();

  const handleStoreInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(event.target.value);
  };

  const filterByMenuType = (event: React.MouseEvent<HTMLButtonElement>) => {
    let menutype = event.currentTarget.name;
    console.log(menutype);
    if (menutype === 'Pickup') {
      menutype = 'PICK_UP';
      setActiveBtn('Pickup');
    } else if (menutype === 'Eat In') {
      menutype = 'EAT_IN';
      setActiveBtn('Eat In');
    } else if (menutype === 'Delivery') {
      menutype = 'DELIVERY';
      setActiveBtn('Delivery');
    }
    const filteredMenus = storesAndMenus.map((item: StoreInfo) => {
      const filter = item.menus.filter(
        (type: Menu) => type.channel === menutype
      );
      const filteredData = { ...item, menus: filter };
      return filteredData;
    });

    setFilteredStoresAndMenus(filteredMenus);
  };

  useEffect(() => {
    !page
      ? getData(`/api/stores/${1}`).then((newData: any) => {
          setStoresAndMenus(newData.data.storeAndItsMenus);
          setFilteredStoresAndMenus(newData.data.storeAndItsMenus);
          setItemsAndPages({
            allStores: newData.data.allStores,
            itemsPerPage: newData.data.itemsPerPage
          });
        })
      : getData(`/api/stores/${page}`).then((newData: any) => {
          setStoresAndMenus(newData.data.storeAndItsMenus);
          setFilteredStoresAndMenus(newData.data.storeAndItsMenus);
          setItemsAndPages({
            allStores: newData.data.allStores,
            itemsPerPage: newData.data.itemsPerPage
          });
        });
  }, [page]);

  useEffect(() => {
    const searchStoresByName = storesAndMenus.filter((item: any) =>
      item.name.toLowerCase().includes(storeName)
    );
    setFilteredStoresAndMenus(searchStoresByName);
  }, [storeName, storesAndMenus]);

  return (
    <div className="flex bg-amber-100">
      <div className="w-1/2">
        {/* ------------------------------ Select field ----------------------------------------*/}

        <div className="card w-3/4 mx-auto text-center m-3 p-3">
          <FilterMenus handleFilter={filterByMenuType} isActive={activeBtn} />
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
          {filteredStoresAndMenus.length &&
            filteredStoresAndMenus.map((store: any) => (
              <StoreCard key={store.id} storesInfo={store} />
            ))}
        </div>

        {/* ------------------------------ Page buttons ----------------------------------------*/}

        <div className="card w-3/4 mx-auto text-center m-3 p-3">
          {storesAndMenus.length && (
            <PageButtons
              allStores={itemsAndPages.allStores}
              itemsPerPage={itemsAndPages.itemsPerPage}
            />
          )}
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
