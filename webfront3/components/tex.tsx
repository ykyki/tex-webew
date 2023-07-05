import { FC, ReactElement, memo } from 'react';
import Katex from './katex';
import { ParseResultMap } from '@lib/entry-map';

type ComponentWithId = {
    id: string;
    body: ReactElement;
};

export const ParseResultMapComponent = memo(
    function ParseResultMapComponent({
        id,
        prMap,
    }: {
        id: string;
        prMap: ParseResultMap;
    }) {
        const value = prMap.find(id);

        if (value === undefined) {
            return (
                <span style={{ textDecoration: 'underline', color: '#cc0000' }}>
                    No Value: {id}
                </span>
            );
        }

        switch (value.kind) {
            case 'paragraphs':
                return (
                    <Paragraphs
                        components={value.keys.map((x) => ({
                            id: x,
                            body: (
                                <ParseResultMapComponent id={x} prMap={prMap} />
                            ),
                        }))}
                    />
                );
            case 'paragraph':
                return (
                    <Paragraph
                        components={value.keys.map((x) => ({
                            id: x,
                            body: (
                                <ParseResultMapComponent id={x} prMap={prMap} />
                            ),
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
    },
    (prevProps, nextProps) => prevProps.id === nextProps.id,
);

export const Paragraphs: FC<{ components: ComponentWithId[] }> = ({
    components,
}) => {
    return (
        <div>
            {components.map((x, i) => (
                // <div key={x.id}>{x.body}</div>
                <div key={i}>{x.body}</div>
            ))}
        </div>
    );
};

export const Paragraph: FC<{ components: ComponentWithId[] }> = ({
    components,
}) => {
    return (
        <p>
            {components.map((x, i) => (
                // <span key={x.id}>{x.body}</span>
                <span key={i}>{x.body}</span>
            ))}
        </p>
    );
};

export const PlainText: FC<{ content: string }> = ({ content }) => {
    return <span>{content}</span>;
};

export const InlineCommand: FC<{ content: string }> = ({ content }) => {
    return (
        <span style={{ textDecoration: 'underline double' }}>{content}</span>
    );
};

export const InlineMath: FC<{ status: boolean; content: string }> = ({
    status,
    content,
}) => {
    if (status) {
        return (
            <span>
                <Katex expr={content} />
            </span>
        );
    } else {
        return <span style={{ color: '#cc0000' }}>{content}</span>;
    }
};

export const DisplayMath: FC<{ status: boolean; content: string }> = ({
    status,
    content,
}) => {
    if (status) {
        return (
            <p style={{ textAlign: 'center' }}>
                <span>
                    <Katex expr={content} displayMode />
                </span>
            </p>
        );
    } else {
        return (
            <p style={{ textAlign: 'center' }}>
                <span style={{ color: '#cc0000' }}>{content}</span>
            </p>
        );
    }
};
