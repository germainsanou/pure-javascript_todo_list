const input = document.getElementById('input')
const add = document.getElementById('add')
const clear = document.getElementById('clear')
const data = document.getElementById('data')
const load = document.getElementById('load')
const list = document.getElementById('list')
const notification = document.getElementById('notification')

const store = new ArrayStorage('tasks')

// Verifie qu'une tache existe deja
function taskAlreadyExist(value) {
  if (store.list.indexOf(value)===-1) {
    return false
  }else{
    const alerte = document.createElement('div')
    const btnRemoveAlerte = document.createElement('button')
    btnRemoveAlerte.classList.add('btn', 'btn-link', 'text-danger', 'border', 'border-dark', 'mx-2')
    btnRemoveAlerte.innerText = 'x'

    btnRemoveAlerte.addEventListener('click', e => {
      notification.removeChild(btnRemoveAlerte.parentNode)
    })

    alerte.innerText = 'Cette tache existe déjà!'
    input.value = ''
    notification.append(alerte)
    alerte.append(btnRemoveAlerte)
    return true
  }
}

//AJOUTER UN ELEMENT LI A LA LISTE UL
function addNewLi(task) {
  const li = document.createElement('li')
  li.innerText = task

  const btn = document.createElement('button')
  btn.innerText = 'Supprimer'
  btn.classList.add('btn', 'btn-danger', 'ml-2')

  btn.addEventListener('click', () =>{
    list.removeChild(btn.parentNode)
    store.removeItem(task)
  })

  li.appendChild(btn)

  list.appendChild(li)
}

//PEUPLER LA LISTE UL AVEC LES TACHES CONTENUE DANS LE TABLEAU 'TASKS'
store.list.forEach(function (task) {
  addNewLi(task)
})

//ECOUTER LE BOUTON AJOUTER
add.addEventListener('click', (e) => {
  if (input.value.length > 0 && !taskAlreadyExist(input.value)) {
    addNewLi(input.value)
    store.addItem(input.value)
    input.value = ''
  }
})

//ECOUTER L'ACTION DU CLICK DE LA TOUCHE ENTER
input.addEventListener('keydown', e => {
  if (e.key == 'Enter') {
    if (input.value.length > 0 && !taskAlreadyExist(input.value)) {
      addNewLi(input.value)
      store.addItem(input.value)
      input.value = ''
    }
  }
})

//VIDER LA LISTE UL
clear.addEventListener('click', () => {
  list.innerHTML = ''
  store.clear()
})

//Charger un ficher json
load.addEventListener('click', () => {
  fetch(data.value).then(response => {
    if (response.ok) {
      return response.json()        
    }
    throw new Error(`${response.statusText} (${response.status})`)
  }).then(json => {
    json.forEach(task => {
      if (task.description.length > 0 && !taskAlreadyExist(task.description)) {
        addNewLi(task.description)
        store.addItem(task.description)
      }
    })
  }).catch(err => {
    console.log(err.message);
  })
})
