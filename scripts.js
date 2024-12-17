//cotaçao de moedas do dia
const USD = 6.15
const EUR = 6.46
const GBP = 7.81

//obtendo os elementos do formulario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// manipulando o input amount para receber somente numeros.
amount.addEventListener("input", () => {    
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

//capturando o evento de submit (enviar) do formulario
form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            covertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            covertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            covertCurrency(amount.value, GBP, "£")
            break   
    }
}

//funçao para converter a moeda.
function covertCurrency(amount, price, symbol) {
    try {
        //exibindo a cotaçao da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
    
        //calcula o total

        let total = amount * price 

        //verifica se o resultado nao e um numero
        if (isNaN(total)) {
            return alert("por favor digite o valor correto para converter.")
        }  

        //formatar o valor total

        total = formatCurrencyBRL(total).replace("R$", "")
        
        //exibe o resultado total
        
        result.textContent = `${total} Reais`

        //aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")
    } catch (error) {
        //remove a classe do footer ocultando ele.
        footer.classList.remove("show-result")
        
        console.log(error)
        alert("nao foi possivel converter. tente novamente mais tarde.")
    }
}
//formata a moeda em real brasileiro.
function formatCurrencyBRL (value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}
