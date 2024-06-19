let students = []
const vam = document.querySelector.bind(document);
const vams = document.querySelectorAll.bind(document);
function Load() {
    if (students.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '1iDnQI8PXHOyqcxbSsNxLDNHYSOvsmHzI3WbPGKH9V2Q',
                wSheetName: 'All Student',
            }).then((dataClass) => {
                students = strim(dataClass)
                students.shift()
                Hide(students)
            })
    } else {
        Hide(students)
    }
}
Load()

function Hide(data) {
    vam('#ListClass').innerHTML = loadclass(data)
    vam('#ListStudent').innerHTML = loadStudent(data)
    vams('.changeClass').forEach((t) => {
        console.log(t);
        t.onclick = () => {
            console.log(t);
        }
    })
}

function loadStudent(data) {
    let items = ''
    data.forEach((t) => {
        items += `
        <div class="Student_Wrap">
            <div class="iden">
                <p>${t['ID']}</p>
                <p>${t['Name']}</p>
            </div>            
            <div class="more">
                <i class="bi bi-three-dots-vertical"></i>
            </div>
        </div>
        `
    })
    return items
}

function loadclass(data) {
    let items = ''
    let id = []
    data.forEach((u) => {
        if (id[u[`Class`]]) {
            id[u[`Class`]]++
        }
        else {
            id[u[`Class`]] = 1
        }
    })
    Object.keys(id).forEach((t) => {
        items += `<p class="changeClass" value="${t}">${t}</p>`
    })
    return items
}
// Xóa khoảng trắng keys
function strim(data) {
    data = data.map(obj => {
        let trimmedObj = {};
        for (let key in obj) {
            trimmedObj[key.trim()] = obj[key];
        }
        return trimmedObj;
    });
    return data
}