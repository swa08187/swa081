document.addEventListener('DOMContentLoaded', () => {
  Tabletop.init({
    key: GOOGLE_SHEET_KEY,
    simpleSheet: true,
    callback: renderSongs
  });

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    filterSongs(query);
  });
});

let allSongs = [];

function renderSongs(data) {
  allSongs = data;
  updateSongList(data);
}

function updateSongList(songs) {
  const songList = document.getElementById('song-list');
  songList.innerHTML = '';

  songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.onclick = () => window.open(song.link, '_blank');

    card.innerHTML = `
      <img src="${song.album_cover}" alt="앨범커버" class="album-cover" />
      <div class="song-info">
        <strong>${song.title}</strong><br />
        <em>${song.artist}</em><br />
        <small>${song.genre} | ${song.date}</small>
      </div>
    `;

    songList.appendChild(card);
  });
}

function filterSongs(query) {
  const filtered = allSongs.filter(song =>
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query) ||
    song.genre.toLowerCase().includes(query)
  );
  updateSongList(filtered);
}
