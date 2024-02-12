const HashMap = require('./HashMap');

class HashSet extends HashMap {
  /**
   * Sets a value in the Set.
   *
   * @param {string} key - the key to set
   */
  set(key) {
    const bucket = this._getBucket(this._hash(key));
    const listIndex = bucket.search((node) => node.value[0] === key);

    if (listIndex === null) {
      bucket.append([key, null]);

      if (this.keys().length >= this._threshold) {
        this._resize();
      }
    }
  }

  /**
   * Retrieves a value from the Set based on the provided key.
   *
   * @param {string} key - The key to search for in the hash table
   * @return {string|null} - The searched key, or null if the key is not found
   */
  get(key) {
    const bucket = this._getBucket(this._hash(key));
    const listIndex = bucket.search((node) => node.value[0] === key);

    return listIndex !== null ? key : null;
  }
}

module.exports = HashSet;
