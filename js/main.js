const $search = document.querySelector('.search');
const $results = document.querySelector('.results');
const $clipUl = document.querySelector('.songs');
const $artistName = document.querySelector('.artist');



const movieClipList = (songs) => {  
  while ($clipUl.hasChildNodes()) {
    $clipUl.removeChild($clipUl.firstChild);
  }
  const showMovieClip = (song) => {
    const $songList = document.createElement('li');
    let iFrame = `<iframe width="537" height="302" src="https://www.youtube.com/embed/${song.youtube_id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    $songList.innerHTML = song.title + "</br>" + iFrame;
    $clipUl.appendChild($songList);
  }

  songs.map(song => showMovieClip(song))
}

  const getId = (artist) => {
    while ($results.hasChildNodes()) {
      $results.removeChild($results.firstChild);
    }
    $search.value = "";
    const $chosenArtist = artist.currentTarget;
    $artistName.innerHTML = $chosenArtist.textContent;
    const urlSong = `https://musicdemons.com/api/v1/artist/${$chosenArtist.id}/songs`;


  fetch(urlSong, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((jsonData) => movieClipList(jsonData))
    .catch(error => console.log(error));
  }


const createResultList = (results) => {
  const createArtistList = (artist) => {
    const $artistList = document.createElement('li');
    $artistList.innerHTML = artist.name;
    $artistList.setAttribute('id', artist.id);
    //console.log($artistList)
    $results.appendChild($artistList);
    $artistList.addEventListener('click', getId)
  }
  results.map(artist => createArtistList(artist))
}

const search = (value) => {
  while ($results.hasChildNodes()) {
    $results.removeChild($results.firstChild);
  }
  const url = 'https://musicdemons.com/api/v1/artist/autocomplete';
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `name=${value}`
    })
    .then((response) => response.json())
    .then((jsonData) => createResultList(jsonData))
    .catch(error => console.log(error));
};

const handleKeyUpSearch = e => {
  const $input = e.currentTarget;
  search($input.value);
};

const init = () => {
  $search.addEventListener('keyup', handleKeyUpSearch);
};

init();







//httpRequest.open('POST', 'https://musicdemons.com/api/v1/artist/autocomplete', true);
//httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
//httpRequest.send(`name=${global}`);



let httpRequest = new XMLHttpRequest;