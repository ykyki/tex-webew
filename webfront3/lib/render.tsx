import {
    DisplayMath,
    InlineCommand,
    InlineMath,
    Paragraph,
    Paragraphs,
    PlainText,
} from '@components/tex';
import { ParseResultMap } from '@lib/entry-map';
import { ReactElement } from 'react';

export const render_parse_result_map = (
    key: string,
    prmap: ParseResultMap,
): ReactElement => {
    const value = prmap.find(key);

    if (value === undefined) {
        return (
            <span
                key={key}
                style={{ textDecoration: 'underline', color: '#cc0000' }}>
                No Value: {key}
            </span>
        );
    }

    switch (value.kind) {
        case 'paragraphs':
            return (
                <Paragraphs
                    components={value.keys.map((key) => ({
                        key,
                        body: render_parse_result_map(key, prmap),
                    }))}
                />
            );
        case 'paragraph':
            return (
                <Paragraph
                    components={value.keys.map((key) => ({
                        key,
                        body: render_parse_result_map(key, prmap),
                    }))}
                />
            );
        case 'raw_text':
            return <PlainText content={value.content} />;
        case 'inline_command':
            return <InlineCommand content={value.content} />;
        case 'inline_math':
            return (
                <InlineMath
                    status={value.status === 'ok'}
                    content={value.content}
                />
            );
        case 'display_math':
            return (
                <DisplayMath
                    status={value.status === 'ok'}
                    content={value.content}
                />
            );
    }
};
