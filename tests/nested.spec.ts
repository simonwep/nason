import {describe, test} from 'vitest';
import {testBidirectional} from './utils';

describe('Nested serialization', () => {

    test('Should serialize and deserialize a simple, nested object', () => {
        testBidirectional({
            'hello': 'world',
            'abc': {
                'v': 123
            }
        });
    });

    test('Should serialize and deserialize deeply nested objects', () => {
        testBidirectional({
            'hello': 'world',
            'abc': {
                'v': 123,
                'hey': {
                    'array': new Uint8Array([2, 3, 4, 56]),
                    'emoji': '😀',
                    'nummy': 293840428
                }
            }
        });
    });
});

