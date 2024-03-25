// A defer statement defers the execution of a function until the surrounding function returns.
// The deferred call's arguments are evaluated immediately, 
// but the function call is not executed until the surrounding function returns.
// Deferred function calls are pushed onto a stack
package main

import "fmt"

func main() {
	defer fmt.Println("world")

	fmt.Println("hello")
}