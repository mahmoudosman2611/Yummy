/// <reference types="../@types/jquery" />

let mealsContainer = document.querySelector(".mealsContainer");
let searchContainer = document.querySelector(".searchContainer");

$(document).ready(function () {
  getMeals("").then(function () {
    $(".loader").fadeOut(500, function () {
      $(".loadingScreen").fadeOut(500, function () {
        $("body").css({
          overflow: "auto",
        });
        $(".loadingScreen").remove();
        $(".inner-loading-screen ").fadeOut(500);
      });
    });
  });
});

function openNav() {
  $(".side-nav-menu").animate(
    {
      left: 0,
    },
    500
  );

  $(".closeOpen").removeClass("fa-align-justify");
  $(".closeOpen").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".nav-links ul li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 7) * 100
      );
  }
}
function closeNav() {
  let navTabWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: -navTabWidth,
    },
    500
  );
  $(".closeOpen").removeClass("fa-x");
  $(".closeOpen").addClass("fa-align-justify");
  $(".nav-links ul li").animate(
    {
      top: 1000,
    },
    500
  );
}
closeNav();

$(".side-nav-menu .closeOpen").on("click", function () {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

async function getMeals(kind) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${kind}`
  );
  let data = await response.json();
  displayMeals(data.meals);
}

function displayMeals(array) {
  let htmlMeals = ``;
  for (let i = 0; i < array.length; i++) {
    htmlMeals += `
                <div class="col-md-3">
                <div onclick="getMealDetails('${array[i].idMeal}')"  class="meal position-relative rounded-2 cursorPointer ">
                    <img src="${array[i].strMealThumb}" class="w-100" alt="meal photo">
                    <div class="layer position-absolute text-black d-flex align-items-center px-2">
                        <h3>${array[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;
  }
  mealsContainer.innerHTML += htmlMeals;
}

getMeals("");

// * >>>>>>>>>>>>>>>>>>>>>>>get Categories<<<<<<<<<<<<<<<<<<<<<<<<<<
async function getCategories() {
  mealsContainer.innerHTML = "";
  $(".inner-loading-screen ").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  displayCategories(data.categories);
  $(".inner-loading-screen ").fadeOut(500);
  closeNav();
}

function displayCategories(array) {
  let htmlCategories = ``;
  for (let i = 0; i < array.length; i++) {
    htmlCategories += `
                <div class="col-md-3">
                <div onclick="getCategoryMeals('${
                  array[i].strCategory
                }')"  class="meal position-relative rounded-2 cursorPointer ">
                    <img src="${
                      array[i].strCategoryThumb
                    }" class="w-100" alt="meal photo">
                    <div class="layer position-absolute text-black text-center px-2">
                        <h3>${array[i].strCategory}</h3>
                        <p>${array[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 25)
                          .join(" ")}</p>

                    </div>
                </div>
            </div>`;
  }
  mealsContainer.innerHTML = htmlCategories;
  searchContainer.innerHTML = "";
}

$(".Category").on("click", function () {
  getCategories();
});

// * >>>>>>>>>>>>>>>>>>>>>>>get Categories<<<<<<<<<<<<<<<<<<<<<<<<<<
// & >>>>>>>>>>>>>>>>>>>>>>>get Area<<<<<<<<<<<<<<<<<<<<<<<<<<

async function getArea() {
  mealsContainer.innerHTML = "";
  $(".inner-loading-screen ").fadeIn(350);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
  $(".inner-loading-screen ").fadeOut(350);
  closeNav();
}

function displayArea(array) {
  let htmlArea = ``;
  for (let i = 0; i < array.length; i++) {
    htmlArea += `
                <div class="col-md-3">
                <div onclick="getAreaMeals('${array[i].strArea}')" class=" rounded-2 text-center cursorPointer ">
                 <i class="fa-solid fa-house-laptop fa-4x"></i>

                        <h3>${array[i].strArea}</h3>



                </div>
            </div>`;
  }
  mealsContainer.innerHTML = htmlArea;
  searchContainer.innerHTML = "";
}

$(".area").on("click", function () {
  getArea();
});

// & >>>>>>>>>>>>>>>>>>>>>>>get Area<<<<<<<<<<<<<<<<<<<<<<<<<<
// ^ >>>>>>>>>>>>>>>>>>>>>>>get Ingredients<<<<<<<<<<<<<<<<<<<<<<<<<<
async function getIngredients() {
  mealsContainer.innerHTML = "";
  $(".inner-loading-screen ").fadeIn(350);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();

  displayIngredients(response.meals.slice(0, 20));
  $(".inner-loading-screen ").fadeOut(350);
  closeNav();
}

function displayIngredients(array) {
  let htmlIngredients = ``;
  for (let i = 0; i < array.length; i++) {
    htmlIngredients += `
                <div class="col-md-3">
                <div onclick="getIngredientsMeals('${
                  array[i].strIngredient
                }')"  class=" rounded-2 text-center cursorPointer  ">
                 <i class="fa-solid fa-drumstick-bite fa-4x"></i>

                        <h3>${array[i].strIngredient}</h3>
                                                <p>${array[i].strDescription
                                                  .split(" ")
                                                  .slice(0, 25)
                                                  .join(" ")}</p>




                </div>
            </div>`;
  }
  mealsContainer.innerHTML = htmlIngredients;
  searchContainer.innerHTML = "";
}

$(".ingredients").on("click", function () {
  getIngredients();
});

// ^ >>>>>>>>>>>>>>>>>>>>>>>get Ingredients<<<<<<<<<<<<<<<<<<<<<<<<<<
// ? >>>>>>>>>>>>>>>>>>>>>>>get category meals<<<<<<<<<<<<<<<<<<<<<<<<<<

async function getCategoryMeals(category) {
  mealsContainer.innerHTML = "";
  $(".inner-loading-screen ").fadeIn(350);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  displayCategoryMeals(response.meals.slice(0, 20));
}

function displayCategoryMeals(array) {
  let htmlCategoryMeals = ``;
  for (let i = 0; i < array.length; i++) {
    htmlCategoryMeals += `
                <div class="col-md-3">
                <div onclick="getMealDetails('${array[i].idMeal}')" class="meal position-relative rounded-2 cursorPointer ">
                    <img src="${array[i].strMealThumb}" class="w-100" alt="meal photo">
                    <div class="layer position-absolute text-black d-flex align-items-center px-2">
                        <h3>${array[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;
  }
  mealsContainer.innerHTML = htmlCategoryMeals;
  $(".inner-loading-screen ").fadeOut(350);
  searchContainer.innerHTML = "";
}

// ? >>>>>>>>>>>>>>>>>>>>>>>get category meals<<<<<<<<<<<<<<<<<<<<<<<<<<

// & >>>>>>>>>>>>>>>>>>>>>>>get area meals<<<<<<<<<<<<<<<<<<<<<<<<<<

async function getAreaMeals(area) {
  mealsContainer.innerHTML = "";
  $(".inner-loading-screen ").fadeIn(350);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  displayAreaMeals(response.meals.slice(0, 20));
}

function displayAreaMeals(array) {
  let htmlAreaMeals = ``;
  for (let i = 0; i < array.length; i++) {
    htmlAreaMeals += `
                <div class="col-md-3">
                <div onclick="getMealDetails('${array[i].idMeal}')" class="meal position-relative rounded-2 cursorPointer ">
                    <img src="${array[i].strMealThumb}" class="w-100" alt="meal photo">
                    <div class="layer position-absolute text-black d-flex align-items-center px-2">
                        <h3>${array[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;
  }
  mealsContainer.innerHTML = htmlAreaMeals;
  $(".inner-loading-screen ").fadeOut(350);
  searchContainer.innerHTML = "";
}

// & >>>>>>>>>>>>>>>>>>>>>>>get area meals<<<<<<<<<<<<<<<<<<<<<<<<<<

// ! >>>>>>>>>>>>>>>>>>>>>>>get Ingredients meals<<<<<<<<<<<<<<<<<<<<<<<<<<

async function getIngredientsMeals(ingredients) {
  mealsContainer.innerHTML = "";
  $(".inner-loading-screen ").fadeIn(350);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();
  displayAreaMeals(response.meals.slice(0, 20));
}

function displayingredientsMeals(array) {
  let htmlingredientsMeals = ``;
  for (let i = 0; i < array.length; i++) {
    htmlingredientsMeals += `
                <div class="col-md-3">
                <div class="meal position-relative rounded-2 cursorPointer ">
                    <img src="${array[i].strMealThumb}" class="w-100" alt="meal photo">
                    <div class="layer position-absolute text-black d-flex align-items-center px-2">
                        <h3>${array[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;
  }
  mealsContainer.innerHTML = htmlingredientsMeals;
  $(".inner-loading-screen ").fadeOut(350);
  searchContainer.innerHTML = "";
}

// ! >>>>>>>>>>>>>>>>>>>>>>>get Ingredients meals<<<<<<<<<<<<<<<<<<<<<<<<<<
// ^ >>>>>>>>>>>>>>>>>>>>>>>Display meal details<<<<<<<<<<<<<<<<<<<<<<<<<<

async function getMealDetails(mealId) {
  mealsContainer.innerHTML = "";
  $(".inner-loading-screen ").fadeIn(350);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();
  $(".inner-loading-screen ").fadeOut(350);

  displayMealDetails(response.meals[0]);
}

function displayMealDetails(meal) {
  let ingredient = ``;

  for (let i = 1; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredient += `<li class="alert alert-info p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagsHtml = ``;

  for (let i = 0; i < tags.length; i++) {
    tagsHtml += `
    <li class="alert alert-danger p-1">${tags[i]}</li>
    `;
  }

  let htmlMealDetails = `
              <div class="col-md-4">
                <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="">
                <h3>${meal.strMeal}</h3>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h4><span>Area : </span> ${meal.strArea}</h4>
                <h4><span>Category : </span> ${meal.strCategory}</h4>
                <h4>Recipes : </h4>
                <ul class="list-unstyled d-flex flex-wrap gap-3 ">
                ${ingredient}


                </ul>
                <h4>Tags : </h4>
                <ul class="list-unstyled d-flex gap-3 ">
                ${tagsHtml}



                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>


            </div>
  
  `;
  mealsContainer.innerHTML = htmlMealDetails;
  $(".inner-loading-screen ").fadeOut(500);
  searchContainer.innerHTML = "";
}

// ^ >>>>>>>>>>>>>>>>>>>>>>>Display meal details<<<<<<<<<<<<<<<<<<<<<<<<<<
// ! >>>>>>>>>>>>>>>>>>>>>>>display search<<<<<<<<<<<<<<<<<<<<<<<<<<

function displaySearch() {
  let htmlSearch = ``;
  htmlSearch += `
              <div class="col-md-6 ">
                <div class="inner py-4">
                    <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" placeholder="Search By Name" type="text">
                </div>
                
                
            </div>
                        <div class="col-md-6">
                <div class="inner py-4">
                    <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" placeholder="Search By First Letter" type="text">
                </div>
                
                
            </div>
                     `;
  searchContainer.innerHTML = htmlSearch;
  closeNav();
  mealsContainer.innerHTML = "";
}

$(".search").on("click", function () {
  displaySearch();
});
// ! >>>>>>>>>>>>>>>>>>>>>>>display search<<<<<<<<<<<<<<<<<<<<<<<<<<
// & >>>>>>>>>>>>>>>>>>>>>>> search by name & search by first letter<<<<<<<<<<<<<<<<<<<<<<<<<<

async function searchByName(name) {
  mealsContainer.innerHTML = "";
  $(".inner-loading-screen ").fadeIn(350);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  response = await response.json();
  mealsContainer.innerHTML = "";
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen ").fadeOut(350);
}
async function searchByFirstLetter(letter) {
  mealsContainer.innerHTML = "";

  letter == "" ? (letter = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  response = await response.json();
  mealsContainer.innerHTML = "";
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen ").fadeOut(350);
}
// & >>>>>>>>>>>>>>>>>>>>>>> search by name & search by first letter<<<<<<<<<<<<<<<<<<<<<<<<<<
// ^ >>>>>>>>>>>>>>>>>>>>>>> Display contact us<<<<<<<<<<<<<<<<<<<<<<<<<<

function displayContact() {
  let htmlContact = ``;
  htmlContact += `
          <section class="contactUs min-vh-100 d-flex justify-content-center align-items-center text-center" id="contact">
        <div class="container w-75">
                       <div class="row g-4">
                <div class="col-md-6">
                    <div class="inner ">
                        <input id="nameInput" onkeyup="validateData()" class="form-control " placeholder="Enter your First Name" type="text">
        <div id="nameAlert" class="alert text-danger bg-warning mt-1 mb-0 d-none">
            <p class="mb-0">*Special characters and numbers not allowed</p>
        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="inner ">
                        <input id="emailInput" onkeyup="validateData()" class="form-control " placeholder="Enter your Email" type="text">
                                <div id="emailAlert" class="alert text-danger bg-warning mt-1 mb-0 d-none">
            <p class="mb-0">*Email not valid *exemple@yyy.zzz</p>
        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="inner  ">
                        <input id="phoneInput" onkeyup="validateData()" class="form-control " placeholder="Enter your Phone" type="tel">
                                <div id="numberAlert" class="alert text-danger bg-warning mt-1 mb-0 d-none">
            <p class="mb-0">*Enter valid Phone Number</p>
        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="inner ">
                        <input id="ageInput" onkeyup="validateData()" class="form-control " placeholder="Enter your  Age" type="number">
                        <div id="ageAlert" class="alert text-danger bg-warning mt-1 mb-0 d-none">
            <p class="mb-0">*Enter valid age</p>
        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="inner ">
                        <input id="passwordInput" onkeyup="validateData()" class="form-control " placeholder="Enter your  Password" type="password">
                        <div id="passWordAlert" class="alert text-danger bg-warning mt-1 mb-0 d-none">
            <p class="mb-0">*Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="inner ">
                        <input id="rePasswordInput" onkeyup="validateData()" class="form-control " placeholder="Repassword" type="password">
                        <div id="rePassWordAlert" class="alert text-danger bg-warning mt-1 mb-0 d-none">
            <p class="mb-0">*Enter valid repassword</p>
        </div>
                    </div>
                </div>
            </div>
            <button id="submit" disabled class="btn btn-outline-danger my-3 ">Submit</button>

        </div>
 



    </section> 
  `;

  mealsContainer.innerHTML = htmlContact;
  searchContainer.innerHTML = "";
  closeNav();
  $("#nameInput").on("click", function () {
    nameFocus = true;
  });
  $("#emailInput").on("click", function () {
    emailFocus = true;
  });
  $("#phoneInput").on("click", function () {
    phoneFocus = true;
  });
  $("#ageInput").on("click", function () {
    ageFocus = true;
  });
  $("#passwordInput").on("click", function () {
    passwordFocus = true;
  });
  $("#rePasswordInput").on("click", function () {
    repasswordFocus = true;
  });
}

$(".contact").on("click", function () {
  displayContact();
});

// ^ >>>>>>>>>>>>>>>>>>>>>>> Display contact us<<<<<<<<<<<<<<<<<<<<<<<<<<
// * >>>>>>>>>>>>>>>>>>>>>>> Validation<<<<<<<<<<<<<<<<<<<<<<<<<<

let nameFocus = false;
let emailFocus = false;
let phoneFocus = false;
let ageFocus = false;
let passwordFocus = false;
let repasswordFocus = false;

function validateData() {
  if (nameFocus) {
    if (ValidateName()) {
      $("#nameAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#nameAlert").removeClass("d-none").addClass("d-block");
    }
  }

  if (emailFocus) {
    if (ValidateEmail()) {
      $("#emailAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#emailAlert").removeClass("d-none").addClass("d-block");
    }
  }

  if (phoneFocus) {
    if (ValidatePhone()) {
      $("#numberAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#numberAlert").removeClass("d-none").addClass("d-block");
    }
  }

  if (ageFocus) {
    if (ValidateAge()) {
      $("#ageAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#ageAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (passwordFocus) {
    if (ValidatePassword()) {
      $("#passWordAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#passWordAlert").removeClass("d-none").addClass("d-block");
    }
  }

  if (repasswordFocus) {
    if (ValidateRePassword()) {
      $("#rePassWordAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#rePassWordAlert").removeClass("d-none").addClass("d-block");
    }
  }

  if (
    ValidateName() &&
    ValidateEmail() &&
    ValidatePhone() &&
    ValidateAge() &&
    ValidatePassword() &&
    ValidateRePassword()
  ) {
    $("#submit").removeAttr("disabled");
  } else {
    $("#submit").attr("disabled", true);
  }
}

function ValidateName() {
  return /^[A-Z][a-z ,.'-]{1,49}$/i.test(
    document.getElementById("nameInput").value
  );
}
function ValidateEmail() {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(
    document.getElementById("emailInput").value
  );
}
function ValidatePhone() {
  return /^(\+?\d{1,3})?[-.\s]?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(
    document.getElementById("phoneInput").value
  );
}
function ValidateAge() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}
function ValidatePassword() {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}
function ValidateRePassword() {
  return (
    document.getElementById("rePasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

// * >>>>>>>>>>>>>>>>>>>>>>> Validation<<<<<<<<<<<<<<<<<<<<<<<<<<
