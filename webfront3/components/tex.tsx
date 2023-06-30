import { FC, ReactElement } from 'react';
import Katex from './katex';

type ComponentWithKey = {
    key: string;
    body: ReactElement;
};

export const Paragraphs: FC<{ components: ComponentWithKey[] }> = ({
    components,
}) => {
    return (
        <div>
            {components.map((x) => (
                <div key={x.key}>{x.body}</div>
            ))}
        </div>
    );
};

export const Paragraph: FC<{ components: ComponentWithKey[] }> = ({
    components,
}) => {
    return (
        <p>
            {components.map((x) => (
                <span key={x.key}>{x.body}</span>
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
                    <Katex expr={content} />
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
