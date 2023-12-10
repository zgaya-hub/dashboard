export async function handleOnSetItemInStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export async function handleOnRemoveItemFromStorage(key: string) {
  localStorage.removeItem(key);
  return true;
}

export async function handleOnGetItemFromStorage(key: string) {
  const data = localStorage.getItem(key);
  return data ?? null;
}

export async function handleOnHasItemInStorage(key: string) {
  const data = localStorage.getItem(key);
  return data ? true : false;
}

export async function handleOnClearStorage() {
  localStorage.clear();
}
