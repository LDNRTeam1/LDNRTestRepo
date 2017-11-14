function afficherErreur() {
    var boolNom = erreurNom(champNom);
    var boolAge = erreurAge(champAge);
    var boolPseudo = erreurPseudo(champPseudo);
    var boolPwd = erreurPwd(champPwd);
    var boolConfirm = erreurConfirm(champConfirm);
    var boolGenre = erreurGenre();
    var boolPays = erreurPays(listePays);

    if (boolNom === false || boolAge === false || boolPseudo === false || boolPwd === false || boolConfirm === false || boolGenre === false || boolPays === false) {
        return "erreur";
    } else {
        return "paserreur";
    }

}



// surligne les champs qui où une erreur est detectée
function surligne(champ, erreur) {
    if (erreur)
        champ.style.backgroundColor = "#fba";
    else
        champ.style.backgroundColor = "";
}

// fonction verification du nom au moins 2 char
function erreurNom(champNom) {
    if (champNom.value.length < 2) {
        surligne(champNom, true);
        return false;
    } else {
        surligne(champNom, false);
        return true;
    }
}


// fonction verification de l'age 4 < age < 141
function erreurAge(champAge) {
    var age = parseInt(champAge.value);
    if (isNaN(age) || age < 5 || age > 140) {
        surligne(champAge, true);
        return false;
    } else {
        surligne(champAge, false);
        return true;
    }
}

// fonction verification du pseudo >= 4
function erreurPseudo(champPseudo) {
    if (champPseudo.value.length < 4) {
        surligne(champPseudo, true);
        return false;
    } else {
        surligne(champPseudo, false);
        return true;
    }
}

// fonction verification du mot de passe >= 6
function erreurPwd(champPwd) {
    if (champPwd.value.length < 6) {
        surligne(champPwd, true);
        return false;
    } else {
        surligne(champPwd, false);
        return true;
    }
}

// fonction verification confirmation
function erreurConfirm(champConfirm) {
    if (champConfirm.value === champPwd.value) {
        surligne(champConfirm, false);
        return true;
    } else {
        surligne(champConfirm, true);
        return false;
    }
}

// fonction verification genre select
function erreurGenre() {
    if (document.getElementById('gender_Male').checked || document.getElementById('gender_Female').checked) {
        return true;
    } else {
        return false;
    }
}

//fonction verification si pays selectionné
function erreurPays(listePays) {
    var selectedValue = listePays.options[listePays.selectedIndex].value;
    if (selectedValue == "none") {
        surligne(listePays, true);
        return false;
    } else {
        surligne(listePays, false);
        return true;
    }
}





const listePays = document.getElementById("pays");
const champPwd = document.getElementById('pwd');
const champConfirm = document.getElementById('confirmation');
const champPseudo = document.getElementById('pseudo');
const champNom = document.getElementById('nom');
const btnSubmit = document.getElementById('submit');
const champAge = document.getElementById('age');
const form = document.getElementById('inscriptionForm');



// affiche ou desactive le texte erreur nom
champNom.addEventListener('keypress', function () {
    var spanNom = document.getElementById("spanNom");
    var boolNom2 = erreurNom(champNom);
    if (boolNom2 === false) {
        spanNom.style.display = 'inline';
    } else {
        spanNom.style.display = 'none';
    }
});


// affiche ou desactive le texte erreur age
champAge.addEventListener('blur', function () {
    var spanAge = document.getElementById("spanAge");
    var boolAge2 = erreurAge(champAge);
    if (boolAge2 === false) {
        spanAge.style.display = 'inline';
    } else {
        spanAge.style.display = 'none';
    }
});


// affiche ou desactive le texte erreur pseudo
champPseudo.addEventListener('keypress', function () {
    var spanPseudo = document.getElementById("spanPseudo");
    var boolPseudo2 = erreurPseudo(champPseudo);
    if (boolPseudo2 === false) {
        spanPseudo.style.display = 'inline';
    } else {
        spanPseudo.style.display = 'none';
    }
});

// affiche ou desactive le texte erreur mot de pass
champPwd.addEventListener('blur', function () {
    var spanPwd = document.getElementById("spanPwd");
    var boolPwd2 = erreurPwd(champPwd);
    if (boolPwd2 === false) {
        spanPwd.style.display = 'inline';
    } else {
        spanPwd.style.display = 'none';
    }
});

// affiche ou desactive le texte erreur confirmation mot de pass
champConfirm.addEventListener('blur', function () {
    var spanConfirm = document.getElementById("spanConfirm");
    var boolConfirm2 = erreurConfirm(champConfirm);
    if (boolConfirm2 === false) {
        spanConfirm.style.display = 'inline';
    } else {
        spanConfirm.style.display = 'none';
    }
});


// affiche ou desactive le texte erreur de selection de pays
listePays.addEventListener('blur', function () {
    var spanListe = document.getElementById("spanListe");
    var boolPays2 = erreurPays(listePays);
    if (boolPays2 === false) {
        spanListe.style.display = 'inline';
    } else {
        spanListe.style.display = 'none';
    }
});



btnSubmit.addEventListener('click', function mySubmitFunction(e) {
    var boolTous = afficherErreur();
    if (boolTous == "erreur") {
        e.preventDefault();
        alert(boolTous);

    } else {
        alert(" saisie OK, envoie du formulaire");
    }


});
