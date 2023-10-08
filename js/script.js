const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const clearBtn = document.querySelector('.clear')
const sendBtn = document.querySelector('.send')
const popup = document.querySelector('.popup')


const showError = (input, msg) => {
	//argument input przechowuje inputy, argument msg przechowuje placeholdery
	const formBox = input.parentElement // dzięki metodzie .parentElement odwołujemy się do rodzica elementu na którym pracujemy.
	// console.log(formBox);
	// <div class="form-box">
	const errorMsg = formBox.querySelector('.error-text')
	formBox.classList.add('error') //dzięki odpowiedniemu ostylowaniu w CSS dodanie klasy error spowoduje poswietlenie błędnie wypełnionych pól i aktywowanie p z klasą error-text (komunikat o błędzie)
	errorMsg.textContent = msg // argument msg przechowuje placeholdery.
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkForm = input => {
	//argument input w funkcji checkForm przechowuje tablicę z naszymi inputami.
	input.forEach(el => {
		//argument el odnosi się do każdej zmiennej, którą umieściliśmy w tablicy
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
			console.log('ok')
		}
	})
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z minimum ${min} znaków`)
	}
}

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Podane hasła nie są takie same.')
	}
}

const checkMail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'Podany adres jest nieprawidłowy.')
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box')
	let errorCount = 0
	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		popup.classList.add('show-popup')
	}
}

sendBtn.addEventListener('click', e => {
	e.preventDefault() //dzięki tej metodzie elementy typu button czy input znajdujące się w form nie będą powodowały automatycznego przeładowania się strony po ich użyciu.
	checkForm([username, pass, pass2, email])
	checkLength(username, 3)
	checkLength(pass, 8)
	checkPassword(pass, pass2)
	checkMail(email)
	checkErrors()
})

clearBtn.addEventListener('click', e => {
	e.preventDefault() //dzięki tej metodzie elementy typu button czy input znajdujące się w form nie będą powodowały automatycznego przeładowania się strony po ich użyciu.
	;[username, pass, pass2, email].forEach(el => {
		//Dodanie zmiennych typu input do tablicy sprawi że łatwiej się bedzie pracowało w pętli.
		el.value = ''
		clearError(el)
	})
})

// jeśli w html mamy element input lub button type submit w form, te automatycznie wywołują event submit.
// Powoduje to automatyczne przeładowanie strony, aby temu zapobiec możemy skorzystać z preventDefault().

/*
WALIDACJA FORMULARZA:
1. Zbudujemy 3 funkcje, które:
a. Pierwsza funkcja będzie sprawdzała czy wszystkie pola są wypełnione (checkForm).
b. Druga będzie wyświetlała błąd w polu które jest niewypełnione (showError).
c. Trzecia będzie odpowiadała za usunięcie błędu.
 */

/*
PODSUMOWANIE:
Krok 1: Początkowo, kod przypisuje zmiennej username element HTML o identyfikatorze username, zmiennej pass element o identyfikatorze password, pass2 element o identyfikatorze password2, email element o identyfikatorze email, clearBtn element o klasie clear, sendBtn element o klasie send, oraz popup element o klasie popup. Te zmienne reprezentują odpowiednie elementy formularza oraz przyciski.

Krok 2: Następnie, kod definiuje funkcję showError(input, msg), która przyjmuje dwa argumenty: input (element input) i msg (komunikat błędu). Funkcja ta dodaje klasę error do rodzica elementu input, co spowoduje podświetlenie błędnie wypełnionych pól, oraz ustawia tekst komunikatu błędu w odpowiednim elemencie.

Krok 3: Funkcja clearError(input) usuwa klasę error z rodzica elementu input, czyli przywraca standardowe stylowanie pola.

Krok 4: Funkcja checkForm(input) sprawdza, czy wszystkie pola w formularzu zostały wypełnione. Przyjmuje tablicę input, która zawiera elementy formularza. Dla każdego elementu, sprawdza, czy jego wartość jest pusta. Jeśli tak, wywołuje funkcję showError, aby wyświetlić komunikat błędu.

Krok 5: Funkcja checkLength(input, min) sprawdza, czy długość tekstu w danym polu formularza jest większa lub równa wartości min. Jeśli nie, wywołuje funkcję showError, aby wyświetlić komunikat błędu z informacją o minimalnej długości.

Krok 6: Funkcja checkPassword(pass1, pass2) porównuje dwie wartości haseł (przekazane jako pass1 i pass2) i wywołuje funkcję showError, jeśli są różne.

Krok 7: Funkcja checkMail(email) sprawdza, czy wprowadzony adres email jest prawidłowy za pomocą wyrażenia regularnego. Jeśli adres jest nieprawidłowy, wywołuje funkcję showError.

Krok 8: Funkcja checkErrors() przegląda wszystkie elementy formularza i liczy, ile z nich ma nadaną klasę error (czyli ile z nich ma błędy). Jeśli żadne z pól nie ma błędów (errorCount === 0), to uaktywnia popup.

Krok 9: Nasłuchiwanie kliknięcia na przycisk "sendBtn" i wykonanie odpowiednich funkcji w odpowiedzi na kliknięcie. Przeciwdziała automatycznemu przeładowaniu strony poprzez e.preventDefault().

Krok 10: Nasłuchiwanie kliknięcia na przycisk "clearBtn" i wykonanie odpowiednich funkcji w odpowiedzi na kliknięcie. Przeciwdziała automatycznemu przeładowaniu strony poprzez e.preventDefault().
*/
