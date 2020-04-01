import {add} from '../src';

describe('Initialization', () => {

    it('Should add two numbers', () => {
        expect(add(1, 2)).toEqual(3);
    });
});

