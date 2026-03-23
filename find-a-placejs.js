document.addEventListener("DOMContentLoaded", function () {
   
    
   



   



    const chennaiButton = document.querySelector(".chennaiButton");
    const bengaluruButton = document.querySelector(".bengaluruButton");
    const delhiButton = document.querySelector(".delhiButton");
    const hyderabadButton = document.querySelector(".hyderabadButton");


    const titleDistrict = document.querySelector(".title-district");
    const searchContainer = document.getElementById("search");



    const district = document.getElementById("district");
    const backButton = document.getElementById("backButton");
    const loaderOverlay = document.getElementById("loader-overlay");









   
    chennaiButton.addEventListener("click", function (event) {
      event.preventDefault();
      toggleSearchContainer();
      backButton.style.display = "block";
      titleDistrict.style.display = "none";
      showLoader();

    });


    bengaluruButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleSearchContainer();
        backButton.style.display = "block";
        titleDistrict.style.display = "none";
        showLoader();
    });



    delhiButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleSearchContainer();
        backButton.style.display = "block";
        titleDistrict.style.display = "none";
        showLoader();
    });

    hyderabadButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleSearchContainer();
        backButton.style.display = "block";
        titleDistrict.style.display = "none";
        showLoader();
    });

      // Function to go back
      function goBack() {
        // You can customize this logic to navigate back or perform other actions
    
        searchContainer.style.display = "none";
        district.style.display = "block";
        
        backButton.style.display = "none";
      }










      function showLoader() {
        loaderOverlay.style.display = "flex";
        setTimeout(function () {
          loaderOverlay.style.display = "none";
        }, 1000); // 5000 milliseconds = 5 seconds
      }
  







    


    const kolkataButton = document.querySelector(".kolkataButton");
    const mumbaiButton = document.querySelector(".mumbaiButton");


    kolkataButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleSearchContainer();
        backButton.style.display = "block";
        titleDistrict.style.display = "none";
        showLoader();
    });

    mumbaiButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleSearchContainer();
        backButton.style.display = "block";
        titleDistrict.style.display = "none";
        showLoader();
    });

    







    function toggleSearchContainer() {
      searchContainer.style.display = "block";
      district.style.display = "none";
    }



    document.getElementById("backButton").addEventListener("click", function () {
        goBack();
        titleDistrict.style.display = "block";
        showLoader();
      });
  












    
















    

    const searchButton = document.getElementById("searchButton");
    const searchStopNameInput = document.getElementById("searchStopName");
    const routeList = document.getElementById("routeList");
    const originBox = document.querySelector(".box h2:first-child + h4");
    const destinationBox = document.querySelector(".box1 h2:first-child + h4");

    searchStopNameInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const searchStopName = searchStopNameInput.value;
            checkStopName(searchStopName);
        }
    });

    searchButton.addEventListener("click", function () {
        const searchStopName = searchStopNameInput.value;
        checkStopName(searchStopName);
    });

    
    
    function checkStopName(searchStopName) {
    
    $.ajax({
        type: "GET",
    url: "lib/bus_stops_all.csv",
    dataType: "text",
    success: function (data) {
        let lines = data.split("\n");
    let foundRoutes = [];
    for (let i = 1; i < lines.length; i++) {
    let cols = lines[i].split(",");
    if (cols.length >= 4 && cols[3] && cols[3].trim() === searchStopName.trim()) {
        foundRoutes.push(cols);
    }
}

            if (foundRoutes.length > 0) {
                let routeInfo = "";
              
                    


                for (let i = 0; i < foundRoutes.length; i++) {
                    $.ajax({
                        type: "GET",
                        url: "lib/bus_stops_all.csv",
                        dataType: "text",
                        success: function (data) {
                            let new_lines = data.split("\n");
                            let new_foundRoutes = [];
                            

                    

                            for (let j = 1; j < new_lines.length; j++) {
                                let new_cols = new_lines[j].split(",");

                                if (new_cols[1] && foundRoutes[i] && foundRoutes[i][1] && new_cols[1] === foundRoutes[i][1]) {
                                    new_foundRoutes.push(new_cols[3]);
                                }
                            }

                            

                            let start = new_foundRoutes;
                            let zero=foundRoutes[i][1];

                            routeInfo += `<li>
                            
                            <div class="timeline--circle"> <i></i></div>
                            <div class="timeline--description">${zero} -> ${start}</div> </li>`;
                            routeList.innerHTML = routeInfo;

                        },
                        error: function (error) {
                            console.error("Error fetching data:", error);
                        }
                    });
                }

             
            } else {
                routeList.innerHTML = "<li>Stop name not found.</li>";
            }


        },
        error: function () {
            // Handle the case where there is an error in the AJAX request
            routeList.innerHTML = "<li>Error loading data.</li>";

        }
    });
}



}); 




function suggestStops() {
  let input = $('#searchStopName').val().toUpperCase();
  if (input.length >= 2) {
      $.ajax({
          type: "GET",
          url: "lib/bus_stops_all.csv", 
          dataType: "text",
          success: function (data) {
              let lines = data.split("\n");
              let uniqueSuggestions = new Set();

              for (let i = 1; i < lines.length; i++) {
                  let cols = lines[i].split(",");
                  if (cols.length >= 4 && cols[3] && cols[3].toUpperCase().includes(input)) {
                      uniqueSuggestions.add(cols[3]);
                  }
              }

              displaySuggestions(Array.from(uniqueSuggestions));
          },
          error: function (error) {
              console.error("Error fetching data:", error);
          }
      });
  } else {
      clearSuggestions();
  }
}

function displaySuggestions(suggestions) {
  let suggestionsList = $('#suggestions');
  suggestionsList.empty();

  for (let i = 0; i < suggestions.length; i++) {
      let suggestionItem = $('<li>' + suggestions[i] + '</li>');
      suggestionItem.click(function () {
          $('#searchStopName').val(suggestions[i]);
          clearSuggestions();
      });
      suggestionsList.append(suggestionItem);
  }
  suggestionsList.show(); 
}

function clearSuggestions() {
  $('#suggestions').empty().hide();
}


