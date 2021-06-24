const table = document.getElementById('table')

let lsLength = localStorage.length
for(let i = 1; i <= 10; i++) {
    tr = document.createElement('tr')
    thRank = document.createElement('th')
    thName = document.createElement('th')
    thScore = document.createElement('th')
    table.appendChild(tr)
    tr.appendChild(thRank)
    tr.appendChild(thName)
    tr.appendChild(thScore)
    if(lsLength > 0) {
        switch(i) {
             case 1: thRank.innerHTML = i + 'st'
                     thName.innerHTML = sortLS(i-1).name
                     thScore.innerHTML = sortLS(i-1).score
                     break;
             case 2: thRank.innerHTML = i + 'nd'
                     thName.innerHTML = sortLS(i-1).name
                     thScore.innerHTML = sortLS(i-1).score
                     break;
             case 3: thRank.innerHTML = i + 'rd'
                     thName.innerHTML = sortLS(i-1).name
                     thScore.innerHTML = sortLS(i-1).score
                     break;
            default: thRank.innerHTML = i + 'th'
                     thName.innerHTML = sortLS(i-1).name
                     thScore.innerHTML = sortLS(i-1).score
        }
        lsLength--
    } else {
        switch(i) {
            case 1: thRank.innerHTML = i + 'st'
                    thName.innerHTML = '-'
                    thScore.innerHTML = '-'
                    break;
            case 2: thRank.innerHTML = i + 'nd'
                    thName.innerHTML = '-'
                    thScore.innerHTML = '-'
                    break;
            case 3: thRank.innerHTML = i + 'rd'
                    thName.innerHTML = '-'
                    thScore.innerHTML = '-'
                    break;
           default: thRank.innerHTML = i + 'th'
                    thName.innerHTML = '-'
                    thScore.innerHTML = '-'
       }
    }
}

function sortLS(nth){
    let localStorageArray = []
        for (let i = 0; i < localStorage.length; i++) {
            localStorageArray[i] = {
                name: localStorage.key(i).split('.')[0],
                score: parseInt(localStorage.getItem(localStorage.key(i)))
            }
        }
    localStorageArray.sort((a,b) => (a.score < b.score) ? 1 : -1)
    let sortedLS = localStorageArray
    return sortedLS[nth]
}
