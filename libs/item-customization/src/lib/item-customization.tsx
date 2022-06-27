import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../apps/online-store/src/utils/APIrequest';
import CategoryModifierSide from './category-modifier-side/category-modifier-side';
import ProductSide from './product-side/product-side';
import { ProductDetails } from './variables-interfaces/variables-interfaces';

const initialState = {
  id: 0,
  price: 0,
  description: '',
  metadata: { dietary: '', ingredients: '', nutrition: {} },
  image: '',
  name: ''
};

export function ItemCustomization() {
  const [product, setProduct] = useState<ProductDetails>(initialState);

  const { productId } = useParams();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getData(`/api/product/${productId}`).then((res: any) => {
      setProduct({ ...res.data.data });
    });
  }, [productId]);

  return (
    <div className="flex relative min-h-[calc(100vh-74px)]">
      <Link className="absolute right-3 top-3" to="/menu">
        <AiOutlineClose size="38" className="hover:fill-zinc-300" />
      </Link>
      {product && <ProductSide product={product} />}
      {product && <CategoryModifierSide productPrice={product.price} />}
    </div>
  );
}
