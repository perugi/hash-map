const HashMap = require('./HashMap');

class HashSet extends HashMap {
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

  get(key) {
    const bucket = this._getBucket(this._hash(key));
    const listIndex = bucket.search((node) => node.value[0] === key);

    return listIndex !== null ? key : null;
  }

  static values() {
    return undefined;
  }

  static entries() {
    return undefined;
  }
}

module.exports = HashSet;
