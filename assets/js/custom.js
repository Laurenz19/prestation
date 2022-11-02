let medecins = [];
let prestations = []
let bilan = document.getElementsByClassName("recette");

for (let i = 0; i < bilan.length; i++) {
    let nom = bilan[i].children[2].innerHTML.trim();
    let prest = parseFloat(bilan[i].children[5].innerHTML.trim())
    medecins.push(nom);
    prestations.push(prest);
}
/*bilan.forEach(element => {
    let nom = element.children[2].innerHTML.trim();
    let prest = parseFloat(element.children[5].innerHTML.trim())
    medecins.push(nom);
    prestations.push(prest);
});*/

console.log(medecins)
console.log(prestations)