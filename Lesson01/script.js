const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title, price)=> 
  `<div class="goods-item">
    <img src="" alt="">
    <h3>${title}</h3>
    <p>Цена: ${price}</p>
    <button>Добавить</button>
  </div>`;

const renderGoodsList = list => {
  const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

//Запятая выводится из за метода присоедниенеия контента
//"= goodsList;" -выводится
//"= goodsList.join('');"- не выводится

window.onload = () => {
  renderGoodsList(goods);
};