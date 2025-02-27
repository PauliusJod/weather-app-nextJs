import WeatherDisplay from "@/components/WeatherDisplay";
import WeatherRequestForm from "@/forms/WeatherRequestForm";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { MdOutlineShowChart } from "react-icons/md";
import { useSelector } from "react-redux";
interface Country {
  Country: string;
  Capital: string;
}

interface PageProps {
  countries: Country[];
}

export default function Weather({ countries }: PageProps) {
  const [render, setRender] = useState<number>(0);
  const time = useSelector((state: RootState) => state.weather.dayTime);
  const temperature = useSelector(
    (state: RootState) => state.weather.dayTemperature
  );
  const precipitation = useSelector(
    (state: RootState) => state.weather.dayPrecipitation
  );
  const wind = useSelector((state: RootState) => state.weather.dayWind);
  const handleTimeIntervalChange = () => {
    setRender((prev) => prev + 1);
  };

  useEffect(() => {
    if (Object.keys(temperature).length > 0) {
      setRender((prev) => prev + 1);
    }
  }, []);
  return (
    <div>
      <main>
        <div className='flex justify-center'>
          <div className='w-[375px] sm:w-[800px] px-4 flex-row justify-center rounded-sm shadow-borders-main'>
            <WeatherRequestForm
              countries={countries}
              onChange={handleTimeIntervalChange}></WeatherRequestForm>
            {render > 0 ? (
              <WeatherDisplay
                key={render}
                time={time}
                temperature={temperature}
                precipitation={precipitation}
                wind={wind}
              />
            ) : (
              <div className='flex items-center justify-center border-t-4 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-500 p-6 font-bold'>
                <p className='px-2 text-lg text-slate-800 darkt:text-slate-300'>
                  Zero data selected
                </p>
                <MdOutlineShowChart
                  size={30}
                  className='text-slate-800 darkt:text-slate-300'></MdOutlineShowChart>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
export async function getStaticProps() {
  const req = await fetch("http://localhost:3000/countriesData.json");
  const countries = await req.json();

  return { props: { countries } };
}
