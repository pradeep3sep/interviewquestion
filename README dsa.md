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
| **Access (by index)**  | \(O(1)\)                        | \(O(n)\)                         |
| **Search (by value)**  | \(O(n)\)                        | \(O(n)\)                         |
| **Insertion (at end)** | \(O(1)\) (amortized)            | \(O(1)\) (if pointer to end)     |
| **Insertion (at start)**| \(O(n)\)                       | \(O(1)\)                         |
| **Insertion (at index)**| \(O(n)\)                       | \(O(n)\)                         |
| **Deletion (by index)** | \(O(n)\)                       | \(O(n)\)                         |
| **Deletion (by value)** | \(O(n)\)                       | \(O(n)\)                         |

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
