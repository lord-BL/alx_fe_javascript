const newQuote = document.getElementById("newQuote");
const importFile = document.getElementById("importFile");
const quotes = JSON.parse(localStorage.getItem("quotes")) || [
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

const saveQuotes = () => {
  localStorage.setItem("quotes", JSON.stringify(quotes));
};

const showRandomQuote = () => {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  let quoteElement = document.createElement("p");
  quoteElement.innerHTML = quotes[randomIndex].text;
  quoteDisplay.appendChild(quoteElement);

  sessionStorage.setItem("lastViewedQuote", quotes[randomIndex].text);
};

newQuote.addEventListener("click", showRandomQuote);

document.getElementById("addQuoteButton").addEventListener("click", () => {
  let getQuotes = document.getElementById("textarea");
  let quote = getQuotes.value.trim();
  let quoteDisplay = document.getElementById("quoteDisplay");

  if (quote) {
    quotes.push({ text: quote, category: "custom" });
    saveQuotes();
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
});

document.getElementById("exportButton").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

importFile.addEventListener("change", (event) => {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
});
