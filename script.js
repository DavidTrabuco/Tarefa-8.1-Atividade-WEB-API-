 document.getElementById("cep").addEventListener("blur", (evento) => {
            const elemento = evento.target;
            const cepInformado = elemento.value.replace(/\D/g, ''); // Remove caracteres não numéricos

            if (cepInformado.length !== 8) {
                alert("Por favor, insira um CEP com 8 dígitos.");
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
            const logradouro = document.getElementById("logradouro").value;
            const bairro = document.getElementById("bairro").value;
            const cidade = document.getElementById("cidade").value;
            const estado = document.getElementById("estado").value;

            if (cep && logradouro && bairro && cidade && estado) {
                localStorage.setItem("cep", cep);
                localStorage.setItem("logradouro", logradouro);
                localStorage.setItem("bairro", bairro);
                localStorage.setItem("cidade", cidade);
                localStorage.setItem("estado", estado);

                document.getElementById("mensagem").innerHTML = "Dados salvos com sucesso!";
                document.getElementById("cep").value = "";
                document.getElementById("logradouro").value = "";
                document.getElementById("bairro").value = "";
                document.getElementById("cidade").value = "";
                document.getElementById("estado").value = "";
            } else {
                alert("Por favor, preencha todos os campos. Digite um CEP válido para buscar os dados.");
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
                    document.getElementById("cep").value = cepSalvo || "";
                    document.getElementById("logradouro").value = logradouroSalvo || "";
                    document.getElementById("bairro").value = bairroSalvo || "";
                    document.getElementById("cidade").value = cidadeSalvo || "";
                    document.getElementById("estado").value = estadoSalvo || "";
                    document.getElementById("mensagem").innerHTML = "Dados restaurados: CEP " + cepSalvo;
                }
            } catch (error) {
                console.error("Erro ao restaurar os dados:", error);
                alert("Erro ao restaurar os dados. Verifique sua conexão e tente novamente.");
            }
        };