import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  sortPrec,
  sortTemp,
  sortTime,
  sortWind,
  WeatherForm,
} from "../../utils/utils";

interface WeatherState {
  value: object;
  time: object;
  temperature: object;
  precipitation: object;
  wind: object;
  dayTime: object;
  dayTemperature: object;
  dayPrecipitation: object;
  dayWind: object;
}

const initialState: WeatherState = {
  value: [],
  time: [],
  temperature: [],
  precipitation: [],
  wind: [],
  dayTime: [],
  dayTemperature: [],
  dayPrecipitation: [],
  dayWind: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    resetWeather: (state) => {
      state.value = [];
      state.time = [];
      state.temperature = [];
      state.precipitation = [];
      state.wind = [];
    },
    resetDayWeather: (state) => {
      state.dayTime = state.time || [];
      state.dayTemperature = state.temperature || [];
      state.dayPrecipitation = state.precipitation || [];
      state.dayWind = state.wind || [];
    },
    setTime: (state, action: PayloadAction<{ index: number }>) => {
      state.dayTime = sortTime(action.payload.index + 1, state.time);
    },
    setTemperature: (state, action: PayloadAction<{ index: number }>) => {
      state.dayTemperature = sortTemp(
        action.payload.index + 1,
        state.temperature
      );
    },
    setPrecipitation: (state, action: PayloadAction<{ index: number }>) => {
      state.dayPrecipitation = sortPrec(
        action.payload.index + 1,
        state.precipitation
      );
    },
    setWind: (state, action: PayloadAction<{ index: number }>) => {
      state.dayWind = sortWind(action.payload.index + 1, state.wind);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherAsync.pending, (state) => {
        // console.log("fetchWeatherAsync.pending");
      })
      .addCase(
        fetchWeatherAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.value = action.payload;
          const {
            time,
            temperature_2m,
            precipitation_probability,
            wind_speed_10m,
          } = action.payload.data.hourly;
          state.time = time || [];
          state.temperature = temperature_2m || [];
          state.precipitation = precipitation_probability || [];
          state.wind = wind_speed_10m || [];
          state.dayTime = time || [];
          state.dayTemperature = temperature_2m || [];
          state.dayPrecipitation = precipitation_probability || [];
          state.dayWind = wind_speed_10m || [];
        }
      );
  },
});

export const fetchWeatherAsync = createAsyncThunk(
  "weather/fetchWeatherAsync",
  async ({ weatherForm }: WeatherForm) => {
    const { latitude, longitude, rainChecked, windChecked } = weatherForm;

    var result: object;
    var requestedData = "" as string;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      requestedData += rainChecked ? ",precipitation_probability" : "";
      requestedData += windChecked ? ",wind_speed_10m" : "";
      result = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m,apparent_temperature${requestedData}`
      );
      return result || null;
    } catch (err) {
      return null;
    }
  }
);

export const {
  resetWeather,
  resetDayWeather,
  setTime,
  setTemperature,
  setPrecipitation,
  setWind,
} = weatherSlice.actions;

export default weatherSlice.reducer;
