import {deserialize, SerializableValue, serialize} from '../src';

export const testBidirectional = (data: SerializableValue): void => {
    const serialized = serialize(data);
    expect(serialized).toBeInstanceOf(Uint8Array);
    expect(deserialize(serialized)).toEqual(data);
};
