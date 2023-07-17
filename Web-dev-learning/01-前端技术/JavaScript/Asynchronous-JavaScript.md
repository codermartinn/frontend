# 重点



![image-20230709150615945](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709150615945.png)





# 为什么需要异步JavaScript



## JavaScript是什么



在最基本的形式中，JavaScript是一种同步、阻塞、单线程语言

> In its most basic form, JavaScript is a synchronous, blocking, single-threaded language





**Synchronous**

- 首先，JavaScript是同步的，如果我们有两个将消息记录到控制台的函数，代码自上而下执行，在任何给定时间只执行一行

```javascript
function A(){
	console.log('A')
}

function B(){
	console.log('B')
}
A()
B()
->  logs A and than B
```



**Blocking**

- JavaScritpt是阻塞式的，这是因为它的同步性质。无论前一个进程需要多长时间，后续进程都不会启动，直到前一个进程完成
- 如果函数A必须执行大量代码，JavaScript必须在不继续函数B的情况下完成它。即使该代码需要10秒或1分钟。
- Web应用程序在浏览器中运行，它执行大量代码而不将控制权返回给浏览器，浏览器可能看起来被冻结了





**Single-threaded**
- 线程只是你的javascript程序可以用来运行任务的进程
- 每个线程一次只能执行一项任务
- JavaScript只有一个称为主线程的线程来执行任何代码





总结：

![image-20230709151740791](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709151740791.png)





## 为什么JavaScript要引入异步

因此，JavaScript会产生一个巨大的问题。

- 获取DataFromDB(端点可能需要1秒甚至更长时间
- 在此期间，我们无法运行任何进一步的代码
- JavaScript，如果它只是简单地继续到下一行而不等待！我们有一个错误，因为数据不是我们所期望的那样。
- 我们需要一种使用JavaScript实现异步行为的方法

![image-20230709152302841](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709152302841.png)





## JavaScript是怎么引入异步

- 仅仅是JavaScript是不够的
- 我们需要JavaScript之外的新代码来帮助我们编写异步代码，这是web浏览器发挥作用的地方。
- Web浏览器定义允许我们注册函数的函数和API不应该同步执行，应该当某种事件发生时异步地调用
- 例如，这可能是时间的流逝(setTimeout或setInterval)用户与鼠标的交互(AddEventListener)，或网络上的数据(回调、承诺、异步等待)
- 您可以让您的代码同时执行多项任务，而无需停止或阻塞主线程

![image-20230709152720119](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709152720119.png)







# Timeouts&Intervals

JavaScript可用于异步运行代码的传统方法



- after a set time period elapsed or
- at regular intervals of time
- setTimeout()
- setlnterval()



## setTimeout()

![image-20230709154129197](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709154129197.png)



一个简单的`setTimeout()` demo:

```javascript
function greet() {
    console.log("hello")
}

setTimeout(greet,2000)
```

> Logs 'Hello' to the console after 2 seconds



如果函数要接收参数，`setTimeout()`则在第三个空中传入参数：

```javascript
function greet(name) {
    console.log(`hello~ ${name}`)
}

setTimeout(greet,2000,"martin")
```

\> Logs 'Hello~ martin' to the console after 2 seconds



有时，我们想取消掉超时函数，那么就用`clearTimeout()`.

setTimeout()

- To clear a timeout, you can use the `clearTimeout()`method passing in the identifier returned by setTimeout as a parameter

```javascript
function greet(name) {
    console.log(`hello~ ${name}`)
}

const timeoutId = setTimeout(greet,2000,"martin")
clearTimeout(timeoutId)
```

在两秒持续时间之后，没有任何内容记录到控制台，函数永远不会执行



一个更实际的场景是在卸载组件时清除超时，以释放资源并防止代码在卸载组件上错误执行





## setInterval()

如果想定期重复运行相同的代码，可以使用间隔函数。

![image-20230709160243275](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709160243275.png)



```javascript
function greet() {
    console.log(`hello~`)
}

setInterval(greet,2000)
```

-> Logs "Hello~" every 2 seconds





另一点需要记住的是，时间间隔会永远运行任务 因此你应该在适当的时候清除间隔

![image-20230709160638455](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709160638455.png)





## 总结

![image-20230709160846131](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709160846131.png)

![image-20230709161231063](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709161231063.png)





# Callbacks



## 回调函数介绍

回调函数是作为参数传递给其他函数的函数，这样在某个特定事件发生或操作完成时，可以调用该函数进行处理或执行特定的逻辑。回调函数允许我们在异步操作中处理结果或执行后续操作。

下面是一个简单的例子来说明回调函数的概念：

```javascript
function doSomething(callback) {
  // 模拟异步操作
  setTimeout(function() {
    var result = '操作完成';
    callback(result); // 在操作完成后调用回调函数
  }, 2000);
}

function handleResult(result) {
  console.log('处理结果:', result);
}

doSomething(handleResult);
```

在上述代码中，`doSomething()`函数模拟了一个异步操作（例如从服务器获取数据）。它接受一个回调函数作为参数，并在操作完成后调用该回调函数。

`handleResult()`函数是我们定义的回调函数，它在`doSomething()`操作完成后被调用。它接收操作结果作为参数，并在控制台打印出结果。

当我们调用`doSomething(handleResult)`时，`doSomething()`函数开始执行异步操作，并在2秒后将结果传递给`handleResult()`作为回调函数的参数。这样，我们可以在回调函数中处理操作结果，而不需要等待异步操作完成。

回调函数的优势在于它们允许我们处理异步操作的结果，并在操作完成后执行特定的逻辑。这对于处理事件、处理服务器响应或执行其他需要等待操作完成的任务非常有用。回调函数的灵活性也使其成为JavaScript中常用的编程模式之一。





![image-20230709173653454](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709173653454.png)



## 为什么需要回调函数

回调函数可以分为两种：

- 同步回调
- 异步回调



### 同步回调

特点：立即执行

![image-20230709174554834](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709174554834.png)







### 异步回调

通常用于在异步操作完成后继续或恢复代码执行

![image-20230709174810135](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709174810135.png)



![image-20230709175030028](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709175030028.png)





## 问题

如果你有多个回调函数，其中每个级别都依赖于前一个级别获取的结果，函数的嵌套会变得非常深，代码变得难以阅读和维护。

![image-20230709175225696](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709175225696.png)





## 总结

- 回调函数是作为参数传递给其他函数的函数
- 如果它们立即执行，则它们可以是同步的；如果它们在一定时间后执行，某个事件发生或某些数据被获取，则它们可以是异步的
- 在获取某些数据后异步运行代码时，回调函数是常用的模式
- 随着需要基于先前获取的数据进行越来越多的请求，开发人员开始遇到所谓的回调地狱
- 回调地狱使得代码难以理解
- 现在的替代方案和推荐方法是使用 Promise

![image-20230709175640633](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709175640633.png)



# Promise





## 故事引入

- 在一个场景中，你和室友想在家里吃晚餐
- 你想准备你的特制汤
- 同时，你又想去附近的食品车买些玉米饼
- 你问室友：“嘿，你能下去食品车给我们买些玉米饼吗？”
- 当他要离开时，你告诉他：“等你回来我准备汤也没有意义，所以我现在就开始准备汤，但是当你到达那里时，你能保证发短信给我吗？这样我就可以开始摆餐桌了。如果出现了问题，比如你找不到食品车或者他们今晚没有玉米饼了，请告诉我，我会改为做面食。”
- 你的朋友说：“好的，我保证。我现在出去，过一会儿给你发短信。”
- 现在，你开始准备汤，但是关于玉米饼的状态呢？我们可以说它当前是未决的，直到你收到朋友的短信
- 当你收到一条短信说他正在买玉米饼时，你的吃玉米饼的愿望得到了满足。然后你可以开始摆餐桌
- 如果短信说他无法带回任何玉米饼，你的吃玉米饼的愿望被拒绝了，你现在需要做些面食来代替

![image-20230709180420160](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709180420160.png)



类比JavaScript：

![image-20230709180515807](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709180515807.png)





## 定义

Promise是一个代理值，不一定在创建Promise时已知。它允许你将处理程序与异步操作的最终成功值或失败原因关联起来。

![image-20230709180721427](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709180721427.png)





## what&why

![image-20230709181031719](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709181031719.png)

为什么要用`promise`而不是`callback`？

在 JavaScript 中，使用 Promise 而不是传统的回调函数有几个好处：

1. 代码可读性更强：使用 Promise 可以使代码更具可读性和可维护性。通过 Promise 的链式调用（使用 then() 和 catch() 方法），可以将异步操作的流程以更直观的方式表达出来，而不是嵌套多层回调函数，形成所谓的 "回调地狱"。

2. 错误处理更方便：Promise 提供了 catch() 方法来捕获和处理异步操作中的错误。在回调函数中，错误处理通常需要在每个回调函数内部进行处理，容易导致错误处理代码的冗余和混乱。而 Promise 可以通过链式调用的方式，将错误处理代码集中在单个地方，提高了错误处理的可读性和一致性。

3. 支持更多的操作和功能：Promise 提供了一系列有用的方法，例如 all()、race()、resolve() 和 reject()，可以更方便地处理多个异步操作。例如，Promise.all() 可以等待多个 Promise 对象全部完成，然后返回一个包含所有结果的新 Promise 对象。这样可以更灵活地控制和组合异步操作。

4. 更好的异常处理：Promise 具有内置的异常处理机制。当 Promise 内部发生错误时，它会自动将该错误向下传递到链中的下一个 catch() 块，直到找到一个 catch() 块来处理异常。这使得错误传播和处理更加可控和简单。

总而言之，Promise 提供了更好的异步编程解决方案，它的语法更简洁、可读性更强，错误处理更方便，并且具有更多的功能和操作。尤其在处理复杂的异步操作或需要处理多个异步操作的场景下，Promise 是一种更优雅和可靠的选择。



接下来关注：

1.How to create a Promise?
2.How to fulfill or reject the Promise?
3.How to execute callback functions based on whether the Promise is fulfilled or rejected?





## 如何创建一个Promise?

```javascript
const promise = new Promise()
```



## How to fulfill or reject the Promise?

![image-20230709181909357](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709181909357.png)



```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // Food truck found.
        // Change status from pending to 'fulfilled'
        resolve("Food truck found."); // 提供异步操作的结果
    }, 5000);
});

```

上述代码创建了一个 Promise 对象，其中包含一个异步操作，即在 5 秒后模拟找到了一辆食品卡车。让我们逐行解释代码的含义：

1. `const promise = new Promise((resolve, reject) => {`
   这行代码创建了一个新的 Promise 对象，并使用 Promise 构造函数来定义异步操作。构造函数接受一个函数作为参数，该函数有两个参数：resolve 和 reject，它们分别是用于操作成功和操作失败时的回调函数。

2. `setTimeout(() => {`
   这里使用 setTimeout() 函数来模拟异步操作。它会在 5 秒后执行回调函数。

3. `resolve("Food truck found.");`
   在异步操作完成后，使用 resolve() 方法将 Promise 对象的状态从 "pending"（待定）改变为 "fulfilled"（已实现），并传递一个结果值，即字符串 "Food truck found."。

4. `}, 5000);`
   setTimeout() 函数的第二个参数是延迟时间，以毫秒为单位。在这里设置为 5000 毫秒，即 5 秒。

通过创建这个 Promise 对象，我们可以通过调用 `promise.then()` 来处理异步操作的结果，或使用 `promise.catch()` 来处理操作失败的情况。

例如，我们可以这样使用 Promise 对象：

```javascript
promise.then((result) => {
  console.log(result); // 在这里处理操作成功的结果
}).catch((error) => {
  console.log(error); // 在这里处理操作失败的情况
});
```

在上述代码中，当异步操作成功时，通过 `then()` 方法中的回调函数来处理结果，并将结果打印到控制台上。如果异步操作失败，则通过 `catch()` 方法中的回调函数来处理错误情况。在本例中，由于我们在异步操作中使用了 `resolve()`，所以会触发 `then()` 中的回调函数，并输出 "Food truck found."。





## 如何执行回调函数



How to execute callback functions based on whether the Promise is fulfilled or rejected?

![image-20230709183058397](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709183058397.png)

在代码 `promise.then(onFulfillment)` 中，`onFulfillment` 是一个回调函数，用于处理 Promise 对象在操作成功（状态为 "fulfilled"）时的结果。

Promise 的 `then()` 方法可以接受一个或多个回调函数作为参数，这些回调函数分别用于处理操作成功时的结果。这些回调函数会在 Promise 对象状态变为 "fulfilled" 时被调用，并接收到异步操作的结果作为参数。

在这种情况下，`onFulfillment` 是一个函数，它定义了在 Promise 对象操作成功时要执行的逻辑。当 Promise 对象的状态变为 "fulfilled" 时，将调用 `onFulfillment` 函数，并在控制台上输出 "Set up the table to eat tacos"。

因此，通过将 `onFulfillment` 函数作为参数传递给 `then()` 方法，可以指定在操作成功时要执行的逻辑。这种方式使代码更清晰和可读，同时也可以将逻辑分离，提高代码的可维护性。



![image-20230709183730304](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230709183730304.png)

Promise会自动注入，传递给resolve的参数作为onfulfillment回调的参数。







## then()函数

![image-20230710175518489](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230710175518489.png)

鼓励的做法：
- 即使你的`onFulfillment`回调函数抛出异常，它也会被捕获，然后你可以优雅地处理该异常



不鼓励的做法：

- `onRejection`回调函数仅处理Promise的错误
- 如果你的回调函数本身抛出错误或异常，没有代码来处理它







`then()` 是 Promise 对象的方法之一，用于处理 Promise 对象的操作成功（状态为 "fulfilled"）的情况。它接受一个或多个回调函数作为参数，并按照顺序执行这些回调函数。

语法：
```javascript
promise.then(onFulfilled, onRejected);
```

参数：
- `onFulfilled`：在 Promise 对象操作成功时调用的回调函数。它接收操作成功的结果作为参数。
- `onRejected`（可选）：在 Promise 对象操作失败时调用的回调函数。它接收操作失败的原因作为参数。

返回值：
`then()` 方法返回一个新的 Promise 对象，可以通过链式调用的方式继续处理操作成功的结果或操作失败的情况。

`then()` 方法的工作流程如下：
1. 如果 Promise 对象的状态是 "fulfilled"（操作成功），则调用 `onFulfilled` 回调函数，并将操作成功的结果作为参数传递给该函数。
2. 如果 Promise 对象的状态是 "rejected"（操作失败），则调用 `onRejected` 回调函数（如果提供了该参数），并将操作失败的原因作为参数传递给该函数。
3. 如果 `onFulfilled` 或 `onRejected` 返回一个值（称为 x），则根据下述规则进行处理：
   - 如果 x 是一个 Promise 对象，则返回该 Promise 对象，并等待其状态变为 "fulfilled" 或 "rejected"。然后，将其最终结果传递给下一个 `then()` 方法的回调函数。
   - 如果 x 是一个普通值（非 Promise 对象），则将其作为操作成功的结果传递给下一个 `then()` 方法的回调函数。
   - 如果 `onFulfilled` 或 `onRejected` 抛出一个异常，则返回一个新的 Promise 对象，该对象的状态为 "rejected"，并将异常作为操作失败的原因传递给下一个 `then()` 方法的回调函数。

通过使用多个 `then()` 方法的链式调用，可以对操作成功的结果进行连续的处理，也可以在链的末尾通过 `catch()` 方法处理操作失败的情况。

以下是一个示例，展示了使用 `then()` 方法处理 Promise 对象的操作成功情况的基本用法：

```javascript
promise.then(onFulfilled)
       .then(onNextFulfilled)
       .then(onFinalFulfilled)
       .catch(onRejected);
```

在上述示例中，`onFulfilled`、`onNextFulfilled` 和 `onFinalFulfilled` 是用于处理操作成功的回调函数，而 `onRejected` 则用于处理操作失败的回调函数。每个 `then()` 方法都返回一个新的 Promise 对象，可以继续在链式调用中处理操作结果或错误。如果在链中的任何位置发生操作失败或抛出异常，将跳过后续的 `then()` 方法，并直接调用 `catch()` 方法来处理错误。





## 链式调用

![image-20230710180549919](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230710180549919.png)

`then()`和`catch()`返回的都是一个新的promise



使用链式调佣解决了回调地狱的问题，这样更易读和可维护了。

![image-20230710180836414](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230710180836414.png)





## 静态方法



### promise.all()

查询多个API并执行一些操作，但只有在所有API完成加载后才执行。

![image-20230710181452240](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230710181452240.png)

- Promise.all() 方法接受一个 promise 可迭代对象作为输入，并返回一个单独的 Promise，该 Promise 解析为输入 promises 的结果数组。
- 返回的 Promise 将在所有输入 promises 解析完成或者输入可迭代对象不包含 promises 时解析。
- 如果任何输入的 promise 被拒绝或非 promise 抛出错误，它将立即被拒绝，并带有第一个拒绝信息/错误。





### promise.allSettled()

Promise.allSettled() 等待所有输入的 promises 完成，无论其中是否有一个被拒绝。

![image-20230710182252489](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230710182252489.png)





### promise.race()

-Promise.race() 方法返回一个 promise，一旦其中一个输入 promise 被解决或拒绝，它就会立即解决或拒绝，并带有该 promise 的值或原因。

![image-20230710182552898](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230710182552898.png)





### 总结

下面是 Promise.all()、Promise.allSettled() 和 Promise.race() 的共同点和不同之处的表格形式描述：

| 功能/特点             | Promise.all()                                            | Promise.allSettled()                                         | Promise.race()                                              |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| 功能                  | 等待多个 Promise 对象全部成功后才返回结果                | 等待多个 Promise 对象全部完成（无论成功或失败）后返回结果    | 等待多个 Promise 对象中的任意一个完成后返回结果             |
| 结果                  | 返回一个 Promise 对象，结果是一个包含所有成功结果的数组  | 返回一个 Promise 对象，结果是一个包含所有 Promise 结果的数组 | 返回一个 Promise 对象，结果是第一个完成的 Promise 的结果    |
| 失败处理              | 如果任一 Promise 失败，立即返回一个被拒绝的 Promise 对象 | 忽略 Promise 的失败状态，将所有 Promise 结果都作为成功处理   | 忽略未完成的 Promise，将第一个完成的 Promise 的结果作为结果 |
| 并发执行              | 所有 Promise 对象并发执行                                | 所有 Promise 对象并发执行                                    | 所有 Promise 对象并发执行                                   |
| 迭代器/可迭代对象支持 | 接受一个迭代器或可迭代对象作为参数                       | 接受一个迭代器或可迭代对象作为参数                           | 接受一个迭代器或可迭代对象作为参数                          |

总结：
- Promise.all() 会等待多个 Promise 对象全部成功后返回一个成功状态的 Promise 对象，并将所有成功的结果以数组形式返回。
- Promise.allSettled() 会等待多个 Promise 对象全部完成后返回一个成功状态的 Promise 对象，并将所有 Promise 的结果（无论成功或失败）以数组形式返回。
- Promise.race() 会等待多个 Promise 对象中的任意一个完成后返回一个成功状态的 Promise 对象，并将第一个完成的 Promise 的结果作为结果。
- Promise.all() 和 Promise.allSettled() 都会等待所有 Promise 并发执行，而 Promise.race() 只要有一个 Promise 完成就会返回。
- Promise.all() 对于失败处理有不同的行为，一旦任一 Promise 失败，立即返回一个被拒绝的 Promise 对象。而 Promise.allSettled() 忽略 Promise 的失败状态，将所有 Promise 结果都作为成功处理。
- 这三个方法都接受一个迭代器或可迭代对象作为参数，用于指定要处理的 Promise 对象集合。

需要注意的是，以上方法都返回一个新的 Promise 对象，因此可以使用 `.then()` 和 `.catch()` 来处理它们的结果和错误。





# async await

- Promises 概述
  - 基本语法
  - 如何添加成功和失败回调
  - 如何使用 Promise 链解决回调地狱问题
  - 这有进一步改进的方式
  - 通过使用在 ES2017（ES8）中引入的 async/await 关键字
  - async/await 关键字允许我们编写完全同步化的代码，同时在后台执行异步任务





## async



![image-20230710231346646](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230710231346646.png)

- async关键字用于声明async函数。
- async函数是AsyncFunction构造函数的实例。
- 与普通函数不同，async函数始终返回Promise。



## await



`await` 是用于异步函数中的操作符，它可以在等待异步操作完成后继续执行代码。`await` 关键字只能在异步函数内部使用，它通常与 Promise 对象一起使用，以便等待 Promise 对象的状态变为已解决（resolved）或已拒绝（rejected）。

使用 `await` 可以让异步代码看起来更像同步代码，而不需要显式地使用回调函数或 Promise 的 `.then()` 和 `.catch()`。



![image-20230710231750780](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230710231750780.png)

- await关键字可以放在任何基于异步Promise的函数前面，以暂停代码，直到该Promise结算并返回其结果为止。
- await只能在异步函数内部使用，不能在普通函数中使用await。



当在 JavaScript 中使用 async/await 时，await 关键字用于等待 Promise 完成。在 async 函数内部，可以使用 await 关键字来暂停函数的执行，直到 Promise 完成。

使用 await 的好处是可以让异步代码看起来更像同步代码，从而提高代码的可读性和可维护性。通过使用 await，可以在 async 函数中等待异步操作完成后再继续执行下一步操作，而不需要使用回调函数或链式 Promise。



## 链式调用 vs async-await

![image-20230710232144570](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230710232144570.png)

async-await更具有可读性、并且可以用try-catch来处理异常。



## 启动顺序



### 顺序启动

![image-20230710232526224](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230710232526224.png)

```javascript
function resolveHello() {
    return new Promise(resolve => {
       setTimeout(function () {
           resolve('hello')
           },2000)
    })
}

function resolveWorld() {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve('World')
        },1000)
    })
}

async function sequentialStart(){
    const hello  = await resolveHello()
    console.log(hello)

    const world = await resolveWorld()
    console.log(world)
}

sequentialStart()
```





## 并发启动

![image-20230710233332497](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230710233332497.png)

```javascript
function resolveHello() {
    return new Promise(resolve => {
       setTimeout(function () {
           resolve('hello')
           },2000)
    })
}

function resolveWorld() {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve('World')
        },1000)
    })
}

async function concurrentStart(){
    const hello  =  resolveHello()
    const world = resolveWorld()

    console.log(await hello)
    console.log(await world)
}

concurrentStart()
```

在上述代码中，`concurrentStart` 函数是一个异步函数，使用了 `async` 关键字声明。在函数内部，通过 `await` 关键字等待 `resolveHello` 和 `resolveWorld` 函数返回的 Promise 完成。

由于 `concurrentStart` 函数使用了 `await`，它会暂停执行，直到 Promise 被解析。因此，当 `console.log(await hello)` 和 `console.log(await world)` 执行时，它们会等待对应的 Promise 完成并输出解析后的结果。

由于 `resolveHello` 和 `resolveWorld` 函数都返回一个 Promise 对象，并且在 `concurrentStart` 函数中并行执行，因此在控制台输出时，两个 Promise 的结果会同时出现。

需要注意的是，由于 `console.log` 是一个同步操作，因此在输出结果之前，代码会等待 Promise 完成。如果没有使用 `await`，代码将会立即执行下一个语句，而不会等待 Promise 完成。



在`concurrentStart()`函数中，我们使用了`await`关键字来等待`hello`和`world`的结果。这意味着程序会在这两个异步操作都完成之后，才会继续执行下一行代码，即`console.log()`语句。因为`console.log()`语句没有被嵌套在任何异步操作的回调函数中，所以它们会在两个异步操作都完成之后，同时被执行。



## 并行启动

![image-20230711140000746](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230711140000746.png)

```javascript
function resolveHello() {
    return new Promise(resolve => {
       setTimeout(function () {
           resolve('hello')
           },2000)
    })
}

function resolveWorld() {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve('World')
        },1000)
    })
}

 function parallelStart(){
    Promise.all([
        (async () => console.log(await resolveHello()))(),
        (async ()   => console.log(await resolveWorld()))(),
    ])
}

parallelStart()
```

在上述代码中，`()` 是用于立即调用函数表达式（Immediately Invoked Function Expression，IIFE）的语法。它的作用是立即执行定义的异步函数，并将其结果传递给 `Promise.all()`。



为什么要使用 `()` 呢？这是因为异步函数定义后需要立即执行，以便在 `Promise.all()` 调用时返回一个 Promise 对象。通过使用 `()` 将异步函数包裹起来并立即执行，可以确保异步函数被调用并返回 Promise 对象。

注意，在这里使用立即调用函数表达式 `(async () => console.log(await resolveHello()))()`，其实是为了在异步函数中使用 `await`，以便在 Promise 对象完成后打印结果。如果只是直接调用异步函数 `resolveHello()`，将无法使用 `await` 等待 Promise 对象的结果，因为外部函数没有被定义为异步函数。

因此，通过使用立即调用函数表达式 `(async () => console.log(await resolveHello()))()`，我们可以立即执行异步函数，并将其返回的 Promise 对象作为 `Promise.all()` 的参数，以确保在所有 Promise 对象都完成后返回一个新的 Promise 对象。





## 总结

- async 和 await 关键字使得基于 Promise 的异步行为可以以更清晰的方式编写，避免了需要显式配置 Promise 链的需求。
- async-await 在 ES2017 中引入。
- async 关键字 - 返回一个 Promise。
- await 关键字 - 暂停执行，直到 Promise 被解决或拒绝。
- 顺序 vs 并发 vs 并行。





# Event Loop

分为4讲：

![image-20230711141925955](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230711141925955.png)

- 关于异步编程的概述、不同部分和同步代码片段的简要介绍





![image-20230711185344962](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230711185344962.png)

事件循环只做一件事：

- 检查调用栈是否为空
  - 如果为空，则从队列中取出一个放入调用栈中



## 同步代码

同步代码时不需要事件循环的。

![image-20230712140027765](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230712140027765.png)





## 异步超时

![image-20230712140250908](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230712140250908.png)

`setTimeout()`不是JavaScript的功能，而是一个JavaScript可以调用的WebAPI



```javascript
console.log("First")

setTimeout(() =>{
    console.log("Second")
},2000)

console.log("Third")
```



根据上述代码，我们可以分析 Event Loop 的工作原理：

1. 首先，代码从上到下依次执行，遇到第一行 `console.log("First")`，它是一个同步任务，立即在控制台打印出 "First"。

2. 接下来遇到 `setTimeout()`，它是一个异步任务。`setTimeout()` 函数会在 2000 毫秒后触发一个定时器事件。

3. 然后，代码继续执行，遇到 `console.log("Third")`，它也是一个同步任务，立即在控制台打印出 "Third"。

4. 此时，主线程中的同步任务已经执行完毕，Event Loop 开始检查事件队列。

5. 由于之前设置的定时器时间为 2000 毫秒，此时定时器事件还未触发。

6. Event Loop 持续监测，直到定时器事件触发。

7. 当定时器事件触发后，它会产生一个事件，并将相关的回调函数放入事件队列。

8. Event Loop 检测到事件队列中有待处理的事件，将回调函数放入主线程执行。

9. 回调函数 `() => { console.log("Second") }` 在主线程中执行，立即在控制台打印出 "Second"。

10. 主线程执行完回调函数后，再次检查事件队列。

11. 由于事件队列中没有更多的事件，Event Loop 继续监测等待新的事件加入。

综上所述，Event Loop 的工作原理是通过不断地检查事件队列来调度和执行异步任务。在上述代码中，异步任务是通过 `setTimeout()` 创建的定时器事件。主线程在执行完当前的同步任务后，通过 Event Loop 从事件队列中取出定时器事件的回调函数，并在适当的时机执行。这使得定时器事件的回调函数在定时器时间到达后被调用，而不是阻塞主线程的执行。这种方式保证了 JavaScript 运行环境的响应性和异步操作的顺序。



如果超时时间设置为0呢？

```javascript
console.log("First")

setTimeout(() =>{
    console.log("Second")
},0)

console.log("Third")
```

结合上述代码，我们来分析 Event Loop 的工作原理，涉及 Web API 和回调队列的概念：

1. 首先，代码从上到下依次执行，遇到第一行 `console.log("First")`，它是一个同步任务，立即在控制台打印出 "First"。

2. 接下来遇到 `setTimeout()`，它是一个异步任务。`setTimeout()` 函数会在尽可能快的时间内将回调函数添加到 Web API 中的定时器队列，并设置一个计时器以便在特定时间后触发。

3. 然后，代码继续执行，遇到 `console.log("Third")`，也是一个同步任务，立即在控制台打印出 "Third"。

4. 此时，主线程中的同步任务已经执行完毕，Event Loop 开始检查事件队列。

5. Event Loop 持续监测，并在适当的时候检查 Web API 是否有任务已经完成。

6. 在这种情况下，尽管 `setTimeout()` 的计时器设置为 0 毫秒，但是由于 JavaScript 是单线程执行的，计时器回调函数实际上会被添加到 Web API 的定时器队列中，等待主线程中的同步任务完成。

7. 主线程执行完毕后，Event Loop 检查 Web API 的定时器队列，并将其中的任务添加到回调队列（Callback Queue）中。

8. 此时，回调队列中有待处理的任务，Event Loop 将回调函数放入主线程执行。

9. 回调函数 `() => { console.log("Second") }` 在主线程中执行，立即在控制台打印出 "Second"。

10. 主线程执行完回调函数后，再次检查事件队列。

11. 由于事件队列中没有更多的事件，Event Loop 继续监测等待新的事件加入。

在上述过程中，涉及到了 Web API 和回调队列的概念。具体来说：

- `setTimeout()` 函数会将回调函数添加到 Web API 中的定时器队列，而不是立即执行回调函数。
- 当定时器到期后，Web API 将回调函数放入回调队列中，等待 Event Loop 的处理。
- Event Loop 在适当的时机检查回调队列，并将其中的回调函数放入主线程执行。

这种机制使得异步任务能够以非阻塞的方式执行，从而保持 JavaScript 运行环境的响应性。即使设置的计时器时间为 0 毫秒，由于 JavaScript 的单线程特性，计时器回调函数也需要等待主线程中的任务完成后才能执行。



**注意：设置超时的持续时间参数是最小延迟，而不是保证的必须延迟。也就是说，实际时间是大于我们设置的时间的。**







## 异步promise



![image-20230712143645448](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230712143645448.png)

```javascript
console.log("First")

const promise = fetch("www.udemy.com/vishwas")

promise.then(value => {
    console.log("Promise value is ", value)
})

console.log("Third")
```

![image-20230712144937178](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230712144937178.png)

当使用 `promise.then()` 注册一个回调函数时，它会创建一个微任务，而不是普通的回调函数。微任务会在主线程任务执行完毕后立即执行，优先于下一个事件循环的开始。



## 超时+promise 运行分析

![image-20230712145523499](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230712145523499.png)



fetch成功后，将promise.then()中的回调函数和value放入微任务队列中：

![image-20230712145650738](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230712145650738.png)

现在，微任务队列和回调队列都有一个任务要放入回调栈中。但是JavaScript先执行第14行代码。

![image-20230712145959388](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230712145959388.png)

JavaScript中，微任务队列优先级大于回调队列/任务队列。

![image-20230712150209474](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230712150209474.png)



最后才执行任务队列中的`setTimeout()`

![image-20230712150244488](https://codermartinn.oss-cn-guangzhou.aliyuncs.com/img/image-20230712150244488.png)



## 总结

event loop主要由两个任务：

如果调用栈为空

- 检查微任务队列是否为空
  - 微任务队列不为空，则将一项item放入调用栈
  - 微任务队列如果为空，则检查任务队列是否为空
    - 任务队列不为空，则将一项item放入调用栈
    - 任务队列为空，则结束



chatGPT优化：

Event Loop 主要由两个任务组成：

1. 如果调用栈为空：
   - 检查微任务队列是否为空。
     - 如果微任务队列不为空，则将下一个微任务（microtask）放入调用栈（call stack）执行。
     - 如果微任务队列为空，则检查任务队列（task queue）是否为空。
       - 如果任务队列不为空，则将下一个任务（task）放入调用栈执行。
       - 如果任务队列也为空，则事件循环结束。

2. 如果调用栈不为空：
   - 继续执行调用栈中的当前任务，直到调用栈为空。

注意事项：
- 微任务队列中的任务（microtask）具有高优先级，它们会在下一个事件循环开始前被执行，而不会等待其他任务。
- 任务队列中的任务（task）包括 DOM 事件、定时器事件、网络请求等。
- 在每个事件循环中，先处理微任务队列中的所有任务，然后再处理任务队列中的任务。
- 每次处理微任务队列或任务队列中的一个任务时，会完整地执行该任务，包括所有的同步代码和可能的异步操作。
- 事件循环是 JavaScript 运行环境中处理异步任务和事件的机制，它确保代码以非阻塞的方式执行，并保持运行环境的响应性。

请注意，这只是对 Event Loop 的简化描述，并不考虑具体实现的细节和优化。不同的 JavaScript 运行环境可能会有不同的实现方式，但总体原理是相似的。



