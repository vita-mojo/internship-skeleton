import { HiOutlineInformationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export interface ProdInterface {
  id: number;
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

  const { menuId, pageNumber } = useParams();

  return (
    <div className="hover:shadow-lg">
      <div className="bg-white relative">
        <Link to={`/item-customization/${prod.id}`}>
          <img className="w-full" src={prod.image} alt="Need be product img" />
        </Link>
        <Link
          to={
            pageNumber
              ? `/menu/${menuId}/${pageNumber}/product/${prod.id}`
              : `/menu/${menuId}/1/product/${prod.id}`
          }
        >
          <span className="absolute bottom-2 right-2 text-2xl hover:scale-125">
            <HiOutlineInformationCircle />
          </span>
        </Link>
      </div>
      <div>
        <div className="px-4 py-2">
          <h1 className="text-xl font-gray-700 font-bold">{prod.name}</h1>
        </div>
        <div className="flex justify-between px-3">
          <p>{prod.price}</p>
          <p>
            {prod.metadata.nutrition.calories} <span>kcal</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
