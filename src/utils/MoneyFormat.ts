export function moneyFormat(money: number){
  const price = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })

  return price.format(money)
}