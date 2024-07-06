function CelenderNow(today, data) {
    let Data = {}
    for (let index = 0; index < data.length; index++) {
        if (formatDate(new Date(data[index]['Days'])) == formatDate(today)) {
            Data = data[index];
            break;
        }
    }
    let room = []
    Object.keys(Data).forEach((y) => {
        if (y != undefined && y != 'undefined' && y != '' && y != null && y != 'Days') {
            room = room.concat(y)
        }
    })
    room.forEach((o) => {
        if (Data[o] != '') {
            if (Data[o].includes("=")) {
                let DataRoom = Data[o].split('=')
                for (i = 0; i < DataRoom.length; i++) {
                    Getnotebook(formatDate(today), DataRoom[i], o)
                }
            } else {
                Getnotebook(formatDate(today), Data[o], o)
            }
        }
    })
    setTimeout(() => {
        vams('.checkin').forEach((t) => {
            t.onclick = () => {
                Getstudent(t, today)
            }
        })
    }, 2000);

}

let dataStudent = []
function Getstudent(t, today) {
    if (dataStudent.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '10HZ2XKw97d21uyI_gdmBgN7dI_DbRQAa0EUlPSfZIkc'
            }).then((data) => {
                dataStudent = strim(data)
                Checkin(dataStudent, t, today)
            })
    } else {
        Checkin(dataStudent, t, today)
        SetAttribute('.load', 'style', 'display:none')
    }
}

function Getnotebook(date, data, o) {
    data = data.split('|')
    fetchSheet
        .fetch({
            gSheetId: data[2],
            wSheetName: data[1]
        }).then((dataCourse) => {
            console.log(dataCourse);
            dataCourse.forEach((t) => {
                if (formatDate(t['Days']) == date) {
                    let keysStartingWithAI = Object.keys(t).filter(key => key.startsWith('AI'));
                    let k = ''
                    keysStartingWithAI.forEach((y) => {
                        if (t[y] == '') {
                            k = k + '-2'
                        } else {
                            k = k + '-' + t[y]
                        }
                    })
                    vam('#LearnToday_list').innerHTML += listLearnToda(t, data[0], data[1], o, keysStartingWithAI, k.slice(1))
                }
            })
        })
}
/*

function Getnotebooks(date, data, o) {
    let datas = data[0].split('|')
    fetchSheet
        .fetch({
            gSheetId: datas[2],
            wSheetName: datas[1]
        }).then((dataCourse) => {
            dataCourse.forEach((t) => {
                if (formatDate(t['Days']) == date) {
                    vam('#LearnToday_list').innerHTML += listLearnToda(t, datas[0], datas[1], o)
                }
            })
            if (vam(`.${o}`)) {
                for (i = 1; i < data.length; i++) {
                    SumRoom(data[i], o)
                }
            }
        })
}*/

function formatDate(date) {
    date = new Date(date)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function listLearnToda(Data, Class, Course, o, p, i) {
    let items = `
    <div class="${o}">
        <p>${Data.Days}</p>
        <p class="class">${Class}</p>
        <p>${Data.Period}</p>
        <p>${Data.Room}</p>
        <p>${Data.Time}</p>
        <p>${Course}</p>
        <p class="checkin" data-Class="${Class}" data-Teacher="${Data.Teacher}" data-Topic="${Data.Topic}" data-Period="${Data.Period}" data-Student="${p}" data-Checkin="${i}" data-Course="${Course}"><i class="bi bi-calendar-check-fill"></i></p>
    </div>`
    return items
}

function SumRoom(Data, o) {
    Data = Data.split('|')
    let DataClass = vam(`.${o} .class`).innerText
    vam(`.${o} .class`).innerHTML = DataClass + '-' + Data[0]
}