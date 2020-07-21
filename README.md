# elastic-beanstalk-first-app

#### Simple Node.js+React app that I use elastic-beanstalk service from AWS for deploying.

I found two methods to deploy the app using eb(elastic beanstalk):

## Method :one:

In this method, we use eb cli to deploy the app

##### Steps:

1. First, you need to install the eb cli. Hit [this link](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and install the cli based on your operating system.
2. Second, we need to configure this cli. Before configure it, we need to create a new user and create access keys for that user.

   - Hit [this link](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) and follow the instructions to create Administrator IAM User and Group.
   - Then we want to give this new user an AWSElasticBeanstalkFullAcces. To do so, follow the instruction in [this link](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.iam.managed-policies.html#iam-userpolicies-managed).
   - After creating the user and give him access to eb, we need to configure the cli using the access keys for that user. To do so, follow the instruction in [this link](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) and go to `Access key ID and secret access key` section and follow the instructions to get the access keys.
   - So far, we have created the user, giving him access to eb, and getting access keys for him. Now to configure the eb cli, write this command `aws configure`, This will ask you to add the access keys that you've just created and saved, just copy and paste the value of these keys.

3. Create your client folder and then use create-react-app to create your react project. So type `create-react-app client` in your terminal.
4. Create your express server.
5. Build the React app by entering the client folder `cd client`, and then execute this command `npm run build`
6. Edit your server file and add useStatic middleware to use the build folder by adding this line in server.js `app.use(express.static(path.join(\_\_dirname, 'client', 'build')));`
7. Don't forget to add `proxy` in your client side package.json file to send request to the server and make the client side and server side work in the same origin.
8. Now, write this command `eb init` (make sure you are in the root folder of your project). This command will ask you some questions about your IAM access information, location and application preference. After finishing, you will find a new folder created named `.elasticbeanstalk`, usually we don't change anything in this file.
9. Eb usually starts the app by executing app.js file, then server.js file, then execute `npm i`. Whenever you have something different(like different command to execute), you need to tell eb about that. How? by adding a new config file that telling the eb what to execute.
   - Create new folder in the root of your project and name it `.ebextensions`. This folder contains file to configure your eb application. For example, to configure the command that the eb will execute, add a new file inside `.ebextensions` folder and name it `nodecommand.config`. Add the following code inside this file. You can replace `NodeCommand` with the another command in case you have to do so.

```
option_settings:
aws:elasticbeanstalk:container:nodejs:
 NodeCommand: "npm start"
```

**Note: this step is not necessary in this project because I have a file named `server.js` witch will be executed by default by the eb as I said before**

10. Add, commit, and push your code.
11. Back to step 8, when we wrote `eb init` and answer the questions, this will create new eb application for you. To open your dashboard and see all your applications and environments, write `eb console` in the cli. The eb also will create environment for your application.
12. Write `eb deploy [your Environment name]`, this will deploy your app to eb. In case you don't know which environment you have to use, write `eb console` to see your eb dashboard where you can see all your applications and all environments.
13. Now write `eb open` to open your app and see the magic :tada::tada:
14. **Surprise!!** `502 Bad Gateway` error! Why? This happened because I deploy my app on port 9000, but The default nginx configuration forwards traffic to an upstream server named nodejs at 127.0.0.1:8081. To solve this problem, you have two solutions:
    1. Just change your server port to 8081.
    2. Add new config file that tell eb to change the default port to the port you used in your server(9000 in my case).
    - Under `.ebextensions` folder, create new file and name it `proxy.config`
    - Inside this fil, add the following lines:

```
files:
/etc/nginx/conf.d/proxy.conf:
  mode: "000644"
  owner: root
  group: root
  content: |
    upstream nodejs {
      server 127.0.0.1:9000;
      keepalive 256;
    }
```

**Note: you need to change 9000 and put your server port**

15. Add, commit, push, and deploy your app again, then navigate to the website again and refresh to see the magic
16. Surprise again :stuck_out_tongue_winking_eye: react files are not served! Why? This is because we need to tell the eb from where he can get the static files. Now after deploying, static files are not in client>build folder. They have a new path. We need to add a new config file to tell the eb about the new path which is `/var/app/current/client/build/static;`
    - Under `.ebextensions` folder, create new file and name it `staticfiles.config`.
    - Add the following code in this file

```
option_settings:
 aws:elasticbeanstalk:container:nodejs:staticfiles:
   /static: /var/app/current/client/build/static;
```

17. Then add, commit, and push you code.
18. If you deploy the app, and navigate to the website you will not get react files served!!! WHY? this is because we used `create-react-app` to create the react app which add ignore the `build` folder when we push the code to gitHub. So, go the `.gitignore` file in the react app and remove the line that ignore the `build` folder.
19. Add, commit, push, and deploy your app to see your app deployed :boom::boom::boom:
