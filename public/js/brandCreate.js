const selectElement = document.querySelector('.models');

selectElement.addEventListener('change', (event) => {
    const resultado = document.querySelector('.marca');
    console.log("modificaste el model")
    document.getElementById("marca").setAttribute('value', m.marcas.name);
});