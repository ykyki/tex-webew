import { Entry } from './parser2';

type EValue = Entry['value'];

export class ParseResultMap {
    _map: Map<string, EValue>;

    constructor() {
        this._map = new Map<string, EValue>();
    }

    find = (key: string): EValue | undefined => {
        return this._map.get(key);
    };

    add = (entries: Entry[]) => {
        for (const entry of entries) {
            this._map.set(entry.key, entry.value);
        }
    };
}
