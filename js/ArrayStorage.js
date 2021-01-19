class ArrayStorage {

  constructor (name) {
    this.name = name
    this.list = this.getList()
  }

  getList () {
    if (!localStorage.getItem(this.name)) {
      localStorage.setItem(this.name, '[]')
    }
    return JSON.parse(localStorage.getItem(this.name))
  }

  addItem (value) {
    this.list.push(value)
    localStorage.setItem(this.name, JSON.stringify(this.list))
  }

  removeItem (value) {
    const index = this.list.indexOf(value)
    this.list.splice(index, 1)
    localStorage.setItem(this.name, JSON.stringify(this.list))
  }

  clear () {
    this.list = []
    localStorage.removeItem(this.name)
  }

}