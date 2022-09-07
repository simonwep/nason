### Plugins

Every plugin is made of an `encode` and  `decode` function which is responsible to serialize and de-serialize data. To identify the type of a data-chunk each data-type has its own Id, custom-encoders can use ids between `0` and `128`, everything above `128` is reserved for internals.

#### Examples

* [Map Encoder](map.md) _- Encoder for [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)_.
* [Undefined Encoder](undefined.md) _- Encoder for the primitive value [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)._

To write custom encoders nason exposes the following utils:

````js
import {utils} from 'nason';

/**
 * `utils.pack` can be used to prepend the size of the given array to the array itself.
 * This allows us to split data into chunks.
 */
const packed = utils.pack(new Uint8Array([1, 2, 3]));

/**
 * Arrays wrapped with `utils.pack` can be `unpacked` this way.
 * The second argument is optional, in case we concatenated multiple packed arrays
 * we can pass into the offset of the next chunk where to read from.
 *
 * It'll return the unpacked, raw chunk (in our case Uint8Array([1, 2, 3])) and the next
 * offset which could be, in case we're using more than one chunk, passed to the next unpack call.
 */
const [unpacked, nextOffset] = utils.unpack(packed, 0);

// Concatenates multiple Uint8Arrays, often used to concat packed chunks.
const concatenated = utils.concat(
    new Uint8Array([1, 2, 3]),
    new Uint8Array([4, 5, 6]),
);
````

And finally, to use a custom function, we can make use of `use`:

````js
import {use} from 'nason';

const plugin = {
    /**
     * The test function is responsible to check whenever the value should be processed
     * by our plugin or not. It takes a value and returns a boolean whenever it should
     * handle the file or not.
     */
    test(value: unknown) => boolean

    /**
     * The encode function takes the value, previously verified by test, and converts
     * it to a Uint8Array.
     * The second argument is a function to encode any other arbitrary
     * value supported by the same parser.
     */
    encode(data, encode) => Uint8Array

    /**
     * The decode function takes a source-Uint8Array and a decode function which can be
     * used to decode any other supported value by the same parser.
     * It returns the value of what has been encoded by the very same plugin in the first
     * place.
     */
    decode(uint8array, decode) => data
}

/**
 * Each plugin has its own unique ID, it's extremely important for these
 * to stay the same between the serialize and de-serializing-process, otherwise
 * the content won't get parsed correctly.
 */
const id = 1;

/**
 * The `use` function takes an array of extensions and returns deserialize / serialize
 * functions to work with.
 */
const {deserialize, serialize} = use([
    [id, plugin]
]);
````

