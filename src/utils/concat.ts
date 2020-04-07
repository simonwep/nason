/**
 * Concats Uint8Arrays
 * @param arrays
 */
export const concat = (...arrays: Array<Uint8Array>): Uint8Array => {
    const length = arrays.reduce((pv, cv) => pv + cv.length, 0);
    const target = new Uint8Array(length);

    let offset = 0;
    for (const array of arrays) {
        target.set(array, offset);
        offset += array.length;
    }

    return target;
};
