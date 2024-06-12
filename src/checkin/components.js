function checkin(dataClass, dataStudent) {
    vam('#main').innerHTML =
        `<div id="checkin">
            <div id="checkin_nk">
                <h1>Niên khóa: <p>2024</p>
                </h1>
                <i class="bi bi-caret-down-fill"></i>
            </div>
            <div id="checkin_listclass-wrap">
                <div id="checkin_listclass">
                    ${listclass(dataClass)}
                    <div class="checkin_class" id="addclass">
                    <i class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>`
    // Thêm class
    AddClass(dataClass)
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
                        vam('#checkin').innerHTML = `
                        <div class="diemdanh_nav">
                            <div class="diemdanh_nav_left" id="back_class0">
                                <i class="bi bi-box-arrow-left"></i>
                                <a>Quay lại</a>
                            </div>
                            <div class="diemdanh_nav_right">
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
                                </div>
                                ${listStudent(dataStudent, nameClass)} 
                            </div>
                        </div>
                    `
                        SetAttibute('.load', 'style', 'display:none')
                        vam('#back_class0').onclick = () => Class()
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
                                vams('.diemdanh_Student>#getbool_checkin').forEach((t) => {
                                    str += `${t.checked}` + '-'
                                })
                                str = str.slice(0, -1);
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

