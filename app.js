// LOOPING THROUGH ZONE ITEMS, ATTACHING EVENT LISTENERS AND CALCULATING THE TOTAL FARE ON CHANGE
var zoneOption = document.querySelectorAll('#zone');
for (var i = 0; i < zoneOption.length; i++) {
    zoneOption[i].addEventListener('change', function(){
        fetchJson();
    });
}

// LOOPING THROUGH TIME ITEMS, ATTACHING EVENT LISTENERS AND CALCULATING THE TOTAL FARE ON CHANGE
var timeOption = document.querySelectorAll('#time');
for (var i = 0; i < timeOption.length; i++) {
    timeOption[i].addEventListener('change', function(){
        fetchJson();
    });
}

// LOOPING THROUGH PLACE ITEMS, ATTACHING EVENT LISTENERS AND CALCULATING THE TOTAL FARE ON CHANGE
var placeOption = document.querySelectorAll('#place');
for (var i = 0; i < timeOption.length; i++) {
    placeOption[i].addEventListener('change', function(){
        fetchJson();
    });
}

// LOOPING THROUGH TRIP ITEMS, ATTACHING EVENT LISTENERS AND CALCULATING THE TOTAL FARE ON CHANGE
var rideOption = document.getElementById('noOfRides'); 
rideOption.addEventListener('change', function(){
    fetchJson();
})

// MAKING AJAX REQUEST TO 'fares.json' TO POPULATE THE WIDGET WITH LOVE DATA
var fetchJson = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'fares.json',true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
             var fares = JSON.parse(this.responseText);
             console.log(fares);
        }
    };
    xhr.send();
}

//var totalAmount = () => fetchJson(); 