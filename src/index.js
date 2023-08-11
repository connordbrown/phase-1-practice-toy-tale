let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  // generate toy cards using JSON data
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {
      toys.forEach((toy) => {
        // create div for each card
        let toyDiv = document.createElement('div');
        toyDiv.className = 'card';
        //toyDiv.id = toy.id;
          // name
          let toyName = document.createElement('h2');
          toyName.textContent = toy.name;
          toyDiv.appendChild(toyName);
          // image
          let toyImg = document.createElement('img');
          toyImg.className = 'toy-avatar';
          toyImg.src = toy.image;
          toyDiv.appendChild(toyImg);
          // likes
          let toyLikes = document.createElement('p');
          toyLikes.textContent = `${toy.likes} Likes`;
          toyDiv.appendChild(toyLikes);
          // button
          let likeBtn = document.createElement('button');
          likeBtn.className = 'like-btn';
          likeBtn.id = toy.id;
          likeBtn.textContent = 'Like ❤️';
          likeBtn.addEventListener('click', () => { // after page loaded
              updateToy(toy);
              toyLikes.textContent = `${toy.likes} Likes`;
          });
          toyDiv.appendChild(likeBtn);  
        const toyCollection = document.querySelector('#toy-collection');
        toyCollection.appendChild(toyDiv);
      }); 
    })
    .catch(error => alert(error.message));   


// add new toy using provided form
  let form = document.querySelector('.add-toy-form');
  form.addEventListener('submit', (event) => {
    // prevent page reload
    event.preventDefault();
    // create variable for each input field
    const name = event.target[0].value;
    const image = event.target[1].value;
    // clear form
    form.reset();

    // create object for posting
    const configurationObject = {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })
    };
    
    // make POST request using configurationObject as material to post
    fetch("http://localhost:3000/toys", configurationObject)
      .then(response => response.json())
      .catch(error => alert(error.message));
  }); 


  function updateToy (toy) {
    const updateObject = {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes += 1
      })
    };

    // send patch request, including toy id in path
    fetch(`http://localhost:3000/toys/${toy.id}`, updateObject)
      .then(response => response.json())
      .catch(error => alert(error.message));
  }

});
