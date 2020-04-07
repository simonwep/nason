import {Encoder} from '../index';

export default {
    test(v) {
        return v === null;
    },

    encode(): Uint8Array {
        return new Uint8Array();
    },

    decode(): null {
        return null;
    }
} as Encoder<null>;
