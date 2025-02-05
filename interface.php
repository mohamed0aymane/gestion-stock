<?php
// Charger le fichier XML
$doc = new DOMDocument();
$doc->load('stock.xml');

// Exécuter XQuery
$xpath = new DOMXPath($doc);
$xpath->registerNamespace("x", "http://www.w3.org/2005/xpath-functions");

// Requête XQuery pour les produits avec un prix supérieur à 400
$query = "//produit[prix > 400]";

// Récupérer les produits
$produits = $xpath->query($query);

// Afficher le résultat sous forme de tableau HTML
$result = '';
foreach ($produits as $produit) {
    $id = $produit->getAttribute('id');
    $nom = $produit->getElementsByTagName('nom')[0]->nodeValue;
    $description = $produit->getElementsByTagName('description')[0]->nodeValue;
    $quantite = $produit->getElementsByTagName('quantite')[0]->nodeValue;
    $prix = $produit->getElementsByTagName('prix')[0]->nodeValue;
    $categorie = $produit->getElementsByTagName('categorie')[0]->nodeValue;

    // Construire la ligne du tableau
    $result .= "<tr>
                    <td>$id</td>
                    <td>$nom</td>
                    <td>$description</td>
                    <td>$quantite</td>
                    <td>$prix</td>
                    <td>$categorie</td>
                </tr>";
}

// Retourner le HTML au navigateur
echo $result;
?>
