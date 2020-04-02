import {deserialize, SerializableObject, serialize} from '../src';

export const testBidirectional = (data: SerializableObject): void => {
    const serialized = serialize(data);
    expect(serialized).toBeInstanceOf(Uint8Array);
    expect(deserialize(serialized)).toEqual(data);
};
