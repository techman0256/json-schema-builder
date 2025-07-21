// get value at nested path
export const getValueAtPath = (obj: any, path: string[]) => {
  return path.reduce((acc, key) => (acc?.[key] ?? {}), obj);
};

// set value at nested path immutably
export const updateNestedValue = <T = any>(obj: T, path: string[], updater: (prev: any) => any): T => {
  if (path.length === 0) {
    return updater(obj); // root update
  }
  const [head, ...rest] = path;

  return {
    ...obj,
    [head]: updateNestedValue((obj as any)?.[head] || {}, rest, updater),
  } as T;
};


// delete key at nested path immutably
export const deleteNestedKey = (obj: any, path: string[], keyToDelete: string) => {
  const target = getValueAtPath(obj, path);
  const {[keyToDelete]: _, ...rest} = target;

  return updateNestedValue(obj, path, () => rest);
};
