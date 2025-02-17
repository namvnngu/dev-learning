/* Link: https://www.0de5.net/stimuli/binary-code */

#include <stdio.h>

int main(void) {
  unsigned char bytes[10] = {};

  bytes[0] = 0b01001000; // binary
  bytes[1] = 0x65;       // hex
  bytes[2] = 108;        // decimal
  bytes[3] = 0154;       // octal

  for (int i = 0; i < 10; i++) {
    printf("[%2u] %3u %2x\n", i, bytes[i], bytes[i]);
  }

  return 0;
}
