const newQuote = document.getElementById("newQuote");
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    category: "motivation",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "life",
  },
  {
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    category: "life",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    category: "success",
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    category: "inspiration",
  },
  {
    text: "You miss 100% of the shots you don't take.",
    category: "motivation",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    category: "inspiration",
  },
  {
    text: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    category: "perseverance",
  },
  {
    text: "The only thing we have to fear is fear itself.",
    category: "courage",
  },
  {
    text: "The best way to predict the future is to create it.",
    category: "success",
  },
];

const showRandomQuote = () => {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  let quoteElement = document.createElement("p");
  quoteElement.innerHTML = quotes[randomIndex].text;
  quoteDisplay.appendChild(quoteElement);
};

newQuote.addEventListener("click", showRandomQuote);

const createAddQuoteForm = () => {
  let getQuotes = document.getElementById("textarea");
  let quote = getQuotes.value.trim();
  let quoteDisplay = document.getElementById("quoteDisplay");

  if (quote) {
    quotes.push({ text: quote, category: "custom" });
    getQuotes.value = "";

    let successMessage = document.createElement("p");
    successMessage.innerHTML = "Quote added successfully!";
    successMessage.style.color = "green";
    quoteDisplay.innerHTML = "";
    quoteDisplay.appendChild(successMessage);
  } else {
    let errorMessage = document.createElement("p");
    errorMessage.innerHTML = "Please enter a quote.";
    errorMessage.style.color = "red";
    quoteDisplay.innerHTML = "";
    quoteDisplay.appendChild(errorMessage);
  }
};

document
  .getElementById("addQuoteButton")
  .addEventListener("click", createAddQuoteForm);
