---
title: "Efficient zip function in JavaScript"
excerpt: "A case study of porting a standard Python utility to JavaScript"
# coverImage: "/assets/blog/dynamic-routing/cover.jpg"
date: "2020-04-27T00:46:07.322Z"
author:
  name: Matyas Fodor
  # picture: "/assets/blog/authors/jj.jpeg"
# ogImage:
# url: "/assets/blog/dynamic-routing/cover.jpg"
hidden: true
---

# Efficient zip function in JavaScript

<!-- I find the `zip` in Python quite useful. -->

The Python `zip` function is a really clever analogy of a real zipper: It allows you to iterate over several arrays element-wise without having to worry about indexes. It can be quite useful when you have to manually pair elements coming from two data sources:

```python
>>> scoreList = [5, 3, 6, 8]
>>> playerList = ['Mary', 'John', 'Emma', 'Gavin']
>>> list(zip(scoreList, playerList))
# [(5, 'Mary'), (3, 'John'), (6, 'Emma'), (8, 'Gavin')]
```

Please note the `list()` call is needed to convert the result to a list, otherwise it returns something like

```python
>>> zip(scoreList, playerList)
# <zip object at 0x109b19d00>
```

which is an object implementing the iterator interface. Why the hassle with this object? Why can't they just return the list? The iterator interface allows lazy-evaluation, meaning it won't create a list, only if it's asked to, but instead it generates elements on-demand which can be more efficient in many cases. Let's say I want to find the first player with score 6:

```python
for score, player in zip(scoreList, playerList):
  if score == 6:
    print(f'player {player} has score 6')
    break
```

In this case, the iteration stops with (`(6, 'Emma')`) and the last pair (`(8, 'Gavin')`) would never be constructed.

The implementation is quite interesting, becuase `zip` not only works with two lists, it can accept an arbitrary number of arrays as input parameters. This can be be particularly useful when trying to transpose a list of lists (a matrix). For those who are not familiar with the term `transpose` don't feel intimidated by it. It simply means a list of list is simply flipped by its diagonal. The transposition of

```python
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```

is

```python
>>> list(zip(*[
...  [1, 2, 3],
...  [4, 5, 6],
...  [7, 8, 9]
... ]))
[
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
]
```

It can be handy when you're dealing with tabular data which is stored row-wise, but needs to be displayed column-wise.

Everything is simple as long as the input arrays have the same length, but what happens if they don't? According the [official documentation](https://docs.python.org/3.3/library/functions.html#zip) it _stops when the shortest input iterable is exhausted_, meaning it'll return as many elements as long the shortest array is:

```python
>>> list(zip([1, 2, 3], [4, 5]))
[(1, 4), (2, 5)]
```

If all elements need to be preserved, [itertools.zip_longest](https://docs.python.org/3/library/itertools.html#itertools.zip_longest) should be used.

And just to spice things up the little, let me mention that as the zip function expects iterables as input, not specifically arrays. Iterables are more generic than arrays, without going into too much details, they are objects that can be iterated over one element at the time and they can signal if they are exhausted (iteration finished). In practice it means any object that can be itrated over can be used as inputs of zip: tuples, sets, dictionaries, range, or even results of other zips. Mind blowing, right? It is also possible to create an infinite zip. Let me use [itertools.count](https://docs.python.org/3/library/itertools.html#itertools.count) to demostrate it. It is very similar to `range()` except it has no stopping criteria, so in used in a for loop it keeps yielding values unless is stopped.

```python
>>> for a, b in zip(itertools.count(start=0, step=2), itertools.count(start=1, step=2)):
...     print(a, b)
1 2
3 4
5 6
...
```

I really hope I could convince you by now how cool and versatile this Python standard library function is. Why can't we have nice things in JavaScript? Well we can it's just you probably end up hunting for third-parties on npm or ready-made solutions on Stack Overflow. But is there anything more satisfiying than using your home-grown utilities?

<!-- There are some implementations available on Stack Overflow
 - These answers offer list-based (not lazy) solutions: https://stackoverflow.com/questions/22015684/how-do-i-zip-two-arrays-in-javascript
 - While these answers make use of the javascript generators: https://stackoverflow.com/a/67247411/2419215

None of these
 -->

By the way, the `zip` function is available in the most famous utility library, Lodash, as `_.zip`. There are two problems with the Lodash implementation:

- It implicitly implements the `itertools.zip_longest` functionality without documenting it, or offering a padding value.
- Not necessarily a problem, but it only operates on arrays and returns an array without any lazy evaluation. This probably serves an average JavaScript user better, but not if you're hungry for scalability and performance.

Before jumping into the final code, let's take a detour and inspect the differences between the Python and JavaScript iterator interface.

In Python you can do:

```python
>>> my_list = ['a', 'b', 'c']
>>> my_list_iterator = iter(my_list)
>>> next(my_list_iterator)
'a'
>>> next(my_list_iterator)
'b'
>>> next(my_list_iterator)
'c'
>>> next(my_list_iterator)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

The iterator of an iterable object van be obtained with the global `iter()` function, and the also globally available `next()` function can be used to fetch the current value and increment the iterator. The end of the iteration is signaled by the `StopIteration` built-in exception. The Python iterator mechanism is built with the side-effect of raising an error, which happens behind the curtains in every for-loop. This allows a very ergonomic workflow, although it might seem unorthodox to make use of exceptions in the expected behaviour of the code flow.

How would this look like in JavaScript?

```javascript
> var myList = ['a', 'b', 'c'];
undefined
> var myListIterator = myList[Symbol.iterator]()
undefined
> myListIterator.next()
{ value: 'a', done: false }
> myListIterator.next()
{ value: 'b', done: false }
> myListIterator.next()
{ value: 'c', done: false }
> myListIterator.next()
{ value: undefined, done: true }
```

In JavaScript, as opposed to Python there's no global function to get an iterator to an object, it can be obtained by the `myList[Symbol.iterator]()` Why the weird syntax? That is probably worthy to another post, let's just accept it for now. The current value can be accessed and the iterator incremented with the `iterator.next()` method, which returns an object with two properties: `value` hold the current value and a `done` indicates the status of the iteration. When the iteration finishes, `value` is `undefined` and `done` is `true`. This interface can be somewhat more invconvenient to work with but this is a trade-off of not signaling the iteration state through an exception.

With the iterator interface in our toolchain we can design a faithful implementation of the Python `zip` and `itertools.zip_longest` functions in JavaScript supporting iterables. Let's focus on supporting two elements first and stop as soon as one of the iterators is exhausted:

```javascript
function zip(iterableA, iterableB) {
  // Get the iterators
  const iteratorA = iterableA[Symbol.iterator]();
  const iteratorB = iterableB[Symbol.iterator]();
  // Keep track of the current iteration state in `iterStateA` and `iterStateB`
  let iterStateA = iteratorA.next();
  let iterStateB = iteratorB.next();
  // result will hold the return values;
  const result = [];
  // Loop until none of the iterators are exhausted
  while (!iterStateA.done && !iterStateB.done) {
    // The current values of the iterators are stored in result
    result.push([iterStateA.value, iterStateB.value]);
    // The current iterator state is updated from the iterator
    iterStateA = iteratorA.next();
    iterStateB = iteratorB.next();
  }
  return result;
}
```

It seems to be working as expected:

```javascript
> zip([1, 2, 3, 4], ['a', 'b', 'c'])
[ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ] ]
```

So far so good, but this implementation is eagerly-evaluated, which means no partial results are returned, both iterators are completely exhausted before the function returns. Lazy evaluation on the other hand requires returning partial results, that's where [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) functions come handy. It's quite simple to change the previous implementation, a `*` needs to be added after the `function` keyword and instead of storing partial results to `results` they can be yielded:

```javascript
function* zip(iterableA, iterableB) {
  // Get the iterators
  const iteratorA = iterableA[Symbol.iterator]();
  const iteratorB = iterableB[Symbol.iterator]();
  // Keep track of the current iteration state in `iterStateA` and `iterStateB`
  let iterStateA = iteratorA.next();
  let iterStateB = iteratorB.next();
  // Loop until none of the iterators are exhausted
  while (!iterStateA.done && !iterStateB.done) {
    // The current values of the iterators are yielded
    yield [iterStateA.value, iterStateB.value];
    // The current iterator state is updated from the iterator
    iterStateA = iteratorA.next();
    iterStateB = iteratorB.next();
  }
}
```

The same call to `zip` would now return a generator object:

```javascript
> zip([1, 2, 3, 4], ['a', 'b', 'c'])
Object [Generator] {}
```

The actual results can be viewed by turning these results into an array with the `Array.from` method:

```javascript
> Array.from(zip([1, 2, 3, 4], ['a', 'b', 'c']))
[ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ] ]
```

The implementation is getting really close to the Python one, but it still only supports two arrays. How could it be extended to work with an arbitrary number of arrays? The parameters of the function would have to be rolled up into a single `iterables` parameter using [rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters). Each operation on the iterators or on the iterStates is now wrapped in a map, except from the condition of the loop, which uses `every` to check if any of the iterators are exhausted.

```javascript
function* zip(...iterables) {
  // Get the iterators
  const iterators = iterables.map((iterable) => iterable[Symbol.iterator]());
  // Keep track of the current iteration state in `iterStates`
  let iterStates = iterators.map((iterator) => iterator.next());
  // Loop until none of the iterators are exhausted
  while (iterStates.every(({ done }) => !done)) {
    // The current values of the iterators are yielded
    yield iterStates.map(({ value }) => value);
    // The current iterator states are updated from the iterator
    iterStates = iterators.map((iterator) => iterator.next());
  }
}
```

Matrix transposition is no longer an issue for `zip`:

```javascript
> Array.from(zip(...[
...   [1, 2, 3],
...   [4, 5, 6],
...   [7, 8, 9]
... ]))
[ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]
```

Lastly, let's add the `zip_longest` behaviour. There will be a `zip` and a `zip_longest` functin exposed (exported), and an internal `_zip` function will capture the common functionality.

```javascript
function* _zip(evaluator, iterables) {
  // Get the iterators
  const iterators = iterables.map((iterable) => iterable[Symbol.iterator]());
  // Keep track of the current iteration state in `iterStates`
  let iterStates = iterators.map((iterator) => iterator.next());
  // Loop until none of the iterators are exhausted
  while (evaluator.call(iterStates, ({ done }) => !done)) {
    // The current values of the iterators are yielded
    yield iterStates.map(({ value }) => value);
    // The current iterator states are updated from the iterator
    iterStates = iterators.map((iterator) => iterator.next());
  }
}

function* zip(...iterables) {
  yield* _zip(Array.prototype.every, iterables);
}

function* zipLongest(...iterables) {
  yield* _zip(Array.prototype.some, iterables);
}
```

```javascript
> Array.from(zip(...[[1, 2, 3, 4, 5], [1, 2, 3], [1, 3, 6, 8]]))
[ [ 1, 1, 1 ], [ 2, 2, 3 ], [ 3, 3, 6 ] ]
> Array.from(zip_longest(...[[1, 2, 3, 4, 5], [1, 2, 3], [1, 3, 6, 8]]))
[
  [ 1, 1, 1 ],
  [ 2, 2, 3 ],
  [ 3, 3, 6 ],
  [ 4, undefined, 8 ],
  [ 5, undefined, undefined ]
]
```

```javascript
function* _zip(evaluator, iterables, fillValue) {
  // Get the iterators
  const iterators = iterables.map((iterable) => iterable[Symbol.iterator]());
  // Keep track of the current iteration state in `iterStates`
  let iterStates = iterators.map((iterator) => iterator.next());
  // Loop until none of the iterators are exhausted
  while (evaluator.call(iterStates, ({ done }) => !done)) {
    // The current values of the iterators are yielded
    yield iterStates.map(({ value, done }) => (!done ? value : fillValue));
    // The current iterator states are updated from the iterator
    iterStates = iterators.map((iterator) => iterator.next());
  }
}

function* zip(...iterables) {
  yield* _zip(Array.prototype.every, iterables);
}

function* zipLongest(...iterables) {
  yield* _zip(Array.prototype.some, iterables);
}

function* zipLongestFill(fillValue = undefined, ...iterables) {
  yield* _zip(Array.prototype.some, iterables, fillValue);
}
```

```javascript
> Array.from(zipLongestFill('a', ...[[1,2,3,4,5],[1,2,3],[1,3,6,8]]))
[
  [ 1, 1, 1 ],
  [ 2, 2, 3 ],
  [ 3, 3, 6 ],
  [ 4, 'a', 8 ],
  [ 5, 'a', 'a' ]
]
```
