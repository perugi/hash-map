const HashMap = require('./HashMap');

const map = new HashMap();
console.log(map.length());

// map.toString();

map.set('kes', 'value');
map.set('ker', 1);

// map.toString();

console.log(map.get('kes'));
console.log(map.get('kep'));
console.log(map.get(''));

console.log(map.has('kes'));
console.log(map.has('kep'));
console.log(map.has(''));

console.log(map.length());
console.log(map.remove('kep'));
console.log(map.remove('kes'));
console.log(map.length());

map.set('kes', 'value');
console.log(map.keys());
// console.log(map.values());
console.log(map.entries());
console.log(map.length());
map.clear();
console.log(map.length());
map.toString();

console.log(map.keys());
// console.log(map.values());
console.log(map.entries());

for (let i = 0; i < 15; i++) {
  const key = Math.random().toString(36).substring(7);
  const value = `value${i}`;
  map.set(key, value);
}

map.toString();

map.set('test', 'test');
console.log(map.get('test'));
map.set('test', 'test2');
console.log(map.get('test'));

// for (let i = 0; i < 100; i++) {
//   const key = Math.random().toString(36).substring(7);
//   const value = `value${i}`;
//   map.set(key, value);
// }
// map.toString();
