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
    }
}).then(results => {
    exports = results.instance.exports;
    memory = results.instance.exports.memory;
});
function run_wasm() {
    var arr = new Uint32Array(memory.buffer);
    for (var i = 0; i < 10; i++) {
        arr[i] = i * 2;
    }
    var sum = exports.accumulate(arr, 10);
    document.getElementById("val-out").innerHTML = sum; 
}
function get_string() {
    var ptr = exports.getString();
    var bytes = new Uint8Array(memory.buffer, ptr);
    var str = new TextDecoder("utf8").decode(
        bytes.slice(0, 13)
    );
    console.log(str);
    navigator.clipboard.writeText(str);

}