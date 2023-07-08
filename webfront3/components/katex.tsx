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
}
