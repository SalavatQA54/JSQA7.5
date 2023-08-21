const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, setDefaultTimeout, After } = require("@cucumber/cucumber");
const { choosingAHall, choosingSite, completionOfBooking, choosingDate } = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function () {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 300
    });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});

Given("user is on {string} page", async function (string) {
    return await this.page.goto(`http://qamid.tmweb.ru/${string}/index.php`);
});

When("user selects the movie {string}, {string}", async function (string, string2) {
    let film, hall;
    if (string == "Логан") {
        film = 1;
        if (string2 == "Зал 1") {
            hall = 2;
        } else {
            hall = 3;
        }
        
    } else {
        film = 2;
        if (string2 == "Hercules") {
            hall = 2;
        } else {
            hall = 3;
        }
    }
    return await choosingAHall(this.page, film, hall);
});

When("user selects a row and {int} a place {int}", async function (row, place) {
    return await choosingSite(this.page, row, place);
});

When("choose the date today + {int} day", async function (day) {
    return await choosingDate(this.page, day + 1);
});

Then("user gets {string}", async function (string) {
    await completionOfBooking(this.page, ".acceptin-button", ".acceptin-button");
        
    const actual = await this.page.$eval(".ticket__info-qr", link => link.getAttribute('src') );
    expect(actual).contains(`i/${string}.png`);
});

Then("booking {string} is disabled", async function (selector) {
    
    const actual = await this.page.$eval(`${selector}`, link => link.hasAttribute('disabled'));
    expect(actual).to.be.true;
})