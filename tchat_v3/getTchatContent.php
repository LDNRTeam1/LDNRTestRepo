<?php
    header("Access-Control-Allow-Origin: *");
    $file="tchatContent.html";
    if (! file_exists($file)) { // Si le fichier n'existe pas...
        fopen($file, "w");// ...on le crée !
    }
    // Récupération et retour du contenu du fichier
    echo file_get_contents($file);
?>
