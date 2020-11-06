const apiKey = "b9a5f73bd4634cfba548f52b4c448fa0";
const baseUrl = "https://api.football-data.org/v2/";
let requestOptions = {
    method: 'GET',
    mode: 'cors',
    // redirect: 'follow',
    // include credentials to apply cookies from browser window
    // credentials: 'include', // 'include',
    headers: new Headers()
};
// requestOptions.headers.append('Content-Type', 'application/json');
requestOptions.headers.append('accept', '*/*');
requestOptions.headers.append('X-Auth-Token', apiKey);


class API {

    static getTeams(competitionId){
        const uri = new URL(`competitions/${competitionId}/teams`, baseUrl);
        const request = new Request(uri, requestOptions);
        return fetch(request).then(res => res.json())
        .then(res => {
            // console.log(res);            
            if(res){
                return Promise.resolve(res.teams);
            } else {
                return Promise.reject(`The request was made but no response was received`);
            }
        }).catch(err => {
            console.error(err);
            return Promise.reject();
        })
    };

    static getJadwalPertandigan(id){
        const uri = new URL(`teams/${id}/matches`, baseUrl);
        uri.searchParams.set('status', 'SCHEDULED');
        const request = new Request(uri, requestOptions);
        return fetch(request).then(res => res.json())
        .then(res => {
            // console.log(res);            
            if(res){
                return Promise.resolve(res.matches);
            } else {
                return Promise.reject(`The request was made but no response was received`);
            }
        }).catch(err => {
            console.error(err);
            return Promise.reject();
        })
    }

}

export default API;