+++
title = 'Python cheat sheet'
summary = "Studying python language"
date = 2025-03-03
# lastmod = 2025-03-11
tags = ["python", "programming", "language", "study", "cheatsheet"]
coverImg = "python.svg"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = true
showToC = true
showComments = true
+++



## Terminal 

```bash
python3 MY_PY.py
python3 --version
pip list
pip install "package name"
```

### Virtual environment

```bash
python3 -m venv MY_ENV
source MY_ENV/bin/activate
deactivate
```



---

## PEP 8

Indent: 4 space. 

Encoding: UTF-8. 

Line Length: max 72 letters. 
- Use \ for split the sentence. 
- Split 
    - before operators(+, -, *, /, =, **, //, %). 
    - after boolean operators(and or not). 

Whitespace
- Space before and after every operators. 
- Do not space
    - after (
    - before )
    - between ,)
    - before , : ;
    - slicing

Blank Line
- 2 line
    - after function, class definitions. 
- 1 line
    - before and after function, method. 
    - logical sections in function. 

Import
- One module per line.
- from: in single line.

\_\_Dunder\_\_(double underscore)
- Declared above import.

\# Comments
- Detailed, accurate, clear.
- Write complete sentence, starting with uppercase, end with period. 
- English. 
- \#
    - only when necessary. 
    - 2 spaces before #. 
- Use docstring for functions, class, module: purpose, usage. 

`if`
- `if x is not None` <- `if x`
    - `[]` `""` `{}` `(,)` isn't `None`
- `x is not` <- `not x is`
- Use `return None`, `else: return None` everywhere. 

Prefix, Suffix: use `.startswith()`, `.endswith()`. 

Avoid: `is True`, `is False`.

Naming

|:-:|:-:|
| mypackages | flatcase | 
| MyClass | PascalCase | 
| MyException | PascalCase | 
| ExceptionError | PascalCase | 
| \_\_global_variable\_\_ | \_\_snake_case\_\_ | 
| my_variable | snake_case | 
| my_function | snake_case | 
| CONSTANT | SCREAM_CASE | 
| method param start with | self, cls | 




---

## Declaration

```python {linenos=true}
# from my_from import my_import as my_module
# from my_from import *
i = 1
HELLO = "hello"  # const
world = "world"
```

```python {linenos=true}
my_list = [0,1,2,3]
my_list2 = [x for x in range(4)]
# .append(x) .extend(iterable) .insert(i, x) .pop(i=-1) 
# .clear() .count(x) .reverse()
# del my_list[i] == my_list.remove(x)
# my_list.sort() == my_list = sorted(my_list)
```

```python {linenos=true}
my_tuple = (4,5,6)
# Swap: a, b = b, a OR (a, b) = (b, a)
```

```python {linenos=true}
my_dictionary = {7: 7, 8: 8, 9: 9}
# .keys() .values() .items() .get(key, "Not Found") .update(my_dict_2)
```

```python {linenos=true}
my_set = {10,11,12}
# .add(x) .discard(x) 
# .union(my_set_2) .intersection(my_set_2) .difference(my_set_2)
```




---

## Basic

```python {linenos=true}
print("hello \
    world")
print("%s %s" % ("hello", world))  # %s, %d, %f, %0.1f, %b, %o, %x
print("{:*>10} {}".format("hello", world))  # Align: ^ middle, < left, > right. 
print(f"{HELLO} {world}")
print(world[1:4:2])  # ol  [start:end:step]

num = int(input("input number"))
```

```python {linenos=true}
# +, -, *, /, % mod, ** power, // divide without the remainder
# ==, !=, in, not in, is, is not
# +, * with string. 
# pow(x, y, z) == x ** y % z
```

```python {linenos=true}
if True:
    pass
elif False:
    pass
else:
    pass
```

```python {linenos=true}
while i in range(1,11):
    print(i, end="")
    i = i + 1
print()
```

```python {linenos=true}
for index, item in enumerate(my_list):
    print("index: ", index, ", item: ", item)  # index:  0 , item:  0 ...
```

```python {linenos=true}
def test(*args_tuple, **args_dict):
    # *args_tuple: Multiple arguments as tuple. 
        # test(1,2,3) -> args = (1,2,3). 
    # **args_dict: Multiple arguments as dictionary. 
        # test(1=1, 2=2) -> args = {1:1, 2:2}. 
    return 1, 2, 3  # Return (1, 2, 3) in tuple. 

def test2(arg1, arg2 = "arg2"):
    print(arg1, arg2)  # arg1 arg3
    return
test2(arg2 = "arg3", arg1="arg1")

test3 = test2
test3("arg4")  # arg4 arg2

(lambda x, y: x if x > y else y)(5,10)  # 10
```

```python {linenos=true}
list(map(lambda x: x ** 2 , my_list))  # [0, 1, 4, 9]
map_obj = map(function, iterable)  # Append function(elements). 

list(filter(lambda x: x % 2 == 0, my_list))  # [0, 2]
filter_obj = filter(function, iterable)  # If function(elements) is True, then append. 

sorted([(1, 2), (3, 1), (5, 0)], key=lambda point: point[1])  
# [(5, 0), (3, 1), (1, 2)]  # sort with y axis
sorted(my_list, key=lambda x:len(x))  # Sort with length. 
```

```python {linenos=true}
class MyClass:
    def __init__(self):
        pass
    
    def my_method(self, arg):
        pass

class ChildClass(MyClass):
    def __init__(self):
        super().__init__()
        pass

class UserDefinitionError(Exception):
    def __init__(self, message):
        super().__init__("user definition error: " + message)
```

```python {linenos=true}
try:
    print("error test")
    # raise UserDefinitionError("raise")
    assert False, "assert"  
    # assert boolean, message: If boolean is false, then AssertionError with message. 
except UserDefinitionError as e:
    print(e)    # user definition error: test
except AssertionError as e:
    print(e)  # assert
except Exception as e:
    print(e)
finally:
    pass
# ZeroDivisionError, NameError, TypeError, 
# SyntaxError, FileNotFoundError, IndexError, KeyError, ValueError
```

```python {linenos=true}
with open("my_text.txt", "a", encoding="utf-8") as my_text:
    # mode: r w a b rb wb ab
    # my_text.readline() .readlines() .write("...\n")
    pass
```




---

## Other Technic   

```python {linenos=true}
zipped = zip(my_list, my_tuple)
print(list(zipped))  # [(0, 4), (1, 5), (2, 6)]
print(*my_list)  # 0 1 2 3 Unpacking. 
print([*my_list, *my_tuple])  # [0, 1, 2, 3, 4, 5, 6]
```

```python {linenos=true}
# Decorator
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before decorator call.")
        func(*args, **kwargs)  # say_hello()
        print("After decorator call.")
    return wrapper

@my_decorator
def say_hello(word):
    print(word)

say_hello("Hello!")  
# Before the function is called. \n Hello! \n After the function is called.
```




---

## Module

```python {linenos=true}
import copy
shallow_copied_list = my_list.copy()
deep_copied_list = copy.deepcopy(my_list)  # Also copy nested list. 
```

```python {linenos=true}
import random
random.seed(42)  # Set seed. 
rand_float = random.random()  # [0, 1) Float. 
rand_int = random.randint(1, 10)  # [1, 10] Int. 
rand_uniform = random.uniform(1.0, 10.0)  # [1, 10] Float. 
rand_range = random.randrange(10)  # [0, 10) Int. 
rand_choice = random.choice(my_list)  # my_list can be: list, tuple, string. 
rand_sample = random.sample(my_list, 3)  # Choose 3 random items in my_list without duplicate. 
random.shuffle(my_list)
```

```python {linenos=true}
import sys
print(sys.argv)  # ['/Users/s/Desktop/python_summary.py', arg1, arg2, ...]
# sys.exit(0)  # Normal exit.
# .path .version .platform .copyright
```

```python {linenos=true}
import time
# .time() .sleep(seconds)

from datetime import datetime
print(datetime.now())
```

```python {linenos=true}
import pickle
# pickle.dump(obj, file)  # Write obj in file.
# pickle.load(file)  # Read file.
# Open mode = rb wb ab.
```

```python {linenos=true}
import logging
logging.basicConfig(filename="app.log", level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
# level = DEBUG < INFO < WARNING < ERROR < CRITICAL
logging.debug("debugging message")  # 2023-10-01 12:34:56,789 - DEBUG - debugging message
logging.info("information message")
logging.warning("warning message")
logging.error("error message")
logging.critical("critical error message")
```


### Package

my_package_folder  
├── \_\_init\_\_.py  
└── my_module.py  

```python
import my_package_folder.my_module
```




---

## In Program 

```python {linenos=true}
logger = logging.getLogger(__name__)
# If run this file directly, __name__ = __main__. 
# If import this file, __name__ is something else.

def main():
    logging.basicConfig(level=logging.INFO)
    logger.info('Started')
    # ...
    logger.info('Finished')
    print(logger.name, logger.level, logger.handlers)  #~ __main__ 0 []

if __name__ == '__main__':
    main()
```