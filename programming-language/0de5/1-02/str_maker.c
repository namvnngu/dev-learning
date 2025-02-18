/* Link: https://www.0de5.net/stimuli/binary-code */

#include <stdio.h>

int main(void) {
  unsigned char bytes[15] = {0b01001101, 0x79,       0b00100000, 0b01101110,
                             0x61,       0x6D,       0b01100101, 0x20,
                             0x69,       0x73,       0b00101110, '.',
                             0b00101110, 0b00100000, '\0'};
  printf("Binary: ");
  for (int8_t i = 0; i < 14; i++) {
    for (int8_t j = 7; j >= 0; j--) {
      printf("%u", (bytes[i] >> j) & 0b00000001);
    }
  }
  printf("\n");

  printf("Hex: ");
  for (int8_t i = 0; i < 14; i++) {
    printf("%x", bytes[i]);
  }
  printf("\n");

  printf("Decimal: ");
  for (int8_t i = 0; i < 14; i++) {
    printf("%u", bytes[i]);
  }
  printf("\n");

  printf("String: %s\n", bytes);

  return 0;
}
