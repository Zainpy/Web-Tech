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
    })
    
;

document.addEventListener("DOMContentLoaded", () => {
    const data = {
        facilities: [
            { name: "CFS Stadium Field", activity: "Sports", place: "CFS Stadium" },
            { name: "Volleyball court", activity: "Sports", place: "CFS Stadium" },
            { name: "Basketball court", activity: "Sports", place: "CFS Stadium" },
            { name: "Multipurpose Room 1", activity: "Exhibtion", place: "Dar al-Hikmah Library" },
            { name: "Multipurpose Room 2", activity: "Exhibtion", place: "Dar al-Hikmah Library" },
            { name: "Cyber Room 1", activity: "Lectures", place: "Dar al-Hikmah Library" },
            { name: "Cyber Room 2", activity: "Lectures", place: "Dar al-Hikmah Library" },
            { name: "Lecture Hall 1", activity: "Lectures", place: "Al-Jurjani" },
            { name: "Lecture Hall 2", activity: "Lectures", place: "Al-Jurjani" },
            { name: "Al-Khawarizmi Hall", activity: "Gathering", place: "Al-Khawarizmi" },
            { name: "Banquet Hall", activity: "Gathering", place: "Abu Bakar As-Siddiq" },
            { name: "Exam Hall 1", activity: "Workshops", place: "Al-Jurjani" },
            { name: "Exam Hall 2", activity: "Workshops", place: "Al-Jurjani" },
            { name: "Computer Lab", activity: "Lectures", place: "Al-Khalil" },
            { name: "Language Lab", activity: "Lectures", place: "Al-Khalil" },
            { name: "Tutorial Room", activity: "Lectures", place: "Al-Jurjani" }
        ]
    };

    const container = document.getElementById("facility-container");
    const searchInput = document.getElementById("searchInput");
    const placeFilter = document.getElementById("placeFilter");

    function groupFacilities() {
        const grouped = {};
        data.facilities.forEach(item => {
            if (!grouped[item.activity]) grouped[item.activity] = [];
            grouped[item.activity].push(item);
        });
        return grouped;
    }

    function renderFacilities() {
        const grouped = groupFacilities();
        const search = searchInput.value.toLowerCase();
        const place = placeFilter.value;

        container.innerHTML = "";
        for (const activity in grouped) {
            const div = document.createElement("div");
            div.className = "category";

            const title = document.createElement("h2");
            title.textContent = activity;

            const list = document.createElement("ul");
            title.onclick = () => list.classList.toggle("hidden");

            grouped[activity].forEach(facility => {
                const matchesSearch = facility.name.toLowerCase().includes(search);
                const matchesPlace = !place || facility.place.toLowerCase() === place.toLowerCase();
                if (matchesSearch && matchesPlace) {
                    const li = document.createElement("li");
                    li.textContent = `${facility.name} (${facility.place})`;
                    list.appendChild(li);
                }
            });

            if (list.children.length > 0) {
                div.appendChild(title);
                div.appendChild(list);
                container.appendChild(div);
            }
        }
    }

    function populatePlaceFilter() {
        const places = [...new Set(data.facilities.map(f => f.place))];
        places.sort();
        places.forEach(place => {
            const option = document.createElement("option");
            option.value = place;
            option.textContent = place;
            placeFilter.appendChild(option);
        });
    }

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
    }

    searchInput.addEventListener("input", renderFacilities);
    placeFilter.addEventListener("change", renderFacilities);

    populatePlaceFilter();
    renderFacilities();
});