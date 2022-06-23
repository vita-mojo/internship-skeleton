import 'react-tabs/style/react-tabs.css';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { ProdInterface } from '../product-card/product-card';

interface DataInterface {
  data: ProdInterface;
}

export const ModalTab = (props: DataInterface) => {
  const { data } = props;
  return (
    <Tabs>
      <div className="font-bold mb-8">
        <TabList>
          <Tab style={{ backgroundColor: 'transparent' }}>Dietary info</Tab>
          <Tab style={{ backgroundColor: 'transparent' }}>Ingredients</Tab>
          <Tab style={{ backgroundColor: 'transparent' }}>Nutrition</Tab>
        </TabList>
      </div>
      <TabPanel>
        <p className="pb-8 font-bold text-lg">Energy</p>
        <p className="pb-8 font-bold text-lg">Allergens</p>
        <p className="pb-8 font-bold text-lg">Diets</p>
      </TabPanel>
      <TabPanel>{data.metadata.ingredients}</TabPanel>
      <TabPanel>
        {Object.keys(data.metadata.nutrition).map((x) => {
          return (
            <p key={x} className="pb-1 capitalize font-medium">
              {x} : {data.metadata.nutrition[x]}
            </p>
          );
        })}
      </TabPanel>
    </Tabs>
  );
};

export default ModalTab;
