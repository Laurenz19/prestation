$(document).ready(function() {
    $.ajax({
        url: 'data.php',
        method: 'GET',
        success: function(data) {
            console.log(data);

            var Ntrain = [];
            var recette = [];


            for (var i in data) {
                Ntrain.push("Ntrain" + data[i].Ntrain);
                recette.push(data[i].recette);
            }
        }
    })
})