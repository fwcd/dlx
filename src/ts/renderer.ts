import { AppView } from "./view/AppView";

const appView = new AppView();
appView.initializeStorage();

// Monaco editor

declare var amdRequire: any;
amdRequire(["vs/editor/editor.main"], () => appView.initializeEditor());
