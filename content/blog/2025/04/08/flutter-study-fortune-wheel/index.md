+++
title = 'Flutter study - Fortune wheel spin'
summary = "With full code"
date = "2025-04-08"
# lastmod = 2025-03-11
tags = ["flutter", "study", "coding", "sample"]
coverImg = "wheel.webp"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = false
showToC = false
showComments = true
+++

Source code reference: <https://www.geeksforgeeks.org/flutter-create-fortune-wheel-spin/>

I made some modifications here.

### pubspec.yaml

```dart {linenos=true}
dependencies:
  flutter:
    sdk: flutter
  confetti: ^0.8.0
  http: ^1.3.0
  flutter_fortune_wheel: ^1.3.2
```

### lib/main.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import 'screens/wheel_spin_screen.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fortune wheel spin',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.teal,
        ),
      ),
      debugShowCheckedModeBanner: false,
      home: const WheelSpinScreen(),
    );
  }
}
```

### lib/models/meal.dart

```dart {linenos=true}
class Meal {
  final String name;
  final String imageSrc;

  Meal({
    required this.name,
    required this.imageSrc,
  });

  factory Meal.fromJson(Map<String, dynamic> json) {
    return Meal(name: json["strMeal"], imageSrc: json["strMealThumb"]);
  }

  @override
  String toString() {
    return name;
  }
}
```

### lib/models/spin.dart

```dart {linenos=true}
import 'dart:math';

class Spin {
  static int randomNumber = 0;

  static int spin({required int max}) {
    randomNumber = Random().nextInt(max);
    return randomNumber;
  }
}
```

### lib/screens/wheel_spin_screen.dart

```dart {linenos=true}
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:confetti/confetti.dart';

import '../models/meal.dart';
import '../models/spin.dart';
import '../services/get_meal_list.dart';
import '../widgets/fortune_wheel.dart';

class WheelSpinScreen extends StatefulWidget {
  const WheelSpinScreen({super.key});

  @override
  State<WheelSpinScreen> createState() => _WheelSpinScreenState();
}

class _WheelSpinScreenState extends State<WheelSpinScreen> {
  List<Meal> _mealList = [];
  final StreamController<int> _selected = StreamController<int>();
  late ConfettiController _confettiController;

  Future<void> _getMealList() async {
    List<Meal> mealList = await getMealList();
    setState(() {
      _mealList = mealList;
    });
  }

  @override
  void initState() {
    super.initState();
    _getMealList();
    _confettiController = ConfettiController(
      duration: const Duration(seconds: 10),
    );
  }

  @override
  void dispose() {
    _selected.close();
    _confettiController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Fortune wheel spin'),
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Theme.of(context).colorScheme.onPrimary,
      ),
      body: Center(
        child: GestureDetector(
          onTap: () {
            _selected.add(Spin.spin(max: _mealList.length));
          },
          child: Expanded(
            child: AspectRatio(
              aspectRatio: 1.0,
              child: FortuneWheelWidget(
                selected: _selected,
                mealList: _mealList,
                confettiController: _confettiController,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
```

### lib/services/get_meal_list.dart

```dart {linenos=true}
import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/meal.dart';

String _url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese";
List<Meal> _mealList = [];

Future<List<Meal>> getMealList() async {
  http.Response res;
  Uri uri = Uri.parse(_url);
  res = await http.get(uri);

  if (res.statusCode == 200) {
    Map<String, dynamic> jsonData = json.decode(res.body);

    if (jsonData["meals"] != null) {
      List<dynamic> meals = jsonData["meals"];
      _mealList = meals.map((json) => Meal.fromJson(json)).toList();
    }
  }

  return _mealList;
}
```

### lib/utils/selected_dialog.dart

```dart {linenos=true}
import 'dart:async';

import 'package:flutter/material.dart';

import '../models/meal.dart';
import '../models/spin.dart';

selectedDialog({
  required BuildContext context,
  required List<Meal> mealList,
  required StreamController<int> selected,
}) {
  showDialog(
    context: context,
    barrierDismissible: false,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text(mealList[Spin.randomNumber].name),
        content: Image.network(
          mealList[Spin.randomNumber].imageSrc,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text("cancel"),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              selected.add(Spin.spin(max: mealList.length));
            },
            child: Text("Spin again"),
          ),
        ],
      );
    },
  );
}
```

### lib/widgets/fortune_wheel.dart

```dart {linenos=true}
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_fortune_wheel/flutter_fortune_wheel.dart';
import 'package:confetti/confetti.dart';

import '../models/meal.dart';
import '../utils/selected_dialog.dart';

class FortuneWheelWidget extends StatefulWidget {
  final StreamController<int> selected;
  final List<Meal> mealList;
  final ConfettiController confettiController;

  const FortuneWheelWidget({
    super.key,
    required this.selected,
    required this.mealList,
    required this.confettiController,
  });

  @override
  State<FortuneWheelWidget> createState() => _FortuneWheelWidgetState();
}

class _FortuneWheelWidgetState extends State<FortuneWheelWidget> {
  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      FortuneWheel(
        selected: widget.selected.stream,
        items: [
          for (var i in widget.mealList) FortuneItem(child: Text(i.name))
        ],
        animateFirst: false,
        onAnimationEnd: () {
          selectedDialog(
            context: context,
            mealList: widget.mealList,
            selected: widget.selected,
          );
          widget.confettiController.play();
        },
      ),
      Align(
        alignment: Alignment.center,
        child: ConfettiWidget(
          confettiController: widget.confettiController,
          blastDirectionality: BlastDirectionality.explosive,
        ),
      ),
    ]);
  }
}
```