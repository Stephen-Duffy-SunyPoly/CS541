let listCols = false
let listPage = false

function populateQueryNextLetter(query, postFunction){
    let textBox = document.querySelector('.queryBox');
    let span;
    //get the last element
    span = textBox.lastChild;
    if(!span){
        span = document.createElement("span");
        textBox.appendChild(span);
    }
    //check for specific chars
    let queryLetter = query[0];
    //if found, create a new span and then interpret the old span
    if(queryLetter === ' ' || queryLetter === ',' || queryLetter === ';'){
        let oldSpan = span;
        span = document.createElement("span");
        //give this char its own span
        span.textContent = queryLetter;
        textBox.appendChild(span);
        span = document.createElement("span");
        textBox.appendChild(span);
        //old span things
        if(oldSpan.textContent === "SELECT"){
            oldSpan.style.color = "orange";
            listCols = true
        } else if (oldSpan.textContent === "FROM"){
            listCols = false
            oldSpan.style.color = "orange"
        } else if (oldSpan.textContent === "WHERE"){
            listPage = true
            oldSpan.style.color = "orange"
        } else if(oldSpan.textContent === "="){
            listPage = false
        } else if (listCols || listPage){
            oldSpan.style.color = "mediumorchid"
        } else if(oldSpan.textContent.startsWith("'") && oldSpan.textContent.endsWith("'")){
            oldSpan.style.color = "#68a871"
        }
    } else {
        span.textContent = span.textContent + query[0];
    }
    query = query.substring(1);
    if(query.length !== 0){
        setTimeout(populateQueryNextLetter, 50,query, postFunction);
    } else {
        setTimeout(postFunction, 150)
    }
}