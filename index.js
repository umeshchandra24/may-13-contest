let x = "umesh chandra umesh chandra";
const y = x.matchAll(/umesh/g);
console.log(Array.from(y));
console.log(x.endsWith("chandra"));