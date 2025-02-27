import { useEffect, useState } from "react";

const defaultStyle =
  "flex items-center justify-center cursor-pointer px-3 h-8 leading-tight text-gray-500 bg-slate-100 border border-2 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
const toggleStyle =
  "z-10 flex items-center justify-center cursor-pointer px-3 h-8 leading-tight text-blue-600 border border-2 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";

interface TimeIntervalProp {
  onChange: (TimeInterval: number) => void;
}
const TimeIntervalForm: React.FC<TimeIntervalProp> = ({ onChange }) => {
  const [interval, setInterval] = useState<number>(6);

  useEffect(() => {
    onChange(interval);
  }, [interval]);
  return (
    <>
      <nav aria-label='Page navigation example'>
        <ul className='flex justify-center -space-x-px h-8 text-sm my-2 font-bold'>
          <li>
            <a
              onClick={() => setInterval(2)}
              className={`rounded-s-lg ${
                interval === 2 ? toggleStyle : defaultStyle
              }`}>
              2
            </a>
          </li>

          <li>
            <a
              onClick={() => setInterval(4)}
              className={interval === 4 ? toggleStyle : defaultStyle}>
              4
            </a>
          </li>
          <li>
            <a
              onClick={() => setInterval(6)}
              className={`rounded-e-lg ${
                interval === 6 ? toggleStyle : defaultStyle
              }`}>
              6
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default TimeIntervalForm;
