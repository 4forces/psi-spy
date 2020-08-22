

  //copied from malcolm
function addMarker(markerPosition, markerTitle, mapReference){

    //create infoWindow
    let infowindow = new google.maps.InfoWindow({
      content: `<div id=''>Some text</div>`
    })

    //create marker
    let marker = new google.maps.Marker({
      position: markerPosition,
      map: mapReference,
      animation: google.maps.Animation.DROP,
      title: markerTitle
    })

    //add Click event listener and open infowin when we click on a marker
    marker.addListener('click', function(){
        infowindow.open(mapReference, marker);
    });
  }//end addMarker
