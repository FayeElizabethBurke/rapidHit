import { Selector } from 'testcafe';

let terms = ['electric fence energiser', 'electric fence supplies brisbane', 'jva electric fence', 'jva fence australia', 'electric fencing au', 'ip energiser'],
    item = terms[Math.floor(Math.random() * terms.length)],
    pageTurn = 1,
    randomizeBotOne = Math.ceil(Math.random() * 6),
    topLink = Selector('.nav ul').child(randomizeBotOne).child(),
    searchBar = Selector('input').withAttribute('title', 'Search'),
    jvaLink = Selector('a').withAttribute('href', 'https://www.jva-fence.com.au/'),
    nextPage = Selector('#pnnext'),
    shop = Selector('.nav ul').child(5).child(),
    shopNow = Selector('button').withText('Shop Now'),
    randomizeBotThree = Math.ceil(Math.random() * 9),
    dropDownItem = Selector('.sidebar-module__list').child(randomizeBotThree);

fixture(`Bot 1`).page('http://www.jva-fence.com.au');
test('Direct access though url', async t => {
    await t
        .resizeWindow(1900, 900)
        .click(topLink)
        .wait(30000)
});


//randomizeBotOne my search term



fixture(`Bot 2`).page('http://www.google.com.au');
test('Indirect access through google search terms', async t => {


    await t
        .resizeWindow(1900, 900)
        .typeText(searchBar, item)
        .pressKey('enter')
        .wait(5000)

    if (await jvaLink.exists) {
        await t
            .click(jvaLink)
            .wait(5000)
            .click(shop)
            .wait(15000)
    } else {
        do {
            await t
                .click(nextPage)
                .wait(9000)
                .click(jvaLink)
                .wait(5000)
                .click(shop)
                .wait(15000);
            pageTurn++;
        }
        while (!jvaLink.exists)
    }
    console.log('Search term used: ' + item + ', Google rank: Page ' + pageTurn)
});

fixture(`Bot 3`).page('https://www.facebook.com/JVATechnologies');
test('Indirect access through external links (facebook)', async t => {
    //elements

    await t
        .resizeWindow(1900, 900)
        .wait(1500)
        .click(shopNow)
        .wait(10000)
        .click(dropDownItem)
        .click(Selector('.grid-link'))
        .wait(9000)
});