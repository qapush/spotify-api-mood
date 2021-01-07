window.addEventListener('DOMContentLoaded', () => {
   
    const form = document.querySelector('form'),
          input = form.querySelector('input'),
          result = document.querySelector('.result'),
          examples = [
              'hit the road',
              'happy',
              'chill',
              'sad',
              'work',
              'happy',
              'cheerful',
              'calm',
              'angry',
              'excited',
              'broken heart',
              'in love',
              'sex',
              'jogging',
              'workout',
              'game',
              'dance',
              'party',
              'hangover',
              '420',
              'coding',
              'country',
              'sounds of nature',
              'meditation',
              'disco polo',
              'learning',
              'rock',
              'romantic',
              'soul',
              'jazz',
              'flamenco',
              'hip hop',
              'rap'
          ];

    let c;

    function random(){

        const random = ( Math.floor( Math.random() * Math.floor(examples.length) ) );
        input.value = examples[random];

    }

    

    form.addEventListener('submit', e => {

        e.preventDefault();
        
        const c = btoa('c6c984025b5f4c229fcb488d03599144:6760ade5df70467b9a60f73b3f105910');

        fetch('https://accounts.spotify.com/api/token',{
            method: 'POST',
            headers: {
                Authorization: `Basic ${c}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: "grant_type=client_credentials"

        })
        .then( response => {
            return response.json();
        })
        .then(response => {
            const token = response.access_token;
            const query = input.value;

            return fetch(`https://api.spotify.com/v1/search?q=${query}&type=playlist`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
        })
        .then( response => {
            return response.json()
        })
        .then(response => {
            const results = response.playlists.items;
            result.innerHTML = '';
            form.reset();
            results.forEach((item) => {
                result.innerHTML += `
                <div class="result__row">
                    <div class="result__item">
                        <div class="result__cover">
                            <img src="${item['images'][0]['url']}" alt="">
                        </div>
                        <div class="result__description">
                            <h2>${item['name']}</h2>
                            <hr>
                            <div class="item__links">
                                <a href="${item['external_urls']['spotify']}" class="link__web" target="_blank">Listen in browser</a> / 
                                <a href="${item['uri']}" class="link__app" target="_blank">Listen in Spotify</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
        });       
    })
    
    random();

});