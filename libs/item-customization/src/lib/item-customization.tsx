import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../apps/online-store/src/utils/APIrequest';
import CategoryModifierSide from './category-modifier-side/category-modifier-side';
import ProductSide from './product-side/product-side';

/* eslint-disable-next-line */
export interface ItemCustomizationProps {}

export function ItemCustomization(props: ItemCustomizationProps) {
  const [product, setProduct] = useState({});
  useEffect(() => {
    getData(`/api/product/${2}`).then((res: any) => {
      setProduct({ ...res.data.data });
    });
    console.log('product', product);
  }, []);

  console.log(product);

  return (
    <div className="flex relative min-h-[100vh]">
      <Link className="absolute right-3 top-3" to="/menu">
        <AiOutlineClose size="38" className="hover:fill-zinc-300" />
      </Link>
      {product && (
        <ProductSide
          id={0}
          name={''}
          price={0}
          description={''}
          image={''}
          metadata={{
            dietary: undefined,
            ingredients: '',
            nutrition: {}
          }}
          {...product}
        />
      )}
      <CategoryModifierSide />
    </div>
  );
}
