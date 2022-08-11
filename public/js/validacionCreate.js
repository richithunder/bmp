window.addEventListener("load", function() {
    
    let formulario = document.querySelector("form.crear");
    //console.log(formulario, "soy una prueba");
    
    formulario.addEventListener("submit", function(e) {
        e.preventDefault();
        let errores = [];

        let productName = document.querySelector("input#validacionName");
        if (productName.value == "") {
            document.getElementById("errorNombre").innerHTML = "debes indicar el nombre del producto"
            errores.push("nombre del producto")
        } else if (productName.value.length < 5) {
            document.getElementById("errorNombre").innerHTML = "minimo 5 letras"
            errores.push("5 letras")
        }
        let descripcion = document.querySelector("input#description")
        if (descripcion.value == "") {
            document.getElementById("errorDescripcion").innerHTML = "debes hacer una descripcion sobre el producto"
            errores.push("descripcion")
        } else if (descripcion.value.length < 20) {
            errores.push("20 caracteres")
        }
        let precio = document.querySelector("input#price")
        if (precio.value == "") {
            document.getElementById("errorPrecio").innerHTML = "debes indicar un precio"
            errores.push("precio")
        }
        let minBuy = document.querySelector("input#minBuy")
        if (minBuy.value == "") {
            document.getElementById("errorMinBuy").innerHTML = "debes indicar la cantidad minima de compra"
            errores.push("minimo de compra")
        } console.log(errores)

        if (errores.length==0) {
            formulario.submit()
        }


    })


})