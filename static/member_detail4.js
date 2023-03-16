
$(document).ready(function () {
    get_card();

    // popup_detail.html 팝업창을 띄우는 부분 (카드 상세보기 띄우기)
    $('#card_area').on('click', '.open_card', function () {
        let object_id = this.id
        $('#popupd_iframe').attr('src', '/popupd/' + member_num + '/' + object_id);
        $('html, body').css({
            'overflow': 'hidden'
        });
        $('#popupd').fadeIn(300);
    })

    // popup_detail.html 팝업창을 닫는 부분 (카드 상세보기 닫기)
    $('#close_popupd').click(function () {
        $('html, body').css({
            'overflow': 'auto'
        });
        $('#popupd').fadeOut(300);
    })

    // popup_password.html 팝업창을 띄우는 부분 (비밀번호 확인창 띄우기)
    $('.open_popupp').click(function () {
        $('#popupp_iframe').attr('src', '/popupp/' + member_num + '/0');
        $('html, body').css({
            'overflow': 'hidden'
        });
        $('#popupp').fadeIn(300);
    })

    // popup_password.html 팝업창을 닫는 부분 (비밀번호 확인창 닫기)
    $('#close_popupp').click(function () {
        $('html, body').css({
            'overflow': 'auto'
        });
        $('#popupp').fadeOut(300);
    })
})

function hide_close_btn() {
    $('#close_popupp').hide()
}

function show_close_btn() {
    $('#close_popupp').show()
}

function re_load() {
    window.location.reload();
}

function get_card() {
    $('#card_area').empty()

    fetch(`/card?num=${member_num}`).then((res) => res.json()).then((data) => {
        let rows = data['card_list']
        rows.forEach((a) => {
            let card_title = a['card_title']
            let card_text = a['card_text']
            let card_img = a['card_img']
            let object_id = a['_id']

            let temp_html = `<div id="${object_id}" class="card_img open_card">
                                    <a href="#">
                                        <img style="width: 302.5px; height: 302.5px; object-fit:cover;"
                                            src="${card_img}" alt="">
                                    </a>
                                </div>
                                <div id="${object_id}" class="card_txt open_card">
                                    <a href="#">
                                        <h3>${card_title}</h3>
                                        <p>${card_text}</p>
                                    </a>
                                </div>`
            $('#card_area').prepend(temp_html)
        })
    })
}