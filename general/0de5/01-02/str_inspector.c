#include <stdio.h>
#include <stdlib.h>

void print_ascii(char *str) {
  printf("ASCII:");

  int i = 0;
  char c = str[0];
  while (c != '\0') {
    printf("%9c", c);
    i++;
    c = str[i];
  }
  printf("\n");
}

void print_hex(char *str) {
  printf("Hex:  ");

  int i = 0;
  char c = str[0];
  while (c != '\0') {
    printf("%9X", c);
    i++;
    c = str[i];
  }
  printf("\n");
}

void print_dec(char *str) {
  printf("Dec:  ");

  int i = 0;
  char c = str[0];
  while (c != '\0') {
    printf("%9u", c);
    i++;
    c = str[i];
  }
  printf("\n");
}

void print_bin(char *str) {
  printf("Bin:  ");

  int i = 0;
  char c = str[0];
  while (c != '\0') {
    printf(" ");

    int j = 7;
    while (j >= 0) {
      printf("%u", (c >> j) & 0b00000001);
      j--;
    }

    i++;
    c = str[i];
  }

  printf("\n");
}

int main(int argc, char *argv[]) {
  if (argc == 1) {
    fprintf(stderr, "No string given!\n");
    exit(1);
  }

  char *str = argv[1];

  print_ascii(str);
  print_hex(str);
  print_dec(str);
  print_bin(str);

  return 0;
}
