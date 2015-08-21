$(document).ready(function () {
    $('.trigger').click(function () {
        $('#meetup-' + $(this).attr('id')).toggle('slow');
        //$('div#yellow-box').toggle('slow');
        return false;
    });
});