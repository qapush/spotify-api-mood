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

    function random(){

        const random = ( Math.floor( Math.random() * Math.floor(examples.length) ) );
        input.value = examples[random];

    }
    
    random();



    
    form.addEventListener('submit', e => {

        e.preventDefault();

        const requestToken = new XMLHttpRequest();
        requestToken.open('POST', 'https://accounts.spotify.com/api/token?grant_type=client_credentials');
        requestToken.setRequestHeader('Authorization', `Basic YzZjOTg0MDI1YjVmNGMyMjlmY2I0ODhkMDM1OTkxNDQ6MjhhODNlM2U4MTE5NDJjYTljMTZmYWI5YjhmN2UzNDA=`);
        requestToken.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        requestToken.send();
        requestToken.addEventListener('load', () => {

            if(requestToken.status === 200){

                const requestMain = new XMLHttpRequest();
                const token = JSON.parse(requestToken.response).access_token;
                const query = input.value;
                requestMain.open('GET', `https://api.spotify.com/v1/search?q=${query}&type=playlist`);
                requestMain.setRequestHeader('Authorization', `Bearer ${token}`);
                requestMain.send();
                requestMain.addEventListener('load', () => {
                   if(requestMain.status === 200){
                    const results = JSON.parse(requestMain.response).playlists.items;

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


                   }
                });
                
                
            }
        });
        
    })
    


});