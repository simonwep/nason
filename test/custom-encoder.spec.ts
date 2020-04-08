import {Encoder, use}      from '../src';
import {testCustomEncoder} from './utils';

describe('Implementing a custom encoder', () => {

    it('Encode undefined as "undefined"', () => {
        testCustomEncoder(
            {
                test: (v): boolean => typeof v === 'undefined',
                encode: (): Uint8Array => new Uint8Array(),
                decode: (): undefined => undefined
            } as Encoder<undefined>,
            {test: undefined}
        );
    });

    it('Encode node.js buffers', () => {
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

    it('Should throw an error if id is invalid', () => {
        expect(() => use([
            [129, null]
        ])).toThrowError();

        expect(() => use([
            [-1, null]
        ])).toThrowError();

        expect(() => use([
            ['1' as unknown as number, null]
        ])).toThrowError();

        expect(() => use([
            [15.34, null]
        ])).toThrowError();
    });
});

