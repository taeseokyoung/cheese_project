$(document).ready(function () {

    $('#card_area').on('click', '.card_txt, .card_img', function () {
        let object_id = this.name
        $('#popupd_iframe').attr('src', '/popupd/' + member_num + '/' + object_id);
        $('html, body').css({
            'overflow': 'hidden'
        });
        $('#popupd').fadeIn(300);
    })

    $('#close_popupd').click(function () {
        $('html, body').css({
            'overflow': 'auto'
        });
        $('#popupd').fadeOut(300);
    })

})


$(function () {
    $('#plus').on("click", function () {
        console.log("hello")
    })
})