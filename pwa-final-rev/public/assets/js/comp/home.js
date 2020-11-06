import { competitions } from "../data/data.js";
import { addFavoriteTeam, removeFavoriteTeam, buildFavButton, getFavoriteTeams } from "./fav.js";
import { showLoading } from "./utilities.js";
import API from "../data/api.js";
import Jadwal from "./jadwal.js";

let teamData = null;

const Home = () => {
    console.log('STARTING HOME CONTROLLER');
    /*
        TODO: Change query after makeimg card and tabs
    */
    let tabContainer = document.querySelector('.tabs');
    let clubsContainer = document.querySelector('.clubs-container');
    let homeTitle =  document.querySelector('div#about.section h3.title');
    
    function buildTab() {
        let html = [];
        competitions.forEach(res => {
            html.push(`<li class="tab">`);
            html.push(`<a data-id="${res.id}">`);
            html.push(`${res.name}`);
            html.push(`</a>`);
            html.push(`</li>`);
        })
        tabContainer.innerHTML = html.join('\n');
    };
    buildTab();

    /*
    *   BUILD CLUB ITEM
    */
    function buildClubItem(id = 2021) {
        // showLoading(document.getElementById('main-content'));
        showLoading(clubsContainer);
        let html = [];
        API.getTeams(id).then(teams => {    
            // Set Team Data
            teamData = teams;

            getFavoriteTeams().then(res => {

                let favTeams = res;
                teamData.forEach(data => {
                    let image = data.crestUrl ? data.crestUrl : '/assets/images/noimage.webp';
                    let button = buildFavButton(data.id, favTeams);

                    html.push(`<div class="club-item">`);
                    // html.push(`<a data-id="${data.id}" >`);
                    html.push(`<div class="card">`);
                    html.push(`<div class="card-image">`);
                    html.push(`<img class="teamLogo" src="${image}">`);
                    html.push(button);
                    html.push(`</div>`);
                    html.push(`<div class="card-content">`);
                    html.push(`<span class="card-title text-bold center-align">${data.shortName}</span>`);
                    html.push(`</div>`);
                    html.push(`<div class="card-action center-align">`);
                    html.push(`<a class="waves-effect purple darken-1 waves-light btn more-info" data-id="${data.id}">More Info</a>`);
                    // html.push(`<a href="#">This is a link</a>`);
                    html.push(`</div>`);
                    html.push(`</div>`);
                    // html.push(`</a>`);
                    html.push(`</div>`);
                })

                clubsContainer.innerHTML = html.join('\n');
                favEventListener();
                infoEventListener();

            }).catch(err => {
                console.error(err);
            });
            
            // console.log(data);

        }).catch(err => {
            console.error(err);
        });
        
        homeTitle.innerHTML = competitions.find(x => x.id === parseInt(id)).name;
    }
    buildClubItem();    

    /*
        FAVORITE Button Event Listener
    */
    function favEventListener() {
        document.querySelectorAll('button.btn-fav').forEach(elem => {
            elem.addEventListener('click', e => {
                let dataId = e.currentTarget.getAttribute('data-id');
                
                if(e.target.classList.contains('fa-red')){
                    removeFavoriteTeam(dataId);
                    e.target.classList.remove('fa-red');
                    e.target.classList.add('fa-grey');
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
                Jadwal(dataId);
                console.log(dataId);
            });
        });
    }

    /* 
        TODO: Make matches history page
    */
    document.querySelectorAll('.clubs-container .club-item a').forEach(elem => {
        elem.addEventListener('click', e => {
            const anchor = e.target.closest("a");
            let dataId = anchor.getAttribute('data-id');
            console.log(dataId);
        });
    });

    
    /*
        TABS Event Listener
    */
    document.querySelectorAll('.tabs .tab a').forEach(elem => {
        elem.addEventListener('click', e => {
            let dataId = e.currentTarget.getAttribute('data-id');
            buildClubItem(dataId);
        });
    });
}

export default Home;