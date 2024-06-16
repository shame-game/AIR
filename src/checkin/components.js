function classN(dataClass, dataStudent, dataCourse) {
    vam('#main').innerHTML =
        `<div id="class">
            <div id="class-nav">
                <h1 class="nav-title">Danh sách lớp học</h1>
            </div>
            <div id="class-content">
                <div class="filter">
                    <div class="filter-wrap" id="schoolYear">
                        <h1>Niên khóa: <p>2024</p></h1>
                        <i class="bi bi-caret-down-fill"></i>
                    </div>
                </div>
                <div id="checkin_listclass-wrap" class="list-box">
                    <div id="checkin_listclass">
                        ${listclass(dataClass)}
                        <div class="class_banner" id="addclass">
                            <i class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div id="manager-class-content">
                <div class="Class-detail_detailClass">
                <div>
                    <div id="Class-detail_detailClass-avt"></div>
                    <div id="Class-detail_detailClass_content"></div>
                </div>
            </div>
            <div class="Class-detail_allStudent">
            <div>
                <div id="Class-detail_allStudent_title">
                    <h1>Học sinh trong lớp</h1>
                    <i class="bi bi-caret-down-fill"></i>
                </div>
                <div id="Class-detail_allStudent_listWrap">
                    <i class="bi bi-people"></i>
                    <p>Lỗi hiển thị số lượng học sinh</p>
                </div>  
            </div>
        </div>
        <div class="Class-detail_course">
            <div>
                <div id="Class-detail_course_title">
                    <h1>Các khóa học của lớp</h1>
                    <i class="bi bi-caret-down-fill"></i>
                </div>
                <div id="Class-detail_course_listWrap">
                    <i class="bi bi-journal-bookmark"></i>
                    <p>Lỗi hiển thị khóa học</p>
                </div>  
            </div>
        </div>
            </div>
            <div id="Class-student"></div>
        </div>`

    // Quản lý lớp V1
    vams('.managerClass').forEach((e) => {
        e.onclick = () => {
            let className = e.getAttribute('data-class')
            let students = []
            let classs = []
            dataStudent.forEach((student) => {
                if (student['Class'] == className) {
                    students = students.concat(student)
                }
            })
            dataClass.forEach((classN) => {
                if (classN['NameClass'] == className) {
                    classs = classs.concat(classN)
                }
            })
            ManagerClass(classs, students, dataCourse)
        }
    })
    // Thêm class
    AddClass()

    // Thực hiện checkin
    vams('.checking_diemdanh').forEach((t) => {
        t.onclick = () => {
            SetAttibute('.load', 'style', 'display:block')
            let nameClass = t.getAttribute('data-class')
            let idClass = t.getAttribute('data-id')
            fetchSheet
                .fetch({
                    gSheetId: idClass,
                    wSheetName: nameClass
                }).then((check) => {
                    const selected = [];
                    for (let key in check[0]) {
                        if (check[0][key] == 2) {
                            selected.push(key);
                        }
                    }
                    if (selected == '') {
                        SetAttibute('.load', 'style', 'display:none')
                        alert('Lớp học chưa đăng ký bất kì khóa học nào')
                    } else {
                        vam('#class').innerHTML = `
                        <div class="diemdanh_nav">
                            <div class="diemdanh_nav_left" id="back_class0">
                                <i class="bi bi-box-arrow-left"></i>
                                <a>Quay lại</a>
                            </div>
                            <div class="diemdanh_nav_right">
                                <div id="diemdanh_img">
                                    <img src="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png">
                                    <a>Hình ảnh buổi học</a>
                                </div>
                                
                                <a id="diemdanh_update">Cập nhập</a>
                            </div>
                        </div>
                        <div class="diemdanh_listStudent">
                            <div>                
                                <div class="diemdanh_Student-add">
                                    <p>ID</p>
                                    <p style="flex:1">Họ và Tên</p>
                                    <p style="flex:1"></p>
                                    <p>Có mặt</p>
                                    <p>Vắng mặt</p>
                                    <p>Ghi chú</p>
                                </div>
                                ${listStudent(dataStudent, nameClass)} 
                            </div>
                        </div>
                    `
                        SetAttibute('.load', 'style', 'display:none')
                        vam('#back_class0').onclick = () => Class()
                        vam('#diemdanh_img').onclick = () => {
                            SetAttibute('.load', 'style', 'display:block')
                            let urlnew = urlBackend + "?" + `className=${nameClass}&action=loadimg`;
                            fetch(urlnew, {
                                method: 'GET'
                            }).then(response => response.json())
                                .then((data) => {
                                    window.open(data['message'], '_blank');
                                    SetAttibute('.load', 'style', 'display:none')
                                })
                                .catch(error => alert('Lỗi: ' + error));
                        }
                        vams('.checkin_note').forEach((t) => {
                            t.onclick = () => {
                                let index = t.getAttribute('index')
                                SetAttibute('#popup', 'style', 'display:block')
                                SetAttibute('.popup_main', 'style', 'width:30%')
                                vam('.popup_main').innerHTML =
                                    `<div class="popup_note">
                                        <p>Ghi chú</p>
                                        <input type="text" placeholder="Ghi chú buổi học">
                                        <button id="diemdanh_notexn">Xác nhận</button>
                                    </div>`
                                vam('.popup_background').onclick = () => SetAttibute('#popup', 'style', 'display:none')
                                vam('#diemdanh_notexn').onclick = () => {
                                    let h = vam('.popup_note input').value;
                                    vam(`.getbool_checkin[name="bool${index}"]`).setAttribute('data-note', `${h}`)
                                    SetAttibute('#popup', 'style', 'display:none')
                                }
                            }
                        })
                        vam('#diemdanh_update').onclick = () => {
                            SetAttibute('#popup', 'style', 'display:block')
                            SetAttibute('.popup_main', 'style', 'width:30%')
                            vam('.popup_main').innerHTML =
                                `<div class="popup_updatecheckin">
                                <p>Nhập chủ đề dạy</p>
                                <input type="text" placeholder="VD: CD4 T1">
                                <button id="diemdanh_updatexn">Xác nhận</button>
                            </div>`
                            vam('.popup_background').onclick = () => SetAttibute('#popup', 'style', 'display:none')
                            vam('#diemdanh_updatexn').onclick = () => {
                                SetAttibute('.load', 'style', 'display:block')
                                let cd = vam('.popup_updatecheckin>input').value.toUpperCase();
                                let str = ''
                                vams('.diemdanh_Student>.getbool_checkin').forEach((t) => {
                                    if (t.getAttribute('data-note') != '') {
                                        str += `${t.checked}` + ` ${t.getAttribute('data-note')}` + '-'
                                    } else {
                                        str += `${t.checked}` + '-'
                                    }
                                })
                                str = str.slice(0, -1);
                                console.log(str);
                                let urlnew = urlBackend + "?" + `id=${idClass}&cd=${cd}&result=${str}&kh=${selected}&action=checkin`;
                                fetch(urlnew, {
                                    method: 'GET'
                                }).then(response => response.json())
                                    .then((data) => {
                                        SetAttibute('#popup', 'style', 'display:none')
                                        SetAttibute('.load', 'style', 'display:none')
                                        alert('điểm danh thành công')
                                    })
                                    .catch(error => alert('Lỗi: ' + error));
                            }
                        }
                    }
                })
        }
    })

    // Thực hiện xem thông tin nhóm
    vams('.checking_detail').forEach((t) => {
        t.onclick = () => {
            DetailClass(dataClass, dataStudent, t)
        }
    })

}

