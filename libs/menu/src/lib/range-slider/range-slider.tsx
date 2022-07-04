import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface RangeSliderProps {
  minValue: number;
  maxValue: number;
  setValue: any;
  text: string;
}

export const RangeSlider = (props: RangeSliderProps) => {
  const { minValue, maxValue, setValue, text } = props;

  const { menuId } = useParams();
  const navigate = useNavigate();

  const [maximumValue, setMaximumValue] = useState<number>(maxValue);

  return (
    <label className="relative mt-10">
      <span className="absolute left-28 -top-10 text-center border border-black rounded p-1.5 w-[60px]">
        {minValue.toFixed(2)}
      </span>
      <div className="flex">
        <span className="font-bold w-32">{text}</span>
        <input
          className="w-full"
          type="range"
          min={minValue}
          max={maxValue}
          step="0.01"
          onChange={(e) => {
            setMaximumValue(parseFloat(e.target.value));
            setValue(parseFloat(e.target.value));
            navigate(`/menu/${menuId}/1`);
          }}
        />
      </div>
      <span className="absolute right-0 -top-10 text-center border border-black rounded p-1.5 w-[60px]">
        {!maximumValue ? maxValue : maximumValue.toFixed(2)}
      </span>
    </label>
  );
};

export default RangeSlider;
