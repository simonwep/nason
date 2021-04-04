import {Encoder, SerializableObject, SerializableValue} from '../index';
import {concat} from '../utils/concat';
import {pack} from '../utils/pack';
import {unpack} from '../utils/unpack';

export const objectEncoder: Encoder<SerializableObject> = {
    test(v) {
        return typeof v === 'object';
    },

    encode(o: SerializableObject, encode): Uint8Array {
        let data = new Uint8Array(0);

        for (const [key, value] of Object.entries(o)) {
            data = concat(
                data,
                pack(encode(key)),
                pack(encode(value))
            );
        }

        return data;
    },

    decode(source: Uint8Array, decode): SerializableObject {
        const entries: Array<[keyof SerializableObject, SerializableValue]> = [];
        let data: Uint8Array;
        let offset = 0;

        while (offset < source.length) {
            [data, offset] = unpack(source, offset);
            const str = decode(data) as string;

            [data, offset] = unpack(source, offset);
            entries.push(
                [str, decode(data)]
            );
        }

        return Object.fromEntries(entries);
    }
};

