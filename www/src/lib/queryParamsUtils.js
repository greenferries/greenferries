const getNewUrlWithQueryParam = (key, value) => {
  const searchParams = new URLSearchParams(window.location.search)
  if (value) {
    searchParams.set(key, value)
  } else {
    searchParams.delete(key)
  }
  return `${window.location.pathname}?${searchParams.toString()}`
}

export { getNewUrlWithQueryParam }
