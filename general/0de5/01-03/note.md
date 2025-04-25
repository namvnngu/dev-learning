Video: https://youtu.be/5aZiRjgSGQU
Course: https://www.0de5.net/stimuli/just-enough-c-to-have-fun

# Compilation

- `-O` means how optimized the compiler should make the executable.

# Syntax

- `size_t` essentially is a type which is big enough to hold the size of or the address of any object that could fit in memory on the machine.
- String always have to end in a null byte `\0`.  A null byte tells C that the string is done.

# Memory

- When a C function returns and finishes executing, all of its local variables stored in the stack memory are freed, i.e. they are marked as available or no longer used. The stack memory space they occupied is effectively marked as available, and can be reused by other functions called afterward.
- C has something called "array-to-pointer decay", which means that when strings are passed in to functions, they actually get replaced by pointers.
