export type Model = {
  newTodoValue: string
  items: {
    content: string
    completed: boolean
  }[]
  focusedItemIndex?: number
};
