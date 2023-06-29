import { z } from 'zod';
import { parse_paragraphs as w_parse_paragraphs } from 'wasm_rs';

export const parse_paragraphs = (
    input: string,
): z.infer<typeof parseResult> => {
    const result = w_parse_paragraphs(input);
    return parseResult.parse(result);
};

const evParagraphs = z.object({
    kind: z.literal('paragraphs'),
    keys: z.array(z.string()),
});
const evParagraph = z.object({
    kind: z.literal('paragraph'),
    keys: z.array(z.string()),
});
const evText = z.object({
    kind: z.literal('text'),
    content: z.string(),
});
const evInlineCommand = z.object({
    kind: z.literal('inline_command'),
    content: z.string(),
});
const evInlineMath = z.object({
    kind: z.literal('inline_math'),
    status: z.union([z.literal('ok'), z.literal('error')]),
    content: z.string(),
});
const evDisplayMath = z.object({
    kind: z.literal('display_math'),
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

const entry = z.object({
    key: z.string(),
    value: entryValue,
});

const parseResultOk = z
    .object({
        status: z.literal('ok'),
        root: z.string(),
        map: z.array(entry),
    })
    .strict();

const parseResultError = z
    .object({
        status: z.literal('error'),
        message: z.string(),
    })
    .strict();

const parseResult = z.union([parseResultOk, parseResultError]);
