import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";

export default class MyPlugin extends Plugin {
	async onload() {
		console.log("plugin loaded");

		this.addCommand({
			id: "sticky",
			name: "sticky",
			checkCallback: (checking: boolean) => {
				tryThis();
			},
		});

		const windowTop = window.innerHeight * 0.3;
		// console.log(windowTop);

		function tryThis() {
			const hDisplay = document.createElement("span");
			hDisplay.className = "hDisplay";
			const target = document.querySelectorAll("div.HyperMD-header")[0];
			const { top: targetTop } = target.getBoundingClientRect();
			console.log("targetTop", targetTop, "windowTop", windowTop);

			if (
				target &&
				typeof target !== "undefined" &&
				targetTop < windowTop
			) {
				document
					.getElementsByClassName("view-header")[0]
					.appendChild(hDisplay);
			}
		}

		// Find highest level heading in the viewport
		this.registerDomEvent(document, "click", (evt: MouseEvent) => {
			tryThis();
			// console.log("click", evt.offsetY);
			// console.log(window.innerHeight);

			// const el = document.querySelectorAll("div.HyperMD-header")[0];

			// console.log("TEST", el.getBoundingClientRect());
		});

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		// Make sure the user is editing a Markdown file.
		if (view) {
			const cursor = view.editor.getCursor();
			console.log(cursor);
		}

		this.addCommand({
			id: "test",
			name: "test",
			checkCallback: (checking: boolean) => {
				const leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						const leafs =
							this.app.workspace.getLeavesOfType("markdown");
						const index = leafs.indexOf(leaf);
						console.log(index);
					}

					return true;
				}
				return false;
			},
		});
	}

	onunload() {}
}
