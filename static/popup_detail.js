
$(document).ready(function () {
    get_card_detail()
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
        $('#img_url').attr('src', card_img).on('error', function () {
            $(this).attr('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pleiades_large.jpg/1920px-Pleiades_large.jpg');
        });
    })
}