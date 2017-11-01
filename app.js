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
var rideOption = document.querySelector('#noOfRides'); 
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
             //console.log(fares);
             result(fares);
        }
    };
    xhr.send();
}

// TRACKING AND CAPTURING ALL USER INPUTS
var userSelect  = () => {
    
    var zoneElement =  document.querySelector("#zone").value;  
    var timeElement = document.querySelector("#time").value;
    var placeElement = document.querySelector('input[name="place"]:checked').value;
    var rideElement = document.querySelector('input[name ="rides"]').value; 
    
    if(timeElement === "anytime"){
        document.querySelector("#station").checked = 'true';
        document.querySelector("#noOfRides").innerHTML = 10;
        document.querySelector("#noOfRides").value = 10;
    }

    var userChoice  = {
        "zone" : zoneElement,
        "time" : timeElement,
        "place" : placeElement,
        "rides" :rideElement
    }
    return userChoice;
}

// PERFORMING THE FARE CALCULATION
var result = (json) => {
    var userChoice  = userSelect(); 
    var zone  = userChoice["zone"];
    var time  = userChoice["time"];
    var place = userChoice["place"];
    var rides = userChoice["rides"];
    
    var total; // STORES TOTAL
    var deal;  // STORES 10-TRIP DISCOUNT
    
    // OUTER LOOP ITERATES OVER 'zones' ARRAY OBJECT TO GET THE RESPECTIVE ZONE VALUE
    for (var i = 0; i < json.zones.length; i++) {
        if(json.zones[i].zone == zone){
            // INNER LOOP ITERATES OVER 'fares' ARRAY OBJECT TO GET THE RESPECTIVE TYPE AND PURCHASE VALUE
            for (var j = 0; j < json.zones[i].fares.length; j++) {
                if(json.zones[i].fares[j].type == time && json.zones[i].fares[j].purchase == place){
                    total = json.zones[i].fares[j].price;
                    deal = json.zones[i].fares[4].price;
                }
            }
        }
    }   

    if(time !== "anytime"){
        total *=  rides;
        console.log(total);
    }
    document.getElementById("amount").innerHTML = total;
    // SHOW OFFER ON 10-TRIP PASS
    if(rides >= 8){
        document.getElementById("deal").innerHTML = "Get 10-trip pass for only $ " + deal; 
    }
    //SHOW DETAILS ABOUT THE TIME
    var timeInfo = json.info[time];
    document.getElementById("timeInfo").innerHTML = timeInfo; 
}
window.onload = fetchJson();