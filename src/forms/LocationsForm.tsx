interface Country {
  Country: string;
  Capital: string;
}
interface LocationsFormProps {
  countries: Country[];
  onChange: (locationIndex: number) => void;
}

const LocationsForm: React.FC<LocationsFormProps> = ({
  countries,
  onChange,
}) => {
  return (
    <form className='max-w-sm mx-auto p-1 my-2 bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark rounded-md'>
      <label
        htmlFor='underline_select'
        className='sr-only'>
        Underline select
      </label>
      <select
        onChange={(e) => {
          var num: number;
          num = parseInt(e.target.value);
          onChange(num);
        }}
        id='underline_select'
        className='block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-800 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-900 peer'>
        {countries.map((i, j) => (
          <option
            value={j as number}
            key={j}>
            {"(" + i.Country + ") - " + i.Capital}
          </option>
        ))}
      </select>
    </form>
  );
};

export default LocationsForm;
