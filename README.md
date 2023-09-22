# Frontend. Лекция 3
### Функция
*Функция* - ссылка на блок операторов (Определение из ассемблера). 
*Функция* - отображение или преобразование элементов одного множества в другое (Из математики)

**Чистая функция** - функция которая не производит побочных эффектов
Такая функция:
-Вычислять результат ==только== на основе аргументов
-Возвращает ==гарантированное детерминированный== результат
**Плюсы:**
-Легче читать код
-Легче тестировать
-Надежнее потому что не зависят от «погоды», состояния окружения и т.д.
-Можно запускать асинхронно, можно кешировать результаты и т.д. и т.п.

*Асинхронно* - потому что нет внешних факторов влияющих на нее
*Кешировать* - Если один раз вызвали с этими аргументами, то можем брать результат, а не исполнять ее заново

**Побочные эффекты**: печать, сетевой запрос, изменение состояния. 
==Math.random==

**Вывод** - без фанатизма.

*Ссылочно-прозрачная функция* - Приближенная к чистой функции, может что-то изменять снаружи, но работает все равно со своими аргументами

### Функция в JS
*function* - тоже объект, у нее есть методы, например:
-function.*name* - имя функции
-function.*length* - количество аргументов
-function.*toString* - вывод кода функции

**Rest оператор** - *(…args)* - Три точки это rest оператор.
*Rest оператор* - Все переданные аргументы группирует в массив.
*Rest оператор* - Может быть только последним аргументов

Пример:
```
function max(...args) {
	return args.reduce((currMax, currentValue) => {
		return currValue > currMax ? currentValue : currMax;
	}, args[0]);
}

// Либо в JS есть Math.max(...args);

console.log('max=', max(3,1,2,4,51,2,3));
```

Но в *math.max* - *spret оператор* - он раскладывает значения по аргументам. Обратный *Rest оператору*

*Функцию* можно сделать, через ==конструктор==:
```
const sum = new Function('a, b', 'return a+b');
// Эквивалент eval()
```

*Object method decloration:*
```
const obj1:
	fn1: function inc(a) {

	}
	inc(a) {
		return ++a;
	}
```

Если в методе объекта можно вызвать *this*, то скорее всего по *this* можно обратиться к объекту и его полям.

**Функциональный конструктор**:
```
const Person = function () {...};

const person = new Person();

console.log(person instanceof Person);
```
*person* - является объектом
*Instanceof* - позволяет проверить ==порожден== ли *person* функциональным конструктором от *Person*

**В современном JS лучше сделать через класс!!!**

Стрелочная функция - не просто укороченный синтаксис. Стрелочная функция по-другому работает, у нее нет объектного контекста. 
```
const Person = function {
	this.name = "Sergey"
	
	const a = "!";

	this.city {
		name: "Moscow",
		f1: function () {
			return this.name;
		},
		f2: () => {
			retunr this.name + a;
		}
	}
}

const f3 = person.city.f1;
person.f3 = f3;

const f4 = person.city.f2;
person.f4 = f4;

console.log("f3() =", person.f3)
console.log("f4() =", person.f4)
```
*f1* - Вернет Moscow
*f2* - Вернет Sergey!
*f3* - Вернет Sergey
*f4* - Вернет Sergey!

**В прототипе функции есть call и apply.**
*Call* - Вызывает функцию
*function.call(null, 2, 3)*, *null* - принудительно присваивает контекст
*function.apply(null, arr)* - тоже самое но принимает arr аргументов

**Объект первого класса** - в JS можно создать функцию, которая создает другую функции. Создать функцию высшего порядка.

### Замыкание
**Лексическое окружение** - все переменные внутри функции - это свойства специального объекта ==LexicalEnvironment==, который создается при ее запуске
```
var otherName = 'Ivan';

function sayHello(name) {
	let magicNumber = 42;
}

// LexicalEnvironment = {name, magicNumber: 42}
// Other: sayHello.[[scope]] = window
```

**В стандартах - правда**
*LexicalEnvironment* - собирается при каждом вызове(исполнении) функции.
Там где {…} - там новый *LE*
*VAR* - определяется на уровень переменных
*Declarative Environment Record* - Внешнее окружение. Биндится к функции во время ее определения.

**Замыкание:**
```
function sum(operand1) {
	return function(operand2) {
		console.log(operand1 + operand2)
	}
}

// const sum = a => b => a + b - Запись на эльфийском

let plus3 = sum(3);
plus3(6); // 3 + operand2 = 9
```

### Мультипарадигменный JS
**Функциональный JS**:
Фабрика функций:
```
const createLog = function (base) {
	return function (n) {
		return log(base, n);
	}
}

// const createLog = base => n => => log(base, n); - На эльфийском

{
	const lg = createLog(10);
	const ln = createLog(Math.E);

	console.log('lg(5) = ', lg(5));
	console.log('ln(5) = ', ln(5));
}
```

**Функции с замыканием - все равно чистые**
Частичное применение через *bind*:
```
const log = function (base, n) {...};

{
	const lg = log.bind(null, 10);
	const ln = log.bind(null, Math.E);

	const lg = createLog(10);
	const ln = createLog(Math.E);

	console.log('lg(5) = ', lg(5));
	console.log('ln(5) = ', ln(5));
}
```

**ООП в JS**:
Инкапсуляция:
```
const counter {
	let privateValue = 0;

	return {
		inc: () => ++privateValue;
		dec: () => --priveteValue;
		getValue: () => privateValue;
	}	
}();

// privateValue - Приватная переменная
```

**Что еще?** - Реактивное, событийно-ориентированное, агента-ориентированное программирование и т.д.

### Модули
*Модуль* - Функционально законченный фрагмент программы, оформленный в виде отдельного файла с исходным кодом... Предназначенные для использования в других программах.

**Модули - настоящее**:
*IIFE* - Замыкание
*AMD* - Require.js
*CommonJS* - синхронный запрос модуля (Node.js)
*UMD* - и туда и сюда
*ECMA* - Современный вариант

**IIFE**
```
let importedModule = window.importedModule;

class AwesomeClass {

}

window.exportedModule = window.Что-то там
```

**UMD**
```
module.exports = factory(require("b"))
```

**ES6 module**
```
// main.js
import AwesomeClass from './package.js'
let awesome = new AwesomeClass();

// package.js
class AwesomeClass {
	// ...
}

export default AwesomeClass;
```

### Модульный подход к разработке
**Компоненты** - некоторые кусочки из которых состоит страница

**Деструктуризация**:
```
const a = {b:1, c:2};
const {b} = a; // const b = a.b
```

### Шаблонизация
-*Handlebars*
-*Pug*
-*nunjucks*

**Импорт** в css:
```
@import "my.css"
```