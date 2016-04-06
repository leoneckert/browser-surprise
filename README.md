# browser-surprise

![image](https://github.com/leoneckert/browser-surprise/blob/master/browser-surprise.png)



```heroku logs --source app --tail``` // to run heroku

```
git add .
git commit -m "changes"
git subtree push --prefix server_side heroku master
```

to restart the heroku server:<br>
first:```heroku ps:scale web=0```
then:```heroku ps:scale web=1```
<br>this is also a good technique to put the (free) server to sleep when not in use so it doesn't run out of time. 

https://www.phusionpassenger.com/library/walkthroughs/deploy/nodejs/digital_ocean/nginx/oss/osx/deploy_app.html