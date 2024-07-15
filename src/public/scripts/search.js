//get the filters
const filters = document.getElementById("search-filters").children
const resultDisplays = document.getElementsByClassName("results-display")
//get the query from the url. default to blank if no query is provided
const query = getUrlParameter("q") || ""
//display the search query
document.getElementById("search-query").innerText = query
//switch categories
function switchCategory(element){
    //unselect all filters
    Array.from(filters).forEach(x => x.classList.remove("active"))
    //show the filter is selected 
    element.classList.add("active")
    //show the search results, but first, hide them
    Array.from(resultDisplays).forEach(x => x.style.display = "none")
    //show the associated search result
    const category = element.id.split("-")[0]
    document.getElementById(`${category}-results`).style.display = "block"
}

//get search ressults from users and courses
//TODO: also get results from comments once if route is done
async function getResults(){
    //get the user results and add them to the DOM
    const userResults = await (await get(`/users/search?q=${query}`)).json()
    console.log(userResults)
    //display the user search results into the html
    let userResultsHTML = ''
    userResults.forEach(x => {
        userResultsHTML +=`
            <div class="user-result" style="margin-top: 1vw;" onclick = "window.location.href='./profile.html?user=${x.id}'">
                <div class="d-flex align-content-center">
                    <img src="data:image/png;base64,${x.img}">
                    <div class="poppins-medium" style="margin-left: 1vw; font-size: 1.1vw; display: flex; align-items: center;">${x.first_name} ${x.last_name}</div>
                </div>
                <div class="poppins-regular" style="margin-top: 1.3vw; font-size: 1vw;">${title(x.role)}</div>
                <div class="poppins-regular" style="font-size: 1vw; color: #272727;">${x.job_title}</div>
                <div class="poppins-regular" style="font-size: 1vw; color: #272727;">${x.country}</div>
            </div>
        `
    })
    document.getElementById('user-results').innerHTML = userResultsHTML

    //get the course results and add them to the DOM
    const courseResults = await (await get(`/courses/search?q=${query}`)).json()
    console.log(courseResults)
    let courseResultsHTML = ''
    courseResults.forEach(x => {
        courseResultsHTML +=`
            <div class="course-result">
                <div class="d-flex align-content-center">
                    <img class = "course-img" src="data:image/png;base64,${x.img}">
                    <div style="margin-left: 1.5vw;">
                        <div class="poppins-medium" style="font-size: 1vw">Angular JS</div>
                        <div class="poppins-regular" style="font-size: 0.95vw;">Learn the fastest way to build a modern dashboard for any platforms, browser, or device. </div>
                        <div class="d-flex course-ratings" style="margin-top: 0.5vw; gap: 0.4vw;">
                            <img src="./assets/lectures/fill-star-icon.png">
                            <img src="./assets/lectures/fill-star-icon.png">
                            <img src="./assets/lectures/fill-star-icon.png">
                            <img src="./assets/lectures/empty-star-icon.png">
                            <img src="./assets/lectures/empty-star-icon.png">
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    document.getElementById('course-results').innerHTML = courseResultsHTML
}

getResults()