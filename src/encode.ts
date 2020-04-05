import {SerializableObject, SerializableValue} from './index';
import {pack}                                  from './pack';
import {NasonType, prependType, typeFor}       from './type';
import {concat}                                from './utils';

const encodeObject = (o: SerializableObject): Uint8Array => {
    let data = new Uint8Array(0);

    for (const [key, value] of Object.entries(o)) {
        data = concat(
            data,
            pack(encode(key)),
            pack(encode(value))
        );
    }

    return data;
};

const encodeString = (s: string): Uint8Array => {
    return new TextEncoder().encode(s);
};

const encodeInteger = (n: number): Uint8Array => {
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
};

const encodeArray = (a: Array<SerializableValue>): Uint8Array => {
    let data = pack(encodeInteger(a.length));

    for (const val of a) {
        data = concat(
            data,
            pack(encode(val))
        );
    }

    return data;
};

const encodeBoolean = (a: boolean): Uint8Array => {
    return new Uint8Array([a ? 1 : 0]);
};

/**
 * Encodes a value
 * @param val
 */
export const encode = (val: SerializableValue): Uint8Array => {
    const type = typeFor(val);

    if (type === null) {
        throw new Error(`Failed to encode ${typeof val}: ${val}`);
    }

    switch (type) {
        case NasonType.Binary: {
            return prependType(type, val as Uint8Array);
        }
        case NasonType.String: {
            return prependType(type, encodeString(val as string));
        }
        case NasonType.Integer: {
            return prependType(type, encodeInteger(val as number));
        }
        case NasonType.Object: {
            return prependType(type, encodeObject(val as SerializableObject));
        }
        case NasonType.Array: {
            return prependType(type, encodeArray(val as Array<SerializableValue>));
        }
        case NasonType.Boolean: {
            return prependType(type, encodeBoolean(val as boolean));
        }
        case NasonType.Null: {
            return new Uint8Array([type]);
        }
    }
};
