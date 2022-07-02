console.log("Main js ............ ok")

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
                this.playerCritChance = 0.6;
                break;
        }
    }
}

function resetHUB () {
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
            Vida: ${player.playerLevel}
        </p>
    </div>
    `
    rpgZone.appendChild(hub)
}


function chooseRole(role) {
    document.querySelector('.class-choice').remove();
    player.addRole(role);
    console.log(player)
    resetHUB(); 
}

function showClassChoice (nome) {
    player = new Player(nome);
    console.log(player)
    document.querySelector(".title-area").remove();
    document.querySelector(".input-area").remove();
    const classChoice = document.createElement("div")
    classChoice.className = "class-choice";
    classChoice.innerHTML = `
    <div class="playerOptions">
    <p>Ok ${nome}! Agora Escolha sua classe</p>
        <buttom onclick="chooseRole('warrior')">Guerreiro</buttom>
        <buttom onclick="chooseRole('mage')">Mago</buttom>
        <buttom onclick="chooseRole('rogue')">Ladino</buttom>
    </div>
    `
    rpgZone.appendChild(classChoice)
} 

// step 0
function handleNameSubmit (e) {
    console.log("Handle Submit Called")
    const nameOfPlayer = document.getElementById("input-0").value;
    if (nameOfPlayer.length > 0 ) {
        showClassChoice(nameOfPlayer);
    } else {
        alert("Por favor, fala seu nome")
    }
}