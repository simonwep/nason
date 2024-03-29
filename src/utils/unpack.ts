/**
 * Unpacks a piece of data from the given array at the specified offset.
 * Returns the extracted data and the next offset.
 * @param content The source array.
 * @param offset The offset.
 */
export const unpack = (content: Uint8Array, offset = 0): [Uint8Array, number] => {
    const initialOffset = offset;

    // Read size of next chunk
    let size = 0;
    let value = 128;
    while (value & 128) {
        value = content[offset];
        size += (value & 127) * 2 ** ((offset - initialOffset) * 7);
        offset++;
    }

    const nextOffset = offset + size;
    if (nextOffset > content.length) {
        throw new Error('Invalid chunk size.');
    }

    return [
        content.slice(offset, nextOffset),
        nextOffset
    ];
};
