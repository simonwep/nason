import {Encoder} from '../index';

export default {
    test(v) {
        return v instanceof Uint8Array;
    },

    encode(val: Uint8Array): Uint8Array {
        return val;
    },

    decode(val: Uint8Array): Uint8Array {
        return val;
    }
} as Encoder<Uint8Array>;
