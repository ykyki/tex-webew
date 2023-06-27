import { parse_paragraphs } from '@lib/parser';
import React from 'react';

export default function Home() {
    console.log(parse_paragraphs('Hello, world!$X$, $$Y$$.'));
    return (
        <div>
            Home
            <p>
                {JSON.stringify(parse_paragraphs('Hello, world!$X$, $$Y$$.'))}
            </p>
        </div>
    );
}
