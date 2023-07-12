import { Slice } from './Slice';

describe('Slice', () => {
    it('should create a slice correctly', () => {
        const slice = new Slice([1, 2, 3, 4, 5], 1, 3);

        expect(slice.length()).toBe(3);
        expect(slice.at(0)).toBe(2);
        expect(slice.at(1)).toBe(3);
        expect(slice.at(2)).toBe(4);
    });

    it('should create a slice from an array correctly', () => {
        const slice = Slice.from([1, 2, 3]);

        expect(slice.length()).toBe(3);
        expect(slice.at(0)).toBe(1);
        expect(slice.at(1)).toBe(2);
        expect(slice.at(2)).toBe(3);
    });

    it('should iterate over slice', () => {
        const slice = new Slice([1, 2, 3, 4, 5], 1, 3);

        const result = [];
        for (const item of slice) {
            result.push(item);
        }

        expect(result).toEqual([2, 3, 4]);
    });

    it('should map correctly', () => {
        const slice = new Slice([1, 2, 3, 4, 5], 1, 3);

        const mapped = slice.map((item) => item * 2);

        expect(mapped.at(0)).toBe(4);
        expect(mapped.at(1)).toBe(6);
        expect(mapped.at(2)).toBe(8);
    });

    it('should be convertible to an array', () => {
        const slice = new Slice([1, 2, 3, 4, 5], 1, 3);

        expect(Array.from(slice)).toEqual([2, 3, 4]);
    });

    it('should create a shallow copy', () => {
        const slice1 = new Slice([1, 2, 3, 4, 5], 1, 3);
        const slice2 = slice1.shallowCopy();

        expect(slice1.length()).toBe(slice2.length());
        expect(slice1.at(0)).toBe(slice2.at(0));
        expect(slice1).not.toBe(slice2);
    });
});
