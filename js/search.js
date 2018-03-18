window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "ArrowDown":
        // Do something for "down arrow" key press.
        themeSwitch('dark');
        break;
      case "ArrowUp":
        // Do something for "up arrow" key press.
        themeSwitch('light');
        break;
      case "ArrowLeft":
        // Do something for "left arrow" key press.
        break;
      case "ArrowRight":
        // Do something for "right arrow" key press.
        break;
      case "Enter":
        // Do something for "enter" or "return" key press.
        if (document.getElementById("search-box").value == "") {
            break // Nothing has been entered
        } else {
            var query = document.getElementById("search-box").value;
            document.getElementById("search-box").value = ""; // Clear the box incase the user goes back
            window.location.assign("https://duckduckgo.com/?q=" + query); // Search DuckDuckGo
        }
        break;
      case "Escape":
        // Do something for "esc" key press.
        window.location.assign("https://reddit.com"); // Go to Reddit
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);