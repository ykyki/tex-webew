import Head from 'next/head';

import { siteMeta } from '@lib/constants';
import { FC } from 'react';
const { siteTitle } = siteMeta;

const Meta: FC<{
    pageTitle?: string;
    pageDesc: string;
}> = ({ pageTitle, pageDesc }) => {
    const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
    const desc = pageDesc;

    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />

            <meta name="description" content={desc} />
            <meta property="og:description" content={desc} />

            {/* TODO
            <link rel="canonical" href={url} />
            <meta property="og:url" content={url} /> */}
        </Head>
    );
};

export default Meta;
