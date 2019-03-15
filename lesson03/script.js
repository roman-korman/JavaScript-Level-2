'use strict';
/**
 * Функция для работы с API
 * @param {Адрес сервера на который отправляется запрос} url 
 * @param {Значение, которое нужно получить} callback 
 */
function makeGETRequest(url, callback) {
	let xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			callback(xhr.responseText);
		}
	}
	xhr.open('GET', url, true);
	xhr.send();
}
/**
 * не получилось перейти на промис
 */
// const makeGETRequest = (url) => {
// 	return new Promise(function (resolve, reject) {
// 		let xhr = new XMLHttpRequest();
// 		xhr.open('GET', url);
// 		xhr.onload = function () {
// 			if (xhr.readyState === 4) {
// 				// Если успешный, то резолвим промис
// 				resolve(xhr.responseText);
// 			} else {
// 				// Если нет, то реджектим промис
// 				allert('ошибко');
// 				reject('Error');
// 			}
// 		}
// 		xhr.send();
// 	});
// };

/**
 * Задаю постоянный адрес для подключения к API заглушке
 */
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
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
		// return `<div class="goods-item" id="${this.id}">
		// <img src="" alt="">
		// <h3>${this.title}</h3>
		// <p>Цена: ${this.price}</p>
		// <button onclick="GoodsList.deletGood(${this.id})">Удалить</button>
		// </div>`;
		return `<div class="goods-item" id="${this.id}">
	  <img src="" alt="">
	  <h3>${this.title}</h3>
	  <p>Цена: ${this.price}</p>
	  <p>Количество: ${this.quantity}</p>
	  <button>Удалить</button>
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
	// fetchGoods() {
	//   this.goods = [
	// 	{ id: 0, title: 'Shirt', price: 150 },
	// 	{ id: 1,title: 'Shirt2'},
	// 	{ id: 2,title: 'Socks', price: 50 },
	// 	{ id: 3,price: 80 },
	// 	{ id: 4,title: 'Jacket', price: 350 },
	// 	{ id: 5,title: 'Shoes', price: 250 }
	//   ]
	// }
	/**
	 * получение через API списка товара, вместо ранее объявленного массива
	 */
	fetchGoods(cb) {
		makeGETRequest(`${API_URL}/getBasket.json`, (goods) => {
			this.goods = JSON.parse(goods).contents;
			this.amount = JSON.parse(goods).amount;
			this.countGoods = JSON.parse(goods).countGoods;
			cb();
		})
	}
	/**
	 * не получилось перейти на промис
	 */
	// fetchGoods() {
	// 	makeGETRequest(`${API_URL}/getBasket.json`).then((goods) => {
	// 		this.goods = JSON.parse(goods).contents;
	// 		this.amount = JSON.parse(goods).amount;
	// 		this.countGoods = JSON.parse(goods).countGoods;
	// 	}, (error) => {
	// 		console.log(error)
	// 	}
	// 	);
	// }


	/**
	 * Высчитываю сумму товаров в корзине и создаю HTML фрагмент для вывода суммы и количества
	 * Если на товар не заданна цена, то в подсчёте цена приравнивается 0 и вывожу предкпреждение
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
list.fetchGoods(() => {
	list.render();
});

/**
 * вызваю render() метода fetchGoods
 */
window.onload = () => {
	list.render()
};

