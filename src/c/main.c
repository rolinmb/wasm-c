#include <stdio.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int addNums(int a, int b) {
  return a + b;
}

int main() {
  int num_a = 3;
  int num_b = 5;
  printf("Hello world from C compiled to WASM!; addNums(%d, %d) = %d\n", num_a, num_b, addNums(num_a, num_b));
  return 0;
}
