import GlobalConfigs from "../Configs";

import PT from "./PT";
import EN from "./EN";

export class LangManager {
	constructor() {
		if (LangManager.instance instanceof LangManager)
			return LangManager.instance;

		this.selectedLang = GlobalConfigs.language;

		LangManager.instance = this;
	}

	toggle() {
		this.selectedLang = this.selectedLang === "en" ? "pt" : "en";
	}

	getText(property) {
		return this.selectedLang === "en" ? EN[property] : PT[property];
	}
}

export default new LangManager();
