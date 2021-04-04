import {Encoder} from '../index';

export const binaryEncoder: Encoder<Uint8Array> = {
    test(v) {
        return v instanceof Uint8Array;
    },

    encode(val: Uint8Array): Uint8Array {
        return val;
    },

    decode(val: Uint8Array): Uint8Array {
        return val;
    }
};
