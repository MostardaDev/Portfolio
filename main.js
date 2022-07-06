const rpgZone = document.querySelector(".rpg-zone")
let player;

class Player {
    constructor(name) {
        this.PlayerName = name;
        this.PlayerLife = 100;
        this.playerDamage = 10;
        this.playerLevel = 1;
        this.playerCritChance = 0.1;
    }  addRole(role) {
        switch (role) {
            case "warrior":
                this.playerDamage = 20;
                //this.PlayerLife = 80;
                break;
            case "mage":
                //this.playerDamage = 8;
                this.PlayerLife = 120;
                //this.playerCritChance = 0.3;
                break;
            case "rogue":
                //this.playerDamage = 15;
                //this.PlayerLife = 90;
                this.playerCritChance = 1.6;
                break;
        }
    }
}

function rollDice() {
    let dice = Math.floor(Math.random() * 20) + 1;
    dice = dice + (player.playerCritChance * 2)
    console.log(dice);  
    if (dice <= 1.2) {
        player.PlayerLife = player.PlayerLife - 100;
    }
    if (dice > 16) {
        return true;
    } else {
        return false;
    }
}
 

function handleOption(id, optionId) {
    const result = rollDice();
    const situationsDiv = document.querySelector(".situation");
    situationsDiv.remove();
    const resultDiv = document.createElement("div");
    resultDiv.className = "result";
    const option = data.situations[id].options[optionId];
    if (result) {
        player.PlayerLife += option.success.bonus;
        player.playerLevel ++;
        resultDiv.innerHTML= `
        <div class="results">
            <p>${option.success.description}</p>
            <button onclick="generateSituation()">Continuar</button>
        </div>
    `;       
    } else {
        player.PlayerLife -= option.fail.damage;
        player.playerLevel ++;
        resultDiv.innerHTML= `
        <div class="results">
            <p>${option.fail.description}</p>
            <button onclick="generateSituation()">Continuar</button>
        </div>
    `  
    }
  rpgZone.appendChild(resultDiv);
}

function resetHUB() {
    if (document.querySelector(".hub")){
        document.querySelector(".hub").remove();
    }
    const hub = document.createElement("div")
    hub.className = "hub"
    hub.innerHTML = `
    <div class="hub-inner">
        <p class="hub-inner-left">
            Vida: ${player.PlayerLife}
        </p>
        <p class="hub-inner-center">
            Nome: ${player.PlayerName}
        </p>
        <p class="hub-inner-right">
            Level: ${player.playerLevel}
        </p>
    </div>
    `
    rpgZone.appendChild(hub)
}

function generateSituation() {
    resetHUB();
    if (player.PlayerLife <= 0) {
        alert('Voce Morreu!');
        return window.location.href = './index.html';
    };
    document.querySelector('.result')?.remove();
    const situations = data.situations[Math.floor(Math.random() * data.situations.length)];
    const situationsDiv = document.createElement("div");
    situationsDiv.className = "situation";
    situationsDiv.innerHTML = `
    <div class="situation-inner">
        <p>
            ${situations.description}
        </p>
        <div class="situation-inner-options">
            <button onclick="handleOption(${situations.id}, 0)">${situations.options[0].description}</button>
            <button onclick="handleOption(${situations.id}, 1)">${situations.options[1].description}</button>
        </div>
    </div>
    `
    rpgZone.appendChild(situationsDiv);
}

function chooseRole(role) {
    document.querySelector('.class-choice').remove();
    player.addRole(role);
    resetHUB(); 
    generateSituation();
}

function showClassChoice (nome) {
    player = new Player(nome);
    document.querySelector(".title-area").remove();
    document.querySelector(".input-area").remove();
    const classChoice = document.createElement("div")
    classChoice.className = "class-choice";
    classChoice.innerHTML = `
    <div class="playerOptions">
    <p>Ok ${nome}! Agora Escolha sua classe</p>
        <button onclick="chooseRole('warrior')">Guerreiro</button>
        <button onclick="chooseRole('mage')">Mago</button>
        <button onclick="chooseRole('rogue')">Ladino</button>
    </div>
    `
    rpgZone.appendChild(classChoice)
} 

// step 0
function handleNameSubmit (e) {
    const nameOfPlayer = document.getElementById("input-0").value;
    if (nameOfPlayer.length > 0 ) {
        showClassChoice(nameOfPlayer);
    } else {
        alert("Por favor, fala seu nome")
    }
}