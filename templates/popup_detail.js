
$(document).ready(function () {

})

function get_card_detail() {

    fetch(`/detail/${member_num}/${object_id}`).then((res) => res.json()).then((data) => {
        let rows = data['card']
        let card_title = rows['card_title']
        let card_text = rows['card_text']
        let card_img = rows['card_img']
        let time = rows['time']

        $('#title').text(card_title)
        $('#text').text(card_text)
        $('#time').text(time)
        $('#image_url').attr('src', card_img).on('error', function () {
            $(this).attr('src', 'https://p4.wallpaperbetter.com/wallpaper/994/256/1002/space-stars-nebula-the-pleiades-wallpaper-preview.jpg');
        });
    })
}