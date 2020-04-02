import {decode} from './decode';
import {encode} from './encode';

export type SerializableValue = object | string | number | boolean | null |
    SerializableObject | Array<SerializableValue>

export type SerializableObject = {
    [key: string]: SerializableValue;
}

/**
 * Serializes the content of the object
 * @param source
 */
export const serialize = encode;

/**
 * Deserializes a serialized object
 * @param source
 */
export const deserialize = decode;
