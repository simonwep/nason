import {SerializableObject, SerializableValue} from './index';
import {NasonType}                             from './type';
import {unpack}                                from './unpack';

const decodeObject = (source: Uint8Array): SerializableObject => {
    const entries: Array<[keyof SerializableObject, SerializableValue]> = [];
    let data: Uint8Array;
    let offset = 0;

    while (offset < source.length) {
        [offset, data] = unpack(source, offset);
        const str = decode(data) as string;

        [offset, data] = unpack(source, offset);
        entries.push(
            [str, decode(data)]
        );
    }

    return Object.fromEntries(entries);
};

const decodeString = (s: Uint8Array): string => {
    return new TextDecoder().decode(s);
};

const decodeInteger = (n: Uint8Array): number => {
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
};

const decodeArray = (a: Uint8Array): Array<SerializableValue> => {
    const [newOffset, array] = unpack(a);
    const size = decodeInteger(array);
    const res = [];

    let data: Uint8Array;
    let offset = newOffset;
    for (let i = 0; i < size; i++) {
        [offset, data] = unpack(a, offset);
        res.push(decode(data));
    }

    return res;
};

const decodeBoolean = (b: Uint8Array): boolean => {
    return b[0] === 1;
};

/**
 * Decodes a value
 * @param val
 */
export const decode = (val: Uint8Array): SerializableValue => {
    if (!val.length) {
        throw new Error('Input cannot be empty.');
    }

    const data = new Uint8Array(val.buffer, 1);
    const id = val[0] as NasonType;

    switch (id) {
        case NasonType.Binary: {
            return data as Uint8Array;
        }
        case NasonType.String: {
            return decodeString(data);
        }
        case NasonType.Integer: {
            return decodeInteger(data);
        }
        case NasonType.Object: {
            return decodeObject(data);
        }
        case NasonType.Array: {
            return decodeArray(data);
        }
        case NasonType.Boolean: {
            return decodeBoolean(data);
        }
        case NasonType.Null: {
            return null;
        }
        default: {
            throw new Error(`Unknown byte-set with id ${id}`);
        }
    }
};
