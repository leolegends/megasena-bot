const puppeteer = require('puppeteer');

async function megaSena() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.loteriasonline.caixa.gov.br/silce-web/#/mega-sena/especial');
    await page.setViewport({ width: 1290, height: 1200 })
    await page.screenshot({ path: 'google.png' });

    await page.evaluate(() => {
        document.getElementById('botaosim').click();
        //? Aguarda a Página carregar.
        setTimeout(() => {
            document.getElementsByClassName('titulo-mega-sena')[0].click();
        }, 1000);


        setTimeout(() => {
            //? Aqui  você informa seus jogos.
            let jogos = [
                ['10', '24', '31', '45', '57', '08'],
                ['07', '08', '09', '10', '11', '12'],
                ['09', '10', '22', '27', '33', '54']
            ];

            let size = jogos.length;

            while (size > 0) {
                jogos.forEach(function(game) {
                    game.forEach(function(val) {
                        document.getElementById('n' + val).click();
                    });
                    document.getElementById('colocarnocarrinho').click();
                    size--;
                });
            }
        }, 3000);

    });

    // await browser.close();
}

megaSena();