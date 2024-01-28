/*function run_wasm() {
    // non-streaming demos (videos 1 (ccall) & 2 (cwrap))
    var addNums = Module.cwrap(
        "addNums",
        "number",
        ["number", "number"]
    );
    var result = Module.ccall(
        "main",
        "number",
        null,
        null
    );
    console.log("main() from ccall(): ",result);
    var a = document.getElementById("num-a").value;
    var b = document.getElementById("num-b").value;
    result = Module.ccall(
        "addNums",
        "number",
        ["number", "number"],
        [a, b]
    );
    console.log("addNums(a, b) from ccall():",result);
    result = addNums(a, b);
    console.log("addNums(a, b) from cwrap(): ",result);
    // streaming demo (video 3)
    WebAssembly.instantiateStreaming(
        fetch("main.wasm"), {}
    ).then(results => {
        var n = document.getElementById("num-n").value;
        var sum = results.instance.exports.sumOfNInts(n);
        document.getElementById("val-out").innerHTML = "sumOfNInts("+ n + ") = " + sum;
    });
}*/
// memory demo (video 4)
var memory = new WebAssembly.Memory({
    initial: 256,
    maximum: 512
});

var exports;
WebAssembly.instantiateStreaming(
    fetch("main.wasm"), {
    js: {
        mem: memory
    },
    env: {
        emscripten_resize_heap: function(delta) {
            memory.grow(delta);
        }
    }
}).then(results => {
    exports = results.instance.exports;
    memory = results.instance.exports.memory;
});

function run_wasm() {
    var arr = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    var ptr = encode_array(arr, arr.length, 4);
    var sum = exports.accumulate(ptr,arr.length);
    exports.wasm_free(ptr);
    document.getElementById("val-out").innerHTML = sum; 
}

function get_string() {
    var str = decode_string(exports.getString());
    alert("'"+str+"' has been copied to clipboard");
    navigator.clipboard.writeText(str);
}

function encode_array(arr, len, sizeof = 1) {
    var ptr;
    var out;
    if (sizeof == 8) {
        ptr = exports.wasm_malloc(len * 8);
        out = new BigUint64Array(memory.buffer, ptr);
    } else if (sizeof == 4) {
        ptr = exports.wasm_malloc(len * 4);
        out = new Uint32Array(memory.buffer, ptr);
    } else {
        ptr = exports.wasm_malloc(len);
        out = new Uint8Array(memory.buffer, ptr);
    }
    for (var i = 0; i < len; i++) {
        out[i] = arr[i];
    }
    return ptr;
}

function decode_array(ptr, len) {
    return new Uint8Array(memory.buffer).slice(ptr, ptr + len);
}

function decode_string(ptr, len) {
    return new TextDecoder("utf8").decode(decode_array(ptr, len));
}

function decode_string(ptr) {
    var bytes = new Uint8Array(memory.buffer, ptr);
    var strlen = 0;
    while (bytes[strlen] != 0) {
        strlen++;
    }
    return new TextDecoder("utf8").decode(bytes.slice(0, strlen));
}