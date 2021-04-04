import {createDecoder, createEncoder} from './convert';
import {arrayEncoder} from './types/array';
import {binaryEncoder} from './types/binary';
import {booleanEncoder} from './types/boolean';
import {doubleEncoder} from './types/double';
import {integerEncoder} from './types/integer';
import {Internals} from './types/internals';
import {nullEncoder} from './types/null';
import {objectEncoder} from './types/object';
import {stringEncoder} from './types/string';
import {concat} from './utils/concat';
import {pack} from './utils/pack';
import {unpack} from './utils/unpack';

export type SerializableValue = Record<string, unknown> | string | number | boolean | null |
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export type EncoderList = Array<[number, Encoder<any>]>;

// Default encoders, order is important because object catches almost everything
// except primitives.
const encoders: EncoderList = [
    [Internals.Boolean, booleanEncoder],
    [Internals.Double, doubleEncoder],
    [Internals.Integer, integerEncoder],
    [Internals.Null, nullEncoder],
    [Internals.String, stringEncoder],
    [Internals.Binary, binaryEncoder],
    [Internals.Array, arrayEncoder],
    [Internals.Object, objectEncoder]
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

// Expose utils
export const utils = {
    pack,
    unpack,
    concat
};

// Current version
export const version = VERSION;
