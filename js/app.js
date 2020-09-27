const formulario = document.querySelector('#formulario')
const listaTareas = document.querySelector('#lista-tareas')
let tareas = []

eventListeners()

function eventListeners() {

    formulario.addEventListener('submit', agregarTarea)

    document.addEventListener('DOMContentLoaded', () => {
        tareas = JSON.parse(localStorage.getItem('tareas')) || []
        console.log(tareas)
        crearHTML()
    })
}

function agregarTarea(e) {
    e.preventDefault()
    const tarea = document.querySelector('#tarea').value

    if (tarea === '') {
        mostrarError('Una tarea no puede estar vacía')
        return
    }

    const tareaObj = {
        id: Date.now(),
        tarea: tarea,
        check: false
    }

    tareas = [...tareas, tareaObj]
    console.log(tareas)
    crearHTML()
    formulario.reset()
}

function mostrarError(error) {
    const msjError = document.createElement('p')
    msjError.textContent = error
    msjError.classList.add('error', 'u-full-width')

    formulario.appendChild(msjError)

    setTimeout(() => {
        msjError.remove()
    }, 2500)
}

function crearHTML() {
    limpiarHTML()
    if (tareas.length > 0) {
        tareas.forEach(tarea => {

            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tarea')
            btnEliminar.innerHTML = '<i class="fas fa-trash"></i>'

            btnEliminar.onclick = () => {
                borrarTarea(tarea.id)
            }

            const btnCheck = document.createElement('a')
            btnCheck.classList.add('marcar-tarea')
            btnCheck.innerHTML = '<i class="fas fa-check"></i>'

            btnCheck.onclick = () => {
                marcarTarea(tarea.id)
            }

            const p = document.createElement('p')

            p.innerText = tarea.tarea
            p.appendChild(btnEliminar)
            p.appendChild(btnCheck)



            if (tarea.check) {
                p.classList.add('checked')
                p.removeChild(btnCheck)
            }

            listaTareas.appendChild(p)
        })
    }
    sincronizarStorage()
}

function sincronizarStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas))
}

function borrarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id != id)
    crearHTML()
}

function marcarTarea(id) {
    tareas.forEach(tarea => {
        if (tarea.id === id) {
            tarea.check = true
        }
    })
    crearHTML()
}

function limpiarHTML() {
    while (listaTareas.firstChild) {
        listaTareas.removeChild(listaTareas.firstChild)
    }
}