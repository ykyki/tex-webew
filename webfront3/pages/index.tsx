import { ParseResult, parse_paragraphs } from '@lib/parser2';
import { useEffect, useRef, useState } from 'react';
import Container from '@components/container';
import Meta from '@components/meta';
import styles from 'styles/two-column.module.css';
import { ParseResultComponent } from '@components/parse-result';

const initialText = `\\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.
よって, \\( \\mathscr{V} := U_x^X \\)は\\( X \\)の開被覆である.

`.repeat(10);

export default function Home() {
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
        parse_paragraphs(text).then((result) => {
            setParseResult(result);
        });
    }, [text]);

    const [charCount, setCharCount] = useState(0);
    useEffect(() => {
        if (parseResult?.status === 'ok') {
            setCharCount(parseResult.count);
        }
    }, [parseResult]);

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
                    <Container>
                        <ParseResultComponent parseResult={parseResult} />
                    </Container>
                </div>
            </div>
        </Container>
    );
}
