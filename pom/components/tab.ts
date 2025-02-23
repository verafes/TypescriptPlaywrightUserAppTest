import { Page, Locator } from "@playwright/test"

export class Tab {
    private readonly page: Page;
    private readonly searchTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchTab = page.getByRole('link', {name: 'Search', exact: true});
    }

    async clickSearchTab() {
        await Promise.all([
            this.searchTab.isEnabled(),
            this.searchTab.hover(),
            this.searchTab.click(),
        ])

    }
}