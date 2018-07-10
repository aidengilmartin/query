function search() {
  var searchBox = document.getElementById("search-box");
  var query = searchBox.value;

  if (searchBox.value != "") {
    searchBox.value = ""; // Clear the box incase the user goes back

    if (isURL(query) == false) { // Not a valid URL
      if (isDDG(query) == false) { // Searching with Google
        window.location.assign("https://www.google.co.uk/search?hl=en&q=" + query); // Search DuckDuckGo
      } else if (isDDG(query) == true) { // Searching with DDG
        query = query.slice(3);
        window.location.assign("https://duckduckgo.com/?q=" + query);
      }
    } else if (isURL(query) == true) { // Valid URL
      if (protoCheck(query) == true) { // Includes protocol
        window.location.assign(query);
      } else if (protoCheck(query) == false) { // No protocol
        window.location.assign("http://" + query); // Add a protocol (HTTP) (This assumes that any sites will do a protocol redirect if needed)
      }
    }
  } else {
    console.log("No entry");
  }

}

function isDDG(str) {
  if (str.startsWith("!d ")) { // DuckDuckGo search
    return true;
  } else {
    return false;
  }
}

function isURL(str) { // https://stackoverflow.com/a/45567717
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?'+ // port
  '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
  '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

function protoCheck(str) {
  if (str.startsWith("https://") || str.startsWith("http://")) { // HTTPS or HTTP is present
    return true;
  } else {
    return false; // No protocol matched
  }
}