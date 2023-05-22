# Screeps Typescript Starter-kit

To begin create a copy of the "screeps.json.dist" file called "screeps.json" and add your own credentials to that file.

Run ```npm install```

To compile from typescript in your src folder:

```npx tsc```

Configure your default screeps branch in screeps.json file. To upload js files from dist folder to default branch in screeps use:

```grunt screeps```

To upload to different branch use:

```grunt screeps --branch=<branch-name>```

Use script to compile and push to default branch in one go:

```npm run gogo-default```