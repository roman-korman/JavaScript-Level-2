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
	/**
	 * Высчитываю сумму товаров в корзине и создаю HTML фрагмент для вывода суммы и количества
	 * Если на товар не заданна цена, то в подсчёте цена приравнивается 0 и вывожу предкпреждение
	 */
	countTotalPrice() {
		let sum = 0;
		for (let i = 0; i < this.goods.length; i++) {
			if (this.goods[i].price == undefined) {
				this.goods[i].price = 0;
				alert('На товар '+ this.goods[i].title + ' не назначена цена');
			}
		  sum += this.goods[i].price;
		}
		return `<div class="countTotalPrice">Общее количество: ${this.goods.length}</div>
		<div class="countTotalPrice">Общая цена: ${sum}</div>`;
	  }

	render() {
	  let listHtml = '';
	  this.goods.forEach((good) => {
		const goodItem = new GoodItem(good.title, good.price)
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

