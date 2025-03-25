+++
title = 'Flutter study - simple calculate'
summary = "With full code"
date = "2025-03-25"
# lastmod = 2025-03-11
tags = ["flutter", "study", "coding"]
coverImg = "simple-calculator.webp"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = false
showToC = false
showComments = true
+++

Source code reference: <https://www.geeksforgeeks.org/simple-calculator-app-using-flutter/>

I made some modifications here.

### pubspec.yaml

```yaml
dependencies:
  flutter:
    sdk: flutter
  math_expressions: ^2.6.0
```

### lib/main.dart

```dart
import 'package:flutter/material.dart';
import 'package:math_expressions/math_expressions.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorSchemeSeed: Color(0xffaaaa22),
        useMaterial3: true,
      ),
      home: Scaffold(
        body: Homepage(),
      ),);}
}

class Homepage extends StatefulWidget {
  const Homepage({super.key});

  @override
  State<Homepage> createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  String _userInput = "";
  String _answer = "";

  final List<String> buttons = [
    'C', '±', '%', 'DEL', 
    '7', '8', '9', '/', 
    '4', '5', '6', '*', 
    '1', '2', '3', '-', 
    '0', '.', '=', '+',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Simple Calculator'),
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Theme.of(context).colorScheme.onPrimary,
      ),
      body: Column(
        children: [
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Container(
                  // Answer
                  padding: EdgeInsets.all(10),
                  alignment: Alignment.centerRight,
                  child: SelectableText(
                    _answer,
                    style: Theme.of(context).textTheme.headlineLarge,
                  ),
                ),
                Container(
                  // User Input
                  padding: EdgeInsets.all(10),
                  alignment: Alignment.centerRight,
                  child: SelectableText(
                    _userInput,
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),),
              ],),
          ),
          Expanded(
            flex: 3,
            child: GridView.builder(
              itemCount: buttons.length,
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 4,
                mainAxisSpacing: 8.0,
                crossAxisSpacing: 8.0,
                childAspectRatio: 1.2,
              ),
              itemBuilder: (BuildContext context, int index) {
                switch (index) {
                  case 0:
                    // "C" button
                    return Buttons(
                      buttonStyle: ElevatedButton.styleFrom(
                        backgroundColor: Colors.red,
                        foregroundColor: Colors.white,
                      ),
                      buttonString: buttons[index],
                      onTap: () {
                        setState(() {
                          _userInput = "";
                        });
                      },
                    );
                  case 1:
                    // "±" button
                    return Buttons(
                      buttonStyle: ElevatedButton.styleFrom(
                        backgroundColor: Colors.orange,
                        foregroundColor: Colors.white,
                      ),
                      buttonString: buttons[index],
                      onTap: () {
                        setState(() {
                          if (_userInput == "" || _userInput[0] != "-") {
                            _userInput = "-$_userInput";
                          } else {
                            _userInput = _userInput.substring(1);
                          }
                        });
                      },
                    );
                  case var x when [2, 7, 11, 15, 19].contains(x):
                    // Operator buttons
                    return Buttons(
                      buttonStyle: ElevatedButton.styleFrom(
                        backgroundColor: Colors.orange,
                        foregroundColor: Colors.white,
                      ),
                      buttonString: buttons[index],
                      onTap: () {
                        setState(() {
                          _userInput += buttons[index];
                        });
                      },
                    );
                  case 3:
                    // "DEL" button
                    return Buttons(
                      buttonStyle: ElevatedButton.styleFrom(
                        backgroundColor: Colors.red,
                        foregroundColor: Colors.white,
                      ),
                      buttonString: buttons[index],
                      onTap: () {
                        setState(() {
                          _userInput =
                              _userInput.substring(0, _userInput.length - 1);
                        });
                      },
                    );
                  case 18:
                    // "=" button
                    return Buttons(
                        buttonStyle: ElevatedButton.styleFrom(
                          backgroundColor:
                              Theme.of(context).colorScheme.primary,
                          foregroundColor:
                              Theme.of(context).colorScheme.onPrimary,
                        ),
                        buttonString: buttons[index],
                        onTap: () {
                          setState(() {
                            _equalPressed();
                          });
                        });
                  default:
                    // Number buttons
                    return Buttons(
                      buttonString: buttons[index],
                      onTap: () {
                        setState(() {
                          _userInput += buttons[index];
                        });
                    },);}},
            ),),],
      ),);}

  // Calculate expression
  void _equalPressed() {
    try {
      _answer = Parser()
          .parse(_userInput)
          .evaluate(EvaluationType.REAL, ContextModel())
          .toString();
    } catch (e) {
      _answer = "Error";
    }
  }
}

class Buttons extends StatelessWidget {
  final ButtonStyle? buttonStyle;
  final String buttonString;
  final void Function() onTap;

  const Buttons({
    super.key,
    this.buttonStyle,
    required this.buttonString,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onTap,
      style: buttonStyle,
      child: Text(
        buttonString,
        style: TextStyle(fontSize: 20),
      ),);
  }
}
```
