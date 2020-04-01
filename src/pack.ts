/**
 * Prepends the size of the content
 * @param content
 */
export const pack = (content: Uint8Array): Uint8Array => {
    const sizeSpace = Math.ceil((Math.log2(content.length) + 1) / 7);
    const target = new Uint8Array(sizeSpace + content.length);

    // Write size of content and the content itself
    let size = content.length;
    let offset = 0;

    while (size) {
        const value = (size & 127);
        size = size >> 7;

        // The first bit signals whenever this number still correspondents to the array size
        target[offset] = value + (size & 255 ? 128 : 0);
        offset++;
    }

    // Write original content
    target.set(content, offset);
    return target;
};
