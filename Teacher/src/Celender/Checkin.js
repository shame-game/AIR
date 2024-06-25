function Checkin(data, e, today) {
    let dataStudent = e.getAttribute('data-student')
    dataStudent = dataStudent.split(',')
    let Student = []
    data.forEach((t) => {
        for (i = 0; i < dataStudent.length; i++) {
            if (t.ID == dataStudent[i]) {
                Student = Student.concat(t)
            }
        }
    })
    checkinnow(Student, e, today)
}

function listStudentCheckin(id, name, checkin) {
    let h = ''
    if (checkin == 0) {
        h = ` <p class="Chechin_checked"  data-id="${id}"><input class="Checkin_input" value="true" name="${id}" type="radio" style="accent-color: #ff142c;" checked></p>`
    } else if (checkin == 1) {
        h = ` <p class="Chechin_checked"  data-id="${id}"><input class="Checkin_input" value="false" name="${id}" type="radio" style="accent-color: #ff142c;" ></p>`
    } else if (checkin == 2) {
        h = ` <p class="Chechin_checked"  data-id="${id}"><input class="Checkin_input" value="false" name="${id}" type="radio" style="accent-color: #ff142c;" ></p>`
    }
    let items =
        `<div class="checkin_Student conte"  data-id="${id}">
            <div>
                <p>${id}</p>
                <p>${name}</p>
            </div>
            <div>
               ${h}
                </div>
        </div>`
    return items
}

function checkinnow(student, e, today) {
    let Course = e.getAttribute('data-Course')
    let Class = e.getAttribute('data-Class')
    SetAttribute('#calender-learn', 'style', 'display:none');
    SetAttribute('#checkin_wrap', 'style', 'display:flex')
    vam('#calender-nav').innerHTML += nav_back
    vam('#calender .nav-title').innerText = 'Chuyên cần'

    vam('#checkin_wrap').innerHTML =
        `<div id="informationCheckin">
                <div id="informationCheckin_title">
                    <h1>CẬP NHẬP THÔNG TIN TIẾT HỌC</h1>
                    <div>
                        <a id="Img_Drive"><img src="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png">Hình ảnh</a>
                        <a id="saveCheckin">Lưu cập nhập</a>
                    </div>
                </div>
                <div id="informationCheckin_input">
                    <input class="infCheckin" name="ST" type="number" placeholder="Số tiết học" value="${e.getAttribute('data-Period')}">
                    <input class="infCheckin" name="CD" type="text" placeholder="Tên chủ đề hoặc nội dung học" value="${e.getAttribute('data-Topic')}">
                    <input class="infCheckin" name="GV" type="text" placeholder="Giáo viên đứng lớp chính" value="${e.getAttribute('data-Teacher')}">
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
                        </div>           
                    </div>
                </div>
            </div>`
    let checkin = e.getAttribute('data-Checkin')
    checkin = checkin.split('-')
    for (i = 0; i < student.length; i++) {
        vam('#checkin_StudentList').innerHTML += listStudentCheckin(student[i].ID, student[i].Name, checkin[i])
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

    vam('#Img_Drive').onclick = () => {
        SetAttribute('.load', 'style', 'display:block')

        var url = 'https://script.google.com/macros/s/AKfycbwYdpmUkjjyd6qvJnpDK2vIUguc6q9wrtv7dh2d-YkgRB0qR5Ctq1Hyi_x3TNADpmdk/exec' + "?"
            + `date=${new Date()}&className=${Class}`;
        fetch(url, {
            method: 'GET'
        }).then(response => response.json())
            .then((data) => {
                window.open(data.message, "_blank")
                SetAttribute('.load', 'style', 'display:none')
            })
            .catch(error => alert('Lỗi: ' + error));
    }


    if (formatDate(new Date()) == today) {
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
                        result += 0 + '-' + t.getAttribute('name') + '|'
                    } else if (t.value == "false") {
                        result += 1 + '-' + t.getAttribute('name') + '|'
                    }
                })
                var url = 'https://script.google.com/macros/s/AKfycbzITXm3yS2It4Hs95Tp7qjRyVHIS3wJUHSwXFZ05rMKvPyKC6HJ5MgUUfkNYw2bNBuKsw/exec' + "?"
                    + `ST=${ST}&CD=${CD}&GV=${GV}&result=${result.slice(0, -1)}&Course=${Course}&Class=${Class}`;
                fetch(url, {
                    method: 'GET'
                }).then(response => response.json())
                    .then((data) => {
                        alert('Điểm danh thành công')
                        SetAttribute('.load', 'style', 'display:none')
                    })
                    .catch(error => alert('Lỗi: ' + error));
            } else {
                SetAttribute('.load', 'style', 'display:none')
                alert('Vui lòng điền đầy đủ thông tin tiết học')
            }

        }
    } else {
        vam('#saveCheckin').onclick = () => alert('Không được điểm danh cho ngày không phải hôm nay')
    }


    // Quay lại 
    vam('#calender .nav-back').onclick = () => {
        SetAttribute('#checkin_wrap', 'style', 'display:none')
        vam('#calender .nav-back').remove()
        vam('#calender .nav-title').innerText = 'Lịch dạy'
        SetAttribute('#calender-learn', 'style', 'display:block')
    }
}
