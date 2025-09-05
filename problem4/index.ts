/*
. Time Complexity: O(n)
. Space Complexity: O(n)
    Each frame holds a constant amount of data (the parameter n and return address)
. Efiiciency: 
1. Pros: Simple, readable
2. Cons: 
    - stack overflow for large n (depends on JavaScript engine, e.g., Node.js or browser limits)
    - each recursive call incurs function call overhead (stack frame creation), which is slower than iteration
*/
function sum_to_n_a(n: number): number {
    if (n == 1) {
        return 1;
    }
    
    return n + sum_to_n_a(n - 1);
}

/*
Time Complexity: O(1)
Space Complexity: O(1)
Efficiency:
1. Pros: the best solution
2. Cons: need to know the formula
 */
function sum_to_n_b(n: number): number {
	return n * (n + 1) / 2;
}

/*
Time Complexity: O(n)
Space Complexity: O(1)
Efficiency:
1. Pros: simple, readable, faster than recursion
2. Cons: still O(n), so slower than the O(1) mathematical formula
*/
function sum_to_n_c(n: number): number {
	let s: number = 0;
    for(let i = 1; i <= n; i++) {
        s += i;
    }
    return s;
}