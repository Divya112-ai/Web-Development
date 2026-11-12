function createCard(title, cName , views, monthsold, duration, thumbnail){
    let html=`<div class="container"><div class="card">
        <div class="img">
            
            <img src="${thumbnail}" width="200px" height="130px">
            <div class="cap">${duration}</div>
            </div>
        <div class="text">
            <h3>${title}</h3>
            <p>${cName} .  ${views}  .  ${monthsold}</p>
        </div>
    </div></div>
    `
    document.querySelector(".container").innerHTML=html
}