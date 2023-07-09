// import { Profiler } from 'react';
import type { AppProps } from 'next/app';
import '@styles/global.css';

function App({ Component, pageProps }: AppProps) {
    return (
        // <Profiler
        //     id="app"
        //     onRender={(id, phase, actualDuration) => {
        //         console.log(
        //             `Component "${id}" took ${actualDuration}ms to render(${phase}).`,
        //         );
        //     }}>
        //     <Component {...pageProps} />
        // </Profiler>
        <Component {...pageProps} />
    );
}

export default App;
