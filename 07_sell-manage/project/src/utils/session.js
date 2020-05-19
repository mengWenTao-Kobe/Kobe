


export default {
  set: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
  get: key => JSON.parse(sessionStorage.getItem(key)),
  remove: key => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear()
}

