import { Plugin } from "obsidian";
// import { emojiListPlugin } from "plugin";
// import { docSizePlugin } from "docSizePlugin";
import { emojiListField } from "field";
import { examplePlugin } from "viewPlugin";
export default class StickyHeadingsPlugin extends Plugin {
	private stickyHeadings: HTMLElement[] = [];

	onload() {
		console.log("Loading Sticky Headings plugin");
		// this.registerEditorExtension(emojiListPlugin);
		// this.registerEditorExtension(docSizePlugin);
		this.registerEditorExtension(examplePlugin);
		// this.registerEditorExtension(emojiListField);

		this.app.workspace.onLayoutReady(() => {
			this.registerDomEvent(
				this.app.workspace.containerEl.win,
				"wheel",
				(evt: any) => {
					this.handleWheel();
				}
			);
			this.registerDomEvent(
				this.app.workspace.containerEl.win,
				"scroll",
				(evt: any) => {
					this.handleScroll();
				}
			);
		});
		// this.addStickyHeadings();
	}

	onunload() {
		console.log("Unloading Sticky Headings plugin");
	}

	handleScroll() {
		console.log("scrolling");
	}

	handleWheel() {
		console.log("wheeling");
		const currentlyStickied = [];
		const headings = document.querySelectorAll(".HyperMD-header");
		const headingsArr = Array.from(headings);
		// console.log(headingsArr);
		for (let i = 0; i < headingsArr.length; i++) {
			const heading = headingsArr[i];
			const headingTop = heading.getBoundingClientRect().top;
			console.log(heading, headingTop, currentlyStickied);
			if (headingTop < 30) {
				heading.classList.add("sticky");
				currentlyStickied.push(heading);
			} else {
				heading.classList.remove("sticky");
			}
		}
	}
}
