import {Page, Locator, expect} from "@playwright/test"

export class Table {

    private readonly page: Page;
    private readonly _tableRow: Locator;

    constructor(page: Page) {
        this.page = page;
        this._tableRow = page.locator("tbody>tr");
    }

    get tableRow(): Locator {
        return this._tableRow;
    }

    async getFirstResultInfo() {
        await this.tableRow.first().hover();
        await this.tableRow.first().isVisible();

        return await this.tableRow.first().innerText().then(text => text.split("\t"));
    }
}