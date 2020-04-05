import {testBidirectional} from './utils';

describe('Stress tests', () => {
    it('Random tests with MAX_SAFE_INTEGER', () => {
        for (let i = 0; i < 1000; i++) {
            const negative = Math.random() > 0.5;
            const number = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            testBidirectional(negative ? -number : number);
        }
    });
});
