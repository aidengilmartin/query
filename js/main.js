window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        themeSwitch('dark');
        break;
      case "ArrowUp":
        themeSwitch('light');
        break;
      case "Enter":
        search();
        break;
      case "Escape":
        window.location.assign("https://reddit.com");
        break;
      default:
        return;
    }
    event.preventDefault();
}, true);

function pageLoad () {

    var unix = Math.round(+new Date()/1000);
    var diff = (unix - localStorage.getItem('timestamp'));
    
    if (diff > 120) {
        getData(); // Run the dataFetch function (last data is over 120 seconds old)
        console.log("Data > 120 seconds old : FETCHING NEW DATA");
    } else {
        dataRefresh(); // Don't update the data and display what is in storage
        console.log("Data < 120 seconds old : NOT UPDATING");
    }

    if (localStorage.getItem('theme') == null) {
        // No theme has been selected, nothing needs to switch
        themeSwitch('dark');
    } else {
        themeSwitch(localStorage.getItem('theme'));
    }

}