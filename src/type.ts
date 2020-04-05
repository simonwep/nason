export enum NasonType {
    String = 1,
    Integer = 2,
    Binary = 3,
    Object = 4,
    Array = 5,
    Boolean = 6,
    Null = 7,
}

/**
 * Determines the type for the given, unknown value.
 * Returns null if not found.
 * @param val
 */
export const typeFor = (val: unknown): NasonType | null => {
    if (val instanceof Uint8Array) {
        return NasonType.Binary;
    } else if (Array.isArray(val)) {
        return NasonType.Array;
    }

    switch (typeof val) {
        case 'string': {
            return NasonType.String;
        }
        case 'number': {
            return NasonType.Integer;
        }
        case 'object': {
            return val === null ? NasonType.Null : NasonType.Object;
        }
        case 'boolean': {
            return NasonType.Boolean;
        }
    }

    return null;
};

/**
 * Prepends a specific type to the given array
 * @param type
 * @param val
 */
export const prependType = (type: NasonType, val: Uint8Array): Uint8Array => {
    const newBuffer = new Uint8Array((val as Uint8Array).length + 1);
    newBuffer[0] = type;
    newBuffer.set(val as Uint8Array, 1);
    return newBuffer;
};
