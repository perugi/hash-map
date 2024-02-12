const LinkedList = require('@perugi/linked-list');

class HashMap {
  _capacity;

  _loadFactor;

  _buckets;

  _threshold;

  constructor() {
    this._capacity = 16;
    this._loadFactor = 0.75;
    this._calculateThreshold();
    this._buckets = new Array(this._capacity)
      .fill(null)
      .map(() => new LinkedList());
  }

  /**
   * Sets the key-value pair in the map.
   *
   * @param {string} key - the key of the pair
   * @param {any} value - the value of the pair
   */
  set(key, value) {
    const bucket = this._getBucket(this._hash(key));
    const listIndex = bucket.search((node) => node.value[0] === key);

    if (listIndex !== null) {
      // key already exists in the map, update the value
      bucket.at(listIndex).value[1] = value;
    } else {
      bucket.append([key, value]);

      if (this.keys().length >= this._threshold) {
        this._resize();
      }
    }
  }

  /**
   * Get the value associated with the given key.
   *
   * @param {string} key - the key to look up
   * @return {any|null} the value associated with the key, or null if not found
   */
  get(key) {
    const bucket = this._getBucket(this._hash(key));
    const listIndex = bucket.search((node) => node.value[0] === key);

    return listIndex !== null ? bucket.at(listIndex).value[1] : null;
  }

  /**
   * Checks if the given key exists in the hash map.
   *
   * @param {string} key - the key to check for existence
   * @return {boolean} - true if the key exists, false otherwise
   */
  has(key) {
    const bucket = this._getBucket(this._hash(key));
    const listIndex = bucket.search((node) => node.value[0] === key);

    return listIndex !== null;
  }

  /**
   * Removes the element with the given key from the hash table.
   *
   * @param {string} key - the key of the element to be removed
   * @return {boolean} true if the element was removed, false if the element was not found
   */
  remove(key) {
    const bucket = this._getBucket(this._hash(key));
    const listIndex = bucket.search((node) => node.value[0] === key);

    if (listIndex !== null) {
      bucket.removeAt(listIndex);

      return true;
    }

    return false;
  }

  /**
   * Calculate the length of the Map.
   *
   * @return {number} the total number of elements of the Map
   */
  length() {
    return this._buckets.reduce((acc, bucket) => acc + bucket.size(), 0);
  }

  /**
   * Returns a string representation of the Map.
   *
   * @return {string} string representation of the Map
   */
  toString() {
    let string = '';

    this._buckets.forEach((bucket, index) => {
      string += `[${index}]: ${bucket.toString()}\n`;
    });

    return string;
  }

  /**
   * Clears all the elements from the Map.
   */
  clear() {
    this._buckets = new Array(this._capacity)
      .fill(null)
      .map(() => new LinkedList());
  }

  /**
   * Returns an array of the keys, stored in the Map.
   *
   * @return {Array.<string>} Array of keys
   */
  keys() {
    return this._buckets.reduce((acc, bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        acc.push(bucket.at(i).value[0]);
      }
      return acc;
    }, []);
  }

  /**
   * Returns an array of the values, stored in the Map.
   *
   * @return {Array.<any>} Array of values
   */
  values() {
    return this._buckets.reduce((acc, bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        acc.push(bucket.at(i).value[1]);
      }
      return acc;
    }, []);
  }

  /**
   * Returns an array of the keys and values (as subarrays), stored in the Map.
   *
   * @return {Array.Array} Array of keys and values (as subarrays)
   */
  entries() {
    return this._buckets.reduce((acc, bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        acc.push(bucket.at(i).value);
      }
      return acc;
    }, []);
  }

  _getBucket(index) {
    if (index < 0 || index >= this._buckets.length) {
      throw new Error('Index out of bounds');
    }
    return this._buckets[index];
  }

  _calculateThreshold() {
    this._threshold = Math.floor(this._capacity * this._loadFactor);
  }

  _resize() {
    const oldBuckets = this._buckets;
    this._capacity *= 2;
    this._calculateThreshold();

    this._buckets = new Array(this._capacity)
      .fill(null)
      .map(() => new LinkedList());
    oldBuckets.forEach((bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        this.set(bucket.at(i).value[0], bucket.at(i).value[1]);
      }
    });
  }

  _hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode += primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this._capacity;
    }

    return hashCode;
  }
}

module.exports = HashMap;
