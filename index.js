const divCard = document.getElementById("team");
// This function will pull the data from MockAPI to be used on my application
function loadData() {
  fetch("https://6407d0bf2f01352a8a846ad6.mockapi.io/project", {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    // Maps data from the array 
    .then((data) => {
      const team = data;
      console.log(team);
      // creates the html elements necissary to create my list 
      team.map(function (team) {
        let card = document.createElement("div");
        let cardBody = document.createElement("div");
        let fullName = document.createElement("h4");
        let information = document.createElement("p");
        $("p").addClass("card-text");
        $("h4").addClass("card-title");
        card.className = "mainCard";
        cardBody.className = "cardBody";
        // This will place the data into the DOM in the html element
        for (i = 0; i <= 5; i++) {
          fullName.innerHTML = `${team.firstName} ${team.lastName}`;
          information.innerHTML = `Postions: ${team.Position}  
                                     Jersey Number: ${team.jerseyNumber}
                                     ID: ${team.id}`;
        }
        // posts the elements to the DOM
        divCard.appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(fullName);
        cardBody.appendChild(information);
      });
    })
    .catch((error) => {
      console.log("ERROR");
    });
}

// This is to send data to the server
const formEl = document.querySelector("#inputForm");
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(formEl);
  const data = new URLSearchParams(formData);
  let newUrl = `https://6407d0bf2f01352a8a846ad6.mockapi.io/project`;
  // sends new data via post and handles response
  fetch(newUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    //deletes and reloads the webpage to prevent duplication of data elements
    deleteInfo();
    loadData();
});
// deletes user upon button click 
const deleteUser = () => {
  let deleteBtn = document.getElementById("delete");
  deleteBtn.addEventListener("click", () => {
    //adds popup to enter the id of the player wanted to be deleteted
    let selectedID = prompt("Enter the ID of the player you want to delete: ");
    let url = "https://6407d0bf2f01352a8a846ad6.mockapi.io/project/" + selectedID;
      fetch(url, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'}
      })
      //reloads the webpage to remove the element of the data deleted
      deleteInfo();
      loadData();
    });
  };

// This allows the users to hit the reset button on the page to clear the form
const clearForm = () => {
  let getForm = document.querySelector("#inputForm");
  let resetBtn = document.getElementById("#reset");
  resetBtn.addEventListener("click", () => {
    getForm.reset();
  });
};
// function that removes the DOM elements created in the loadData function 
const deleteInfo = () => {
  $(".cardMain").remove();
  $(".cardBody").remove();
 
}



loadData();
deleteUser();