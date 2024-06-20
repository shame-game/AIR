function calenderToday(dataCelender, dataClass, dataStudent, dataCourse) {
    let today = new Date()
    today = formatDate(today)
    let startDate = ''
    let endDate = ''
    let id = ''
    let p = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']
    for (let i = 0; i < dataCelender.length; i++) {
        startDate = dataCelender[i]['Week'].slice(0, 10)
        endDate = dataCelender[i]['Week'].slice(-10)
        if (isDateInRange(today, startDate, endDate)) {
            id = dataCelender[i]['ID']
            fetchSheet
                .fetch({
                    gSheetId: id,
                    wSheetName: 'Trang tính1'
                }).then((day) => {
                    let w = today.slice(0, 2) - startDate.slice(0, 2)
                    Object.keys(day[0]).forEach((t) => {
                        if (t == p[w]) {
                            let afternoon = []
                            let morning = []
                            if (day[0][t] != '') {
                                morning = day[0][t].split('-')
                            }
                            if (day[1][t] != '') {
                                afternoon = day[1][t].split('-')
                            }
                            if (morning != []) {
                                for (i = 1; i <= morning.length; i++) {
                                    mama = morning[i - 1].split('|')
                                    vam('#LearnToday_list').innerHTML += listLearnToday(mama, today, 'Buổi sáng')
                                }
                            }
                            if (afternoon != []) {
                                for (i = 1; i <= afternoon.length; i++) {
                                    papa = afternoon[i - 1].split('|')
                                    vam('#LearnToday_list').innerHTML += listLearnToday(papa, today, 'Buổi chiều')
                                }
                            }
                        }
                    })
                    vams('.checkin').forEach((t) => {
                        t.onclick = () => {
                            let dataCnew = []
                            let classN = t.getAttribute('data-class')
                            for (i = 0; i < dataClass.length; i++) {
                                if (dataClass[i]['NameClass'] == classN) {
                                    dataCnew = dataClass[i]
                                }
                            }
                            checkinnow(t, dataCnew, dataStudent)
                        }
                    })
                })
            break;
        }
    }

}

function checkinnow(t, dataClass, dataStudent) {
    let course = t.getAttribute('data-course')
    vam('#calender-nav').innerHTML += nav_back
    vam('#calender .nav-title').innerText = 'Điểm danh lớp '
    SetAttribute('#calender-learn', 'style', 'display:none');
    SetAttribute('#checkin_wrap', 'style', 'display:flex')
    vam('#checkin_wrap').innerHTML =
        `<div id="informationCheckin">
            <div id="informationCheckin_title">
                <h1>CẬP NHẬP THÔNG TIN TIẾT HỌC</h1>
                <a id="saveCheckin">Lưu cập nhập</a>
            </div>
            <div id="informationCheckin_input">
                <input class="infCheckin" name="ST" type="number" placeholder="Số tiết học">
                <input class="infCheckin" name="CD" type="text" placeholder="Tên chủ đề hoặc nội dung học">
                <input class="infCheckin" name="GV" type="text" placeholder="Giáo viên đứng lớp chính">
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
                        <p>Có mặt</p>
                        <p>Vắng mặt</p>
                        <p>Ghi chú</p>
                    </div>           
                </div>
            </div>
        </div>`

    //
    fetchSheet
        .fetch({
            gSheetId: dataClass['ID'],
            wSheetName: course
        }).then((day) => {
            Object.keys(day[0]).forEach((t) => {
                if (t != 'Days' && t != 'Topic' && t != 'Teacher') {
                    dataStudent.forEach((g) => {
                        if (g['ID'] == t) {
                            vam('#checkin_StudentWrap').innerHTML += listStudentCheckin(g['ID'], g['Name'])
                        }
                    })
                }
            })
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
            vams('.Checkin_input.values').forEach((t) => {
                if (t.checked) {
                    result = result + `${t.getAttribute('name') + '|1-'}`
                } else {
                    result = result + `${t.getAttribute('name') + '|0-'}`
                }
            })
            var url = urlBackend + "?" + `id=${dataClass['ID']}&course=${course}&cd=${CD}&st=${ST}&result=${result.slice(0, -1)}&gv=${GV}&action=checkin`;
            fetch(url, {
                method: 'GET'
            }).then(response => response.json())
                .then((data) => {
                    alert(data['message'])
                    SetAttribute('.load', 'style', 'display:none')
                    vam('#popup').setAttribute('style', 'display:none')
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



// Chuyển dạng ngày tháng
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function isDateInRange(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
}