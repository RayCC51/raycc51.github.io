+++
title = 'Flutter study - Calculator'
summary = "With full code"
date = "2025-04-09"
# lastmod = 2025-03-11
tags = ["flutter", "study", "coding", "sample"]
coverImg = "calculator.webp"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = false
showToC = false
showComments = true
+++

Source code reference: <https://www.geeksforgeeks.org/advanced-calculator-app-using-flutter/>

I made some modifications here.


### pubspec.yaml

```yaml {linenos=true}
dependencies:
  flutter:
    sdk: flutter
  math_expressions: ^2.6.0
```

### lib/main.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import 'screens/calculator_screen.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Calculator+',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepOrange,
        ),
      ),
      debugShowCheckedModeBanner: false,
      home: CalculatorScreen(),
    );
  }
}
```

### lib/models/button_type_enum.dart

```dart {linenos=true}
enum BtnType { number, operator, equal }
```

### lib/screens/calculator_screen.dart

```dart {linenos=true}
import 'package:flutter/material.dart';
import 'package:math_expressions/math_expressions.dart';

import '../models/button_type_enum.dart';
import '../widgets/buttons_row.dart';
import '../widgets/calculator_button.dart';

class CalculatorScreen extends StatelessWidget {
  final ValueNotifier<String> inputNumbers = ValueNotifier<String>("");

  CalculatorScreen({super.key});

  void _btnClick({required String name}) {
    if (name == "c") {
      inputNumbers.value = "";
    } else if (name == "remove") {
      inputNumbers.value =
          inputNumbers.value.substring(0, inputNumbers.value.length - 1);
    } else {
      inputNumbers.value += name;
    }
  }

  Text _calculating(BuildContext context, String value, Widget? child) {
    if (value.isNotEmpty) {
      if (int.tryParse(value[value.length - 1]) != null) {
        try {
          return Text(Parser()
              .parse(value)
              .evaluate(EvaluationType.REAL, ContextModel())
              .toString());
        } catch (e) {
          return Text("");
        }
      } else if (value[value.length - 1] == "%") {
        value = "(${value.substring(0, value.length - 1)})/100";
        try {
          return Text(Parser()
              .parse(value)
              .evaluate(EvaluationType.REAL, ContextModel())
              .toString());
        } catch (e) {
          return Text("");
        }
      }
    }
    return Text("");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Expanded(
            flex: 30,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ValueListenableBuilder<String>(
                  valueListenable: inputNumbers,
                  builder: (context, value, child) {
                    return Text(
                      value,
                      style: TextStyle(
                        fontSize: 30,
                      ),
                    );
                  },
                ),
                ValueListenableBuilder<String>(
                  valueListenable: inputNumbers,
                  builder: (context, value, child) {
                    return _calculating(context, value, child);
                  },
                ),
              ],
            ),
          ),
          BtnRow(children: [
            CalcButton(
              name: "C",
              btnType: BtnType.operator,
              function: () => _btnClick(name: "c"),
            ),
            CalcButton(
              name: "←",
              btnType: BtnType.operator,
              function: () => _btnClick(name: "remove"),
            ),
            CalcButton(
              name: "",
              btnType: BtnType.number,
              function: () {},
            ),
            CalcButton(
              name: "/",
              btnType: BtnType.operator,
              function: () => _btnClick(name: "/"),
            ),
          ]),
          BtnRow(children: [
            CalcButton(
              name: "7",
              btnType: BtnType.number,
              function: () => _btnClick(name: "7"),
            ),
            CalcButton(
              name: "8",
              btnType: BtnType.number,
              function: () => _btnClick(name: "8"),
            ),
            CalcButton(
              name: "9",
              btnType: BtnType.number,
              function: () => _btnClick(name: "9"),
            ),
            CalcButton(
              name: "*",
              btnType: BtnType.operator,
              function: () => _btnClick(name: "*"),
            ),
          ]),
          BtnRow(children: [
            CalcButton(
              name: "4",
              btnType: BtnType.number,
              function: () => _btnClick(name: "4"),
            ),
            CalcButton(
              name: "5",
              btnType: BtnType.number,
              function: () => _btnClick(name: "5"),
            ),
            CalcButton(
              name: "6",
              btnType: BtnType.number,
              function: () => _btnClick(name: "6"),
            ),
            CalcButton(
              name: "-",
              btnType: BtnType.operator,
              function: () => _btnClick(name: "-"),
            ),
          ]),
          BtnRow(children: [
            CalcButton(
              name: "1",
              btnType: BtnType.number,
              function: () => _btnClick(name: "1"),
            ),
            CalcButton(
              name: "2",
              btnType: BtnType.number,
              function: () => _btnClick(name: "2"),
            ),
            CalcButton(
              name: "3",
              btnType: BtnType.number,
              function: () => _btnClick(name: "3"),
            ),
            CalcButton(
              name: "+",
              btnType: BtnType.operator,
              function: () => _btnClick(name: "+"),
            ),
          ]),
          BtnRow(children: [
            CalcButton(
              name: "%",
              btnType: BtnType.operator,
              function: () => _btnClick(name: "%"),
            ),
            CalcButton(
              name: "0",
              btnType: BtnType.number,
              function: () => _btnClick(name: "0"),
            ),
            CalcButton(
              name: ".",
              btnType: BtnType.number,
              function: () => _btnClick(name: "."),
            ),
            CalcButton(
              name: "=",
              btnType: BtnType.equal,
              function: () {},
            ),
          ]),
        ],
      ),
    );
  }
}
```

### lib/styles/button_style.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import '../models/button_type_enum.dart';

ButtonStyle btnStyle({
  required BuildContext context,
  required BtnType btnType,
}) {
  return switch (btnType) {
    BtnType.number => _numberStyle(context: context),
    BtnType.operator => _operatorStyle(context: context),
    BtnType.equal => _equalStyle(context: context),
  };
}

ButtonStyle _numberStyle({required BuildContext context}) {
  return ButtonStyle(
    backgroundColor:
        WidgetStatePropertyAll(Theme.of(context).colorScheme.primaryContainer),
    foregroundColor: WidgetStatePropertyAll(
        Theme.of(context).colorScheme.onPrimaryContainer),
  );
}

ButtonStyle _operatorStyle({required BuildContext context}) {
  return ButtonStyle(
    backgroundColor:
        WidgetStatePropertyAll(Theme.of(context).colorScheme.tertiaryContainer),
    foregroundColor: WidgetStatePropertyAll(
        Theme.of(context).colorScheme.onTertiaryContainer),
  );
}

ButtonStyle _equalStyle({required BuildContext context}) {
  return ButtonStyle(
    backgroundColor:
        WidgetStatePropertyAll(Theme.of(context).colorScheme.primary),
    foregroundColor:
        WidgetStatePropertyAll(Theme.of(context).colorScheme.onPrimary),
  );
}
```

### lib/widgets/buttons_row.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

class BtnRow extends StatelessWidget {
  final List<Widget> children;

  const BtnRow({
    super.key,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 14,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: children,
      ),
    );
  }
}
```

### lib/widgets/calculator_button.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import '../models/button_type_enum.dart';
import '../styles/button_style.dart';

class CalcButton extends StatelessWidget {
  final String name;
  final BtnType btnType;
  final VoidCallback function;

  const CalcButton({
    super.key,
    required this.name,
    required this.btnType,
    required this.function,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: SizedBox(
        width: 70,
        height: 70,
        child: ElevatedButton(
          style: btnStyle(context: context, btnType: btnType).copyWith(
            shape: WidgetStatePropertyAll(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.all(
                  Radius.circular(50),
                ),
              ),
            ),
          ),
          onPressed: function,
          child: Text(
            name,
            style: TextStyle(
              fontSize: 20,
            ),
          ),
        ),
      ),
    );
  }
}
```