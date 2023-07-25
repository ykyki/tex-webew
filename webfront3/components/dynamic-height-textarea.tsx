import { RefObject, ChangeEvent, FC, useEffect, useCallback } from 'react';

const DynamicHeightTextarea: FC<{
    textareaRef: RefObject<HTMLTextAreaElement>;
    defaultValue: string;
}> = ({ textareaRef, defaultValue = '' }) => {
    const setHeight = useCallback(() => {
        if (textareaRef.current) {
            // Adjust the height of the textarea to match its content.
            textareaRef.current.style.height = 'auto'; // Set height to auto to reset it first.
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [textareaRef]);

    useEffect(() => {
        setHeight();
    }, [setHeight]);

    const handleTextareaChange = (_event: ChangeEvent<HTMLTextAreaElement>) => {
        setHeight();
    };

    return (
        <textarea
            ref={textareaRef}
            className="dynamic-textarea"
            onChange={handleTextareaChange}
            defaultValue={defaultValue}
            placeholder="Type your text here..."
            style={{ width: '100%', resize: 'none', overflowY: 'hidden' }}
            wrap="off"
        />
    );
};

export default DynamicHeightTextarea;
