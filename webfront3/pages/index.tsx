import { parse_paragraphs } from '@lib/parser';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

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

    useEffect(() => {
        console.log(text);
    }, [text]);

    return (
        <div>
            Home
            <p>
                {JSON.stringify(parse_paragraphs('Hello, world!$X$, $$Y$$.'))}
            </p>
            <textarea value={text} onChange={textAreaHandler} />
        </div>
    );
}
