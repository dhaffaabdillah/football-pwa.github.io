// import some functions for fav teams
import { addFavoriteTeam, removeFavoriteTeam, buildFavButton, getFavoriteTeams } from "./fav.js";
import { showLoading } from "./utilities.js";
import Jadwal from "./jadwal.js";

const myTeams = () => {
    let clubsContainer = document.querySelector('.clubs-container');

    function buildClubItem() {
        showLoading(clubsContainer);
        let html = [];

        getFavoriteTeams().then(res => {
            let favTeams = res;
            favTeams.forEach(data => {
                let image = data.crestUrl ? data.crestUrl : '/assets/images/noimage.webp';

                html.push(`<div class="club-item">`);
                html.push(`<div class="card">`);
                html.push(`<div class="card-image">`);
                html.push(`<img class="teamLogo" src="${image}">`);
                html.push(`<button data-id="${data.id}" class="btn-floating halfway-fab btn-fav white waves-effect"><i class="fa fa-heart fa-red"></i></button>`);
                html.push(`</div>`);
                html.push(`<div class="card-content">`);
                html.push(`<span class="card-title text-bold center-align">${data.shortName}</span>`);
                html.push(`</div>`);
                html.push(`<div class="card-action center-align">`);
                html.push(`<a class="waves-effect purple darken-1 waves-light btn more-info" data-id="${data.id}">More Info</a>`);
                html.push(`</div>`);
                html.push(`</div>`);
                html.push(`</div>`);
            })

            clubsContainer.innerHTML = html.join('\n');
            favEventListener();
            infoEventListener();

        }).catch(err => {
            console.error(err);
        });
        
        // console.log(data);
    }
    buildClubItem();

    /*
        FAVORITE Button Event Listener
    */
    function favEventListener() {
        document.querySelectorAll('button.btn-fav').forEach(elem => {
            elem.addEventListener('click', e => {
                let dataId = e.currentTarget.getAttribute('data-id');
                let parentClubItem = e.currentTarget.closest('.club-item');
                
                if(e.target.classList.contains('fa-red')){
                    removeFavoriteTeam(dataId);
                    e.target.classList.remove('fa-red');
                    e.target.classList.add('fa-grey');
                    parentClubItem.remove();
                } else {
                    addFavoriteTeam(teamData, dataId);
                    e.target.classList.remove('fa-grey');
                    e.target.classList.add('fa-red');
                }
            });
        });
    }

    /*
        MORE INFO Button Event Listener
    */
    function infoEventListener() {
        document.querySelectorAll('a.more-info').forEach(elem => {
            elem.addEventListener('click', e => {
                let dataId = e.currentTarget.getAttribute('data-id');
                console.log(dataId);
                Jadwal(dataId);
            });
        });
    }
}

export default myTeams;