import { parse_paragraphs as w_parse_paragraphs } from 'wasm_rs';

type EVParagraphs = {
    kind: 'paragraphs';
    keys: string[];
};

type InEVParagraphs = {
    kind: 'paras';
    keys: string[];
};

const is_in_ev_paragraphs = (x: unknown): x is InEVParagraphs =>
    typeof x === 'object' &&
    x !== null &&
    'kind' in x &&
    x.kind === 'paras' &&
    'keys' in x &&
    Array.isArray(x['keys']) &&
    x['keys'].every((v) => typeof v === 'string');

const to_ev_paragraphs = (x: unknown): EVParagraphs => {
    if (is_in_ev_paragraphs(x)) {
        return {
            kind: 'paragraphs',
            keys: x.keys,
        };
    } else {
        throw new Error(`not a paragraphs: ${x}`);
    }
};

type EVParagraph = {
    kind: 'paragraph';
    keys: string[];
};

type InEVParagraph = {
    kind: 'para';
    keys: string[];
};

const is_in_ev_paragraph = (x: unknown): x is InEVParagraph =>
    typeof x === 'object' &&
    x !== null &&
    'kind' in x &&
    x.kind === 'para' &&
    'keys' in x &&
    Array.isArray(x['keys']) &&
    x['keys'].every((v) => typeof v === 'string');

const to_ev_paragraph = (x: unknown): EVParagraph => {
    if (is_in_ev_paragraph(x)) {
        return {
            kind: 'paragraph',
            keys: x.keys,
        };
    } else {
        throw new Error(`not a paragraph: ${x}`);
    }
};

type EVText = {
    kind: 'raw_text';
    content: string;
};

type InEVText = {
    kind: 'text';
    content: string;
};

const is_in_ev_text = (x: unknown): x is InEVText =>
    typeof x === 'object' &&
    x !== null &&
    'kind' in x &&
    x.kind === 'text' &&
    'content' in x &&
    typeof x.content === 'string';

const to_ev_text = (x: unknown): EVText => {
    if (is_in_ev_text(x)) {
        return {
            kind: 'raw_text',
            content: x.content,
        };
    } else {
        throw new Error(`not a text: ${x}`);
    }
};

type EVInlineCommand = {
    kind: 'inline_command';
    content: string;
};

type InEVInlineCommand = {
    kind: 'il_cmd';
    content: string;
};

const is_in_ev_inline_command = (x: unknown): x is InEVInlineCommand =>
    typeof x === 'object' &&
    x !== null &&
    'kind' in x &&
    x.kind === 'il_cmd' &&
    'content' in x &&
    typeof x.content === 'string';

const to_ev_inline_command = (x: unknown): EVInlineCommand => {
    if (is_in_ev_inline_command(x)) {
        return {
            kind: 'inline_command',
            content: x.content,
        };
    } else {
        throw new Error(`not an inline command: ${x}`);
    }
};

type EVInlineMath = {
    kind: 'inline_math';
    status: 'ok' | 'error';
    content: string;
};

type InEVInlineMath = {
    kind: 'il_math';
    status: 'ok' | 'error';
    content: string;
};

const is_in_ev_inline_math = (x: unknown): x is InEVInlineMath =>
    typeof x === 'object' &&
    x !== null &&
    'kind' in x &&
    x.kind === 'il_math' &&
    'status' in x &&
    (x.status === 'ok' || x.status === 'error') &&
    'content' in x &&
    typeof x.content === 'string';

const to_ev_inline_math = (x: unknown): EVInlineMath => {
    if (is_in_ev_inline_math(x)) {
        return {
            kind: 'inline_math',
            status: x.status,
            content: x.content,
        };
    } else {
        throw new Error(`not an inline math: ${x}`);
    }
};

type EVDisplayMath = {
    kind: 'display_math';
    status: 'ok' | 'error';
    content: string;
};

type InEVDisplayMath = {
    kind: 'ds_math';
    status: 'ok' | 'error';
    content: string;
};

const is_in_ev_display_math = (x: unknown): x is InEVDisplayMath =>
    typeof x === 'object' &&
    x !== null &&
    'kind' in x &&
    x.kind === 'ds_math' &&
    'status' in x &&
    (x.status === 'ok' || x.status === 'error') &&
    'content' in x &&
    typeof x.content === 'string';

const to_ev_display_math = (x: unknown): EVDisplayMath => {
    if (is_in_ev_inline_math(x)) {
        return {
            kind: 'display_math',
            status: x.status,
            content: x.content,
        };
    } else {
        throw new Error(`not an display math: ${x}`);
    }
};

type Entry = {
    key: string;
    value: EVParagraphs | EVParagraph;
};

const to_entry = (x: unknown): Entry => {
    if (
        typeof x === 'object' &&
        x !== null &&
        'key' in x &&
        typeof x.key === 'string' &&
        'value' in x &&
        typeof x.value === 'object' &&
        x.value !== null &&
        'kind' in x.value
    ) {
        let value;
        switch (x.value.kind) {
            case 'paras':
                value = to_ev_paragraphs(x.value);
                break;
            case 'para':
                value = to_ev_paragraph(x.value);
                break;
            case 'text':
                value = to_ev_text(x.value);
                break;
            case 'il_math':
                value = to_ev_inline_math(x.value);
                break;
            case 'ds_math':
                value = to_ev_inline_math(x.value);
                break;
            case 'il_cmd':
                value = to_ev_inline_command(x.value);
                break;
            default:
                throw new Error(`not a value: ${x.value.kind}`);
        }

        return {
            key: x.key,
            value,
        };
    } else {
        throw new Error(`not an entry: ${x}`);
    }
};

type ParseResultOk = {
    status: 'ok';
    root: string;
    entries: Entry[];
    count: number;
};

const to_parse_result_ok = (x: unknown): ParseResultOk => {
    if (
        typeof x === 'object' &&
        x !== null &&
        'status' in x &&
        x.status === 'ok' &&
        'root' in x &&
        typeof x.root === 'string' &&
        'entries' in x &&
        Array.isArray(x['entries']) &&
        'count' in x &&
        typeof x.count === 'number'
    ) {
        return {
            status: 'ok',
            root: x.root,
            entries: x.entries.map((v) => to_entry(v)),
            count: x.count,
        };
    } else {
        throw new Error(`not a parse result ok: ${x}`);
    }
};

type ParseResultError = {
    status: 'error';
    message: string;
};

const to_parse_result_error = (x: unknown): ParseResultError => {
    if (
        typeof x === 'object' &&
        x !== null &&
        'status' in x &&
        x.status === 'error' &&
        'message' in x &&
        typeof x.message === 'string'
    ) {
        return {
            status: 'error',
            message: x.message,
        };
    } else {
        throw new Error(`not a parse result error: ${x}`);
    }
};

export type ParseResult = ParseResultOk | ParseResultError;

const to_parse_result = (x: unknown): ParseResult => {
    if (typeof x === 'object' && x !== null && 'status' in x) {
        if (x.status === 'ok') {
            return to_parse_result_ok(x);
        } else if (x.status === 'error') {
            return to_parse_result_error(x);
        } else {
            throw new Error(`not a parse result: ${x}`);
        }
    } else {
        throw new Error(`not a parse result: ${x}`);
    }
};

export const parse_paragraphs = async (input: string): Promise<ParseResult> => {
    const result = w_parse_paragraphs(input);
    return to_parse_result(result);
};
