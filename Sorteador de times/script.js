// Array para armazenar os jogadores
const players = [];

// Função para adicionar um jogador à lista
function addPlayer() {
    // Obter o nome e nível do jogador do formulário
    const playerName = document.getElementById('playerName').value;
    const playerLevel = document.getElementById('playerLevel').value;

    // Verificar se ambos os campos estão preenchidos
    if (playerName && playerLevel) {

        //Verificar se o valor do nível é <= 5 para poder ser adicionado
        if (playerLevel <= 5){

        // Gerar um número para o jogador com base no comprimento da lista
        const playerNumber = players.length + 1;

        // Adicionar o jogador à lista
        players.push({ number: playerNumber, name: playerName, level: parseInt(playerLevel) });

        // Atualizar a exibição da lista de jogadores
        displayPlayers();

        // Limpar os campos do formulário
        document.getElementById('playerName').value = '';
        document.getElementById('playerLevel').value = '';
    } else{
        alert('Você digitou um número errado!')
    }
    }
}

// Função para excluir um jogador da lista
function deletePlayer(number) {
    // Encontrar o índice do jogador na lista
    const playerIndex = players.findIndex(player => player.number === number);

    // Verificar se o jogador foi encontrado
    if (playerIndex !== -1) {
        // Remover o jogador da lista
        players.splice(playerIndex, 1);

        // Atualizar a exibição da lista de jogadores
        displayPlayers();
    }
}

// Função para exibir os jogadores na página
function displayPlayers() {
    // Obter a lista de jogadores no HTML
    const playersList = document.getElementById('players');

    // Limpar a lista existente
    playersList.innerHTML = '';

    // Iterar sobre cada jogador na lista
    players.forEach(player => {
        // Criar um item de lista para o jogador
        const listItem = document.createElement('li');
        listItem.classList.add("listItem")
        listItem.textContent = `#${player.number} - ${player.name} (Nível ${player.level})`;

        // Criar um botão de exclusão para o jogador
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('deleteButton');
        deleteButton.onclick = () => deletePlayer(player.number);

        // Adicionar o botão de exclusão ao item de lista
        listItem.appendChild(deleteButton);

        // Adicionar o item de lista à lista de jogadores no HTML
        playersList.appendChild(listItem);
    });
}

// Função para sortear e exibir os times
function drawTeams() {
    // Verificar se há pelo menos 20 jogadores para formar os times
    if (players.length < 4 * 5) {
        alert('Adicione pelo menos 20 jogadores antes de sortear os times.');
        return;
    }

    // Criar uma cópia ordenada dos jogadores
    const sortedPlayers = players.slice().sort((a, b) => b.level - a.level);

    // Inicializar uma matriz para os times
    const teams = [[], [], [], []];

    // Distribuir os jogadores nos times
    while (sortedPlayers.length > 0) {
        for (let i = 0; i < teams.length && sortedPlayers.length > 0; i++) {
            const player = sortedPlayers.pop();
            teams[i].push(player);
        }
    }

    // Exibir os times na página
    displayTeams(teams);
}

// Função para exibir os times na página
function displayTeams(teams) {
    // Obter o contêiner de times no HTML
    const teamsContainer = document.getElementById('teams');

    // Limpar os times existentes
    teamsContainer.innerHTML = '';

    // Iterar sobre cada time
    teams.forEach((team, index) => {
        // Criar um contêiner para o time
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.innerHTML = `<h3>Time ${index + 1}</h3>`;

        // Iterar sobre cada jogador no time
        team.forEach(player => {
            // Criar um contêiner para o jogador
            const playerDiv = document.createElement('div');
            playerDiv.textContent = `#${player.number} - ${player.name} (Nível ${player.level})`;

            // Adicionar o jogador ao time
            teamDiv.appendChild(playerDiv);
        });

        // Adicionar o time ao contêiner de times no HTML
        teamsContainer.appendChild(teamDiv);
    });
}
