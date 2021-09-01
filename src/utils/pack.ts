/**
 * Prepends the size of the content
 * @param content
 */
export const pack = (content: Uint8Array): Uint8Array => {
    const contentSize = content.length;
    const sizeSpace = Math.ceil(Math.floor(Math.log2(contentSize || 1) + 1) / 7);
    const target = new Uint8Array(sizeSpace + contentSize);

    // Write size of content and the content itself
    let size = contentSize;
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
