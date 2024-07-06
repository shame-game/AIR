function Celender(data) {
    console.log(data);
    vam('#main').innerHTML =
        `<div id="Student_main" class="Wrap_Main">
            <div id="inforStudent_background" >
                <h1 class="nav-title">lịch học</h1>
            </div>  
        </div>
        <div id="Celender_main">
            <div>
                <p>12/05/2024 - 12/05/2024</p>
                <div></div>
            </div>
        </div>`
    Google_Celender()
}

let Course_IP = []
function Google_Celender() {
    if (Course_IP.length == 0) {
        fetchSheet
            .fetch({
                gSheetId: '10gFyuirBHeIg-x17xqvOmNrJMmdnV5B2wZmjQt7qXx0'
            }).then((data) => {
                Course_IP = strim(data)
                HidenCelender(Course_IP)
            })
    } else {
        HidenCelender(Course_IP)
    }
}

function HidenCelender(data) {
    console.log(data[0]);
    data.forEach((t) => {
        console.log();
    })
}