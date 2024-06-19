function ManagerClass_StudentBack(allStudent, dataClass) {
    vam('.nav-back').remove()
    SetAttribute('#Class-student', 'style', 'display:none')
    ManagerClass(allStudent, dataClass)
}


// Trang danh sách học sinh
function ManagerClass_Student(allStudent, students, dataClass, i, nameC) {
    // Tạo biến liên quan
    let items = ''
    // Quay lại
    vam('.nav-back').onclick = () => {
        ManagerClass_StudentBack(allStudent, dataClass)
    }
    // Thay đổi html
    SetAttribute('#Class-student', 'style', 'display:block')
    SetAttribute('#manager-class-content', 'style', '')
    vam('#Class-student').innerHTML =
        `<div>
            <div id="Class_student-nav">
                <div>
                    <h1>Danh sách học sinh (${i})</h1>
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
    vam('#class-nav>.nav-title').innerText = `Học sinh lớp ${nameC}`

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

    students.forEach((stu) => {
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
            `<div class="Class_student" data-id="${stu['ID']}" data-profile=${stu['profile']}>
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
            let profile = detail.getAttribute('data-profile');
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
                        <h1>Lớp: ${nameC}</h1>
                    </div>
                    <div class="infordetail_back-mid__bage">
                        <button id="profile_student"><p>Hồ sơ điện tử</p></button>
                    </div>
                </div>
                <div class="infordetail_back-bottom">
                    <div class="infordetail_back-bottom-wrap">
                        <div class="infordetail_text">
                        
                        </div>
                        <div class="infordetail_img">
                            <h1>Khóa học đã học</h1>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>`
            students.forEach((t) => {
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
            if (profile == '') {
                vam('#profile_student').innerHTML += ` <i class="bi bi-clipboard-x"></i>`
                SetAttribute('#profile_student', 'style', 'color:red !important')
            } else {
                vam('#profile_student').innerHTML += ` <i class="bi bi-clipboard-check"></i>`
                SetAttribute('#profile_student', 'style', 'color:#06ff8c !important')

                vam('#profile_student').onclick = () => {
                    window.open(`http://127.0.0.1:5500/Profile/?${id}${removeAccentsAndSpaces(name)}`, "_blank");
                }
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

function removeAccentsAndSpaces(str) {
    let newStr = str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    newStr = newStr.replace(/\s+/g, '');
    return newStr;
}