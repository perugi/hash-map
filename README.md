# Hash Map

A practice implementation of a Hash Map in JavaScript as an ES6 Class, based on the specifications at: https://www.theodinproject.com/lessons/javascript-hashmap.

## Usage

```js
const map = new HashMap();
map.set('first', 1);
map.set('second', ['a', 42]);
console.log(map.get('first')); // 1
```

## Methods

The following public class methods are implemented:

- `set(key, value)` assigns a value to the specified key. If a key already exists, then the old value is overwritten.
- `get(key)`returns the value that is assigned to the key. If a key is not found, return null.
- `has(key)`returns true or false based on whether or not the key is in the hash map.
- `remove(key)` removes the entry with that key and returns true if the key is in the hash map. If the key isn’t in the hash map, it returns false.
- `length()` returns the number of stored keys in the hash map.
- `clear()` removes all entries in the hash map.
- `keys()` returns an array containing all the keys inside the hash map.
- `values()` returns an array containing all the values.
- `entries()` returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
