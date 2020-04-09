### Map

The following code introduces support for [Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

```js
import {use, utils} from 'nason';

const plugin = {
    test(value) {

        // Test whenever the value is an instance of Map
        return value instanceof Map;
    },

    encode(map, encode) {
        let data = new Uint8Array(0);

        for (const [key, value] of map.entries()) {
            /**
             * data is our final array which will represent our js-Map
             */
            data = utils.concat(
                data,

                /**
                 * We're using pack to pack our encoded data, we don't know
                 * the type of key nor value and encode() will try every available
                 * parsers to convert them.
                 */
                utils.pack(encode(key)),
                utils.pack(encode(value))
            );
        }

        return data;
    },

    decode(value, decode) {

        // Our result
        const map = new Map();

        // Current offset of the encoded map
        let offset = 0;
        let data;

        // We want to read key-value-pairs until the very end is reached.
        while (offset < value.length) {

            /**
             * We used pack to pack our values so we use unpack
             * to unpack the data. We're passing and updating the
             * offset variable to read the next pair.
             */
            [data, offset] = utils.unpack(value, offset);

            /**
             * We're using the decode function to decode the data.
             * It'll use all available encoders to encode the value.
             */
            const k = decode(data);

            [data, offset] = utils.unpack(value, offset);
            const v = decode(data);

            // Save to map
            map.set(k, v);
        }

        return map;
    }
};

// Our dummy map
const map = new Map();
map.set('hello', 'world');
map.set('number', 123);
map.set('null', null);

const {deserialize, serialize} = use([
    [0, plugin]
]);

// Testing time :)
const enc = serialize(map);
const dec = deserialize(enc);
console.log(dec);
```
