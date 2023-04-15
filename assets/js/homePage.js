// {
//     let createPost = function () {
//         let newPostForm = $('#post-create');
//         newPostForm.submit((e) => {
//             e.preventDefault();

//             jQuery.ajax({
//                 type: 'post',
//                 url: '/post/create',
//                 data: newPostForm.serialize(),
//                 success: function (data) {
//                     console.log(data);
//                 },
//                 error: function (err) {
//                     console.log(err.responseText);
//                 }
//             })
//         });
//     }
//     createPost();
// }