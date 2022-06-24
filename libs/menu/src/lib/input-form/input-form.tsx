/* eslint-disable-next-line */
export interface InputFormProps {
  isOpen: boolean;
}

export const InputForm = (props: InputFormProps) => {
  const { isOpen } = props;

  return (
    <div>
      {isOpen && (
        <div>
          <form>
            <label>
              <input type="text" placeholder="Search by product name" />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                <option value="" selected disabled>
                  Sort products by ...
                </option>
                <option value="price">Price</option>
                <option value="calories">Calories</option>
                <option value="name">Name</option>
              </select>
            </label>
          </form>
        </div>
      )}
    </div>
  );
};

export default InputForm;
