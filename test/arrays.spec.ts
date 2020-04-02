import {testBidirectional} from './utils';

describe('Arrays serialization', () => {

    it('Should serialize and deserialize a simple array entry', () => {
        testBidirectional({
            'array': [
                123,
                'hello',
                {
                    'abc': 500
                }
            ]
        });
    });

    it('Should serialize and deserialize a huge, nested array', () => {
        testBidirectional({
            'array': [
                123,
                'hello',
                {
                    'abc': 500
                },
                new Uint8Array(
                    new Array(132755).fill(4)
                        .map(() => Math.floor(Math.random() * 255))
                )
            ]
        });
    });
});

