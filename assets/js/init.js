(function() {
    var App = (function() {
        var prevMeetups = [], currentMeetup;

        var _renderNode = function(nodeId, context) {
            var targetNode = document.getElementById(nodeId),
                templateString = targetNode.getElementsByTagName('script')[0].innerHTML,
                template = Handlebars.compile(templateString);

            targetNode.innerHTML = template(context);
        };

        var _renderCurrentMeetup = function(meetup) {
            _renderNode('current-meetup-container', meetup);
        };

        var _renderPreviousMeetups = function(meetups) {
            _renderNode('prev-meetups-container', {meetups: meetups});
        };

        var initEventsListeners = function() {
            // # 1
            // Navigation bar toggeling on small viewports.
            document.getElementById('nav-show-trigger').addEventListener('click', function(e) {
                var linksNodeStyle = document.querySelectorAll('.nav-links')[0].style;
                if(linksNodeStyle.display === 'block') {
                    linksNodeStyle.display = 'none';
                } else {
                    linksNodeStyle.display = 'block';
                }

                e.preventDefault();
            }, false);
        };

        var renderMeetups = function(cb) {
            Qajax('/meetups.yml')
                .then(Qajax.filterSuccess)
                .get("responseText")
                .then(function (yamlString) {
                    var meetups = yaml.load(yamlString).meetups;

                    // Seperate the current meetup from the previousley-held meetups.
                    for(var i = 0; i<meetups.length; i++) {
                        if(meetups[i].current === true) {
                            currentMeetup = meetups[i];
                        } else {
                            prevMeetups.push(meetups[i]);
                        }
                    }

                    _renderCurrentMeetup(currentMeetup);
                    _renderPreviousMeetups(prevMeetups);
                });
        };

        return {
            initEventsListeners: initEventsListeners,
            renderMeetups: renderMeetups
        };
    })();


    // Kick-off the application.
    App.initEventsListeners();
    App.renderMeetups();
})();
