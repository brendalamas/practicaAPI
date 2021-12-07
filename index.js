const botonNuevoUsuario = document.querySelector(".boton-nuevo-usuario")
const nuevoForm = document.querySelector("#crear-nuevo-form")
const inputNombre = document.querySelector("#nombre")
const inputEmail = document.querySelector("#email")
const inputDireccion = document.querySelector("#direccion")
const inputTelefono = document.querySelector("#telefono")
const botonEnviar = document.querySelector("#boton-enviar")
const botonCancelar = document.querySelector("#boton-cancelar")

const formularioEditado = document.querySelector("#formulario-editado")
const inputNombreNuevo = document.querySelector("#nombre-nuevo")
const inputEmailNuevo = document.querySelector("#email-nuevo")
const inputDireccionNuevo = document.querySelector("#direccion-nuevo")
const inputTelefonoNuevo = document.querySelector("#telefono-nuevo")
const botonEnviarEd = document.querySelector("#boton-enviar-ed")
const botonCancelarEd = document.querySelector("#boton-cancelar-ed")

//INFORMACION ACTUALIZADA //
const actualizarInformacion = () => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users")
    .then((res) => res.json())
    .then((data) => {
      crearTablaHTML(data);
      eliminarUsuario()
      editarUsuario()
    })
}
actualizarInformacion()

// TABLA //
const crearTablaHTML = (data) => {
  const tabla = document.querySelector("#tabla")
  const html = data.reduce((acc, curr) => {
    return (acc + `  
    <tr class="is-family-monospace has-text-warning-dark">
      <td>${curr.fullname}</td>
      <td>${curr.email}</td>
      <td>${curr.address}</td>
      <td>${curr.phone}</td>
      <td>
      <button id="${curr.id}" class="boton-editar button is-warning is-small">Editar</button>
      <button id="${curr.id}" class="boton-eliminar button is-warning is-small">Eliminar</button>
      </td>
    </tr>
    `
    )
  },
  `
    <tr class="has-background-warning	">
      <th class="has-text-warning-dark is-family-monospace">Nombre</th>
      <th class="has-text-warning-dark is-family-monospace">Email</th>
      <th class="has-text-warning-dark is-family-monospace">Direccion</th>
      <th class="has-text-warning-dark is-family-monospace">Telefono</th>
      <th class="has-text-warning-dark is-family-monospace">Acciones</th>
    </tr>`
  );
  tabla.innerHTML = html
}
// CREAR NUEVO USUARIO //
const crearNuevoUsuario = () => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users",{
    method: "POST",
    body: JSON.stringify({
      fullname: inputNombre.value, 
      email: inputEmail.value,
      address: inputDireccion.value,
      phone: inputTelefono.value
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => res.json())
  .then((data)=>{
    actualizarInformacion(data)
  })
}

botonNuevoUsuario.onclick =()=>{
  nuevoForm.classList.remove("is-hidden")
  tabla.classList.add("is-hidden")
  
  // AGREGAR NUEVO USUARIO //
  botonEnviar.onclick=(e)=>{
    e.preventDefault()
    crearNuevoUsuario()
    nuevoForm.classList.add("is-hidden")
  }

  // BOTON CANCELAR //
  botonCancelar.onclick=()=>{
  nuevoForm.classList.add("is-hidden")
  }
}

// ELIMINAR USUARIO //
const eliminarUsuario = () => {
  const botonEliminar = document.querySelectorAll(".boton-eliminar")
  for (let i = 0; i < botonEliminar.length; i++) {

    botonEliminar[i].onclick =()=>{
      const id = botonEliminar[i].id

      fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json"
      }
      }).then((res) => res.json())
      .then((data)=>{
        actualizarInformacion()
      })

    }
  }
}

//EDITAR USUARIO//
const editarUsuario = () => {
  const botonEditar = document.querySelectorAll(".boton-editar")
  for (let i = 0; i < botonEditar.length; i++) {
    botonEditar[i].onclick = ()=>{
      formularioEditado.classList.remove("is-hidden")
      tabla.classList.add("is-hidden")
      
      const id = botonEditar[i].id
      mostrarUsuario(id)
      
      botonEnviarEd.onclick = (e) => {
        e.preventDefault()
        formularioEditado.classList.add("is-hidden")
        fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`,{
          method:"PUT",
          body: JSON.stringify({
            fullname: inputNombreNuevo.value,
            email: inputEmailNuevo.value,
            address: inputDireccionNuevo.value,
            phone :inputTelefonoNuevo.value,
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then((res)=> res.json())
        .then((data)=>{
          actualizarInformacion()
        })

      }
      // BOTON CANCELAR //
      botonCancelarEd.onclick=()=>{
        formularioEditado.classList.remove("is-hidden")
      }
    } 
  }
}


const mostrarUsuario =(id)=>{
  fetch (`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`)
  .then((res)=> res.json())
  .then((data)=>{
    inputNombreNuevo.value = data.fullname,
    inputEmailNuevo.value = data.email;
    inputDireccionNuevo.value = data.address;
    inputTelefonoNuevo.value = data.phone;

  })
}



