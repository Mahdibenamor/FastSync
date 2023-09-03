
export function mergeIdLists(list1: string[], list2: string[]): string[] {
  const mergedList = [...new Set([...list1, ...list2])];
  return mergedList;
}
