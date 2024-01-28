#include <emscripten.h>
#include <stdlib.h>

int main() { return 0; }

EMSCRIPTEN_KEEPALIVE
int accumulate(int *arr, int n) {
  int sum = 0;
  while (n) {
    sum += arr[--n];
  }
  return sum;
}

EMSCRIPTEN_KEEPALIVE
const char *getString() {
  return "Hello wasm, this is C from emcc!";
}

EMSCRIPTEN_KEEPALIVE
void *wasm_malloc(size_t n) {
  return malloc(n);
}

EMSCRIPTEN_KEEPALIVE
void wasm_free(void *ptr) {
  return free(ptr);
}