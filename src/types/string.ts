import {Encoder} from '../index';

export default {
    test(v) {
        return typeof v === 'string';
    },

    encode(s: string): Uint8Array {
        return new TextEncoder().encode(s);
    },

    decode(s: Uint8Array): string {
        return new TextDecoder().decode(s);
    }
} as Encoder<string>;
