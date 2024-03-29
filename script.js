// Creation de deux variables constantes (qu'0n ne peut pas changer)
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let message = document.querySelector(".message-container");


// Creation de la fonction ajouter (lorsque l'on click sur le bouton ajouter)

function Ajouter() {
    // si l'utilisateur n'ecris rien il y'aura cette alert
    if (inputBox.value === '') {
        alert("Tu dois écrire quelque chose!");
    }
    // sinon la fonction s'execute en créant un nouveau li (liste)
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        message.classList.toggle("success");
        message.textContent = "Tâche ajouté";

        setTimeout(() => {
            message.classList.toggle("success");
          }, 2000);
          
        // ajout du span x pour chaque li
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    // récuperation de la valeur saisie
    inputBox.value = "";

    // Appel de la fonction qui sauvegarde les données
    saveData();
}
// Fin de la fonction

/* 
Ajouter un écouteur d'événement (addEventListener) click dans list-container 
pour verifier si nous avons cliqué sur le li (liste)
*/
listContainer.addEventListener("click", function (e) {
    //  si le clic est sur le li, il va cocher la liste 
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }

    // si le clic est sur le span (x), il supprimera l'element parent (li (liste))
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        message.classList.toggle("error");
        message.textContent = "Tâche supprimé";

        setTimeout(() => {
            message.classList.toggle("error");
          }, 2000);      

    }
}, false);


/*Création de la fonction qui va gerer la sauvegarde des données 
Il enregistre la valeur dans le navigateur avec le nom datas
*/
function saveData() {
    localStorage.setItem("datas", listContainer.innerHTML);
}

// Fonction pour afficher les données sauvegarder a chaque ouverture du navigateur ou rafraichissement de la page

function showTask() {
    listContainer.innerHTML = localStorage.getItem("datas");
}
showTask();