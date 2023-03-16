$(document).ready(function () {

    // 우주 슬라이드 - 슬릭 슬라이드 사용

    $('.planet').slick({
        infinite: true,
        pauseOnHover: false,
        centerMode: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 400,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2
                }
            }
        ]
    });

});


// 방명록
$(document).ready(function () {
    show_content();
});
function show_content() {
    fetch('/guest').then((res) => res.json()).then((data) => {
        let rows = data['result'];
        $('.guest_card_area').empty()
        rows.forEach((a) => {
            let comment = a['comment']
            let name = a['name']
            let time = a['time']

            let temp_html = `
              <div class="guest_card">
                            <p class="guest_comment">${comment}</p>
                            <p class="guest_name">${name}</p>
                            <p class="guest_time">${time}</p>
                    </div>`

            $('.guest_card_area').prepend(temp_html)
        });
    })
}
function save_content() {

    let comment = $('.guest_comment').val()
    let name = $('.guest_name').val()

    let formData = new FormData();
    formData.append("comment_give", comment);
    formData.append("name_give", name);

    fetch('/guest', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        console.log(data);
        alert(data["msg"]);
        window.location.reload()
    });
}
