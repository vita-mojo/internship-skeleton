import { useEffect, useState } from 'react';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../../apps/online-store/src/utils/APIrequest';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import capitalizeFirstLetter from '../../../../../apps/online-store/src/utils/capitalizeFirstLetter';

/* eslint-disable-next-line */
export interface CategoryModifierSideProps {}

type MyGroupType = {
  [index: string]: Array<number>;
};

export function CategoryModifierSide(props: CategoryModifierSideProps) {
  const [selectedModifiers, setSelectedModifiers] = useState<{
    [Size: string]: MyGroupType;
    Supplements: MyGroupType;
    Options: MyGroupType;
  }>({
    Size: { modifiers: [] },
    Supplements: { modifiers: [] },
    Options: { modifiers: [] }
  });
  const [categoryMods, setcategoryMods] = useState<any>([]);

  useEffect(() => {
    getData(`/api/modifierCategory/${1}`).then((res: any) => {
      setcategoryMods(res.data);
      res.data.forEach((el: any) => {
        el.modifiers.forEach((el1: any) => {
          if (el1.isDefault) {
            setSelectedModifiers((prevState: any) => ({
              ...prevState,
              [el.name]: {
                modifiers: [el1.id]
              }
            }));
          }
        });
      });
    });
  }, []);

  console.log('catmod', categoryMods);

  const handleClick = (catModName: string, modId: number) => {
    if (catModName === 'Size') {
      setSelectedModifiers((prevState: any) => ({
        ...prevState,
        [catModName]: {
          modifiers: [modId]
        }
      }));
    } else if (selectedModifiers[catModName]['modifiers'].includes(modId)) {
      setSelectedModifiers((prevState: any) => ({
        ...prevState,
        [catModName]: {
          modifiers: prevState[catModName].modifiers.filter(
            (el: any) => el !== modId
          )
        }
      }));
    } else {
      setSelectedModifiers((prevState: any) => ({
        ...prevState,
        [catModName]: {
          modifiers: [...prevState[catModName].modifiers, modId]
        }
      }));
    }
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
                        onClick={() => handleClick(catMod.name, mod.id)}
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
        className="w-[50%] bg-black text-white rounded-xl flex justify-between p-3 ml-[50%] hover:bg-zinc-700"
        type="button"
      >
        <span>Add to order</span>
        {/* //<span>{price}</span> */}
      </button>
    </div>
  );
}

export default CategoryModifierSide;
