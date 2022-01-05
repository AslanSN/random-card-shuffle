import "bootstrap";
import "./style.css";

const cardHTML = document.querySelector(".card");
const number = document.querySelector("#number");
const suit = document.querySelector("#suit");
const random = document.querySelector("#random");

const cardsValues = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const cardsSuits = ["suitdiamonds", "suithearts", "suitclubs", "suitspades"];

/**
 * !Creates an array of objects
 * @param {Array} arrV bigger | V for Value
 * @param {Array} arrS smaller | S for String
 * @returns Array of Objects
 */
const deckCreator = (arrS, arrV) => {
  function Card(value, suit, boolean) {
    (this.value = value), (this.suit = suit), (this.used = boolean);
  }

  let deck = [];

  for (let i in arrS) {
    for (let j in arrV) {
      deck.push(new Card(String(arrV[j]), String(arrS[i]), false));
    }
  }
  return deck;
};

/**
 * !Random number generator
 * @param {Array} array
 * @returns a random Number
 */
const randomIndex = array => Math.floor(Math.random() * (array.length - 1));

/**
 * !Filter
 * ? Used cards
 * @param {Object} object
 * @returns Not used objects
 */
const usedDeckFilter = object => object.used !== true;

let deck = deckCreator(cardsSuits, cardsValues);
const deckIndex = randomIndex(deck);
let randomCard = deck[deckIndex];
randomCard.used = true;

let notUsedDeck = deck.filter(usedDeckFilter);

/**
 * !Protocol
 * @param {Array} arr
 * @param {Object} card
 * @returns change of object || !Alert
 */
const noMoreCards = (arr, card, bigArr) =>
  arr.length !== 1
    ? (card.used = true) &&
      (randomCard = card) &&
      (notUsedDeck = deck.filter(usedDeckFilter))
    : bigArr.forEach(object => (object.used = false));

/**
 * !Displays a Card on Screen
 * @param {Object} card
 */
const displayCard = card => {
  cardHTML.classList.remove(cardHTML.classList[1]);
  cardHTML.classList.add(card.suit);
  cardHTML.innerHTML = `<p>${card.value}</p>`;

  noMoreCards(notUsedDeck, card, deck);
};

/**
 * !Card Generator
 * @returns new Random Card
 */
const newRandomCard = () => notUsedDeck[randomIndex(notUsedDeck)];

/**
 * !Card Generator
 * @returns Random Value Card
 */
const sameSuit = () => {
  const sameSuitDeck = notUsedDeck.filter(
    object => object.suit == randomCard.suit
  );

  const sameSuitCard = () =>
    sameSuitDeck.length !== 0
      ? sameSuitDeck[randomIndex(sameSuitDeck)]
      : newRandomCard();

  return sameSuitCard();
};

/**
 * !Card Generator
 * @returns Rondom Suit Card
 */
const sameValue = () => {
  const sameValueDeck = notUsedDeck.filter(
    object => object.value == randomCard.value
  );

  const sameValueCard = () =>
    sameValueDeck.length !== 0
      ? sameValueDeck[randomIndex(sameValueDeck)]
      : newRandomCard();

  return sameValueCard();
};

window.onload = displayCard(randomCard);
number.addEventListener("click", () => displayCard(sameSuit()));
suit.addEventListener("click", () => displayCard(sameValue()));
random.addEventListener("click", () => displayCard(newRandomCard()));
