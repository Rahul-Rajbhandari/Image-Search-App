const accessKey = "fB4JdhZRkm89WSH_Jlh7ZGKOuF3E7epQJc7Tcrwyy-0";

const formElem = document.querySelector("form");
const inputElem = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputElem.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response=await fetch(url);
    // console.log(response)
    const data = await response.json();
    // console.log(data)
    
    const results = data.results;
    // console.log(results)
    
    if (page==1){
        searchResults.innerHTML = "";
    }

    results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    })

    page++;
    if (page>1){
        showMore.style.display = "block";
    }
}

formElem.addEventListener("submit", (event)=>{
    event.preventDefault()
    page= 1;
    searchImages();
})

showMore.addEventListener("click", ()=>{
    event.preventDefault()
    searchImages();
})