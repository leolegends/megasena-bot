const puppeteer = require('puppeteer');

module.exports = {

    async megaSena() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.loteriasonline.caixa.gov.br/silce-web/#/mega-sena/especial');
        await page.setViewport({ width: 1200, height: 900 })

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
    },


    async PlayRandomGames() {

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.loteriasonline.caixa.gov.br/silce-web/#/mega-sena/especial');
        await page.setViewport({ width: 1200, height: 900 })


        await page.evaluate(() => {
            document.getElementById('botaosim').click();
            //? Aguarda a Página carregar.
            setTimeout(() => {
                document.getElementsByClassName('titulo-mega-sena')[0].click();
            }, 1000);


            setTimeout(() => {

                //? Quantidade de jogos.
                let quantity = 10;

                function generateRandomGames() {
                    let array = [];

                    while (array.length < 6) {
                        randomnumber = Math.floor(Math.random() * (60 - 1 + 1)) + 1;

                        if (randomnumber < 10) {
                            randomnumber = '0' + randomnumber;
                        }
                        if (array.indexOf('' + randomnumber) < 0) {
                            array.push('' + randomnumber);
                        } else {
                            generateRandomGames();
                        }
                        console.log(array);
                    }

                    return array;
                }

                let games = [];

                while (quantity > 0) {

                    games.push(generateRandomGames());

                    quantity--;
                }

                games.forEach(function(game) {
                    game.forEach(function(val) {
                        console.log(val);
                        document.getElementById('n' + val).click();
                    });
                    document.getElementById('colocarnocarrinho').click();
                });

            }, 3000);

        });



    },

    async initGame(status) {
        if (status) {
            return await this.PlayRandomGames();
        }
        return await this.megaSena();
    }

}