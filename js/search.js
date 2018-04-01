function search() {
  var searchBox = document.getElementById("search-box");
  var query = searchBox.value;

  if (searchBox.value == "") {
    console.log("Nothing entered into search box");
  } else {
    searchBox.value = ""; // Clear the box incase the user goes back

    if (isURL(query) == false) { // User has not entered a valid URL
      window.location.assign("https://duckduckgo.com/?q=" + query); // Search DuckDuckGo
    } else if (isURL(query) == true) { // User has entered a valid URL
      if (query.startsWith("http://") || query.startsWith("https://")) { // URL does include protocol
        window.location.assign(query);
      } else { // URl does not include protocol
        window.location.assign("http://" + query); // Add a protocol (HTTP) (This assumes that any sites will do a protocol redirect if needed)
      }
    }

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