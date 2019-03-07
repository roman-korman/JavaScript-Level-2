const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Shirt2'},
  { title: 'Socks', price: 50 },
  { price: 80 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = 'no title', price = 'no price')=> 
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

window.onload = () => {
  renderGoodsList(goods);
};