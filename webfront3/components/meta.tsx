import Head from 'next/head';

import { siteMeta } from '@lib/constants';
const { siteTitle } = siteMeta;

export default function Meta() {
    const title = siteTitle;

    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
}
