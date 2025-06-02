function toggleMenu() {
    const navLinks = document.getElementById('menu');
    const menuIcon = document.getElementById('hamburger');

    navLinks.classList.toggle('show');
    menuIcon.classList.toggle('active');
}

function toggleDark() {
    let darkmode = document.getElementById('changeable');
    
    darkmode.classList.toggle('darkactive');
}

;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });