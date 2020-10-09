let fruits = [];
let fruitsBtns = document.getElementsByClassName('fruits-item-button');
console.log(fruitsBtns);
for (let i = 0; i < fruitsBtns.length; i++){
	fruitsBtns[i].addEventListener('click',addToCart);
}
function addToCart(event){
	let total = document.getElementById('total-count');
	console.log(total);
	++total.innerHTML;
	let name = event.target.parentNode.getElementsByTagName('h3')[0].innerHTML;
	let price = event.target.parentNode.getElementsByTagName('p')[0].innerHTML;
	price = price.match(/\d+/)[0];

	let findFruit = fruits.find(item =>item.name === name);
	if (findFruit) {
		++findFruit.amount;
	}else{
	let fruit ={
		name: name,
		price: price,
		amount: 1
	}
	fruits.push(fruit);
}
}
let clearBtn = document.getElementById('clear-card');
clearBtn.addEventListener('click', clearTotal);

function clearTotal(event){
	let total = document.getElementById('total-count');
	total.innerHTML = 0;
	fruits = [];
}



let showCardBtn = document.getElementById('show-card');
showCardBtn.addEventListener('click', showCard);

function showCard(event){
	console.log(fruits);


	let basket = document.getElementById('basket');
	let rows = "";
	let i = 0;
	while(i < fruits.length){
	    rows += '<tr>' + 
			'<td>' + fruits[i].name + '</td>' + 
			'<td>' + fruits[i].price + '</td>' + 
			'<td> <input class="fruit-amount" type="number"  min="0" value ="' + fruits[i].amount + '"/>' + '</td>' +
			'<td>&#36;'+ fruits[i].price * fruits[i].amount + '</td>' +
	'</tr>';
	i++;
}
	basket.innerHTML = rows;


let fruitAmountBtn = document.getElementsByClassName('fruit-amount');
for (let i = 0; i < fruitAmountBtn.length; i++){
	fruitAmountBtn[i].addEventListener('input', changeFruitTotal);
}

	let totalSum = 0;
	for (i = 0; i < fruits.length; i++){
	  totalSum += fruits[i].price * fruits[i].amount;
}
	document.getElementById('total-cart').innerHTML = totalSum;
	console.log(totalSum);
}

function changeFruitTotal(event){
	let total = event.target.parentNode.nextSibling;
	let price = event.target.parentNode.previousSibling.innerHTML;
	let newAmount = Number(event.target.value);
	
	let name = event.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML;

	let fruitIndex = fruits.findIndex(item => item.name === name);

	// let oldAmount = fruits.find(item=> item.name ===name).amount;

	total.innerHTML = '&#36;' + newAmount * Number(price);


	let totalCard = document.getElementById('total-cart');
	let diff = newAmount - fruits[fruitIndex].amount;
	totalCard.innerHTML = Number(totalCard.innerHTML) + diff * Number(price); 
	let totalCount = document.getElementById('total-count');
	totalCount.innerHTML = Number(totalCount.innerHTML) + diff;
	console.log(Number(totalCount));

	console.log(Number(diff));
	 console.log(Number(totalCard));
	 console.log(Number(price));
	// totalCard = Number(totalCard) + (newAmount - oldAmount) * Number(price);

if (newAmount===0){
	 event.target.parentNode.parentNode.remove();
	 // totalCard.innerHTML = Number(totalCard.innerHTML) - fruits[fruitIndex].amount

	 // document.getElementById('total-count').innerHTML = 0;
	 fruits.splice(fruitIndex, 1);
	}else{
		fruits[fruitIndex].amount = newAmount;
	}
}


