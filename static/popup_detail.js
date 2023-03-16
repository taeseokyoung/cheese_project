
$(document).ready(function () {
    get_card_detail();
    member_name();

    $('#edit').on('click', function () {
        $('#popupp_iframe').attr('src', "/popupp?member_num=" + member_num + "&object_id=" + object_id);
        $('html, body').css({
            'overflow': 'hidden'
        });
        $('#popupp').fadeIn(300);
        window.parent.hide_popupd_close_btn();
    })

    $('#close_popupp').click(function () {
        $('html, body').css({
            'overflow': 'auto'
        });
        $('#popupp').fadeOut(300);
        window.parent.show_popupd_close_btn()
    })
})

function hide_popupp_close_btn() {
    $('#close_popupp').hide()
}

function show_popupp_close_btn() {
    $('#close_popupp').show()
}

function re_load() {
    window.location.reload();
}

function member_name() {
    if (member_num == 1) {
        $('#name').text('임재훈')
        $('#profile_img').attr('src', '/static/planet_01.png')
    } else if (member_num == 2) {
        $('#name').text('나명흠')
        $('#profile_img').attr('src', '/static/planet_02.png')
    } else if (member_num == 3) {
        $('#name').text('태서경')
        $('#profile_img').attr('src', '/static/planet_03.png')
    } else if (member_num == 4) {
        $('#name').text('노탁근')
        $('#profile_img').attr('src', '/static/planet_04.png')
    } else if (member_num == 5) {
        $('#name').text('이지훈')
        $('#profile_img').attr('src', '/static/planet_05.png')
    } else {
        $('#name').text('양기철 매니저')
        $('#profile_img').attr('src', '/static/planet_06.png')
    }
}

function get_card_detail() {
    fetch(`/detail/${member_num}?object_id=${object_id}`).then((res) => res.json()).then((data) => {
        let rows = data['card']
        let card_title = rows['card_title']
        let card_text = rows['card_text']
        let card_img = rows['card_img']
        let time = rows['time']

        $('#title').text(card_title)
        $('#text').text(card_text)
        $('#time').text(time)
        $('#image_url').attr('src', card_img).on('error', function () {
            if (member_num == 1) {
                $(this).attr('src', 'https://images.unsplash.com/photo-1529773464063-f6810c569277?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2535&q=80');
            } else if (member_num == 2) {
                $(this).attr('src', 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/w0d/image/7S0wNt9KD5aZx5oAQNQfu4MG0EQ.jpg');
            } else if (member_num == 3) {
                $(this).attr('src', 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3BhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60');
            } else if (member_num == 4) {
                $(this).attr('src', 'https://p4.wallpaperbetter.com/wallpaper/994/256/1002/space-stars-nebula-the-pleiades-wallpaper-preview.jpg');
            } else if (member_num == 5) {
                $(this).attr('src', '');
            } else {
                $(this).attr('src', '');
            }
        });
    })
}