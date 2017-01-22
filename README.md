[Algeria Meetup](http://algiers-meetup.org/) is the tool used to generate the website for Algeria meetups

# Configuration

Copy `config.sample.yml` to `config.yml` and personalize the meetup's information. Note that all the images referenced in the config file, should live in the `images` folder

### How to add a new meetup?
Informations about meetups comes from the `meetups` secfiont of the `config.yml` file. You should follow the following Yaml configuration to add meetups informations,

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
                        photo: image-speaker.jpg
````

