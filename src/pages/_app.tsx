import { store } from "@/state/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className='bg-gradient-to-r from-slate-600 to-slate-700 min-h-screen'>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
