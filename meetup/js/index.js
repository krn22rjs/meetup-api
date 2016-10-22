
function callBackFunction(dataFromJSONP){

        var text = '';
        var eventName = '';
        var groupName = '';
        var description = '';
        var venueAddress = '';
        var city = '';
        var date;
        var formattedDate;
        var time;
        var yes_rsvp_count;
        var event_full;
        var favorite = '';

        var length = dataFromJSONP.results.length;
         for(var i=0;i<length;i++){

            meetupEvent = dataFromJSONP.results[i];
            eventName = meetupEvent.name;
            groupName = meetupEvent.group.name;
            description = meetupEvent.description;
            date = meetupEvent.time;
            yes_rsvp_count = meetupEvent.yes_rsvp_count;

            if(!localStorage.getItem(eventName)) {
                localStorage.setItem(eventName, 'false'); // setting the favorite button default
                favorite = 'false';
              }
              else {
                favorite = localStorage.getItem(eventName);
              }


            if(!meetupEvent.venue){ venueAddress = ''; city = '';}
            else {venueAddress = meetupEvent.venue.address_1;
                  city = meetupEvent.venue.city;}

            // Rendering the View
            text += '<div class="row"><div class="col-md-12">';
            text += '<div id="event"><h2>' + eventName + '</h2></div></div></div>';
            text += '<div class="row"><div class="col-md-2"><h4>' + moment(date).format("h:mm A") + '<br><br>' + moment(date).format("ddd, MMM D, YYYY") + '</h4>';
            text += '<p>' + venueAddress + '<br>' + city + '</p>';

            // checking if favorites has been selected
            if(favorite === 'false'){
                text += '<p><a class="btn btn-default" id="' + eventName + '" href="#" data-toggle="button" role="button">FAVORITE</a></p>';
            } else {
                text += '<p><a class="btn btn-warning" id="' + eventName + '" href="#" data-toggle="button" role="button">FAVORITE</a></p>';
            }

            text += '<h5>' + yes_rsvp_count + ' Members Are Going</h5></div>';
            text += '<div class="col-md-10"><div class="groupName">' + groupName.toUpperCase() +  '</div>';
            text +=  '<div class="contentArea">' + description + '<br></div>' + '</div></div><hr>';

         }
          document.getElementById('meetupevents').innerHTML = text;

     }

$(document).ready(function() {

      // initialize script tag that makes the API call
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://api.meetup.com/2/open_events?callback=callBackFunction&key=f417311486627f727480351c2d6b1&sign=true&photo-host=public&zip=10010&text=javascript&radius=20&category=34&page=10";
      $('body').append(script);


      event.preventDefault();
      var zipcode;
      var term;
      var url = '';

      // if search button has been pressed hit the API with the update and reprocess the results
      $(document).on('click', '.btn-primary', function(){
        zipcode = $('#zipcode').val();
        term = $('#searchTerm').val();

        url = 'https://api.meetup.com/2/open_events?callback=callBackFunction&key=f417311486627f727480351c2d6b1&sign=true&photo-host=public&radius=20&category=34&page=10';
        url += '&zip=' + zipcode + '&text=javascript' + '+' + term;
        script.src = url;

        $('script:eq(4)').remove();
        $('body').append(script);
        $('#meetupevents').empty();
      })

});

// checking for favorites button and saving results in local storage
$(document).on('click','.btn-default' , function(){

    $(this).toggleClass('btn-warning');
    if(localStorage.getItem(this.id, 'true') === 'false'){
      favorite = true;
      localStorage.setItem(this.id, 'true');
    }
    else {
      favorite = false;
      localStorage.setItem(this.id, 'false');
    }
    event.preventDefault();
});

// checking for favorites button and saving results in local storage
$(document).on('click','.btn-warning' , function(){

    $(this).removeClass('btn-warning').addClass('btn-default');
    if(localStorage.getItem(this.id, 'true') === 'false'){
      favorite = true;
      localStorage.setItem(this.id, 'true');
    }
    else {
      favorite = false;
      localStorage.setItem(this.id, 'false');
    }
    event.preventDefault();
});
