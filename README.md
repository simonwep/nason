<h3 align="center">
    <img src="https://user-images.githubusercontent.com/30767528/78268115-0b6b7000-7508-11ea-85ff-d077fd144d3f.png" alt="Logo">
</h3>

<h3 align="center">
    Ultra tiny object serializer
</h3>

<p align="center">
  <img alt="gzip size" src="https://img.badgesize.io/https://cdn.jsdelivr.net/npm/nason/lib/nason.min.js?compression=gzip&style=flat-square">
  <img alt="brotli size" src="https://img.badgesize.io/https://cdn.jsdelivr.net/npm/nason/lib/nason.min.js?compression=brotli&style=flat-square">
  <a href='https://coveralls.io/github/Simonwep/nason?branch=master'><img
     src='https://img.shields.io/coveralls/github/Simonwep/nason?style=flat-square'
     alt='Coverage Status'/></a>
  <a href="https://github.com/Simonwep/nason/actions"><img
     alt="Build Status"
     src="https://img.shields.io/github/workflow/status/Simonwep/nason/CI?style=flat-square"/></a>
  <a href="https://www.npmjs.com/package/nason"><img
     alt="Download count"
     src="https://img.shields.io/npm/dm/nason.svg?style=popout-square"></a>
  <img alt="No dependencies" src="https://img.shields.io/badge/dependencies-none-27ae60.svg?style=popout-square">
  <a href="https://www.jsdelivr.com/package/npm/nason"><img
     alt="JSDelivr download count"
     src="https://data.jsdelivr.com/v1/package/npm/nason/badge"></a>
  <img alt="Current version"
       src="https://img.shields.io/github/tag/Simonwep/nason.svg?color=3498DB&label=version&style=flat-square">
  <a href="https://github.com/sponsors/Simonwep"><img
     alt="Support me"
     src="https://img.shields.io/badge/github-support-3498DB.svg?style=popout-square"></a>
</p>



> Disclaimer: This library is part of a bigger project and it's goal is to be as small as possible (I don't want to use the >200kb bundle of [bson](https://github.com/mongodb/js-bson)). This lib is only around 4kb, uncompressed.
> It's only supposed to work within JS itself and not all data-types are implemented so far (see types-table at the bottom).
>
> The name is based on nashorn which is the German word for rhino.

### Installation

Install via `npm ` or `yarn`:

```shell
$ npm install nason
# or
$ yarn add nason
```

Include directly via [jsdelivr](https://www.jsdelivr.com/package/npm/nason):

```html
<script src="https://cdn.jsdelivr.net/npm/nason/lib/nason.min.js"></script>
```

Using [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules):

````js
import {...} from 'https://cdn.jsdelivr.net/npm/nason/lib/nason.min.mjs' 
````

### Usage

```js
import {deserialize, serialize} from 'nason';

// Serialize something, you'll get a Uint8Array in return.
// You can pass any kind of supported data-type you want to serialize.
const enc = serialize({
    'hello': 'world',
    'number': 13235,
    'array': [1, 2, 3, 'abc']
});

// ... save enc to file or do whatever you want with it

// Deserialize a previously serialized value
const dec = deserialize(enc);
console.log(dec); // Will be the same as initially passed into serialize
```

`nason` exports the following properties and functions:
```js
import {
    deserialize, // Takes a single Uint8Array and decodes it
    serialize, // Takes any supported value and converts it to a Uint8Array
    version // Current version of this package
} from 'nason';
```

> There's even more if you want to develop [plugins](./doc/plugins)!

### Data-types

| Data-type | Status                             |
| --------- | ---------------------------------- |
| `object`  | ✅ Fully supported                  |
| `array`   | ✅ Fully supported                  |
| `string`  | ✅ Fully supported                  |
| `number`  | ⚠ No floating-point number support |
| `boolean` | ✅ Fully supported                  |
| `null`    | ✅ Fully supported                  |

> `undefined` is not part of the json specification and will throw an error if you try to serialize it.

> I'm facing several problems supporting floating-point numbers. PR's and / or issues with ideas / suggestions are highly appreciated!

### Plugins

It's possible to write custom encoders for data-types not supported out-of-the-box. Head to [plugins](./doc/plugins) to get started! 

---

Logo / Icon provided by [Icons8](https://icons8.com).
