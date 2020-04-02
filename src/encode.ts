import {Serializable, SerializableValues, serialize} from './index';
import {pack}                                        from './pack';
import {NasonType, prependType, typeFor}             from './type';
import {concat}                                      from './utils';

const encodeString = (s: string): Uint8Array => {
    return new TextEncoder().encode(s);
};

const encodeNumber = (n: number): Uint8Array => {
    const bits = n > 0 ? Math.floor(Math.log2(n) + 1) : n === 0 ? 1 : 32;
    const length = Math.ceil(bits / 8);
    const data = new Uint8Array(length);

    let offset = 0;
    while (n) {
        data[offset] = n & 255;
        n = n >>> 8;
        offset++;
    }

    return data;
};

const encodeArray = (a: Array<SerializableValues>): Uint8Array => {
    let data = pack(encodeNumber(a.length));

    for (const val of a) {
        data = concat(
            data,
            pack(encode(val))
        );
    }

    return data;
};

/**
 * Encodes a value
 * @param val
 */
export const encode = (val: SerializableValues): Uint8Array => {
    const type = typeFor(val);

    if (type === null) {
        throw new Error(`Failed to encode ${typeof val}: ${val}`);
    }

    switch (type) {
        case NasonType.String: {
            return prependType(type, encodeString(val as string));
        }
        case NasonType.Number: {
            return prependType(type, encodeNumber(val as number));
        }
        case NasonType.Binary: {
            return prependType(type, val as Uint8Array);
        }
        case NasonType.Object: {
            return prependType(type, serialize(val as Serializable));
        }
        case NasonType.Array: {
            return prependType(type, encodeArray(val as Array<SerializableValues>));
        }
    }
};
