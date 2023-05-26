# Screeps Typescript Starter-kit

To begin create a copy of the "screeps.json.dist" file called "screeps.json" and add your own credentials to that file.
Ensure you have Node and Grunt installed

Run ```npm install```

Using Grunt, we can use a single command to accomplish all of these things:

1. Compile your code from ```src``` into ```build```.
2. Clean up the dist folder.
3. Copy your code from ```build``` into ```dist``` and flatten the file structure.
4. Fix the ```require``` calls that were broken by flattening the file structure
5. Upload from ```dist``` to Screeps servers *You can configure the default branch you wish to upload to using your screeps.json file*

```npm run gogo-default```

To upload to a different branch you can use

```grunt screeps --branch=<branch-name>```