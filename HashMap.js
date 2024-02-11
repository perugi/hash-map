const LinkedList = require('@perugi/linked-list');
const hash = require('./hash');

class HashMap {
  capacity;

  loadFactor;

  buckets;

  threshold;

  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.#calculateThreshold();
    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new LinkedList());
  }

  set(key, value) {
    const bucket = this.#getBucket(hash(key, this.capacity));
    bucket.append([key, value]);

    if (this.keys().length >= this.threshold) {
      this.#resize();
    }
  }

  get(key) {
    const bucket = this.#getBucket(hash(key, this.capacity));
    const listIndex = bucket.search((node) => node.value[0] === key);

    return listIndex !== null ? bucket.at(listIndex).value[1] : null;
  }

  has(key) {
    const bucket = this.#getBucket(hash(key, this.capacity));
    const listIndex = bucket.search((node) => node.value[0] === key);

    return listIndex !== null;
  }

  remove(key) {
    const bucket = this.#getBucket(hash(key, this.capacity));
    const listIndex = bucket.search((node) => node.value[0] === key);

    if (listIndex !== null) {
      bucket.removeAt(listIndex);
      return true;
    }

    return false;
  }

  length() {
    return this.buckets.reduce((acc, bucket) => acc + bucket.size(), 0);
  }

  toString() {
    this.buckets.forEach((bucket, index) => {
      console.log(`[${index}]: ${bucket.toString()}`);
    });
  }

  clear() {
    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new LinkedList());
  }

  keys() {
    return this.buckets.reduce((acc, bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        acc.push(bucket.at(i).value[0]);
      }
      return acc;
    }, []);
  }

  values() {
    return this.buckets.reduce((acc, bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        acc.push(bucket.at(i).value[1]);
      }
      return acc;
    }, []);
  }

  entries() {
    return this.buckets.reduce((acc, bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        acc.push(bucket.at(i).value);
      }
      return acc;
    }, []);
  }

  #getBucket(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Index out of bounds');
    }
    return this.buckets[index];
  }

  #calculateThreshold() {
    this.threshold = Math.floor(this.capacity * this.loadFactor);
  }

  #resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.#calculateThreshold();

    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new LinkedList());
    oldBuckets.forEach((bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        this.set(bucket.at(i).value[0], bucket.at(i).value[1]);
      }
    });
  }
}

module.exports = HashMap;
