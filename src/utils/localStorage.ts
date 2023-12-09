export async function handleOnSetItemInStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export async function handleOnRemoveItemFromStorage(key: string) {
  try {
    localStorage.removeItem(key);
    return true; // Indicate successful removal
  } catch (error) {
    console.error('Error removing item from storage:', error);
    return false; // Indicate failure
  }
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
