const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".nav-menu");
const menuButtonClose = document.querySelector(".menu-button-close");

menuButton.addEventListener("click", () => {
  menu.classList.add("is-open");
  menuButtonClose.classList.add("is-active");
});

menuButtonClose.addEventListener("click", () => {
  menu.classList.remove("is-open");
  menuButtonClose.classList.remove("is-active");
});


//вспылавающая форма:
const hideForm = document.querySelector('.hide-form');  // блок формы
const orderTicket = document.querySelector('.order-ticket'); // для определения высоты
const orderTrigger  =  document.querySelector('.order-trigger'); // кнпока
const orderTicketForm = document.querySelector('.order-ticket__form'); // форма

const orderTicketFormWrapper = document.querySelector('.order-ticket__form-wrapper'); //фблок с формой
const orderTicketPreloaderWrapper = document.querySelector('.order-ticket__preloader-wrapper');
const orderTicketThanksWrapper = document.querySelector('.order-ticket__thanks-wrapper');
const orderTicketThanksName = document.querySelector('.order-ticket__thanks-name');

setTimeout(() => { // встроенная функция, котрая запускает все что написанов  ней  сзадержкой в 1000мс
  //console.log('orderTicket', orderTicket.offsetHeight); 
  const heightForm = orderTicket.offsetHeight; // выста формы
  hideForm.style.bottom = -heightForm + 'px';

}, 1000);

const sendData = (data, callback, callBefore) => { // data= {name: "dfgdf", surname: "dfgdf", city: "dfgdf", mail: "dfgdf@mail.ru", personal: "agree"},  callback фкнуция, она выводит соощенеи что данные ушли. callBefore это showPreloader
  
  if(callBefore){ // если етсь фкнция то вызываем ее
    callBefore();
  }

  fetch('http://localhost:3000/api', { // указываем тетсовый адрес сервера, fetch() передает в then() промис
    method: 'POST',
    headers: {
      'Conten-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data), // приводим данеы в строку json, то есть "{"name": "Руфина"}"
  })
  .then((response) => { // в response хранитсяотет от сервера в виде джсон,  передаваемая коллбэк фукнця вызоветсякогда придет ответ от сервера 
    //console.log('response ', response);
    return response.json(); // приводим в объект,  json() асинхронный меод,   получили промис(data)
  })
  .then(callback); //либо можно  написать так  data => callback(data), вывзется функия showThankYou
  
}


const showPreloader = () => {
  orderTicketFormWrapper.style.display = 'none'; // скрыли форму
  orderTicketPreloaderWrapper.style.display = 'block'; 
}


const showThankYou = (data) => {
  //console.log('data ', data);
  //console.log('спасибо');
  orderTicketFormWrapper.style.display = 'none';
  orderTicketPreloaderWrapper.style.display = 'none';
  orderTicketThanksWrapper.style.display = 'block'; 
  orderTicketThanksName.textContent = data.name; //в элемент записываем тексь,  data= {name: "dfgdf", surname: "dfgdf", city: "dfgdf", mail: "dfgdf@mail.ru", personal: "agree"}
};




orderTrigger.addEventListener('click', () => { // вешаем  обрбаотчик события на кнрпку  orderTrigger
  hideForm.classList.toggle('hide-form-active');
});



//событие change  срабабтывает когда изменились данные в форме:
orderTicketForm.addEventListener('change', (event) => { // yна тексовом поле проиходит собыие change
    //console.log('change'); // при переходе с одного поля на дургое срабатывае это событие  
    //console.log(event); // обхкет event создается коглда произошло событие change
    //console.log(event.target); / вывдет то на что нажали

    const target = event.target; // <input type="text">
    //console.dir(target); // выводитэлемент ввивдео объекта
    //console.log('target.labels = ', target.labels);
    const label = target.labels[0];
    //console.log(label);
    if(label && target.value){ // если есть label и в поле что-то ввели
      label.classList.add('order-ticket__label-focus');
    }
    else{
      label.classList.remove('order-ticket__label-focus');
    }

});



orderTicketForm.addEventListener('submit', (event) => { //обработчик события отправки формы
  event.preventDefault(); //отменяем действие по умолчанию,  по умолчанию ,после отрпавик данных страница ререзагружается, методом гет данные отправлется
  //console.dir(orderTicketForm);

  const formData = new FormData(orderTicketForm); // создали объект класса FormData, принмиает форму
  const data = {}; //   в  цикле будем его заполнять

  for(const elem of formData){
      // console.log(elem); // elem = ["name", "Руфина"]
      // data[elem[0]] = elem[1];

      // то же самое, только деструктуризацией:
      const [name, value] = elem;
      data[name] = value;    
  }
  console.log('data = ', data)
  sendData(data, showThankYou, showPreloader); // вызов фукнции, preloader- это фнукция

  //console.log(data); //полуичли объект  {name: "dfgdf", surname: "dfgdf", city: "dfgdf", mail: "dfgdf@mail.ru", personal: "agree"}
});
