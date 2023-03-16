
$(document).ready(function () {
    if (object_id == '0') {
        $('#delete').hide()
        $('#edit').hide()
    } else {
        $('#add').hide()
        edit_card_detail_set()
    }

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
        $('#name').text('양기철')
    }

    $('#preview').on('click', function () {
        let img_url = $('#img_url_input').val()
        $('#image_box').attr('src', img_url)
    })

    $('#add').on('click', function () {
        add_card();
    })

    $('#add').on('click', function () {
        add_card();
    })
})

function add_card() {
    event.preventDefault();

    let card_title = $('#title_input').val()
    let card_text = $('#text_input').val()
    let card_img = $('#img_url_input').val()

    let formData = new FormData();
    formData.append("member_num_give", member_num);
    formData.append("card_title_give", card_title);
    formData.append("card_text_give", card_text);
    formData.append("card_img_give", card_img);

    fetch('/card', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
        //console.log(data)
        alert(data['msg'])
        if (data['reload'] == '1') {
            window.parent.parent.re_load();
        }
    });
}

function edit_card_detail_set() {
    fetch(`/detail/${member_num}?object_id=${object_id}`).then((res) => res.json()).then((data) => {
        let rows = data['card']
        let card_title = rows['card_title']
        let card_text = rows['card_text']
        let card_img = rows['card_img']

        $('#title_input').val(card_title)
        $('#text_input').val(card_text)
        $('#img_url_input').val(card_img)
        $('#image_url').attr('src', card_img)
    })
}