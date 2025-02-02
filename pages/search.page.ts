import { Page, Locator } from "@playwright/test"


export class SearchPage {
    private readonly page: Page;
    private readonly firstNamePlaceholder: Locator;
    private readonly searchButton: Locator;
    private readonly tableRow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNamePlaceholder = page.getByPlaceholder("Enter first name...");
        this.searchButton = page.getByRole("button", {name: "Search", exact: true})
        // this.searchButton = page.locator("#searchButton");
        this.tableRow = page.locator('table > tbody > tr');
    }

    async inputFirstName(firstName: string) {
        await this.firstNamePlaceholder.fill(firstName);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async getTbodyRowCounts() {
        await this.page.waitForTimeout(2000);

        return await this.tableRow.count();
    }
}