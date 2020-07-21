# elastic-beanstalk-test
#### Simple Node.js+React app that uses elastic-beanstalk service from AWS for deploying.

###### Steps to do so:
1. Download the eb cli https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
2. Configure the cli by first create a new user and then **create access keys for an IAM user** that we've created https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html then use the command `aws configure` to add the key and secret of the new created user.
3. Give this user that we created a full access to the the elastic-beanstalk https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.iam.managed-policies.html#iam-userpolicies-managed so if we visit this page https://console.aws.amazon.com/iam/home#/users we will see the user we created and he has the access to eb.
4. Create normal react app using create-react-app and name the folder `client`
5. Create normal server uisng express.js and create `server.js` file on the root of the project folder.
6. Build the React app by entering the client folder and then execute this command 'npm build'
7. add useStatic middleware to use the build folder that we've got by adding this line in server.js `app.use(express.static(path.join(__dirname, 'client', 'build')));
`
8. Don't forget to add proxey inside your package.json in the client folder.
9. add, commit, and push the whole code into your repo.
10. Now deploy your project using this command ` eb deploy [your Environment name]`. Visit this page to see your applications and environments https://console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/environments
11. If you navigate to your applocation, you will see `502 Bad Gateway` error. This happended because I deploy my app on port 9000, but The default nginx configuration forwards traffic to an upstream server named nodejs at 127.0.0.1:8081. To solve this
  1. Create new folder on the root, name it `.ebextensions`
  2. Under this folder, create new file and name it `proxy.config`
  3. Inside this fil, add the following lines: 
  ```
files:
  /etc/nginx/conf.d/proxy.conf:
    mode: "000644"
    owner: root
    group: root
    content: |
      upstream nodejs {
        server 127.0.0.1:5000;
        keepalive 256;
      }
  ``` 
  this will make the app run on port 9000 rather the default port (8081). Read more https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-platform-proxy.html
