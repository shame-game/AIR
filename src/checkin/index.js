function listclass(data) {
    let items = ''
    data.forEach((t) => {
        items +=
            `<div class="checkin_class">
                <img src="https://lh3.googleusercontent.com/d/1xaA7E-XNGzEI9SsfY4i1k9CgjRjMiqKF">
                <div class="checkin_more">
                    <button class="checkin_in" data-class="${t['ID']}">Điểm danh</button>
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
