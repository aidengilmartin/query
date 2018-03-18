function themeSwitch(name) {
    document.getElementById('style').setAttribute('href', 'css/' + name + '.css'); // Set the HTML Link tag to the correct href
    localStorage.setItem('theme', name); // Store the choice in localstorage so that it is remembered
}
