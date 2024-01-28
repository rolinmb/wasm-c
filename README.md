Learning WASM with C

Must use 'EMSCRIPTEN_KEEPALIVE' so emcc can tell what functions are being used in the browser (-s NO_EXIT_RUNTIME=1 also needs to be set), not just for compile time

Compile and host main.c (compiles Go server first, then transpiles C to WASM, then starts Go server):
  go build -C src/go -o main &&
  emcc src/c/main.c -o dist/main.js -s NO_EXIT_RUNTIME=1 -s EXPORTED_RUNTIME_METHODS=ccall,cwrap -s FORCE_FILESYSTEM -s WASM=1 &&
  ./src/go/main

Compile and host streaming.c:
  go build -C src/go -o main &&
  emcc src/c/streaming.c -o dist/main.js &&
  ./src/go/main

I suggest running 'emsdk activate latest && emsdk_env.bat' whenever beginning development in a fresh terminal instance

Operating on Windows 11; so had to make sure emsdk/upstream/emscripten was also added to path; alongside emsdk/ being added to path
