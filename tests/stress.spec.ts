import {describe, test} from 'vitest';
import packageLockJson from '../package-lock.json';
import packageJson from '../package.json';
import {testBidirectional} from './utils';

describe('Stress tests', () => {
    test('Random tests with MAX_SAFE_INTEGER', () => {
        for (let i = 0; i < 1000; i++) {
            const negative = Math.random() > 0.5;
            const number = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            testBidirectional(negative ? -number : number);
        }
    });

    test('Random double tests with MAX_SAFE_INTEGER', () => {
        for (let i = 0; i < 1000; i++) {
            const negative = Math.random() > 0.5;
            const number = Math.random() * Number.MAX_SAFE_INTEGER;
            testBidirectional(negative ? -number : number);
        }
    });

    test('Test with package.json', () => {
        testBidirectional(packageJson);
    });

    test('Test with package-lock.json', () => {
        testBidirectional(packageLockJson);
    });
});
