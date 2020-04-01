import {deserialize, Serializable, serialize} from '../src';

export const testBidirectional = (data: Serializable): void => {
    const serialized = serialize(data);
    expect(serialized).toBeInstanceOf(Uint8Array);
    expect(deserialize(serialized)).toEqual(data);
};
