import {JetApp, JetView, plugins} from "webix-jet";

class SettingsView extends JetView {
	config(){
		const theme = this.app.getService("theme").getTheme();

		return {
			type:"space", rows:[
				{ template:"Settings", type:"header" },
				{ name:"skin", optionWidth: 120, view:"segmented", label:"Theme", options:[
					{id:"flat-default", value:"Default"},
					{id:"flat-shady", value:"Shady"},
					{id:"compact-default", value:"Compact"}
				], click:() => this.toggleTheme(), value:theme },
				{}
			]
		};
	}
	toggleTheme(){
		const themes = this.app.getService("theme");
		const value = this.getRoot().queryView({ name:"skin" }).getValue();
		themes.setTheme(value);
	}
}



const app = new JetApp({
	id:			"plugins-themes",
	start:		"/start",
	views:{
		start: SettingsView
	}
});

export default function(){
	//affect global styles, must be called only if you really plan to init the app
	app.use(plugins.Theme);
	return app;
}