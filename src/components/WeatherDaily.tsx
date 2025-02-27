import { useEffect, useState } from "react";
import WeatherDailyCard from "./WeatherDailyCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  sortTime,
  sortTemp,
  sortPrec,
  sortWind,
  getTime,
  getTemp,
  getPrec,
  getWind,
} from "../utils/utils";
import {
  resetDayWeather,
  setPrecipitation,
  setTemperature,
  setTime,
  setWind,
} from "../state/weather/weatherSlice";
import React from "react";

function WeatherDaily() {
  const [choosenDay, setChoosenDay] = useState<number>(7);
  const dispatch = useDispatch<AppDispatch>();

  const handleChoosenDayChange = (choosenDay: number) => {
    setChoosenDay(choosenDay);
  };
  useEffect(() => {
    if (choosenDay === 7) {
      dispatch(resetDayWeather());
    } else {
      dispatch(setTime({ index: choosenDay }));
      dispatch(setTemperature({ index: choosenDay }));
      dispatch(setPrecipitation({ index: choosenDay }));
      dispatch(setWind({ index: choosenDay }));
    }
  }, [choosenDay]);
  const time = useSelector((state: RootState) => state.weather.time);
  const temperature = useSelector(
    (state: RootState) => state.weather.temperature
  );
  const precipitation = useSelector(
    (state: RootState) => state.weather.precipitation
  );
  const wind = useSelector((state: RootState) => state.weather.wind);
  const days = Array(7).fill(null);

  const sortedDays = React.useMemo(
    () => [
      ...days.map((_, i) => ({
        label: null,
        time: sortTime(i + 1, time),
        temp: sortTemp(i + 1, temperature),
        prec: sortPrec(i + 1, precipitation),
        wind: sortWind(i + 1, wind),
      })),
      {
        label: "Weekly",
        time: getTime(time),
        temp: getTemp(temperature),
        prec: getPrec(precipitation),
        wind: getWind(wind),
      },
    ],
    [days]
  );
  return (
    <div className='grid gap-1 grid-cols-2 grid-rows-4 md:grid-cols-8 md:grid-rows-1 text-slate-200 my-auto px-2'>
      {sortedDays.map((_, i) => (
        <WeatherDailyCard
          key={i}
          index={i}
          label={_.label}
          toggled={choosenDay === i}
          time={_.time}
          temp={_.temp}
          prec={_.prec}
          wind={_.wind}
          onChange={handleChoosenDayChange}
        />
      ))}
    </div>
  );
}

export default WeatherDaily;
