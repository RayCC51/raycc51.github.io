+++
title = 'Flutter study - BMI Calculator'
summary = "With full code"
date = "2025-03-25"
# lastmod = 2025-03-11
tags = ["flutter", "study", "coding", "sample"]
coverImg = "bmi.webp"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = false
showToC = false
showComments = true
+++

Source code reference: <https://www.geeksforgeeks.org/how-to-make-simple-bmi-calculator-app-in-flutter/>

I made some modifications here.

### lib/main.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import 'bmi_calculator.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorSchemeSeed: Color(0xffaa22aa),
        useMaterial3: true,
        brightness: Brightness.light,
      ),
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: BmiCalculator(),
      ),
    );
  }
}
```

### lib/bmi_calculator.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

class BmiCalculator extends StatefulWidget {
  const BmiCalculator({super.key});

  @override
  State<BmiCalculator> createState() => _BmiCalculatorState();
}

class _BmiCalculatorState extends State<BmiCalculator> {
  String bmi = "";
  Color colorBmi = Colors.transparent;

  TextEditingController heightController = TextEditingController();
  TextEditingController weightController = TextEditingController();

  void _updateBMI() {
    if (heightController.text.isNotEmpty && weightController.text.isNotEmpty) {
      setState(() {
        double weight = double.parse(weightController.text);
        double height = double.parse(heightController.text) / 100; // cm -> m

        bmi = (weight / (height * height)).toStringAsFixed(2);
        colorBmi = _bmiColor();
      });
    } else {
      // Clear bmi field
      setState(() {
        bmi = "";
        colorBmi = Colors.transparent;
      });
    }
  }

  Color _bmiColor() {
    double doubleBmi = double.parse(bmi);
    if (doubleBmi < 18.5) {
      return const Color(0xFF87B1D9); // Underweight
    } else if (doubleBmi < 24.9) {
      return const Color(0xFF3DD365); // Normal
    } else if (doubleBmi < 29.9) {
      return const Color(0xFFEEE133); // Overweight
    } else if (doubleBmi < 34.9) {
      return const Color(0xFFFD802E); // Obese
    }
    return const Color(0xFFF95353); // Extreme
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(colors: [
              Color(0xFF87B1D9),
              Color(0xFF3DD365),
              Color(0xFFEEE133),
              Color(0xFFFD802E),
              Color(0xFFF95353)
            ]),
          ),
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Text(
              "BMI Calculator",
              style: TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(left: 10, right: 10),
          child: TextField(
            controller: heightController,
            keyboardType: TextInputType.numberWithOptions(decimal: true),
            style: TextStyle(
              fontSize: 30,
            ),
            decoration: InputDecoration(
              labelText: "Height(cm): ",
              filled: true,
              fillColor: Colors.white,
            ),
            onChanged: (value) => _updateBMI(),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(left: 10, right: 10),
          child: TextField(
            controller: weightController,
            keyboardType: TextInputType.numberWithOptions(decimal: true),
            style: TextStyle(
              fontSize: 30,
            ),
            decoration: InputDecoration(
              labelText: "Weight(kg): ",
              filled: true,
              fillColor: Colors.white,
            ),
            onChanged: (value) => _updateBMI(),
          ),
        ),
        Text(
          "Your BMI: $bmi",
          style: TextStyle(
            backgroundColor: colorBmi,
            fontSize: 30,
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _colorContainer(color: 0xFF87B1D9, text: "Underweight"),
            _colorContainer(color: 0xFF3DD365, text: "Normal"),
            _colorContainer(color: 0xFFEEE133, text: "Overweight"),
            _colorContainer(color: 0xFFFD802E, text: "Obese"),
            _colorContainer(color: 0xFFF95353, text: "Extreme"),
          ],
        ),
        SizedBox(
          height: 40,
        )
      ],
    );
  }

  Widget _colorContainer({required int color, required String text}) {
    return Container(
      width: MediaQuery.of(context).size.width / 6,
      height: MediaQuery.of(context).size.width / 6,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.all(Radius.circular(10)),
        color: Color(color),
      ),
      child: Center(
        child: Text(
          text,
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
```