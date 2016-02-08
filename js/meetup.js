$(document).ready(function () {
    var i = 1;
    $.get( "./meetups.yml", function( data ) {
        var doc = jsyaml.load(data);

        $.each(doc.meetups, function( key, value ) {
            var display = (value.current != true) ? ' style="display:none;"': '';
            $('#meetups').append(
                '<br/><li><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>' +
                '<a href="#" id="'+ i +'" class="trigger">'+ value.title +' - ' + value.location + ', '+ value.date +'</a>' +
                '<div id="meetup_'+ i +'"' + display + '></br><table><tbody>'
            );

            var j = 1;
            $.each(value.presentations, function( key, value ) {
                var slides = (undefined == value.slides) ? ' ' : ' <a href="' + value.slides + '" target="_blank">(slides)</a>';
                var level = (undefined == value.level) ? ' ' : ' for <b>' + value.level + '</b>';
                var demo = (undefined == value.demo) ? ' ' : ' <a href="' + value.demo + '" target="_blank">(demo)</a>';

                $('#meetup_' + i + ' table tbody').append('<tr><td id="meetup_' + i + '_speaker_' + j + '_picture"></td>' +
                    '<td><i><b>' + value.title + slides + demo + '</b>' + level + '</i><p id="meetup_' + i + '_speaker_' + j + '_info"></p></td></tr>'
                );

                $.each(value.speakers, function (key, value ) {
                    $('#meetup_'+ i +'_speaker_'+ j + '_picture').append('<center><img src="./images/meetups/speakers/' + value.fullname.replace(/ /g, '_').toLowerCase()+'.jpg" class="speaker img-circle"/></center>');
                    $('#meetup_'+ i +'_speaker_'+ j + '_info').append('<a href="' + value.link +'">'+ value.fullname +'</a> - <b>' + value.position +'</b></br>');
                })
                j++;
            });
            i++;

            $('#meetups').append('</tbody></table></div></li>');
        });

        $('.trigger').click(function () {
            $('#meetup_' + $(this).attr('id')).toggle('slow');

            return false;
        });
    });
});
