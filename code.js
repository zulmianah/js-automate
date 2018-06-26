var t;
var virtual_tab;
var l;
var c;
var animate;
function generer_jeu_de_la_vie() {
	clearTimeout(animate);
	t = document.getElementById("limite").value;;
	l = document.getElementById("ligne").value;;
	c = document.getElementById("colonne").value;;
	virtual_tab = new Array();
	for(var i = 0; i<l ; i++){
		virtual_tab.push(new Array());
		for(var j = 0; j<c ; j++){
			virtual_tab[i].push(Math.round(Math.random()));
		}
	}
	dessinerTableau(virtual_tab);
	animate = setTimeout(passerEtapeSuivante,1000);
}
function dessinerTableau(virtual_tab){
	var tbody = document.getElementById("tbody");
	var text_tbody = "";
	for(var i = 0; i<l ; i++){
		text_tbody += "<tr>";
		for(var j = 0; j<c ; j++){
			if (estMorte(virtual_tab[i][j])) text_tbody += "<td style=\"background-color: black;\"></td>";
			else text_tbody += "<td></td>";
		}
		text_tbody += "</tr>";
	}
	tbody.innerHTML = text_tbody;
}
function passerEtapeSuivante() {
	var new_tab = virtual_tab;
	for(var i = 0; i<l ; i++){
		for(var j = 0; j<c ; j++){
			if (estMorte(virtual_tab[i][j])){
				if(presTriVivante(virtual_tab,i,j,l,c)) new_tab[i][j] = 1;
				else new_tab[i][j] = 0;
			}
			else {
				if(!presDuoTriVivante(virtual_tab,i,j,l,c)) new_tab[i][j] = 0;
				else new_tab[i][j] = 1;
			}
		}
	}
	dessinerTableau(virtual_tab);
	virtual_tab = new_tab;
	t -= 1;
	animate = setTimeout(passerEtapeSuivante,100);
	if (t == 0) {
		clearTimeout(animate);
	}
}
function presTriVivante(virtual_tab,l,c,tl,tc) {
	return somme_voisins(virtual_tab,l,c,tl,tc) == 3;
}
function presDuoTriVivante(virtual_tab,l,c,tl,tc) {
	return somme_voisins(virtual_tab,l,c,tl,tc) == 3 || somme_voisins(virtual_tab,l,c,tl,tc) == 2;
}
function somme_voisins(virtual_tab,l,c,tl,tc) {
	var i = -1;
	var s = 0;
	for (i ; i<=1 ;i++){
		var j = -1;
		for (j ; j<=1 ;j++) if ( !estDesigne(i,j) ) if (estDefini(i,j,l,c,tl,tc)) s += virtual_tab[i+l][j+c];
	}
	return s;
}
function estDefini(i,j,l,c,tl,tc) {
	return estDefiniD(i,j,l,c,tl,tc) && estDefiniG(i,j,l,c,tl,tc);
}
function estDesigne(i,j) {
	return i == 0 && j == 0;
}
function estDefiniD(i,j,l,c,tl,tc) {
	return i+l<tl && j+c<tc;
}
function estDefiniG(i,j,l,c,tl,tc) {
	return 0<=l+i && 0<=c+j;
}
function estMorte(cellule) {
	return cellule==0;
}