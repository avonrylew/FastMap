export default class FastMap<K extends string | number, V> {
  /*
     self notes 101:
          d - data
          s - size
  */
  d: Record<string, V> = Object.create(null);
  s = 0;

  set(k: K, v: V): this {
    const key = k + '';
    this.s += !(key in this.d) as any;
    this.d[key] = v;
    return this;
  }

  get(k: K): V | undefined {
    return this.d[k + ''];
  }

  has(k: K): boolean {
    return k + '' in this.d;
  }

  delete(k: K): boolean {
    const key = k + '';
    const exists = key in this.d;
    if (exists) {
      delete this.d[key];
      this.s--;
    }
    return exists;
  }

  get size(): number {
    return this.s;
  }

  clear(): void {
    this.d = Object.create(null);
    this.s = 0;
  }

  *entries(): IterableIterator<[K, V]> {
    const d = this.d;
    for (const k in d) yield [k as K, d[k]];
  }

  *keys(): IterableIterator<K> {
    for (const k in this.d) yield k as K;
  }

  *values(): IterableIterator<V> {
    const d = this.d;
    for (const k in d) yield d[k];
  }

  forEach(fn: (v: V, k: K, m: this) => void): void {
    const d = this.d;
    for (const k in d) fn(d[k], k as K, this);
  }

  setMany(entries: [K, V][]): this {
    const d = this.d;
    let s = this.s;
    for (let i = 0, len = entries.length; i < len; i++) {
      const [k, v] = entries[i];
      const key = k + '';
      s += !(key in d) as any;
      d[key] = v;
    }
    this.s = s;
    return this;
  }

  getMany(keys: K[]): (V | undefined)[] {
    const d = this.d, len = keys.length, r = new Array(len);
    for (let i = 0; i < len; i++) r[i] = d[keys[i] + ''];
    return r;
  }
}
