
let nums = [5,3,1,8,4]

// nums.forEach(n => console.log(n*2));
// 10
// 6
// 2
// 16
// 8

// maps 
// const doubled = nums.map(n => n*2);
// console.log(doubled);   [ 10, 6, 2, 16, 8 ]

// filter
// const sum = nums.filter(n => n % 2 === 0);
// console.log(sum);   [ 8, 4 ]

//  reduce 
const sum = nums.reduce((acc,n) = acc + n,0);
console.log(sum);