+++
title = 'Flutter study - Tic Tac Toe'
summary = "With full code"
date = "2025-03-26"
# lastmod = 2025-03-11
tags = ["flutter", "study", "coding", "sample"]
coverImg = "tictactoe.webp"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = false
showToC = false
showComments = true
+++

Source code reference: <https://www.geeksforgeeks.org/flutter-building-a-tic-tac-toe-game/>

I made some modifications here.

### lib/main.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import 'tictactoe.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: TicTacToe(),
      ),
    );
  }
}
```

### lib/tictactoe.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

class TicTacToe extends StatefulWidget {
  const TicTacToe({super.key});

  @override
  State<TicTacToe> createState() => _TicTacToeState();
}

class _TicTacToeState extends State<TicTacToe> {
  int scoreP1 = 0;
  int scoreP2 = 0;

  bool _isP1Turn = true;
  Color p1TurnColor = Colors.red;
  Color p2TurnColor = Colors.transparent;

  // Default value is 9.
  // Player 1's value is 1, Player 2's value is 2.
  // Calculate sum of row, column, diagonal,
  //   and if this value is 3 or 6, then the game is end.
  List<int> gridValue = [9, 9, 9, 9, 9, 9, 9, 9, 9];

  void _resetScore() {
    setState(() {
      scoreP1 = 0;
      scoreP2 = 0;
      _isP1Turn = true;
      gridValue = [9, 9, 9, 9, 9, 9, 9, 9, 9];
    });
    _whoTurn();
  }

  Icon? _checkedArea({required int index}) {
    if (gridValue[index] == 1) {
      return Icon(Icons.circle_outlined);
    } else if (gridValue[index] == 2) {
      return Icon(Icons.close);
    }
    return null;
  }

  void _whoTurn() {
    setState(() {
      p1TurnColor = _isP1Turn ? Colors.red : Colors.transparent;
      p2TurnColor = !_isP1Turn ? Colors.red : Colors.transparent;
    });
  }

  void _whenClick({required int index}) {
    if (gridValue[index] == 9) {
      if (_isP1Turn) {
        gridValue[index] = 1;
      } else {
        gridValue[index] = 2;
      }
      _isP1Turn = !_isP1Turn;
      _checkGame();
      _whoTurn();
    }
  }

  void _checkGame() {
    List<int> setOfLines = [
      gridValue[0] + gridValue[1] + gridValue[2], // row 1
      gridValue[3] + gridValue[4] + gridValue[5], // row 2
      gridValue[6] + gridValue[7] + gridValue[8], // row 3
      gridValue[0] + gridValue[3] + gridValue[6], // column 1
      gridValue[1] + gridValue[4] + gridValue[7], // column 2
      gridValue[2] + gridValue[5] + gridValue[8], // column 3
      gridValue[0] + gridValue[4] + gridValue[8], // diagonal 1
      gridValue[2] + gridValue[4] + gridValue[6], // diagonal 2
    ];

    if (setOfLines.contains(3)) {
      // Player1 is winner: 1+1+1 = 3
      _showDialog(winner: 1);
    } else if (setOfLines.contains(6)) {
      // Player2 is winner: 2+2+2 = 6
      _showDialog(winner: 2);
    } else if (setOfLines.every((item) => item < 9)) {
      // Draw.
      // If there is at least one empty space,
      //   the sum will always exceed 9 because the default value is 9.
      // If there are no empty spaces,
      //   the maximum sum is 6,
      //   which means that [item < 9] refers to the case
      //   where all squares are checked but there is no winner.
      _showDrawDialog();
    }
  }

  void _showDialog({required int winner}) {
    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Winner is Player$winner"),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                setState(() {
                  if (winner == 1) {
                    scoreP1++;
                    _isP1Turn = false;
                  } else {
                    scoreP2++;
                    _isP1Turn = true;
                  }
                  gridValue = [9, 9, 9, 9, 9, 9, 9, 9, 9];
                });
              },
              child: Text("Play again"),
            ),
          ],
        );
      },
    );
  }

  void _showDrawDialog() {
    // Draw
    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Draw"),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                setState(() {
                  gridValue = [9, 9, 9, 9, 9, 9, 9, 9, 9];
                });
              },
              child: Text("Play again"),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          Text("Tic Tac Toe"),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Player 1(O): $scoreP1",
                style: TextStyle(
                  backgroundColor: p1TurnColor,
                ),
              ),
              SizedBox(
                width: 30,
              ),
              Text(
                "Player 2(X): $scoreP2",
                style: TextStyle(
                  backgroundColor: p2TurnColor,
                ),
              ),
            ],
          ),
          ElevatedButton(
            onPressed: _resetScore,
            child: Text("Reset Score"),
          ),
          // Tic Tac Toe game.
          Expanded(
            child: GridView.count(
              crossAxisCount: 3,
              children: List.generate(
                9,
                (index) {
                  return Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: Colors.black,
                      ),
                    ),
                    child: GestureDetector(
                      onTap: () {
                        _whenClick(index: index);
                      },
                      child: _checkedArea(index: index),
                    ),
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```
