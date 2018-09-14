// function constructor pattern
// *este es el patron mas utilizado
// este es un patron de diseño llamado Function Constructor
// recordar que la primera letra va en mayuscula en este patron
/*
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

// herencia
// La herencia se logra a traves de la propiedad de los objetos llamada __proto__
// Para hacer referencia a esa propiedad se utiliza Objeto.prototype
Person.prototype.calculateAge = function() {
    console.log(2018 - this.yearOfBirth);
}
// hasta puedo modificar las funciones del prototype del objeto padre.
Person.prototype.toString = function() {
    console.log('Modifique el valor de la funcion toString');
}

Person.prototype.lastName = 'Smith';

// forma de crear objetos con este patron
var ismael = new Person('Ismael', 1995, 'Programador');
var jane = new Person('Jane', 1969, 'Designer');
var mark = new Person('Mark', 1948, 'retired');

ismael.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(ismael.lastName);
console.log(mark.lastName);
console.log(jane.lastName);

console.log(ismael);


// en consola
var x = [2, 4, 6];
// observar como no muestra la informacion del array
console.log(x);
// pero con esto podemos obtener informacion del objeto en si
console.info(x);

// Forma en que funciona este patron:
// Cuando se ejecuta la siguiente linea de codigo:
//     var ismael = new Person;
// un nuevo objeto VACIO es creado por la palabra reservada new.
// Luego, se llama a la funcion del constructor (que en este caso es Person)
// con los argumentos que especificamos. Como recordaremos, la llamada a una funcion
// crea un nuevo contexto de ejecucion el cual posee la variable THIS.
// La palabra reservada THIS hara referencia al objeto vacio que NEW habia creado antes. 
// Despues de esto, el setteo de los atributos del constructor (this.job, this.name, ...)
// se realiza sobre el objeto vacio. Finalmente, ese objeto que era vacio es el objeto creado. 




// Object.create
/*
var personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);
john.name = 'john';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, 
    {
        name: { value: 'Jane'},
        yearOfBirth: { value: 1969 },
        job: { value: 'designer' }  
    }
);
*/

// lo positivo del object.create es que permite 
// trabajar la herencia con prototype de una forma 
// mas sencilla que con el patron function constructor
// pero la forma mas comun en que se trabaja este tipo de
// casos es con el patro function constructor.



// Primitivas vs Objetos

//La gran diferencia que existe entre las primitivas y los objetos
// es que las variables que contienen datos primitivos realmente contienen
// esa data detnro de la variable en si, con los objetos no pasa lo mismo, las 
// variables asociadas a objetos no contienen la informacion del objeto dentro de 
// si sino que contienen una referencia a la direccion en memoria que usa el objeto.
// veamos esto en practica: 

// Primitivas
var a = 23;
var b = a; 
a = 48;
console.log(a); // 48
console.log(b); // 23

// Objetos
var obj1 = {
    name: 'Ismael',
    age: 23
}
// aqui no creamos un nuevo objeto, simplemente le pasamos la referencia de obj1 a obj2
var obj2 = obj1;
obj1.age = 46;
console.log(obj1.age); // 46
console.log(obj2.age); // 46
// es por la referencia a la direccion en memoria que los dos objetos poseen el mismo valor

// Funciones
var age = 23;
var obj = {
    name: 'salo',
    city: 'caracas'
}

function change(var1, var2) {
    var1 = 30;
    var2.city = 'lisboa';
}
change(age, obj);

console.log(age); // 23
console.log(obj.city); // lisboa

// Esto nos muestra que cuando pasamos variables primitivas a funciones una simple copia se crea, 
// por lo que podemos cambiar el valor de var1 como queramos y esto nunca afectara a la variable age (porque es primitiva). 
// Por otro lado, cuando pasamos objetos como parametros en una funcion realmente no pasamos el objeto como parametro, en realidad
// pasamos la referencia en memoria del objeto en el parametro de la funcion, debido a esto, los cambios en el objeto si afectaran 
// al objeto en si, pues estamos tratando con la referencia en memoria del objeto. 



// funciones de primera clase
// Las funciones en JS pueden retornar otras funciones o llamar a otras funciones dentro de si. Ejemplo de funcion que retorna funcion.
function calculadora(operacion) {
    if (operacion === '+') {
        return function(a, b) {
            return a + b;
        }
    } else if (operacion === '-') {
        return function(a, b) {
            return a - b;
        }
    } else {
        return console.log('operacion no implementada');
    }
}

var suma = calculadora('+');
console.log(suma(5, 5));

var resta = calculadora('-');
console.log(resta(5, 5));


// Patron IIFE (iffy) funciones autoejecutables
// Sirven para mantener la privacidad de los datos y para que
// la funcion se ejecute una sola vez.
// funcionamiento: 
(function() {
    // aqui va la funcion IIFE
    var iife = 123;
    console.log('Soy una funcion iife');
})();
// console.log(iife); da error, la variable no es accesible.



// Metodos bind, call y apply (para funciones)
var nahir = {
    name: 'nahir',
    age: 21,
    job: 'estudiante',
    presentation: function(style, time) {
        if (style === 'formal') {
            console.log('Good '+ time + ' ladies and gentleman! I\'m ' + this.name + ', Im a ' + this.job + ' and Im ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey, what\'s up? I\'m ' + this.name + ', Im a ' + this.job + ' and Im ' + this.age + ' years old.');
        }
    }
};

var jose = {
    name: 'jose',
    age: 20,
    job: 'designer'
};

nahir.presentation('formal', 'morning');

// call
// la funcion CALL llama al metodo de un objeto sustituyendo el objeto de ese metodo por otro objeto (el primer parametro, en este caso, jose).
nahir.presentation.call(jose, 'friendly', 'afternoon');
// de esta forma usamos el metodo de nahir en jose

// apply
// hace lo mismo que call pero en vez de recibir argumentos recibe un array de argumentos
// debemos tener en cuenta que como pasamos un array la funcion que maneje esto debe recibir un array como parametro.
nahir.presentation.apply(jose, ['friendly', 'afternoon']);

// bind
// es similar al metodo call, la diferencia es que bind no llama inmediatamente a la funcion sino que CREA UNA COPIA DE ESTA para que podamos guardarla en alguna parte con argumentos predefinidos
// crea una copia de la funcion con argumentos predefinidos.
joseFriendly = nahir.presentation.bind(jose, 'friendly');

joseFriendly('morning');
joseFriendly('nigh');


// un ejemplo real: 
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < years.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(el, limit) {
    return el <= limit;
}

var ages = arrayCalc(years, calculateAge);

// el problema que tenemos es que queremos usar isFullAge pero la funcion fn en arrayCalc solo recibe un parametro, esto lo solucionamos con bind
var fullUS = arrayCalc(ages, isFullAge.bind(this, '21'));
console.log(ages);
console.log(fullUS);