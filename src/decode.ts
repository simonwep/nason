import {deserialize, SerializableValues} from './index';
import {NasonType}                       from './type';

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

/**
 * Decodes a value
 * @param val
 */
export const decode = (val: Uint8Array): SerializableValues => {
    const data = new Uint8Array(val.buffer, 1);
    const id = val[0] as NasonType;

    switch (id) {
        case NasonType.String: {
            return decodeString(data);
        }
        case NasonType.Number: {
            return decodeNumber(data);
        }
        case NasonType.Binary: {
            return data as Uint8Array;
        }
        case NasonType.Object: {
            return deserialize(data);
        }
        default: {
            throw new Error(`Unknown byte-set with id ${id}`);
        }
    }
};
