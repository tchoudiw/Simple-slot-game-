/*
   But: Expliquer le but du code      
   Concepteur: Votre nom                 
   Date de création: 9 sept 2014                         
*/
                        
*/
var NB_Images = 8; //Quelconque
var SeptChanceux = 0;
var Olive  = 1; 
var Orange = 2;
var Cerise = 3;
var Cloche = 4;
var UneBarre = 5;
var DeuxBarres = 6;
var TroisBarres = 7;
var i = -1;

var PREFIX_POSITION_DE_ID = "dePositionId";

var Roulette = [[septChanceux], 
               [Olive],
               [Orange],
               [Cerise],
			   [Cloche],
			   [UneBarre],
			   [DeuxBarres],
			   [TroisBarres]];
			   

var Images_Roulette = ["SeptChanceux.jpg" 
                       "Olive.jpg"
                       "Orange.jpg",
					   "Cerise.jpg",
                       "Cloche.jpg",
				       "UneBarre.jpg",
				       "DeuxBarres.jpg",
				       "TroisBarres.jpg"];
					   
					   
var Gains = [500, 250, 150, 80, 80, 50, 50, 40, 30, 15, 10, 5, 2];					   

			
var NB_MIN_TOURS = 3;
var NB_MAX_TOURS = 23;
var DELAI = 100;
var PositionDesRoulettes = [0, 0, 0, 0, 0, 0, 0];
var nbFoisCombinaison = [0, 0, 0, 0, 0, 0, 0];


function CombinaisonRoulette(LapositionRoulette)

document.writeln("<pre>");

{
	document.write("<ul>");
	do{
		document.write("<li>");
		var NB_Credit = prompt("Entrez le nombre de credit que vous voulez inserer dans la machine:");
		document.write(NB_Credit);
		document.write("</li>");
	} 
	while (confirm("vous avez entré: " + NB_Credit + "Etes-vous sur (e) de votre montant ?"));
	
	document.write("</ul>");
}

{
//Pour chaque position de Roulettes
	PositionDesRoulettes[LapositionRoulette] = 
	(PositionDesRoulettes[LapositionRoulette] + 1) % NB_Images; 
	document.getElementById(PREFIX_POSITION_DE_ID + LapositionRoulette).src = 
	Images_Roulette[PositionDesRoulettes[LapositionRoulette]];
	
} 

function declencheAnimation()
{
	//Pour chaque position de roulettes
	for (var i = 0; i < NB_Images; i++){
		//Conserve le nombre d'image a afficher
		//NB_MIN_TOURS * NB_Images est le nombre minimal
		nbFoisCombinaison[i] = Math.floor((Math.random() * ((NB_MAX_TOURS - NB_MIN_TOURS + 1) *
		NB_Images)) + NB_MIN_TOURS * NB_Images);
	}
	
	setTimeout(animation, DELAI);
}

function animation()
{
	var onContinue = false;
	
	//Pour chaque position de de
	for (var i = 0; i < NB_Images; i++){
	    if (nbFoisCombinaison[i] > 0){
			onContinue = true;
			nbFoisCombinaison[i]--;
	        afficheProchainRoulette(i);
		}
	}
	
	if (onContinue){
		setTimeout(animation, DELAI);
	}
}

function ChoixDesDepart()
{
	//Pour toutes les positions
	for (var i = 0; i < NB_Images; i++){
		//Calculer l'id de la position
		var laPositionDeId = PREFIX_POSITION_DE_ID + i;
		//Calculer la nouvelle face a afficher
		//Math.random() donne un chiffre entre 0 et 1 non inclus
		//fois 6 donne un chiffre entre 0 et 6 non inclus
		//Math.floor() enleve les decimales
		//Cela donne un chiffre en 0 et 5 inclus
		var choix = Math.floor((Math.random() * NB_Images));
		//Conserve la face affichee pour chaque position de de
		positionCouranteDes[i] = choix;
		//Affiche la bonne image
		document.getElementById(laPositionDeId).src = Images_Roulette[choix];
		
		
var positionCouranteRoulette = [0, 0, 0];
				 
document.getElementById(laPositionDeId).src =
 IMAGES_DE[ROULETTE[laPositionDeId][positionCouranteRoulette[laPositionDeId]]];
 
 ROULETTE[j][positionCouranteRoulette[j]] --> numero.charAt(j) 
 
 var EST_BARRE = [false, false, ..., true, true, true, false];
 var BARRE_GAIN = 80;
 
 var estGagnant = true;
 for (var i = 0; i < NB_ROULETTES; i++){
	if (!EST_BARRE[ROULETTE[i][positionCouranteRoulette[i]){
		estGagnant = false;
		break;
	}
}
	
	document.writeln("<\pre>");
}
