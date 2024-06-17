// Vào giao diện quản lý lớp học
function ManagerClass(dataClass, dataStudent, dataCourse) {

    let className = dataClass[0]['NameClass']
    let gvcn = dataClass[0]['formTeacher']
    let avt = dataClass[0]['avt']
    let quantity = dataStudent.length
    let id = dataClass[0]['ID']
    vam('#class-nav>.nav-title').innerText = `Lớp ${className}`
    // Chuyển Cảnh
    SetAttribute('#class-content', 'style', 'animation: nextV .5s linear forwards;');
    vam('#class-nav').innerHTML += nav_back
    setTimeout(() => { SetAttribute('#manager-class-content', 'style', 'animation: OpenV .5s linear forwards;display:block') }, 300)
    // Quay lại 
    ManagerClassBack()

    // Load trạng thái khóa học
    let kh = []
    dataCourse.forEach((t) => {
        kh = kh.concat(t['ID'])
    })
    fetchSheet
        .fetch({
            gSheetId: id,
            wSheetName: className
        }).then((detailClass) => {
            let ind = 0
            Object.values(detailClass).forEach((t) => {
                for (i = 0; i < kh.length; i++) {
                    Object.keys(detailClass[0]).forEach((nameKh) => {
                        if (nameKh == kh[i]) {
                            ind++
                            console.log('đúng');
                        }
                    })
                }
            })
            vam('#Class-detail_course_listWrap>p').innerText = `${ind} Khóa học hiện tại`
        })

    /* Load nội dung trang quản lý */
    // Load hình bìa 
    vam('#Class-detail_detailClass-avt').innerHTML = `<img src="${avt}">`
    vam('#Class-detail_detailClass_content').innerHTML =
        `<h1 class="detailclass_title" > Thông tin chi tiết lớp học</h1>
        <div class="detailclass_tt"><h1>Tên lớp: ${className}</h1></div>
        <div class="detailclass_tt"><h1>Giáo viên chủ nhiệm: ${gvcn}</h1></div>`
    // Load số lượng học sinh
    vam('#Class-detail_allStudent_listWrap>p').innerText = quantity + ' học sinh'
    /* Chuyển trang danh sách học sinh*/
    vam('#Class-detail_allStudent_listWrap').onclick = () => ManagerClass_Student(dataClass, dataStudent, dataCourse)
    // Chuyển trang danh sách khóa học 
    vam('#Class-detail_course_listWrap').onclick = () => ManagerClass_Course(dataClass, dataStudent, dataCourse)
}
// Thực hiện quay lại 
function ManagerClassBack() {
    vam('.nav-back').onclick = () => {
        SetAttribute('#class-content', 'style', 'animation: backV .5s linear forwards;')
        vam('.nav-back').remove()
        vam('#class-nav>.nav-title').innerText = 'Danh sách lớp học'
        SetAttribute('#manager-class-content', 'style', 'animation: ClouseV .5s linear forwards;display:none')
    }
}
function ManagerClass_StudentBack(dataClass, dataStudent, dataCourse) {
    vam('.nav-back').remove()
    SetAttribute('#Class-student', 'style', 'display:none')
    ManagerClass(dataClass, dataStudent, dataCourse)
}


// Trang danh sách học sinh
function ManagerClass_Student(dataClass, dataStudent, dataCourse) {
    // Tạo biến liên quan
    let items = ''
    let quantity = dataStudent.length
    let className = dataClass[0]['NameClass']
    let idStudent = dataClass[0]['ID']
    // Thay đổi html
    SetAttribute('#Class-student', 'style', 'display:block')
    SetAttribute('#manager-class-content', 'style', '')
    vam('#Class-student').innerHTML =
        `<div>
            <div id="Class_student-nav">
                <div>
                    <h1>Danh sách học sinh (${quantity})</h1>
                    <i id="add_Student" class="bi bi-person-fill-add"></i>
                </div>
                <div class="search-wrap">
                        <input type="search" class="">
                        <button id="search" class="">
                            <i class="bi bi-search"></i>
                        </button>
                        <p><i class="bi bi-x-lg"></i></p>
                </div>
            </div>
            <div class="dot"></div>
            <div id="Class_student-wrap"></div>
        </div>`
    vam('#class-nav>.nav-title').innerText = `Học sinh lớp ${className}`
    vam('.nav-back').onclick = () => {
        ManagerClass_StudentBack(dataClass, dataStudent, dataCourse)
    }
    vam('#search').addEventListener('click', () => {
        vam('.search-wrap>input').classList.add('hide')
        vam('.search-wrap>button').classList.add('hiden')
        vam('.search-wrap>input').value = ''
        vam('.search-wrap p').addEventListener('click', () => {
            vam('.search-wrap>input').classList.remove('hide')
            vam('.search-wrap>button').classList.remove('hiden')
            vam('.search-wrap>input').value = ''
        })
    })

    dataStudent.forEach((stu) => {
        let i = -2
        Object.values(stu).forEach((t) => {
            if (t == '') {
                i++
            }
        })
        if (i == 0) {
            i = `<i class="bi bi-bookmark-check"></i>`
        } else {
            i = `<i class="bi bi-bookmark information_Left_lack" ><p>${i}</p></i>`
        }
        items +=
            `<div class="Class_student" data-id="${stu['ID']}">
                <div class="information_Right">
                    <div>
                        <img src='${stu.avt}'>
                    </div>
                    <p class="idStudent">${stu['ID']}</p>
                    <p class="nameStudent">${stu['Name']}</p>
                </div>
                <div class="information_Left">
                    ${i}
                </div>
            </div>`
    })
    vam('#Class_student-wrap').innerHTML = items
    vams('.Class_student').forEach((detail) => {
        detail.onclick = () => {
            let id = detail.getAttribute('data-id');
            let avt = vam(`.Class_student[data-id="${id}"] img`).src
            let name = vam(`.Class_student[data-id="${id}"] .nameStudent`).innerText
            SetAttribute('#popup', 'style', 'display:block')
            SetAttribute('.popup_main', 'style', 'width:80%;height:90%')
            vam('.popup_main').innerHTML =
                `<div class="infordetail_wrap">
                    <div class="infordetail_back-top"></div>
                    <div class="infordetail_back-mid">
                    <div class="infordetail_back-mid__avt">
                        <img src="${avt}">
                    </div>
                    <div class="infordetail_back-mid__name">
                        <h1>${name}</h1>
                        <h1>Lớp: ${className}</h1>
                    </div>
                    <div class="infordetail_back-mid__bage">
                        <button id="profile_student">Hồ sơ điện tử</button>
                    </div>
                </div>
                <div class="infordetail_back-bottom">
                    <div class="infordetail_back-bottom-wrap">
                        <div class="infordetail_text">
                        
                        </div>
                        <div class="infordetail_img">
                            <h1>Hồ sơ điện tử</h1>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>`
            dataStudent.forEach((t) => {
                if (t['ID'] == id) {
                    vam('.infordetail_text').innerHTML =
                        `
                        <h1>Thông tin cá nhân</h1>
                        <div>
                            <p>ID học sinh: </p>
                            <input value="${t['ID']}"  class="input_updateStudent" name="id"/>
                        </div>
                        <div>
                            <p>Họ và tên: </p>
                            <input value="${t['Name']}"  class="input_updateStudent" name="name"/>
                        </div>
                        <div>
                            <p>Ngày sinh: </p>
                            <input type="date" value="${t['BD']}" class="input_updateStudent"  name="bd"/>
                        </div>
                        <div>
                            <p>Tên phụ huynh: </p>
                            <input value="${t['NameParent']}"  class="input_updateStudent" name="nameparent"/>
                        </div>
                        <div>
                            <p>Liên lạc: </p>
                            <input value="${t['Phone']}" class="input_updateStudent" name="phone"/>
                        </div>
                        <div>
                            <p>Địa chỉ: </p>
                            <input value="${t['Address']}"  class="input_updateStudent" name="address"/>
                        </div>
                        <div>
                            <p>Trạng thái học: </p>
                            <input value="${t['Status']}"  class="input_updateStudent" name="status"/>
                        </div>
                        <div>
                            <p>Trạng thái đóng tiền: </p>
                            <input value="${t['StatusPay']}"  class="input_updateStudent" name="statusP"/>
                        </div>
                        <button id="update_Student">Cập nhập thông tin</button>`
                }
            })
            vam('.popup_background').onclick = () => {
                SetAttribute('#popup', 'style', 'display:none')
            }
            vam('#update_Student').onclick = () => {
                SetAttribute('.load', 'style', 'display:block')

                let urlnew = urlBackend + "?" + `id=${vam('.input_updateStudent[name="id"]').value}&name=${vam('.input_updateStudent[name="name"]').value}
                &bd=${vam('.input_updateStudent[name="bd"]').value}&nameparent=${vam('.input_updateStudent[name="nameparent"]').value}&phone=${vam('.input_updateStudent[name="phone"]').value}
                &address=${vam('.input_updateStudent[name="address"]').value}
                &status=${vam('.input_updateStudent[name="status"]').value}
                &statusP=${vam('.input_updateStudent[name="statusP"]').value}&action=updateStudent`;
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

    // thêm học sinh mới
    vam('#add_Student').onclick = () => {
        SetAttribute('#popup', 'style', 'display:block')
        SetAttribute('.popup_main', 'style', 'width:600px')
        vam('.popup_background').onclick = () => {
            vam('#popup').setAttribute('style', 'display:none')
        }
        vam('.popup_main').innerHTML =
            `<div id="addStudent" style="display:flex;flex-direction: column;">
                <p>Thêm học sinh</p>
                            <input type="text" class="ip_addStudent" name="name" placeholder="Tên học sinh">
                            <input type="text" class="ip_addStudent" name="bd" placeholder="Ngày sinh">
                            <input type="text" class="ip_addStudent" name="nameparent" placeholder="Tên phụ huynh">
                            <input type="text" class="ip_addStudent" name="phone" placeholder="Điện thoại phụ huynh">
                            <input type="text" class="ip_addStudent" name="address" placeholder="Địa chỉ">
                            <input type="text" class="ip_addStudent" name="statusPay" placeholder="Trạng thái đóng học phí (0: chưa đóng, 1: đã đóng)">
                            <button id="bt_addStudent">Thêm học sinh</button>
                        </div>`
        vam('#bt_addStudent').onclick = () => {
            SetAttribute('.load', 'style', 'display:block')
            let name = vam('.ip_addStudent[name="name"]').value
            let bd = vam('.ip_addStudent[name="bd"]').value
            let phone = vam('.ip_addStudent[name="phone"]').value
            let nameparent = vam('.ip_addStudent[name="nameparent"]').value
            let address = vam('.ip_addStudent[name="address"]').value
            let statusPay = vam('.ip_addStudent[name="statusPay"]').value
            let urlnew = urlBackend + "?" + `name=${name}&bd=${bd}&classN=${className}&nameParent=${nameparent}&phone=${phone}&address=${address}&statusPay=${statusPay}&action=addStudent`;
            fetch(urlnew, {
                method: 'GET'
            }).then((data) => {
                alert(`Thêm thành công học sinh ${name}`)
                SetAttribute('#popup', 'style', 'display:none')
                SetAttribute('.load', 'style', 'display:none')
            }).catch(error => alert('Lỗi: ' + error));
        }
    }
}
// Trang danh sách khóa học
function ManagerClass_Course(dataClass, dataStudent, dataCourse) {
    let idClass = dataClass[0]['ID']
    let className = dataClass[0]['NameClass']

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
    vam('#class-nav>.nav-title').innerText = `Khóa học của lớp ${className}`
    vam('.nav-back').onclick = () => {
        ManagerClass_StudentBack(dataClass, dataStudent, dataCourse)
    }
    let listCourse = []
    dataCourse = dataCourse.map(obj => {
        let trimmedObj = {};
        for (let key in obj) {
            trimmedObj[key.trim()] = obj[key];
        }
        return trimmedObj;
    });
    dataCourse.forEach((t) => {
        listCourse = listCourse.concat(t['ID'])
    })
    // Kiểm tra lớp đang có khóa học nào chưa 
    fetchSheet
        .fetch({
            gSheetId: idClass,
            wSheetName: className
        }).then((detailClass) => {
            let cfn = 0
            let cip = 0
            let ckh = 0
            let boxcfn = []
            Object.keys(detailClass[0]).forEach((t) => {
                for (i = 0; i < listCourse.length; i++) {
                    if (t == listCourse[i]) {
                        if (detailClass[0][t] == 0) {
                            cip++
                            boxcfn = boxcfn.concat(t)
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
                        let urlnew = urlBackend + "?" + `nameV=${className}&nameN=${idClass}&nameC=${nameCourse}&student=${str.slice(0, -1)}&action=addCourseInClass`;
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