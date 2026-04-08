
let songs = [
  { id: 1, title: "Song A", artist: "Artist 1", album: "Album X", genre: "Pop", duration: "3:20", favorite: false, playCount: 5 },
  { id: 2, title: "Song B", artist: "Artist 2", album: "Album Y", genre: "Rock", duration: "4:10", favorite: false, playCount: 10 },
  { id: 3, title: "Song C", artist: "Artist 1", album: "Album Z", genre: "Hip-Hop", duration: "2:50", favorite: false, playCount: 3 }
];


let playlist = {
  name: "My Playlist",
  createdDate: new Date(),
  songs: songs,
  songCount: songs.length
};


let recentPlayed = [];


function renderSongs(list) {
  const container = document.getElementById("playlist");
  container.innerHTML = "";

  list.forEach(song => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="https://via.placeholder.com/150">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <p>${song.album}</p>
      <p>${song.duration}</p>
    `;

    card.onclick = () => playSong(song);
    container.appendChild(card);
  });
}

function playSong(song) {
  song.playCount++;

  document.getElementById("nowPlaying").innerText =
    `${song.title} - ${song.artist}`;

  updateRecent(song);
}


function updateRecent(song) {
  recentPlayed.unshift(song);
  recentPlayed = recentPlayed.slice(0, 5);

  const list = document.getElementById("recentList");
  list.innerHTML = "";

  recentPlayed.forEach(s => {
    const li = document.createElement("li");
    li.innerText = s.title;
    list.appendChild(li);
  });
}


function filterByGenre() {
  const genre = document.getElementById("genreFilter").value;

  if (genre === "all") {
    renderSongs(songs);
  } else {
    renderSongs(songs.filter(s => s.genre === genre));
  }
}


function filterByArtist() {
  const artist = document.getElementById("artistFilter").value;

  if (artist === "all") {
    renderSongs(songs);
  } else {
    renderSongs(songs.filter(s => s.artist === artist));
  }
}


document.getElementById("searchBar").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  renderSongs(
    songs.filter(s => s.title.toLowerCase().includes(value))
  );
});


function loadArtists() {
  const artistSet = new Set(songs.map(s => s.artist));
  const dropdown = document.getElementById("artistFilter");

  artistSet.forEach(artist => {
    const option = document.createElement("option");
    option.value = artist;
    option.textContent = artist;
    dropdown.appendChild(option);
  });
}


function sortBy(key) {
  songs.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });

  renderSongs(songs);
}


document.getElementById("genreFilter").addEventListener("change", filterByGenre);
document.getElementById("artistFilter").addEventListener("change", filterByArtist);


loadArtists();
renderSongs(songs);
