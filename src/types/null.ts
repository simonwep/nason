import {Encoder} from '../index';

export const nullEncoder: Encoder<null> = {
    test(v) {
        return v === null;
    },

    encode(): Uint8Array {
        return new Uint8Array();
    },

    decode(): null {
        return null;
    }
};
