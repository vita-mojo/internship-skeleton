import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../apps/online-store/src/utils/APIrequest';
import CategoryModifierSide from './category-modifier-side/category-modifier-side';
import ProductSide from './product-side/product-side';

/* eslint-disable-next-line */
export interface ItemCustomizationProps {}

interface ProductNutrition {
  [index: string]: number;
}

interface ProductMetadata {
  dietary: undefined;
  ingredients: '';
  nutrition: ProductNutrition;
}

interface ProductDetails {
  id: number;
  price: number;
  description: string;
  metadata: ProductMetadata;
  image: string;
  name: string;
}

export function ItemCustomization(props: ItemCustomizationProps) {
  const [product, setProduct] = useState<ProductDetails>({
    id: 0,
    price: 0,
    description: '',
    metadata: { dietary: undefined, ingredients: '', nutrition: {} },
    image: '',
    name: ''
  });

  const { productId } = useParams();

  useEffect(() => {
    getData(`/api/product/${productId}`).then((res: any) => {
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
      {product && <ProductSide product={product} />}
      {product && <CategoryModifierSide productPrice={product.price} />}
    </div>
  );
}
