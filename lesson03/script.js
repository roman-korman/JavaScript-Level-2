'use strict';
/**
 * Функция для работы с API через промис
 * @param {Адрес json файла на который отправляется запрос} url
 */
function makeGETRequest(url) {
	return new Promise((resolve, reject) => {
		const xhr = window.XMLHttpRequest
			? new window.XMLHttpRequest() : new window.ActiveXObject()
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				//if (xhr.Status === 200) {
				resolve(xhr.responseText);
				//}
				reject(new Error())
			}
		}
		xhr.open('GET', url, true)
		xhr.send()
	})
}

/**
 * Задаю постоянный адрес для подключения к API заглушке
 */
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
/**
 * Объект одного товара, с возможностью вывода информации в виде HTML кода
 */
class GoodItem {
	/**
	 * Конструктора
	 * @param {Наименование товара с проверкой} title 
	 * @param {Цена товара с проверкой} price 
	 */
	constructor(title = 'no title', price = 'no price', quantity = 0, id) {
		this.title = title;
		this.price = price;
		this.id = id;
		this.quantity = quantity;
	}
	render() {
		return `<div class="goods-item" id="${this.id}">
	  <img src="" alt="">
	  <h3>${this.title}</h3>
	  <p>Цена: ${this.price}</p>
	  <p>Количество: ${this.quantity}</p>
	  <button onclick="list.deletGood(${this.id})">Удалить</button>
	  </div>`;
	}
}
/**
 * Объект содержащий список товаров и умеющий выводить на страницу их используя объект GoodItem
 */
class GoodsList {
	constructor() {
		this.goods = [];
		this.amount = 0;
		this.countGoods;
	}
	/**
	 * получение через API списка товара, вместо ранее объявленного массива
	 */

	async fetchGoods() {
		makeGETRequest(`${API_URL}getBasket.json`).then((goods) => {
			this.goods = JSON.parse(goods).contents;
			this.amount = JSON.parse(goods).amount;
			this.countGoods = JSON.parse(goods).countGoods;
			list.render();
		}, (err) => {
			console.error(err)
		}
		);
	}
	/**
	 * функция удаления товара из корзины с подверждением от бэка
	 * добавил вывод предупреждений т.к. просто удалить товар не могу
	 * @param {id товара для удаления} id 
	 */
	deletGood(id) {
		makeGETRequest(`${API_URL}deleteFromBasket.json`).then((result) => {
			if (JSON.parse(result).result == true) {
				alert('товар удалён');
				list.fetchGoods();
			}
			else {
				alert('произошла ошибка');
			}
		}, (err) => {
			console.error(err)
		}
		);
	}


	/**
	 * Вывожу сумму товара и количество товара
	 */
	countTotalPrice() {
		return `<div class="countTotalPrice">Общее количество: ${this.countGoods}</div>
		<div class="countTotalPrice">Общая цена: ${this.amount}</div>`;
	}


	render() {
		let listHtml = '';
		this.goods.forEach((good) => {
			const goodItem = new GoodItem(good.product_name, good.price, good.quantity, good.id_product)
			listHtml += goodItem.render()
		})
		document.querySelector('.goods-list').innerHTML = listHtml;
		document.querySelector('.cart-sum').innerHTML = this.countTotalPrice(); //вывожу ячейки со стоимостью и количеством товара корзины
	}
}

/**
 * Создаю экземпляр класса GoodsList, вызваю для него метод fetchGoods, чтобы записать список товаров в свойство goods
 */
const list = new GoodsList();
list.fetchGoods();

/**
 * вызваю render() метода fetchGoods
 */
window.onload = () => {
	list.render()
};

