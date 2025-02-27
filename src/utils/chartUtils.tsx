import { Area, Line } from "recharts";

export const precipitationChart = (
  showWind: boolean,
  showPrecipitation: boolean,
  showTemp: boolean
) => {
  if (showTemp && showWind) {
    return (
      <Area
        isAnimationActive={false}
        type='monotone'
        dataKey='precipitation'
        fill='#93c5fd'
        stroke='#93c5fd'
        hide={showPrecipitation}
      />
    );
  } else {
    return (
      <Line
        isAnimationActive={false}
        type='monotone'
        dataKey='precipitation'
        stroke='#93c5fd'
        hide={showPrecipitation}
      />
    );
  }
};

export const tempChart = (
  showWind: boolean,
  showPrecipitation: boolean,
  showTemp: boolean
) => {
  if (showWind && showPrecipitation) {
    return (
      <Area
        isAnimationActive={false}
        type='monotone'
        dataKey='temp'
        fill='#f87171'
        stroke='#f87171'
        hide={showTemp}
      />
    );
  } else {
    return (
      <Line
        isAnimationActive={false}
        type='monotone'
        dataKey='temp'
        stroke='#f87171'
        hide={showTemp}
      />
    );
  }
};

export const windChart = (
  showWind: boolean,
  showPrecipitation: boolean,
  showTemp: boolean
) => {
  if (showTemp && showPrecipitation) {
    return (
      <Area
        isAnimationActive={false}
        type='monotone'
        dataKey='wind'
        fill='#fdba74'
        stroke='#fdba74'
        hide={showWind}
      />
    );
  } else {
    return (
      <Line
        isAnimationActive={false}
        type='monotone'
        dataKey='wind'
        fill='#fdba74'
        stroke='#fdba74'
        hide={showWind}
      />
    );
  }
};
