import { Page, Locator } from "@playwright/test"
import { Form } from "@components/form";
import { Table } from "@components/table";


export class SearchPage {
    private readonly page: Page;
    readonly form: Form;
    readonly table: Table;

    constructor(page: Page) {
        this.page = page;
        this.form = new Form(this.page);
        this.table = new Table(this.page);
    }
}