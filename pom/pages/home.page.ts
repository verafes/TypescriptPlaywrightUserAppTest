import { Page, Locator } from "@playwright/test";
import { Tab } from "@components/tab";

export class HomePage {
    private readonly page: Page;
    readonly tab: Tab;

    constructor(page: Page) {
        this.page = page;
        this.tab = new Tab(this.page);
    }
}