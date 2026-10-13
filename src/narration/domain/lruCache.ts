/** Minimal least-recently-used cache; `onEvict` lets owners release resources (object URLs, ...). */
export class LruCache<V> {
  private readonly entries = new Map<string, V>();

  constructor(
    private readonly capacity: number,
    private readonly onEvict?: (value: V) => void,
  ) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new Error('LruCache capacity must be a positive integer');
    }
  }

  get(key: string): V | undefined {
    const value = this.entries.get(key);
    if (value === undefined) return undefined;
    this.entries.delete(key);
    this.entries.set(key, value);
    return value;
  }

  set(key: string, value: V): void {
    const existing = this.entries.get(key);
    if (existing !== undefined && existing !== value) this.onEvict?.(existing);
    this.entries.delete(key);
    this.entries.set(key, value);
    while (this.entries.size > this.capacity) {
      const oldestKey = this.entries.keys().next().value as string;
      const oldest = this.entries.get(oldestKey) as V;
      this.entries.delete(oldestKey);
      this.onEvict?.(oldest);
    }
  }

  clear(): void {
    this.entries.forEach((value) => this.onEvict?.(value));
    this.entries.clear();
  }
}
