import 'react-tabs/style/react-tabs.css';

import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import capitalizeFirstLetter from '../../../../../apps/online-store/src/utils/capitalizeFirstLetter';
import { ProductSideProps } from '../variables-interfaces/variables-interfaces';

export function ProductSide({ product }: ProductSideProps) {
  const [, setTabIndex] = useState(0);

  const { name, image, description, metadata } = product;

  const metadataNutritionEntries: [string, number][] = Object.entries(
    metadata.nutrition
  );
  return (
    <div className="p-5 bg-yellow-300 w-[30%]">
      <img
        src={image}
        alt={name}
        width="300"
        height="400"
        className="image mb-3 mx-auto"
      />
      <p className="product-name text-2xl mb-3 font-semibold">
        {capitalizeFirstLetter(name)}
      </p>
      <p className="product-description mb-3 font-medium">
        {capitalizeFirstLetter(description)}
      </p>
      <p className="info mb-3 text-zinc-700">Adults need 2000 kcal / day</p>
      <Tabs onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab style={{ backgroundColor: 'transparent' }}>Dietary info</Tab>
          <Tab style={{ backgroundColor: 'transparent' }}>Ingredients</Tab>
          <Tab style={{ backgroundColor: 'transparent' }}>Nutrition</Tab>
        </TabList>
        <TabPanel>
          {metadata.dietary ? (
            <p className="px-7"> {metadata.dietary}</p>
          ) : (
            <p>Sorry, no informmation about dietary info</p>
          )}
        </TabPanel>
        <TabPanel>
          {metadata.ingredients ? (
            <p className="px-7"> {metadata.ingredients}</p>
          ) : (
            <p>Sorry, no informmation about ingredients</p>
          )}
        </TabPanel>
        <TabPanel>
          {metadataNutritionEntries.map((el) => {
            return (
              <p className="px-7" key={el[0]}>
                <span className="mr-4"> {el[0]}</span>
                <span> {el[1]}</span>
              </p>
            );
          })}
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default ProductSide;
