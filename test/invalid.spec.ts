import {deserialize} from '../src';
import {encode}      from '../src/encode';

describe('Invalid content', () => {

    it('Should throw an error on invalid objects', () => {
        expect(() => {
            deserialize(new Uint8Array([
                4, 2, 1, 97,
                2,
            ]));
        }).toThrow();
    });

    it('Should throw an error on invalid array-ids', () => {
        expect(() => {
            deserialize(new Uint8Array([
                4, 2, 1, 97,
                2, 99, 98
            ]));
        }).toThrow();
    });

    it('Should throw an error on non-serializable values', () => {
        expect(() => {
            encode(undefined);
        }).toThrow();
    });

    it('Should throw an error on invalid chunk sizes', () => {
        expect(() => {
            deserialize(new Uint8Array([
                4, 2, 1, 97,
                55, 1, 98
            ]));
        }).toThrow();
    });

    it('Should throw an error on empty arrays', () => {
        expect(() => {
            deserialize(new Uint8Array());
        }).toThrow();
    });
});
