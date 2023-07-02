import { ParseResult, parse_paragraphs } from '@lib/parser';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Container from '@components/container';
import Meta from '@components/meta';
import styles from 'styles/two-column.module.css';
import { ParseResultMap } from '@lib/entry-map';
import { render_parse_result_map } from '@lib/render';

export default function Home() {
    const initialText = `\\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.
よって, \\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.

`.repeat(2);

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

    const [prMap, setEntryMap] = useState<ParseResultMap>(new ParseResultMap());
    useEffect(() => {
        if (parseResult?.status === 'ok') {
            // setEntryMap((prMap) => {
            //     prMap.add(parseResult.map);
            //     return prMap;
            // });
            const prMap = new ParseResultMap();
            prMap.add(parseResult.map);
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
            <div>Undefined</div>
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
                            value={text}
                            onChange={textAreaHandler}
                            style={{ width: '100%', height: '500px' }}
                        />
                        <span>count: {charCount}</span>
                    </Container>
                </div>
                <div className={styles.right_side}>
                    <Container>{render()}</Container>
                </div>
            </div>
        </Container>
    );
}
