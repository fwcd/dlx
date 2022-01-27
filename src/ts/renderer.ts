import "reflect-metadata";
import { AppView } from "./view/AppView";
import * as remote from "@electron/remote";
import { MenuBarView } from "./view/MenuBarView";

const { Menu } = remote;

const appView = new AppView();
appView.initializeStorage();
Menu.setApplicationMenu(new MenuBarView(appView).build());

// Monaco editor

declare var amdRequire: any;
amdRequire(["vs/editor/editor.main"], () => appView.initializeEditor());

// Post-init

appView.postInitialize();
