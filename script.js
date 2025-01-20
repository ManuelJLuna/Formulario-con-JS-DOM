// Vacia el formulario
const emptyForm = () => {
    location.reload()
}

// Previene que el formulario se envíe y recargue la página si no es valido. Si lo es almacena en el local storage los datos del formulario.
const submitFunction = (event) => {
    event.preventDefault()
    validarFormulario()
    if(validacion == true){ //Si la validacion es correcta que envie el formulario y reserve los datos en el local storage
        const nombre = document.getElementById("name").value
        const apellido = document.getElementById("lastName").value
        const documento = document.getElementById("document").value
        const email = document.getElementById("email").value
        const edad = document.getElementById("age").value
        const ocupacion = document.getElementById("ocupation").value
        const estudios = document.getElementById("studies").value
        const terminosYCondiciones = document.getElementById("termsAndConditions").checked
        const publicidades = document.getElementById("publicidades").checked ? true : false
        const ofertas = document.getElementById("ofertas").checked ? true : false
        const novedades = document.getElementById("novedades").checked ? true : false
        
        // objeto con todos los datos del formulario
        const datosFormulario = {
            nombre: nombre,
            apellido: apellido,
            documento: documento,
            email: email,
            edad: edad,
            ocupacion: ocupacion,
            estudios: estudios,
            terminosYCondiciones: terminosYCondiciones,
            publicidades: publicidades,
            ofertas: ofertas,
            novedades: novedades
        }
        // Enviar al local storage los datos del formulario
        localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario))
        alert("Formulario enviado correctamente")
    }else{
        event.preventDefault()
        return false
    }
}

document.getElementById("formulario").addEventListener("submit", submitFunction)
let validacion = true

function validarFormulario() {
    // Validación de los campos de texto
    const campoTexto = document.querySelectorAll("input[type='text']")
    campoTexto.forEach(campo => {                   // Esto selecciona los campos de error de cada campo de texto
        let errorCampo = document.getElementById("error" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1))
        if(campo.value.length == 0){
            mostrarError(errorCampo, "¡Este campo es obligatorio!")
            validacion = false
        }else if(campo.value.length < 3 && campo.value.length > 0){
            mostrarError(errorCampo, "¡Este campo debe tener al menos 3 caracteres!")
            validacion = false
        }else{
            ocultarError(errorCampo)
        }
    })

    // Validación del campo de email
    const campoEmail = document.getElementById("email")
    let errorEmail = document.getElementById("errorEmail")

    if(campoEmail.value.length == 0){
        mostrarError(errorEmail, "¡Este campo es obligatorio!")
        validacion = false
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campoEmail.value)){
        mostrarError(errorEmail, "¡El correo electronico no es válido!")
        validacion = false
    }else{
        ocultarError(errorEmail)
    }

    // Validación del campo de la edad
    const campoEdad = document.getElementById("age")
    let errorEdad = document.getElementById("errorAge")

    if(campoEdad.value.length == 0){
        mostrarError(errorEdad, "¡Este campo es obligatorio!")
        validacion = false
    }else if(campoEdad.value < 18){
        mostrarError(errorEdad, "¡Debes ser mayor de 18 años!")
        validacion = false
    }else{
        ocultarError(errorEdad)
    }

    // Validacion de los select
    const campoSelect = document.querySelectorAll("select")
    campoSelect.forEach(campo => {
        let errorCampo = document.getElementById("error" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1))
        if(campo.value === ""){
            mostrarError(errorCampo, "¡Este campo es obligatorio! Por favor selecciona una opción.")
            validacion = false
        } else {
            ocultarError(errorCampo)
        }
    })

    // Validacion del checkbox
    const campoTerminosYCondiciones = document.getElementById("termsAndConditions")
    let errorTerminosYCondiciones = document.getElementById("errorTermsAndConditions")
    if(!campoTerminosYCondiciones.checked){
        mostrarError(errorTerminosYCondiciones, "¡Debes aceptar los términos y condiciones!")
        validacion = false
    }

}

const mostrarError = (elemento, mensaje) => {
    elemento.innerHTML = mensaje
    elemento.style.display = "block"
}
const ocultarError = (elemento) => {
    elemento.style.display = "none"
}