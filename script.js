const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twittterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
//preloader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function hideLoading() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}
// Get Quote From API

async function getQuote() {
  loading();
  const proxyUrl = "http://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    //Reqduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    hideLoading();
  } catch (error) {
      for (let i = 0; i < 10; i++) {
        getQuote();
      }
    console.log("Facing issues while fetching data from API ", error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event Listners
newQuoteBtn.addEventListener("click", getQuote);
twittterBtn.addEventListener("click", tweetQuote);

//On Load
getQuote();
