function themeSwitch(name) {
    document.getElementById('style').setAttribute('href', 'css/' + name + '.css');
    localStorage.setItem('theme', name);
}