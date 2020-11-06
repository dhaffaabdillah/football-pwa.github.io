import Home from "./comp/home.js";
import myTeams from "./comp/myTeams.js"
import Jadwal from "./comp/jadwal.js";

document.addEventListener('DOMContentLoaded', function() {
    const BASE_URL = window.location.origin;
    const BodyContent = document.querySelector(".body-content");
    const SideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(SideNav);
    
    let page = window.location.hash.substr(1);
    (page == '') ? page = 'home' : page = page;
    let requestOptions = {
        method: 'GET',
        mode: 'same-origin',
        redirect: 'follow',
        // include credentials to apply cookies from browser window
        credentials: 'same-origin', // 'include',
        headers: new Headers()
    };
    requestOptions.headers.set('accept', 'image/webp,image/apng,image/*,*/*');

    // Initialize
    loadNavigation();  
    loadPage(page);


    function loadNavigation() {
        const URI = new URL('/nav.html', BASE_URL);
        let request = new Request(URI, requestOptions);

        fetch(request).then(res => res.text())
        .then(res => {
            document.querySelectorAll('.topnav, .sidenav').forEach(el => {
                el.innerHTML = res;
            });
            // Initialize NavLink Listener
            listenNavLink();
        })
        .catch(err => {
            console.error(err);
        });
    }

    function listenNavLink() {
        document.querySelectorAll('.sidenav a, .topnav a').forEach(function(elm){
            elm.addEventListener('click', function(event){
                // Tutup sidenav
                let sidenav = document.querySelector('.sidenav');
                M.Sidenav.getInstance(sidenav).close();
                
                // Muat konten halaman yang dipanggil 
                const pageLink = event.target.getAttribute('href').substr(1);
                loadPage(pageLink);
            });
        });
    }

    function loadPage(page) {
        const URI = new URL('/pages/' + page + '.html', BASE_URL);
        const request = new Request(URI, requestOptions);
        
        fetch(request).then(res => {
            if (!res.ok) {
                if(res.status == 404){
                    let html = [];
                    html.push(`<div class="valign-wrapper">`);
                    html.push(`<h5 class="center-align">Halaman tidak ditemukan</h5>`);
                    html.push(`</div>`);
                    BodyContent.innerHTML = html.join('\n');
                } else {
                    BodyContent.innerHTML = `<p>Ups... halaman tidak dapat diakses.</p>`;
                }
                throw Error(res.statusText);
            }
            return res.text();
        })
        .then(res => {
            BodyContent.innerHTML = res;
            switch(page){
                case 'home':
                    Home();
                    break;
                case 'myteams':
                    myTeams();
                    break;
                case 'jadwal':
                    Jadwal();
                    break;
            }
        })
        .catch(err => {
            console.error(err);
        });
    }
});