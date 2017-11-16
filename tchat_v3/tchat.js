// Partie écrite par Gilles Cros
//------------------------------
var elt = document.getElementById('submit');
var pseudo = "";
var message = "";
elt.addEventListener('click', fonctionsub);
var xhr = new XMLHttpRequest();
var xhr1 = new XMLHttpRequest();

function fonctionsub() {
    var pseudo = document.getElementById('pseudo').value;
    var message = document.getElementById('message').value;

    // les remplacements suivants seront fait par vladimir un peu plus bas
    //    message=message.replace('[/','</');
    //    message=message.replace('[','<');
    //    message=message.replace(']','>');

    if ((pseudo != "") && (message != "")) {
        var urlPost = 'putTchatContent.php';
        xhr1.open('POST', urlPost);
        let formData = new FormData();
        pseudo = "[b]" + pseudo + "[/b]";
        formData.append('pseudo', pseudo);
        formData.append('message', message);
        xhr1.send(formData);
    }

}

var eltg = document.getElementById('gras');
eltg.addEventListener('click', miseEnForme);

var elti = document.getElementById('italic');
elti.addEventListener('click', miseEnForme);

var eltb = document.getElementById('barre');
eltb.addEventListener('click', miseEnForme);

var eltr = document.getElementById('red');
eltr.addEventListener('click', miseEnForme);

var eltee = document.getElementById('sourire');
eltee.addEventListener('click', miseEnForme);

var eltes = document.getElementById('surpris');
eltes.addEventListener('click', miseEnForme);

var eltep = document.getElementById('pleure');
eltep.addEventListener('click', miseEnForme);

var eltem = document.getElementById('tirelangue');
eltem.addEventListener('click', miseEnForme);

function miseEnForme(v) {
    var el = document.form.message;
    var start = el.selectionStart;
    var end = el.selectionEnd;
    v = this.value;
    var selectedText = el.value.substring(start, end);
    var selectedWithTag = "[" + v + "]" + selectedText + "[/" + v + "]";
    if (v == "r") {
        selectedWithTag = "[color=red]" + selectedText + "[/color]";
    } else if (v == "ee") {
        var selectedWithTag = ":-)" + selectedText;
    } else if (v == "es") {
        var selectedWithTag = ":-O" + selectedText;
    } else if (v == "et") {
        var selectedWithTag = ":-p" + selectedText;
    } else if (v == "ep") {
        var selectedWithTag = ":-(" + selectedText;
    }
    el.focus();
    el.value = el.value.substring(0, start) + selectedWithTag + el.value.substring(end);
    return;
}
// Fin de la Partie écrite par Gilles Cros





//Partie GET_Vladimir
//---------------------------------------

//chargement historique des messages à l'ouverture
window.addEventListener("load", acualisationMessage);
//actualisation du tchat à intervalles réguliers
const intervalMessage = setInterval(acualisationMessage, 30000);

function acualisationMessage() { //fonction requete GET
    const urlGet = 'getTchatContent.php';
    //Requete GET
    xhr.open('GET', urlGet);
    xhr.addEventListener('load', function () {

        //fonction d'affichage du message
        afficheResultats(xhr.responseText);
    });
    xhr.send(null);
}

//fonction d'affichage du message
function afficheResultats(resultat) {
    let blocTexte = document.getElementById('tchat'), //élément contenant les messages
        textReponse = resultat.split('<br>'), //séparation des messages à partir du contenu de tchatContent.html
        longueurHistorique = 0;
    blocTexte.innerHTML = ""; //initialisation élément tchat
    //limite la longueur de l'historique aux 50 derniers messages
    if (textReponse.length > 50) longueurHistorique = 50;
    else longueurHistorique = textReponse.length;
    //boucle affichage historique messages dans l'ordre inverse:
    for (let i = 0; i < longueurHistorique; i++) {
        //insertion messages dans l'élément tchat
        let liste = document.createElement('div');
        liste.appendChild(document.createTextNode(textReponse[i]));
        bbcode(liste); //conversion bbcode, smiley en éléments html
        blocTexte.appendChild(liste); //element d'id='tchat' du doc html qui contient les div
    }
}

//Fonction remplacement pseudo en gras, BBCode et smiley
function bbcode(messageBbcode) {
    //Bbcode, pseudo
    messageBbcode.innerHTML = messageBbcode.innerHTML.replace(/\[([bis])\](.+?)\[\/\1\]/g, '<$1>$2</$1>');
    messageBbcode.innerHTML = messageBbcode.innerHTML.replace(/\[color=red\](.+?)\[\/color\]/g, "<span class='rouge '>$1</span>");
    //Smiley
    messageBbcode.innerHTML = messageBbcode.innerHTML.replace(/\:\-\)/g, "<img src='images/sourire.png' class='emoticones' alt='sourire'>");
    messageBbcode.innerHTML = messageBbcode.innerHTML.replace(/\:\-\(/g, "<img src='images/pleure.png' class='emoticones' alt='triste'>");
    messageBbcode.innerHTML = messageBbcode.innerHTML.replace(/\:\-\p/g, "<img src='images/tirelangue.png' class='emoticones' alt='tirelangue'>");
    messageBbcode.innerHTML = messageBbcode.innerHTML.replace(/\:\-\O/g, "<img src='images/surpris.png' class='emoticones' alt='surprise'>");
}
