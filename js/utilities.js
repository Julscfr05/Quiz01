document.addEventListener("DOMContentLoaded", function () {
    const seleccionarContinente = document.getElementById("seleccionarContinente");
    const datosPais = document.getElementById("datosPais");

    fetch("https://restcountries.com/v3.1/independent?status=true")
        .then(response => response.json())
        .then(data => {
            const continentes = new Set();
            data.forEach(pais => {
                const region = pais.region;
                if (region) {
                    continentes.add(region);
                }
            });

            continentes.add("Escoja un continente");

            continentes.forEach(continente => {
                const option = document.createElement("option");
                option.value = continente;
                option.text = continente;
                seleccionarContinente.appendChild(option);
            });
        })
        .catch(error => console.error(error));

    seleccionarContinente.addEventListener("change", function () {
        const continenteSeleccionado = seleccionarContinente.value;

        datosPais.innerHTML = "";

        if (continenteSeleccionado !== "Escoja un continente") {
            fetch(`https://restcountries.com/v3.1/all`)
                .then(response => response.json())
                .then(data => {
                    const paisContinente = data.filter(pais => pais.region === continenteSeleccionado);

                    paisContinente.forEach(pais => {
                        const fila = document.createElement("tr");
                        fila.innerHTML = `<td>${pais.name.common}</td><td>${pais.currencies ? Object.values(pais.currencies).map(c => c.name).join(', ') : 'N/A'}</td><td>${pais.flags ? `<img src="${pais.flags.png}" width="50" height="30">` : 'N/A'}</td><td>${pais.population ? pais.population.toLocaleString() : 'N/A'}</td><td>${pais.capital ? pais.capital : 'N/A'}</td>`;
                        datosPais.appendChild(fila);
                    });
                })
                .catch(error => console.error(error));
        }
    });
});