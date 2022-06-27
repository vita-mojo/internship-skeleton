import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../../apps/online-store/src/utils/APIrequest';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import capitalizeFirstLetter from '../../../../../apps/online-store/src/utils/capitalizeFirstLetter';
import Button from '../button/button';
import {
  CategoryModifier,
  CategoryModifierProps,
  Modifiers,
  SelectedCategoryModifierType
} from '../variables-interfaces/variables-interfaces';

export function CategoryModifierSide({ productPrice }: CategoryModifierProps) {
  const [countPrice, setCountPrice] = useState(0);
  const [onePriceCategory, setOnePriceCategory] = useState(0);
  const [selectedModifiers, setSelectedModifiers] =
    useState<SelectedCategoryModifierType>({});
  const [categoryModifier, setcategoryModifier] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    getData(`/api/modifierCategory/${productId}`).then((res: any) => {
      setcategoryModifier(res.data);
      res.data.forEach(({ modifiers, name }: CategoryModifier) => {
        modifiers.forEach(({ id, isDefault, price }: Modifiers) => {
          if (isDefault) {
            setSelectedModifiers((prevState: SelectedCategoryModifierType) => ({
              ...prevState,
              [name]: {
                modifiers: [id]
              }
            }));
            setOnePriceCategory(price);
          }
        });
      });
    });
  }, [productId]);

  const handleClick = (
    catModName: string,
    modId: number,
    price: number,
    minSelect: number,
    maxSelect: number
  ) => {
    const arrayOfModsId =
      selectedModifiers[catModName] &&
      selectedModifiers[catModName]['modifiers'];
    const select = maxSelect - minSelect;
    const length = selectedModifiers[catModName] && arrayOfModsId.length + 1;
    if (
      select > 0 &&
      selectedModifiers[catModName] &&
      arrayOfModsId.includes(modId)
    ) {
      setSelectedModifiers((prevState: SelectedCategoryModifierType) => ({
        ...prevState,
        [catModName]: {
          modifiers: prevState[catModName]['modifiers'].filter(
            (el: number) => el !== modId
          )
        }
      }));
      deccraiseCalculationPrice(modId);
    } else if (selectedModifiers[catModName] && select > 0) {
      length > maxSelect
        ? alert(`Sorry, you can select only ${maxSelect} modifiers`)
        : setSelectedModifiers((prevState: SelectedCategoryModifierType) => ({
            ...prevState,
            [catModName]: {
              modifiers: [...prevState[catModName]['modifiers'], modId]
            }
          }));
      increaseCalculationPrice(modId);
    } else {
      setSelectedModifiers((prevState: SelectedCategoryModifierType) => ({
        ...prevState,
        [catModName]: {
          modifiers: [modId]
        }
      }));
      select > 0 ? increaseCalculationPrice(modId) : setOnePriceCategory(price);
    }
  };

  const increaseCalculationPrice = (modId: number) => {
    categoryModifier.forEach((catMod: CategoryModifier) => {
      catMod.modifiers.forEach(({ id, price }: Modifiers) => {
        if (id === modId) {
          setCountPrice(countPrice + price);
        }
      });
    });
  };

  const deccraiseCalculationPrice = (modId: number) => {
    categoryModifier.forEach((catMod: CategoryModifier) => {
      catMod.modifiers.forEach(({ id, price }: Modifiers) => {
        if (id === modId) {
          setCountPrice(countPrice - price);
        }
      });
    });
  };

  const totalPrice: string = (
    countPrice +
    productPrice +
    onePriceCategory
  ).toFixed(2);
  return (
    <div className="bg-amber-100 p-5 grow">
      <p className="mb-9 text-3xl font-semibold">How would you like it?</p>
      <ul className="px-[55px] mb-12">
        {categoryModifier &&
          categoryModifier.map(
            ({
              id: catModId,
              name: catModName,
              minSelection,
              maxSelection,
              modifiers
            }: CategoryModifier) => {
              return (
                <li key={catModId} className="mb-4">
                  <p className="mb-2 text-xl font-semibold">{catModName}</p>
                  <div className="flex flex-wrap">
                    {modifiers.map(({ id, price, name }: Modifiers) => {
                      return (
                        <Button
                          type="button"
                          onClick={() =>
                            handleClick(
                              catModName,
                              id,
                              price,
                              minSelection,
                              maxSelection
                            )
                          }
                          key={id}
                          className={
                            selectedModifiers[catModName] &&
                            selectedModifiers[catModName]['modifiers'].includes(
                              id
                            )
                              ? 'bg-gray-300 border-solid border-2 border-zinc-300 rounded-md m-5 p-6 min-w-min w-[15%] hover:bg-zinc-500 hover:cursor-pointer'
                              : 'bg-white border-solid border-2 border-zinc-300 rounded-md m-5 p-6 min-w-min w-[15%] hover:bg-zinc-500 hover:cursor-pointer'
                          }
                        >
                          <span className="block text font-medium">
                            {capitalizeFirstLetter(name)}
                          </span>
                          <span className="block text-right">{price}</span>
                        </Button>
                      );
                    })}
                  </div>
                </li>
              );
            }
          )}
      </ul>
      <Button
        className="w-[50%] bg-black text-white rounded-xl flex justify-between py-3 px-9 ml-[50%] hover:bg-zinc-700"
        type="submit"
      >
        <span>Add to order</span>
        {productPrice > 0 && <span>{totalPrice}</span>}
      </Button>
    </div>
  );
}

export default CategoryModifierSide;
