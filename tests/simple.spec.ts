import {describe, test} from 'vitest';
import {testBidirectional} from './utils';

describe('Simple serialization', () => {

    test('Should serialize and deserialize single values', () => {
        testBidirectional(true);
        testBidirectional(false);
        testBidirectional(null);
        testBidirectional('hello');
        testBidirectional({a: 'b'});
        testBidirectional(123);
        testBidirectional(-123);
        testBidirectional(-123.123);
        testBidirectional(-6292704.951540948);
    });

    test('Should serialize and deserialize a simple string:string map', () => {
        testBidirectional({
            'hello': 'world',
            'abc': 'efg'
        });
    });

    test('Should serialize and deserialize a mixed string / number map', () => {
        testBidirectional({
            'hello': 133,
            'abc': 'efg',
            'random': 2325,
            'empty': '',
            'empty2': 0
        });
    });

    test('Should support native Uint8Arrays', () => {
        testBidirectional({
            'array': new Uint8Array([123, 233, 32])
        });
    });

    test('Should support booleans and null-values', () => {
        testBidirectional({
            'hello': null,
            'abc': false,
            'wow': true
        });
    });
});

