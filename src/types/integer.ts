import {Encoder} from '../index';

export default {
    test(v) {
        return typeof v === 'number' && v % 1 === 0;
    },

    encode(n: number): Uint8Array {
        const negative = n < 0;

        n = Math.abs(n);
        const bits = n ? Math.floor(Math.log2(n) + 1) + 1 : 0;
        const length = Math.ceil(bits / 8);
        const data = new Uint8Array(length);

        let offset = 0;
        while (n) {
            const byte = (n & 255);
            data[offset] = byte;
            offset++;

            // Remove last 8 bit, we can't use bit-shifting as this only works
            // with 32-bit numbers.
            n = (n - byte) / 256;
        }

        if (offset < length) {
            if (negative) {
                data[offset] = 1;
            }
        } else {
            data[offset - 1] = (data[offset - 1] << 1);

            if (negative) {
                data[offset - 1] += 1;
            }
        }

        return data;
    },

    decode(n: Uint8Array): number {
        const lastItem = n.length - 1;
        let val = 0;

        for (let i = 0; i < lastItem; i++) {
            val += n[i] * (2 ** (i * 8));
        }

        const leastSignificantByte = n[lastItem];
        val += (leastSignificantByte >>> 1) * (2 ** (lastItem * 8));

        if (leastSignificantByte & 1) {
            val *= -1;
        }

        return val;
    }
} as Encoder<number>;
