import katex, { KatexOptions } from 'katex';
import 'katex/dist/katex.min.css';
import { FC, useEffect, useRef } from 'react';

const options: KatexOptions = {
    throwOnError: false,
    displayMode: false,
    errorColor: '#cc0000',
    strict: 'ignore',
    trust: false,
    // macros, // todo
};

const KatexComponent: FC<{
    expr: string;
    displayMode?: boolean;
}> = ({ expr, displayMode = false }) => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (ref.current) {
            katex.render(expr, ref.current, {
                ...options,
                displayMode,
            });
        }
    }, [expr, displayMode]);

    return <span ref={ref} />;
};

export default KatexComponent;
