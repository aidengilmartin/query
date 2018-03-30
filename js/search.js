function search() {
  var searchBox = document.getElementById("search-box");
  var query = searchBox.value;

  if (searchBox.value == "") {
    console.log("Nothing entered into search box");
  } else {
    searchBox.value = ""; // Clear the box incase the user goes back
    window.location.assign("https://duckduckgo.com/?q=" + query); // Search DuckDuckGo
  }
}