import { Browser, BrowserContext, Page, chromium, test, expect } from "@playwright/test";
import { step, Severity } from "allure-js-commons";
import * as allure from "allure-js-commons";
import * as data from "@data/constants.data";


let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll('Setup Playwright environment', async() => {
    await step("Launch Chromium browser", async() => {
        browser = await chromium.launch();
    });
})

test.describe('Verify the server is responsive', async() => {

    test.beforeEach('Create new Context and new Page', async() => {
        {
            await allure.epic('SRV: Server Availability and Homepage Load.');
            await allure.story('SRV-LOAD: Verify API responds successfully upon navigation.');
            await allure.tags('SRV', 'SRV-LOAD', '/api/');
            await allure.severity(Severity.BLOCKER);
        }

        await step("Create a new browser Context", async() => {
            context = await browser.newContext();
        });

        await step("Create a new Page", async() => {
            page = await context.newPage();
        });

    })

    test("@allure.id:SRV-LOAD-TC01 Ensure the page \"/api/\" is responsive.", async() => {
        {
            await allure.description('Ensure that the "/api/" page loads correctly by verifying "/api/" response and App name.');
        }

        await step('1. Navigate to "/api/", verify the successful response.', async () => {
            await Promise.all([
                page.waitForResponse(response =>
                    response.url().endsWith('/api/')
                    && response.status() === 200
                ),
                await page.goto('/api/')
            ])
        });

        await step(`VERIFY the App name "${data.APP_NAME}" is visible.`, async () => {
            await expect(page.getByText(data.APP_NAME)).toBeVisible();
        });
    })

    test('@allure.id:SRV-LOAD-TC02 Ensure the homepage loads correctly.', async () => {
        {
            await allure.description('Ensure that the homepage loads correctly by verifying URL and "/api/users/" response.');
        }

        await step('1. Navigate to the homepage and wait for a successful "/api/users/" response.', async () => {
            await Promise.all([
                page.waitForResponse(response =>
                    response.url().endsWith('/api/users/') && response.status() === 200
                ),
                page.goto('/'),
            ]);
        });

        await step(`VERIFY that the homepage URL matches "${process.env.URL}".`, async () => {
            expect(page.url()).toEqual(`${process.env.URL}/`);
        })
    });

    test.afterEach('Close context and page', async () => {
        await step("Close page.", async () => {
            await page.close();
        });

        await step("Close context.", async () => {
            await context.close();
        });
    })
})

test.afterAll('Teardown Playwright environment', async() => {
    await step("Close Chromium browser", async() => {
        await browser.close();
    });
})
