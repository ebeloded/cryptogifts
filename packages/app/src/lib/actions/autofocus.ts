export const autofocus = (node: HTMLInputElement, focus: boolean) => {
  if (focus) setTimeout(() => node.focus(), 0)
}
