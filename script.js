document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;


    if (!(cepInformado.length === 8)) {
        return;
    }

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }
            document.getElementById("logradouro").value = data.logradouro || "";
            document.getElementById("bairro").value = data.bairro || "";
            document.getElementById("cidade").value = data.localidade || "";
            document.getElementById("estado").value = data.uf || "";
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
            alert("Erro ao buscar o CEP. Verifique sua conexão e tente novamente.");
        });
});

function salvarCep() {
    const cep = document.getElementById("cep").value;
    if (cep) {
        localStorage.setItem("cep", cep);
        localStorage.setItem("logradouro");
        localStorage.setItem("bairro");
        localStorage.setItem("cidade");
        localStorage.setItem("estado");

        document.getElementById("mensagem").innerHTML = "CEP salvo com sucesso!";
        document.getElementById("cep").value = "";
    } else {
        alert("Por favor, insira um CEP válido.");
    }
    
}
window.onload = function () {
        try {
            const cepSalvo = localStorage.getItem("cep");
            const logradouroSalvo = localStorage.getItem("logradouro");
            const bairroSalvo = localStorage.getItem("bairro");
            const cidadeSalvo = localStorage.getItem("cidade");
            const estadoSalvo = localStorage.getItem("estado");

            if (cepSalvo) {
                document.getElementById("cep").value =  cepSalvo || "";
                document.getElementById("logradouro").value = logradouroSalvo || "";
                document.getElementById("bairro").value = bairroSalvo || "";
                document.getElementById("cidade").value = cidadeSalvo || "";
                document.getElementById("estado").value = estadoSalvo || "";
                document.getElementById("mensagem").innerHTML = "Dados restaurados: CEP " + cepSalvo;
            }
        }
        catch (error) {
            console.error("Erro ao restaurar os dados:", error);
            alert("Erro ao restaurar os dados. Verifique sua conexão e tente novamente.");
        }
    }
