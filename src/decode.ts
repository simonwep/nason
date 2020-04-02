import {SerializableObject, SerializableValue} from './index';
import {NasonType}                             from './type';
import {unpack}                                 from './unpack';

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

const decodeNumber = (n: Uint8Array): number => {
    let val = 0;

    for (let i = 0; i < n.length; i++) {
        val += n[i] << (i * 8);
    }

    return val;
};

const decodeArray = (a: Uint8Array): Array<SerializableValue> => {
    const [newOffset, array] = unpack(a);
    const size = decodeNumber(array);
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
        case NasonType.Number: {
            return decodeNumber(data);
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
