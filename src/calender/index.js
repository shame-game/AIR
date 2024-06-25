
function CalendarNav(data) {
    vam('#main').innerHTML =
        `<div id="calender" class="Wrap_Main">
            <div id="calender-nav" class="Wrap_Nav">
                <h1 class="nav-title">Lịch dạy</h1>
            </div>
            <div id="calender-learn" class="Wrap_Content">
                <div id="celender_more">
                    <div id="CreateCelender">Xem lịch dạy</div>
                </div>
                <div id="LearnToday">
                    <div id="LearnToday_nav">
                        <h1>Danh sách các bài học hôm nay</h1>
                    </div>
                    <div id="LearnToday_title">
                        <p>Ngày</p>
                        <p>Lớp</p>
                        <p>Số tiết</p>
                        <p>Phòng học</p>
                        <p>Thời gian</p>
                        <p>Khóa học</p>
                        <p>Điểm danh</p>
                    </div>
                    <div id="LearnToday_list"></div>
                </div>
            </div>
            <div id="checkin_wrap" style="display:none"></div>
            <div id="createCelender" style="display:none"></div>
        </div>`
    NowCelender(data)
}