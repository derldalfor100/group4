let page;
function onSubmit(e){
    if(e !== undefined){
        let results = document.getElementById('results');
        results.innerHTML = '';
        page = 1;
    }
    let err = document.getElementById('err');
    let search = document.getElementById('searchInput');
    let searchValue = search.value;
    let urlPart1 = 'http://www.omdbapi.com/?apikey=74fed2a7&s=';
    if(searchValue.length < 3){
        err.style ='display: block';
    }else {
        let theData = null;
        err.style ='display: none';
        urlPart1 += searchValue;
        getTheInfo(urlPart1,page);
    }
}

function getTheInfo(_url1, _page) {
    fetch(_url1 + '&type=movie&page=' + _page).then(res => res.json()).then(obj => obj.Search)
    .then(data => {
        let results = document.getElementById('results');
        let imdbPart1 = 'https://www.imdb.com/title/';
        data.forEach(item => {
            console.log(item);
            let newUl = document.createElement('ul');
            newUl.innerHTML = `<li>Title: ${item['Title']}</li><li>Year: ${item['Year']}</li><li><a target="_blank" href="${imdbPart1}${item['imdbID']}">imdb Link</a></li><li>Type: ${item['Type']}</li><li><img src="${item['Poster']}"></li>`;
            results.appendChild(newUl);

        });
        checkNextPage(_url1, _page + 1);
    }).catch(err => console.log('Error:',err))
}

function onLoadMore() {
    page++;
    onSubmit();
}

function checkNextPage(_url1, _page) {
    let addBtn = document.getElementById('loadmore');
    fetch(_url1 + '&type=movie&page=' + _page).then(res => res.json())
    .then(obj => {
        if(obj['Search'] !== undefined){
            addBtn.style = 'display: block';
            addBtn.disabled = false;
        }else {
            addBtn.disabled = true;
            addBtn.style = 'display: none';
        }
        
    }).catch(err => {err})
}