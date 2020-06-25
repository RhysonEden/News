const BASE_URL = "https://api.currentsapi.services/v1/";

const KEY = "apiKey=6vSSrQf5sNKgDH4MgpJ1X-_9pKsh3g4nyMWM1voAPOcHUBQp";

const latestNews = "latest-news?";

let language = "language=en&";

let categories = "category=general";

const catTwo = "available/categories";

const regions = "available/regions";

let region = "region=EN&";

const langTwo = "available/languages";

const search = "search?";

let today = new Date();

let date =
  "start_date=" +
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1) +
  "-" +
  today.getDate() +
  "&";
let endDate =
  "end_date=" +
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1) +
  "-" +
  (today.getDate() + 1) +
  "&";

function fetchNews() {
  let url = `${BASE_URL}${search}${language}${region}${categories}${date}${endDate}${KEY}`;
  $(".main").empty();
  console.log(url);
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.news.forEach((d) => {
        $(".main").append(
          `<div id="news-title"><h3>${d.title}</h3>
        <a href="${d.url}" target="_blank">
        <img src="${
          d.image === "None" || d.image === "" ? "img/standin.jpg" : d.image
        }" class="images">
        <h3>${d.description}</h3>
        <h5><a href="${d.url}">Story</a></h5>
        <h5>Category:<br>${d.category[0]} <br>${
            d.category[1] === undefined ? "" : d.category[1]
          }
          </h5></div>`
        );
      });
    })
    .then(() => {
      pageLoad();
    })
    .catch((err) => {
      console.log(err);
    });
}

async function fetchLatestNews() {
  const url = `${BASE_URL}${latestNews}${language}${region}${KEY}`;
  $(".main").empty();
  console.log(url);
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.news.forEach((d) => {
        $(".main").append(
          `<div id="news-title"><h3>${d.title}</h3>
          <a href="${d.url}" target="_blank">
          <img src="${
            d.image === "None" ? "img/standin.jpg" : d.image
          }" class="images">
          <h3>${d.description}</h3>
          <h5><a href="${d.url}">Story</a></h5>
          <h5> Category:<br><button class="link">${
            d.category[0]
          }</button> <br><button class="link" value="button text">${
            d.category[1] === undefined ? "" : d.category[1]
          }</button></a>
          </h5></div>`
        );
      });
    })
    .then(() => {
      pageLoad();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Big Function starts here

function pageLoad() {
  categoryDrop();
  languageDrop();
  regionDrop();
}

function categoryDrop() {
  $(document).ready(function () {
    let dropdown = $(".dropdown");
    dropdown.empty();

    dropdown.append(
      `<option 
    selected="true" disabled
    >Choose a Category</option>`
    );

    const url = `${BASE_URL}${catTwo}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.categories.forEach(function (categories) {
          return dropdown.append(
            `<option value="${categories}">${categories}</option>`
          );
        });
      });
  });
}

function regionDrop() {
  $(document).ready(function () {
    let dropdown = $(".regiondropdown");
    dropdown.empty();

    dropdown.append(
      `<option 
    selected="true" disabled
    >or region</option>`
    );

    const url = `${BASE_URL}${regions}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const speech = Object.entries(data.regions);
        speech.forEach((obj) => {
          return dropdown.append(
            `<option value="${obj[1]}">${obj[0]}</option>`
          );
        });
      });
  });

  $(".regiondropdown").on("change", function () {
    let info = $(".regiondropdown").val();
    region = `region=${info}&`;
    fetchNews();
  });
}

$(".dropdown").on("change", function () {
  let cat = $(".dropdown").val();
  categories = `category=${cat}&`;
  fetchNews();
});

$(document).ready(function () {
  $(".link").on("click", function (event) {
    event.preventDefault();
    console.log("test");
    cat = $(".link").text();
    console.log(cat);
    // categories = `category=${cat}&`;
  });
});
//Language dropdown - help needed
function languageDrop() {
  $(document).ready(function () {
    let dropdown = $(".languagedropdown");
    dropdown.empty();

    dropdown.append(
      `<option 
    selected="true" disabled
    >Choose your language</option>`
    );
    // JSON.parse(localStorage.getItem("data"));
    const url = `${BASE_URL}${langTwo}`;
    // if (localStorage.getItem("data")) {
    //   console.log("test");
    //   return JSON.parse(localStorage.getItem("data"));
    // } else {
    fetch(url)
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        console.log("this is what I want to see", data);
        const speech = Object.entries(data.languages);
        speech.forEach((obj) => {
          // localStorage.setItem("data", JSON.stringify(data));
          return dropdown.append(
            `<option value="${obj[1]}">${obj[0]}</option>`
          );
        });
      });
  });

  $(".languagedropdown").on("change", function () {
    let info = $(".languagedropdown").val();
    language = `language=${info}&`;
    fetchNews();
  });
}

$("#submitStartDate").on("click", function () {
  let startDate = new Date($("#start-date").val());
  let endedDate = new Date($("#end-date").val());
  if (startDate > endedDate) {
    alert("Incorrect End Date");
  } else {
    if ($("#start-date").val() === "") {
      date =
        "start_date=" +
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        "&";
    } else {
      dayStart = startDate.getDate() - 1;
      monthStart = startDate.getMonth() + 1;
      yearStart = startDate.getFullYear();
      date = `start_date=${yearStart}-${monthStart}-${dayStart}&`;
    }

    if ($("#end-date").val() === "") {
      "end_date=" +
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        "&";
    } else {
      dayEnd = endedDate.getDate() + 1;
      monthEnd = endedDate.getMonth() + 1;
      yearEnd = endedDate.getFullYear();
      endDate = `end_date=${yearEnd}-${monthEnd}-${dayEnd}&`;
    }
  }
  fetchNews();
});

$("#submit").on("click", function (event) {
  event.preventDefault();
  $(".main").empty();
  let param = $("#searches").val();
  let url = `${BASE_URL}search?keywords=${param}&${language}${region}${KEY}`;

  if (param !== "") {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.news.forEach((d) => {
          return $(".main").append(
            `<div id="news-title"><h3>${d.title}</h3>
        <a href="${d.url}" target="_blank">
        <img src="${
          d.image === "None" ? "img/standin.jpg" : d.image
        }" class="images">
        <h3>${d.description}</h3>
        <h5><a href="${d.url}">Story</a></h5>
        <<h5>Category:<br>${d.category[0]} <br>${
              d.category[1] === undefined ? "" : d.category[1]
            }
          </h5></div>
        `
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    fetchLatestNews();
  }
});

$("#latest-news").on("click", function (event) {
  event.preventDefault();
  $(".main").empty();
  fetchLatestNews();
});

function bootStrap() {
  pageLoad();
  fetchLatestNews();
}

bootStrap();
