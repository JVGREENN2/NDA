//DEFINIR AS CONSTANTES:
const amount = document.getElementById("amount"),
    select = document.querySelectorAll(".select"),
    from = document.getElementById("from"),
    to = document.getElementById("to"),
    result = document.getElementById("rate"),
    convertBtn = document.getElementById("convert-icon"),
    calculateBtn = document.querySelector(".convert-btn");
// FUNÇÃO ASSÍNCRONA PARA OBTER AS TAXAS DE CÂMBIO E OS DADOS DOS PAÍSES
async function getRate() {
    const [rateResponse, countryResponse] = await Promise.all([
        fetch(`https://v6.exchangerate-api.com/v6/7147be884b264586b9fddc38/latest/USD`),
        fetch("https://restcountries.com/v3.1/all")
    ]);
    const rateData = await rateResponse.json();
    const countryData = await countryResponse.json();

    const rates = rateData.conversion_rates;

    const flagMap = {};
    countryData.forEach((country) => {
        if (country.currencies) {
            const currencyCodes = Object.keys(country.currencies);
            currencyCodes.forEach((code) => {
                flagMap[code] = country.flags.png;
            });
        }
    });
    if (rateResponse.ok) {
        updateOptions(from, getList(rates, flagMap));
        updateOptions(to, getList(rates, flagMap));
    } else {
        throw new Error(rateResponse.status);
    }} getRate();
// FUNÇÃO PARA OBTER A LISTA DE TAXAS DE CÂMBIO E BANDEIRAS DOS PAÍSES
function getList(rates, flagMap) {
    const arrKeys = Object.keys(rates);
    let liArr = [];
    arrKeys.map((item) => {
        const li = document.createElement("li");
        const flagUrl = flagMap[item] || ""; // Pega a URL da bandeira ou uma string vazia
        li.innerHTML = `
            <img src="${flagUrl}" alt="${item}" />
            <span>${item}</span>
        `;
        li.addEventListener("click", () => {
            li.parentElement.parentElement.querySelector("span").innerHTML = item;
            li.parentElement.parentElement.querySelector("img").src = `${flagUrl}`;
            li.parentElement.querySelectorAll("li").forEach((li) => {
                li.classList.remove("active");
            });
            li.classList.add("active");
            calculate();
        });
        liArr.push(li);
    });
    return liArr;
}
// ATUALIZA AS OPÇÕES NOS ELEMENTOS DE SELEÇÃO
function updateOptions(select, options) {
    const ul = select.querySelector("ul");
    ul.innerHTML = ""; // Limpa as opções anteriores
    options.forEach((option) => {
        ul.appendChild(option);
    });}
// FUNÇÃO ASSÍNCRONA PARA CONVERTER AS TAXAS DE CÂMBIO
async function calculate() {
    if (amount.value === "" || amount.value === "0") {
        return;
    }
    calculateBtn.innerHTML = "Calculating...";
    calculateBtn.disabled = true;

    const fromCurrency = from.querySelector("span").innerHTML;
    const toCurrency = to.querySelector("span").innerHTML;
    const fromAmount = amount.value;

    await fetch(
        `https://v6.exchangerate-api.com/v6/7147be884b264586b9fddc38/pair/${fromCurrency}/${toCurrency}/${amount.value}`
    )
        .then((res) => res.json())
        .then((data) => {
            const rate = data.conversion_result;
            result.innerHTML = `${rate} ${toCurrency}`;
        });
    calculateBtn.innerHTML = "Convert";
    calculateBtn.disabled = false;}
// ADICIONA/REMOVE A CLASSE 'ACTIVE' NOS ELEMENTOS DE SELEÇÃO QUANDO CLICADOS
select.forEach((item) => [
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    }),
]);

// ADICIONA UM EVENT LISTENER PARA REMOVER A CLASSE 'ACTIVE' QUANDO CLICADO FORA DO ELEMENTO DE SELEÇÃO
document.addEventListener("click", (e) => {
    if (!e.target.closest(".select")) {
        select.forEach((item) => {
            item.classList.remove("active");
        });
    }
});
// ADICIONA O CÁLCULO QUANDO O VALOR DO MONTANTE É DIGITADO
amount.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9.]/g, "");
    calculate();
});
// CALCULA QUANDO O BOTÃO É CLICADO
calculateBtn.addEventListener("click", () => {
    calculate();
});
// TROCA OS VALORES DAS MOEDAS QUANDO O ÍCONE DE CONVERSÃO É CLICADO
convertBtn.addEventListener("click", () => {
    const fromSelected = from.querySelector("span").innerHTML;
    const toSelected = to.querySelector("span").innerHTML;
    const fromImg = from.querySelector("img").src;
    const toImg = to.querySelector("img").src;
    from.querySelector("span").innerHTML = toSelected;
    to.querySelector("span").innerHTML = fromSelected;
    from.querySelector("img").src = toImg;
    to.querySelector("img").src = fromImg;
    calculate();
});