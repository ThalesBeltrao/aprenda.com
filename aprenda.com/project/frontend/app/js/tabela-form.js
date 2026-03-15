document.addEventListener("DOMContentLoaded", function() {
    const btnAdicionar = document.querySelector(".form-estudo01 button");
    const tabelaCorpo = document.getElementById("tabela-estudos");
    const linhas = tabelaCorpo.querySelectorAll("tr");
    
    let proximaLinha = 0; 

    btnAdicionar.addEventListener("click", function() {
        const materia = document.getElementById("input-materia").value;
        const topico = document.getElementById("input-topico").value;
        const tempoString = document.getElementById("input-tempo").value; // O texto do input
        const data = document.getElementById("Data").value;

        if (!materia || !data || !tempoString || !topico) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        if (proximaLinha < linhas.length) {
            const colunas = linhas[proximaLinha].querySelectorAll("td");

            // 1. Preenche a tabela visualmente para o usuário
            colunas[1].textContent = materia;
            colunas[2].textContent = topico;
            colunas[3].textContent = tempoString; // Ex: "00:01:30"
            colunas[4].textContent = data;

            // 2. Lógica para o FastAPI: Conversão para segundos inteiros
            if (typeof timer !== 'undefined') {
                const segundosInteiros = Math.floor(timer / 100);
                
                const dadosParaEnviar = {
                    materia: materia,
                    topico: topico,
                    tempo_segundos: segundosInteiros, // Enviará 90
                    data: data
                };

                console.log("JSON pronto para o FastAPI:", dadosParaEnviar);
                
                // Dica: Se quiser zerar o cronômetro após adicionar, descomente abaixo:
                // timer = 0;
                // setTimer(0);
            }

            proximaLinha++; 
            document.querySelector(".form-estudo01").reset();
            
        } else {
            alert("O painel de 5 registros está cheio!");
        }
    });
});