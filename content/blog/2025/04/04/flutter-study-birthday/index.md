+++
title = 'Flutter study - Birthday Reminder'
summary = "With full code"
date = "2025-04-04"
# lastmod = 2025-03-11
tags = ["flutter", "study", "coding", "sample"]
coverImg = "birthday.webp"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = false
showToC = false
showComments = true
+++

Source code reference: <https://www.geeksforgeeks.org/flutter-build-birthday-reminder-app/>

I made some modifications here.

### lib/main.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import 'screens/home_screen.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Birthday Remainder',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.pink,
        ),
      ),
      debugShowCheckedModeBanner: false,
      home: const HomeScreen(),
    );
  }
}
```

### lib/db/birthday_list.dart

```dart {linenos=true}
import '../models/birthday_model.dart';

List<BirthdayModel> birthdayList = [
  BirthdayModel(name: "apple", birthday: "2000-04-04"),
  BirthdayModel(name: "banana", birthday: "2000-04-04"),
  BirthdayModel(name: "cake", birthday: "2000-04-03")
];
// sample data
```

### lib/models/birthday_model.dart

```dart {linenos=true}
class BirthdayModel {
  final String name;
  final String birthday; // "yyyy-mm-dd"
  final DateTime birthdayDate;

  BirthdayModel({
    required this.name,
    required this.birthday,
  }) : birthdayDate = DateTime(
          int.parse(birthday.split("-")[0]),
          int.parse(birthday.split("-")[1]),
          int.parse(birthday.split("-")[2]),
        );
}
```

### lib/screens/calendar_screen.dart

```dart {linenos=true}
import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

import '../widgets/appbar.dart';
import '../db/birthday_list.dart';

class CalendarScreen extends StatefulWidget {
  const CalendarScreen({super.key});

  @override
  State<CalendarScreen> createState() => _CalendarScreenState();
}

class _CalendarScreenState extends State<CalendarScreen> {
  DateTime? _selectedDay;
  DateTime _focusedDay = DateTime.now();
  late final ValueNotifier<List<String>> _selectedEvents;

  @override
  void initState() {
    super.initState();
    _selectedDay = DateTime.now();
    _selectedEvents = ValueNotifier(_getEventsForDay(_focusedDay));
  }

  @override
  void dispose() {
    super.dispose();
    _selectedEvents.dispose();
  }

  List<String> _getEventsForDay(DateTime day) {
    return birthdayList.where((birthday) {
      return birthday.birthdayDate.month == day.month &&
          birthday.birthdayDate.day == day.day;
    }).map((birthday) {
      return "${birthday.name}'s birthday!";
    }).toList();
  }

  void _onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    if (!isSameDay(_selectedDay, selectedDay)) {
      setState(() {
        _selectedDay = selectedDay;
        _focusedDay = focusedDay;
        _selectedEvents.value = _getEventsForDay(selectedDay);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, isHome: false),
      body: Column(
        children: [
          TableCalendar(
            focusedDay: DateTime.now(),
            firstDay: DateTime(1900),
            lastDay: DateTime(2100),
            selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
            onDaySelected: _onDaySelected,
            eventLoader: _getEventsForDay,
          ),
          const SizedBox(height: 8.0),
          Expanded(
            child: ValueListenableBuilder<List<String>>(
              valueListenable: _selectedEvents,
              builder: (context, value, _) {
                return ListView.builder(
                  itemCount: value.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(value[index]),
                      trailing: Icon(Icons.cake),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
```

### lib/screens/home_screen.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import '../widgets/appbar.dart';
import '../utils/add_birthday_dialog.dart';
import '../db/birthday_list.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _dateController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, isHome: true),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showAddNewBirthdayDialog(
              context: context,
              nameController: _nameController,
              dateController: _dateController,
              birthdayList: birthdayList,
              setState: setState);
        },
        tooltip: "Add new birthday",
        child: Icon(
          Icons.add,
        ),
      ),
      body: Stack(
        children: [
          Center(
            child: SizedBox(
              height: 300,
              width: 300,
              child: DecoratedBox(
                  decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage("assets/balloons.png"),
                  fit: BoxFit.cover,
                ),
              )),
            ),
          ),
          ListView.builder(
            itemCount: birthdayList.length,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(birthdayList[index].name),
                subtitle: Text(birthdayList[index].birthday),
                trailing: Icon(Icons.cake),
              );
            },
          ),
        ],
      ),
    );
  }
}
```

### lib/utils/add_birthday_dialog.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import '../models/birthday_model.dart';
import '../widgets/snackbar.dart';
import 'date_selector.dart';

Future<void> showAddNewBirthdayDialog({
  required BuildContext context,
  required TextEditingController nameController,
  required TextEditingController dateController,
  required List<BirthdayModel> birthdayList,
  required Function setState,
}) async {
  return showDialog<void>(
    context: context,
    barrierDismissible: false, // user must tap button!
    builder: (BuildContext context) {
      return AlertDialog(
        title: const Text('New Birthday'),
        content: SingleChildScrollView(
          child: ListBody(
            children: <Widget>[
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.person),
                  SizedBox(width: 10),
                  Expanded(
                    child: TextFormField(
                      controller: nameController,
                      decoration: InputDecoration(
                        labelText: "Name",
                      ),
                    ),
                  ),
                ],
              ),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.calendar_month),
                  SizedBox(width: 10),
                  Expanded(
                    child: TextFormField(
                      controller: dateController,
                      readOnly: true,
                      onTap: () {
                        dateSelector(
                          context: context,
                          dateController: dateController,
                          setState: setState,
                        );
                      },
                      decoration: InputDecoration(
                        labelText: "Birthday",
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        actions: <Widget>[
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: const Text("cancel"),
          ),
          TextButton(
            child: const Text('Add'),
            onPressed: () {
              if (nameController.text.isNotEmpty &&
                  dateController.text.isNotEmpty) {
                setState(() {
                  birthdayList.add(
                    BirthdayModel(
                      name: nameController.text,
                      birthday: dateController.text,
                    ),
                  );
                  nameController.clear();
                  dateController.clear();
                });
              } else {
                snackBar(context: context, message: "! Invalid name or date");
              }
              Navigator.of(context).pop();
            },
          ),
        ],
      );
    },
  );
}
```

### lib/utils/date_selector.dart

```dart {linenos=true}
// https://api.flutter.dev/flutter/material/showDatePicker.html#material.showDatePicker.1

import 'package:flutter/material.dart';

void dateSelector({
  required BuildContext context,
  required TextEditingController dateController,
  required Function setState,
}) async {
  await _dateSelector(
    context: context,
    dateController: dateController,
    setState: setState,
  );
}

Future<void> _dateSelector({
  required BuildContext context,
  required TextEditingController dateController,
  required Function setState,
}) async {
  final DateTime? pickedDate = await showDatePicker(
    context: context,
    initialDate: DateTime.now(),
    firstDate: DateTime(1900),
    lastDate: DateTime(2100),
  );
  setState(() {
    dateController.text = pickedDate!.toLocal().toString().split(' ')[0];
  });
}
```

### lib/widgets/appbar.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import '../screens/calendar_screen.dart';

AppBar appBar(
  BuildContext context, {
  required bool isHome,
}) {
  return AppBar(
    title: const Text('Birthday Remainder'),
    backgroundColor: Theme.of(context).colorScheme.primary,
    titleTextStyle: TextStyle(
      color: Theme.of(context).colorScheme.onPrimary,
      fontSize: 30,
    ),
    iconTheme: IconThemeData(
      color: Theme.of(context).colorScheme.onPrimary,
    ),
    actions: isHome
        ? [
            Padding(
              padding: const EdgeInsets.only(right: 10),
              child: IconButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => CalendarScreen()),
                  );
                },
                icon: Icon(Icons.calendar_month),
              ),
            ),
          ]
        : [],
  );
}
```

### lib/widgets/snackbar.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

void snackBar({
  required BuildContext context,
  required String message,
}) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(message),
    ),
  );
}
```