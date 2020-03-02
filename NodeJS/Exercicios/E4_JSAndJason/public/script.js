const output = document.getElementById('output');

function refreshSongs() {
    output.innerHTML = '';
    fetch('/song')
        .then(response => {
            if (response.ok) {
                response.json().then(songs => {
                    songs.forEach(showSong);
                });
            } else {
                output.textContent = 'Error!!!!!';
            }
        })
        .catch(error => {
            console.error('An error has ocurred')
        });
}

refreshSongs();

function showSong(song) {
    const li = document.createElement('li');
    Object.entries(song).forEach(([, value]) => {
        const div = document.createElement('div');
        div.textContent = value;
        li.append(div);
    })

    output.appendChild(li);
}

const title = document.getElementById('title');
const artist = document.getElementById('artist');
const trackNr = document.getElementById('track-nr');
const album = document.getElementById('album');

const form = document.getElementById('song-form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const song = {
        title: title.value,
        artist: artist.value,
        trackNr: Number(trackNr.value),
        album: album.value,
    };

    console.log(JSON.stringify(song))
    form.reset();

    fetch(
        '/song',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(song),
        }
    ).then(refreshSongs);

});
