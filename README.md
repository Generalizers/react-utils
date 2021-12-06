# react-utils

A react utils structure with some react helpers to make programming faster with react and typescript.

# Document utils

## Bind events to document with react

Document events in react can be hard sometimes. If we want to add an event to the document and detect changes in react, we have to do the following :

```tsx
const f = () => console.log('click');

useEffect(() => {
  document.addEventListener('click', f);
  return () => {
    document.removeEventListener('click', f);
  };
}, []);
```

Basically we add the event to the document when the component mounts. And when it unmounts we remove the event.<br>
If we were to add states in here, we could either use **state refs** so the changes apply in any way or we could also use the useEffect dependencies.

```tsx
const [count, setCount] = useState(0);

const f = () => setCount(count + 1);

useEffect(() => {
  document.addEventListener('click', f);
  return () => {
    document.removeEventListener('click', f);
  };
}, [count]);
```

If we didn't have the `[count]` in the useEffect, the function will never change. It will always consider the `count` variable as having a value of `0`. Thus, `setCount(count + 1)` will always change the state to `1`.

## Document binding hooks

This library makes it easy to bind events to the document.

| hooks            | parameters                                                                                                                                                                               | description                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `useKey`         | type: **"down"** \| **"press"** \| **"up"**, f: (this: Document, ev: KeyboardEvent) => any, deps?: DependencyList                                                                        | Bind a key event function to the document             |
| `useMouse`       | type: **"down"** \| **"enter"** \| **"leave"** \| **"move"** \| **"out"** \| **"over"** \| **"up"** \| **"click"**, f: (this: Document, ev: KeyboardEvent) => any, deps?: DependencyList | Bind a mouse event function to the document           |
| `useContextMenu` | f: (e: Event) => any, deps?: DependencyList                                                                                                                                              | Bind the `contextmenu` event function to the document |

### Example

```tsx
useMouse('down', () => {
  console.log('Mouse Down !');
});
```

# State hooks

## Arrays

We all know that it's hard to use react with arrays. Whenever you push a value to an array you always have to do a `setState([...arr])` to update the state of the array.

With **react-utils**, you can use a react array hook to create your array and simply `push` the value in the state array and the array will update. It will internally call the `setState` function from the `useState` function.

### Create a state array

The array state hook is a bit weird because you need to call a first function to get the actual hook.
We know that it is weird but it is do to a typescript limitation on generic inferences. You can find the github issue [here](https://github.com/microsoft/TypeScript/issues/10571). We countered this limitation by using the typescript **currying** feature. This allows us to get intellisens while specifying the options for the `useStateArray` 'hook' (we'll just call the overall function a hook).

```tsx
const arr = useStateArray()([1, 'Hello', false]);

return (
  <div onClick={() => arr.push('New value')}>
    {arr.map((e) => (
      <p>{e.toString()}</p>
    ))}
  </div>
);
```

![stateArray1.png](https://raw.githubusercontent.com/Generalizers/react-utils/master/readme/stateArray1.png)
![stateArray2.png](https://raw.githubusercontent.com/Generalizers/react-utils/master/readme/stateArray2.png)

### Selectable

Sometimes need to select an element to show it selected in the DOM.
These are the states you would have in such a react application :

```tsx
const [arr, setArr] = useState([1, 2, 3]);
const [selected, setSelected] = useState(0);
```

Here you have 4 variables used to identify **an array** and **a selected element in the array**.

In **react-utils**, all you need is to add a config object to the `useStateArray` hook :

```tsx
const arr = useStateArray()([1, 'Hello', false], {
  selectable: { index: 1 },
});

return (
  <div>
    {arr.map((e) => (
      <p>{e.toString()}</p>
    ))}
    <p>{`selected : ${arr.selected.value}`}</p>
  </div>
);
```

![stateArray3.png](https://raw.githubusercontent.com/Generalizers/react-utils/master/readme/stateArray3.png)

You can also change the selection. Make sure not to change the selection in root of the component function (it will update in a loop since when a component re-renders it re-runs the component code)

```tsx
arr.select(0);
```

Here are the available properties on `arr` when specifying the `selectable` option

| property         | return                      | description                        |
| ---------------- | --------------------------- | ---------------------------------- |
| `select(number)` | `void`                      | Select a new element in the array  |
| `selected`       | `{index: number, value: T}` | Get the currently selected element |

### useStateArray options

| option       | values                | description                       |
| ------------ | --------------------- | --------------------------------- |
| `selectable` | `{index?:number = 0}` | The selected element in the array |

### Distance

Sometimes you might need some advanced array features. The distance array is an array of numbers and will store the distances for each number in the array. At the current time, the distance array only supports doing the sum from the distance array that it creates

```tsx
// [1,3,6] <=> [1,2,3]
const arr = useStateArray()([1, 3, 6], {
  distance: true,
});
```

```tsx
arr.push(5);
// distances : [1, 2, 2, 3]
// arr : [1, 3, 5, 8]
```

The difference between 6 and 3 is 3. So the array will maintain a distance of 3 with it's previous element. This is why we go from 5 to 8.
