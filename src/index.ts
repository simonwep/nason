import {pack}   from './pack';
import {unpack} from './unpack';
import {concat} from './utils';

type Serializable = {
    [key: string]: string;
}

/**
 * Serializes the content of the object
 * @param source
 */
export const serialize = (source: Serializable): Uint8Array => {
    const textEncoder = new TextEncoder();
    let data = new Uint8Array(0);

    for (const [key, value] of Object.entries(source)) {
        data = concat(
            data,
            pack(textEncoder.encode(key)),
            pack(textEncoder.encode(value))
        );
    }

    return data;
};

/**
 * Deserializes a serialized object
 * @param source
 */
export const deserialize = (source: Uint8Array): Serializable => {
    const textDecoder = new TextDecoder();
    const entries: Array<[string, string]> = [];
    let data: Uint8Array;
    let offset = 0;

    // TODO: Throw error on overflow?
    while (offset < source.length) {
        [offset, data] = unpack(source, offset);
        const str = textDecoder.decode(data);

        [offset, data] = unpack(source, offset);
        entries.push(
            [str, textDecoder.decode(data)]
        );
    }

    return Object.fromEntries(entries);
};
