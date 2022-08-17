// map
var trailrootURL = 'https://prescriptiontrails.org/api/filter/'


function trails(search){
    var  trailUrl = `${trailrootURL}/api/filter/?by=city&city=Albuquerque&offset=0&count=6`
    // albuquerque and count are default. change for user response
    fetch(trailUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(){
        if(){
            console.log('', )
        }
    })
    .catch(function(error)
    {console.log('e',error)})
}

trails()