$(function(){
    $('#slider div:gt(0)').hide();
    setInterval(function(){
        $('#slider div:first-child').fadeOut(1000)
        .next('div').fadeIn(1000)
        .end().appendTo('#slider');
    },4000);
})