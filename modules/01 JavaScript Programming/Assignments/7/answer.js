var v1;
var v2 = undefined;
var isTrue = v1 == v2 ? true:false;
console.log(isTrue);
isTrue = v1 === v2 ? true:false;
console.log(isTrue);
v1 = 'some string';
isTrue = v1 == v2 ? true:false;
console.log(isTrue);
isTrue = v1 === v2 ? true:false;
console.log(isTrue);