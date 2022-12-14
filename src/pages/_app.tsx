import { useEffect } from 'react';
import Head from 'next/head';
import { CssBaseline } from '@material-ui/core';

export default function NextSaasApp({ Component, pageProps }){
    useEffect(() => {
        const jssStyles = document.getElementById('#jss-server-side');
        if(jssStyles) jssStyles.parentElement.removeChild(jssStyles);
    }, []);

    return (
        <>
            <Head>
                <title> NextJS Saas App</title>
                <meta 
                    name='viewport' 
                    content='minimum-scale=1, initial-scale=1, width=device-width'
                />
            </Head>
            <CssBaseline/>
            <Component {...pageProps}/>
        </>
    );

}