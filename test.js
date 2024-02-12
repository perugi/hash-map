const HashMap = require('./HashMap');
const HashSet = require('./HashSet');

console.log('--- HashMap TESTS ---');
console.log('');

const map = new HashMap();
console.log(`Length of an empty map: ${map.length()}`);
console.log('Keys, values and entries of an empty map:');
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
console.log(`Get with an empty map: ${map.get('test')}`);

map.set('test1', 'value1');
map.set('test2', 2);
map.set('test3', [0, 'test']);

console.log(`Length after setting three keys: ${map.length()}`);

console.log('Map after adding three items:');
console.log(map.toString());

console.log(`Get {'test1': 'value1'}: ${map.get('test1')}`);
console.log(`Get non-existing key 'test': ${map.get('test')}`);
console.log(`Get an empty key '': ${map.get('')}`);

console.log(`Has {'test1': 'value1'}: ${map.has('test1')}`);
console.log(`Has an unexisting key 'test': ${map.has('test')}`);
console.log(`Has an empty key '': ${map.has('')}`);

console.log('Keys of the map:');
console.log(map.keys());
console.log('Values of the map:');
console.log(map.values());
console.log('Entries of the map:');
console.log(map.entries());

console.log(`Remove key 'test2': ${map.remove('test2')}`);
console.log(`Remove non-existing key 'test': ${map.remove('test')}`);
console.log(`Remove empty key '': ${map.remove('')}`);
console.log(`Try to get removed key: ${map.get('test2')}`);
console.log(`Length after removing a key: ${map.length()}`);

map.clear();
console.log(`Length after clearing the Map: ${map.length()}`);
console.log('Map after clearing:');
console.log(map.toString());

// Fill with 15 elements, causing the map to be resized
for (let i = 0; i < 15; i++) {
  const key = Math.random().toString(36).substring(7);
  const value = `value${i}`;
  map.set(key, value);
}

console.log('Map after adding enough elements to resize:');
console.log(map.toString());

// Fill with an additional 10000 items.
for (let i = 0; i < 10000; i++) {
  const key = Math.random().toString(36).substring(7);
  const value = `value${i}`;
  map.set(key, value);
}
console.log(`Length after adding 10000 items: ${map.length()}`);

console.log('');
console.log('--- HashSet TESTS ---');
console.log('');
const set = new HashSet();

set.set('test');
console.log(`Length after setting a key: ${set.length()}`);
console.log(`Set after setting a key: ${set.toString()}`);
set.set('test');
console.log(`Length after setting a duplicate key: ${set.length()}`);
console.log(`Set after setting a duplicate key: ${set.toString()}`);
console.log(`Getting a set key: ${set.get('test')}`);
console.log(`Getting a non-existing key: ${set.get('test1')}`);
console.log(`Getting an empty key: ${set.get('')}`);
