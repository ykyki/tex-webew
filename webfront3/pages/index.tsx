import { ParseResult, parse_paragraphs } from '@lib/parser';
import { useCallback, useEffect, useRef, useState } from 'react';
import Container from '@components/container';
import Meta from '@components/meta';
import styles from 'styles/two-column.module.css';
import { ParseResultMap } from '@lib/entry-map';
import { render_parse_result_map } from '@lib/render';

export default function Home() {
    const initialText = `\\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.
よって, \\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.

`.repeat(100);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [text, setText] = useState('');
    const TEXT_UPDATE_INTERVAL_MS = 100;
    useEffect(() => {
        const intervalId = setInterval(() => {
            setText(textareaRef.current?.value ?? '');
        }, TEXT_UPDATE_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, []);

    const [parseResult, setParseResult] = useState<ParseResult>();
    useEffect(() => {
        setParseResult(parse_paragraphs(text));
    }, [text]);

    const [charCount, setCharCount] = useState(0);
    useEffect(() => {
        if (parseResult?.status === 'ok') {
            setCharCount(parseResult.count);
        }
    }, [parseResult]);

    const [prMap, setEntryMap] = useState<ParseResultMap>(new ParseResultMap());
    useEffect(() => {
        if (parseResult?.status === 'ok') {
            // setEntryMap((prMap) => {
            //     prMap.add(parseResult.map);
            //     return prMap;
            // });
            const prMap = new ParseResultMap();
            prMap.add(parseResult.entries);
            setEntryMap(prMap);
        }
    }, [parseResult]);

    const render = useCallback(() => {
        return parseResult ? (
            parseResult.status === 'ok' ? (
                <div style={{ wordBreak: 'break-all' }}>
                    {render_parse_result_map(parseResult.root, prMap)}
                </div>
            ) : (
                <div>
                    <p>ParseError</p>
                    <p>{parseResult.message}</p>
                </div>
            )
        ) : (
            <div>Parsing ...</div>
        );
    }, [parseResult, prMap]);

    return (
        <Container large>
            <Meta />

            <h1>tex web view</h1>
            <div className={styles.two_column}>
                <div className={styles.left_side}>
                    <Container>
                        <textarea
                            ref={textareaRef}
                            defaultValue={initialText}
                            style={{ width: '100%', height: '500px' }}
                        />
                        <div>count: {charCount}</div>
                    </Container>
                </div>
                <div className={styles.right_side}>
                    <Container>{render()}</Container>
                </div>
            </div>
        </Container>
    );
}
