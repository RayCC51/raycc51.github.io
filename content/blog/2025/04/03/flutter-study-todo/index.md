+++
title = 'Flutter study - Todo List'
summary = "With full code"
date = "2025-04-03"
# lastmod = 2025-03-11
tags = ["flutter", "study", "coding", "sample"]
coverImg = "todo.webp"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = false
showToC = false
showComments = true
+++

Source code reference: <https://www.geeksforgeeks.org/how-to-build-a-todo-application-in-flutter/>

I made some modifications here.

### lib/main.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'todo list',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.orange,
        ),
      ),
      debugShowCheckedModeBanner: false,
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Todo List'),
        backgroundColor: Theme.of(context).colorScheme.primary,
        titleTextStyle: TextStyle(
          color: Theme.of(context).colorScheme.onPrimary,
          fontSize: 30,
        ),
      ),
      body: TodoList(),
    );
  }
}

class TodoList extends StatefulWidget {
  const TodoList({super.key});

  @override
  State<TodoList> createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> {
  List<String> itemList = [];
  int _editIndex = -1; // -1 means add new item. other number is editing.

  final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
  }

  void _addTodo() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        itemList.add(_controller.text);
        _controller.clear();
      });
    }
  }

  void _editTodoItem() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        itemList[_editIndex] = _controller.text;
        _editIndex = -1;
        _controller.clear();
      });
    } else {
      _removeTodo(index: _editIndex);
    }
  }

  void _removeTodo({required int index}) {
    setState(() {
      itemList.removeAt(index);
      _editIndex = -1;
    });
  }

  void _editTodo({required int index}) {
    setState(() {
      _controller.text = itemList[index];
      _editIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          flex: 90,
          child: ListView.builder(
            itemCount: itemList.length,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(itemList[index]),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      onPressed: () {
                        _editTodo(index: index);
                      },
                      icon: Icon(Icons.edit),
                    ),
                    IconButton(
                      onPressed: () {
                        _removeTodo(index: index);
                      },
                      icon: Icon(Icons.delete),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
        Expanded(
          flex: 10,
          child: Padding(
            padding: const EdgeInsets.only(
              left: 10,
              right: 10,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: TextFormField(
                    controller: _controller,
                    autocorrect: false,
                    decoration: InputDecoration(
                      labelText: _editIndex == -1 ? "New todo" : "Edit todo",
                    ),
                    onFieldSubmitted: (value) {
                      _editIndex == -1 ? _addTodo() : _editTodoItem();
                    },
                  ),
                ),
                SizedBox(
                  width: 10,
                ),
                IconButton(
                  onPressed: _editIndex == -1 ? _addTodo : _editTodoItem,
                  icon: _editIndex == -1 ? Icon(Icons.add) : Icon(Icons.edit),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
```