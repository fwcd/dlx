import { AppView } from "./view/AppView";

const appView = new AppView();

// Monaco editor

declare var amdRequire: any;
amdRequire(["vs/editor/editor.main"], () => appView.initializeEditor());
