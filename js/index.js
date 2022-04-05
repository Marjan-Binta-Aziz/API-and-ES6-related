document.getElementById("errormassage").style.display = "none";
const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //clear data
  searchField.value = "";
  //error handle
  document.getElementById("errormassage").style.display = "none";
  if (searchText == "") {
    document.getElementById("errormassage").style.color = "red";
    document.getElementById("errormassage").style.fontFamily = "Arial";
    document.getElementById("errormassage").style.fontSize = "larger";
    document.getElementById("massage").innerHTML = "Please Enter Somting";
  } else {
    //load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then(res => res.json())
      .then(data => displaySearchResult(data.data));
  }
};

//display Search Result
const displaySearchResult = datas => {
  console.log(datas);
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  // error handaling
  if (datas.length == 0) {
    document.getElementById("errormassage").style.color = "red";
    document.getElementById("errormassage").style.fontFamily = "Arial";
    document.getElementById("errormassage").style.fontSize = "larger";
    document.getElementById("massage").innerHTML = "No Result Found ";
  } else {
    const data = datas.slice(0,20);

    data.forEach(phone => {
      // console.log(phone);

      const div = document.createElement("div");
      div.classList.add("col-12");
      div.innerHTML = `
                <div class="card mx-2 w-75 d-flex align-items-center">
                    <img src="${phone.image}" class="card-img-top img-fluid w-75 pt-2" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-title">Brand Name: ${phone.brand}</p>
                    <button onclick ="loadPhoneDetails('${phone.slug}')" type="submit" class="btn btn-outline-secondary"> See Details</button>
                    </div>
                </div>`;
      searchResult.appendChild(div);
    });
  }
};

//load phone details
const loadPhoneDetails = id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(phone => displayPhoneDetail(phone.data));
};

//display Phone Details
const displayPhoneDetail = mobile => {
  // console.log(mobile);
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card mb-3 d-flex flex-row" style="max-width: 640px;"
  <div class="row g-0">
        <div class="col-md-4 d-flex p-3 align-items-center flex-column text-center">
          <img src="${mobile.image}" alt="...">
          <h2 class="card-title mt-2">${mobile.name}</h2>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title"><span class="fst-italic fw-bolder">Release Date: </span>${mobile.releaseDate ? mobile.releaseDate: 'Release Date not Found' } </h5>
            <hr>
            <h6 class="card-title">
            Main Features : </h6>
            <p class="fw-light mb-1"> <span class="fst-italic fw-bolder">Chip Set:</span>  ${mobile.mainFeatures.chipSet ? mobile.mainFeatures.chipSet: 'Not Found' } </p>
            <p class="fw-light mb-1"> <span class="fst-italic fw-bolder">Display : </span> ${mobile.mainFeatures.displaySize ? mobile.mainFeatures.displaySize: 'Not Found' } </p>
            <p class="fw-light mb-1" > <span class="fst-italic fw-bolder"> Memory  : </span>${mobile.mainFeatures.memory ? mobile.mainFeatures.memory: 'Not Found' } </p>
            <p class="fw-light mb-1"> <span class="fst-italic fw-bolder">Storage :</span>  ${mobile.mainFeatures.storage ? mobile.mainFeatures.storage: 'Not Found' } </p>
            <p class="fw-light mb-1"> <span class="fst-italic fw-bolder">Sensors :</span>  ${mobile.mainFeatures.sensors.join(', ')} </p>
          
            <br>
            <h6 class="card-title">
            Others Information: </h6>
            <p class="fw-light mb-1"> <span class="fst-italic fw-bolder">Bluetooth :</span>  ${mobile.others? mobile.others.Bluetooth: 'Not Found'} </p>
            <p class="fw-light mb-1"> <span class="fst-italic fw-bolder">GPS : </span>  ${mobile.others? mobile.others.GPS: 'Not Found'} </p>
            <p class="fw-light mb-1"> <span class="fst-italic fw-bolder">NFC  : </span> ${mobile.others? mobile.others.NFC: 'Not Found'} </p>
            <p class="fw-light mb-1"> <span class="fst-italic fw-bolder">Radio : </span> ${mobile.others? mobile.others?.Radio: 'Not Found'} </p>
            <p class="fw-light mb-1"><span class="fst-italic fw-bolder">  USB :</span> ${mobile.others? mobile.others?.USB: 'Not Found'} </p>
            <p class="fw-light mb-1"> <span class="fst-italic fw-bolder"> WLAN : </span>${mobile.others? mobile.others.WLAN: 'Not Found'} </p>
            
          </div>
        </div>
  </div>
</div>

`;
  phoneDetails.appendChild(div);
};
