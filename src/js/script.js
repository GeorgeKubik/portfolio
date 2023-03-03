window.addEventListener('DOMContentLoaded', () => {

	'use strict';

	const hamburger = document.querySelector('.hamburger');
	const menu = document.querySelector('.menu');
	const btnClose = document.querySelector('.menu__close');

	hamburger.addEventListener('click', () =>{
		menu.classList.add('active');
	});

	btnClose.addEventListener('click', () => {
		menu.classList.remove('active');
	});

	const counters = document.querySelectorAll('.skills__level');
	const lines = document.querySelectorAll('.skills__block-scale span');

	counters.forEach( (item, i) => {
		lines[i].style.width = item.innerHTML;
	});

	// forms

	const forms = document.querySelector('.contacts__form');
	const message = {
		loading: 'Загрузка',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	postData(forms);

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.textContent = message.loading;
			form.append(statusMessage);

			const request = new XMLHttpRequest();
			request.open('POST', '../mailer/smart.php');

			const formData = new FormData(form);

			request.send(formData);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					statusMessage.textContent = message.success;
				} else {
					statusMessage.textContent = message.failure;
				}
			});
		});
	}
});


/* window.addEventListener('load', function() {
	function sendData() {
		const XHR = new XMLHttpRequest();
		//Свяжите объект FormData и элемент формы
		const FD = new FormData(form);
		// Определяем, что происходит при успешной отправке данных
		XHR.addEventListener( "load", function(event) {
			alert( 'Данные отправлены' );
		 } );
		 // При ошибке
		XHR.addEventListener( "error", function( event ) {
		alert( 'Oops! Something went wrong.' );
		} );
  		// Настраиваем наш запрос
		XHR.open( "POST", "mailer/smart.php" );
		// Отправляемые данные - это то, что пользователь указал в форме
		XHR.send( FD );
	}
	const form = document.querySelector( ".contacts__form" );
	const formInput = document.forms.name;
	console.log(formInput);
	form.addEventListener( "submit", function ( event ) {
		console.log('Форма отправлена');
		
		if (!formInput.value) {
			console.log('Поле не заполнено');
			event.preventDefault();
		}
		sendData();
	 });
}); */