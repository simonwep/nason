import {EncoderList, SerializableValue} from './index';

const prependNumber = (type: number, val: Uint8Array): Uint8Array => {
    const newBuffer = new Uint8Array((val as Uint8Array).length + 1);
    newBuffer[0] = type;
    newBuffer.set(val as Uint8Array, 1);
    return newBuffer;
};

export const createEncoder = (encoders: EncoderList) => function encode(
    val: SerializableValue
): Uint8Array {
    for (const [id, encoder] of encoders) {
        if (encoder.test(val)) {
            return prependNumber(id, encoder.encode(val, encode));
        }
    }

    throw new Error(`Failed to encode ${typeof val}: ${val}`);
};

export const createDecoder = (encoders: EncoderList) => function decode(
    val: Uint8Array
): SerializableValue {
    if (!val.length) {
        throw new Error('Input cannot be empty.');
    }

    const data = new Uint8Array(val.buffer, 1);
    const entryId = val[0];

    for (const [id, encoder] of encoders) {
        if (id === entryId) {
            return encoder.decode(data, decode);
        }
    }

    throw new Error(`No encoder found for  ${entryId}`);
};
