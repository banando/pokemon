
//charcater select
console.log('main.js loaded');
var pokemon =[
  {
    "id": 1,
    "name": "Bulbasaur",
    "image_url": "http://pokeapi.co/media/img/1.png",
    "pkdx_id": 1,
    "attack": 49,
    "defense": 49,
    "health": 45,
    "speed": 45,
    "weight": 69,
    "height": 7
  },
  {
    "id": 2,
    "name": "Ivysaur",
    "image_url": "http://pokeapi.co/media/img/2.png",
    "pkdx_id": 2,
    "attack": 62,
    "defense": 63,
    "health": 60,
    "speed": 60,
    "weight": 130,
    "height": 10
  },
  {
    "id": 3,
    "name": "Venusaur",
    "image_url": "http://pokeapi.co/media/img/3.png",
    "pkdx_id": 3,
    "attack": 82,
    "defense": 83,
    "health": 80,
    "speed": 80,
    "weight": 1000,
    "height": 20
  }
  ];
$('#p1Pokemon').html(pokemon[0].name);