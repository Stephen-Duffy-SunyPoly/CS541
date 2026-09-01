function genStars(amount){
    let pageHeight = document.body.scrollHeight
    let starDiv = document.createElement("div");
    for(let i = 0; i < amount; i++){
        let star = document.createElement("div");
        star.style.width = "1px";
        star.style.height = "1px";
        star.style.position = "absolute";
        star.style.backgroundColor = "white";
        star.style.top = Math.floor(Math.random()*100000000%pageHeight) + "px";
        star.style.left = Math.floor(Math.random()*100000000%document.body.scrollWidth) + "px";
        star.style.zIndex = -1+"";
        star.classList.add("popBox")
        starDiv.appendChild(star);
    }
    document.body.appendChild(starDiv);
}