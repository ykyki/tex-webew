import { FC, ReactElement, memo } from 'react';
import KatexComponent from './katex';
import { ParseResultMap } from '@lib/parse-result-map';
import displayMathStyles from '@styles/display-math.module.css';

type ComponentWithKey = {
    _key: string;
    body: ReactElement;
};

const _ParseResultMapComponent: FC<{
    _key: string;
    prMap: ParseResultMap;
}> = ({ _key: id, prMap }) => {
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
                        _key: x,
                        body: (
                            <ParseResultMapComponent _key={x} prMap={prMap} />
                        ),
                    }))}
                />
            );
        case 'paragraph':
            return (
                <Paragraph
                    components={value.keys.map((x) => ({
                        _key: x,
                        body: (
                            <ParseResultMapComponent _key={x} prMap={prMap} />
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
};

export const ParseResultMapComponent = memo(
    _ParseResultMapComponent,
    // _keyにはvalueのhash値が入っているので, _keyのみを比較すれば十分
    (prevProps, nextProps) => prevProps._key === nextProps._key,
);

export const Paragraphs: FC<{ components: ComponentWithKey[] }> = ({
    components,
}) => {
    return (
        <div>
            {components.map((x, i) => (
                <div key={i}>{x.body}</div>
            ))}
        </div>
    );
};

export const Paragraph: FC<{ components: ComponentWithKey[] }> = ({
    components,
}) => {
    return (
        <p>
            {components.map((x, i) => (
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
        <span style={{ margin: '0.2em', textDecoration: 'underline double' }}>
            {content}
        </span>
    );
};

export const InlineMath: FC<{ status: boolean; content: string }> = ({
    status,
    content,
}) => {
    if (status) {
        return (
            <span style={{ margin: '0.2em' }}>
                <KatexComponent expr={content} />
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
            <div className={displayMathStyles.display_math}>
                <span>
                    <KatexComponent expr={content} displayMode />
                </span>
            </div>
        );
    } else {
        return (
            <div className={displayMathStyles.display_math}>
                <span style={{ color: '#cc0000' }}>{content}</span>
            </div>
        );
    }
};
