### `undefined`

The following code introduces support for [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

```js
import {use, utils} from 'nason';

const plugin = {
    test(value) {

        // Check whenever the value is undefined
        return typeof value === 'undefined';
    },

    encode(undefinedValue, encode) {

        /**
         * `undefined` is already a fixed value, so we don't
         * need to encode anything
         */
        return new Uint8Array(0);
    },

    decode(value, decode) {

        /**
         * `undefined` is always `undefined` and `value` will,
         * as written in encode(), always be an empty Uint8Array.
         */
        return undefined;
    }
};

const {deserialize, serialize} = use([
    [0, plugin]
]);

// Testing time :)
const enc = serialize(undefined);
const dec = deserialize(enc);
console.log(dec);
```

