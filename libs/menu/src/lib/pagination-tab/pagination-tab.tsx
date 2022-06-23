/* eslint-disable-next-line */
export interface PaginationTabProps {
  pageNumber: number;
}

export const PaginationTab = (props: PaginationTabProps) => {
  const { pageNumber } = props;

  return (
    <div className="border-2 bg-gray-100 cursor-pointer hover:bg-gray-200 mx-1">
      <p className="py-1.5 px-3">{pageNumber}</p>
    </div>
  );
};

export default PaginationTab;
