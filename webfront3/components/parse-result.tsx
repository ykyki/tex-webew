import { ParseResultMap } from '@lib/entry-map';
import { ParseResult } from '@lib/parser';
import { render_parse_result_map } from '@lib/render';
import { ReactElement } from 'react';

export function ParseResultComponent({
    parseResult,
}: {
    parseResult: ParseResult | undefined;
}): ReactElement {
    if (parseResult) {
        if (parseResult.status === 'ok') {
            const prMap = new ParseResultMap();
            prMap.add(parseResult.entries);

            return (
                <div style={{ wordBreak: 'break-all' }}>
                    {render_parse_result_map(parseResult.root, prMap)}
                </div>
            );
        } else {
            return (
                <div>
                    <p>ParseError</p>
                    <p>{parseResult.message}</p>
                </div>
            );
        }
    } else {
        return <div>Parsing ...</div>;
    }
}
