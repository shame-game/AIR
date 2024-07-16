function LoadAll(data) {
    vam('#main').innerHTML =
        `<div id="all" class="Wrap_Main">
            <div id="all-nav" class="Wrap_Nav">
                <h1 class="nav-title">Tổng quan </h1>
            </div>
            <div id="all-main">
                <div id="all-cs-ce-ts">
                    <div id="all-cs-ce-ts_left">
                        <div id="all-cs_wrap">
                            <div class="box_wrap" id="click-student">
                                <div>
                                    <div class="text">
                                        <h1>12</h1>
                                        <p>Học sinh</p>
                                    </div>
                                    <div class="icon">
                                        <i class="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="box_wrap">
                                <div>
                                    <div class="text">
                                        <h1>12</h1>
                                        <p>Lớp học</p>
                                    </div>
                                    <div class="icon">
                                        <i class="fa-solid fa-users"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="box_wrap">
                                <div>
                                    <div class="text">
                                        <h1>9</h1>
                                        <p>Giáo viên</p>
                                    </div>
                                    <div class="icon">
                                        <i class="fa-solid fa-chalkboard-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="box_wrap">
                                <div>
                                    <div class="text">
                                        <h1>15</h1>
                                        <p>Khóa học</p>
                                    </div>
                                    <div class="icon">
                                        <i class="fa-solid fa-book"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="all-ts_wrap">
                            <div class="main-wrap">
                                <h1>Thông tin tuyển sinh</h1>
                                <canvas id="myChart" style="heigt:600px"></canvas>
                            </div>
                        </div>
                    </div>
                    <div id="all-cs-ce-ts_right">
                        <div id="all-ce_wrap">
                            <div class="main-wrap">
                                <h1>Lịch dạy</h1>
                                <div>
                                    <div>
                                        <h4>Ngày 09/07/2024</h4>
                                        <div class="celender-wrap">
                                            <p>Không có lịch dạy</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4>Ngày 10/07/2024</h4>
                                        <div class="celender-wrap">
                                            <p>Phòng Lab-C1 | 8:00 - 11:00 | SL2</p>
                                            <p>Phòng Lab-C2 | 8:00 - 11:00 | TC1</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4>Ngày 11/07/2024</h4>
                                        <div class="celender-wrap">
                                            <p>Không có lịch dạy</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    LoadMap(data)
    vam('#click-student').onclick = () => {
        vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
        vam('.sidebar__item[get-data="student"]').classList.add('sidebar__item--actived')
        GetStudent()
    }
}

function LoadMap(data) {
    let dataChamSoc = []
    let dataTuongTac = []
    let dataHocThu = []
    let dataTuChoi = []
    data.forEach((t) => {
        if (t['Ngày'] >= '07/07/2024' && t['Ngày'] <= '10/07/2024') {
            if (t['Kịch bản - Sale - Bot'] == 'Gửi kết bạn') {
                if (dataChamSoc[t[`Ngày`]]) {
                    dataChamSoc[t[`Ngày`]]++
                }
                else {
                    dataChamSoc[t[`Ngày`]] = 1
                }
            } else if (t['Kịch bản - Sale - Bot'] == 'Đồng ý học thử') {
                if (dataHocThu[t[`Ngày`]]) {
                    dataHocThu[t[`Ngày`]]++
                }
                else {
                    dataHocThu[t[`Ngày`]] = 1
                }
            } else if (t['Kịch bản - Sale - Bot'] == 'Từ Chối') {
                if (dataTuChoi[t[`Ngày`]]) {
                    dataTuChoi[t[`Ngày`]]++
                }
                else {
                    dataTuChoi[t[`Ngày`]] = 1
                }
            } else if (t['Kịch bản - Sale - Bot'] == 'Đang chăm sóc chưa là bạn' || t['Kịch bản - Sale - Bot'] == 'Đang chăm sóc đã là bạn') {
                if (dataTuongTac[t[`Ngày`]]) {
                    dataTuongTac[t[`Ngày`]]++
                }
                else {
                    dataTuongTac[t[`Ngày`]] = 1
                }
            }
            if (!dataHocThu[t[`Ngày`]]) {
                dataHocThu[t[`Ngày`]] = 0
            }
            if (!dataTuChoi[t[`Ngày`]]) {
                dataTuChoi[t[`Ngày`]] = 0
            }
            if (!dataChamSoc[t[`Ngày`]]) {
                dataChamSoc[t[`Ngày`]] = 0
            }
            if (!dataTuongTac[t[`Ngày`]]) {
                dataTuongTac[t[`Ngày`]] = 0
            }
        }
    })
    let day = []
    let soLuongDataCS = []
    let soLuongDataDY = []
    let soLuongTuChoi = []
    let soLuongTuongTac = []
    Object.keys(dataChamSoc).forEach((key) => {
        day = day.concat(key)
        soLuongDataCS = soLuongDataCS.concat(dataChamSoc[key]);
    })
    Object.keys(dataHocThu).forEach((key) => {
        soLuongDataDY = soLuongDataDY.concat(dataHocThu[key]);
    })
    Object.keys(dataTuChoi).forEach((key) => {
        soLuongTuChoi = soLuongTuChoi.concat(dataTuChoi[key]);
    })
    Object.keys(dataTuongTac).forEach((key) => {
        soLuongTuongTac = soLuongTuongTac.concat(dataTuongTac[key]);
    })
    const labels = day;
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Số data gửi kết bạn',
                    data: soLuongDataCS,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    fill: false
                },
                {
                    label: 'Số data phản hồi thành công',
                    data: soLuongDataDY,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 1)',
                    fill: false
                },
                {
                    label: 'Số data phản hồi thất bại',
                    data: soLuongTuChoi,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    fill: false
                },
                {
                    label: 'Số data có tương tác',
                    data: soLuongTuongTac,
                    borderColor: '#2c57e3',
                    backgroundColor: '#2c57e3',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Ngày'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Số lượt'
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: false
                }
            },
            backgroundColor: 'rgba(255, 255, 255, 0.8)' // Thêm màu nền
        }
    });
    SetAttribute('.load', 'style', 'display:none')
}