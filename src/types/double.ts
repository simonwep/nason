import {Encoder} from '../index';

export default {
    test(v) {
        return typeof v === 'number' && v % 1 !== 0;
    },

    encode(n: number): Uint8Array {
        const buffer = new ArrayBuffer(8);
        const doubleView = new Float64Array(buffer);
        doubleView[0] = n;
        return new Uint8Array(buffer);
    },

    decode(n: Uint8Array): number {
        const buffer = new ArrayBuffer(8);
        const doubleView = new Float64Array(buffer);
        const uIntBuffer = new Uint8Array(buffer);
        uIntBuffer.set(n, 0);

        return doubleView[0];
    }
} as Encoder<number>;
