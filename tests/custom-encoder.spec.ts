import {describe, test, expect} from 'vitest';
import {Encoder, SerializableValue, use, utils} from '../src';
import {testCustomEncoder} from './utils';

describe('Implementing a custom encoder', () => {

    test('Encode undefined as "undefined"', () => {
        testCustomEncoder(
            {
                test: (v): boolean => typeof v === 'undefined',
                encode: (): Uint8Array => new Uint8Array(),
                decode: (): undefined => undefined
            } as Encoder<undefined>,
            {test: undefined}
        );
    });

    test('Encode node.js buffers', () => {
        testCustomEncoder(
            {
                test: (v): boolean => v instanceof Buffer,
                encode: (v): Uint8Array => {
                    return new Uint8Array(v);
                },
                decode: (v): Buffer => {
                    return Buffer.from(v);
                }
            } as Encoder<Buffer>,
            {
                data: Buffer.from('Hello world')
            }
        );
    });

    test('Encode node.js buffers', () => {
        testCustomEncoder(
            {
                test(value) {
                    return value instanceof Map;
                },

                decode(value, decode): Map<string, string | number> {
                    const map = new Map();
                    let offset = 0;
                    let data;

                    while (offset < value.length) {
                        [data, offset] = utils.unpack(value, offset);
                        const k = decode(data);

                        [data, offset] = utils.unpack(value, offset);
                        const v = decode(data);
                        map.set(k, v);
                    }

                    return map;
                },

                encode(map, encode): Uint8Array {
                    let data = new Uint8Array();

                    for (const [key, value] of map.entries()) {
                        data = utils.concat(
                            data,
                            utils.pack(encode(key)),
                            utils.pack(encode(value))
                        );
                    }

                    return data;
                }
            } as Encoder<Map<string, SerializableValue>>,
            {
                map: new Map<string, SerializableValue>([
                    ['hello', 'world'],
                    ['number', 123],
                    ['nullish', null],
                    ['nested', {
                        a: 100
                    }]
                ])
            }
        );
    });

    test('Should pack an empty array', () => {
        expect(utils.pack(new Uint8Array())).toEqual(new Uint8Array([0]));
    });

    test('Should throw an error if id is invalid', () => {
        const dummy = {} as unknown as Encoder<any>;

        expect(() => use([
            [129, dummy]
        ])).toThrowError();

        expect(() => use([
            [-1, dummy]
        ])).toThrowError();

        expect(() => use([
            [15.34, dummy]
        ])).toThrowError();
    });
});

