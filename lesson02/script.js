'use strict';

/**
 * Объект одного товара, с возможностью вывода информации в виде HTML кода
 */
class GoodItem {
	/**
	 * Конструктора
	 * @param {Наименование товара с проверкой} title 
	 * @param {Цена товара с проверкой} price 
	 */
	constructor(title = 'no title', price = 'no price') {
	  this.title = title;
	  this.price = price;
	}
	render() {
	  return `<div class="goods-item">
	  <img src="" alt="">
	  <h3>${this.title}</h3>
	  <p>Цена: ${this.price}</p>
	  <button>Добавить</button>
		</div>`;
	}
  }
/**
 * Объект содержащий список товаров и умеющий выводить на страницу их используя объект GoodItem
 */
class GoodsList {
	constructor() {
	  this.goods = []
	}
	fetchGoods() {
	  this.goods = [
		{ title: 'Shirt', price: 150 },
		{ title: 'Shirt2'},
		{ title: 'Socks', price: 50 },
		{ price: 80 },
		{ title: 'Jacket', price: 350 },
		{ title: 'Shoes', price: 250 }
	  ]
	}
	render() {
	  let listHtml = '';
	  this.goods.forEach((good) => {
		const goodItem = new GoodItem(good.title, good.price)
		listHtml += goodItem.render()
	  })
	  document.querySelector('.goods-list').innerHTML = listHtml
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