import {Encoder, use} from '../src';

describe('Implementing a custom encoder', () => {

    it('Short treat undefined as "undefined"', () => {
        const customEncoder = {
            test: (v): boolean => typeof v === 'undefined',
            encode: (): Uint8Array => new Uint8Array(),
            decode: (): undefined => undefined
        } as Encoder<undefined>;

        const {serialize, deserialize} = use([
            [8, customEncoder]
        ]);

        const serialized = serialize(undefined);
        expect(serialized).toBeInstanceOf(Uint8Array);

        const deserialized = deserialize(serialized);
        expect(deserialized).toEqual(undefined);
    });

    it('Should throw an error if the id is already in use', () => {
        expect(() => use([
            [1, null]
        ])).toThrowError();
    });
});

