function* generatorFunction() {
    yield 'Hello'
    yield 'World'
}

const generatorObj = generatorFunction()

for (word of generatorObj) {
    console.log(word);
}