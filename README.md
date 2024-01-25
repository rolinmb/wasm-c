Learning WASM with C

Compile: 'go build -C src/go -o main && ./src/go/main && emcc src/c/main.c -o dist/main.js -s WASM=1'

I suggest running 'emsdk activate latest && emsdk_env.bat' whenever beginning development in a fresh terminal instance

Operating on Windows 11; so had to make sure emsdk/upstream/emscripten was also added to path; alongside emsdk/ being added to path
