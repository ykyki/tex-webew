import { ChangeEvent, FC, useEffect, useCallback, useRef } from 'react';

const DynamicHeightTextarea: FC<{
    defaultValue?: string;
    // eslint-disable-next-line no-unused-vars
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ defaultValue = '', onChange = () => {} }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const setHeight = useCallback(() => {
        if (textareaRef.current) {
            // Adjust the height of the textarea to match its content.
            textareaRef.current.style.height = 'auto'; // Set height to auto to reset it first.
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
        // TODO CSS初期化にはdefaultValueの変更を検知する必要がある. そのためにdefaultValueを暫定的に入れている
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textareaRef, defaultValue]);

    // initialize
    useEffect(() => {
        setHeight();
    }, [setHeight]);

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event);
        setHeight();
    };

    return (
        <textarea
            ref={textareaRef}
            className="dynamic-textarea"
            onChange={handleTextareaChange}
            defaultValue={defaultValue}
            placeholder="Type your text here"
            style={{ width: '100%', resize: 'none', overflowY: 'hidden' }}
            wrap="off"
        />
    );
};

export default DynamicHeightTextarea;
