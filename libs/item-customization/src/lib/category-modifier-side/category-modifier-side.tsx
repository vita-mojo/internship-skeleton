import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../../apps/online-store/src/utils/APIrequest';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import capitalizeFirstLetter from '../../../../../apps/online-store/src/utils/capitalizeFirstLetter';

/* eslint-disable-next-line */
export interface CategoryModifierSideProps {}

type ModifiersType = {
  [index: string]: Array<number>;
};

interface CategoryModifiersProps {
  productPrice: number;
}

export function CategoryModifierSide({ productPrice }: CategoryModifiersProps) {
  const [countPrice, setCountPrice] = useState(0);
  const [sizePrice, setSizePrice] = useState(0);
  const [selectedModifiers, setSelectedModifiers] = useState<{
    [Size: string]: ModifiersType;
    Supplements: ModifiersType;
    Options: ModifiersType;
  }>({
    Size: { modifiers: [] },
    Supplements: { modifiers: [] },
    Options: { modifiers: [] }
  });
  const [categoryMods, setcategoryMods] = useState<any>([]);
  const { productId } = useParams();

  useEffect(() => {
    getData(`/api/modifierCategory/${productId}`).then((res: any) => {
      setcategoryMods(res.data);
      res.data.forEach((catMod: any) => {
        catMod.modifiers.forEach((mod: any) => {
          if (mod.isDefault) {
            setSelectedModifiers((prevState: any) => ({
              ...prevState,
              [catMod.name]: {
                modifiers: [mod.id]
              }
            }));
            setSizePrice(mod.price);
          }
        });
      });
    });
  }, []);

  console.log('catmod', categoryMods);

  const handleClick = (catModName: string, modId: number, price: number) => {
    if (catModName === 'Size') {
      setSelectedModifiers((prevState: any) => ({
        ...prevState,
        [catModName]: {
          modifiers: [modId]
        }
      }));
      setSizePrice(price);
    } else if (selectedModifiers[catModName]['modifiers'].includes(modId)) {
      setSelectedModifiers((prevState: any) => ({
        ...prevState,
        [catModName]: {
          modifiers: prevState[catModName].modifiers.filter(
            (el: number) => el !== modId
          )
        }
      }));
      deccraiseCalculationPrice(modId);
    } else {
      setSelectedModifiers((prevState: any) => ({
        ...prevState,
        [catModName]: {
          modifiers: [...prevState[catModName].modifiers, modId]
        }
      }));
      increaseCalculationPrice(modId);
    }
  };

  const increaseCalculationPrice = (modId: number) => {
    categoryMods.forEach((catMod: any) => {
      catMod.modifiers.forEach((mod: any) => {
        if (mod.id === modId) {
          setCountPrice(countPrice + mod.price);
        }
      });
    });
  };

  const deccraiseCalculationPrice = (modId: number) => {
    categoryMods.forEach((catMod: any) => {
      catMod.modifiers.forEach((mod: any) => {
        if (mod.id === modId) {
          setCountPrice(countPrice - mod.price);
        }
      });
    });
  };

  console.log(selectedModifiers);

  return (
    <div className="bg-amber-100 p-5 grow">
      <p className="mb-9 text-3xl font-semibold">How would you like it?</p>
      <ul className="px-[55px] mb-12">
        {categoryMods &&
          categoryMods.map((catMod: any) => {
            return (
              <li key={catMod.id} className="mb-4">
                <p className="mb-2 text-xl font-semibold">{catMod.name}</p>
                <div className="flex flex-wrap">
                  {catMod.modifiers.map((mod: any) => {
                    return (
                      <button
                        onClick={() =>
                          handleClick(catMod.name, mod.id, mod.price)
                        }
                        key={mod.id}
                        className={
                          selectedModifiers[catMod.name]['modifiers'].includes(
                            mod.id
                          )
                            ? 'bg-gray-300 border-solid border-2 border-zinc-300 rounded-md m-5 p-6 min-w-min w-[15%] hover:bg-zinc-500 hover:cursor-pointer'
                            : 'bg-white border-solid border-2 border-zinc-300 rounded-md m-5 p-6 min-w-min w-[15%] hover:bg-zinc-500 hover:cursor-pointer'
                        }
                      >
                        <span className="block text font-medium">
                          {capitalizeFirstLetter(mod.name)}
                        </span>
                        <span className="block text-right">{mod.price}</span>
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
      </ul>
      <button
        className="w-[50%] bg-black text-white rounded-xl flex justify-between py-3 px-9 ml-[50%] hover:bg-zinc-700"
        type="submit"
      >
        <span>Add to order</span>
        {productPrice > 0 && (
          <span>{(countPrice + productPrice + sizePrice).toFixed(2)}</span>
        )}
      </button>
    </div>
  );
}

export default CategoryModifierSide;
