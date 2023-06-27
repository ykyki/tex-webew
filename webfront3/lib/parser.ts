import { z } from 'zod';
import { parse_paragraphs as w_parse_paragraphs } from 'wasm_rs';

const apiStatusOk = z.object({
    status: z.literal('ok'),
    root: z.string(),
    columns: z.array(z.unknown()),
});

const apiStatusError = z.object({
    status: z.literal('error'),
    message: z.string(),
});

const apiResult = z.union([apiStatusOk, apiStatusError]);

export const parse_paragraphs = (input: string): z.infer<typeof apiResult> => {
    const result = w_parse_paragraphs(input);
    return apiResult.parse(result);
};
