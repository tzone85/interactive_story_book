import { LruCache } from './lruCache';

describe('LruCache', () => {
  it('stores and returns values', () => {
    const cache = new LruCache<string>(2);
    cache.set('a', '1');
    expect(cache.get('a')).toBe('1');
    expect(cache.get('missing')).toBeUndefined();
  });

  it('evicts the least recently used entry beyond capacity', () => {
    const cache = new LruCache<string>(2);
    cache.set('a', '1');
    cache.set('b', '2');
    cache.get('a'); // a is now most recent
    cache.set('c', '3');
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('a')).toBe('1');
    expect(cache.get('c')).toBe('3');
  });

  it('reports evicted values so callers can release resources', () => {
    const evicted: string[] = [];
    const cache = new LruCache<string>(1, (value) => evicted.push(value));
    cache.set('a', '1');
    cache.set('b', '2');
    expect(evicted).toEqual(['1']);
  });

  it('rejects a non-positive capacity', () => {
    expect(() => new LruCache<string>(0)).toThrow();
  });
});
