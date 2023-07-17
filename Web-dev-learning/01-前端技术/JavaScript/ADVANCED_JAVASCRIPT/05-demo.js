function Person(fName, lName) {
    this.firstName = fName
    this.lastName = lName
}

Person.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
};

const person1 = new Person("li", "si");
const person2 = new Person("zhao", "wu");

console.log(person1.getFullName()); // 输出: "li si"
console.log(person2.getFullName()); // 输出: "zhao wu"