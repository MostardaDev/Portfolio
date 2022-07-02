console.log("main js >>>>>>>>>>> OK")


function handlNameSubmit () {
    console.log("Handle Submit Called")
    var nameOfPlayer = document.getElementById("input-0").value;

    if (nameOfPlayer.length > 0) {
         alert(`olá ${nameOfPlayer}, vamos jogar?`) 
    } 
    else {
         alert("Por favor, me diga seu nome")
    }
}