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

    it('Should serialize and deserialize a mixed string / number map', () => {
        const data = {
            'hello': 133,
            'abc': 'efg',
            'random': 4
        };

        const serialized = serialize(data);
        expect(serialized).toBeInstanceOf(Uint8Array);

        const deserialized = deserialize(serialized);
        expect(deserialized).toEqual(data);
    });

    it('Should work with negative numbers as value', () => {
        const data = {
            'negative': -23
        };

        const serialized = serialize(data);
        expect(serialized).toBeInstanceOf(Uint8Array);

        const deserialized = deserialize(serialized);
        expect(deserialized).toEqual(data);
    });
});

