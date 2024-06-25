function NowCelender(data) {
    data.forEach((t) => {
        if (vam(`.${t.Room}`)) {
            let classN = vam(`.${t.Room}>.class`).innerText
            let classNs = t.ClassName
            let p = []
            for (i = 0; i < Object.keys(t).filter(key => key.slice(0, 2) == "AI").length; i++) {
                if (t[`${Object.keys(t).filter(key => key.slice(0, 2) == "AI")[i]}`] == '') {
                    p = p + '2-'
                } else {
                    p = p + t[`${Object.keys(t).filter(key => key.slice(0, 2) == "AI")[i]}`] + '-';
                }
            }
            vam(`.${t.Room} .checkin`).setAttribute('data-Student', `${vam(`.${t.Room} .checkin`).getAttribute('data-Student')},${Object.keys(t).filter(key => key.slice(0, 2) == "AI")}`)
            vam(`.${t.Room} .class`).innerText = classN + '-' + classNs
            vam(`.${t.Room} .checkin`).setAttribute('data-checkin', `${vam(`.${t.Room} .checkin`).getAttribute('data-checkin')}-${p.slice(0, -1)}`)
        } else {
            let p = []
            for (i = 0; i < Object.keys(t).filter(key => key.slice(0, 2) == "AI").length; i++) {
                if (t[`${Object.keys(t).filter(key => key.slice(0, 2) == "AI")[i]}`] == '') {
                    p = p + '2-'
                } else {
                    p = p + t[`${Object.keys(t).filter(key => key.slice(0, 2) == "AI")[i]}`] + '-';
                }
            }
            vam('#LearnToday_list').innerHTML += listLearnToda(t, Object.keys(t).filter(key => key.slice(0, 2) == "AI"), p.slice(0, -1))

        }
    })
    vams('.checkin').forEach((y) => {
        y.onclick = () => {
            let g = y.getAttribute('data-Student')
            g = g.split(',')
            fetchSheet
                .fetch({
                    gSheetId: '10HZ2XKw97d21uyI_gdmBgN7dI_DbRQAa0EUlPSfZIkc',
                    wSheetName: 'All Student'
                }).then((r) => {
                    let stu = []
                    r.forEach((t) => {
                        for (i = 0; i < g.length; i++) {
                            if (g[i] == t.ID) {
                                stu = stu.concat(t)
                            }
                        }
                    })
                    checkinnow(stu, y)
                })
        }
    })
}
function listStudentCheckin(id, name, classN, o) {
    console.log(o);
    let h = ''
    if (o == '0') {
        h = `<p class="Chechin_checked"  data-id="${id}"><input data-class="${classN}" class="Checkin_input" value="true" name="${id}" type="radio" style="accent-color: #ff142c;" checked></p>`
    } else if (o == '1') {
        h = `<p class="Chechin_checked"  data-id="${id}"><input data-class="${classN}" class="Checkin_input" value="false" name="${id}" type="radio" style="accent-color: #ff142c;"></p>`
    } else if (o == '2') {
        h = `<p class="Chechin_checked"  data-id="${id}"><input data-class="${classN}" class="Checkin_input" value="false" name="${id}" type="radio" style="accent-color: #ff142c;"></p>`
    }
    let items =
        `<div class="checkin_Student conte"  data-id="${id}">
            <div>
                <p>${id}</p>
                <p>${name}</p>
            </div>
            <div>
                ${h}
                <p class="checkin_note" index=""><i class="bi bi-journal-plus"></i></p>
            </div>
        </div>`
    return items
}
function checkinnow(student, y) {
    let course = y.getAttribute('data-course')
    let time = y.getAttribute('data-time')
    SetAttribute('#calender-learn', 'style', 'display:none');
    SetAttribute('#checkin_wrap', 'style', 'display:flex')
    vam('#calender-nav').innerHTML += nav_back
    vam('#calender .nav-title').innerText = 'Điểm danh lớp'

    vam('#checkin_wrap').innerHTML =
        `<div id="informationCheckin">
                <div id="informationCheckin_title">
                    <h1>CẬP NHẬP THÔNG TIN TIẾT HỌC</h1>
                    <div>
                        <a id="Img_Drive">Hình ảnh</a>
                        <a id="saveCheckin">Lưu cập nhập</a>
                    </div>
                </div>
                <div id="informationCheckin_input">
                    <input class="infCheckin" name="ST" type="number" placeholder="Số tiết học" value="${y.getAttribute('data-period')}">
                    <input class="infCheckin" name="CD" type="text" placeholder="Tên chủ đề hoặc nội dung học" value="${y.getAttribute('data-topic')}">
                    <input class="infCheckin" name="GV" type="text" placeholder="Giáo viên đứng lớp chính" value="${y.getAttribute('data-teacher')}">
                </div>
            </div>
            <div id="checkin_StudentList">
                <div id="checkin_title"><h1>DANH SÁCH HỌC SINH</h1></div>
                <div id="checkin_StudentWrap">
                    <div class= "checkin_Student title">
                        <div>
                            <p>ID</p>
                            <p>Họ và Tên</p>
                        </div>
                        <div>
                            <p>Vắng mặt</p>
                            <p>Nhận xét</p>
                        </div>           
                    </div>
                </div>
            </div>`
    let p = y.getAttribute('data-checkin').split('-')
    for (i = 0; i < student.length; i++) {
        vam('#checkin_StudentList').innerHTML += listStudentCheckin(student[i].ID, student[i].Name, student[i].Class, p[i])
    }
    vams('.Checkin_input').forEach((y) => {
        y.onclick = () => {
            y.value = y.value === 'true' ? 'false' : 'true';
            y.checked = y.value === 'true';
            if (y.checked) {
                y.style.backgroundColor = 'green';
                y.style.color = 'white';
            } else {
                y.style.backgroundColor = '';
                y.style.color = '';
            }
        }

    })

    // Xác nhận
    vam('#saveCheckin').onclick = () => {
        SetAttribute('.load', 'style', 'display:block')
        let g = true
        vams('.infCheckin').forEach((t) => {
            if (t.value == '') {
                g = false
            }
        })
        if (g == true) {
            let ST = vam('.infCheckin[name="ST"]').value
            let CD = vam('.infCheckin[name="CD"]').value
            let GV = vam('.infCheckin[name="GV"]').value
            let result = ''
            vams('.Checkin_input').forEach((t) => {
                if (t.value == "true") {
                    result += 0 + '-' + t.getAttribute('name') + '-' + t.getAttribute('data-class') + '|'
                } else if (t.value == "false") {
                    result += 1 + '-' + t.getAttribute('name') + '-' + t.getAttribute('data-class') + '|'
                }
            })
            var url = 'https://script.google.com/macros/s/AKfycbxCFDpMgiOCLkU-S6Km_RYKVoebCe3km99Sfy6QuT260nnOid7Uyjbtqr2RS42TEfGvwA/exec' + "?"
                + `Time=${time}&Course=${course}&Checkin=${result.slice(0, -1)}`;
            fetch(url, {
                method: 'GET'
            }).then(response => response.json())
                .then((data) => {
                    alert('Điểm danh thành công')
                    calendarNow = []
                    Celender()
                })
                .catch(error => alert('Lỗi: ' + error));
            SetAttribute('.load', 'style', 'display:none')
        } else {
            SetAttribute('.load', 'style', 'display:none')
            alert('Vui lòng điền đầy đủ thông tin tiết học')
        }

    }

    // Quay lại 
    vam('#calender .nav-back').onclick = () => {
        SetAttribute('#checkin_wrap', 'style', 'display:none')
        vam('#calender .nav-back').remove()
        vam('#calender .nav-title').innerText = 'Lịch dạy'
        SetAttribute('#calender-learn', 'style', 'display:flex')
    }
}

function listLearnToda(t, g, h) {
    let items = `
    <div class="${t.Room}" data-Topic="${t.Topic}" data-Teacher="${t.Teacher}">
        <p>${formatDate(t.Days.split(',')[0])}</p>
        <p class="class">${t.ClassName}</p>
        <p>${t.Period}</p>
        <p>${t.Room}</p>
        <p>${t.Time}</p>
        <p>${t.Course}</p>
        <p class="checkin" data-Time="${formatDate(t.Days.split(',')[0])}" data-Student="${g}" data-checkin="${h}" data-Period="${t.Period}" data-Topic="${t.Topic}" data-Teacher="${t.Teacher}" data-room="${t.Room}" data-course="${t.Course}"><i class="bi bi-calendar-check-fill"></i></p>
    </div>`
    return items
}


function formatDate(date) {
    date = new Date(date)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}