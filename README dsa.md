> ### The Big O
The Big O is basically `worst-case` running `time` of an `algorithm` as the input size increases

```
https://www.bigocheatsheet.com/
```

<br>

> ### The difference between various notations
The differences between the time complexities \(O(1)\), \(O(\log n)\), \(O(n)\), \(O(nlog n)\), and \(O(n^2)\) describe how the runtime of an algorithm scales with the size of the input \(n\). Here's a breakdown of each:

1. **\(O(1)\) - Constant Time Complexity**:
   - The runtime of the algorithm does not depend on the input size. No matter how large \(n\) is, it always takes a constant amount of time to complete.
   - Example: Accessing an element in an array by index, such as `arr[5]`.

2. **\(O(log n)\) - Logarithmic Time Complexity**:
   - The runtime grows logarithmically as the input size increases. This often occurs in `divide-and-conquer` algorithms, where the problem is split into smaller chunks.
   - Example: Binary search on a sorted array.

3. **\(O(n)\) - Linear Time Complexity**:
   - The runtime `increases linearly` with the input size. If \(n\) doubles, the time taken also doubles.
   - Example: Iterating over an array of size \(n\).

4. **\(O(n log n)\) - Linearithmic Time Complexity**:
   - The runtime grows faster than linear but slower than quadratic. This time complexity often appears in more efficient sorting algorithms.
   - Example: Merge Sort, Quick Sort (average case).

5. **\(O(n^2)\) - Quadratic Time Complexity**:
   - The runtime grows quadratically as the input size increases. If \(n\) doubles, the time taken increases by a factor of four. This happens when you have `nested loops` over the same input.
   - Example: Bubble Sort, Selection Sort.

### Summary of Growth:
- \(O(1)\) < \(O(log n)\) < \(O(n)\) < \(O(n log n)\) < \(O(n^2)\)

<br>


> ### Array vs Linked list table in terms of BIG O

| Operation  | Array (Big O) | Linked List (Big O) |
|------------|---------------|---------------------|
| **Pop**    | O(1)          | O(n)                |
| **Push**   | O(1)          | O(n)                |
| **Shift**  | O(n)          | O(1)                |
| **Unshift**| O(n)          | O(1)                |
| **Reverse**| O(n)          | O(n)                |
| **Insert** | O(n)          | O(n)                |
| **Update** | O(1)          | O(n)                |

<br>

> ## Single linked list

> ### Linked List node

In linked list we have basic unit called `node` and below is the basic structure for the same

```js
// let node is 4

{
    value: 4,
    next: null
}
```

Each linked list have the `head node`,`tail node`, along with `length` property.


```js
class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class LinkedList {
    constructor(value){
        const newNode = new Node(value)
        this.head = newNode
        this.tail = this.head
        this.length = 1
    }

    push(value){
        const newNode = new Node(value)
        
        if(!this.head){
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++

        return this
    }

    pop(){
        // When there is no head
        if(!this.head) return undefined

        // when there is head in linked LinkedList
        let temp = this.head
        let pre = this.head

        while(temp.next){
            pre = temp
            temp = temp.next
        }

        this.tail = pre
        this.tail.next = null
        this.length--

        // for handling if deleting node, it empties the linked list
        if(this.length === 0){
            this.head = null
            this.tail = null
        }

        return temp
    }

    unshift(value){
        const newNode = new Node(value)

        // when there is no head
        if(!this.head){
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.next = this.head
            this.head = newNode
        }
        this.length++
        return this
    }

    shift(){
        
        // When there is no head
        if(!this.head) return undefined

        let temp = this.head
        this.head = this.head.next
        temp.next = null
        this.length--

        // below is for, if we are removing the last node of linked list
        if(this.length === 0){
            this.tail = null
        }

        // below is for returning the delted value
        return temp
    }

    get(index){
        // for handling the value whose index is not in the range
        if(index < 0 || index >= this.length){
            return undefined
        }

        let temp = this.head
        for(let i=0; i<index; i++){
            temp = temp.next
        }
        return temp
    }

    set(index, value){
        let temp = this.get(index)
        if(temp){
            temp.value = value
            return true
        }
        return false
    }

    insert(index, value){
        // for handling if added to initial or starting position
        if(index === 0) return this.unshift(value)

        // for handling, if added to end of linked list
        if(index === this.length) return this.push(value)

        // for handling, if index passed which is out of range of linked list
        if(index < 0 || index > this.length) return false

        const newNode = new Node(value)
        const temp = this.get(index-1)

        newNode.next = temp.next
        temp.next = newNode
        this.length++
        return true
    }

    remove(index){
        // for handling if added to initial or starting position
        if(index === 0) return this.shift()

        // for handling, if added to end of linked list
        if(index === this.length) return this.pop()

        // for handling, if index passed which is out of range of linked list
        if(index < 0 || index > this.length) return false

        const before = this.get(index - 1)
        const temp = before.next()

        before.next = temp.next
        temp.next = null
        this.length--

        return temp
    }

    reverse(){
        let temp = this.head
        this.head = this.tail
        this.tail = temp

        let next = temp.next
        let prev = null

        for(let i=0; i<this.length; i++){
            next = temp.next
            temp.next = prev
            prev = temp
            temp = next
        }

        return this
    }
}

let myLinkedList = new LinkedList(1)
myLinkedList.push(2)

```

> ### Double linked list

```js
class Node {
    constructor(value){
        this.value = value
        this.next = null
        this.prev = null
    }
}

class DoublyLinkedList {
    constructor(value){
        const newNode  = new Node(value)
        this.head = newNode
        this.tail = newNode
        this.length = 1
    }

    push(value){
        const newNode  = new Node(value)

        if(!this.head){
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail.next = newNode
            newNode.prev = this.tail
            this.tail = newNode
        }

        this.length++
        return this
    }

    pop(){
        if(this.length === 0) return undefined

        let temp = this.tail

        if(this.length === 1){
            this.head = null
            this.tail = null
        } else {
            this.tail = this.tail.prev
            this.tail.next = null
            temp.prev = null
        }
        this.length--
        return temp
    }

    unshift(value){
        const newNode  = new Node(value)

        if(this.length === 0){
            this.head = newNode
            this.tail = newNode
        }else {
            newNode.next = this.head
            this.head.prev = newNode
            this.head = newNode
        }
        this.length++
        return this
    }

    shift(){
        if(this.length === 0) return undefined

        let temp = this.head

        if(this.length === 1){
            this.head = null
            this.tail = null
        } else {
            this.head = this.head.next
            this.head.prev = null
            temp.next = null
        }
        this.length++
        return temp
    }

    get(index){
        // to handle out of range index
        if(index < 0 || index >= this.length) return undefined

        let temp

        // here linked list is bind in two direction, we will find short path at tail and head, then traverse accordingly

        if(index < this.length/2){
            temp = this.head

            for(let i=0; i<index; i++){
                temp = temp.next
            }
        } else {
            temp = this.tail

            for(let i=this.length-1; i>index; i--){
                temp = temp.prev
            }
        }

        return temp
    }

    set(index,value){
        let temp = this.get(index)

        if(temp){
            temp.value = value
            return true
        }

        return false
    }

    insert(index,value){
        if(index === 0) return this.unshift(value)
        if(index === this.length) return this.push(value)
        if(index < 0 || index > this.length) return false

        const newNode = new Node(value)
        const before = this.get(index - 1)
        const after = before.next
        before.next = newNode
        newNode.prev = before
        newNode.next = after
        after.prev = newNode
        this.length++
        return true
        
    }

    remove(index){
        if(index === 0) return this.shift()
        if(index === this.length - 1) return this.pop()
        if(index < 0 || index > this.length) return undefined

        const temp = this.get(index)

        temp.prev.next = temp.next
        temp.next.prev = temp.prev
        temp.next = null
        temp.prev = null

        this.length--
        return temp
    }
}

let myDoublyLinkedList = new DoublyLinkedList(7)
myDoublyLinkedList
```


> ### Stacks and Queues

```js
// stack is like linked list, with head named as top and available at top position. basically vertically alingned of linked list
// entry and exist on same side
class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Stack {
    constructor(value){
        const newNode = new Node(value)
        this.top = newNode
        this.length = 1
    }

    // push is like unshift of linked list
    push(value){
        const newNode = new Node(value)
        if(this.length === 0){
            this.top = newNode
        } else {
            newNode.next = this.top
            this.top = newNode
        }
        this.length++
        return this
    }

    pop(){
        if(this.length === 0) return undefined

        let temp = this.top
        this.top = this.top.next
        temp.next = null

        this.length--
        return temp
    }
}

let myStack = new Stack(11)


// Queue is like linked list with FIFO.
// entry and exit are on opposite side
class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Queue {
    constructor(value){
        const newNode = new Node(value)
        this.first = newNode
        this.last = newNode
        this.length = 1
    }

    enqueue(value){
        const newNode = new Node(value)
        if(this.length === 0){
            this.first = newNode
            this.last = newNode
        } else {
            this.last.next = newNode
            this.last = newNode
        }
        this.length++
        return this
    }

    dequeue(){
        if(this.length === 0) return undefined

        let temp = this.first
        if(this.length === 1){
            this.first = null
            this.last = null
        } else {
            this.first = this.first.next
            temp.next = null
        }
        this.length--
        return temp
    }
}

let myQueue = new Queue(4)
myQueue
```


> ### Binary search tree

```js
// Trees

// Full Tree - Every item either points to two nodes or zero nodes

// Leaf nodes - there the nodes which do not have parents

// In binary search tree - if child is greater than parent it goes to right else goes to left.
// when we add any node we start comparing from the top.

// When traversing(lookup, insert,remove) through the BST, it is O(logn), it is because in BST, the right side is always greater than the left side,
// so it will be divide and conquere(diving in half in each level) so becomes the O(log n)
// sometime in BST, every node is added in right side means always it is bigger than parent, in that scenario it will become O(n)


class Node(value){
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}

class BST {
    constructor(){
        this.root = null
    }

    insert(value){
        const newNode = new Node(value)

        // If BST do not have any node or root node
        if(this.root === null){ 
            this.root = newNode
            return this
        }

        // travesing the node
        let temp = this.root
        while(true){

            // for handling, adding duplicate node
            if(newNode.value === temp.value) return undefined

            if(newNode.value < temp.value){
                
                // if left side has no value
                if(temp.left === null){
                    temp.left = newNode
                    return this
                }

                // if left side has value
                temp = temp.left
            } else {

                // if right side has no value
                if(temp.right === null){
                    temp.right = newNode
                    return this
                }

                // if right side has value
                temp = temp.right
            }
        }
    }

    contains(value){
        // for handling if there is no root node
        if(this.root === null) return false

        let temp = this.root
        while(temp){
            if(value < temp.value){
                temp = temp.left
            } else if(value > temp.value){
                temp = temp.right
            } else {
                return true
            }
        }

        return false
    }
}

let myTree = new BST()
myTree

```


> ###  Hash Table

```js
// A hash table uses a hash function to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found.
// common example of hash table is object in JS.


// charactristics of hashes
// 1. They are one way
// 2. Hashes are deterministic, means if you run nails through this equation and it produces the number, the next time you run nails it will produce same number

// collision - It is a situation when we have an item that maps to that same spot in memory

// hash function always give the same number when same input is passed through it

// If we have a prime number. we get a more randomized distribution of the items, which is optimal.

// Big O of hash table

// - Access    => O(1) || O(n). (keep in we are here considering key not the value lookup)
// - Insert    => O(1).
// - Delete    => O(1).

class HashTable {
    constructor(size = 7){
        this.dataMap = new Array(size)
    }

    _hash(key){
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length
        }
        return hash
    }

    // O(1)
    set(key, value){
        let index = this._hash(key)
        if(!this.dataMap[index]){
            this.dataMap[index] = []  // O(1)
        }
        this.dataMap[index].push([key, value]) // O(1)
        return this
    }

    // O(1) || O(n)
    get(key) {
        // we get the index position in table
        let index = this._hash(key) // O(1)
    
        if (this.dataMap(index)) {

            // Here we are looping becuse at particular index we have two or more data
            for (let i = 0; i < this.dataMap[index].length; i++) { // O(1) || O(n)
                if (this.dataMap[index][i][0] === key) {
                    return this.dataMap[index][i][1]
                }
            }
            return undefined // O(1)
        }
    }

    keys(){
        let allKeys = []

        for (let i = 0; i < this.dataMap.length; i++) {
            if(this.dataMap[i]){
                for (let j = 0; j < this.dataMap[i].length; j++) {
                    allKeys.push(this.dataMap[i][j][0])
                }
            }
        }
        return allKeys
    }
}

let myHashtable = new HashTable()
myHashtable

```


```js

// Graphs are bifirectional,
// when adjacency matrix is formed in graps, it is symmetrical in shape
// we create the adjacency list in object form.
// adjacency list is much more easy to maintain and much efficient so we will use this

// Below is basic structure
{
    vertex: [edge1, edge2]
}


// Graph code is below

class Graph {
    constructor(){
        this.adjacencyList = {}
    }

    addVertex(vertex){
        if(!this.adjacencyList[vertex]){
            this.adjacencyList[vertex] = []
            return true
        }
        return false
    }

    addEdge(vertex1, vertex2){
        if(this.adjacencyList[vertex1] && this.adjacencyList[vertex2]){
            this.adjacencyList[vertex1].push(vertex2)
            this.adjacencyList[vertex2].push(vertex1)
            return true
        }
        return false
    }

    removeEdge(vertex1, vertex2){
        if(this.adjacencyList[vertex1] && this.adjacencyList[vertex2]){
            this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v !== vertex2)
            this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v !== vertex1)
            return true
        }
        return false
    }

    removeVertex(vertex){
        if(!this.adjacencyList[vertex]) return undefined

        while(this.adjacencyList[vertex].length){
            let temp = this.adjacencyList[vertex].pop()
            this.removeEdge(vertex, temp)
        }

        delete this.adjacencyList[vertex]
        return this
        
    }
}

let myGraph = new Graph()
myGraph


// Heaps
// Heap is like binary tree, but numbers are laid out in a different way
// Each node has a value that is greater than each of its descendants, max value is at top.
// heap can have duplicate node while binary tree do not.
// when we add any value in heap, we add left to right and then we bubble up the heap, means repositioning so that highest be at the top


class Heap {
    #heap = [];

    insert(value){
        // here we added value
        this.#heap.push(value)

        // below we are bubbling up

        let current = this.#heap.length - 1  // it is index

        while(current > 0 && this.#heap[current] > this.#heap[this.#parent(current)]){
            this.#swap(current, this.#parent(current))
            current = this.#parent(current)
        }
    }

    remove(){
        if(this.#heap.length === 0){
            return null
        }

        if(this.#heap.length === 1){
            return this.#heap.pop()
        }

        const maxValue = this.#heap[0]
        this.#heap[0] = this.#heap.pop()
        this.#sinkDown(0)

        return maxValue
    }

    // sinkdown is rearranging the value in downward direction
    #sinkDown(index) {
        let maxIndex = index;
        let size = this.#heap.length;
        
        while (true) {
            let leftIndex = this.#leftChild(index);
            let rightIndex = this.#rightChild(index);
            
            if (leftIndex < size && this.#heap[leftIndex] > this.#heap[maxIndex]) {
                maxIndex = leftIndex;
            }
            
            if (rightIndex < size && this.#heap[rightIndex] > this.#heap[maxIndex]) {
                maxIndex = rightIndex;
            }
            
            if (maxIndex !== index) {
                this.#swap(index, maxIndex);
                index = maxIndex;
            } else {
                return;
            }
        }
    
    }

    

    getHeap(){
        return [...this.#heap]
    }
    
    #leftChild(index){
        return 2 * index + 1
    }

    #rightChild(index){
        return 2 * index + 2
    }

    #parent(index){
        return Math.floor((index - 1) / 2)
    }

    #swap(index1, index2){
        [this.#heap[index1], this.#heap[index2]] = [this.#heap[index2], this.#heap[index1]]
    }
}


// Tree Traversal

// BFS - Breadth First Search - is a vertex-based technique for finding the shortest path in the graph. 
// It uses a `Queue data structure` that follows `first in first out`. 
// In BFS, Root ko lete h queue me then usko result me push kr dete h, then root k left and right ko lete h then usko Queue me push kar dete h, then first jo queue me add kia thota h usko results me push kr dete h, jisko push kia h uske left and right ko Queue me add kr dete h 
// It is slower than DFS.

BFS() {
    let currentNode = this.root;
    let queue = [];
    let results = [];

    queue.push(currentNode);

    while (queue.length) {
        currentNode = queue.shift();
        results.push(currentNode.value);

        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
    }

    return results;
}


// DFS - Depth First Search - is an an edge-based technique. 
// It uses the Stack data structure and performs two stages, first visited vertices are pushed into the stack, and second if there are no vertices then visited vertices are popped.

// DFS is of 3 types - Preorder Traversal, Inorder Traversal, Postorder Traversal


// Algorithm for Preorder Traversal:

// Visit the root.
// Traverse the left subtree, i.e., call Preorder(left->subtree)
// Traverse the right subtree, i.e., call Preorder(right->subtree)

DFSPreOrder() {
    let results = [];

    function traverse(currentNode) {
        results.push(currentNode.value);

        if (currentNode.left) traverse(currentNode.left);
        if (currentNode.right) traverse(currentNode.right);
    }

    traverse(this.root);
    return results;
}


// Algorithm for Postorder Traversal:

// Traverse the left subtree, i.e., call Postorder(left->subtree)
// Traverse the right subtree, i.e., call Postorder(right->subtree)
// Visit the root

DFSPostOrder() {
    let results = [];

    function traverse(currentNode) {
        if (currentNode.left) traverse(currentNode.left);
        if (currentNode.right) traverse(currentNode.right);

        results.push(currentNode.value);
    }

    traverse(this.root);
    return results;
}

// Algorithm for Inorder Traversal:

// Traverse the left subtree, i.e., call Inorder(left->subtree)
// Visit the root.
// Traverse the right subtree, i.e., call Inorder(right->subtree)

DFSInOrder() {
    let results = [];

    function traverse(currentNode) {
        if (currentNode.left) traverse(currentNode.left);
        
        results.push(currentNode.value);
        
        if (currentNode.right) traverse(currentNode.right);   
    }

    traverse(this.root);
    return results;
}


// Dynamic Programming or DP

// Dynamic Programming is a method used in mathematics and computer science to solve complex problems by breaking them down into simpler subproblems. 
// By solving each `subproblem only once and storing the results`, it `avoids redundant computations`, leading to more efficient solutions for a wide range of problems.

// How Does Dynamic Programming (DP) Work?
// - Identify Subproblems: Divide the main problem into smaller, independent subproblems.
// - Store Solutions: Solve each subproblem and store the solution in a table or array.
// - Build Up Solutions: Use the stored solutions to build up the solution to the main problem.
// - Avoid Redundancy: By storing solutions, DP ensures that each subproblem is solved only once, reducing computation time.

// When to Use Dynamic Programming (DP)?
// 1. Optimal Substructure: Optimal substructure means that we combine the optimal results of subproblems to achieve the optimal result of the bigger problem
// 2. Overlapping Subproblems: The same subproblems are solved repeatedly in different parts of the problem.


// example: 
// if we have taken example for fibnanchi series, then below code will be O(2^n).
// fib of 20 gives 6765 function calls

// https://www.geeksforgeeks.org/dynamic-programming/

let counter = 0
function fib(n){
    counter++

    if(n === 0 || n === 1){
        return n
    }
    return fib(n-1) + fib(n-2)
}
fib(20)


// now we optimzed through DP(using memoization), fib of 20 gives 39 function calls
let memo = [];
let counter = 0;

function fib(n) {
    counter++;
    if (memo[n] !== undefined) {
        return memo[n];
    }
    if (n === 0 || n === 1) {
        return n;
    }
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
}

let n = 20;

console.log('\nFib of', n, '=', fib(n));
console.log('\nCounter:', counter);



// In above case we are filling the array from the right side to left side, but below code fills from left to right side, which is much more optimized
// fib of 20 gives 19 function calls
let counter = 0;

function fib(n) {
    let fibList = [];
    fibList[0] = 0;
    fibList[1] = 1;

    for (let index = 2; index <= n; index++) {
        counter++;
        fibList[index] = fibList[index - 1] + fibList[index - 2];
    }

    return fibList[n];
}

let n = 7;

console.log('\nFib of', n, '=', fib(n));

console.log('\nCounter:', counter);
```

```js
// Below are the basic sorts( bubble sort, selection sort, insertion sort)


// Bubble sort
// Bubble sort algorithm is an algorithm that sorts an array by comparing two adjacent elements and swapping them if they are not in the intended order. 
// Here order can be anything like increasing or decreasing.
// Bubble sort compares the element from index 0 and if the 0th index value is greater than 1st index value, then the values get swapped and if the 0th index value is less than the 1st index value, then nothing happens.

// Next, the 1st index value compares to the 2nd index value, and then the 2nd index value compares to the 3rd index value, and so on…


function bubbleSort(array) {
  const n = array.length;
  for (let i = n - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Destructuring to swap
      }
    }
  }
  return array;
}


// Selection sort
// The algorithm repeatedly selects the smallest (or largest) element from the unsorted portion of the list and swaps it with the first element of the unsorted part. This process is repeated for the remaining unsorted portion until the entire list is sorted.


function selectionSort(array) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[min]) min = j;
    }
    if (i !== min) {
      [array[i], array[min]] = [array[min], array[i]]; // Destructuring to swap
    }
  }
  return array;
}
```
