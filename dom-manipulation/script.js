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

const populateCategories = () => {
  const categories = [...new Set(quotes.map((quote) => quote.category))];
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });

  const lastCategory = localStorage.getItem("lastSelectedCategory") || "all";
  categoryFilter.value = lastCategory;
  filterQuotes();
};

const filterQuotes = () => {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("lastSelectedCategory", selectedCategory);

  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((quote) => quote.category === selectedCategory);
  displayQuotes(filteredQuotes);
};

const displayQuotes = (filteredQuotes) => {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available for this category.</p>";
  } else {
    filteredQuotes.forEach((quote) => {
      const quoteElement = document.createElement("p");
      quoteElement.innerHTML = `"${quote.text}" - <em>${quote.category}</em>`;
      quoteDisplay.appendChild(quoteElement);
    });
  }
};

newQuote.addEventListener("click", showRandomQuote);

document.getElementById("addQuoteButton").addEventListener("click", () => {
  const getQuotes = document.getElementById("textarea");
  const quote = getQuotes.value.trim();
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (quote) {
    quotes.push({ text: quote, category: "custom" });
    saveQuotes();
    populateCategories();

    getQuotes.value = "";

    const successMessage = document.createElement("p");
    successMessage.innerHTML = "Quote added successfully!";
    successMessage.style.color = "green";
    quoteDisplay.innerHTML = "";
    quoteDisplay.appendChild(successMessage);
  } else {
    const errorMessage = document.createElement("p");
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
    populateCategories();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
});

populateCategories();
