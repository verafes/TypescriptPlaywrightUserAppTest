import { Page, Locator } from "@playwright/test"

export class HomePage {
    private readonly page: Page;
    private readonly searchTab: Locator

    constructor(page: Page) {
        this.page = page;
        this.searchTab = page.getByRole('link', {name: 'Search', exact: true});
    }

    async clickSearchTab() {
        await this.searchTab.click();
        await this.page.waitForLoadState('networkidle');
    }
}