# Nx ionic angular

The Ionic tabs starter using Nx and Angular 14 standalone components by using an ionic dev build

"@ionic/angular": "6.1.7-dev.11654279011.1b971e3e",

Ionics Sean Perkins suggested environmentInjector workaround is commented in tabs and app components for when a build is available.

note: because i'm using pnpm, i've setup an alias pnx as described below. 

```node
 Prefer to use "pnpm" (https://pnpm.io/cli/exec) to execute commands in this workspace.
   TIP  create a shortcut such as: alias pnx="pnpm nx --"
```

### capacitor

example of capacitor integration thanks @joshuamorony

```node
pnx run ionic-app:cap:add:ios
```

```node
pnx run ionic-app:cap:sync
```

```node
pnx run ionic-app:cap:open:android
```

```node
pnx run ionic-app:cap:run:ios
```

### TODO

- add transloco and move to buildable libraries
- add storybook
- add unit tests
- add e2e tests
- add Ionic generators for app, features, ui etc.
- add NestJs Api using same atomic guidelines
- add NestJs generators for app, features, ui etc
