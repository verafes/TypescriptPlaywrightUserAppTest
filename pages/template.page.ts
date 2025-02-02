import { Page, Locator } from '@playwright/test'

export class NamePage {
    private readonly page: Page;
    private readonly locatorName: Locator

    constructor(page: Page) {
        this.page = page;
        this.locatorName = page.locator("");
    }

    async methodName(text: string) {
        await this.locatorName.fill(text);
    }
}