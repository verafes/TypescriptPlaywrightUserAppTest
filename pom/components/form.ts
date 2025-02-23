import {Page, Locator, expect} from "@playwright/test"
import { Table } from "@components/table";

export class Form {
    private readonly page: Page;
    private readonly searchButton: Locator;
    private readonly firstNamePlaceholder: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchButton = this.page.getByRole('button', {name: 'Search', exact: true});
        this.firstNamePlaceholder = this.page.getByPlaceholder('Enter first name...');
    }

    async inputFirstName(firstName: string) {
        await Promise.all([
            this.page.waitForLoadState("domcontentloaded"),
            new Table(this.page).tableRow.first().waitFor({ state: 'attached' }),
            this.searchButton.isDisabled(),
            this.firstNamePlaceholder.isVisible(),
        ]);

        await Promise.all([
            this.firstNamePlaceholder.fill(firstName),
            this.searchButton.isEnabled(),
        ]);
    }

    async clickSearchButton() {
        await Promise.all([
            this.searchButton.waitFor({ state: 'attached' }),
            this.searchButton.isEnabled(),
            this.searchButton.click(),
        ])
    }
}