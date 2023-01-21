# Vending Machine

Test project for Renue.\
Link to app on [Firebase](https://vending-machine-rinat.web.app)

[![Linter](https://github.com/rinat-lucky/test_Renue/actions/workflows/linter.yml/badge.svg?event=push)](https://github.com/rinat-lucky/test_Renue/actions/workflows/linter.yml)
[![Deploy to Firebase](https://github.com/rinat-lucky/test_Renue/actions/workflows/firebase-hosting-merge.yml/badge.svg?branch=main&event=push)](https://github.com/rinat-lucky/test_Renue/actions/workflows/firebase-hosting-merge.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/62ad09220f0308c351bc/maintainability)](https://codeclimate.com/github/rinat-lucky/test_Renue/maintainability)

## Install

To install the app locally:

```sh
git clone https://github.com/rinat-lucky/test_Renue.git
cd test_Renue
npm install
```

## Start

To start the app locally:

```sh
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Build

To build the app for production:

```sh
npm run build
```

### Стек технологий

* React
* React Hooks
* Bootstrap
* My-JSON-Server
* Firebase
* GitHub Actions
* CodeClimate

### Описание работы приложения

* Вендинговый аппарат принимает деньги (банкноты) 4-х разных номиналов. Внесение денег в аппарат происходит по клику на кнопке с соответствующим номиналом. Внесенные деньги отражаются в поле "Доступная сумма"
* Все данные о продуктах и деньгах для сдачи подгружаются из тестовой базы данных при первой отрисовке приложения
* Покупка товара происходит по клику на кнопку "Купить" в карточке соответствующего товара. При покупке товара обновляются:
  * доступная сумма (баланс)
  * общий список покупок 
  * оставшееся (доступное) количество товара
* Если товар закончился либо доступная сумма меньше стоимости товара, то кнопка "Купить" становится неактивной
* Пользователь может получить сдачу по клику на одноименную кнопку. Если доступная сумма равна нулю, то кнопка "Получить сдачу" становится неактивной
* После клика "Получить сдачу" процесс покупки завершается (все кнопки становятся неактивными и выводится сумма запрошенной сдачи), одновременно с проведением необходимых расчетов:
  * в первую очередь, происходит расчет количества и номинала денег, необходимых для выдачи сдачи - результат расчетов отображается в виде списка, в котором указаны номиналы денег (от большего к меньшему, для удобства счета) и их количество
  * если всей суммы денег в аппарате не хватило для сдачи, то вторым шагом происходит расчет и автоматическая выдача товаров на недостающую сумму (учитываются доступный остаток товаров и их стоимость)
  * данные о выданной сумме денег и выданных т.н. "дополнительных" товарах отображаются в поле "Выдано"
  * если после всех проведенных расчетов остался невыданный остаток сдачи (когда закончились товары либо остаток меньше стоимости любого из доступных товаров), то этот остаток отображается в поле "Остаток"
  
### Скриншот работы приложения

![vending](https://user-images.githubusercontent.com/64750426/213443768-b5345afc-0bcc-4cc7-b673-99a468bd287c.jpg)
