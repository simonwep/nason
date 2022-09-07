import {expect} from 'vitest';
import {deserialize, Encoder, SerializableValue, serialize, use} from '../src';

export const testBidirectional = (data: SerializableValue): void => {
    const serialized = serialize(data);
    expect(serialized).toBeInstanceOf(Uint8Array);
    expect(deserialize(serialized)).toEqual(data);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const testCustomEncoder = (
    encoder: Encoder<any>,
    data: SerializableValue
): void => {
    const {serialize, deserialize} = use([
        [Math.floor(Math.random() * 128), encoder]
    ]);

    const serialized = serialize(data);
    expect(serialized).toBeInstanceOf(Uint8Array);
    expect(deserialize(serialized)).toEqual(data);
};
