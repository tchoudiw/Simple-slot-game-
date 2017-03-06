/*
But: Jeu de roulette d'images
Concepteur: Eunice
Date de création: 8 oct 2014
 */

/*========================================================DEBUT===============================================================================/
/*
 * ************  Déclaration des variables globales et constantes***************************************** */

/*index pour images Nomenclature  */
// SeptChanceux = "0", Olive = "1", Orange = "2", Cerise = "3", Cloche = "4", UneBarre = "5", DeuxBarres = "6", TroisBarres = "7";

/*tableau réference sur les images et indique la position des images dans le tableau*/
var ImagesRoulette = new Array ("SeptChanceux.jpg", "Olive.jpg", "Orange.jpg", "Cerises.jpg", "Cloche.jpg", "UneBarre.jpg", "DeuxBarres.jpg", "TroisBarres.jpg");
/*Tableau des combinaisons gagnantes et le gain associé sous forme de string avec séparateur*/
var combiGagnant = new Array("7-7-7*250", "6-6-6*150", "5-5-5*100", "4-4-4*80", "7-5-6*120", "3-3-3*10", "3-3-X*5", "2-2-2*50", "2-2-X*30", "0-0-0*500", "0-0-X*200");
/*Nombre de roulette fixé à 3*/
var NB_SLOT = 3;
/*nombre d'image par roulette fixé à 23*/
var NB_Face = 23;
/*Constante valeur de la récompense*/
const RECOMPENSE = 0;
/*variable qui garde le nombre de fois que la roulette est une, deux ou trois barres*/
var nbBarre = 0;
/*nombre maximum de tour de la roulette*/
var NB_MAX_TOUR = 6;
/*Flag donne l'état de l'animation en cours ou pas*/
var isTurning = false;
/*tableau 2D qui emmagasine les roulettes*/


/* ****** variable élément de la DOM***************/
var element = document.getElementById("listComb");
var credit = document.getElementById("credit");
var gain = document.getElementById("gain");
var reset = document.getElementById("money1")
var stat = document.getElementById("stat");

/*************Fonction de création et gestion de Tableau ***********************************/
/*
 * Fonction qui crée et renvoi une référence sur un tableau 2D
 */
var creerTableau = function (nbRangees, nbColonnes) {
    var resultat = new Array(nbRangees);
    for (var i = 0; i < nbRangees; i++) {
        resultat[i] = new Array(nbColonnes);
    }
    return resultat;
};
/* aCréation du tableau 2D*/
var tab = creerTableau(NB_SLOT, NB_Face);
/*
 * chagement de position d'éléments dans un tableau
 */
var swap = function (t, from, to) {++ swap.calls;
    var temp = t[from];
    t[from] = t[to];
    t[to] = temp;
};
/*
 * shuffle d'un tableau mélange alléatoir
 */
var shuffle = function (t) {
    
    for (var i = 0; i < t.length;++ i) {
        if (t && t.length) {
            for (var k = 0; k < t[i].length;++ k) {
                var j = Math.floor(Math.random() * t[i].length);
                if (k !== j)
                swap(t[i], k, j);
            }
        }
    }
};
/*
 * Remplir ,initialisation du tableau alléatoirement
 */
function remplirTab(tab2d, tabRoulette) {
    var nl = tab2d.length, nc = tab2d[0].length;
    for (var i = 0; i < nl; i++) {
        //on place un seul 7 chanceux dans chaque roulette
        tab2d[i][0] = tabRoulette[0];
    }
    
    for (var i = 0; i < nl; i++) {
        var str = "";
        for (var j = 1; j < nc; j++) {
            var k = Math.floor(Math.random() * tabRoulette.length);
            tab2d[i][j] = tabRoulette[k];
            if (k >= tabRoulette.length)
            alert("debordement");
        }
    }
    shuffle(tab2d);
};


/** *****************Programtion des de l'animation des images *******************************/

remplirTab(tab, ImagesRoulette);
//le tableau 2D est remplis avec les les noms des fichiers sources des images
/*
 * Fonction change la source d'une image dans l'animation
 */
function changeImage(j) {
    for (var i = 0; i < NB_SLOT; i++) {
        var image = document.getElementById("play" + i);
        image.src = tab[i][j %(tab[i].length -1)];
    }
}
/*
 * fonction qui renvoi alléatoirement le nombre de tour necessaire pour tourner la roulette entre 2 et 6 tours
 */
function getNbTour() {
    return (Math.floor(Math.random() * (NB_MAX_TOUR -2)) + 2) * tab[0].length;
}
/*
 * Fontion responsable de l'animation des images et gère les aléas du jeu
 */
function animation() {
    var i = 0;
    var tour = getNbTour();
    shuffle(tab);
    if (parseInt(credit.innerHTML) <= 0) {
        //le credit doit est supérieur à 0
        alert("Warning There is No Credit please add before!");
    }
    if (! isTurning && credit.innerHTML > 0) {
        //l'animation doit se faire que lorsque les roulettes sont en arrêt
        Statistique.nbCoupJoue++;
        isTurning = true;
        setInterval(function () {
            //gestion de l'animation par callback
            i++;
            if (i < tour) {
                changeImage(i);
            }
            if (i === tour) {
                //fin de l'animation
                var gainCourant = getGain(getCombinaison()[1]);
                Statistique.keepCombinaison.push(getCombinaison()[0]);
                decrementCredit();
                updateCredit(gainCourant);
                updateGain(gainCourant);
                isTurning = false;
            }
        },
        100);
    } else {
        alert("Warning System is running!");
    }
}

/******************** Logique de jeu comptage des  credits **********************************/


/*
 *  Fonction retourne la combinaison obtenue apès une animation
 */

function getCombinaison() {
    var tab =[];
    var str1 = ""
    var str = "";
    for (var i = 0; i < NB_SLOT; i++) {
        var image = document.getElementById("play" + i);
        if (i === 2) {
            str += getCodeFruit(image.getAttribute("src"));
            str1 += image.getAttribute("src");
        } else {
            str += getCodeFruit(image.getAttribute("src")) + "-"
            str1 += image.getAttribute("src") + "-"
        }
    }
    tab.push(str1);
    tab.push(str);
    return tab;
}
/*
 * Fonction indexeur des entrées sources en code fruit
 */
function getCodeFruit(fruit) {
    switch (fruit) {
        case 'SeptChanceux.jpg': return "0";
        case 'Olive.jpg': return "1";
        case 'Orange.jpg': return "2";
        case 'Cerises.jpg': return "3";
        case 'Cloche.jpg': return "4";
        case 'UneBarre.jpg': return "5";
        case 'DeuxBarres.jpg': return "6";
        case 'TroisBarres.jpg': return "7";
        default: return "";
    }
}
/*
 * Fonction retourne le gain de la combinaison obtenue après animation
 */


function getGain(combinaison) {
    for (var i=0;i<combiGagnant.length;i++) {
        var gain = combiGagnant[i].split("*")[1];
        var debut = combinaison.slice(0, 3);
        if (combiGagnant[i].indexOf(combinaison) > -1) {
            return parseInt(gain);
        }
        if (combiGagnant[i].indexOf(debut) >= 0 && combiGagnant[i].indexOf("X") >= 0) {
            return parseInt(gain);
        }
    }
    return 0;
}



/*
 *  Fonction calcule et ajuste la valeur du credit après avoir obtenu la combinaison
 */
var actualCredit;
function decrementCredit() {
    actualCredit = parseInt(credit.innerHTML);
    actualCredit--;
    credit.innerHTML = actualCredit;
}

/*
 *  Fonction met ajour le credit
 */
function updateCredit(gainCourant) {
    actualCredit += gainCourant;
    Statistique.nbCredit = actualCredit;
    credit.innerHTML = actualCredit;
}
/*
 *  Fonction met à jour le gain obtenu
 */
function updateGain(gainCourant) {
    gain.innerHTML = gainCourant;
    Statistique.gain += gainCourant;
}
/*
 * Fonction qui initialise le Credit au lancement de la page
 * l'entée doit être en caractère numérique sinon n'est pas pris en compte
 */
function initCredit() {
    var newCredit = prompt("Nouveau Credit", 0);
    //l'utilisateur doit entrer un montant par le clavier
    while (parseInt(newCredit) <= 0 || parseInt(newCredit) + "" === "NaN") {
        //validation du format
        newCredit = prompt("Credit de Départ", 0);
    }
    credit.innerHTML = parseInt(newCredit);
    Statistique.miseDepart = parseInt(newCredit);
}
/*
 * Fonction de remise à zéro du système et affiche des statistiques
 * permet de remettre l'argent obtenu en credit et fin du jeu
 */
function resetGame() {
    
    if (!isTurning && parseInt(credit.innerHTML) > 0 || Statistique.keepCombinaison.length>0 &&!isTurning && parseInt(credit.innerHTML) === 0) {
        document.getElementById("listComb").innerHTML = "";
        credit.innerHTML = 0;
        afficheStat();
        reset.style.disabled = true;
    }
}


/****************************Gestion des  Statistiques ***********************************************/
/*
 * Objet Statistique pour encapsuler les données statistiques souhaitées
 */
var Statistique = {
    miseDepart: 0,
    nbCoupJoue: 0,
    gain: 0,
    nbCredit: 0,
    keepCombinaison:[],
    moyenneCoup: function () {
        //calule de la moyenne par coup
        if (this.nbCoupJoue === 0) {
            return 0
        } else {
            return this.gain/this.nbCoupJoue;
        }
    }
}
/*
 * Fonction Responsable de l'afichage des données statistiques
 */
function afficheStat() {
    document.getElementById("miseDepart").innerHTML = Statistique.miseDepart;
    document.getElementById("nbCoupjoue").innerHTML = Statistique.nbCoupJoue;
    document.getElementById("gainTotal").innerHTML = Statistique.gain;
    document.getElementById("moyCoup").innerHTML = Statistique.moyenneCoup();
    document.getElementById("crediRetoune").innerHTML = Statistique.nbCredit;
    createList(Statistique.keepCombinaison);
    stat.style.display = 'table';
}

/*
 *  Fonction d'ordre générales qui permet de creer une liste et afficher dans un tableau élément HTML
 */
function createList(tab) {
    var disp = "<table>";
    disp += "<legend>Liste des combinaisons et leur nombre </legend>"
    disp += "<tr><th>Nombre</th> <th>Combinaisons obtenues</th></tr>"
    for (var i = 0; i < tab.length; i++) {
        disp += "<tr><td>" + numberInTab(tab, tab[i]) + "</td> <td>" + tab[i].split(".jpg").join("  ") + "</td></tr>";
    }
    disp += "</table>";
    element.innerHTML = disp;
}
/*
 *  Fonction donne le nombre d'apparition d'une combinaison durant la partie
 */
function numberInTab(tab, val) {
    var count = 0;
    for (var i = 0; i < tab.length; i++) {
        if (val === tab[i]) {
            count++ ;
        }
    }
    return count;
}


/** **************** gestion des évènements ******************/

/*
 * Fonction de la page et de paramètres au chargement de la page
 */
function initialise() {
    isTurning = false;
    var moneyBack = document.getElementById("money1");
    stat.style.display = 'none';
    moneyBack.src = "remise.jpg";
    moneyBack.style.width = "80px";
    moneyBack.style.height = "80px";
    
    for (var i = 0; i < NB_SLOT; i++) {
        //affichage alléatoir des trois images de départ
        var image = document.getElementById("play" + i);
        image.src = tab[i][Math.floor(Math.random() * tab[i].length)];
        image.style.width = "80px";
        image.style.height = "80px";
    }
}
/*
 * Function Handler pour les images des roulettes ajout d'évènement
 */
function imageHandle() {
    
    for (var i = 0; i < NB_SLOT; i++) {
        var image = document.getElementById("play" + i);
        image.addEventListener("click", animation, false);
    }
}
/*
 * Fonction Handler des évènements de la page
 */
function eventsHandler() {
    initialise();
    reset.addEventListener("click", resetGame, false);
    initCredit();
    imageHandle();
}


window.addEventListener("load", eventsHandler);
// ajout du Handler au chargement de la page

/*==========================================Fin============================================================================*/