export interface WeatherForm {
  weatherForm: {
    latitude: string;
    longitude: string;
    rainChecked: boolean;
    windChecked: boolean;
  };
}

export const sortTime = (index: number, time: object) => {
  return Object.values(time).filter(
    (_, i) => index * 23 - 23 + index - 1 <= i && i < index * 23 + index
  );
};
export const sortTemp = (index: number, temperature: object) => {
  return Object.values(temperature).filter(
    (_, i) => index * 23 - 23 + index - 1 <= i && i < index * 23 + index
  );
};
export const sortPrec = (index: number, precipitation: object) => {
  return Object.values(precipitation).filter(
    (_, i) => index * 23 - 23 + index - 1 <= i && i < index * 23 + index
  );
};
export const sortWind = (index: number, wind: object) => {
  return Object.values(wind).filter(
    (_, i) => index * 23 - 23 + index - 1 <= i && i < index * 23 + index
  );
};
export const getTime = (time: object) => {
  return Object.values(time);
};
export const getTemp = (temperature: object) => {
  return Object.values(temperature);
};
export const getPrec = (precipitation: object) => {
  return Object.values(precipitation);
};
export const getWind = (wind: object) => {
  return Object.values(wind);
};

export function initDate() {
  const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return `${date}`;
}
