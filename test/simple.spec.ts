import {deserialize, serialize} from '../src';

describe('Simple serialization', () => {

    it('Should serialize and deserialize a simple string:string map', () => {
        const data = {
            'hello': 'world',
            'abc': 'efg'
        };

        const serialized = serialize(data);
        expect(serialized).toBeInstanceOf(Uint8Array);

        const deserialized = deserialize(serialized);
        expect(deserialized).toEqual(data);
    });
});

