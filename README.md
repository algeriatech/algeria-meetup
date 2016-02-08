[Algiers Developers Meetup](http://algiers-meetup.org/) is an event-driven community about software, web and mobile technologies. Meetups are held every month around a given topic related to programming.


### How to add a new meetup?
Informations about meetups comes from a YAML file ```meetups.yml```. You should follow the following Yaml configuration to add meetups informations,

```yaml
    -
        title: Main topic of the meetup
        location: Algiers
        date: January 1st 2016
        current: true
        presentations:
            presentation_1:
                title: Presentation title
                level: [beginners|intermediates|advanced|experts]
                slides: http://my_presentation
                speakers:
                    speaker_1:
                        fullname: Speaker's firstname & lastname
                        link: Speaker's blog url, twitter, ...
                        position: Speaker current job
````