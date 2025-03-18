+++
title = 'Dart 3.6 cheat sheet'
summary = "Studying dart language"
date = 2025-02-25
# lastmod = 2025-03-11
tags = ["dart", "programming", "language", "study", "cheatsheet"]
# coverImg = 
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = true
showToC = true
showComments = true
+++



## Style

---



### Naming

- Variable: `myVar` camelCase.
- Function: `myFunc` camelCase. 
- Constant: `myConst` camelCase. 
- Class: `MyClass` PascalCase. 
- Enum: `MyEnum` PascalCase. 
- Typedef: `MyTypedef` PascalCase. 
- Extension: `MyExtension` PascalCase.
- File name: `my_file.dart` snake_case.dart. 
- Import plugin as: `import my_file.dart as ` `my_import_name` snake_case.

`_`: Unused callback parameter. 

Boolean variable name
- Use verb. 
    > `isEmpty`, `canClose`
- Omitting verb when named parameter.
    > `foo({required bool empty});`
- Use positive name.
    > `isConnected`




### No lines longer than 80 letters. 




### Import Order
1. `import "dart: ";`
2. `import "package: ";`
3. `import "my_dart.dart";`

- Alphabetically. 




### Comments
In terminal, run `dart doc` or `dart format`. 

Read like a sentence. 

Use `///` for documents. 
- Starts with 1 sentence short summary. 
- And write long lines after 1 blank line. 
- Consider: Include code sample in doc. 
- Use `[]` for identifier. 
- Can use markdown. Use ```(3 backtick) for codes.

> `/// Short summary`
>
> `///`
>
> `/// Long description`
>
> `/// Long description`
>
> `/// Long description`
>
> `class myClass{`




### Null

Do not initialize [`null`]. 


{{< callout icon="bulb" iconColor="#78AAA0" cardColor="#E2F5ECB3" >}}
Do

`var? foo;`

`if(foo)`

`if(nullableBool ?? false)`
{{< /callout >}}


{{< callout icon="x-mark" iconColor="#B46464" cardColor="#FFE0E0B3" >}}
Don't

`var? foo = null;`

`if(foo == true)`

`if(nullableBool)`
{{< /callout >}}





### Collection

Use `.isEmpty`, not `.length == 0`;

Do not use `.forEach(Callback)`. 

- Except [Callback] is keyword. 
    > `.forEach(print)`




### Class

Use `final` for inner variable. 

Use `=>` for simple code. 

Use `var` when type is long. 

`This`

- Use when variable has same name, or redirecting named constructor. 
- Else do not use `this`. 




### Tear off


{{< callout icon="bulb" iconColor="#78AAA0" cardColor="#E2F5ECB3" >}}
Do

`.map(print)`

`.map(MyClass.new)` // Unnamed constructor. 

`.map(MyClass.myConstructor)` // Named constructor. 
{{< /callout >}}


{{< callout icon="x-mark" iconColor="#B46464" cardColor="#FFE0E0B3" >}}
Don't

`.map((x) => print(x))`

`.map((x) => MyClass(x))`

`.map((x) => MyClass.myConstructor(x))`
{{< /callout >}}




### Async

Use `async` when

- using `await`, 
- return error `async` - `throw`, 
  - `Future<void> asyncError() async => throw 'Error!';`
- return `Future` value. 
  - `Future<String> asyncValue() async => 'value';`




---

## Type

---

- `num`
  - = `int` + `double`. Any number. 
- `int`
- `double`
  - `double` -> `int`
    - `MyDouble.toInt()`
- `String`
  - `String` -> `int`
    - `int.parse(MyString)`
    - `double.parse(MyString)`
  - `int`, `double` -> `String`
    - `MyInt.toString()`
- `bool`
  - `true`, `false`
- `List`
- `Set`
- `Map`
- `null`



### String Methods

`.contain(X)` `.startsWith(X)` `.endsWith(X)` `.indexOf(X)`

`.toUpperCase()` `.toLowerCase()`

`.isEmpty` `.isNotEmpty`

`.substring(StartIndex, EndIndex)` `.split(X)` `.trim()`

`.replaceAll(Which, ToWhat)`




---
## Operator
---


`~/` : Integer division
> 10 ~/ 3 = 3

`++` `--` `==`

`is`
> `X is T`

- Check `X` is `T` type. Return `bool`. 
- Use `X is T`, not `a.runtimeType == T`
- `is!`

`as`
> `X as T`

- If `X` is not `T`, return Error. 


`&&` `||` `!`

`Condition ? Expr1 : Expr2`

`??=`
> `a = a ?? b`
>
> `if(a == null) { a = b } else { a = a }`
  
`..` : Cascade

```dart {linenos=true}
var paint = Pain()
  ..color = Colors.black // paint.color = Colors.black;
  ..strokeCap = StrokeCap.round; // paint.strokeCap = StrokeCap.round;
```

`...` : Spread
> `var newList = [0, 1, ...myList];`

`?` : Can be `null`
> `int? x;`  // `x` can be `null`
> 
> `foo?.bar`  // `foo` can be `null`

`!` : Can not be `null`
> `int! x;`  // `x` can not be `null`
> 
> `foo!.bar`  // `foo` can not be `null`




---
## Declaration
---




### Import

```dart {linenos=true}
import "dart:async";
import "dart:io";

import "package:web/web.dart";

import "/dart/my_dart.dart" as my_dart;

import "my_dart.dart" show foo; // Import foo only.
import "my_dart.dart" hide foo; // Import except foo.
import "my_dart.dart" deferred; // Lazy loading.
```




### Types

```dart {linenos=true}
var hi = "hello"; // Can't change type.
dynamic ww = "world"; // Can change type.
Object ww2 = "world2"; // Can change type.

final String smile = ":)"; // Can only be assign a value Once.
const double pi = 3.15; // Can't change data.
```

```dart {linenos=true}
String name = "Dart";
int createDate = 20250118;
double version = 1.0;
bool wip = false;
```

```dart {linenos=true}
num updateDate = 2025_02_25;  // 20250225
int longNum = 1_000_000_000_000;  // 1000000000000

String longStr = """
Wrap 3 quotes.
""";
String longStr2 = "hello"
    "world"; // helloworld
RegExp myRegExp = RegExp(r"Dart");
```

```dart {linenos=true}
String? iAmNull;
String? nullOk = null;
String ifNull = nullOk ?? "I'm not null";
// If [nullOk] is [null] then [ifNull] = "I'm not null".
```




### List

```dart {linenos=true}
List<int> myList = [1, 2, 3, ]; // myList[2] == 1
```




### List Methods

Edit original
- `.add(X)`
- `.addAll(Iterable)`
- `.insert(Index, X)`
- `.clear()`
- `.sort(Callback)`

Return int
- `.length`

Return bool
- `.remove(X)` // If `X` not exists in list, return `false`. 
- `.isEmpty`
- `.contain(X)`

Return Iterable (Need `.toList()`)
- `.reversed`
- `.where(Callback)` // Filter. 
- `.whereType<T>()` // Type filter. 
- `.map(Callback)` // Modify every values. 

Return 1 value
- `.removeAt(Index)` // pop at `Index`
- `.first` // MyList[0]
- `.last`
- `.reduce(Callback)`
  - Initial value = MyList[0]. 
  - If list is empty, return Error. 
  - Return type == original list type. 
  > `myList.reduce((val, elem) => val + elem);`
- `.fold(InitialValue, Callback)`
  - If list it empty, return `InitialValue`. 
  > `myList.fold(0, (val, elem) => val + elem);`

If method's postfix is [At], then parameter is index.

If method's postfix is [Where], then parameter is function.




### Map

```dart {linenos=true}
Map<int, String> myMap = {
  1: "one",
  2: "two",
  3: "three",
}; // myMap[1] == "one"
```




### Map Methods

Edit Original
- `.addAll(Map)`
- `.clear()`
- `.update(Key, Callback, {isAbsent: Callback})`

Return int
- `.length`

Return bool
- `.isEmpty`
- `.containsKey(Key)`
- `.containsValue(Value)`

Return nothing(void)
- `.forEach(Callback)`

Return Iterable
- `.keys`
- `.values`

Return 1 value
- `.remove(Key)` // pop `Key`
    - If MyMap[`Key`] is empty, return `null`. 

Make new Map
- `.map((Key, Value) => MapEntry(NewKey, NewValue));`




### Set

```dart {linenos=true}
Set<String> mySet = {
  "one",
  "two",
  "three",
};
```




### Set Methods

Edit original
- `.add(X)`
  - Edit original and
  - If `X` already exists, return `false`. 
- `.addAll(Iterable)`
- `.clear()`

Return int
- `.length`

Return bool
- `.add(X)`
  - Edit original and
  - If `X` in set, return `false`. 
- `.isEmpty`
- `.remove(X)`
  - If `X` not in MySet, return `false`. 
- `.contains(X)`

Return nothing(void)
- `.forEach(Callback)`

Return new Set
- `.union(Set)`
- `.intersection(Set)`
- `.difference(Set)`




### Enum

```dart {linenos=true}
enum PlanetType { terrestrial, gas, ice }

enum Planet {
  mercury(planetType: PlanetType.terrestrial, moons: 0, hasRings: false),
  venus(planetType: PlanetType.terrestrial, moons: 0, hasRings: false),
  earth(planetType: PlanetType.terrestrial, moons: 1, hasRings: false);

  const Planet(
      {required this.planetType,
      required this.moons,
      required this.hasRings}); // Every [enum] constructor is [const].

  final PlanetType planetType; // Every [enum] variable is [final].
  final int moons;
  final bool hasRings;

  bool get isGiant =>
      planetType == PlanetType.ice || planetType == PlanetType.gas;
}

void aboutEnum() {
  final yourPlanet = Planet.earth;

  if (!yourPlanet.isGiant) {
    print('Your planet is not a "giant planet".');
  }
}
```




---
## Basic
---




### Main

```dart {linenos=true}
void main() {
  print("hello world!");
  print("$hi ${ww + "!"}"); // hello world!

  print(myList[0]); // 1
  print(myMap[1]); // one
}
```

```dart {linenos=true}
if (true) {
} else if (false) {
} else {}
```

```dart {linenos=true}
switch (createDate) {
  case 1:
  case 2:
  default:
}
// Do not need [break;] in every case.

String mySwitch = switch (name) {
  "Dart" => "YEAH!",
  "dart" => "yeah",
  _ => "???", // Underscore is default.
};

bool mySwitch2 = switch (name) {
  "Dart" || "dart" => true,
  _ => false,
};

switch (myList) {
  case [int a, int b]:
    print("[myList] has 2 int: $a,? $b");
  case [1, _, _] when myList.last == 3: 
    // Pattern matching, Guard clause.
    print("[myList] starts with 1, ends with 3");
  default:
}
```

```dart {linenos=true}
for (int i = 0; i < 3; i++) {}

for (int num in myList) {}

while (false) {}

do {} while (false);
// [break;], [continue;]
```

```dart {linenos=true}
try {
  throw Exception("Throw exception");
  // throw "Throw arbitrary object";
  // Choose one of the two lines above.
} on FormatException {
} on IOException catch (e) {
} catch (e) {
  // Avoid using without [on].
  if (false) rethrow;
} finally {
  // [finally] always run regardless of [try]-[catch].
  print("Do something after try-catch");
}

assert(true, "message");
// If [false], return [AssertionError] with ["message"].
```




### Function

```dart {linenos=true}
void myFunc1(int a, int b) {}
void myFunc2({required int a, required int b}) {} // Parameters have name.
void myFunc3(int a, [int b = 1]) {} // Default value.
void myFunc4(int a, {required int b, int c = 1}) {} // Name, default.
void myFunc5(int a, [int b = 1, int? c]) {} // [c] is optional.

/// Arrow function
///
/// Just 1 line
/// Do not need [return].
var myFunc7 = () => print("Arrow Func");
void myFunc8() => print("Shorthand syntax");
```




### Typedef

```dart {linenos=true}
typedef FuncTypedef = int Function(int a, int b);
typedef ListTypedef = List<int>;

FuncTypedef typedef1 = (int a, int b) {
  return a + b;
};
ListTypedef typedef2 = [1, 2, 3, ];
```




---
## Class
---



### Class 

```dart {linenos=true}
class MyClass {
  final String name; // Use final for inner value.

  // Constructor
  MyClass(this.name);
  // MyClass(String name) {this.name = name;}
  // MyClass(String name) : this.name = name;

  // Named constructor
  MyClass.noName() : name = "empty";
  MyClass.noName2() : this("empty");
  MyClass.nameWithAge(String name, int age) : name = "$name $age";
  MyClass.nameAndDoSomething() : name = "This is initialize" {
    print("Do something after initializing.");
  }

  void printName() {
    print("MyClass name is ${name}");
  }
}
```

```dart {linenos=true}
var myInstance = MyClass("hello");
myInstance.printName();  // MyClass name is hello
var myInstance2 = MyClass.noName();
myInstance2.printName();  // MyClass name is empty
```




### Private

Private class/variable/method name starts with `_`. 

```dart {linenos=true}
class _PrivateClass {
  final String _name;

  _PrivateClass(this._name);

  void _printName() {
    print("My PrivateClass name is ${_name}");
  }
}
```




### Getter

```dart {linenos=true}
class MyGetter {
  final double height;
  final double width;

  MyGetter(this.height, this.width);

  double get area => height * width;
}
```

```dart {linenos=true}
var tmp = MyGetter(10, 30);
print(tmp.area);  // 300
```




### Static

```dart {linenos=true}
class MyStatic {
  static int count = 0;

  MyStatic() {}
}
```

```dart {linenos=true}
print(MyStatic.count);  // 0
```




### Inheritance

Can inheritance once. 

Parents is `super`.

```dart {linenos=true}
class ChildClass extends MyClass {
  final int childInt;

  ChildClass(super.name, this.childInt);

  @override
  void printName() {
    print("This is child class.");
    super.printName();
  }
}
```




---
## Class Modifier
---

instance: Can make instance. 

`extends`: Inheritance. Only single `extends`. 

`implements`: Multiple `implements` allowed. 

`with`: Copy parent code and paste into child. Multiple `with` allowed. 


|---| instance | extends | implements | with |
|:--|:-:|:-:|:-:|:-:|
| class | O | O | O ||
| mixin | X | X | O | O |
||||||
| abstract class | X | O | O ||
| base class | O | O | X ||
| final class | O | X | X ||
| interface class | O | X | O ||
| sealed class | X | O | O ||  // In this file. 
| sealed class | X | X | X ||  // Outside of this file. 
||||||
| abstract base class | X | O | X ||
| abstract interface class | X | X | O ||
| abstract final class | X | X | X ||
||||||
| mixin class | O | O | O | O |
| base mixin class | O | O | X | O |
| abstract mixin class | X | O | O | O |
| abstract base mixin class | X | O | X | O |
| base mixin | X | X | X | O |




### Mixin

Mixin can inheritance many times.

Mixin do not need `super` to call parent methods.

```dart {linenos=true}
mixin MyMixin {
  void mixinMethod() {
    print("This is mixin method");
  }

  void manyMixin() {
    print("This is mixin 1");
  }
}

mixin MyMixin2 {
  void manyMixin() {
    print("This is mixin 2");
  }
}

class ChildMixin with MyMixin, MyMixin2 {
  ChildMixin() {
    print("Mixin inheritance");

    mixinMethod(); // This is mixin method

    manyMixin(); // This is mixin 2
    // If multiple methods with same name, only last method executed.
  }
}
```




### Abstract

Every abstract methods should be overrode.

In abstract class, `this` means child class.

```dart {linenos=true}
abstract class MyAbstract {
  final String name;

  MyAbstract(this.name);

  void printName(); // Abstract method.
  void whoAmI() {
    // If any codes are inside method,
    // then that method is not abstract anymore.
    print("I am not abstract method");
  }
}

class ChildAbstract extends MyAbstract {
  ChildAbstract(super.name);

  @override
  void printName() {
    print("Using abstract and override");
    super.tellName();
  }
}
```




### Base

Child class should have [base], [final], [sealed].

```dart {linenos=true}
base class MyBase {
  MyBase();
}
```




### Final

```dart {linenos=true}
final class MyFinal {
  MyFinal();
}
```




### Interface

Every class is `interface`, so every class can use `implements`. 

Interface can only has abstract methods.

```dart {linenos=true}
interface class MyInterface {
  MyInterface();
}
```




### Sealed

```dart {linenos=true}
sealed class MySealed {
  MySealed();
}
```





---
## Other Technic
---




### DateTime

```dart {linenos=true}
var now = DateTime.now();
var day = DateTime(2025, 1, 22); // Y: 2025, M: 1, D: 22
```




### Generic

`<T>`: Any type var. T value.

`<E>`: Elements of list. `List<E>`

`<K>`: Keys. `Map<K,V>`

`<V>`: Values. `Map<K,V>`

```dart {linenos=true}
class MyGeneric<T> {
    final T name;   

    MyGeneric({required this.name});
}
var temp = MyGeneric<int>(4);
```




### Record: (a, b)

```dart {linenos=true}
(int, int) aboutRecord() {
  (String, int) person = ("Name", 30);
  print(person); // ("Name", 30)
  print(person.$1); // Name
  print(person.$2); // 30

  ({String name, int age}) human = (name: "Dart", age: 17);
  print(human); // (age: 17, name: Dart)
  print(human.name); // Dart

  return (1, 2);
}

var (num1, num2) = aboutRecord();
print(num1);  // 1
print(num2);  // 2
```




### Destructuring

```dart {linenos=true}
var [a, b] = ["b", "a"];
print(a + b); // ba
(a, b) = (b, a); // Swap.
print(a + b); // ab

final numbers = [1, 2, 3, 4, 5, ];
final [x, y, ..., z] = numbers;
print(x); // 1
print(z); // 5

final people = {
    "name": "Dart",
    "age": 17,
};
final {"name": hi, "age": count} = people;
print(hi); // Dart
print(count); // 17
```




### Factory

Singleton pattern makes unique instance.

```dart {linenos=true}
class Singleton {
  static final Singleton _instance = Singleton._internal();

  // Factory constructor.
  factory Singleton() {
    return _instance;
  }

  // Real constructor is private.
  Singleton._internal();
}
```




### Control-flow Operator

```dart {linenos=true}
bool condition = false;

List<String> opListIf = [
  "one",
  "two",
  if (condition) "ten",
];

Map<String, int> opMapIf = {
  "one": 1,
  "two": 2,
  if (condition) "ten": 10,
};

Set<String> opSetIf = {
  "one", 
  "two", 
  if (condition) "ten",
};

List<int> opListFor = [0, for (int i = 1; i < 5; i++) i]; 
// [0,1,2,3,4]
```




### Operator Overriding

```dart {linenos=true}
class Vector {
  final double x;
  final double y;

  Vector(this.x, this.y);

  Vector operator +(Vector v) => Vector(x + v.x, y + v.y);
  Vector operator -(Vector v) => Vector(x - v.x, y - v.y);

  @override
  bool operator ==(Object other) {
    return other is Vector && x == other.x && y == other.y;
  }

  // When override [==], should override [hasCode] too.
  @override
  int get hashCode => x.hashCode ^ y.hashCode;
  // Create new [hashCode] with [^](xor)

  // Override [toString] will change [print] output.
  @override
  String toString() {
    return "($x, $y)";
  }
}

final u = Vector(1, 2);
final v = Vector(48, 38);

print(u + v);  // (49, 40)
print(u - v);  // (-47, -36)
```




### Call

`call` method can use instance like function.

```dart {linenos=true}
class AboutCallMethod {
  void call(name) => print("Call: $name");
}

var myCall = AboutCallMethod();
myCall("hello"); // Call: hello
```





---
## Async
---

`import "dart:async";`




### Future<T> - async

`Future` can handle 1 data. 

```dart {linenos=true}
Future<void> printWithDelay(String message) async {
  await Future.delayed(Duration(seconds: 1));
  print(message); 
  // Print message after 1 seconds.
}
```

```dart {linenos=true}
Future<String> _readFileAsync(String filename) async {
  final file = File(filename);
  final contents = await file.readAsString();
  return contents.trim();
}
```




### Stream<T> - async*

`Stream` can handle many data. 

`yield`: Return without break.

`yield*`: Yield [stream] type.

```dart {linenos=true}
Stream<void> printWithDelay2(String message) async* {
  await Future.delayed(Duration(seconds: 1));
  yield "$message with delay 1 seconds";
}
```

```dart {linenos=true}
Stream<int> sumStream(Stream<int> stream) async* {
  var sum = 0;
  await for (final value in stream) {
    yield sum += value;
  }
}

void sumCount() async {
  Stream<int> timerStream =
      Stream.periodic(Duration(seconds: 1), (count) => count);

  await for (final cumulative in sumStream(timerStream)) {
    print(cumulative);
  }
}

// 0, 1, 3, 6, 10, 15, 21, 28
// Print these values one at a time every second.
```

```dart {linenos=true}
void count() {
  // Number increase 1 per 1 seconds.
  Stream<int> numberStream =
    Stream.periodic(
      Duration(seconds: 1), 
      (count) => count,
    ).take(3);

  // Register listener, Start Stream.
  numberStream.listen(
    (data) => print('Received: $data'),
    onDone: () => print('Stream is done!'),
    onError: (error) => print('Error: $error'),
  );
}

// Received: 0
// Received: 1
// Received: 2
// Stream is done!
```




### StreamController

Use stream manually.

`.stream`: Output.

```dart {linenos=true}
void streamController() {
  final controller = StreamController<int>();

  controller.stream.listen((data) => print('Received: $data'));

  for (int i = 0; i < 3; i++) {
    controller.sink.add(i); // Add data manually.
  }

  controller.close(); // Close manually.

  // Received: 0
  // Received: 1
  // Received: 2

  controller.stream
      .where((val) => val % 2 == 0)
      .listen((data) => print("even $data"));
  // Can use any methods between [.stream] and [.listen]..
  // This will be print "even 0", "even 2", ...
}
```





---
## Isolate
---

`import "dart:isolate";`

- Isolate is similar thing of multithread.
  - Isolate does not need sync. 
  - Each isolate has own memory. 
- Isolates are communicate with async message: `ReceivePort`, `SendPort`. 
  - `SendPort` has 1 `ReceivePort`. 
    - `SendPort.send(Object? message)`
    - `SendPort` is write only. 
    - `.exit()` can send message once. 
  - `ReceivePort` has many `SendPort`. 
    - Handle message. 
    - `ReceivePort` is `Stream`. 
    - `ReceivePort` is read and write. 
- void `main(){}` is main isolate. 
  - Handle UI only. 

`Isolate.run(); `// Run single code. 

`Isolate.spawn();` // Make new isolate. 

[https://dart.dev/language/isolates](https://dart.dev/language/isolates)





---
## Library
---

- dart:core
  - Default. 
- dart:async
  - `Stream`, `Future`
- dart:math
  - `e`, `pi`, `sqrt2`
  - `max()`, `min()`
  - `cos()`, `sin()`, `tan()`
  - `Random().nextDouble()`, `Random().nextInt()`, `Random().nextBool()`
- dart:convert
  - Decoder, Encoder. 
- dart:io
  - For Dart VM. Flutter, sever, cli. 
- package:web/web.dart
  - DOM, other API. 