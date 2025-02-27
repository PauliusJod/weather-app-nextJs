import { useState } from "react";
import WeatherChart from "./WeatherChart";
import TimeIntervalForm from "../forms/TimeIntervalForm";
import WeatherDaily from "./WeatherDaily";
const th = "px-6 py-3";
const td = "px-6 py-2";
type Props = {
  time: object;
  temperature: object;
  precipitation: object;
  wind: object;
};

function WeatherDisplay({ time, temperature, precipitation, wind }: Props) {
  const [interval, setInterval] = useState<number>(6);
  const handleTimeIntervalChange = (TimeInterval: number) => {
    setInterval(TimeInterval);
  };

  const timeArray = Object.values(time).filter(
    (_, index) => index % interval === 0
  );
  const tempArray = Object.values(temperature).filter(
    (_, index) => index % interval === 0
  );
  const precipitationArray = Object.values(precipitation).filter(
    (_, index) => index % interval === 0
  );
  const windArray = Object.values(wind).filter(
    (_, index) => index % interval === 0
  );

  function fixedDate(data: Date) {
    const date = new Date(data);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const time = date.toLocaleTimeString([], { hour: "2-digit" });
    return (
      <div>
        {month} {day}
        <br /> {time}
      </div>
    );
  }

  return (
    <div className='flex-auto justify-center max-h-[800px] md:mb-10 mb-2 overflow-auto max-w-[375px] md:max-w-[800px] border-t-4 border-slate-300 dark:border-slate-700'>
      {tempArray.length > 0 ? (
        <div className='block my-4 '>
          <WeatherDaily></WeatherDaily>
          <WeatherChart
            key={tempArray[0] + interval + tempArray.length}
            timeA={timeArray}
            tempA={tempArray}
            precA={precipitationArray}
            windA={windArray}></WeatherChart>
          <TimeIntervalForm
            onChange={handleTimeIntervalChange}></TimeIntervalForm>
        </div>
      ) : (
        <></>
      )}

      <div className='relative overflow-auto md:mx-10 mx-2 ring-2 ring-slate-300 dark:ring-slate-600'>
        <table className='w-full text-sm text-left rtl:text-right border-2 border-slate-400 dark:border-slate-700 text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-slate-300 dark:bg-slate-700 dark:text-gray-400'>
            <tr>
              <th
                scope='col'
                className={`${th} min-w-[100px]`}>
                Time
              </th>
              <th
                scope='col'
                className={th}>
                Temp (°C)
              </th>
              {precipitationArray.length > 0 ? (
                <th
                  scope='col'
                  className={th}>
                  Precipitation <sup>(%)</sup>
                </th>
              ) : (
                <></>
              )}
              {windArray.length > 0 ? (
                <th
                  scope='col'
                  className={th}>
                  Wind <sup>(km/h)</sup>
                </th>
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody>
            {timeArray.map((_, i) => (
              <tr
                key={i}
                className={`bg-slate-200 border-slate-800 ${
                  (i + 1) % (24 / interval) === 0 ? "border-b-4" : "border-b"
                } dark:bg-slate-800 dark:border-gray-700`}>
                <td className={td}>{fixedDate(timeArray[i])}</td>
                <td className={td}>{tempArray[i]}</td>
                {precipitationArray.length ? (
                  <td className={td}>{precipitationArray[i]}</td>
                ) : (
                  <></>
                )}
                {windArray.length ? (
                  <td className={td}>{windArray[i]}</td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeatherDisplay;
