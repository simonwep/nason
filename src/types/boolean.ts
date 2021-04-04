import {Encoder} from '../index';

export const booleanEncoder: Encoder<boolean> = {
    test(v) {
        return typeof v === 'boolean';
    },

    encode(a: boolean): Uint8Array {
        return new Uint8Array([a ? 1 : 0]);
    },

    decode(b: Uint8Array): boolean {
        return b[0] === 1;
    }
};
