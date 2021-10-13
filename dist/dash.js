const reviewDiv = document.querySelector(".review_modal");
const userId = JSON.parse(localStorage.getItem("loginId"));
const serviceId = JSON.parse(localStorage.getItem("serviceId"));
const container = document.querySelector(".rating");
const items = container.querySelectorAll(".rating_item");
const current_serv_display = document.querySelector(".c_acc_info");
const avail_serv_display = document.querySelector(".a_acc_info");
reviewDiv.style.display = "none";
function closeModal() {
    reviewDiv.style.display = "none";
}
// rating of the provided services
container.addEventListener("click", rateStar);
let val = 0;
function rateStar(e) {
    const singleService = JSON.parse(localStorage.getItem("singleService"));
    const eclass = e.target.classList;
    if (!eclass.contains("active")) {
        items.forEach((item) => item.classList.remove("active"));
        val = e.target.getAttribute("data-rate");
        singleService.rating = val;
        console.log(singleService);
        localStorage.setItem("singleService", JSON.stringify(singleService));
        eclass.add("active");
    }
}
// fetching all the services provided by bank
async function fetchAllService() {
    const response = await fetch(`http://localhost:4000/users/${userId}`);
    const data = await response.json();
    let { current_service, available_services } = data;
    current_service.map((item) => {
        let div = document.createElement("div");
        div.setAttribute("class", "c_serv_div");
        let img = document.createElement("img");
        img.src = `.${item.icon}`;
        img.addEventListener("click", () => {
            rateTheService(item);
        });
        let span = document.createElement("span");
        span.textContent = item.name;
        div.append(img, span);
        current_serv_display.append(div);
    });
    available_services.map((item) => {
        let div = document.createElement("div");
        div.setAttribute("class", "c_serv_div");
        let img = document.createElement("img");
        img.src = `.${item.icon}`;
        let span = document.createElement("span");
        span.textContent = item.name;
        div.append(img, span);
        avail_serv_display.append(div);
    });
}
fetchAllService();
function rateTheService(item) {
    console.log("items", item);
    localStorage.setItem("singleService", JSON.stringify(item));
    reviewDiv.style.display = "block";
}
async function postRating() {
    const service = JSON.parse(localStorage.getItem("singleService"));
    const response = await fetch(`http://localhost:4000/users/${userId}`);
    const userData = await response.json();
    userData.current_service.forEach((item) => {
        if (item.name === service.name) {
            item.rating = service.rating;
        }
    });
    const res = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const updatedData = await res.json();
}
