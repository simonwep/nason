import {decode} from './decode';
import {encode} from './encode';

export type SerializableValues = object | string | number | SerializableObject | Array<SerializableValues>
export type SerializableObject = {
    [key: string]: SerializableValues;
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
