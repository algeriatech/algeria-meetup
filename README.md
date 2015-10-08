[Algiers Developers Meetup](http://algiers-meetup.org/) is a community-driven events about software, web and mobile technologies. Meetups are held every month around a given topic related to programming.

# Development
When adding, modifying or deleting assets (images, javascript or css)., Gulp tasks are ready to help.
Just run `gulp watch` and Gulp will watch for changes in the `assets` folder, that is: `scss` or `javascript` files.
At any change, the sass will be compiled, vendor-prefixed, minified and concatenated. JS files will be concatenated and minified.
You can find all the build process config in the `build-config.js` file.

# Ready For Production
Once modifications are finished and the website is ready for production. Runnning:
```
$ gulp bundle
```
Will:
    - Compile Scss files, vendor-prefix, minify and concatenate them.
    - Concatenate JS files, and minify them.
    - Optimize any images (gif, jpeg, jpg and png) in the `build-config.js#paths.images.src` folder and send them to the `build-config.js#paths.images.dest` folder for production.

And you're ready to go!


## Notes:
    - I removed jQuery, and Bootstrap.
    - All front-end vendors are now handleled by Bower. All are installed in the 'vendors' folder. (See: `.bowerrc`)
    - All meetings rendering is now handeled by Handlebars JS library.

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
                speakers:
                    speaker_1:
                        fullname: Speaker's firstname & lastname
                        link: Speaker's blog url, twitter, ...
                        position: Speaker current job
```