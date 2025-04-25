// === INCLUDES ===

// C's standard library is not built in to the language directly.
// We need to include it as 'system libraries' like this.
#include <stdio.h> // stdio.h - Standard Input and Output (Header)
#include <string.h> // string.h - String handling functions

// If we want to include our files or others provided, we can do this:
// The contents of `lib.c` is then inlined into this file.
// Note that including `.c` files in this way is typically bad practice in a
// professional C project. Instead we would use headers. But not right now!

// === FUNCTIONS ===

// C functions are defined like this:
// RETURN_TYPE FUNCTION_NAME(PARAM_TYPE p1, PARAM_TYPE p2)
int mul(int a, int b) {
  // Variables are defined with a type prefix
  int result = a * b;
  //                ^ statements end with a semicolon

  // Returning works as you'd expect.
  return result;
  puts("This will not be executed.");
}

// Recursion is available
int fib(int n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

// Unless you already know about how C handles memory, you will run into trouble
// trying to return anything other than a number from a function.
// We'll cover that in another file.

// === PRINTING ===

void printing() {
  // You can use printf to print strings with values interpolated
  printf("3 * 4 = %d\n", mul(3, 4));
  printf("Fibonacci number 10 is %d\n", fib(10));
  // Format is the first argument, values to interpolate are the following arguments

  // Quick specifier reference:
  // %d - signed decimal integer (e.g. 99, -42)
  // %f - decimal floating point  (e.g. 3.14, -0.01)
  // %s - string (e.g. "hello")
  // %% - literal % (e.g. %)
  // %p - pointer address (if given "hello" will print something like 0x7ffeefbff718)
  // \n - newline character, NOT automatically added to printf
}

// === LOOPS ===

void looping() {
  // You can use puts to print strings without values interpolated
  // Now with a free newline character!
  puts("Counting down from 1000 by 7s:");

  int c = 100;
  while (c > 0) {
    printf("%d\n", c);
    c = c - 7;
  }

  puts("Counting up from 0 by 7s:");

  // For loops are also available
  //   INITIALISE; RUN-WHILE; INCREMENT
  for (int i = 0; i < 100; i += 7) {
    printf("%d\n", i);
    // You can also use `break` to exit a loop early
    // And `continue` to skip the rest of the current iteration
  }
}

// === CONDITIONALS ===

void conditionals() {
  puts("Fizzbuzzing up to 20:");

  for (int i = 1; i <= 20; i++) {
    if (i % 15 == 0) {
      puts("Fizzbuzz");
    } else if (i % 3 == 0) {
      puts("Fizz");
    } else if (i % 5 == 0) {
      puts("Buzz");
    } else {
      printf("%d\n", i);
    }
  }

  // We have a relatively normal complement of logical operators:
  if (1 && !0 || 1) {
    puts("We made it!");
  }

  // And comparison operators:
  if (1 == 1 && 2 != 1 && 2 > 1 && 1 < 2 && 1 <= 1 && 2 >= 1) {
    puts("We made it again!");
  }
}

// === BASIC DATA TYPES ===

void data_types() {
  int integer = 42;
  float decimal = 3.14;
  char character = 'a'; // Typically 8 bits, enough to store an ASCII char
  // There's no boolean type, use integers of 0 and 1 instead

  // You may see these around:
  size_t whatever = 100;
  // This type is essentially "an unsigned integer big enough to store the size
  // of, or reference to, any object in memory on this system".
}

// === ARRAYS & STRINGS ===

void arrays_and_strings() {
  // C arrays & strings are a lot more basic than the lists you may be used to.
  // C strings are arrays of characters, terminated by a null character '�'.

  char string[6] = "hello"; // 6 characters, including the null terminator
  int numbers1[5]; // This allocates the memory for 5 ints but does not clear it.
  int numbers2[] = {1, 2, 3, 4, 5}; // This allocates the memory for 5 ints and
                                    // initialises them.

  // You can't get far using C arrays without learning about pointers and memory.
  // But that's not for this file, so let's move on!
}

// === STRUCTS ===

// Do you like classes and objects? Tough! C doesn't have them. But it does
// have structs, which are a bit like a single database record.

struct Person {
  char name[50];
  int height;
};

void structs() {
  // You can then initialize them like this:
  struct Person me = {"Kay", 176};

  // Or like this:
  struct Person you = {.height = 180, .name = "Someone"};

  // And access the properties using the familiar dot notation:
  printf("Person %s, height %dcm\n", me.name, me.height);
  printf("Person %s, height %dcm\n", you.name, you.height);
}

// === MAIN FUNCTION ===

// The `main` function is what will be executed if we compile this specific file
// and then run the executable generated.
// It can take no arguments, or two arguments:
// argc - the number of arguments passed to the program
// argv - an array of strings containing the arguments
int main(int argc, char **argv) {
  if (argc > 1) {
    printf("Hello, %s!\n", argv[1]);
  } else {
    puts("No greeting for you!");
  }

  printing();
  looping();
  conditionals();
  data_types();
  arrays_and_strings();
  structs();
}
