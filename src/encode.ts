import {NasonType, typeFor} from './type';

const encodeString = (t: NasonType, s: string): Uint8Array => {
    const encoded = new TextEncoder().encode(s);
    return new Uint8Array([
        t, ...encoded
    ]);
};

const encodeNumber = (t: NasonType, n: number): Uint8Array => {
    const bits = n >= 0 ? Math.floor(Math.log2(n) + 1) : 32;
    const length = Math.ceil(bits / 8);
    const data = new Uint8Array(length + 1);
    data[0] = t;

    let offset = 1;
    while (n) {
        data[offset] = n & 255;
        n = n >>> 8;
        offset++;
    }

    return data;
};

/**
 * Encodes a value
 * @param val
 */
export const encode = (val: number | string | Uint8Array): Uint8Array => {
    const type = typeFor(val);

    if (type === null) {
        throw new Error(`Failed to encode ${typeof val}: ${val}`);
    }

    switch (type) {
        case NasonType.String:
            return encodeString(type, val as string);
        case NasonType.Number:
            return encodeNumber(type, val as number);
        case NasonType.Binary:
            return new Uint8Array([
                NasonType.Binary,
                ...(val as Uint8Array)
            ]);
    }
};
