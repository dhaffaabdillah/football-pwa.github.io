let db = new Dexie('myteams');
db.version(1).stores({
    teams: 'id'
});

export function buildFavButton(id,fav) {
    let html = ``;

    if(fav.find(x => x.id == id)){
        html += `<button data-id="${id}" class="btn-floating halfway-fab btn-fav white waves-effect"><i class="fa fa-heart fa-red"></i></button>`;
    } else {
        html += `<button data-id="${id}" class="btn-floating halfway-fab btn-fav white waves-effect"><i class="fa fa-heart fa-grey"></i></button>`;
    }

    return html;
}

export async function addFavoriteTeam(teamsData, id) {
    // console.log(teamsData);
    let data = teamsData.find(x => x.id == id);
    // add data to indexedDB
    await db.transaction('rw', db.teams , async () => {
        // Any database error event that occur will abort transaction and
        // be sent to the catch() method below.
        // The exact same rule if any exception is thrown what so ever.
    
        await db.teams.put(data);
    
    }).catch(function (error) {
        // Log or display the error
    
        console.error (error.stack || error);
    
    });
}

export async function removeFavoriteTeam(id){
    // console.log(id);
    await db.transaction('rw', db.teams , async () => {
        // Any database error event that occur will abort transaction and
        // be sent to the catch() method below.
        // The exact same rule if any exception is thrown what so ever.
    
        await db.teams.where('id').equals(parseInt(id)).delete().then(function (deleteCount) {
            console.log( "Deleted " + deleteCount + " objects");
        });
    
    }).catch(function (error) {
        // Log or display the error
    
        console.error (error.stack || error);
    
    });
}

export function getFavoriteTeams() {
    return db.transaction('r', db.teams, async () => {
        const teams = await db.teams.toArray();
        return Promise.resolve(teams);
    }).catch(err => {
        returnPromise.reject(err);
    });
}
