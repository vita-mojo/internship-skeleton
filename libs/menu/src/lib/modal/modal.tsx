import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../../apps/online-store/src/utils/APIrequest';
import ModalTab from '../modal-tab/modal-tab';
import { ProdInterface } from '../product-card/product-card';

interface DataInterface {
  data: ProdInterface;
}

export const Modal = () => {
  const [productData, setProductData] = useState({} as DataInterface);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getData(`/api/product/${id}`).then((data: any) =>
      setProductData(data.data)
    );
  }, [id]);

  const { data } = productData;
  const date = new Date();
  const twoDasAgo = new Date(date.setDate(date.getDate() - 2));

  const goBack = () => {
    const { pathname } = location;
    const x: string[] = pathname.split('/');
    const y: string[] = x.splice(4, 2);
    const path: string = x.join('/');
    navigate(path);
  };

  return (
    <div className="text-white fixed top-0 left-0 z-20 w-full h-screen bg-[#0000008f]">
      <div className="w-3/4 absolute text-black p-8 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-100">
        {data && (
          <div className="relativ">
            <button
              className="text-3xl absolute right-4 top-4"
              onClick={() => {
                goBack();
              }}
            >
              <AiOutlineClose />
            </button>
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <div className="flex mt-3">
              <div>
                <div className="bg-white w-[600px] relative">
                  {new Date(data.createdAt) >= twoDasAgo && (
                    <img
                      className="absolute top-4 right-4"
                      src="https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-11/96/new-icon.png"
                      alt="new product"
                    />
                  )}
                  <img src={data.image} alt={data.name} />
                </div>
              </div>
              <div className="pl-8 w-full">
                <div className="text-zinc-600">
                  <p className="text-lg pb-6">{data.description}</p>
                  <p className="text-xl">Adults need 2000 kcal/day</p>
                </div>
                <div className="mt-4">
                  <ModalTab data={data} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
