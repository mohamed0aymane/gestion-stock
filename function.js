var myDoc = getDoc("stock.xml");

// Charger un fichier XML
function getDoc(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    return xhttp.responseXML;
}




function getNextId() {
    var produits = myDoc.getElementsByTagName("produit");
    var maxId = 0;

    for (var i = 0; i < produits.length; i++) {
        var id = parseInt(produits[i].getAttribute("id"));
        if (id > maxId) {
            maxId = id;
        }
    }

    return maxId + 1;
}
// Ajouter un produit
function ajouter(nom, description, quantite, prix, categorie) {
    
    var id=getNextId();
    var produit = myDoc.createElement("produit");
    produit.setAttribute("id", id);

    var nomElem = myDoc.createElement("nom");
    nomElem.textContent = nom;
    produit.appendChild(nomElem);

    var descriptionElem = myDoc.createElement("description");
    descriptionElem.textContent = description;
    produit.appendChild(descriptionElem);

    var quantiteElem = myDoc.createElement("quantite");
    quantiteElem.textContent = quantite;
    produit.appendChild(quantiteElem);

    var prixElem = myDoc.createElement("prix");
    prixElem.textContent = prix;
    produit.appendChild(prixElem);

    var categorieElem = myDoc.createElement("categorie");
    categorieElem.textContent = categorie;
    produit.appendChild(categorieElem);

    myDoc.getElementsByTagName("stock")[0].appendChild(produit);
    init();
    afficher(myDoc); 
}

// Modifier un produit
function modifier(id,nom,description,quantite,prix,categorie) {
    var produit = myDoc.querySelector(`produit[id='${id}']`);
    if (produit) {
        if(nom){
            produit.getElementsByTagName("nom")[0].textContent = nom;
        }
        if(description){
            produit.getElementsByTagName("description")[0].textContent = description;

        }
        if(quantite){
            produit.getElementsByTagName("quantite")[0].textContent = quantite;

        }
        if(prix){    
            produit.getElementsByTagName("prix")[0].textContent = prix;
        }
       if(categorie){
            produit.getElementsByTagName("categorie")[0].textContent =categorie;

       }
        init();
        afficher(myDoc); 
    } else {
        alert("Produit introuvable.");
    }
}


// Supprimer un produit
function supprimer(id) {
    var produit = myDoc.querySelector(`produit[id="${id}"]`);
    if (produit) {
       
        produit.parentNode.removeChild(produit);

       
        init();
        afficher(myDoc);
        alert(`Produit avec l'ID ${id} supprimé.`);
    } else {
        alert("Produit introuvable.");
    }
}

// Afficher les details d'un produit sélectionné
function afficherDetailsProduit() {
    var comboBox = document.getElementById("produitsCombo");
    var selectedId = comboBox.value;

    var produit = myDoc.querySelector(`produit[id='${selectedId}']`);
    if (produit) {
        
        document.getElementById("produitId").textContent = produit.getAttribute("id");
        document.getElementById("produitNom").textContent = produit.getElementsByTagName("nom")[0].textContent;
        document.getElementById("produitDescription").textContent = produit.getElementsByTagName("description")[0].textContent;
        document.getElementById("produitQuantite").textContent = produit.getElementsByTagName("quantite")[0].textContent;
        document.getElementById("produitPrix").textContent = produit.getElementsByTagName("prix")[0].textContent;
        document.getElementById("produitCategorie").textContent = produit.getElementsByTagName("categorie")[0].textContent;
    } else {
        alert("Produit introuvable !");
    }
}

// Remplir les combo-boxs avec les produits
function remplirComboBox() {
    // Récupérer les éléments combo box
    var comboBox = document.getElementById("produitsCombo");
    var comboBoxDelete = document.getElementById("produitsComboDelete");

    // Vider les combo box avant de les remplir
    comboBox.innerHTML = "";
    comboBoxDelete.innerHTML = "";

    // Parcourir les produits existants
    var produits = myDoc.getElementsByTagName("produit");
    for (var i = 0; i < produits.length; i++) {
        var id = produits[i].getAttribute("id");
        var nom = produits[i].getElementsByTagName("nom")[0].textContent;

        // Créer une nouvelle option
        var option = document.createElement("option");
        option.value = id;
        option.textContent = `ID: ${id} - ${nom}`;

        // Ajouter l'option aux deux combo-boxs
        comboBox.appendChild(option);
        comboBoxDelete.appendChild(option.cloneNode(true));
    }
}


function afficherTousLesProduits() {
    var container = document.getElementById("allProducts");
    container.innerHTML = ""; // Vider le conteneur avant de le remplir

    var produits = myDoc.getElementsByTagName("produit");
    for (var i = 0; i < produits.length; i++) {
        var id = produits[i].getAttribute("id");
        var nom = produits[i].getElementsByTagName("nom")[0].textContent;
        var description = produits[i].getElementsByTagName("description")[0].textContent;
        var quantite = produits[i].getElementsByTagName("quantite")[0].textContent;
        var prix = produits[i].getElementsByTagName("prix")[0].textContent;
        var categorie = produits[i].getElementsByTagName("categorie")[0].textContent;

        // Créer une boîte pour chaque produit
        var productBox = document.createElement("div");
        productBox.className = "product-box";
        productBox.innerHTML = `
            <h4>${nom} (ID: ${id})</h4>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Quantité:</strong> ${quantite}</p>
            <p><strong>Prix:</strong> ${prix} MAD</p>
            <p><strong>Catégorie:</strong> ${categorie}</p>
        `;

        container.appendChild(productBox);
    }
}


// Fonction pour rechercher un produit par nom
function rechercherProduit() {
    var searchQuery = document.getElementById("searchBar").value.toLowerCase(); 
    var produits = myDoc.getElementsByTagName("produit"); 
    var container = document.getElementById("allProducts"); 

    container.innerHTML = ""; 

    for (var i = 0; i < produits.length; i++) {
        var nom = produits[i].getElementsByTagName("nom")[0].textContent.toLowerCase();
        var id = produits[i].getAttribute("id");
        var description = produits[i].getElementsByTagName("description")[0].textContent;
        var quantite = produits[i].getElementsByTagName("quantite")[0].textContent;
        var prix = produits[i].getElementsByTagName("prix")[0].textContent;
        var categorie = produits[i].getElementsByTagName("categorie")[0].textContent;

        // Si le nom du produit correspond à la recherche, l'afficher
        if (nom.includes(searchQuery)) {
            var productBox = document.createElement("div");
            productBox.className = "product-box";
            productBox.innerHTML = `
                <h4>${nom} (ID: ${id})</h4>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Quantité:</strong> ${quantite}</p>
                <p><strong>Prix:</strong> ${prix} MAD</p>
                <p><strong>Catégorie:</strong> ${categorie}</p>
            `;
            container.appendChild(productBox); // Ajouter la boîte au conteneur
        }
    }

    // Si aucune correspondance, afficher un message
    if (container.innerHTML === "") {
        container.innerHTML = "<p>Aucun produit trouvé.</p>";
    }
}

function init() {
    remplirComboBox(); 
    afficherTousLesProduits();// Remplir la liste des produits
    if (myDoc.getElementsByTagName("produit").length > 0) {
        document.getElementById("produitsCombo").selectedIndex = 0; // Sélectionner le premier produit
        afficherDetailsProduit(); // Afficher ses détails
    }
}
init();