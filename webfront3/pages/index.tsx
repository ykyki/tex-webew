import { ParseResult, parse_paragraphs } from '@lib/parser';
import { useCallback, useEffect, useRef, useState } from 'react';
import Container from '@components/container';
import Meta from '@components/meta';
import styles from 'styles/two-column.module.css';
import { ParseResultMap } from '@lib/entry-map';
import { render_parse_result_map } from '@lib/render';

const initialText =
    String.raw`\topT{3}位相空間$X$が可算コンパクトでないと仮定して、ある点有限な開被覆で有限部分被覆をもたないものが存在することを示す.

$ X $が可算コンパクトでなければ,
点列$ (x_n)_{n \in \N} $であって集積点を持たないものが存在する.
$ x_0 $が$ \{x_n\}_{n \in \N} $の集積点でないことから
$ x_0 $の開近傍$ U_0 $であって
$$ U_0 \cap \{x_1, x_2, x_3, \cdots\} = \emptyset $$
を満たすものが存在する.
また, $ X $が \topT{3} であることから,
閉近傍$ V_0 $であって$ x_0 \in V_0 \subset U_0 $を満たすものが存在する.
$ n \leq k $に対して,
$ V_n $は$ \{x_{k+1}, x_{k+2}, x_{k+3}, \cdots\}$
と交わらない$ x_n $の閉近傍であり,
相異なる$ i, j \leq k $について$ V_i \cap V_j = \emptyset $を満たすものとする.
このとき,
$$ \left(\bigcup_{n=0}^{n=k} V_{n} \right) \cup \{x_{k+2}, x_{k+3}, x_{k+4}, \cdots\} $$
は$ x_{k+1} $を含まない閉集合なので,
$ x_{k+1} $の閉近傍$ V_{k+1} $であって,
$$ \left(\bigcup_{n=0}^{n=k} V_{n} \right) \cup \{x_{k+2}, x_{k+3}, x_{k+4}, \cdots\} $$
と交わらないものがとれる.
$ W := X \setminus \{x_n\}_{n \in \N} $とし,
$$ \mathscr{V} := \{\mathop{\mathrm{Int}}\nolimits V_n\}_{n \in \N} \cup \{W\} $$
と定めると,
$ \mathscr{V} $は点有限な開被覆となるが部分被覆をもたない.

よって, 任意の点有限な開被覆が有限部分被覆をもつならば可算コンパクトである.
`.repeat(1);

export default function Home() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [text, setText] = useState('');
    const TEXT_UPDATE_INTERVAL_MS = 100;
    useEffect(() => {
        const intervalId = setInterval(() => {
            setText(textareaRef.current?.value ?? '');
        }, TEXT_UPDATE_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, []);

    const [charCount, setCharCount] = useState(0);
    useEffect(() => {
        setCharCount(text.length);
    }, [text]);

    const [parseResult, setParseResult] = useState<ParseResult>();
    useEffect(() => {
        setParseResult(parse_paragraphs(text));
    }, [text]);

    const [prMap, setEntryMap] = useState<ParseResultMap>(new ParseResultMap());
    useEffect(() => {
        if (parseResult?.status === 'ok') {
            // setEntryMap((prMap) => {
            //     prMap.add(parseResult.map);
            //     return prMap;
            // });
            const prMap = new ParseResultMap();
            prMap.add(parseResult.map);
            setEntryMap(prMap);
        }
    }, [parseResult]);

    const render = useCallback(() => {
        return parseResult ? (
            parseResult.status === 'ok' ? (
                <div style={{ wordBreak: 'break-all' }}>
                    {render_parse_result_map(parseResult.root, prMap)}
                </div>
            ) : (
                <div>
                    <p>ParseError</p>
                    <p>{parseResult.message}</p>
                </div>
            )
        ) : (
            <div>Parsing ...</div>
        );
    }, [parseResult, prMap]);

    return (
        <Container large>
            <Meta />

            <h1>tex web view</h1>
            <div className={styles.two_column}>
                <div className={styles.left_side}>
                    <Container>
                        <textarea
                            ref={textareaRef}
                            defaultValue={initialText}
                            style={{ width: '100%', height: '500px' }}
                        />
                        <span>count: {charCount}</span>
                    </Container>
                </div>
                <div className={styles.right_side}>
                    <Container>{render()}</Container>
                </div>
            </div>
        </Container>
    );
}
