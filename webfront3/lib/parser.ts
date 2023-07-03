import { z } from 'zod';
import { parse_paragraphs as w_parse_paragraphs } from 'wasm_rs';

export const parse_paragraphs = (
    input: string,
): z.infer<typeof parseResult> => {
    const result = w_parse_paragraphs(input);
    return parseResult.parse(result);
};

const evParagraphs = z.object({
    kind: z.literal('paras').transform(() => 'paragraphs' as const),
    keys: z.array(z.string()),
});
const evParagraph = z.object({
    kind: z.literal('para').transform(() => 'paragraph' as const),
    keys: z.array(z.string()),
});
const evText = z.object({
    kind: z.literal('text').transform(() => 'raw_text' as const),
    content: z.string(),
});
const evInlineCommand = z.object({
    kind: z.literal('il_cmd').transform(() => 'inline_command' as const),
    content: z.string(),
});
const evInlineMath = z.object({
    kind: z.literal('il_math').transform(() => 'inline_math' as const),
    status: z.union([z.literal('ok'), z.literal('error')]),
    content: z.string(),
});
const evDisplayMath = z.object({
    kind: z.literal('ds_math').transform(() => 'display_math' as const),
    status: z.union([z.literal('ok'), z.literal('error')]),
    content: z.string(),
});

const entryValue = z.union([
    evParagraphs,
    evParagraph,
    evText,
    evInlineCommand,
    evInlineMath,
    evDisplayMath,
]);

export const entry = z.object({
    key: z.string(),
    value: entryValue,
});

const parseResultOk = z
    .object({
        status: z.literal('ok'),
        root: z.string(),
        entries: z.array(entry),
        count: z.number(),
    })
    .strict();

const parseResultError = z
    .object({
        status: z.literal('error'),
        message: z.string(),
    })
    .strict();

const parseResult = z.union([parseResultOk, parseResultError]);

export type ParseResult = z.infer<typeof parseResult>;
