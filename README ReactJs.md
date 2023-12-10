### Below are the my understanding and lack of notes
## Redux Thunk
Redux thunk is a middleware, updating the store is sync process but when we need the async operation to update the store then we use the thunk.

### Redux
Slice -  When we create the Store, instead of creating one big store, we create the slices of store is called the Slice.

In slice, we create the slice initial state and along which we create the actions which are functions which we use to modify the store. the actions are added as object in reducers key of createSlice.

we added `export default loginSlice.reducer` which is used to combine multiple slices in the store, 
`export const { logincheck } = loginSlice.actions;` means for using the dispatch the actions which we used to modify the store of that slice.