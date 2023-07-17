# main content

- Nested function's scope
- Closures
- Currying
- this keyword
- Prototype
- Prototypalinheritance
- Class
- Iterables and Iterators
- Generators



# 嵌套函数作用域

![image-20230712223553020](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230712223553020.png)



- 块级作用域 - 在一对花括号内声明的变量无法从块外部访问。
- 函数作用域 - 在函数内部声明的变量无法从函数外部访问。
- 全局作用域 - 全局作用域的变量可以在块或函数内部访问。
- 嵌套函数的作用域。





```javascript
let a = 10

function outer() {
    let b = 20
    function inner() {
        let c = 30
        console.log(a, b, c);
    }
    inner()
}
outer()

```

当我们有嵌套函数时，JavaScript变量查找是从最里面函数开始的,我们试图在其中访问变量并向外移动，直到它到达全局范围



chatGPT优化：

> 在 JavaScript 中，当存在嵌套函数时，变量查找是从最内层的函数开始的，并向外层逐级查找，直到找到变量或达到全局作用域。
>
> 这意味着，当我们尝试在一个函数内部访问一个变量时，JavaScript 引擎首先检查该函数的作用域中是否存在该变量。如果找不到，它会继续向外层函数的作用域进行查找。如果在嵌套函数的上层函数中找到了该变量，那么它将使用那个变量。如果仍然找不到，JavaScript 引擎会继续向上层作用域进行查找，直到达到全局作用域。
>
> 如果变量在全局作用域中也未被找到，JavaScript 引擎将抛出一个 `ReferenceError` 异常。
>
> 这种变量查找的过程被称为词法作用域链（Lexical Scope Chain），它保证了变量按照定义的顺序从内到外进行查找，确保作用域的可见性和正确性。
>
> 总之，JavaScript 的变量查找是从最内层函数开始的，通过词法作用域链逐级向外层函数和全局作用域查找，直到找到变量或抛出异常。这种机制确保了变量的作用范围和可见性。



# 闭包

官方定义：

> A closure is the combination of a function bundled together with references to its surrounding state. Closures are created every time a function is created, at function creation time.

闭包是将函数与其周围状态的引用捆绑在一起的组合。每当创建一个函数时，闭包都会在函数创建时被创建。



```javascript
function outer() {
    let counter = 0
    function inner() {
        counter++
        console.log(counter);
    }
    inner()
}

outer()
```

运行后结果为`1`



那么如果调用两次`outer()`呢？

```javascript
function outer() {
    let counter = 0
    function inner() {
        counter++
        console.log(counter);
    }
    inner()
}

outer()
outer()
```

运行后：
```
1
1
```

这是因为每次调用`outer()`函数都会建立一个临时的内存，并且会有一个新的`counter`初始化为0，然后递增。因此每个`outer()`函数调用都会将`1`打印在控制台上。





```javascript
function outer() {
    let counter = 0
    function inner() {
        counter++
        console.log(counter);
    }
    return inner
}

const fn = outer()
fn()
fn()
```

现在`outer()`函数返回一个`inner()`函数，如果在外面调用两次`fn()`函数，会发生什么？

```
1
2
```



在上述代码中，我们可以看到闭包（Closure）的应用。

闭包是指函数以及它所创建的作用域对象的组合。它可以使函数访问在其词法作用域之外定义的变量。

在这个例子中，函数 `outer()` 内部声明了一个局部变量 `counter` 和一个内部函数 `inner()`。`inner()` 函数引用了 `counter` 变量，并在每次调用时递增它的值并打印。

然而，值得注意的是，当 `outer()` 函数执行完毕后，通常会认为其内部的局部变量 `counter` 应该被销毁。但是，由于 `inner()` 函数仍然保持对 `counter` 变量的引用，它的作用域并没有被销毁。

这就是闭包的关键所在：内部函数 `inner()` 保留了对其词法作用域（`outer()` 函数的作用域）中的变量 `counter` 的引用。因此，我们可以通过调用返回的 `inner` 函数来访问并修改 `counter` 变量，即使 `outer()` 函数已经执行完毕。

在这个例子中，我们将 `outer()` 函数的返回值赋值给了变量 `fn`，并连续调用了两次 `fn()`。每次调用 `fn()`，`counter` 变量的值都会递增并打印出来。

这展示了闭包的一个重要特性：内部函数 `inner()` 记住并保留了它创建时的词法环境（包括 `outer()` 函数的作用域和变量）。这样，即使 `outer()` 函数已经执行完毕，`inner()` 函数仍然可以访问和操作 `counter` 变量。

通过使用闭包，我们可以创建具有持久状态的函数，并且在不同的时间点调用这些函数时，它们可以继续访问和操作其创建时的变量。闭包在许多情况下都很有用，例如在模块模式、私有变量和数据封装等方面。



> in JavaScript. when we return a function from another function, we are effectively returning a combination of the function definition along with the function's scope. This would let the function definition have an associated persistent memory which could hold on to live data between executions That combination of the function and its scope chain is what is called a closurein JavaScript.

在 JavaScript 中，当我们从另一个函数中返回一个函数时，实际上返回的是函数定义与函数的作用域的组合。这使得函数定义可以与其作用域链相关联，从而在执行之间保持活动数据。这个函数和它的作用域链的组合就被称为 JavaScript 中的闭包。



在我们的例子中，函数作用域只有一个`counter`的变量，初始化为0，因此我们将函数`inner()`与变量`counter`捆绑在一起，这些变量一起称为闭包。在这种情况下，函数将保留或者记住`counter`变量的值



闭包包含两个主要部分：

1. 函数本身：在这个例子中，函数 `inner()` 是闭包的函数。
2. 词法作用域链：它由函数 `inner()` 的作用域和外部函数 `outer()` 的作用域组成。

闭包允许函数 `inner()` 访问并操作其词法作用域链中的变量，包括 `outer()` 函数中的局部变量 `counter`。这使得在函数 `outer()` 执行完毕后，我们仍然可以通过闭包调用的方式来使用 `counter` 变量，并且该变量的值会在每次调用时递增。

因此，在这种情况下，我们可以说函数 `inner()` 是闭包的一部分，而函数 `outer()` 则创建了这个闭包。闭包是由函数与其相关的作用域链组成的，它使得函数可以保留对其定义时所在的词法环境的引用。



## 总结

```javascript
function outer() {
    let counter = 0
    function inner() {
        counter++
        console.log(counter);
    }
    return inner
}

const fn = outer()
fn()
fn()
```



要记住关键点：

使用闭包，`inner()`函数可以访问`outer()`函数作用域中的变量，即使在`outer()`函数执行完成后！



在我们代码中可以看到：调用外部函数时`const fn = outer()`,它完成了执行，但内部函数`inner()`仍然可以访问`counter`变量，这个变量实际上是外部函数`outer()`作用域中定义的变量。



# 函数柯里化

## 定义

> Currying is a process in functional programming in which we transform a function with multiple arguments into a sequence of nesting functions that take one argument at a time.
>
>  function f(a,b,c) is transformed to f(a)b)(c)

柯里化是函数式编程中的一种过程，它将具有多个参数的函数转换为一系列嵌套函数，每次只接受一个参数。

函数f(a,b,c)被转换为f(a)(b)(c)。



## 案例

```javascript
function sum(a, b, c) {
    return a + b + c
}
// console.log(sum(2, 3, 5));    10


// function currying

function curry(fn) {
    return function (a) {
        return function (b) {
            return function (c) {
                return fn(a, b, c);
            }
        }
    }
}

const curriedSum = curry(sum);
console.log(curriedSum(2)(3)(5));
```

以上代码展示了函数柯里化的应用。

首先，我们有一个简单的求和函数 `sum`，它接受三个参数并返回它们的总和。

然后，我们定义了一个名为 `curry` 的函数，它接受一个函数 `fn` 作为参数，并返回一个嵌套的函数链。

这个嵌套的函数链是函数柯里化的关键。每个函数都接受一个参数，并返回另一个函数，直到最后一个函数接受最后一个参数并调用原始函数 `fn`。

在我们的示例中，我们使用 `curry` 函数对 `sum` 进行柯里化，并将返回的结果赋值给 `curriedSum`。

接下来，我们可以通过连续调用返回的函数来计算结果。例如，`curriedSum(2)(3)(5)` 会依次调用三个函数，并将参数传递给最后一个函数 `sum`，最终返回结果 10。



函数柯里化的优势在于可以通过部分应用的方式，根据需要固定部分参数，从而创建新的可重用函数。在我们的示例中，我们已经固定了 `sum` 函数的所有参数，并创建了一个新的函数 `curriedSum`，它只接受一个参数并返回一个函数。

这种灵活性允许我们在后续的调用中根据需要提供剩余的参数，从而实现参数复用和定制化的函数调用。

函数柯里化在函数式编程中被广泛使用，它提供了一种方式来处理函数的部分应用、参数复用以及更高级的函数组合操作。它可以使代码更具表达性和可读性，并促进模块化和可维护性。



## 总结

**柯里化** 是一种转换，将 `f(a,b,c)` 转换为可以被以 `f(a)(b)(c)` 的形式进行调用。JavaScript 实现通常都保持该函数可以被正常调用，并且如果参数数量不足，则返回部分应用函数。

柯里化让我们能够更容易地获取部分应用函数。就像我们在日志记录示例中看到的那样，普通函数 `log(date, importance, message)` 在被柯里化之后，当我们调用它的时候传入一个参数（如 `log(date)`）或两个参数（`log(date, importance)`）时，它会返回部分应用函数。



# this关键字

## 定义

> The JavaScript this keyword which is used in a function, refers to the object it belongs to 
>
> lt makes functions reusable by letting you decide the object value 
>
> this value is determined entirely by how a function is called



- 在JavaScript中，this关键字用于函数中，指向它所属的对象。
- 通过允许你确定对象的值，它使得函数可重用。
- this的值完全取决于函数的调用方式。



![image-20230714190918873](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230714190918873.png)

- 显式绑定
- 隐式绑定
- new 绑定
- 默认绑定



## 隐式绑定

当函数执行时，它属于某个对象Object，那么此时`this`被绑定到该对象。

```javascript
const person = {
    name: "tom",
    sayMyName: function () {
        console.log(`hello, my name is ${this.name}`);
    }
}

person.sayMyName();
```







## 显示绑定

可以通过`call`、`apply`和`bind`函数显示绑定this值。

```javascript
const person = {
    name: "jack"
}

function sayMyName() {
    console.log(`hello, my name is ${this.name}`);
}

sayMyName.call(person)
```





## new绑定

使用`new`调用函数（构造函数），会自动执行下面的步骤。

1. 创建一个全新的空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向函数的的`prototype`属性。
3. 将这个空对象绑定到函数内部的`this`关键字。
4. 执行函数内部的代码（一般通过给this属性赋值，初始化对象）。

上述第三步，就是new绑定。



```javascript
function Person(name) {
    this.name = name
}

const p1 = new Person("xiaoming")
const p2 = new Person("xiaohong")

console.log(p1.name, p2.name);
```

当在函数中使用`new`关键字调用函数时，`this`关键字总是引用一个新的空对象。



## 默认绑定

如果上面的三个绑定都不适用，则是默认绑定。

这是`this`绑定的默认规则，在无法应用其他规则时，使用该规则。

```javascript
function f() {
    console.log(this.a);
}

var a = 2;

f(); // 输出：2
```

在JavaScript中声明在全局作用域中的变量就是全局对象的一个同名属性。在浏览器环境中，这个全局对象就是`window`，所以`var a = 2`等价于`window.a = 2`。

当使用默认绑定时，`this`会被绑定到全局对象，上面的例子中函数`f()`执行时，`this`会被**默认绑定**到全局对象，即此时`this`指向全局对象，所以输出结果为2。

注意，当程序声明为`"use strict"`时，则不能将全局对象用于默认绑定。



## 优先级

![image-20230714234909210](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230714234909210.png)

- new 绑定
- 显示绑定
- 隐式绑定
- 默认绑定



## 总结

讲述了四种绑定规则，接下来讲述下完整的步骤，确定几种方式的优先级。

1. new绑定，如果函数在`new`中调用，那么`this`绑定的是新创建的对象。
2. 显示绑定，如果函数通过`call`、`apply`或者`bind`调用，那么`this`绑定的是指定对象。
3. 隐式绑定，函数是否在某个上下文对象中调用，如果是的，那么`this`绑定的是该上下文对象。
4. 以上都不符合的话，使用默认绑定，严格模式下绑定到`undefined`，非严格模式下绑定到全局对象。



# 原型prototype

## 定义

`prototype` 是 JavaScript 中的一个重要概念，它允许我们在对象构造函数中定义共享的属性和方法。通过使用 `prototype`，我们可以在每个实例对象中共享同一份属性和方法的副本，从而节省内存并提高性能。



## 案例

```javascript
function Person(fName, lName) {
    this.firstName = fName
    this.lastName = lName
}

const person1 = new Person("li", "si")
const person2 = new Person("zhao", "wu")

// JavaScript是动态语言，可以在任何时间给对象添加属性
person1.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
}

console.log(person1.getFullName());
```

可以得到`li si`,但是改成`console.log(person2.getFullName());`则失败。



在上述代码中，我们定义了一个 `Person` 构造函数，它接受 `fName` 和 `lName` 作为参数，并将它们分别赋值给实例对象的 `firstName` 和 `lastName` 属性。

然后，我们创建了两个实例对象 `person1` 和 `person2`。

接下来，我们尝试给 `person1` 添加一个 `getFullName` 方法，该方法用于返回完整的姓名。由于 JavaScript 是动态语言，我们可以在任何时间给对象添加属性和方法。



然而，通过直接给实例对象添加方法，每个实例都会有一份独立的方法副本，这可能会浪费内存并降低性能。而且，对 `person2` 实例无法访问到该方法。

为了改进这段代码并利用 `prototype`，我们可以将 `getFullName` 方法添加到 `Person` 构造函数的原型上。这样，所有通过 `Person` 构造函数创建的实例对象都可以共享同一份 `getFullName` 方法。

改进后的代码如下所示：

```javascript
function Person(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
}

Person.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
};

const person1 = new Person("li", "si");
const person2 = new Person("zhao", "wu");

console.log(person1.getFullName()); // 输出: "li si"
console.log(person2.getFullName()); // 输出: "zhao wu"
```

现在，通过将 `getFullName` 方法添加到 `Person.prototype`，我们确保所有实例对象共享同一份方法副本。这样不仅节省了内存，而且使得对于所有实例对象都可以调用该方法。

通过理解和正确使用 `prototype`，我们可以更好地管理和组织对象的属性和方法，提高代码的可读性和性能。它是 JavaScript 中原型继承和面向对象编程的基础。





# 原型继承Prototypal inheritance

## 介绍

原型继承是 JavaScript 中一种对象之间的继承关系，它是通过原型链的机制实现的。在原型继承中，一个对象可以继承另一个对象的属性和方法，从而实现代码的重用和扩展。

在 JavaScript 中，每个对象都有一个原型对象（prototype）。原型对象是一个普通的对象，它包含了一组属性和方法。当我们访问一个对象的属性或方法时，如果该对象本身没有这个属性或方法，JavaScript 会沿着原型链向上查找，直到找到该属性或方法为止。



原型继承的关键在于将一个对象的原型设置为另一个对象。这样，被设置为原型的对象的属性和方法就可以被继承对象所共享。



在 JavaScript 中，原型继承可以通过以下方式实现：

1. 构造函数和原型配合使用：通过定义构造函数并在构造函数的原型上添加属性和方法，从而创建对象的原型链。通过使用 `new` 关键字和构造函数，我们可以创建对象的实例，并继承构造函数原型上的属性和方法。

2. `Object.create()` 方法：通过使用 `Object.create()` 方法，我们可以创建一个新对象，并将其原型设置为另一个对象。这样，新对象就可以继承另一个对象的属性和方法。

原型继承的优势在于代码的重用和扩展。通过共享原型对象上的属性和方法，我们可以在多个对象之间共享代码，减少了重复编写相同代码的工作量。

同时，原型继承也提供了一种动态的方式来扩展和修改对象的行为。通过在原型对象上添加新的属性和方法，可以使所有继承该原型的对象都具备这些新的行为。

需要注意的是，原型继承不同于经典的类继承模型，它是基于对象的。在原型继承中，我们不定义类，而是通过对象之间的链接关系来实现继承。这使得 JavaScript 具有灵活性和动态性，能够更好地适应动态变化的需求。





## 案例及分析



JavaScript中的继承是通过原型的概念来支持的，被称为原型继承。

```javascript
function Person(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
}

Person.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
};

function SuperHero(fName, lName) {
    Person.call(this, fName, lName);
    this.isSuperHero = true;
}

SuperHero.prototype = Object.create(Person.prototype);
// SuperHero.prototype.constructor = SuperHero;
console.log(SuperHero.prototype.constructor);

SuperHero.prototype.fightCrime = function () {
    console.log("Fight crime");
};

const batman = new SuperHero("wang", "san");
console.log(batman.getFullName()); // 输出: "wang san"
```

运行结果：
```
[Function: Person]
wang san
```

去掉注释`// SuperHero.prototype.constructor = SuperHero;`

```javascript
function Person(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
}

Person.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
};

function SuperHero(fName, lName) {
    Person.call(this, fName, lName);
    this.isSuperHero = true;
}

SuperHero.prototype = Object.create(Person.prototype);
SuperHero.prototype.constructor = SuperHero;
console.log(SuperHero.prototype.constructor);


SuperHero.prototype.fightCrime = function () {
    console.log("Fight crime");
};

const batman = new SuperHero("wang", "san");
console.log(batman.getFullName()); // 输出: "wang san"

```

运行结果：

```
[Function: SuperHero]
wang san
```







1.上述代码中的`Person.call(this, fName, lName);`什么意思？



当在一个构造函数中创建另一个构造函数的实例时，我们通常会使用 `call()` 方法来调用父构造函数，并在子构造函数的上下文中执行父构造函数。

在上述代码中，我们有两个构造函数：`Person` 和 `SuperHero`。`SuperHero` 是 `Person` 的子构造函数。

在 `SuperHero` 构造函数中，我们使用 `Person.call(this, fName, lName)` 调用了 `Person` 构造函数。这里的 `this` 指的是 `SuperHero` 对象的实例。

通过调用 `Person.call(this, fName, lName)`，我们实际上在 `SuperHero` 对象的上下文中执行了 `Person` 构造函数。这会将 `fName` 和 `lName` 作为参数传递给 `Person` 构造函数，并设置 `SuperHero` 对象的 `firstName` 和 `lastName` 属性。

这样做的目的是将 `Person` 构造函数的逻辑应用于 `SuperHero` 对象，以确保 `SuperHero` 对象在创建时正确设置其属性。

通过使用 `Person.call(this, fName, lName)`，我们避免了在 `SuperHero` 构造函数中重复编写与 `Person` 构造函数相同的逻辑。同时，由于 `Person` 和 `SuperHero` 是两个独立的构造函数，它们之间的属性不会相互干扰。

总结起来，`Person.call(this, fName, lName)` 的作用是在 `SuperHero` 对象的上下文中执行 `Person` 构造函数，并确保 `SuperHero` 对象正确地获取其父构造函数 `Person` 的属性。这样，`SuperHero` 对象就拥有了 `Person` 对象的属性和方法，并可以在其基础上进行扩展。





2.上述代码中的`SuperHero.prototype = Object.create(Person.prototype);`是什么意思？

在上述代码中，`SuperHero.prototype = Object.create(Person.prototype)` 用于实现 `SuperHero` 对象继承自 `Person` 对象的原型。

让我们来逐步解释这行代码的原理：

1. `Person.prototype` 是一个包含 `Person` 对象的原型方法和属性的对象。

2. `Object.create(Person.prototype)` 创建了一个新的对象，它的原型被设置为 `Person.prototype`。这意味着新对象继承了 `Person.prototype` 的属性和方法。

3. `SuperHero.prototype` 是 `SuperHero` 构造函数的原型对象，我们通过将其设置为 `Object.create(Person.prototype)`，使得 `SuperHero.prototype` 继承了 `Person.prototype` 的属性和方法。

通过这样的设置，我们建立了一个原型链：`SuperHero.prototype` 链接到 `Person.prototype`，实现了原型继承。

这意味着，通过 `SuperHero` 构造函数创建的实例对象可以访问和使用 `Person.prototype` 上定义的属性和方法。

使用 `Object.create()` 的好处在于它可以创建一个新对象，而不是直接将 `Person.prototype` 分配给 `SuperHero.prototype`。这样做的好处是，如果后续我们在 `SuperHero.prototype` 上添加或修改了属性和方法，不会影响到 `Person.prototype`，从而保持了两者的独立性。

总结起来，`SuperHero.prototype = Object.create(Person.prototype)` 的作用是创建一个新的对象，并将该对象的原型设置为 `Person.prototype`，实现了 `SuperHero` 对象对 `Person` 对象原型的继承。这样，`SuperHero` 对象可以通过原型链访问和继承 `Person.prototype` 上定义的属性和方法。





3.上述代码中的`SuperHero.prototype.constructor = SuperHero;`是什么意思？

在上述代码中，`SuperHero.prototype.constructor = SuperHero` 是用来修复原型链中 `SuperHero.prototype.constructor` 的指向。

让我们来解释这行代码的原理：

1. 当我们将 `SuperHero.prototype` 设置为 `Object.create(Person.prototype)` 时，`SuperHero.prototype` 的 `constructor` 属性会被继承自 `Person.prototype`，指向 `Person` 构造函数。

2. 由于我们重新定义了 `SuperHero.prototype`，它的 `constructor` 属性需要指向正确的构造函数，即 `SuperHero` 构造函数。

3. 通过设置 `SuperHero.prototype.constructor = SuperHero`，我们将 `SuperHero.prototype` 的 `constructor` 属性显式地指向 `SuperHero` 构造函数。

这样做的目的是确保 `SuperHero.prototype.constructor` 指向正确的构造函数。在原型继承中，通过正确设置 `constructor` 属性，我们可以追踪对象的原始构造函数。

如果不进行修复，`SuperHero.prototype.constructor` 将指向 `Person` 构造函数，这可能会导致意外的结果。例如，当我们使用 `new SuperHero()` 创建一个实例时，`constructor` 属性将指向 `Person` 而不是 `SuperHero`。

通过显式设置 `SuperHero.prototype.constructor = SuperHero`，我们确保了原型链中 `SuperHero.prototype.constructor` 的正确指向。

总结起来，`SuperHero.prototype.constructor = SuperHero` 的作用是修复原型链中 `SuperHero.prototype.constructor` 的指向，确保它指向正确的构造函数 `SuperHero`。这样，我们可以正确地追踪对象的原始构造函数，并在需要时创建新的实例。





4.为什么我不写`SuperHero.prototype.constructor = SuperHero`,运行结果还是一样？

在某些情况下，即使不写 `SuperHero.prototype.constructor = SuperHero`，代码仍然能够正常运行并得到正确的结果。这是因为在 JavaScript 中，对象的原型链仅是一种对象之间的链接关系，`constructor` 属性只是其中的一个属性。

然而，根据 JavaScript 的约定和一些开发实践，保持 `constructor` 属性的正确性是有益的，特别是在涉及到对象的创建和继承时。下面通过一个现实中的例子来说明这一点。

假设我们有一个构造函数 `Animal` 和一个子构造函数 `Dog`，它继承自 `Animal`：

```javascript
function Animal() {}
function Dog() {}

Dog.prototype = Object.create(Animal.prototype);
```

在这个例子中，`Dog.prototype` 通过 `Object.create(Animal.prototype)` 建立了原型链，使 `Dog` 继承了 `Animal` 的原型。

现在，如果我们创建一个 `Dog` 的实例，并尝试访问其构造函数：

```javascript
const myDog = new Dog();
console.log(myDog.constructor); // 输出: [Function: Animal]
```

由于我们没有显式地设置 `Dog.prototype.constructor`，它将继承自 `Animal.prototype`，指向了 `Animal` 构造函数。这可能会导致一些意外，特别是在代码中依赖于 `constructor` 属性的场景下。

为了修复这个问题，我们应该显式设置 `Dog.prototype.constructor`：

```javascript
Dog.prototype.constructor = Dog;
```

这样做的目的是确保 `Dog.prototype.constructor` 指向正确的构造函数 `Dog`。现在，如果我们再次访问实例的构造函数：

```javascript
console.log(myDog.constructor); // 输出: [Function: Dog]
```

我们会得到正确的构造函数 `Dog`。

保持 `constructor` 属性的正确性是一个良好的实践，有助于代码的可读性和可维护性。虽然在某些情况下可能不会导致错误，但显式设置 `constructor` 属性可以提供更明确的代码意图，并帮助其他开发人员更好地理解代码的结构和继承关系。



5.前面的`SuperHero.prototype.constructor`，是`SuperHero`构造函数的原型的构造函数吗？

是的，`SuperHero.prototype.constructor` 是指向 `SuperHero` 构造函数的原型的构造函数属性。

让我们来详细解释这一点：

在 JavaScript 中，每个函数都有一个 `prototype` 属性，它是一个对象。当我们创建一个函数时，JavaScript 会自动为该函数创建一个原型对象，并将其赋值给 `prototype` 属性。

在原型继承中，构造函数的 `prototype` 对象用作新对象的原型。也就是说，通过 `new` 关键字和构造函数创建的对象会继承构造函数的原型。

对于 `SuperHero` 构造函数而言，`SuperHero.prototype` 就是它的原型对象。因此，`SuperHero.prototype.constructor` 指向 `SuperHero` 构造函数本身。

这是因为 `constructor` 属性是原型对象上的一个特殊属性，它引用了构造函数本身。通过原型链，我们可以在实例对象上访问到原型对象的属性，包括 `constructor` 属性。

在某些情况下，可能会出现需要手动设置 `constructor` 属性的情况，特别是在修改或重置原型链时。这是为了确保 `constructor` 属性指向正确的构造函数。

因此，`SuperHero.prototype.constructor` 是指向 `SuperHero` 构造函数的原型的构造函数属性。它使我们能够跟踪对象的原始构造函数，并在需要时创建新的实例对象。





## 总结

关于原型继承，我们可以得出以下总结：

- 原型继承是 JavaScript 中一种对象之间的继承关系，通过原型链的机制实现。
- 每个对象都有一个原型对象，原型对象是一个普通的对象，它包含了一组属性和方法。
- 当访问一个对象的属性或方法时，如果该对象本身没有这个属性或方法，JavaScript 会沿着原型链向上查找，直到找到为止。
- 原型继承可以通过构造函数和原型配合使用，或者通过 `Object.create()` 方法实现。
- 通过定义构造函数并在构造函数的原型上添加属性和方法，我们可以创建对象的原型链，并通过 `new` 关键字和构造函数来创建对象的实例并继承属性和方法。
- 通过使用 `Object.create()` 方法，我们可以创建一个新对象，并将其原型设置为另一个对象，实现对象之间的继承关系。
- 原型继承的优势在于代码的重用和扩展，通过共享原型对象上的属性和方法，可以减少重复编写相同代码的工作量。
- 原型继承是基于对象的，不同于经典的类继承模型，它提供了灵活性和动态性，能够更好地适应动态变化的需求。

总的来说，原型继承是 JavaScript 中一种强大的机制，它通过原型链实现对象之间的属性和方法的继承。理解和正确使用原型继承对于编写可维护、灵活和高效的 JavaScript 代码至关重要。





# 类class



## 基本介绍

现在有用类来实现原型继承的方式。



```javascript
class Person {
    constructor(fName, lName) {
        this.firstName = fName
        this.lastName = lName
    }

    sayMyName() {
        return this.firstName + " " + this.lastName
    }
}

const classP1 = new Person("li", "si")
console.log(classP1.sayMyName());


class SuperHero extends Person {
    constructor(fName, lName) {
        super(fName, lName)
        this.isSuperHero = true
    }

    fightCrime() {
        console.log("fighting crime");
    }
}

const batman = new SuperHero("wei", "en")
console.log(batman.sayMyName());
batman.fightCrime();
```

在上面的代码中，我们使用了 `class` 关键字来定义一个类，并且创建了 `Person` 和 `SuperHero` 两个类的实例。

`class` 是 JavaScript 中引入的一种语法糖，它提供了更简洁和面向对象的方式来定义对象和构造函数。它基于原型继承的概念，并且更符合传统的类和对象的概念。



下面我们逐步解释这段代码的关键部分：

首先，我们定义了 `Person` 类。类的定义使用 `class` 关键字，后面跟着类名 `Person`。类名通常使用首字母大写的驼峰命名法。

在类的定义中，我们使用 `constructor` 方法来定义构造函数。构造函数在类实例化时自动调用，用于初始化对象的属性。在构造函数中，我们使用 `this` 关键字来引用实例对象，并设置其属性。

除了构造函数外，我们还可以在类中定义其他方法。在 `Person` 类中，我们定义了 `sayMyName` 方法，它返回实例对象的完整姓名。

接下来，我们使用 `new` 关键字和 `Person` 类创建了一个实例 `classP1`，并传递了相应的参数。通过调用实例的 `sayMyName` 方法，我们可以获取该实例对象的完整姓名。

然后，我们定义了一个子类 `SuperHero`，它继承自 `Person` 类。通过使用 `extends` 关键字，我们指定了 `SuperHero` 类的父类为 `Person`。

在 `SuperHero` 类的构造函数中，我们使用 `super()` 关键字调用了父类 `Person` 的构造函数，以初始化继承自父类的属性。

除了继承属性外，我们还在 `SuperHero` 类中定义了一个新的方法 `fightCrime`，用于打印一条信息表示正在打击犯罪。

最后，我们使用 `new` 关键字和 `SuperHero` 类创建了一个实例 `batman`，并传递了相应的参数。通过调用实例的 `sayMyName` 方法，我们可以获取该实例对象的完整姓名。同时，我们还可以调用 `fightCrime` 方法，表示超级英雄正在打击犯罪。



通过使用 `class` 关键字，我们可以更清晰地定义类和对象的结构，提供了一种更面向对象的编程方式。它使得代码更易读、易维护，并且符合传统的类和对象的概念。



## 总结



下面是关于 `class` 的总结：

- `class` 是 JavaScript 中引入的一种语法糖，用于更简洁和面向对象的方式定义对象和构造函数。
- `class` 关键字后跟类名，通常使用首字母大写的驼峰命名法。
- 类中使用 `constructor` 方法定义构造函数，构造函数在实例化类时自动调用，用于初始化对象的属性。
- 类中可以定义其他方法，这些方法将成为实例对象的方法。
- 使用 `new` 关键字和类名，可以创建类的实例。
- 类可以通过 `extends` 关键字继承其他类，形成类的层次结构。
- 在子类的构造函数中，可以使用 `super()` 关键字调用父类的构造函数，以初始化继承自父类的属性。
- 子类可以添加新的方法和属性，以扩展或修改从父类继承的行为。
- 类的实例可以调用类中定义的方法，访问实例的属性。
- `class` 是基于原型继承的概念实现的，它提供了更符合传统类和对象概念的语法。

使用 `class` 关键字可以使代码更具可读性和可维护性，使得面向对象编程更加直观和简单。它提供了一种更优雅的方式来组织和管理代码，同时与 JavaScript 原有的原型继承机制保持兼容。





# 可迭代对象和迭代器



## 为什么需要迭代和迭代器

![image-20230717161426742](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230717161426742.png)

现在，这种形式的迭代有两个困难：



> 1.Difficulty in accessing the element 
>
> 2.Difficult to manage iteration on the data for various types of data structures 
>
> There was a need to iterate over various data structures in a new way that abstracts away the complexity of accessing elements one by one and was at the same time uniform across the different data structures

1. 访问元素的困难
2. 难以管理各种类型的数据结构上的迭代

需要以一种新的方式在各种数据结构上进行迭代，以将逐个访问元素的复杂性抽象化，并且在不同的数据结构之间保持统一。





## 迭代对象和迭代协议

![image-20230717163831562](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230717163831562.png)



>An object which implements the iterable protocol is called an iterable
>For an object to be an iterable it must implement a method at the key [Symbol.iterator]
>That method should not accept any argument and should return an object which conforms to the iterator protocol
>The iterator protocol decides whether an object is an iterator
>The object must have a next() method that returns an object with two properties
>
>- value: which gives the current element
>- done: which is a boolean value indicating whether or not there are any more elements that



- 实现可迭代协议的对象被称为可迭代对象
- 要使一个对象成为可迭代对象，它必须在键[Symbol.iterator]处实现一个方法
- 该方法不应接受任何参数，并且应返回一个符合迭代器协议的对象
- 迭代器协议决定一个对象是否是迭代器
- 该对象必须具有一个next()方法，该方法返回一个带有两个属性的对象
    - value：表示当前元素的值
    - done：是一个布尔值，指示是否还有更多可迭代元素



## 实现一个迭代器

```javascript
const obj = {
    [Symbol.iterator]: function () {
        let step = 0
        const iterator = {
            next: function () {
                step++
                if (step == 1) {
                    return { value: 'Hello', done: false }
                } else if (step == 2) {
                    return { value: 'World', done: false }
                }
                return { value: undefined, done: true }
            }
        }
        return iterator
    }
}

for (word of obj) {
    console.log(word);
}
```



1.`   [Symbol.iterator]: function () `中":"是什么作用吗？

在对象字面量中，`:` 是用来分隔属性名和属性值的符号。在 `[Symbol.iterator]: function ()` 这个语法中，`:` 将 `Symbol.iterator` 定义为对象的属性名，后面的 `function ()` 则是该属性的属性值，即一个函数表达式。

使用 `:` 将属性名和属性值分隔开来，是定义对象属性的一种语法规则，它表示将属性名和属性值关联起来。在这个特定的情况下，我们使用 `Symbol.iterator` 作为属性名，而 `function ()` 作为该属性的属性值，以创建一个自定义的迭代器方法。

需要注意的是，`Symbol.iterator` 是一个特殊的内置符号，在 JavaScript 中用于定义对象的默认迭代器。通过将 `Symbol.iterator` 作为属性名，并在其后定义一个函数表达式作为属性值，我们可以在对象上定义一个自定义的迭代器方法。



2.为什么不能用"="呢？如果可以，说说原因

在对象字面量中，用 `:` 来分隔属性名和属性值是规定的语法，而不是使用 `=`。这是因为对象字面量中的 `:` 用于指定属性名和属性值的关联关系，而 `=` 则用于赋值操作。

如果我们在对象字面量中使用 `=` 来分隔属性名和属性值，它将被视为赋值操作符，而不是定义属性的语法。

考虑以下示例：

```javascript
const obj = {
  property = 'value'
};
```

在上面的示例中，使用 `=` 将属性名和属性值分隔开，这将被解释为赋值操作。因此，代码会尝试将 `'value'` 赋值给 `property` 变量，但由于没有声明 `property` 变量，会导致语法错误。

为了遵循 JavaScript 对象字面量的语法规则，并正确地定义对象的属性和属性值的关联关系，我们应该使用 `:` 来分隔属性名和属性值。

当我们在对象字面量中使用 `:` 时，它会明确地指示我们正在定义一个属性，并将该属性与指定的值关联起来。这有助于确保代码的可读性和一致性，并遵循 JavaScript 的语法规则。



3.什么是对象字面量？

对象字面量是一种用于创建和初始化对象的语法表示形式。它是 JavaScript 中一种简洁且常用的对象创建方式。

在对象字面量中，我们使用花括号 `{}` 来表示对象，并在花括号内部定义对象的属性和属性值。属性和属性值之间使用 `:` 分隔，多个属性之间使用逗号 `,` 分隔。

以下是一个简单的对象字面量的示例：

```javascript
const person = {
  name: 'John',
  age: 30,
  profession: 'Developer'
};
```

在上面的示例中，我们使用对象字面量创建了一个名为 `person` 的对象。该对象具有三个属性：`name`、`age` 和 `profession`，并分别赋予了相应的值。

对象字面量的优点是它提供了一种简洁的语法来创建对象，避免了显式使用构造函数的复杂性。我们可以直接在对象字面量中指定属性和属性值，而无需定义构造函数或调用 `new` 关键字。

对象字面量还支持动态属性名，可以使用计算属性名和对象方法来扩展对象的功能。它还可以嵌套使用，创建多层的对象结构。

对象字面量是 JavaScript 中常用的对象创建方式之一，它在编写简单和快速创建对象的代码时非常有用。它广泛应用于对象的初始化、配置对象、传递参数等场景。



4.对象字面量，能用"="给属性赋值吗？

在对象字面量中，我们使用冒号 `:` 来给属性赋值，而不是使用等号 `=`。这是因为对象字面量中的语法规定属性名和属性值之间使用冒号 `:` 分隔。

例如，正确的对象字面量赋值语法如下所示：

```javascript
const person = {
  name: 'John',
  age: 30,
  profession: 'Developer'
};
```

在上面的示例中，我们使用冒号 `:` 将属性名和属性值关联起来，例如 `name: 'John'`、`age: 30` 和 `profession: 'Developer'`。

如果我们尝试使用等号 `=` 给属性赋值，例如 `name = 'John'`，那么 JavaScript 会将其解释为变量赋值操作，而不是对象字面量的属性赋值操作。这可能会导致语法错误或不符合预期的结果。

因此，为了正确地定义对象字面量的属性和属性值，我们应该使用冒号 `:` 分隔它们，而不是使用等号 `=`。这样可以确保我们遵循 JavaScript 对象字面量的语法规则，并正确地创建和初始化对象。





实现一个迭代器需要以下几个具体的步骤：

1. 创建一个对象，它将充当迭代器。
2. 在对象中定义一个 `next` 方法，用于返回迭代的下一个值。
3. 在 `next` 方法中实现迭代的逻辑，包括返回当前值和更新迭代状态。
4. 迭代器对象可以通过调用 `next` 方法多次来获取连续的迭代值。
5. 定义一个特殊的符号 `Symbol.iterator` 作为对象的属性名，使得对象成为可迭代对象。

下面是一个示例，演示如何实现一个简单的迭代器，并将对象变为可迭代对象：

```javascript
const customIterator = {
  data: [1, 2, 3, 4, 5],
  index: 0,
  next: function() {
    if (this.index < this.data.length) {
      return { value: this.data[this.index++], done: false };
    } else {
      return { value: undefined, done: true };
    }
  },
  [Symbol.iterator]: function() {
    return this;
  }
};

for (let item of customIterator) {
  console.log(item);
}
```

在上面的示例中，我们创建了一个自定义迭代器对象 `customIterator`。该对象包含一个数组 `data`，表示要迭代的数据，和一个 `index` 属性，表示当前迭代的索引位置。

`customIterator` 对象定义了一个 `next` 方法，该方法根据当前索引返回迭代的下一个值，并更新索引位置。如果已经迭代完所有的值，`next` 方法会返回 `{ value: undefined, done: true }`。

为了使对象成为可迭代对象，我们在对象中定义了一个特殊的属性 `Symbol.iterator`，并将其值设置为一个函数，该函数返回迭代器对象本身。这样，对象就具备了迭代的能力。

通过使用 `for...of` 循环来迭代 `customIterator`，我们可以依次获取迭代器的值并输出到控制台。

注意，实现一个完整的迭代器可能涉及更多的复杂性，例如处理迭代器的重置、实现可定制的迭代逻辑等。以上示例仅提供了一个简单的迭代器的基本实现。



## 总结

下面是关于迭代器和可迭代对象的知识点总结：

- 迭代器是一种对象，它提供了一种顺序访问集合或序列中元素的方式。
- 迭代器对象必须具备 `next` 方法，用于返回迭代的下一个值。
- `next` 方法返回一个包含 `value` 和 `done` 属性的对象。`value` 表示当前迭代的值，`done` 表示迭代是否完成。
- 可迭代对象是一个实现了迭代器协议的对象，它可以被迭代（遍历）。
- 可迭代对象必须具备特殊的符号 `Symbol.iterator` 作为属性名，并且对应的属性值是一个函数，该函数返回迭代器对象。
- `for...of` 循环是用于迭代可迭代对象的语法结构，它会自动调用迭代器的 `next` 方法，获取迭代的值并进行迭代操作。
- 迭代器和可迭代对象提供了一种灵活的方式来遍历数据集合，无论是数组、字符串、Map、Set 还是自定义的对象。
- 自定义迭代器的实现包括创建迭代器对象、定义 `next` 方法、迭代逻辑和状态更新等步骤。
- 通过将迭代器对象赋值给可迭代对象的 `Symbol.iterator` 属性，我们可以使自定义对象成为可迭代对象，从而可以使用 `for...of` 循环遍历它。

迭代器和可迭代对象为我们提供了一种统一的方式来处理不同类型的数据集合，使得数据的遍历和操作变得更加简洁、可读和可维护。这是 JavaScript 中非常重要的基本概念之一。





# 生成器Generator

## 基本介绍

生成器可以为我们创建一个迭代器而不是我们必须编写它。

生成器（Generator）是一种特殊类型的函数，它可以产生多个值，并且具有暂停和恢复执行的能力。在 JavaScript 中，我们使用 `function*` 关键字来定义生成器函数，生成器函数内部使用 `yield` 关键字来定义生成器的每个值。





```javascript
function* generatorFunction() {
    yield 'Hello'
    yield 'World'
}

const generatorObj = generatorFunction()

for (word of generatorObj) {
    console.log(word);
}
```

现在，让我们解释上面代码的工作原理：

1. 首先，我们定义了一个生成器函数 `generatorFunction`，通过在函数名前添加 `function*` 关键字来表示这是一个生成器函数。
2. 在生成器函数内部，我们使用 `yield` 关键字定义了两个生成器的值，即 `'Hello'` 和 `'World'`。
3. 接下来，我们创建了一个生成器对象 `generatorObj`，通过调用生成器函数来实例化它，即 `generatorFunction()`。
4. 在 `for...of` 循环中，我们遍历了 `generatorObj` 这个生成器对象。
5. 在每次循环迭代中，生成器的执行会暂停在 `yield` 关键字处，并返回 `yield` 后面的值。
6. 在第一次迭代中，生成器返回 `'Hello'`，我们将其打印到控制台。
7. 在第二次迭代中，生成器返回 `'World'`，我们再次将其打印到控制台。
8. 循环继续迭代，但由于生成器没有更多的值可生成，循环终止。

生成器的关键特点是它可以在每次迭代之间暂停执行，并且保留了函数的上下文和状态。这使得我们可以按需生成数据，而不是一次性生成所有数据。生成器提供了一种更高级和更灵活的迭代模式，特别适用于处理大量数据或需要按需生成数据的场景。

需要注意的是，生成器是惰性的，即在调用生成器函数时，并不会立即执行函数内部的代码。相反，它返回一个生成器对象，只有在迭代该对象时，才会执行生成器函数的代码，并产生值。这种按需执行的特性使得生成器函数非常高效和灵活。



> 在生成器中，将 `yield` 翻译为"产出"或"生成"可能是更合适的选择。这两个词可以更准确地传达 `yield` 在生成器中的含义和作用。
>
> 由于生成器函数的目的是按需生成值，并在每个生成点暂停执行，`yield` 可以看作是生成器函数产出值的关键点。它表示生成器在当前位置产生一个值，并将控制权返回给调用方。当生成器的 `next` 方法被调用时，它会返回这个生成的值，并等待下一次调用以继续生成。
>
> 因此，将 `yield` 翻译为"产出"或"生成"可以更清晰地传达生成器的行为。这种翻译强调了 `yield` 在生成器中的作用，即按需生成值并在每个生成点暂停执行，为迭代提供了一种灵活和高效的方式。





## 总结

下面是有关生成器的知识点总结：

- 生成器是一种特殊类型的函数，通过使用 `function*` 关键字来定义。
- 生成器函数内部使用 `yield` 关键字来指定每个生成的值。
- 生成器函数可以按需生成多个值，并且具有暂停和恢复执行的能力。
- 生成器函数返回一个生成器对象，它可以通过调用 `next` 方法来迭代生成值。
- `yield` 关键字用于产出一个值并暂停生成器的执行。
- 在每次调用生成器的 `next` 方法时，生成器会从上次暂停的地方恢复执行，并生成下一个值。
- 生成器对象的 `next` 方法返回一个包含生成的值和一个布尔值的对象，用于表示生成器是否已完成。
- 生成器可以使用多个 `yield` 语句来生成多个值，实现按需生成数据的功能。
- 生成器可以与 `for...of` 循环一起使用，使得迭代更加简洁和直观。
- 生成器还可以与其他异步编程技术（如 Promise、async/await）结合使用，实现更复杂的异步操作流程。
- 生成器提供了一种高级的、灵活的迭代模式，适用于处理大量数据、按需生成数据或需要控制执行流程的场景。

生成器为 JavaScript 提供了一种优雅和强大的迭代机制，能够简化代码并改善可读性。它在异步编程、惰性计算和处理大型数据集等方面具有广泛的应用。
