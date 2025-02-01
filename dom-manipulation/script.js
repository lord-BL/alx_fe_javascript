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
  for (let index = 0; index < 1; index++) {
    let randomnIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteDisplay").textContent =
      quotes[randomnIndex].text;
  }
};
newQuote.addEventListener("click", showRandomQuote);
const createAddQuoteForm = () => {
  let getQuotes = document.getElementById("textarea");
  let quote = getQuotes.value.trim();
  if (quote) {
    // Ensure the input is not empty
    quotes.push({ text: quote, category: "custom" }); // Add the new quote to the array
    getQuotes.value = ""; // Clear input field
    alert("Quote added successfully!");
  } else {
    alert("Please enter a quote.");
  }
};
document.addEventListener("click", createAddQuoteForm);
