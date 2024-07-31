function generarDNI() {
    const listaDNI = [];
    for (let i = 0; i < 10; i++) {
        const dni = generarNumeroDNI();
        const letra = calcularLetraDNI(dni);
        const dniCompleto = dni + letra;
        listaDNI.push(dniCompleto);
    }
    mostrarDNIs(listaDNI);
}

function generarNumeroDNI() {
    // Genera un número aleatorio de 8 dígitos
    return String(Math.floor(Math.random() * 100000000)).padStart(8, '0');
}

function calcularLetraDNI(dni) {
    const multiples = [3, 2, 7, 6, 5, 4, 3, 2];
    const dcontrols = {
        numbers: [6, 7, 8, 9, 0, 1, 1, 2, 3, 4, 5],
        letters: ['K', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    };

    const numdni = dni.split('');
    const dsum = numdni.reduce((acc, digit, index) => {
        acc += digit * multiples[index];
        return acc;
    }, 0);

    const key = 11 - (dsum % 11);
    const index = (key === 11) ? 0 : key;

    // Retorna la letra correspondiente
    return dcontrols.letters[index];
}

function mostrarDNIs(listaDNI) {
    const dnisDiv = document.getElementById('dnis');
    dnisDiv.innerHTML = '<ul>' + listaDNI.map(dni => `<li onclick="copiarDNI('${dni}')">${dni}</li>`).join('') + '</ul>';
}

function copiarDNI(dni) {
    // Copia el DNI al portapapeles
    navigator.clipboard.writeText(dni).then(() => {
        // Muestra el mensaje de confirmación
        const message = document.getElementById('copied-message');
        message.style.display = 'block';
        setTimeout(() => message.style.display = 'none', 2000);
    });
}
