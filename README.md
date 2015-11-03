# Personal API

Here is the documentation for my Personal API. This project was originally inspired by [api.naveen.com](http://api.naveen.com) a couple of years ago and I finally brought my own personal API to life. The application itself is built on node.js and hosted on Heroku. You can view the [source code](http://github.com/mbmccormick/api) on GitHub.

## Resources

`GET /v0/profile/` - My basic information from Facebook

    {
        "name": "Matt McCormick",
        "gender": "male",
        "bithdate": "1990-07-05",
        "location": "Seattle, Washington",
        "hometown": "Oxford, Michigan",
        "relationship_status": "Married",
        "significant_other": "Libby McCormick"
    }

`GET /v0/profile/education/` - My education history from Facebook

    [
        {
            "type": "High School",
            "school": "Lake Orion High School",
            "year": "2008"
        },
        {
            "type": "College",
            "school": "Purdue University",
            "year": "2012"
        },
        ...
    ]

`GET /v0/profile/employment/` - My employment history from Facebook

    [
        {
            "position": "Program Manager",
            "employer": "Microsoft",
            "location": "Redmond, Washington",
            "start_date": "2013-02-28"
        },
        {
            "position": "IT Networks &amp; Telecommunications Programmer",
            "employer": "Purdue University",
            "location": "West Lafayette, Indiana",
            "start_date": "2011-08-01",
            "end_date": "2012-12-01"
        },
        ...
    ]

`GET /v0/activity/` - Summary of my recent activity from Fitbit

    {
        "steps": {
            "step_goal": 10000,
            "steps": 883
        },
        "sleep": {
            "sleeps": 1,
            "minutes_asleep": 418
        }
    }

`GET /v0/activity/steps/` - My step activity from Fitbit

    [
        {
            "date": "2015-07-17",
            "value": "6470"
        },
        {
            "date": "2015-07-16",
            "value": "10973"
        },
        ...
    ]

`GET /v0/activity/sleep/` - My sleep time (in minutes) from Fitbit

    [
        {
            "date": "2015-07-17",
            "value": "426"
        },
        {
            "date": "2015-07-16",
            "value": "427"
        },
        ...
    ]

`GET /v0/activity/workouts/` - My latest workouts (in meters and seconds) from Strava

    [
        {
            "dateTime": "2015-07-15T02:07:54.000Z",
            "name": "Burke-Gilman Trail",
            "type": "Run",
            "distance": 8131.2,
            "duration": 2660
        },
        {
            "dateTime": "2015-07-11T23:58:39.000Z",
            "name": "Cheshiahud Lake Union Loop",
            "type": "Run",
            "distance": 14369.9,
            "duration": 4307
        },
        ...
    ]

`GET /v0/body/weight/` - My body weight (in kilograms) from Fitbit

    [
        {
            "date": "2015-07-17",
            "value": "64.25"
        },
        {
            "date": "2015-07-16",
            "value": "64.73"
        },
        ...
    ]

`GET /v0/social/` - Summary of my recent activity from Twitter and GitHub

    {
        "twitter": {
            "tweets": 7960,
            "followers": 425,
            "following": 653,
            "favorited": 1998
        },
        "github": {
            "followers": 47,
            "following": 54,
            "repos": 92,
            "gists": 98
        }
    }

`GET /v0/social/twitter/` - My recent tweets from Twitter

    [
        {
            "dateTime": "2015-07-16T19:31:13.000Z",
            "text": "@TillamookCheese To whom should I speak about getting my dollar back? :("
        },
        {
            "dateTime": "2015-07-16T19:29:40.000Z",
            "text": "@TillamookCheese Your yogurt machine put an extra label on the INSIDE of my yogurt container... http://t.co/0WeNejrgqP"
        },
        ...
    ]

`GET /v0/social/github/` - My recent activity on GitHub

    [
        {
            "dateTime": "2015-07-14T23:19:53.000Z",
            "type": "Watch",
            "repo": "ahmetalpbalkan/personal-dashboard",
            "payload": {
                "action": "started"
            }
        },
        {
            "dateTime": "2015-07-14T17:37:00.000Z",
            "type": "Push",
            "repo": "name": "mbmccormick/fitminder",
            "payload": {
                "push_id": 725624162,
                "size": 1,
                "distinct_size": 1,
                "ref": "refs/heads/master",
                "head": "8164f881c6be08eb0cfe06b779a611a6265861a9",
                "before": "f606629586bb319757f32c0ce253febf98971509",
                "commits": [
                    {
                        "sha": "8164f881c6be08eb0cfe06b779a611a6265861a9",
                        "author": {
                            "email": "mbmccormick@outlook.com",
                            "name": "Matt McCormick"
                        },
                        "message": "Update routes.js",
                        "distinct": true,
                        "url": "https://api.github.com/repos/mbmccormick/fitminder/commits/8164f881c6be08eb0cfe06b779a611a6265861a9"
                    }
                ]
            }
        },
        ...
    ]

`GET /v0/blog/` - My recent blog posts

    [
        {
            "date": "2015-07-09",
            "title": "Fitminder - Fitbit Idle Alert",
            "url": "http://mbmccormick.com/2015/07/fitminder-fitbit-idle-alert"
        },
        {
            "date": "2015-06-10",
            "title": "vso.io - Short URL for Visual Studio Online work items",
            "url": "http://mbmccormick.com/2015/06/vso-io-short-url-for-visual-studio-online-work-items"
        },
        ...
    ]

`GET /v0/driving/` - My driving history (in seconds, meters, and gallons) from Automatic

    [
        {
            "dateTime": "2015-07-19T03:38:29.752Z",
            "duration": 689,
            "distance": 7016.77783203125,
            "mpg": 18.885939906364165,
            "fuelConsumption": 0.230861395597458,
            "hard_brakes": 0,
            "hard_accelerations": 0
        },
        {
            "dateTime": "2015-07-19T01:45:59.606Z",
            "duration": 1652,
            "distance": 18006.5,
            "mpg": 20.44223156805237,
            "fuelConsumption": 0.547334969043732,
            "hard_brakes": 0,
            "hard_accelerations": 0
        },
        ...
    ]


## Deployment

This Personal API project can be deployed to pretty much any cloud hosting provider that supports node.js web applications. My personal instance is deployed to Heroku. Regardless of which hosting provider you choose, you will need to supply server-side values for the following configuration settings:

`AUTOMATIC_ACCESS_TOKEN` - Automatic.com Access Token

`AUTOMATIC_CONSUMER_KEY` - Automatic.com Consumer Key

`AUTOMATIC_CONSUMER_SECRET` - Automatic.com Consumer Secret

`FACEBOOK_ACCESS_TOKEN` - Facebook.com Access Token

`FITBIT_ACCESS_TOKEN` - Fitbit.com Access Token

`FITBIT_CONSUMER_KEY` - Fitbit.com Consumer Key

`FITBIT_CONSUMER_SECRET` - Fitbit.com Consumer Secret

`FITBIT_TOKEN_SECRET` - Fitbit.com Token Secret

`STRAVA_ACCESS_TOKEN` - Strava.com Access Token

`TWITTER_ACCESS_TOKEN` - Twitter.com Access Token

`TWITTER_CONSUMER_KEY` - Twitter.com Consumer Key

`TWITTER_CONSUMER_SECRET` - Twitter.com Consumer Secret

`TWITTER_TOKEN_SECRET` - Twitter.com Token Secret

And any other configuration settings defined in the modules in the `/app` folder of the project.


## Availability

For my personal instance of this project, I also have a series of outside-in monitoring tests configured at [Runscope](http://runscope.com). These tests run daily against each of the API methods I have created to ensure that all of the various data sources are properly responding to my application. I'll also receive an email alert if any of the methods begin to fail.


## Known Issues

[Facebook](http://facebook.com) no longer provides [access tokens](https://developers.facebook.com/docs/facebook-login/access-tokens) which do not expire to application developers. Instead, you must first request an access token for your application using the [Graph API Explorer](https://developers.facebook.com/tools/explorer/) and then make a subsequent [request to extend the expiry](https://developers.facebook.com/docs/facebook-login/access-tokens/expiration-and-extension) of that access token to the maximum duration of 60 days. This is not ideal, but I have not yet found a way around this limitation. Instead, I rely on the Runscope tests mentioned above to notify me once this token has expired and that it is time to manually renew it.
