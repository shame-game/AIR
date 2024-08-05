function Student(data) {
    vam('#main').innerHTML =
        `<div id="student" class="Wrap_Main">
            <div id="student-nav" class="Wrap_Nav">
                <h1 class="nav-title">Học sinh</h1>
            </div>
            <div id="student-main">
                <div id="student-left">
                    <div class="nav">
                        <div id="student_search">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text">
                                <div id="typeSearch" >
                                    <p>Tìm theo SĐT</p>
                                    <div style="display:none">
                                        <p>Tìm theo ID</p>
                                        <p>Tìm theo Tên</p>
                                    </div>
                                </div>
                        </div>
                        <div id="SearchClass">
                            <p>Tất cả</p>
                        </div>
                    </div>
                    <div class="list">
                        <div class="nav">
                            <p></p>
                            <p>MHS</p>
                            <p>Tên</p>
                            <p>SĐT Phụ huynh</p>
                        </div>
                        <div class="main"></div>
                    </div>
                </div>
                <div id="student-right">
                    <div class="nav">
                        <h1>Tổng quan học sinh</h1>
                    </div>
                    <div id="student-right_main">
                        <div class="sum" >
                            <p>Tổng số học sinh</p>
                            <h4>0</h4>
                            <p>Trong đó có <span class="nghihoc">2 học sinh nghỉ học</span></p>
                            <div>
                                <div class="lt"><p>Long Thành</p></div>
                                <div class="bh"><p>Biên Hòa</p></div>
                            </div>
                            <div style="flex-direction: column;gap:10px;justify-content: center;">
                                <div class="detail_lt">
                                    <div></div>
                                    <p>Tổng 24 học sinh, 2 học sinh nghỉ học</p>
                                </div>
                                <div class="detail_bh">
                                    <div></div>
                                    <p>Tổng 24 học sinh, 2 học sinh nghỉ học</p>
                                </div>
                            </div>
                        </div>
                        <detail style="display:none">
                            <div class="avt">
                                <img src="">
                                <div>
                                    <p class="id">ID: <span></span></p>
                                    <p class="name">Tên: <span</span></p>
                                </div>
                                <div class="profile">
                                    <div class="ID_profile">
                                        <p><i class="fa-solid fa-address-card"></i>Hồ sơ điện tử</p>
                                    </div>
                                </div>
                            </div>
                            <div class="infor">
                                <p class="lable" data="infor"><i class="fa-solid fa-circle-user"></i>Thông tin chi tiết</p>
                                <div class="detail">
                                    <p>Ngày sinh: <span></span></p>
                                    <p>Lớp: <span></span></p>
                                    <p>Liên hệ: <span></span></p>
                                    <p>Địa chỉ: <span></span></p>
                                    <p>Tình trạng học: <span></span></p>
                                </div>
                            </div>
                            <div class="course">
                                <p class="lable" data="course"><i class="fa-solid fa-book"></i> Khóa học <span></span></p>
                                <div class="detail">
                                </div>
                            </div>
                        </detail>
                    </div>
                </div>
            </div>
            <div id="course_cre_2" class="fixed">
            <div class="main">
                <div class="nav">
                    <i id="outCreateCourse_Infor" class="fa-solid fa-xmark"></i>
                    <p>Thêm thông tin</p>
                </div>
                <div class="root"></div>
            </div>
            <div class="background"></div>
        </div>

        </div>`


    vams('#student-right_main>detail .lable').forEach(t => {
        t.onclick = () => {
            if (!vam(`.${t.getAttribute('data')}>.detail.hien`)) vam(`.${t.getAttribute('data')}>.detail`).classList.add('hien')
            else vam(`.${t.getAttribute('data')}>.detail`).classList.remove('hien')
        }
    })
    ListStudent(data)
    vam('#typeSearch').onclick = () => {
        SetAttribute('#typeSearch>div', 'style', 'display:block')
        vams('#typeSearch>div>p').forEach((t) => {
            t.onclick = () => {
                let h = t.innerText
                let l = vam('#typeSearch>p').innerText
                vam('#typeSearch>p').innerText = h
                t.innerText = l
            }
        })
        document.onclick = (e) => {
            if (!vam('#typeSearch').contains(e.target)) {
                SetAttribute('#typeSearch>div', 'style', 'display:none')
            }
        };
    };
    vams('#student-left>.list>.main>div').forEach(e => {
        e.onclick = () => {
            if (vam('#student-left>.list>.main>.ac')) vam('#student-left>.list>.main>.ac').classList.remove('ac')
            e.classList.add('ac')
            detailStudent(e, data)
        }
    })
    vam('#student_search input').oninput = () => {
        vams('#student-left>.list>.main>div').forEach(t => {
            if (t.getAttribute('data-phone').includes(vam('#student_search input').value) || vam('#student_search input').value.includes(t.getAttribute('data-phone'))) t.setAttribute('style', 'display:flex')
            else t.setAttribute('style', 'display:none')
        })
    }
    SetAttribute('.load', 'style', 'display:none')
}

let backe = `<p id="back"><i class="fa-solid fa-angle-left"></i>Quay lại</p>`

async function detailStudent(e, data) {

    let id = e.getAttribute('data-id')
    let f = []
    for (i = 0; i < data.length; i++) {
        if (data[i].ID == id) {
            f = data[i]
            break;
        }
    }
    vam('#student-right>.nav h1').innerText = 'Chi tiết học sinh'
    SetAttribute('#student-right_main>detail', 'style', 'display:block')
    SetAttribute('#student-right_main>.sum', 'style', 'display:none')
    if (!vam('#back')) vam('#student-right .nav').innerHTML += backe
    vam('#student-right_main>detail .avt>img').src = f.avt
    vam('#student-right_main>detail .avt .id').innerText = f.ID
    vam('#student-right_main>detail .avt .name').innerText = f.Name
    vams('#student-right_main>detail .infor .detail p span')[0].innerText = f.BD
    vams('#student-right_main>detail .infor .detail p span')[1].innerText = f.Class
    vams('#student-right_main>detail .infor .detail p span')[2].innerText = f.PhoneMom
    vams('#student-right_main>detail .infor .detail p span')[3].innerText = f.Address
    vams('#student-right_main>detail .infor .detail p span')[4].innerText = f.Status
    vam('.ID_profile').onclick = () => {
        vam('#course_cre_2 .nav p').innerText = `Hồ sơ điện tử cá nhân của ${f.Name}`
        vam('#course_cre_2 .root').innerHTML =
            `<div class="infor course_cre_1_box">
                        <div class="title">
                            <p>Thông tin cơ bản của ${f.Name}</p>
                        </div>
                        <div class="profile_infor">
                            <div class="input">
                                <div class="name">
                                <p>Tên học sinh: ${f.Name}</p>
                            </div>
                            <div class="img">
                                <p>Hình giới thiệu: <input type="text" id="profile_input_img_infor" placeholder="Nhập link hình ảnh"/></p>
                            </div>
                                <div class="in">
                                    <p>Giới thiệu bản thân: <textarea name="" id=""></textarea></p>
                                </div>
                            </div>
                            <div class="img">
                                <img id="profile_div_img_infor" src="https://lh4.googleusercontent.com/proxy/YQNzBA3l3nGs_xPVm4HT-UfA7XALpncTQ4JxJvXlFubDs8kU23MbM4uRMLOZqcD1LXf8eby-9TdcnrvOfAS842VGpBkpcRZqBHiyiE9L" />
                            </div>
                        </div>
                    </div>
                    <div class="project course_cre_1_box">
                        <div class="title">
                            <p>Hình ảnh dự án</p>
                        </div>
                        <div class="img">
                            <div id="upload-area">
                                <input type="file" id="file-input" multiple>
                                <i class="fa-solid fa-image"></i>
                                <label for="file-input"></label> 
                            </div>
                        </div>
                    </div>
                    <div class="project course_cre_1_box">
                        <div class="title">
                            <p>Video thuyết trình</p>
                        </div>
                        <div class="img">
                            <div id="upload-area">
                                <input type="file" id="file-input" multiple>
                                <i class="fa-solid fa-video"></i>
                                <label for="file-input"></label> 
                            </div>
                        </div>
                    </div>
                    <div class="Skill course_cre_1_box">
                        <div class="title">
                            <p>Đánh giá 6 kĩ năng</p>
                        </div>
                        <div class="img">
                            <div id="upload-area">
                                <input type="file" id="file-input" multiple>
                                <i class="fa-solid fa-video"></i>
                                <label for="file-input"></label> 
                            </div>
                        </div>
                    </div>
                    <div class="course course_cre_1_box">
                        <div class="title">
                            <p>Các khóa học hoàn thành</p>
                        </div>
                        <div class="img">
                            <div id="upload-area">
                                <input type="file" id="file-input" multiple>
                                <i class="fa-solid fa-video"></i>
                                <label for="file-input"></label> 
                            </div>
                        </div>
                    </div>
                    `

        vam('#file-input').onchange = (event) => {
            handleFileUpload(event)
        }


        vam('#profile_input_img_infor').onchange = () => {
            vam('#profile_div_img_infor').src = vam('#profile_input_img_infor').value
        }
        /*
        const uploadArea = vam('#profile_project_img');
        uploadArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            uploadArea.classList.add('dragging');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragging');
        });
        uploadArea.addEventListener('drop', (event) => {
            event.preventDefault();
            uploadArea.classList.remove('dragging');

            const file = event.dataTransfer.files[0];
            const imageUrl = URL.createObjectURL(file);
            console.log('Image URL:', imageUrl);
            // Bạn có thể lưu lại URL này để sử dụng sau
        });
        let v = 0
        for (i = 0; i < 6; i++) {
            uploadArea.onclick = () => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';
                document.body.appendChild(fileInput);
                fileInput.addEventListener('change', (event) => {
                    const file = event.target.files[0];
                    const imageUrl = URL.createObjectURL(file);
                    addIMGProject(imageUrl)
                    document.body.removeChild(fileInput);
                    v++
                });
                fileInput.click();
            };
            if (v == 6) break
        }*/
        loadHTMLCourseW()
        setTimeout(() => {
            SetAttribute('#course_cre_2>.background', 'style', 'opacity: 1')
            SetAttribute('#course_cre_2>.main', 'style', 'transform: translateX(0)')
            SetAttribute('#course_cre_1>.main', 'style', 'transform: translateX(-25%)')
        }, 100)
        SetAttribute('#course_cre_2', 'style', 'z-index: 1')
        vam('#course_cre_2>.background').onclick = () => course_cre_2Out()
        vam('#outCreateCourse_Infor').onclick = () => course_cre_2Out()
        vam('#xn_inforCourse').onclick = () => {
            let danhsachkhoahoc = vam('#course_cre_2 .danhsachkhoahoc').value
            let danhsachnoihoc = vam('#course_cre_2 .danhsachnoihoc').value
            vam('#course_cre_1>.main>.root>.infor>.main>.name span').innerText = danhsachkhoahoc
            vam('#course_cre_1>.main>.root>.infor>.main>.address span').innerText = danhsachnoihoc
            course_cre_2Out()
        }
    }
    let course = ''
    let detailcourse = ''
    let soluongc = 0
    let itemscourse = f['Course'].split('=')
    if (itemscourse[0] == '') course = `<div>Chưa tham gia khóa học nào</div>`
    else {
        for (let i in itemscourse) {
            let g = await getLoadCourse()
            for (let p in g) {
                if (g[p]['Mã khóa'] == itemscourse[i].split('-')[0]) {

                    let tiendo = g[p]['Tiến độ'].split('/')
                    let pay = ''
                    itemscourse[i].split('-')[1] == 'T' ? pay = ['#e8ffe6', 'Đã thanh toán'] : pay = ['#ffe1e1', 'Chưa thanh toán']
                    detailcourse +=
                        `<div class="row">
                            <p>${g[p]['Tên khóa học']}</p>
                            <p>${tiendo[1]}</p>
                            <p>${g[p]['Giá khóa']} vnđ</p>
                            <p>${pay[1]}</p>
                            <p class="thanhtoan" data-course='${f.ID + '|' + g[p]['Mã khóa']}'><i class="fa-solid fa-qrcode"></i></p>
                        </div>`
                    tiendo = Math.floor(Number(tiendo[0]) / Number(tiendo[1]) * 100)
                    course +=
                        `<div data-id="${g[p]['Mã khóa']}" class="Course" style="background-color: ${pay[0]}">
                            <p  >${g[p]['Tên khóa học']} / Tiến độ: ${tiendo}% / ${g[p]['Mã khóa']}</p>
                            <div><div style="width:${tiendo}%"></div></div>
                        </div>`
                    soluongc++
                    break
                }
            }
        }
        course +=
            `<div class="course_detail_pay">
                <i class="fa-solid fa-circle-info"></i>
                <p>Chi tiết học phí</p>
            </div>`
    }
    vam('#student-right_main>detail .course .lable span').innerText = '(' + soluongc + ')'
    vam('#student-right_main>detail .course .detail').innerHTML = course
    EventCourse(detailcourse, e, data)
    vams('#student-left>.list>.main>div').forEach(e => {
        e.onclick = () => {
            if (vam('#student-left>.list>.main>.ac')) vam('#student-left>.list>.main>.ac').classList.remove('ac')
            e.classList.add('ac')
            detailStudent(e, data)
        }
    })
    nav_root()
    vams('#student-right_main>detail .course .detail>.Course').forEach(t => {
        t.onclick = () => {
            SetAttribute('.load', 'style', 'display:display:block')
            vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
            vam('.sidebar__item[get-data="book"]').classList.add('sidebar__item--actived')
            CourseMain()
        }
    })
    vam('#student-right_main>detail .avt>img').onclick = () => {
        SetAttribute('#popup', 'style', 'display:block')
        SetAttribute('.popup_main', 'style', 'width:max-content')
        vam('.popup_background').onclick = () => {
            vam('#popup').setAttribute('style', 'display:none')
        }
        vam('.popup_main').innerHTML =
            `<div id="avtStudent_popup">
                <img src="${vam('#student-right_main>detail .avt>img').src}">
            </div>`
    }
    vams('#student-right_main>detail .lable').forEach(t => {
        t.onclick = () => {
            if (!vam(`.${t.getAttribute('data')}>.detail.hien`)) vam(`.${t.getAttribute('data')}>.detail`).classList.add('hien')
            else vam(`.${t.getAttribute('data')}>.detail`).classList.remove('hien')
        }
    })
}
function handleFileUpload(event) {
    const files = event.target.files;
    let wrap = vam('.course_cre_1_box>.img')
    // Kiểm tra xem đã có đủ 6 ảnh chưa
    if (wrap.children.length + files.length > 7) {
        alert(`You can only upload a maximum of ${6} images.`);
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        wrap.innerHTML += `<img src="${imageUrl}" >`

        // Nếu đã đủ 6 ảnh thì dừng lại
        if (wrap.children.length === 7) {
            break;
        }
    }
    vam('#file-input').onchange = (event) => {
        handleFileUpload(event)
    }
}
function addIMGProject(src) {
    vam('.course_cre_1_box.project .img').innerHTML += `<div class="img"><img src="${src}"></div>`
    return
}

function EventCourse(detailcourse, e, data) {
    vam('#student-right_main>detail .course_detail_pay').onclick = () => detailpay(detailcourse, e, data)
    vam('#back').onclick = () => {
        vam('#back').remove()
        e.classList.remove('ac')
        SetAttribute('#student-right_main>detail', 'style', 'display:none')
        SetAttribute('#student-right_main>.sum', 'style', 'display:block')
        vam('#student-right>.nav h1').innerText = 'Tổng quan học sinh'
    }
}

function detailpay(detailcourse, e, data) {
    SetAttribute('#popup', 'style', 'display:block')
    SetAttribute('.popup_main', 'style', 'width:1100px')
    vam('.popup_background').onclick = () => {
        detailStudent(e, data)
        vam('#popup').setAttribute('style', 'display:none')
    }
    vam('.popup_main').innerHTML =
        `<div id="form_popup">
                                <h1>Chi tiết học phí</h1>
                                <div class="row col">
                                    <p>Tên khóa học</p>
                                    <p>Số tiết</p>
                                    <p>Số tiền nợ</p>
                                    <p>Trạng thái</p>
                                    <p>Thanh toán</p>
                                </div>
                                ${detailcourse}
                            </div>`
    if (vam('#form_popup>.row')) {
        attachClickEventToThanhtoanElements(detailcourse, e, data)
    }
}

function attachClickEventToThanhtoanElements(detailcourse, e, data) {
    vams('#form_popup>.row>.thanhtoan').forEach(t => {
        t.onclick = () => {
            let datac = t.getAttribute('data-course').split('|')
            vam('body').innerHTML +=
                `<div id="xn_pay">
                    <div class="xn_pay-main">
                        <div id="form">
                            <h1>Xác nhận thanh toán khóa ${datac[1]}</h1>
                            <p>Mã học sinh: ${datac[0]}</p>
                            <p>Số tiền cần thanh toán: 2.500.000</p>
                            <p>Phương thức thanh toán: <select id="xn_pttt">
                                <option>Chuyển khoản</option>
                                <option>Tiền mặt</option>
                            </select></p>
                            <p>Chọn voicher: <input id="buybyVoucher" type="text"></p>
                            <button class="xn_pay-button">Xác nhận thanh toán</button>
                        </div>
                    </div>
                    <div class="xn_pay-background"></div>
                </div>`
            vam('#xn_pay .xn_pay-button').onclick = () => {
                SetAttribute('.load', 'style', 'display:block')
                let pttt = vam('#xn_pttt').value
                let vocher = vam('#buybyVoucher').value
                let urlds = 'https://script.google.com/macros/s/AKfycbyvw7UPlLZukka-lpj-oZMl-rb6hL79yGTEThZYdx3xkrBEcUBCwkW_kNf028J0BZhA/exec'
                fetch(`${urlds}?pttt=${pttt}&idcourse=${datac[1]}&idstudent=${datac[0]}&vocher=${vocher}`, { method: 'Get' })
                    .then(response => response.json())
                    .then((datar) => {
                        if (datar.status == 'success') {
                            SetAttribute('.load', 'style', 'display:none')
                            alert(datar.message)
                            detailpay(detailcourse, e, data)
                            vam('#xn_pay').remove()
                        } else {
                            alert(datar.message)
                            SetAttribute('.load', 'style', 'display:none')
                        }
                    })
                    .catch(error => alert('Lỗi: ' + error));
            }
            vam('#xn_pay>.xn_pay-background').onclick = () => {
                detailpay(detailcourse, e, data)
                vam('#xn_pay').remove()
            }
        }
    })
}

function ListStudent(data) {
    vam('#student-right_main>.sum>h4').innerText = data.length
    let nghihoc = 0
    let bienhoa = 0
    let longthanh = 0
    data.forEach(e => {
        if (e.ID != '') {
            if (e.PhoneMom == '') e.PhoneMom = 'Không có sđt'
            vam('#student-left>.list>.main').innerHTML +=
                `<div data-id="${e.ID}" data-phone="${e.PhoneMom}" data-name="${e.Name}">
                <p><img src="${e.avt}"></p>
                <p>${e.ID}</p>
                <p>${e.Name}</p>
                <p>${e.PhoneMom}</p>
            </div>`
        }
        if (e.Status == 'Nghỉ học') nghihoc++
        e.area.trim() == 'Biên Hòa' ? bienhoa++ : longthanh++
    });
    vam('#student-right_main>.sum>p>.nghihoc').innerText = nghihoc + ' học sinh đã nghỉ học'
    SetAttribute('#student-right_main>.sum .lt', 'style', `width: ${(longthanh / (bienhoa + longthanh)) * 100}%`)
    vam('#student-right_main>.sum .detail_lt>p').innerText = `Tổng ${longthanh} học sinh`
    vam('#student-right_main>.sum .detail_bh>p').innerText = `Tổng ${bienhoa} học sinh`
}