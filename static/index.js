
$(document).ready(function () {
    $('.planet').slick({
        infinite: true,
        pauseOnHover: true,
        centerMode: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
});
