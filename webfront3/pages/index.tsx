import { ParseResult, parse_paragraphs } from '@lib/parser';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Container from '@components/container';
import Meta from '@components/meta';

export default function Home() {
    const initialText = `\\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.
よって, \\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.`;

    const [text, setText] = useState(initialText);
    const textAreaHandler = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setText(e.target.value);
        },
        [],
    );

    const [charCount, setCharCount] = useState(0);
    useEffect(() => {
        setCharCount(text.length);
    }, [text]);

    const [parseResult, setParseResult] = useState<ParseResult>();
    useEffect(() => {
        setParseResult(parse_paragraphs(text));
    }, [text]);

    return (
        <Container>
            <Meta />

            <h1>tex web view</h1>
            <Container>
                <textarea
                    value={text}
                    onChange={textAreaHandler}
                    style={{ width: '100%', height: '300px' }}
                />
                <span>count: {charCount}</span>
            </Container>
            <Container>
                <p>{JSON.stringify(parseResult)}</p>
            </Container>
        </Container>
    );
}
