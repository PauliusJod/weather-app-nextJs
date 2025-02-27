import React from "react";
import { TiWeatherCloudy } from "react-icons/ti";
import { BsCalendar3Week } from "react-icons/bs";

type WeatherProps = {
  index: number;
  label: string | null;
  time: object[];
  temp: object;
  prec: object;
  wind: object;
  toggled: boolean;
};
interface ChoosenDayProp {
  onChange: (choosenDay: number) => void;
}
const WeatherDailyCard: React.FC<WeatherProps & ChoosenDayProp> = React.memo(
  ({ index, label, time, temp, prec, wind, toggled, onChange }) => {
    const WeekDay = () => {
      const data = Object.values(time)[0] as Date;
      const date = new Date(data);
      const day = date.toLocaleString("default", { weekday: "short" });
      return day;
    };

    const DayTemp = () =>
      (
        Object.values(temp)
          .slice(6, 18)
          .reduce((acc, curr) => acc + curr, 0) /
        (Object.keys(temp).length / 2)
      ).toFixed(0);
    const NightTemp = () =>
      (
        Object.values(temp)
          .slice(18)
          .concat(Object.values(temp).slice(0, 6))
          .reduce((acc, curr) => acc + curr, 0) /
        (Object.keys(temp).length / 2)
      ).toFixed(0);
    return (
      <button
        className={`bg-slate-300 dark:bg-slate-800 transition-colors border rounded-sm border-slate-500 hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-900 ${
          toggled
            ? "shadow-sm shadow-orange-900 dark:shadow-orange-500 hover:shadow-sm hover:shadow-orange-500 dark:hover:shadow-orange-900"
            : ""
        }`}
        onClick={() => onChange(index)}>
        {label ? (
          <>
            <p className='text-yellow-800 dark:text-yellow-400'>{label}</p>
            <BsCalendar3Week
              size={35}
              className='mx-auto text-slate-700 dark:text-slate-100'
            />
          </>
        ) : (
          <>
            <div className='flex justify-between text-xs px-2'>
              <p className='text-yellow-800 dark:text-yellow-500'>
                {DayTemp()} °C
              </p>
              <p className='text-slate-800 dark:text-slate-400'>
                {NightTemp()} °C
              </p>
            </div>
            <TiWeatherCloudy
              size={45}
              className='mx-auto text-slate-700 dark:text-slate-100 sm:hidden md:flex'
            />
            <p className='text-sm text-slate-700 dark:text-slate-100'>
              {WeekDay()}
            </p>
            <p className='text-sm text-slate-700 dark:text-slate-100'>
              Celcius
            </p>
          </>
        )}
      </button>
    );
  }
);

export default WeatherDailyCard;
