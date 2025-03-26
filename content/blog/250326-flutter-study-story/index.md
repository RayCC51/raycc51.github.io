+++
title = 'Flutter study - Story App'
summary = "With full code"
date = "2025-03-26"
# lastmod = 2025-03-11
tags = ["flutter", "study", "coding", "sample"]
coverImg = "story.webp"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = false
showToC = false
showComments = true
+++

Source code reference: <https://www.geeksforgeeks.org/flutter-story-app/>

I made some modifications here.

### lib/main.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import 'widgets/appbar.dart';
import 'screens/story_home.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Story app",
      theme: ThemeData(
        colorSchemeSeed: Color(0xff2222ff),
        useMaterial3: true,
      ),
      home: Scaffold(
        appBar: appBar(context: context, title: "Story app home"),
        body: StoryHome(),
      ),
    );
  }
}
```

### lib/db/story.dart

```dart {linenos=true}
import '../models/story.dart';

final List<Story> stories = [
  Story(
    title: 'The Lion and the Mouse',
    content:
        'Once upon a time, a lion was sleeping in the forest when a mouse ran over his nose. The lion woke up and was about to eat the mouse when the mouse begged for mercy. The lion laughed at the tiny mouse, but decided to let him go. Later, the lion got caught in a hunter\'s trap, and the mouse came to his rescue by gnawing through the ropes.',
  ),
  Story(
    title: 'The Ant and the Grasshopper',
    content:
        'In a field one summer\'s day a Grasshopper was hopping about, chirping and singing to its heart\'s content. An Ant passed by, bearing along with great toil an ear of corn he was taking to the nest. "Why not come and chat with me," said the Grasshopper, "instead of toiling in that way?" "I am helping to lay up food for the winter," said the Ant, "and recommend you to do the same."',
  ),
  Story(
    title: 'The Tortoise and the Hare',
    content:
        'Once upon a time, a tortoise and a hare had a race. The hare was very confident that he would win, so he took a nap during the race. Meanwhile, the tortoise slowly but steadily made his way to the finish line, and won the race.',
  ),
];
```

### lib/models/story.dart

```dart {linenos=true}
class Story {
  final String title;
  final String content;

  Story({required this.title, required this.content});
}
```

### lib/screens/story_home.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import '../db/story_data.dart';
import 'story_screen.dart';

class StoryHome extends StatelessWidget {
  const StoryHome({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: stories.length,
      itemBuilder: (context, index) {
        final story = stories[index];
        return ListTile(
          title: Text(story.title),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => StoryScreen(story: story),
              ),
            );
          },
        );
      },
    );
  }
}
```

### lib/screens/story_screen.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

import '../widgets/appbar.dart';
import '../models/story.dart';

class StoryScreen extends StatelessWidget {
  final Story story;
  const StoryScreen({
    super.key,
    required this.story,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context: context, title: story.title),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Text(
          story.content,
          style: TextStyle(
            fontSize: 17,
            height: 2,
          ),
        ),
      ),
    );
  }
}
```

### lib/widgets/appbar.dart

```dart {linenos=true}
import 'package:flutter/material.dart';

AppBar appBar({required BuildContext context, required String title}) {
  return AppBar(
    title: Text(
      title,
      style: Theme.of(context).textTheme.headlineLarge,
    ),
    backgroundColor: Theme.of(context).colorScheme.inversePrimary,
    titleTextStyle: TextStyle(
      color: Theme.of(context).colorScheme.onPrimary,
    ),
  );
}
```
