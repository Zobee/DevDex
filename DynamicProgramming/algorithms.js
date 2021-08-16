/* DYNAMIC PROGRAMMING - https://www.youtube.com/watch?v=oBt53YbR9Kk 

Designing the algorithm is the hard part, actually translating it into code is easy.

Two parts to this course: Memoization & Tabulation


PROBLEM 1: Fib (memoization)
Write a function fib(n) that takes in a number as an argument. 
The function should return the nth number in the Fibonacci sequence

Fibonacci sequence: 1st and 2nd = 1 3rd+ sum of previous two nums

1 1 2 3 5 8 13 21

const fib = n => {
  if(n <= 2) return 1
  return fib(n - 1) + fib(n - 2)
}
This implementation works, but it's hella slow, so it's not particularly efficient or useful.
The implementation kinda looks like a tree. Let's use fib(6) as an example:

fib(6) => 8
          6 - input (not base case)
        /   \
       5     4 - fib(n - 1) + fib(n - 2)
      / \   / \
     4   3 3   2 - 2 is base
    / \ /\/\   
   3  22 12 1
  / \
 2   1 = both base, so return 1

As you can (kinda) see. The function's recursive calls take a tree structure, since the recursive case
makes two more recursive calls, until n gets small enough to meet the base case. Each parent node
actually corresponds to the fib number i.e. 3 splits into 2, and 1, which both return 1, which makes
3 = 1 + 1, or 2, which is the third number in the sequence. This goes all the way up until we return
the sum of the binary tree.

This function has an exponential O(2^n) time complexity, which makes sense, as each recursive call
makes two additional calls. 

The function has a linear O(n) space complexity, which seems kinda off--but it makes sense when you
realize that once a function stops running, it gets popped off the stack. This means that the function
will only ever have as many function calls as there is height on the tree. As you can see from the tree,
the height of the tree grows linearly, therefore, O(n)

So, how do we make this better? Dynamic Programming! If you look at the tree, you'll notice that there's
a lot of duplication amongst the subtrees. We'd be able to save a lot of time if we just stored the
value of those subtrees somewhere for reuse later.

Memoization is the process of memoizing, or storing some information in a way that allows for reuse.
It's the realized version of that joke about throwing a hashmap at a problem. 

const fib = (n, memo = {}) => {
  if(n in memo) return memo[n]
  if(n <= 2) return 1
  memo[n] = fib(n -1, memo) + fib(n - 2, memo)
  return memo[n]
}
In this case, you can store any previously seen values within your memo. When you recursively go down,
the left branch of the tree will look pretty similar:

fib(6) => 8
          6 -
        /   \
       5     (4 is already in memo, so it returns 3 without making more calls)
      / \   
     4   (3 is already in memo, so it returns 2 without making more calls) 
    / \   
   3  2
  / \
 2   1 

 You effectively cut the right branch off using this algorithm. Looking at the structure, we've been
 able to cut the time complexity down to O(n).

PROBLEM 2: gridTraveler

Say that you're a traveler on a 2D grid. You begin in the top left corner, and your goal is to travel
to the bottom-right corner. You may only move down or right. 
In how many ways can you travel to the goal on a grid with the dimensions m * n?

Write a function gridTraveler(m, n) that calculates this.

Despite not sounding like it on the surface, this is also a problem that we can solve with recursion.
The best place to start is always the basest of cases. 

in a 1 x 1 grid, the traveler doesn't actually need to move, so there's really only one way of getting
from start to finish--nothing. 
That can be extrapolated to be: In a 1 x N grid, there will always be one path from start to finish
in a 0 x N grid, It will take 0 steps, as that would be an invalid grid.

These would be our base cases. If one of either n or m is 1, the return value is 1, if either n or m is 0
the return value is 0.

You can also see the recursive nature of the program when you consider that a loop is required, but you
can't be sure how many iterations there will be. Further, it's similar to the first problem, because of
the fact that you only have one of two options, making another binary tree.

If you go down, the grid area shrinks by m - 1
If you go right, the grid area shrinks by n - 1

This makes more sense when you realize that as soon as a direction is locked in, the other is locked out.


gridTraveler(3,3) (3,3)
            down  /    \ right
               (2,3)  (3,2)
               /  \     /  \
            (1,3)(2,2)(2,2)(3,1) - 1,3 / 3,1 are base cases
                 /  \    / \
             (1,2)(2,1)(1,2)(2,1) - Technically, we could go to zero, but since 
                                    1 x N is always 1, it doesn't matter


const gridTraveler = (x, y) => {
  if (x === 1 || y === 1) return 1
  if (x === 0 || y === 0) return 0

  return gridTraveler(x-1, y) + gridTraveler(x, y-1)
}
Here's a solution. The time complexity is O(2^n+m) and the space complexity is O(n+m)

Here's the memoized version: 

const gridTraveler = (x, y, memo={}) => {
  const key = `${x},${y}`
  if (key in memo) return memo[key]
  if (x === 1 || y === 1) return 1
  if (x === 0 || y === 0) return 0

  memo[key] = gridTraveler(x-1, y, memo) + gridTraveler(x, y-1, memo)
  return memo[key]
}

console.log(gridTraveler(1,1))
console.log(gridTraveler(2,3))
console.log(gridTraveler(3,2))
console.log(gridTraveler(3,3))
console.log(gridTraveler(18,18))

As you can see. We got ourselves a pattern. Memoization is a clean solution to solving recursive problems
that may have an exponential brute-force approach.

Memoization Recipe:

1. Make it work. Find a solution that works. Like the first solutions to the two problems above, having
some sort of solution in place is necessary for implementing a memo solution.
 *visualize the problem as a tree.
 *Implement the tree using recursion

2. Make it efficient. This is where you break out the hashmaps
 *add the memo object
 *add a base case to return memo values
 *store return values in the memo

Don't try to find the most efficient solution out of the gate. Build up your recursive brute-force solution
first.


PROBLEM 3 canSUm

Write a function canSum(targetSum, numbers) that takes in a targetSum and an array of numbers as args
Should return a bool indicating whether or not it is possible to generate targetSum using numbers from
the array.

You may use an element of the array as many times as needed.

You may assume that all input numbers are non-negative

Ex target sum is 5 numbers is [1,2,4]
The goal is to find out whether 5 can be made from the numbers.

                  start with    5
                            /   |   \
                           4    3    1
                          /|\  /|\  /|\
                         3 2 0 21-1 0-1-3
                        /|\
                       2 1 -1

The idea here is to subtract the numbers in nums from the target. If the target hits zero, then we can
create the number, and the answer is true. If the target hits a negative number, then that branch is dead
and false. We only need one correct path. Another assumption we can make is that if 1 exists anywhere in
the numbers array, the answer is automatically true, as one added to itself enough times will end up hitting
the target eventually.

const canSum = (target, nums, memo={}) => {
  if(memo[target] !== undefined) return memo[target]
  if(nums.includes(1) || target === 0) return true;
  if(target < 0) return false;
  
  for (let num of nums) {
    const remainder = target - num
    memo[remainder] = canSum(remainder, nums, memo)
    if(memo[remainder]) return true
  }
  return false;
}

console.log(canSum(300, [7,14]))


Problem 4: howSum
*/