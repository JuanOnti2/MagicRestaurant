function reservar(nombrePlatillo, descripcion, precio) {
   
    let edad = localStorage.getItem('edad');
    
    if (!edad) {
        edad = prompt("Por favor, ingresa tu edad:");
        
        localStorage.setItem('edad', edad);
    }
    
    if (edad < 18) {
        alert("Lo sentimos, debes tener al menos 18 años para reservar comida.");
        return;
    }
    
    generar(nombrePlatillo, descripcion, precio);
}

function generar(nombrePlatillo, descripcion, precio) {
    const iva = 0.16;
    const subtotal = precio;
    const ivaAmount = subtotal * iva;
    const total = subtotal + ivaAmount;

    const platillo = {
        nombre: nombrePlatillo,
        descripcion: descripcion,
        subtotal: subtotal.toFixed(2),
        iva: ivaAmount.toFixed(2),
        total: total.toFixed(2)
    };

   
    localStorage.setItem('platillo', JSON.stringify(platillo));
    
   
    window.location.href = 'ticket.html';
}

window.onload = function() {
    const ticketDetails = document.getElementById('ticketDetails');
    const platilloJSON = localStorage.getItem('platillo');
    
    if (ticketDetails && platilloJSON) {
        const platillo = JSON.parse(platilloJSON);
        ticketDetails.innerHTML = `
            <h4>${platillo.nombre}</h4>
            <p>${platillo.descripcion}</p>
            <p>Subtotal: $${platillo.subtotal}</p>
            <p>IVA: $${platillo.iva}</p>
            <p>Total: $${platillo.total}</p>
        `;
    }
};

function crearPlatillo() {
    const nombre = document.getElementById('platilloNombre').value;
    const descripcion = document.getElementById('platilloDescripcion').value;
    const precio = parseFloat(document.getElementById('platilloPrecio').value);

    if (nombre && descripcion && !isNaN(precio)) {
        generar(nombre, descripcion, precio);
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}
