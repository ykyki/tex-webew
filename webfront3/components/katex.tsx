import katex, { KatexOptions } from 'katex';
import 'katex/dist/katex.min.css';
import { FC, useEffect, useRef } from 'react';

const options: KatexOptions = {
    throwOnError: false,
    displayMode: false,
    errorColor: '#cc0000',
    strict: 'ignore',
    trust: false,
    macros: {
        '\\C': '\\mathbb{C}', // サンプル
        '\\X': '\\mathbb{X}', // サンプル
    },
    // 暫定的にtrueにしている
    // TODO: コンポネント毎にmacrosを渡すように, globalGroupを使用しないようにする
    // 再レンダリング回数抑制しているため, 思ったように表示が更新されないことがある
    globalGroup: true,
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
