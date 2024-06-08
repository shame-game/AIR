function listclass(data) {
    let items = ''
    data.forEach((t) => {
        items +=
            `<div class="checkin_class">
                <img src="https://lh3.googleusercontent.com/d/1xaA7E-XNGzEI9SsfY4i1k9CgjRjMiqKF">
                <div class="chechin_more" >
                    <div class="class_more">
                        <i class="bi bi-three-dots-vertical"></i>
                    </div>
                    <div class="class_more-content">
                        <p class="checking_diemdanh" data-class="${t['NameClass']}">Điểm danh</p>
                        <p class="checking_danhsachlop" data-class="${t['NameClass']}">Danh sách lớp</p>
                        <p class="checking_detail" data-class="${t['NameClass']}">Thông tin lớp</p>
                    </div>
                </div>
                <div class="checkin_class-content">
                    <h1>Lớp: <span>${t['NameClass']}</span></h1>
                    <p>Số học sinh: <span>12</span> học sinh</p>
                    <p>Khóa: <span>20${t['Semester']}</span></p>
                </div>
            </div>`
    })
    return items
}


// Điểm danh lớp
function listStudent(data, g) {
    let items = ''
    // Hiển thị giao diện điểm danh
    function getf(datas, int, kh) {
        if (vam('.diemdanh_listStudent>div') != null) {
            vam('.diemdanh_listStudent>div').innerHTML +=
                `<div class="diemdanh_Student" data-kh="${kh}">
                <p>${datas[0]['ID']}</p>
                <p style="flex:1">${datas[0]['Name']}</p>
                <p style="flex:1"></p>
                <input id="getbool_checkin" value="true" name="bool${int}" type="radio" style="accent-color: #009d3c;">
                <input value="false" name="bool${int}" type="radio" checked>
            </div>`
        }
        else {
            vam('.quanlylop_listStudent>div').innerHTML +=
                `<div class="diemdanh_Student">
                <p>${datas[0]['ID']}</p>
                <p style="flex:1">${datas[0]['Name']}</p>
                <p style="flex:1"></p>
                <input id="getbool_checkin" value="true" name="bool${int}" type="radio" style="accent-color: #009d3c;">
                <input value="false" name="bool${int}" type="radio" checked>
            </div>`
        }
    }
    data.forEach((t) => {
        let idclass = t['ID']
        if (t['NameClass'] == g) {
            let i = 0
            fetchSheet
                .fetch({
                    gSheetId: idclass,
                    wSheetName: 'Trang tính1'
                }).then((khoahoc) => {
                    const keysWithValue2 = [];
                    for (let key in khoahoc[0]) {
                        if (khoahoc[0][key] == 2) {
                            keysWithValue2.push(key);
                        }
                    }
                    fetchSheet
                        .fetch({
                            gSheetId: idclass,
                            wSheetName: keysWithValue2
                        }).then((rows) => {
                            Object.values([rows[0]]).forEach((t) => {
                                async function processKeys(t, idclass) {
                                    for (const j of Object.keys(t)) {
                                        if (j.slice(0, 2) === 'AI') {
                                            console.log(j);
                                            const gh = j;
                                            let h = [];

                                            async function gsd() {
                                                try {
                                                    const detail_Student = await fetchSheet.fetch({
                                                        gSheetId: idclass,
                                                        wSheetName: gh
                                                    });
                                                    h = h.concat(detail_Student);
                                                    getf(h, i, keysWithValue2);
                                                    i++;
                                                } catch (error) {
                                                    console.error('Error fetching sheet:', error);
                                                }
                                            }

                                            await gsd();
                                        }
                                    }
                                }
                                processKeys(t, idclass);
                            });
                        })
                })
        }
    })
    return ''
}

function AddClass() {
    vam('#addclass').onclick = () => {
        vam('#popup').setAttribute('style', 'display:block')
        vam('.popup_background').onclick = () => {
            vam('#popup').setAttribute('style', 'display:none')
        }
    }
    vam('.popup_main').innerHTML =
        `
    <div>
        <form id="addClass">
            <input name="nameclass" type="text" placeholder="Tên Lớp">
        </form>
        <button id="add_class">Thêm Lớp</button>
    </div>
    `
    vam('#add_class').onclick = () => {
        let nameclass = vam('#addClass>input[name="nameclass"]').value
        var url = urld + "?" + `clas=${nameclass}&action=AddClass`;
        fetch(url, {
            method: 'GET'
        }).then(
            (response) => {
                if (response.ok) {

                } else {
                    console.log('Bị lỗi trong giai đoạn tạo lớp');
                }
            }
        )
    }
    vams('.checkin_in').forEach((t) => {
        t.onclick = () => {
            fetchSheet
                .fetch({
                    gSheetId: `${t.getAttribute('data-class')}`,
                    wSheetName: 'Điểm danh'
                }).then((rows) => {
                    console.log(rows);
                })
        }
    })
}
