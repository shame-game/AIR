// Trang danh sách khóa học
function ManagerClass_Course(allStudent, students, dataClass, i, nameC, dataCourse) {

    let idClass = dataClass['ID']

    SetAttribute('#Class-student', 'style', 'display:block')
    SetAttribute('#manager-class-content', 'style', '')
    vam('#Class-student').innerHTML =
        `<div id="Class-course">
            <div id="Class_course-ip">
                <h4>Khóa học đang học (1)</h4>
                <div class="Class_course-ip-wrap Class_course-list">
                </div>
            </div>
            <div id="Class_course-kh">
                <h4>Các khóa học khác</h4>
                <div class="Class_course-kh-wrap Class_course-list">
                </div>
            </div>
        </div>`
    vam('#class-nav>.nav-title').innerText = `Khóa học của lớp ${nameC}`
    vam('.nav-back').onclick = () => {
        ManagerClass_StudentBack(allStudent, dataClass)
    }
    let listCourse = []
    dataCourse.forEach((t) => {
        listCourse = listCourse.concat(t['ID'])
    })
    // Kiểm tra lớp đang có khóa học nào chưa 
    fetchSheet
        .fetch({
            gSheetId: idClass,
            wSheetName: nameC
        }).then((detailClass) => {
            let cfn = 0
            let cip = 0
            let ckh = 0
            let boxcfn = []
            Object.keys(detailClass[0]).forEach((t) => {
                if (t.slice(0, 2) == 'C_') {
                    for (i = 0; i < listCourse.length; i++) {
                        if (t.slice(2) == listCourse[i]) {
                            cip++
                            vam('.Class_course-ip-wrap').innerHTML +=
                                `<div>
                                    <img src='${dataCourse[i]['Banner']}'>
                                    <div class="chechin_more" >
                                        <div class="class_more">
                                            <i class="bi bi-three-dots-vertical"></i>
                                        </div>
                                        <div class="class_more-content">
                                            <p class="detail-Course-checkin">Chi tiết điểm danh</p>
                                            <p class="addStudent-Course">Thêm học sinh</p>
                                        </div>
                                    </div>
                                    <div class="course-tt">
                                        <h2>${dataCourse[i]['Name']}</h2>
                                        <p>Số tiết: ${dataCourse[i]['Period']}</p>
                                    </div>
                                </div>`
                        }
                    }
                }
            })
            dataCourse.forEach((t) => {
                if (boxcfn.length > 0) {
                    for (i = 0; i < boxcfn.length; i++) {
                        if (t['ID'] != boxcfn[i]) {
                            ckh++
                            vam('.Class_course-kh-wrap').innerHTML +=
                                `<div>
                                    <img src='${t['Banner']}'>
                                    <div class="chechin_more" >
                                        <div class="class_more">
                                            <i class="bi bi-three-dots-vertical"></i>
                                        </div>
                                        <div class="class_more-content">
                                            <p class="addCourse" data-NCourse="${t['ID']}">Đăng ký khóa học</p>
                                        </div>
                                    </div>
                                    <div class="course-tt">
                                        <h2>${t['Name']}</h2>
                                        <p>Số tiết: ${t['Period']}</p>
                                    </div>
                                </div>`
                        }
                    }
                } else {
                    ckh++
                    vam('.Class_course-kh-wrap').innerHTML +=
                        `<div>
                                    <img src='${t['Banner']}'>
                                    <div class="chechin_more" >
                                        <div class="class_more">
                                            <i class="bi bi-three-dots-vertical"></i>
                                        </div>
                                        <div class="class_more-content">
                                            <p class="addCourse" data-NCourse="${t['ID']}">Đăng ký khóa học</p>
                                        </div>
                                    </div>
                                    <div class="course-tt">
                                        <h2>${t['Name']}</h2>
                                        <p>Số tiết: ${t['Period']}</p>
                                    </div>
                                </div>`
                }
            })
            vam('#Class_course-kh>h4').innerText = `Tất cả khóa học đang có (${ckh})`
            vam('#Class_course-ip>h4').innerText = `Khóa học đang học (${cip})`
            vams('.addCourse').forEach((t) => {
                t.onclick = () => {
                    let nameCourse = t.getAttribute('data-NCourse')
                    SetAttribute('#popup', 'style', 'display:block')
                    SetAttribute('.popup_main', 'style', 'width:600px')
                    vam('.popup_background').onclick = () => {
                        vam('#popup').setAttribute('style', 'display:none')
                    }
                    vam('.popup_main').innerHTML =
                        `<div id="addStudent" style="display:flex;flex-direction: column;">
                            <p>Thêm học sinh</p>
                            <div id="addCourse_listStudent"></div>
                            <button id="addCoursexn">Thêm học sinh vào khóa học</button>
                        </div>`
                    let itemss = ''
                    dataStudent.forEach((t) => {
                        itemss +=
                            `<div class="Class_student" data-id="${t['ID']}">
                            <div class="information_Right">
                                <div><img src='${t.avt}'></div>
                                <p class="idStudent">${t['ID']}</p>
                                <p class="nameStudent">${t['Name']}</p>
                            </div>
                            <div class="information_Left">
                                <input class="addCourse_radio" type="checkbox">
                            </div>
                        </div>`
                    })
                    vam('#addCourse_listStudent').innerHTML = itemss
                    vams('.Class_student').forEach((t) => {
                        t.onclick = () => {
                            let ind = t.getAttribute('data-id')
                            if (vam(`.Class_student[data-id="${ind}"] input`).checked == true) {
                                vam(`.Class_student[data-id="${ind}"] input`).checked = false
                            } else {
                                vam(`.Class_student[data-id="${ind}"] input`).checked = true
                            }
                        }
                    })

                    vam('#addCoursexn').onclick = () => {
                        SetAttribute('.load', 'style', 'display:block')
                        let str = ''
                        vams('.Class_student').forEach((t) => {
                            let ind = t.getAttribute('data-id')
                            if (vam(`.Class_student[data-id="${ind}"] input`).checked == true) {
                                str += ind + '-'
                            }
                        })
                        let urlnew = urlBackend + "?" + `nameV=${nameC}&nameN=${idClass}&nameC=${nameCourse}&student=${str.slice(0, -1)}&action=addCourseInClass`;
                        fetch(urlnew, {
                            method: 'GET'
                        }).then(response => response.json())
                            .then((data) => {
                                console.log(data);
                                SetAttribute('#popup', 'style', 'display:none')
                                SetAttribute('.load', 'style', 'display:none')
                                alert('điểm danh thành công')
                            })
                            .catch(error => alert('Lỗi: ' + error));
                    }
                }
            })

        })
}

let dataCourse = []
function CourseClass(allStudent, students, dataClass, i, nameC) {
    if (dataCourse.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '1yovU5--qcwwKtDFSY48RNbXdBr72uI1PQD8Uob_79Y4',
                wSheetName: 'Course',
            }).then((data) => {
                dataCourse = strim(data)
                ManagerClass_Course(allStudent, students, dataClass, i, nameC, dataCourse)
            })
    } else {
        ManagerClass_Course(allStudent, students, dataClass, i, nameC, dataCourse)
    }
}