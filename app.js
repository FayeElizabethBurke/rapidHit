import { Selector } from 'testcafe';

let terms = ['electric fence energiser', 'electric fence supplies brisbane', 'electric fencing au', 'electric fence'],
    item = terms[Math.floor(Math.random() * terms.length)],
    pageTurn = 1,
    randomizeBotOne = Math.floor(Math.random() * 5),
    topLink = Selector('.nav ul').child(randomizeBotOne).child(),
    searchBar = Selector('input').withAttribute('title', 'Search'),
    jvaLink = Selector('a').withAttribute('href', 'https://www.jva-fence.com.au/'),
    nextPage = Selector('#pnnext'),
    shop = Selector('div > ul > li > a').withText('Home'),
    shopNow = Selector('button').withText('Shop Now'),
    randomizeBotThree = Math.ceil(Math.random() * 9),
    dropDownItem = Selector('.sidebar-module__list').child(randomizeBotThree),
    sessionTime = Math.ceil(Math.random() * (360000 - 240000) + 360000),
    salesNav = Selector('.site-nav__link'),
    home = Selector('a').withAttribute('href', 'http://www.jva-fence.com.au');


//enter website, click a link and wait
// fixture(`Bot 1`).page('http://www.jva-fence.com.au');
// test('Direct access though url', async t => {
//     await t
//         .resizeWindow(1900, 900)
//         .wait(15000)
//         .click(topLink)
//         .wait(sessionTime)
//         .click(topLink)
//         .wait(40000)
// });

//google a random term, listed above. Look for website, if not found click next page until found. Prints page rank to console.
//once on website, navigated to the store
fixture(`Bot 2`).page('http://www.google.com.au');
test('Indirect access through google search terms', async t => {
    await t
        .resizeWindow(1900, 900)
        .typeText(searchBar, item)
        .pressKey('enter')
        .wait(10000)

    if (await jvaLink.exists) {
        await t
            .click(jvaLink)
            .wait(5000)
            .click(topLink)
            .wait(sessionTime)
            .click(Selector('li'))
            .wait(3000)
            .click(Selector('a').withAttribute('href', 'shop.html'))
            .wait(4000)
            .click(dropDownItem)
            .wait(3000)
            .click(Selector('.grid-link'))
            .wait(sessionTime)
            .click(dropDownItem)
            .wait(3000)
            .click(salesNav)
            .wait(3000)
            .click(topLink)
            .wait(Math.ceil(sessionTime / 3))
    } else {
        do {
            await t
                .click(nextPage)
                .wait(4000)
                .click(jvaLink)
                .wait(5000)
                .click(topLink)
                .wait(sessionTime)
                .click(Selector('li'))
                .wait(3000)
                .click(Selector('a').withAttribute('href', 'shop.html'))
                .wait(4000)
                .click(dropDownItem)
                .wait(3000)
                .click(Selector('.grid-link'))
                .wait(sessionTime)
                .click(dropDownItem)
                .wait(3000)
                .click(salesNav)
                .wait(3000)
                .click(topLink)
                .wait(Math.ceil(sessionTime / 3))
            pageTurn++;
        }
        while (jvaLink.exists == false)
    }
    console.log('Search term used: ' + item + ', Google rank: Page ' + pageTurn)
});

//Opens on facebook page, follows link to jva store, chooses a random product catagory, clicks the first result and waits before closing.
fixture(`Bot 3`).page('https://www.facebook.com/JVATechnologies');
test('Indirect access through external links (facebook)', async t => {
    //elements

    await t
        .resizeWindow(1900, 900)
        .wait(1500)
        .click(shopNow)
        .wait(Math.ceil(sessionTime / 10))
        .click(dropDownItem)
        .wait(3000)
        .click(Selector('.grid-link'))
        .wait(sessionTime)
        .click(dropDownItem)
        .wait(3000)
        .click(salesNav)
        .click(topLink)
        .wait(4000)
        .click(topLink)
        .wait(Math.ceil(sessionTime / 3))
});