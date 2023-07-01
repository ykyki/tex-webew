import katex, { KatexOptions } from 'katex';
import 'katex/dist/katex.min.css';
import { useEffect, useRef } from 'react';

const options: KatexOptions = {
    throwOnError: false,
    displayMode: false,
    errorColor: '#cc0000',
    strict: 'ignore',
    trust: false,
    // macros, // todo
};

export default function Katex({
    expr,
    displayMode = false,
}: {
    expr: string;
    displayMode?: boolean;
}) {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            katex.render(expr, container.current, {
                ...options,
                displayMode,
            });
        }
    }, [expr, displayMode]);

    return <span ref={container} />;
}