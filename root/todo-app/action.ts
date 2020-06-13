export type Action =
  | {
    $: 'onTopInputKeyUp'
  }
  | {
    $: 'onFocusItemInputKeyUp'
  }
  | {
    $: 'toggleItem'
    itemIndex: number
  }
  | {
    $: 'removeItem'
    itemIndex: number
  }
  | {
    $: 'focusItem'
    itemIndex: number
  }
