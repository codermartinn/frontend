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
