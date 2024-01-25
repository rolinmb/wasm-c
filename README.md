Learning WASM with C

Must use 'EMSCRIPTEN_KEEPALIVE' so emcc can tell what functions are being used in the browser (-s NO_EXIT_RUNTIME=1 also needs to be set), not just for compile time

Compile and host:
  'go build -C src/go -o main && emcc src/c/main.c -o dist/a.out.js -s FORCE_FILESYSTEM WASM=1 NO_EXIT_RUNTIME=1 && ./src/go/main'

I suggest running 'emsdk activate latest && emsdk_env.bat' whenever beginning development in a fresh terminal instance

Operating on Windows 11; so had to make sure emsdk/upstream/emscripten was also added to path; alongside emsdk/ being added to path
