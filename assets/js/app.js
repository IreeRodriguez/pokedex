window.onload = function () {
    fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let pokeData = data.results;
            getPokemon(pokeData);
            console.log(pokeData);
            
        });
}

function getPokemon(pokeData) {

    $(pokeData).each(function (i) {
        if(pokeData.length === 1){

        }
        fetch(pokeData[i].url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let typeOne = '';
                let typeTwo = ' ';
                if ((data.types[1]) !== undefined) {
                    typeOne += data.types[0].type.name;
                    typeTwo += data.types[1].type.name;

                } else {
                    typeOne += data.types[0].type.name;
                }

                $('#pokemon').append(
                    '<div class="white">' +
                    '<h4>' + data.name + '</h4>' +
                    '<a href="#" data-toggle="modal" data-target="#modal' + i + '">' +
                    '<img src=' + data.sprites.front_default + '>' +
                    '</a>' +
                    '</div>' +

                    '<div class="modal fade" id="modal' + i + '"exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog" role="document">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<h5 class="modal-title">' + data.name + '</h5>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<img src=' + data.sprites.front_default + '>' +
                    '<p>Type: ' + typeOne + typeTwo + '</p>' +
                    '<p>Abilities: ' + data.abilities[0].ability.name + ' and ' + data.abilities[1].ability.name + '</p>' +
                    '<p>Weight: ' + data.weight + 'gr</p>' +
                    '</div>' +
                    '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            })
            .then(function(){
                $('#field').prop("disabled", false);
            });
    });
}

function search() {
    $('#pokemon').empty();
    console.log('seaarching');
    
    let pokemon = $('#searchPokemon').val();

    fetch('https://pokeapi.co/api/v2/pokemon/?limit=949')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.results.length; i++) {
                if (pokemon === data.results[i].name) {
                    console.log(data.results[i]);               
                    getPokemon([data.results[i]]);                   

                }
            }
        })
    return false;
}
