
let contador = 1;

function adicionarProduto() {
    let produto = document.getElementById("produto").value;
    let marca = document.getElementById("marca").value;
    let preco = document.getElementById("preco").value;

    if (produto === "" || marca === "" || preco === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let tabela = document.getElementById("tabela-estudos");

    let novaLinha = tabela.insertRow();

    novaLinha.insertCell(0).innerText = contador;
    novaLinha.insertCell(1).innerText = produto;
    novaLinha.insertCell(2).innerText = marca;
    novaLinha.insertCell(3).innerText = "R$ " + preco;

    contador++;

    // Limpa os campos
    document.getElementById("produto").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("preco").value = "";
}
