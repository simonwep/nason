import {Encoder} from '../index';

export default {
    test(v) {
        return typeof v === 'number' && v % 1 !== 0;
    },

    encode: (() => {
        const buffer = new ArrayBuffer(8);
        const doubleView = new Float64Array(buffer);

        return (n: number): Uint8Array => {
            doubleView[0] = n;
            return new Uint8Array(buffer);
        };
    })(),

    decode: (() => {
        const buffer = new ArrayBuffer(8);
        const doubleView = new Float64Array(buffer);
        const uIntBuffer = new Uint8Array(buffer);

        return (n: Uint8Array): number => {
            uIntBuffer.set(n, 0);
            return doubleView[0];
        };
    })()
} as Encoder<number>;
