Learning WASM with C

Compile and host:
  'go build -C src/go -o main && emcc src/c/main.c -o dist/a.out.js -sFORCE_FILESYSTEM -s WASM=1 && ./src/go/main'

I suggest running 'emsdk activate latest && emsdk_env.bat' whenever beginning development in a fresh terminal instance

Operating on Windows 11; so had to make sure emsdk/upstream/emscripten was also added to path; alongside emsdk/ being added to path
