function run_wasm() {
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
}