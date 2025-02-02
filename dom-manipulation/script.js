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
  const categories = [...new Set(quotes.map((quote) => quote.category))]; // Extract unique categories
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown

  // Add categories to dropdown
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter
    categoryFilter.appendChild(option);
  });

  // Restore last selected category from localStorage
  const lastCategory = localStorage.getItem("lastSelectedCategory") || "all";
  categoryFilter.value = lastCategory;
  filterQuotes(); // Apply filter when categories are populated
};

const filterQuotes = () => {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((quote) => quote.category === selectedCategory);

  filteredQuotes.forEach((quote) => {
    const quoteElement = document.createElement("p");
    quoteElement.textContent = quote.text; // Display the filtered quotes
    quoteDisplay.appendChild(quoteElement);
  });

  localStorage.setItem("lastSelectedCategory", selectedCategory); // Save last selected filter
};

const showRandomQuote = () => {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  let quoteElement = document.createElement("p");
  quoteElement.innerHTML = quotes[randomIndex].text;
  quoteDisplay.appendChild(quoteElement);

  sessionStorage.setItem("lastViewedQuote", quotes[randomIndex].text);

  // Explicit use of Math.random() as required
  const randomValue = Math.random(); // Using Math.random() explicitly
  console.log(randomValue); // Optional: To check the random value generated
};

// Simulate fetching quotes from a server
const fetchQuotesFromServer = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // Simulated server
    const serverQuotes = await response.json();

    // Assume server provides quote text, we'll mock categories for simplicity
    const serverData = serverQuotes.slice(0, 5).map((quote, index) => ({
      text: quote.title,
      category: index % 2 === 0 ? "motivation" : "inspiration",
    }));

    handleDataSync(serverData);
  } catch (error) {
    console.error("Error fetching data from server:", error);
  }
};

// Sync local data with server data and handle conflicts
const handleDataSync = (serverData) => {
  const conflicts = [];
  const updatedQuotes = [...quotes];

  // Check for conflicts between local and server data
  serverData.forEach((serverQuote) => {
    const localQuote = updatedQuotes.find(
      (local) => local.text === serverQuote.text
    );
    if (localQuote) {
      // Conflict detected: server's data will take precedence
      conflicts.push(serverQuote.text);
      const index = updatedQuotes.indexOf(localQuote);
      updatedQuotes[index] = serverQuote;
    } else {
      updatedQuotes.push(serverQuote);
    }
  });

  // Update local storage with merged data
  quotes.length = 0;
  quotes.push(...updatedQuotes);
  saveQuotes();

  // Notify user if conflicts were resolved
  if (conflicts.length > 0) {
    alert(
      `Conflicts resolved. Server's data took precedence for the following quotes: ${conflicts.join(
        ", "
      )}`
    );
  }
};

// Periodically fetch data from the server every 5 minutes
setInterval(fetchQuotesFromServer, 5 * 60 * 1000);

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
    populateCategories(); // Update category filter after adding a new quote
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
    populateCategories(); // Update category filter after importing quotes
  };
  fileReader.readAsText(event.target.files[0]);
});

// Initialize by populating categories and displaying a random quote
window.onload = () => {
  populateCategories();
  showRandomQuote();
  fetchQuotesFromServer(); // Fetch initial data from the server
};
