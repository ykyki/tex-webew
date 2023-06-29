import { parse_paragraphs } from '@lib/parser';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Container from '../components/container';

export default function Home() {
    const initialText = `\\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.
よって, \\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.`;

    const [text, setText] = useState(initialText);
    const [charCount, setCharCount] = useState(0);

    const textAreaHandler = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setText(e.target.value);
        },
        [],
    );

    useEffect(() => {
        console.log(text);
    }, [text]);

    useEffect(() => {
        setCharCount(text.length);
    }, [text]);

    return (
        <Container>
            <h1>tex web view</h1>
            <Container>
                <p>
                    {JSON.stringify(
                        parse_paragraphs('Hello, world!$X$, $$Y$$.'),
                    )}
                </p>
            </Container>
            <Container>
                <textarea
                    value={text}
                    onChange={textAreaHandler}
                    style={{ width: '100%', height: '300px' }}
                />
                <span>count: {charCount}</span>
            </Container>
        </Container>
    );
}
