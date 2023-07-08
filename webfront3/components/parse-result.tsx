import { ParseResultMap } from '@lib/entry-map';
import { ParseResult } from '@lib/parser2';
import { FC } from 'react';
import { ParseResultMapComponent } from './tex';

export const ParseResultComponent: FC<{
    parseResult: ParseResult | undefined;
}> = ({ parseResult }) => {
    if (parseResult) {
        if (parseResult.status === 'ok') {
            const prMap = new ParseResultMap();
            prMap.add(parseResult.entries);

            return (
                <div style={{ wordBreak: 'break-all' }}>
                    <ParseResultMapComponent
                        id={parseResult.root}
                        prMap={prMap}
                    />
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
};
