# node-csharp-random
a random library like as Random Class of C#
```
var Random = require('node-csharp-random');

var random = new Random(123);
console.log(random.Next());
random = new Random(0);
console.log(random.Next());
random = new Random(666666);
console.log(random.Next());
random = new Random(999999);
console.log(random.Next());
random = new Random(99999999);
console.log(random.Next());
console.log(random.Next(1, 99999999));
console.log(random.Next(10, 20));
console.log(random.Next(10));
console.log(random.NextDouble());
```

![random-node](https://raw.githubusercontent.com/Rwing/Rwing-s-Repository/master/images/random-node.png)

![random-csharp](https://raw.githubusercontent.com/Rwing/Rwing-s-Repository/master/images/random-csharp.png)