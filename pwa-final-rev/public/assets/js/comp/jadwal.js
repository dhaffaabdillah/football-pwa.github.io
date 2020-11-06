import API from "../data/api.js";
import { showLoading, removeLoading, utcToLocal } from "./utilities.js";

const BASE_URL = window.location.origin;
let requestOptions = {
    method: 'GET',
    mode: 'same-origin',
    redirect: 'follow',
    // include credentials to apply cookies from browser window
    credentials: 'same-origin', // 'include',
    headers: new Headers()
};
requestOptions.headers.set('accept', 'image/webp,image/apng,image/*,*/*');
const BodyContent = document.querySelector(".body-content");
let dataPertandingan = null;

function Jadwal(id = 81) {
    console.log('STARTING JADWAL CONTROLLER')

    function loadPage() {

        const uri = new URL(`/pages/jadwal.html`, BASE_URL);
        const request = new Request(uri, requestOptions);
        
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
        }).then(res => {
            BodyContent.innerHTML = res;
            buildJadwal();
        }).catch(err => {
            console.error(err);
        })
    }
    loadPage();

    function buildJadwal() {
        let matchList = document.querySelector('.matchList');
        let html = [];

        showLoading(matchList);

        API.getJadwalPertandigan(id).then(res => {

            dataPertandingan = res;
            
            // console.log(dataPertandingan);
            if (res.length > 0) {
                dataPertandingan.forEach(res => {
                    let date = utcToLocal(res.utcDate, 'Asia/Jakarta')
    
                    html.push(`<div class="matchblock">`);
                    html.push(`<div class="header">`);
                    html.push(`<h2>${res.competition.name}</h2>`);
                    html.push(`<span>${date}</span>`);
                    html.push(`</div>`);
                    html.push(`<div class="matchtable">`);
                    html.push(`<div class="matchrow">`);
                    html.push(`<div class="centerwrap">`);
                    html.push(`<div class="home right-align"><span>${res.homeTeam.name}</span></div>`);
                    html.push(`<div class="time"><span>VS</span></div>`);
                    html.push(`<div class="away"><span>${res.awayTeam.name}</span></div>`);
                    html.push(`</div>`);
                    html.push(`</div>`);
                    html.push(`</div>`);
                    html.push(`</div>`);
    
                });
            } else {
                html.push(`<div class="center-align mx"><h4>No Data Available!</h4></div>`);
            }
           

            matchList.innerHTML = html.join('\n');

        }).catch(err => {
            console.error(err);
        });
    }

};

export default Jadwal;