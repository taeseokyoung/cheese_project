
// $(document).ready(function () {
//     if (object_id == '0') {
//         $('#delete').hide()
//         $('#edit').hide()
//     } else {
//         $('#add').hide()
//     }

//     if (member_num == 1) {
//         $('#name').text('임재훈')
//         $('#profile_img').attr('src', '/static/planet_01.png')
//     } else if (member_num == 2) {
//         $('#name').text('나명흠')
//         $('#profile_img').attr('src', '/static/planet_02.png')
//     } else if (member_num == 3) {
//         $('#name').text('태서경')
//         $('#profile_img').attr('src', '/static/planet_03.png')
//     } else if (member_num == 4) {
//         $('#name').text('노탁근')
//         $('#profile_img').attr('src', '/static/planet_04.png')
//     } else if (member_num == 5) {
//         $('#name').text('이지훈')
//         $('#profile_img').attr('src', '/static/planet_05.png')
//     } else {
//         $('#name').text('양기철')
//     }
// })

// function get_card_detail() {

//     fetch(`/detail/${member_num}/${object_id}`).then((res) => res.json()).then((data) => {
//         let rows = data['card']
//         let card_title = rows['card_title']
//         let card_text = rows['card_text']
//         let card_img = rows['card_img']
//         let time = rows['time']

//         $('#title').text(card_title)
//         $('#text').text(card_text)
//         $('#time').text(time)
//         $('#image_url').attr('src', card_img).on('error', function () {
//             $(this).attr('src', 'https://p4.wallpaperbetter.com/wallpaper/994/256/1002/space-stars-nebula-the-pleiades-wallpaper-preview.jpg');
//         });
//     })
// }