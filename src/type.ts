export enum NasonType {
    String = 1,
    Number = 2
}

export const typeFor = (val: unknown): NasonType | null => {
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
