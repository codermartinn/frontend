//1.隐式绑定
// const person = {
//     name: "tom",
//     sayMyName: function () {
//         console.log(`hello, my name is ${this.name}`);
//     }
// }

// person.sayMyName();

//2.显式绑定
// const person = {
//     name: "jack"
// }

// function sayMyName() {
//     console.log(`hello, my name is ${this.name}`);
// }

// sayMyName.call(person)

//3.new 绑定
function Person(name) {
    this.name = name
}

const p1 = new Person("xiaoming")
const p2 = new Person("xiaohong")

console.log(p1.name, p2.name);