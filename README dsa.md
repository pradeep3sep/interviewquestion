> ### The Big O
The Big O is basically `worst-case` running `time` of an `algorithm` as the input size increases

```
https://www.bigocheatsheet.com/
```

<br>

> ### The difference between various notations
The differences between the time complexities \(O(1)\), \(O(\log n)\), \(O(n)\), \(O(n \log n)\), and \(O(n^2)\) describe how the runtime of an algorithm scales with the size of the input \(n\). Here's a breakdown of each:

1. **\(O(1)\) - Constant Time Complexity**:
   - The runtime of the algorithm does not depend on the input size. No matter how large \(n\) is, it always takes a constant amount of time to complete.
   - Example: Accessing an element in an array by index, such as `arr[5]`.

2. **\(O(\log n)\) - Logarithmic Time Complexity**:
   - The runtime grows logarithmically as the input size increases. This often occurs in `divide-and-conquer` algorithms, where the problem is split into smaller chunks.
   - Example: Binary search on a sorted array.

3. **\(O(n)\) - Linear Time Complexity**:
   - The runtime `increases linearly` with the input size. If \(n\) doubles, the time taken also doubles.
   - Example: Iterating over an array of size \(n\).

4. **\(O(n \log n)\) - Linearithmic Time Complexity**:
   - The runtime grows faster than linear but slower than quadratic. This time complexity often appears in more efficient sorting algorithms.
   - Example: Merge Sort, Quick Sort (average case).

5. **\(O(n^2)\) - Quadratic Time Complexity**:
   - The runtime grows quadratically as the input size increases. If \(n\) doubles, the time taken increases by a factor of four. This happens when you have `nested loops` over the same input.
   - Example: Bubble Sort, Selection Sort.

### Summary of Growth:
- \(O(1)\) < \(O(\log n)\) < \(O(n)\) < \(O(n \log n)\) < \(O(n^2)\)

As the input size \(n\) increases, algorithms with better time complexity (lower \(O()\)) will perform more efficiently.

Let me know if you'd like specific examples or further clarifications on any of these!


<br>


> ### array vs linked list table in terms of BIG O

Sure, here’s a comparison of arrays and linked lists in terms of Big O notation for various common operations:

| **Operation**          | **Array**                      | **Linked List**                 |
|------------------------|--------------------------------|---------------------------------|
| **Access (by index)**  | \O(1)\                          | \(O(n)\)                         |
| **Search (by value)**  | \O(n)\                          | \(O(n)\)                         |
| **Insertion (at end)** | \O(1)\ (amortized)            | \(O(1)\) (if pointer to end)     |
| **Insertion (at start)**| \O(n)\                       | \(O(1)\)                         |
| **Insertion (at index)**| \O(n)\                       | \(O(n)\)                         |
| **Deletion (by index)** | \O(n)\                       | \(O(n)\)                         |
| **Deletion (by value)** | \O(n)\                       | \(O(n)\)                         |
| **Removing from beginning** | \O(n)\                   | \O(1)\                           |

### Explanation:

1. **Access (by index)**:
   - **Array**: Direct access to elements by index, which is \(O(1)\).
   - **Linked List**: Requires traversal from the head to the desired index, which is \(O(n)\).

2. **Search (by value)**:
   - **Array**: Requires scanning through elements in the worst case, which is \(O(n)\).
   - **Linked List**: Also requires scanning through nodes, which is \(O(n)\).

3. **Insertion (at end)**:
   - **Array**: If there's space, insertion is \(O(1)\). If resizing is required, it’s \(O(n)\) but amortized time is \(O(1)\).
   - **Linked List**: Insertion at the end is \(O(1)\) if a tail pointer is maintained.

4. **Insertion (at start)**:
   - **Array**: Requires shifting elements to accommodate the new element, which is \(O(n)\).
   - **Linked List**: Insertion at the start is \(O(1)\).

5. **Insertion (at index)**:
   - **Array**: Requires shifting elements to accommodate the new element, which is \(O(n)\).
   - **Linked List**: Requires traversal to the insertion point, which is \(O(n)\).

6. **Deletion (by index)**:
   - **Array**: Requires shifting elements to fill the gap left by the deleted element, which is \(O(n)\).
   - **Linked List**: Requires traversal to the deletion point, which is \(O(n)\).

7. **Deletion (by value)**:
   - **Array**: Requires finding the element and then shifting elements to fill the gap, which is \(O(n)\).
   - **Linked List**: Requires traversal to find the element and then adjusting pointers, which is \(O(n)\).

These complexities highlight the trade-offs between arrays and linked lists, with arrays typically offering better performance for random access and linked lists providing efficient insertion and deletion operations.


> ### Single linked list

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
