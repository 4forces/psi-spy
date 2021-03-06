/*
date_time
string
(query)	
YYYY-MM-DD[T]HH:mm:ss (SGT)

date
string
(query)
YYYY-MM-DD


*/
$(document).ready(function () {
  //attaching on click event handler to the id #query-btn

  //let enterDate = $("#dateSelect").val(); //NOT !value()
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth();
  let yyyy = today.getFullYear();  
  if(dd < 10 ){
      dd = '0' + dd;
  }
  if(mm < 10){
      mm = '0' + mm;
  }

  let dateQuery = `${yyyy}-${mm}-${dd}`;
  $.ajax({
    type: "GET", //POST | PUT | DELETE
    dataType: "json",
    contentType: "text/plain",
    url: `https://api.data.gov.sg/v1/environment/psi?date=${dateQuery}`,
    success: function (data) {
        console.log(data);

        let psi_twenty_four_hourly = data.items[0].readings.psi_twenty_four_hourly;
        console.log(psi_twenty_four_hourly);
        let psi_twenty_four_hourly_national = data.items[0].readings.psi_twenty_four_hourly.national;
        console.log(psi_twenty_four_hourly_national);

        //color updates using css classes
        //based on a certain function
        let quality = getPSIColor(psi_twenty_four_hourly_national);
        console.log("Quality: " + quality);
        $(".latest-psi-status").addClass(`psi-${quality}`);
        $(".latest-psi-state").addClass(`psi-${quality}`);
        $(".stats-placeholder").addClass(`psi-${quality}`);
        //number updates to the content
        //simply updating here
        $('.latest-psi-state').html(psi_twenty_four_hourly_national);
      /*
          let target10 = data.items[0].readings.pm10_twenty_four_hourly;
          let target25 = data.items[0].readings.pm25_twenty_four_hourly;
            
          $.each(target10, function(key, value){
            // console.log(key + ":" + value);
            $('#todo-list1').append(`${key}: <b>${value}</b><br/>`);
          });
          $.each(target25, function(key, value){
            // console.log(key + ":" + value);
            $('#todo-list2').append(`${key}: <b>${value}</b><br/>`);
          });
          */
        letStorage.setItem("eastPSI", psi_twenty_four_hourly.east);
        letStorage.setItem("westPSI", psi_twenty_four_hourly.west);
        letStorage.setItem("northPSI", psi_twenty_four_hourly.north);
        letStorage.setItem("centralPSI", psi_twenty_four_hourly.national);
        letStorage.setItem("southPSI", psi_twenty_four_hourly.south);
    },
  });//end of ajax call

  function getPSIColor(psiValue){
    if(psiValue >= 0 && psiValue <= 50){
        //good
        return "good";
    }else if(psiValue >= 51 && psiValue <= 100){
        return "moderate";
    }else if(psiValue >= 101 && psiValue <= 200){
        return "unhealthy";
    }else if(psiValue >= 201 && psiValue <= 300){
        return "very-unhealthy";
    }else if(psiValue > 300){
        return "hazardous";
    }else{
        console.log("invalid psi value");
    }
    return -1;
  }

});
