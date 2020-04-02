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
});

