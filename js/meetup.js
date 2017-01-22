function escapeAttribute(string) {
    return string.replace(/'/g, "&#39;");
}

function injectStyle(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

$(document).ready(function () {
    var i = 1;
    $.get( "./config.yml", function( data ) {
        var doc = jsyaml.load(data);

        // Render the HEAD (meta, title and description)
        if (doc.title) {
            document.title = doc.title;
        }
        if (doc.description) {
            $('#description').html(doc.description);
            $('meta[name=description]').remove();
            $('head').append( '<meta name="description" content="' + escapeAttribute(doc.description) + '">' );
        }
        if (doc.keywords) {
            $('meta[name=keywords]').remove();
            $('head').append( '<meta name="keywords" content="' + escapeAttribute(doc.keywords) + '">' );
        }

        // Render the links
        if (doc.links) {
            $('#social-links').empty();
            $.each(doc.links, function( key, link ){
                $('#social-links').append(
                    '<a href="' + escapeAttribute(link.url) + '" class="btn btn-social-icon btn-social">'+
                        '<i class="fa fa-' + escapeAttribute(link.icon) + '"></i>'+
                    '</a> '
                );
            });
        }

        // Render the talk proposal link
        if (doc.talkProposalForm) {
            $('#talk-proposal').html(
                '<a class="btn btn-default" href="' + escapeAttribute(doc.talkProposalForm) + '" role="button">Submit your Talk proposal here</a>'
            );
        }

        // Render the twitter timeline and follow button
        if (doc.twitter) {
            $('#twitter-integration').append(
                '<a class="twitter-timeline" data-lang="en" data-height="400" data-theme="light" data-link-color="#2B7BB9" href="https://twitter.com/' + doc.twitter + '">Tweets by ' + doc.twitter + '</a>'
            );
            $('#twitter-integration').append(
                '<a href="https://twitter.com/' + doc.twitter + '" class="twitter-follow-button" data-show-count="false">Follow @' + doc.twitter + '</a>'
            );
            twttr.widgets.load();
        }

        // Render the meetup images
        if (doc.images) {
            var urls = $.map(doc.images, function(image) {
                return 'url("./../images/' + image + '")';
            });
            injectStyle( '.background-image{ background-image: ' + urls.join(', ') +'; }' );
        }

        // Render the last meetup
        if (doc.meetups && doc.meetups.length) {
            var lastMeetup = doc.meetups[0];
            $('#next-meetup').append(
                '<h2>' + lastMeetup.title + '</h2>' +
                '<p>' + lastMeetup.date + ' at ' + lastMeetup.location + '</p>'
            );
        }

        // Render the meetups
        $.each(doc.meetups, function( key, value ) {
            var display = (value.current != true) ? ' style="display:none;"': '';
            $('#meetup-list').append(
                '<li><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> ' +
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
                    if (value.photo) {
                        $('#meetup_'+ i +'_speaker_'+ j + '_picture').append('<center><img src="./images/' + value.photo + '" class="speaker img-circle"/></center>');
                    }
                    $('#meetup_'+ i +'_speaker_'+ j + '_info').append('<a href="' + value.link +'">'+ value.fullname +'</a> - <b>' + value.position +'</b></br>');
                })
                j++;
            });
            i++;

            $('#meetup-list').append('</tbody></table></div></li>');
        });

        $('.trigger').click(function () {
            $('#meetup_' + $(this).attr('id')).toggle('slow');

            return false;
        });
    });

    // Load Manifesto content
    $.get('./content/manifesto.html', function(data) {
        $('div#manifesto').html(data).hide();
    });

    $('a.show').click(function() {
        $($(this).attr('href')).show();
        $('#meetups').hide();
    });
});
