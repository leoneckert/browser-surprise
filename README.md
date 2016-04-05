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