import {testBidirectional} from './utils';

describe('Simple serialization', () => {

    it('Should serialize and deserialize single values', () => {
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

    it('Should serialize and deserialize a simple string:string map', () => {
        testBidirectional({
            'hello': 'world',
            'abc': 'efg'
        });
    });

    it('Should serialize and deserialize a mixed string / number map', () => {
        testBidirectional({
            'hello': 133,
            'abc': 'efg',
            'random': 2325,
            'empty': '',
            'empty2': 0
        });
    });

    it('Should support native Uint8Arrays', () => {
        testBidirectional({
            'array': new Uint8Array([123, 233, 32])
        });
    });

    it('Should support booleans and null-values', () => {
        testBidirectional({
            'hello': null,
            'abc': false,
            'wow': true
        });
    });
});

