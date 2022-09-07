import {describe, test, expect} from 'vitest';
import {deserialize, serialize} from '../src';

describe('Invalid content', () => {

    test('Should throw an error on invalid objects', () => {
        expect(() => {
            deserialize(new Uint8Array([
                4, 2, 1, 97,
                2
            ]));
        }).toThrowError();
    });

    test('Should throw an error on invalid array-ids', () => {
        expect(() => {
            deserialize(new Uint8Array([
                4, 2, 1, 97,
                2, 99, 98
            ]));
        }).toThrowError();
    });

    test('Should throw an error on non-serializable values', () => {
        expect(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            serialize(undefined);
        }).toThrowError();
    });

    test('Should throw an error on invalid chunk sizes', () => {
        expect(() => {
            deserialize(new Uint8Array([
                4, 2, 1, 97,
                55, 1, 98
            ]));
        }).toThrowError();
    });

    test('Should throw an error on empty arrays', () => {
        expect(() => {
            deserialize(new Uint8Array());
        }).toThrowError();
    });
});
