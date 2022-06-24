import 'react-tabs/style/react-tabs.css';

import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import capitalizeFirstLetter from '../../../../../apps/online-store/src/utils/capitalizeFirstLetter';

/* eslint-disable-next-line */
export interface ProductSideProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    metadata: {
      dietary?: string;
      ingredients: string;
      nutrition: {
        [key: string]: number;
      };
    };
  };
}

export function ProductSide({ product }: ProductSideProps) {
  const [tabIndex, setTabIndex] = useState(0);

  const { name, image, description, metadata } = product;

  const entries: [string, number][] = Object.entries(metadata.nutrition);
  return (
    <div className="p-5 bg-yellow-300 max-w-[35%]">
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
          <p>Sorry, no informmation about dietary info</p>
        </TabPanel>
        <TabPanel>
          {metadata.ingredients ? (
            <p className="px-7"> {metadata.ingredients}</p>
          ) : (
            <p>Sorry, no informmation about ingredients</p>
          )}
        </TabPanel>
        <TabPanel>
          {entries.map((el) => {
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
