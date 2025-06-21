const topicData = {
  dsa: {
arrays: {
  title: "Arrays",
  definition: "Arrays are linear data structures that store elements in contiguous memory locations. They allow indexed access using 0-based indexing.",
  types: [
    "Static Array (fixed size)",
    "Dynamic Array (resizable, like ArrayList in Java)",
    "1D Array, 2D Array (Matrix), Multi-dimensional"
  ],
  subtopics: [
    "Searching (Linear, Binary)",
    "Sorting (Bubble, Insertion, Merge)",
    "Prefix Sum & Difference Array",
    "2D Arrays & Matrix Traversal",
    "Frequency Arrays"
  ],
  code:
`int[] arr = {1, 2, 3, 4};
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}`,
  dryRun:
`Input: [1, 2, 3]
Index i=0 → arr[0]=1
Index i=1 → arr[1]=2
Index i=2 → arr[2]=3`,
leetcode: [
  {
    title: "Kadane's Algorithm – Maximum Subarray",
    description: "Find the contiguous subarray within a one-dimensional array of numbers which has the largest sum.",
    solution: 
`int maxSum = arr[0], curr = arr[0];
for (int i = 1; i < arr.length; i++) {
    curr = Math.max(arr[i], curr + arr[i]);
    maxSum = Math.max(maxSum, curr);
}`
  },
  {
    title: "Two Pointer – Reverse Array or Palindrome Check",
    description: "Use two pointers to process or compare elements from both ends of an array.",
    solution:
`int i = 0, j = arr.length - 1;
while(i < j) {
    // check or process arr[i] & arr[j]
    i++; j--;
}`
  },
  {
    title: "Sliding Window – Maximum Sum of Subarray of Size K",
    description: "Find the maximum sum of a subarray with size K.",
    solution:
`int sum = 0, max = 0;
for (int i = 0; i < k; i++) sum += arr[i];
max = sum;
for (int i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    max = Math.max(max, sum);
}`
  },
  {
    title: "Prefix Sum – Range Sum Query",
    description: "Calculate prefix sums to answer range sum queries efficiently.",
    solution:
`int[] prefix = new int[n];
prefix[0] = arr[0];
for(int i = 1; i < n; i++) {
    prefix[i] = prefix[i-1] + arr[i];
}`
  },
  {
    title: "HashMap – Frequency Counter",
    description: "Use a HashMap to count frequency of each element in an array.",
    solution:
`Map<Integer, Integer> map = new HashMap<>();
for(int num : arr) {
    map.put(num, map.getOrDefault(num, 0) + 1);
}`
  },
  {
    title: "Sorting + Two Pointer – 3Sum (Triplets)",
    description: "Find all unique triplets in the array which gives the sum of zero.",
    solution:
`Arrays.sort(arr);
for(int i = 0; i < arr.length - 2; i++) {
    int left = i + 1, right = arr.length - 1;
    while(left < right) {
        int sum = arr[i] + arr[left] + arr[right];
        // process sum
        if (sum < 0) left++;
        else right--;
    }
}`
  },
  {
    title: "Binary Search – Search in Sorted Array",
    description: "Find the index of a target element using binary search.",
    solution:
`int low = 0, high = arr.length - 1;
while(low <= high) {
    int mid = low + (high - low) / 2;
    if(arr[mid] == target) return mid;
    else if(arr[mid] < target) low = mid + 1;
    else high = mid - 1;
}`
  },
  {
    title: "Trapping Rain Water – Left/Right Max Arrays",
    description: "Given n non-negative integers representing an elevation map, compute how much water it can trap.",
    solution:
`int[] left = new int[n], right = new int[n];
left[0] = arr[0]; right[n-1] = arr[n-1];
for(int i = 1; i < n; i++) left[i] = Math.max(left[i-1], arr[i]);
for(int i = n-2; i >= 0; i--) right[i] = Math.max(right[i+1], arr[i]);
for(int i = 0; i < n; i++) {
    water += Math.min(left[i], right[i]) - arr[i];
}`
  },
  {
    title: "Dutch National Flag – Sort 0s, 1s, 2s",
    description: "Sort an array consisting only of 0s, 1s, and 2s in linear time using three-way partitioning.",
    solution:
`int low = 0, mid = 0, high = arr.length - 1;
while(mid <= high) {
    if(arr[mid] == 0) swap(arr, low++, mid++);
    else if(arr[mid] == 1) mid++;
    else swap(arr, mid, high--);
}`
  },
  {
    title: "Set – Detect Duplicates",
    description: "Check if any value appears more than once using a Set.",
    solution:
`Set<Integer> set = new HashSet<>();
for(int num : arr) {
    if(set.contains(num)) return true;
    set.add(num);
}`
  }
]
},
stack: {
  title: "Stack",
  definition:
    "📘 Stack is a linear data structure that follows the LIFO (Last In First Out) principle. The element inserted last is accessed or removed first.",
  types: [
    "Array-based Stack",
    "Linked List-based Stack",
    "Built-in Stack (like Java's Stack class)"
  ],
  subtopics: [
    "Basic Operations: push, pop, peek, isEmpty",
    "Valid Parentheses (Balanced Brackets)",
    "Next Greater Element (Monotonic Stack)",
    "Min Stack Problem",
    "Infix to Postfix Conversion",
    "Reverse a Stack using Recursion",
    "Stack using Array or Linked List"
  ],
  methods: [
    "push(item) – Add element to top",
    "pop() – Remove top element",
    "peek() – View top element",
    "isEmpty() – Check if stack is empty"
  ],
  codeExample: `Stack<Integer> stack = new Stack<>();
stack.push(10);
stack.push(20);
System.out.println(stack.pop());`,
  dryRun: `stack.push(10) → [10]
stack.push(20) → [10, 20]
stack.pop() → returns 20 → [10]`,
  leetcode: [
    {
      title: "✔️ Valid Parentheses",
      description: "LeetCode #20",
      solution: `Stack<Character> stack = new Stack<>();
for (char ch : s.toCharArray()) {
  if (ch == '(' || ch == '{' || ch == '[') stack.push(ch);
  else {
    if (stack.isEmpty()) return false;
    char top = stack.pop();
    if ((ch == ')' && top != '(') ||
        (ch == '}' && top != '{') ||
        (ch == ']' && top != '[')) return false;
  }
}
return stack.isEmpty();`
    },
    {
      title: "✔️ Next Greater Element",
      description: "LeetCode #496",
      solution: `Stack<Integer> stack = new Stack<>();
int[] res = new int[nums.length];
for (int i = nums.length - 1; i >= 0; i--) {
  while (!stack.isEmpty() && stack.peek() <= nums[i]) stack.pop();
  res[i] = stack.isEmpty() ? -1 : stack.peek();
  stack.push(nums[i]);
}`
    },
    {
      title: "✔️ Min Stack",
      description: "LeetCode #155",
      solution: `Stack<Integer> main = new Stack<>();
Stack<Integer> min = new Stack<>();
void push(int x) {
  main.push(x);
  if (min.isEmpty() || x <= min.peek()) min.push(x);
}
void pop() {
  if (main.pop().equals(min.peek())) min.pop();
}
int getMin() {
  return min.peek();
}`
    },
    {
      title: "✔️ Reverse a Stack using Recursion",
      solution: `void reverse(Stack<Integer> st) {
  if (st.isEmpty()) return;
  int x = st.pop();
  reverse(st);
  insertAtBottom(st, x);
}
void insertAtBottom(Stack<Integer> st, int x) {
  if (st.isEmpty()) {
    st.push(x);
    return;
  }
  int y = st.pop();
  insertAtBottom(st, x);
  st.push(y);
}`
    }
  ]
},
queue: {
  title: "Queue",
  definition:
    "📘 Queue is a linear data structure that follows the FIFO (First In First Out) principle. The element inserted first is removed first.",
  types: [
    "Linear Queue",
    "Circular Queue",
    "Deque (Double Ended Queue)",
    "Priority Queue (Min/Max Heap based)",
    "Queue using Stack",
    "Built-in Queue (like Java’s LinkedList/Queue interface)"
  ],
  subtopics: [
    "Basic Operations: enqueue, dequeue, peek, isEmpty",
    "Implement Queue using Array / LinkedList",
    "Circular Queue Implementation",
    "Queue using Stack",
    "Sliding Window Maximum using Deque",
    "Rotten Oranges (Multi-source BFS)",
    "Level Order Traversal (Tree)",
    "First Non-Repeating Character in Stream"
  ],
  methods: [
    "enqueue(item) – Add item to rear",
    "dequeue() – Remove item from front",
    "peek() – View item at front",
    "isEmpty() – Check if queue is empty"
  ],
  codeExample: `Queue<Integer> queue = new LinkedList<>();
queue.add(10);
queue.add(20);
System.out.println(queue.remove());`,
  dryRun: `queue.add(10) → [10]
queue.add(20) → [10, 20]
queue.remove() → returns 10 → [20]`,
  leetcode: [
    {
      title: "✔️ Implement Queue using Stacks",
      description: "LeetCode #232",
      solution: `Stack<Integer> input = new Stack<>();
Stack<Integer> output = new Stack<>();

public void push(int x) {
  input.push(x);
}

public int pop() {
  if (output.isEmpty())
    while (!input.isEmpty())
      output.push(input.pop());
  return output.pop();
}

public int peek() {
  if (output.isEmpty())
    while (!input.isEmpty())
      output.push(input.pop());
  return output.peek();
}

public boolean empty() {
  return input.isEmpty() && output.isEmpty();
}`
    },
    {
      title: "✔️ Sliding Window Maximum using Deque",
      description: "LeetCode #239",
      solution: `Deque<Integer> deque = new ArrayDeque<>();
int[] res = new int[nums.length - k + 1];
for (int i = 0; i < nums.length; i++) {
  if (!deque.isEmpty() && deque.peek() == i - k)
    deque.poll();
  while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i])
    deque.pollLast();
  deque.offer(i);
  if (i >= k - 1) res[i - k + 1] = nums[deque.peek()];
}`
    },
    {
      title: "✔️ Rotten Oranges (Multi-Source BFS)",
      description: "LeetCode #994",
      solution: `Queue<int[]> queue = new LinkedList<>();
int fresh = 0, time = 0;
for (int i = 0; i < grid.length; i++) {
  for (int j = 0; j < grid[0].length; j++) {
    if (grid[i][j] == 2) queue.add(new int[]{i, j});
    else if (grid[i][j] == 1) fresh++;
  }
}
int[][] dirs = {{0,1},{1,0},{-1,0},{0,-1}};
while (!queue.isEmpty() && fresh > 0) {
  int size = queue.size();
  for (int i = 0; i < size; i++) {
    int[] pos = queue.poll();
    for (int[] d : dirs) {
      int x = pos[0] + d[0], y = pos[1] + d[1];
      if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length || grid[x][y] != 1) continue;
      grid[x][y] = 2;
      queue.add(new int[]{x, y});
      fresh--;
    }
  }
  time++;
}
return fresh == 0 ? time : -1;`
    },
    {
      title: "✔️ First Non-Repeating Character in Stream",
      description: "LeetCode #387 / variation of #1425",
      solution: `int[] freq = new int[26];
Queue<Character> q = new LinkedList<>();
for (char ch : stream) {
  freq[ch - 'a']++;
  q.add(ch);
  while (!q.isEmpty() && freq[q.peek() - 'a'] > 1) {
    q.poll();
  }
  System.out.println(q.isEmpty() ? "#" : q.peek());
}`
    }
  ]
},
"linked-list": {
  title: "Linked List",
  definition:
    "📘 Linked List is a linear data structure where each element (node) points to the next. It allows efficient insertion and deletion from any position (unlike arrays).",
  types: [
    "Singly Linked List",
    "Doubly Linked List",
    "Circular Linked List",
    "Skip List"
  ],
  subtopics: [
    "Node Structure & Initialization",
    "Insert & Delete at Head, Tail, Position",
    "Reverse a Linked List",
    "Detect Cycle (Floyd’s Algo)",
    "Merge Two Sorted Lists",
    "Middle of Linked List (Tortoise Hare)",
    "Remove Nth Node from End",
    "Palindrome Linked List",
    "Linked List Cycle Detection",
    "Intersection Point of Two Lists"
  ],
  methods: [
    "insertAtHead(value) – Add node at beginning",
    "insertAtTail(value) – Add node at end",
    "deleteAtPosition(pos) – Delete node at position",
    "reverse() – Reverse the entire list",
    "printList() – Traverse and print list"
  ],
  codeExample: `class ListNode {
  int val;
  ListNode next;
  ListNode(int x) { val = x; }
}

ListNode head = new ListNode(1);
head.next = new ListNode(2);
System.out.println(head.val);`,
  dryRun: `head = [1] → [2] → null
Access head.val → 1
Access head.next.val → 2`,
  leetcode: [
    {
      title: "✔️ Reverse Linked List",
      description: "LeetCode #206",
      solution: `ListNode prev = null;
ListNode curr = head;
while (curr != null) {
  ListNode nextTemp = curr.next;
  curr.next = prev;
  prev = curr;
  curr = nextTemp;
}
return prev;`
    },
    {
      title: "✔️ Detect Cycle in Linked List",
      description: "LeetCode #141",
      solution: `ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow == fast) return true;
}
return false;`
    },
    {
      title: "✔️ Merge Two Sorted Lists",
      description: "LeetCode #21",
      solution: `ListNode dummy = new ListNode(-1);
ListNode current = dummy;
while (l1 != null && l2 != null) {
  if (l1.val < l2.val) {
    current.next = l1;
    l1 = l1.next;
  } else {
    current.next = l2;
    l2 = l2.next;
  }
  current = current.next;
}
current.next = (l1 != null) ? l1 : l2;
return dummy.next;`
    },
    {
      title: "✔️ Remove Nth Node From End",
      description: "LeetCode #19",
      solution: `ListNode dummy = new ListNode(0);
dummy.next = head;
ListNode first = dummy, second = dummy;
for (int i = 0; i <= n; i++) first = first.next;
while (first != null) {
  first = first.next;
  second = second.next;
}
second.next = second.next.next;
return dummy.next;`
    }
  ]
},
trees: {
  title: "Tree",
  definition:
    "🌳 A Tree is a non-linear hierarchical data structure consisting of nodes, with a single root node and multiple levels of child nodes. It is widely used in hierarchical data representation like file systems, organizational structures, and compilers.",
  types: [
    "Binary Tree",
    "Binary Search Tree (BST)",
    "Balanced Binary Tree (AVL, Red-Black)",
    "N-ary Tree",
    "Segment Tree",
    "Trie (Prefix Tree)"
  ],
  subtopics: [
    "Tree Traversals (Inorder, Preorder, Postorder)",
    "Level Order Traversal (BFS)",
    "Height and Diameter of Tree",
    "Lowest Common Ancestor (LCA)",
    "Check Balanced Tree",
    "Serialize and Deserialize Binary Tree",
    "Binary Search Tree (Insert, Delete, Search)",
    "Convert Sorted Array to BST",
    "Depth vs Height vs Level"
  ],
  methods: [
    "insert(node) – Insert node into the tree (BST)",
    "search(value) – Search for a value",
    "inorder(node) – Left → Root → Right",
    "preorder(node) – Root → Left → Right",
    "postorder(node) – Left → Right → Root",
    "levelOrder(node) – Level by level traversal"
  ],
  code: `class TreeNode {
  int val;
  TreeNode left, right;
  TreeNode(int val) {
    this.val = val;
  }
}

// Inorder Traversal
void inorder(TreeNode root) {
  if (root == null) return;
  inorder(root.left);
  System.out.print(root.val + " ");
  inorder(root.right);
}`,
  dryRun: `Input Tree:
       5
      / \\
     3   7
    / \   \\
   2   4   9

Inorder Traversal: 2 3 4 5 7 9`,
  leetcode: [
    {
      title: "✔️ Binary Tree Inorder Traversal",
      description: "LeetCode #94",
      solution: `List<Integer> res = new ArrayList<>();
void inorder(TreeNode root) {
  if (root == null) return;
  inorder(root.left);
  res.add(root.val);
  inorder(root.right);
}`
    },
    {
      title: "✔️ Maximum Depth of Binary Tree",
      description: "LeetCode #104",
      solution: `int maxDepth(TreeNode root) {
  if (root == null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`
    },
    {
      title: "✔️ Symmetric Tree",
      description: "LeetCode #101",
      solution: `boolean isSymmetric(TreeNode root) {
  return root == null || isMirror(root.left, root.right);
}
boolean isMirror(TreeNode t1, TreeNode t2) {
  if (t1 == null && t2 == null) return true;
  if (t1 == null || t2 == null) return false;
  return t1.val == t2.val
      && isMirror(t1.left, t2.right)
      && isMirror(t1.right, t2.left);
}`
    },
    {
      title: "✔️ Lowest Common Ancestor of BST",
      description: "LeetCode #235",
      solution: `TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
  if (p.val < root.val && q.val < root.val)
    return lowestCommonAncestor(root.left, p, q);
  else if (p.val > root.val && q.val > root.val)
    return lowestCommonAncestor(root.right, p, q);
  else return root;
}`
    }
  ],
  patterns: [
    `✔️ Recursive DFS:
void dfs(TreeNode root) {
  if (root == null) return;
  dfs(root.left);
  // process root
  dfs(root.right);
}`,

    `✔️ BFS using Queue:
Queue<TreeNode> q = new LinkedList<>();
q.add(root);
while (!q.isEmpty()) {
  TreeNode node = q.poll();
  // process node
  if (node.left != null) q.add(node.left);
  if (node.right != null) q.add(node.right);
}`,

    `✔️ Height of Tree:
int height(TreeNode root) {
  if (root == null) return 0;
  return 1 + Math.max(height(root.left), height(root.right));
}`,

    `✔️ Mirror Check:
boolean isMirror(TreeNode a, TreeNode b) {
  if (a == null && b == null) return true;
  if (a == null || b == null) return false;
  return a.val == b.val
    && isMirror(a.left, b.right)
    && isMirror(a.right, b.left);
}`
  ]
},
graphs: {
  title: "Graph",
  definition:
    "📌 A Graph is a non-linear data structure consisting of nodes (vertices) and edges that connect pairs of nodes. Graphs are widely used in networks, maps, social media, and recommendation systems.",
  types: [
    "Undirected Graph",
    "Directed Graph (Digraph)",
    "Weighted Graph",
    "Unweighted Graph",
    "Cyclic & Acyclic Graph",
    "Directed Acyclic Graph (DAG)"
  ],
  subtopics: [
    "Graph Representation (Adjacency List/Matrix)",
    "Depth First Search (DFS)",
    "Breadth First Search (BFS)",
    "Detect Cycle (Directed/Undirected)",
    "Topological Sort (Kahn's Algo / DFS)",
    "Shortest Path Algorithms (Dijkstra, Bellman-Ford)",
    "Minimum Spanning Tree (Prim’s, Kruskal’s)",
    "Disjoint Set (Union-Find)",
    "Strongly Connected Components (Kosaraju's Algo)"
  ],
  methods: [
    "addEdge(u, v) – Connect vertex u with v",
    "DFS(v) – Depth-first traversal",
    "BFS(v) – Breadth-first traversal",
    "isCyclic() – Detects if cycle exists",
    "topoSort() – Returns topological ordering",
    "dijkstra(src) – Finds shortest paths from source"
  ],
  code: `// Adjacency List Representation
List<List<Integer>> graph = new ArrayList<>();
for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
graph.get(0).add(1); // Edge 0 → 1
graph.get(1).add(2); // Edge 1 → 2

// BFS Traversal
Queue<Integer> q = new LinkedList<>();
boolean[] visited = new boolean[n];
q.add(0); visited[0] = true;
while (!q.isEmpty()) {
  int node = q.poll();
  for (int neighbor : graph.get(node)) {
    if (!visited[neighbor]) {
      visited[neighbor] = true;
      q.add(neighbor);
    }
  }
}`,
  dryRun: `Graph: 0 → 1 → 2
Queue: [0]
Visited: [true, false, false]
→ Visit 0 → Queue: [1]
→ Visit 1 → Queue: [2]
→ Visit 2 → Queue: []`,
  leetcode: [
    {
      title: "✔️ Number of Provinces",
      description: "LeetCode #547",
      solution: `void dfs(int[][] isConnected, boolean[] visited, int i) {
  visited[i] = true;
  for (int j = 0; j < isConnected.length; j++) {
    if (isConnected[i][j] == 1 && !visited[j]) dfs(isConnected, visited, j);
  }
}
int findCircleNum(int[][] isConnected) {
  int n = isConnected.length, count = 0;
  boolean[] visited = new boolean[n];
  for (int i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(isConnected, visited, i);
      count++;
    }
  }
  return count;
}`
    },
    {
      title: "✔️ Course Schedule (Topological Sort)",
      description: "LeetCode #207",
      solution: `boolean canFinish(int numCourses, int[][] prerequisites) {
  List<List<Integer>> graph = new ArrayList<>();
  for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
  int[] indegree = new int[numCourses];
  for (int[] pre : prerequisites) {
    graph.get(pre[1]).add(pre[0]);
    indegree[pre[0]]++;
  }
  Queue<Integer> q = new LinkedList<>();
  for (int i = 0; i < numCourses; i++)
    if (indegree[i] == 0) q.add(i);
  int count = 0;
  while (!q.isEmpty()) {
    int course = q.poll(); count++;
    for (int next : graph.get(course)) {
      indegree[next]--;
      if (indegree[next] == 0) q.add(next);
    }
  }
  return count == numCourses;
}`
    },
    {
      title: "✔️ Dijkstra’s Algorithm",
      description: "LeetCode #743",
      solution: `int networkDelayTime(int[][] times, int n, int k) {
  List<List<int[]>> graph = new ArrayList<>();
  for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());
  for (int[] time : times)
    graph.get(time[0]).add(new int[]{time[1], time[2]});
  int[] dist = new int[n + 1];
  Arrays.fill(dist, Integer.MAX_VALUE); dist[k] = 0;
  PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
  pq.add(new int[]{k, 0});
  while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    int u = cur[0], d = cur[1];
    for (int[] nei : graph.get(u)) {
      if (d + nei[1] < dist[nei[0]]) {
        dist[nei[0]] = d + nei[1];
        pq.add(new int[]{nei[0], dist[nei[0]]});
      }
    }
  }
  int ans = Arrays.stream(dist).skip(1).max().getAsInt();
  return ans == Integer.MAX_VALUE ? -1 : ans;
}`
    }
  ],
},
"recursion-&-backtracking": {
  title: "Recursion & Backtracking",
  definition:
    "🔁 Recursion is a technique where a function calls itself to solve smaller problems. Backtracking is a specialized form of recursion used to explore all possibilities and undo (backtrack) previous steps when a solution path fails.",
  types: [
    "Tail Recursion",
    "Head Recursion",
    "Tree Recursion",
    "Indirect Recursion",
    "Backtracking (Subset of Recursion)"
  ],
  subtopics: [
    "Factorial, Fibonacci using Recursion",
    "Base & Recursive Cases",
    "Print All Subsequences / Subsets",
    "Recursion Tree & Stack Space",
    "N-Queens Problem",
    "Maze Path / Rat in a Maze",
    "Word Search / Grid Backtracking"
  ],
  methods: [
    "Base Case – Stopping condition of recursive call",
    "Recursive Case – Function calls itself with smaller input",
    "Backtracking – Undo steps if current path fails",
    "Use of visited[] or conditions to restrict repeated work"
  ],
  code: `// Recursion: Factorial
int factorial(int n) {
  if (n == 0) return 1;
  return n * factorial(n - 1);
}

// Backtracking: Generate all subsets
void generateSubsets(int i, List<Integer> ds, int[] arr) {
  if (i == arr.length) {
    System.out.println(ds);
    return;
  }
  ds.add(arr[i]);
  generateSubsets(i + 1, ds, arr);
  ds.remove(ds.size() - 1); // backtrack
  generateSubsets(i + 1, ds, arr);
}`,
  dryRun: `factorial(3):
→ 3 * factorial(2)
→ 3 * (2 * factorial(1))
→ 3 * 2 * (1 * factorial(0))
→ 3 * 2 * 1 * 1 = 6

generateSubsets([1,2]):
→ choose 1 → [1]
  → choose 2 → [1,2]
  → backtrack → [1]
→ backtrack → []
→ choose 2 → [2]
→ backtrack → []`,
  leetcode: [
    {
      title: "✔️ Climbing Stairs",
      description: "LeetCode #70 (Simple Recursion, Fibonacci pattern)",
      solution: `int climbStairs(int n) {
  if (n <= 2) return n;
  return climbStairs(n - 1) + climbStairs(n - 2);
}`
    },
    {
      title: "✔️ Subsets (Backtracking)",
      description: "LeetCode #78 (Backtracking: Subset generation pattern)",
      solution: `void backtrack(int[] nums, int start, List<Integer> temp, List<List<Integer>> res) {
  res.add(new ArrayList<>(temp));
  for (int i = start; i < nums.length; i++) {
    temp.add(nums[i]);
    backtrack(nums, i + 1, temp, res);
    temp.remove(temp.size() - 1); // backtrack
  }
}`
    },
    {
      title: "✔️ Permutations",
      description: "LeetCode #46 (Backtracking: choose → explore → unchoose pattern)",
      solution: `void backtrack(int[] nums, List<Integer> temp, boolean[] used, List<List<Integer>> res) {
  if (temp.size() == nums.length) {
    res.add(new ArrayList<>(temp));
    return;
  }
  for (int i = 0; i < nums.length; i++) {
    if (used[i]) continue;
    used[i] = true;
    temp.add(nums[i]);
    backtrack(nums, temp, used, res);
    used[i] = false;
    temp.remove(temp.size() - 1); // backtrack
  }
}`
    },
    {
      title: "✔️ N-Queens Problem",
      description: "LeetCode #51 (Backtracking + safety check on rows, diagonals)",
      solution: `boolean isSafe(char[][] board, int row, int col) {
  // Check column, upper-left, and upper-right diagonals
}
void solve(char[][] board, int row, List<List<String>> res) {
  if (row == board.length) {
    res.add(construct(board));
    return;
  }
  for (int col = 0; col < board.length; col++) {
    if (isSafe(board, row, col)) {
      board[row][col] = 'Q';
      solve(board, row + 1, res);
      board[row][col] = '.'; // backtrack
    }
  }
}`
    },
    {
      title: "✔️ Word Search",
      description: "LeetCode #79 (Backtracking on grid with visited marking)",
      solution: `boolean exist(char[][] board, String word) {
  for (int i = 0; i < board.length; i++)
    for (int j = 0; j < board[0].length; j++)
      if (dfs(board, word, i, j, 0)) return true;
  return false;
}
boolean dfs(char[][] b, String w, int i, int j, int idx) {
  if (idx == w.length()) return true;
  if (i < 0 || j < 0 || i >= b.length || j >= b[0].length || b[i][j] != w.charAt(idx))
    return false;
  char temp = b[i][j];
  b[i][j] = '#';
  boolean found = dfs(b, w, i+1, j, idx+1) || dfs(b, w, i-1, j, idx+1) ||
                  dfs(b, w, i, j+1, idx+1) || dfs(b, w, i, j-1, idx+1);
  b[i][j] = temp;
  return found;
}`
     }
    ]
  }
},
  "programming-languages": {
  java : {
  title : "Java Programming",
  definition: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. Java code is compiled into bytecode which runs on the Java Virtual Machine (JVM), making it platform-independent.",
  
  types: [
    "Primitive Types (int, float, char, boolean)",
    "Non-Primitive Types (String, Arrays, Classes)",
    "Control Structures (if-else, switch, loops)",
    "OOP Concepts (Class, Object, Inheritance, etc.)",
    "Collections Framework (List, Map, Set, Queue)",
    "Exception Handling (try-catch-finally)",
    "Multithreading (Thread, Runnable)",
    "File Handling (File, BufferedReader, FileWriter)"
  ],

  subTopics: [
    "Variables and Data Types",
    "Operators",
    "Control Statements",
    "Functions and Methods",
    "Object-Oriented Programming",
    "Exception Handling",
    "Arrays and Strings",
    "Collections Framework",
    "Multithreading",
    "File Handling",
    "JDBC"
  ],

  dryRun: {
    "code": "public class DryRunDemo {\n    public static void main(String[] args) {\n        int sum = 0;\n        for(int i = 1; i <= 3; i++) {\n            sum += i;\n        }\n        System.out.println(sum);\n    }\n}",
    "steps": [
      { "i": 1, "sumBefore": 0, "sumAfter": 1 },
      { "i": 2, "sumBefore": 1, "sumAfter": 3 },
      { "i": 3, "sumBefore": 3, "sumAfter": 6 }
    ],
    "output": "6"
  },

  code: {
    "basicSyntax": "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}"
  },

  methods: [
    {
      "name": "Addition Method",
      "code": "public int add(int a, int b) {\n    return a + b;\n}"
    },
    {
      "name": "Static Method",
      "code": "public static void greet() {\n    System.out.println(\"Welcome to Java\");\n}"
    },
    {
      "name": "Constructor",
      "code": "public MyClass() {\n    System.out.println(\"Constructor Called\");\n}"
    }
  ],

  leetcode: [
    {
      title: "Two Sum",
      description: "Find two indices such that their sum equals a target.",
      solution :"Use HashMap to store (target - current number) and check if it exists.",
      link: "https://leetcode.com/problems/two-sum/"
    },
    {
      title: "Valid Parentheses",
      description: "Check if a string has valid opening and closing brackets.",
      solution: "Use Stack to track open brackets and match closing ones.",
      link: "https://leetcode.com/problems/valid-parentheses/"
    },
    {
      title: "Merge Two Sorted Lists",
      description: "Merge two sorted linked lists and return it as a sorted list.",
      solution: "Use pointers and iterate both lists to build the result.",
      link: "https://leetcode.com/problems/merge-two-sorted-lists/"
    },
    {
      title: "Best Time to Buy and Sell Stock",
      description: "Find the maximum profit from one transaction.",
      solution: "Track minimum price and max profit during iteration.",
      link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
    }
  ]
},

    python: {
      title: "Python",
      content: "Python is interpreted, dynamic and easy to use for scripting and ML.",
      example: "print('Hello World')",
    },
  },
  // web, cloud, advanced topics bhi add karega
};

export default topicData;
