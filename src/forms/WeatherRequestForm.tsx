import { useEffect, useState } from "react";
import { fetchWeatherAsync } from "../state/weather/weatherSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import LocationsForm from "./LocationsForm";

const schema = z.object({
  latitude: z.string().min(2),
  longitude: z.string().min(2),
  rainChecked: z.boolean(),
  windChecked: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

interface Country {
  Country: string;
  Capital: string;
}
interface TimeIntervalProp {
  countries: Country[];
  onChange: () => void;
}
export default function WeatherRequestForm({
  countries,
  onChange,
}: TimeIntervalProp) {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedLocation, setSelectedLocation] = useState<number>(0);
  const handleLocationChange = (locationIndex: number) => {
    setSelectedLocation(locationIndex);
  };

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      latitude: "53.9", // max 85 -85
      longitude: "23.9", // max 180 -180
      rainChecked: true,
      windChecked: true,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setValue(
      "latitude",
      countries[selectedLocation]?.Latitude?.toString() || "1"
    );
    setValue(
      "longitude",
      countries[selectedLocation]?.Longitude?.toString() || "1"
    );
  }, [selectedLocation]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await dispatch(fetchWeatherAsync({ weatherForm: data }));
      onChange();
    } catch (error) {
      setError("root", { message: "Something wrong.." });
    }
  };

  return (
    <div
      className='w-full bg-slate-300 dark:bg-slate-800 border-none ring-none rounded-sm'
      onSubmit={handleSubmit(onSubmit)}>
      <LocationsForm
        countries={countries}
        onChange={handleLocationChange}></LocationsForm>

      <form className='m-4'>
        <div className='flex justify-center gap-4 my-4'>
          <div className='grid grid-rows-2 gap-2'>
            <div className='flex justify-end items-center gap-2'>
              <p className='text-slate-900 dark:text-slate-100 text-md'>
                Show rain
              </p>
              <input
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
                {...register("rainChecked")}
                type='checkbox'></input>
            </div>
            <div className='flex justify-end items-center gap-2'>
              <p className='text-slate-900 dark:text-slate-100 text-md'>
                Show wind
              </p>
              <input
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
                {...register("windChecked")}
                type='checkbox'></input>
            </div>
          </div>
          <div className='inline-block min-h-[1em] w-0.5 self-stretch bg-slate-500 dark:bg-white/10'></div>
          <div className='grid grid-rows-2 gap-2'>
            <div className='relative z-0'>
              <input
                id='latitude_input'
                {...register("latitude")}
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                type='number'
                step='0.000005'
                min='-85'
                max='85'
              />
              <label
                htmlFor='latitude_input'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'>
                Latitude
              </label>
              {errors.latitude && (
                <div className='text-red-600'>{errors.latitude.message}</div>
              )}
            </div>
            <div className='relative z-0'>
              <input
                id='longitude_input'
                {...register("longitude")}
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                type='number'
                step='0.000005'
                min='-180'
                max='180'
              />
              <label
                htmlFor='longitude_input'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'>
                Longitude
              </label>
              {errors.longitude && (
                <div className='text-red-600'>{errors.longitude.message}</div>
              )}
            </div>
          </div>
        </div>
        {errors.root && (
          <div className='text-red-600'>{errors.root.message}</div>
        )}
        <div className='flex justify-center'>
          <button
            disabled={isSubmitting}
            className='text-white bg-gray-700  hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-900 dark:hover:bg-gray-900 dark:focus:ring-gray-700 dark:border-gray-700'
            type='submit'>
            {isSubmitting ? "Loading.." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
