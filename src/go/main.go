package main

import (
  "fmt"
  "net/http"
)

const (
  DIST = "dist"
)

func mainHandler(h http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    fmt.Println("mainHandler(): * New Client Request:", r.RemoteAddr)
    h.ServeHTTP(w, r)
  })
}

func main() {
  http.Handle("/", mainHandler(http.FileServer(http.Dir(DIST))))
  fmt.Println("main(): Starting local hosting server for wasm-c on localhost:8080")
  http.ListenAndServe(":8080", nil)
}
