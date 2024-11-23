package main

import (
	"fmt"
	"math"
)

func Sqrt(x float64) float64 {
	z := 1.0
	for math.Abs(x-z*z) > 0.001 {
		z -= (z*z - x) / (2*z)
	}
	
	return z
}

func main() {
	fmt.Println(Sqrt(2))
}
