export enum NasonType {
    String = 1,
    Number = 2,
    Binary = 3
}

export const typeFor = (val: unknown): NasonType | null => {
    if (val instanceof Uint8Array) {
        return NasonType.Binary;
    }

    switch (typeof val) {
        case 'string': {
            return NasonType.String;
        }
        case 'number': {
            return NasonType.Number;
        }
    }

    return null;
};
