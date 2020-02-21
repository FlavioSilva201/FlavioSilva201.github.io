const root = document.getElementById('songs');
const ul = document.getElementById("songs");


const songs = [
    { title: 'Fireflies', artist: 'Owl City', track: 0 },
    { title: 'Lithium', artist: 'Nirvana', track: 3 },
    { title: 'Old Town Road', artist: 'Lil Nas X', track: 0 },
    { title: 'Smells Like Teen Spirit', artist: 'Nirvana', track: 1 },
];

const elements = songs.map(song => {
    const li = document.createElement("li");
    li.textContent = song.title + " from " + song.artist;
    return li;
});

root.append(...elements);