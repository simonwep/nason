import {createDecoder, createEncoder} from './convert';
import array                          from './types/array';
import binary                         from './types/binary';
import boolean                        from './types/boolean';
import integer                        from './types/integer';
import {Internals}                    from './types/internals';
import nullish                        from './types/nullish';
import object                         from './types/object';
import string                         from './types/string';

export type SerializableValue = object | string | number | boolean | null |
    SerializableObject | Array<SerializableValue>;

export type SerializableObject = {
    [key: string]: SerializableValue;
};

export type EncoderFunction<Source> = (
    value: Source,
    encoder: (value: SerializableValue) => Uint8Array
) => Uint8Array;

export type DecoderFunction<Result> = (
    source: Uint8Array,
    decoder: (value: Uint8Array) => SerializableValue
) => Result;

export interface Encoder<T> {
    test: (v: unknown) => boolean;
    encode: EncoderFunction<T>;
    decode: DecoderFunction<T>;
}

export type EncoderList = Array<[number, Encoder<unknown>]>;

// Default encoders, order is important because object catches almost everything
// except primitives.
const encoders: EncoderList = [
    [Internals.Boolean, boolean],
    [Internals.Integer, integer],
    [Internals.Null, nullish],
    [Internals.String, string],
    [Internals.Binary, binary],
    [Internals.Array, array],
    [Internals.Object, object]
];

/**
 * Serializes the content of the object
 * @param value
 */
export const serialize = createEncoder(encoders);

/**
 * Deserializes a serialized object
 * @param data
 */
export const deserialize = createDecoder(encoders);

export type WrappedEncoder = {
    serialize: typeof serialize;
    deserialize: typeof deserialize;
};

/**
 * Injects custom-encoders
 */
export const use = (
    extra: EncoderList
): WrappedEncoder => {

    // Validate id's
    for (const encoder of extra) {
        const id = encoder[0];

        // Validate ID
        if (typeof id !== 'number' || id % 1 || id < 0 || id > 128) {
            throw new Error('Id must be an integer and between 0 and 128, both inclusive.');
        }

        encoder[0] += 127;
    }

    return {
        serialize: createEncoder([...extra, ...encoders]),
        deserialize: createDecoder([...extra, ...encoders])
    };
};

// Current version
export const version = VERSION;
