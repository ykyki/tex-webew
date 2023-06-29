import { ParseResult, parse_paragraphs } from '@lib/parser';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Container from '@components/container';
import Meta from '@components/meta';
import styles from 'styles/two-column.module.css';

export default function Home() {
    const initialText = `\\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.
よって, \\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.
`.repeat(100);

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
        <Container large>
            <Meta />

            <h1>tex web view</h1>
            <div className={styles.two_column}>
                <div className={styles.left_side}>
                    <Container>
                        <textarea
                            value={text}
                            onChange={textAreaHandler}
                            style={{ width: '100%', height: '300px' }}
                        />
                        <span>count: {charCount}</span>
                    </Container>
                </div>
                <div className={styles.right_side}>
                    <Container>
                        <p style={{ wordBreak: 'break-word' }}>
                            {JSON.stringify(parseResult)}
                        </p>
                    </Container>
                </div>
            </div>
        </Container>
    );
}
