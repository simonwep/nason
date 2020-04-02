import {decode} from './decode';
import {encode} from './encode';
import {pack}   from './pack';
import {unpack} from './unpack';
import {concat} from './utils';

export type SerializableValues = object | string | number | Serializable | Array<SerializableValues>
export type Serializable = {
    [key: string]: SerializableValues;
}

/**
 * Serializes the content of the object
 * @param source
 */
export const serialize = (source: Serializable): Uint8Array => {
    let data = new Uint8Array(0);

    for (const [key, value] of Object.entries(source)) {
        data = concat(
            data,
            pack(encode(key)),
            pack(encode(value))
        );
    }

    return data;
};

/**
 * Deserializes a serialized object
 * @param source
 */
export const deserialize = (source: Uint8Array): Serializable => {
    const entries: Array<[keyof Serializable, SerializableValues]> = [];
    let data: Uint8Array;
    let offset = 0;

    // TODO: Throw error on overflow?
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
