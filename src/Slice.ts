/**
 * Slice is a wrapper around Array that allows to slice it without copying.
 * Please note that any modification of the original array will affect the slice and the other way around.
 * You can use shallowCopy() to create a copy of the slice.
 */

function nonNullable<T> (arg: T): arg is NonNullable<T> {
  return !!(arg ?? true)
}

export class Slice<T> implements Iterable<T> {
  #buf: T[]
  #start: number
  #end: number
  #length: number
  
  constructor(buf: T[], start: number, end?: number) {
    this.#buf = buf
    this.#start = start
    this.#end = end ? end : buf.length
    this.#length = this.#end + 1 - this.#start
  }

  *[Symbol.iterator]() {
    for (let i = this.#start; i <= this.#end; i++) {
      yield this.#buf[i]
    }
  }

  static from<T>(array: ArrayLike<T>, start?: number, end?: number) {
    return new Slice(array as T[], start ?? 0, end ?? array.length - 1)
  }

  length(): number {
    return this.#length
  }

  get = this.at.bind(this)
  at(index: number): T {
    if (index > this.#length - 1) {
      throw new Error(`${index} is out of bounds`)
    }

    return this.#buf[this.#start + index]
  }

  last(): T {
    return this.#buf[this.#end - 1]
  }

  first(): T {
    return this.#buf[this.#start]
  }

  slice(start: number, end?: number): Slice<T> {
    return new Slice(this.#buf, this.#start + start, end ? this.#start + end - 1 : this.#end)
  }

  map<U>(callback: (item: T, index?: number) => U): Slice<U> {
    const buf: U[] = []
    for (let i = this.#start; i <= this.#end; i++) {
      buf.push(callback(this.#buf[i], i))
    }
    return new Slice(buf, 0, buf.length)
    Array.prototype.reduce
  }

  reduce<U>(callback: (accumulator: U, currentValue: T, currentIndex: number, slice: Slice<T>) => U, initialValue: U): U {
    let buf = initialValue
        
    for (let i = initialValue === undefined ? this.#start + 1 : this.#start; i <= this.#end; i++) {
      buf = callback(buf, this.#buf[i], i, this)
    }

    return buf
  }

  /**
     * Creates a shallow copy of the slice
     */
  shallowCopy(): Slice<T> {
    const copy = []
    for (let i = this.#start; i <= this.#end; i++) {
      copy.push(this.#buf[i])
    }

    return new Slice(copy, 0, copy.length - 1)
  }

  join(separator?: string): string {
    const arr: T[] = []
    for (let i = this.#start; i < this.#end; i++) {
      arr.push(this.#buf[i])
    }
    return arr.join(separator)
  }
}

export const sliceVec = <T>(array: T[], start: number, end: number): Slice<T> => new Slice(array, start, end)
