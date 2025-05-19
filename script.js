// Função principal que é executada quando o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Obtém referências aos elementos do DOM
    const decipherBtn = document.getElementById('decipher-btn');
    const returnBtn = document.getElementById('return-btn');
    const resultBox = document.getElementById('result');
    const starsTable = document.getElementById('stars-table');

    // Adiciona event listeners aos botões
    decipherBtn.addEventListener('click', decipherConstellations);
    returnBtn.addEventListener('click', resetForm);

    // Função para decifrar as constelações
    function decipherConstellations() {
        // Obtém os dados das estrelas da tabela
        const stars = getStarsData();

        // Valida se há pelo menos 2 estrelas
        if (stars.length < 2) {
            resultBox.innerHTML = '<div class="no-results">Por favor, insira pelo menos 2 estrelas.</div>';
            return;
        }

        // Calcula as conexões entre as estrelas
        const connections = findStarConnections(stars);

        // Exibe o resultado formatado
        displayResult(connections);
    }

    // Função para obter os dados das estrelas da tabela
    function getStarsData() {
        const rows = starsTable.querySelectorAll('tr');
        const stars = [];

        rows.forEach(row => {
            const idInput = row.querySelector('.id-input');
            const xInput = row.querySelector('.x-input');
            const yInput = row.querySelector('.y-input');

            // Verifica se todos os campos existem e têm valores válidos
            if (idInput && xInput && yInput &&
                idInput.value !== '' && xInput.value !== '' && yInput.value !== '') {
                stars.push({
                    id: parseInt(idInput.value),
                    x: parseFloat(xInput.value),
                    y: parseFloat(yInput.value)
                });
            }
        });

        return stars;
    }

    // Função para encontrar as conexões entre as estrelas
    function findStarConnections(stars) {
        const connections = [];
        const connected = new Set();

        // Começa com a primeira estrela
        connected.add(stars[0].id);

        // Enquanto nem todas as estrelas estiverem conectadas
        while (connected.size < stars.length) {
            let minDistance = Infinity;
            let closestPair = null;

            // Para cada estrela conectada, encontra a estrela não conectada mais próxima
            connected.forEach(connectedId => {
                const connectedStar = stars.find(s => s.id === connectedId);

                stars.forEach(star => {
                    if (!connected.has(star.id)) {
                        const distance = calculateDistance(connectedStar, star);

                        if (distance < minDistance) {
                            minDistance = distance;
                            closestPair = [connectedStar.id, star.id];
                        }
                    }
                });
            });

            // Adiciona a nova conexão e marca a estrela como conectada
            if (closestPair) {
                connections.push(closestPair);
                connected.add(closestPair[1]);
            }
        }

        return connections;
    }

    // Função para calcular a distância euclidiana entre duas estrelas
    function calculateDistance(star1, star2) {
        const dx = star1.x - star2.x;
        const dy = star1.y - star2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Função para exibir o resultado formatado
    function displayResult(connections) {
        if (connections.length === 0) {
            resultBox.innerHTML = '<div class="no-results">Nenhuma conexão encontrada.</div>';
            return;
        }

        // Formata o resultado como JSON estilizado
        let html = '<div class="json-container">';
        html += '<span class="json-bracket">[</span>\n';

        connections.forEach((conn, index) => {
            html += '<span class="json-line">';
            html += '  <span class="json-bracket">[</span>';
            html += `<span class="json-number">${conn[0]}</span>`;
            html += '<span class="json-comma">, </span>';
            html += `<span class="json-number">${conn[1]}</span>`;
            html += '<span class="json-bracket">]</span>';

            if (index < connections.length - 1) {
                html += '<span class="json-comma">,</span>';
            }

            html += '</span>\n';
        });

        html += '<span class="json-bracket">]</span>';
        html += '</div>';

        resultBox.innerHTML = html;
    }

    // Função para resetar o formulário
    function resetForm() {
        // Limpa o resultado
        resultBox.innerHTML = '<div class="no-results">Execute o algoritmo para ver as conexões</div>';

        // Reseta os valores dos inputs para os valores padrão
        const rows = starsTable.querySelectorAll('tr');
        const defaultValues = [
            { id: 1, x: 1, y: 5 },
            { id: 2, x: 2, y: 2 },
            { id: 3, x: 5, y: 5 },
            { id: 4, x: 3, y: 3 }
        ];

        rows.forEach((row, index) => {
            if (index < defaultValues.length) {
                row.querySelector('.id-input').value = defaultValues[index].id;
                row.querySelector('.x-input').value = defaultValues[index].x;
                row.querySelector('.y-input').value = defaultValues[index].y;
            } else {
                row.querySelector('.id-input').value = '';
                row.querySelector('.x-input').value = '';
                row.querySelector('.y-input').value = '';
            }
        });
    }
});