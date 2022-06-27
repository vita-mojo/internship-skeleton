import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface PaginationTabProps {
  page: number;
}

export const PaginationTab = (props: PaginationTabProps) => {
  const { page } = props;

  const { pageNumber } = useParams();

  return (
    <div
      className={`border-2 cursor-pointer bg-gray-100 hover:bg-gray-300 mx-1 ${
        String(page) === pageNumber && 'bg-gray-300'
      }`}
    >
      <p className="py-1.5 px-3">{page}</p>
    </div>
  );
};

export default PaginationTab;
