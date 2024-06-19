let url = 'https://script.google.com/macros/s/AKfycbxNzpRIS3AWT_cXYCSiXMF4R1np-XOYzz5KewhpxSvKYRRJrdgxhf-v1e9fCAY0wR0e/exec'
function Check() {
    let currentUrl = window.location.href;
    if (currentUrl == 'http://127.0.0.1:5500/' || currentUrl == 'http://127.0.0.1:5500/Parents/') {
        if (getCookie("vamnaone")) {
            fetch(`${url}?user=${getCookie("vamnaone").split('|')[1]}&token=${getCookie("vamnaone").split('|')[0]}&type=${getCookie('type')}&action=check`, { method: 'Get' })
                .then(response => response.json())
                .then((data) => {
                    if (data.status != 'success') {
                        window.location.href = "http://127.0.0.1:5500/Login/"
                    }
                })
                .catch(error => alert('Lỗi: ' + error));
        } else {
            window.location.href = "http://127.0.0.1:5500/Login/"
        }
    }
}

function getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}



if (document.querySelector('.logout')) {
    document.querySelector('.logout').onclick = () => {
        h = 0
        document.cookie = 'vamnaone' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = "http://127.0.0.1:5500/Login/"
    }
}


