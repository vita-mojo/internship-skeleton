import { useEffect, useState } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';

export interface ProdInterface {
  id: number;
  createdAt: string;
  menu_id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any;
}

/* eslint-disable-next-line */
export interface ProductCardProps {
  prod: ProdInterface;
}

export const ProductCard = (props: ProductCardProps) => {
  const { prod } = props;
  const { id, image, name, price, metadata, createdAt } = prod;
  const { menuId, pageNumber } = useParams();

  const [newProductIcon, setnewProductIcon] = useState<boolean>(false);

  useEffect(() => {
    const date = new Date();
    const productDate = new Date(createdAt);
    const twoDasAgo = new Date(date.setDate(date.getDate() - 2));

    productDate >= twoDasAgo && setnewProductIcon(true);
  }, [createdAt]);

  return (
    <div className="hover:shadow-lg">
      <div className="bg-white relative">
        <Link to={`/item-customization/${id}`}>
          <div className="relative">
            {newProductIcon && (
              <img
                className="absolute top-5 right-5"
                src="https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-11/64/new-icon.png"
                alt="new product"
              />
            )}
            <img className="w-full" src={image} alt="Need be product img" />
          </div>
        </Link>
        <Link
          to={
            pageNumber
              ? `/menu/${menuId}/${pageNumber}/product/${id}`
              : `/menu/${menuId}/1/product/${id}`
          }
        >
          <span className="absolute bottom-2 right-2 text-2xl hover:scale-125">
            <HiOutlineInformationCircle />
          </span>
        </Link>
      </div>
      <div>
        <div className="px-4 py-2">
          <h1 className="text-xl font-gray-700 font-bold">{name}</h1>
        </div>
        <div className="flex justify-between px-3">
          <p>{price}</p>
          <p>
            {metadata.nutrition.calories} <span>kcal</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
