import packageLockJson from '../package-lock.json';
import packageJson from '../package.json';
import {testBidirectional} from './utils';

describe('Stress tests', () => {
    it('Random tests with MAX_SAFE_INTEGER', () => {
        for (let i = 0; i < 1000; i++) {
            const negative = Math.random() > 0.5;
            const number = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            testBidirectional(negative ? -number : number);
        }
    });

    it('Random double tests with MAX_SAFE_INTEGER', () => {
        for (let i = 0; i < 1000; i++) {
            const negative = Math.random() > 0.5;
            const number = Math.random() * Number.MAX_SAFE_INTEGER;
            testBidirectional(negative ? -number : number);
        }
    });

    it('Test with package.json', () => {
        testBidirectional(packageJson);
    });

    it('Test with package-lock.json', () => {
        testBidirectional(packageLockJson);
    });
});
