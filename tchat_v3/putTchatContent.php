<?php 
header('Access-Control-Allow-Origin: *'); 
//On récupère le pseudo et on le stocke dans une variable 
$pseudo = isset($_POST['pseudo'])?$_POST['pseudo']:'unknown'; 
//On fait de même avec le message 
$message = isset($_POST['message'])?$_POST['message']:''; //Le message est créé 
$ligne = $pseudo.' > '.$message.'<br>'; 
//On lit le fichier 'tchatContent.htm' et on stocke la réponse dans une variable (de type tableau) 
$tchatContent = file('tchatContent.html'); 
//On ajoute le texte calculé dans la ligne précédente au début du tableau 
array_unshift($tchatContent, $ligne); 
//On écrit le contenu du tableau $tchatContent dans le fichier tchatContent.htm 
file_put_contents('tchatContent.html', $tchatContent); 
?>
