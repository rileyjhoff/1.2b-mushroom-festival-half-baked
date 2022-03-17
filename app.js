// import functions and grab DOM elements
import { renderMushroom, renderFriend } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const friendFormEl = document.getElementById('friend-form');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');
// initialize state

const mushroomArr = [1, 2, 3, 4];
let mushroomCount = mushroomArr.length;

const friendData = [
    {
        name: 'James',
        satisfaction: 1,
        preference: Math.ceil(Math.random() * 4)
    },
    {
        name: 'Tam',
        satisfaction: 1,
        preference: Math.ceil(Math.random() * 4)
    },
    {
        name: 'Hunter',
        satisfaction: 1,
        preference: Math.ceil(Math.random() * 4)
    },
    {
        name: 'Alexa',
        satisfaction: 1,
        preference: Math.ceil(Math.random() * 4)
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomArr.push(Math.ceil(Math.random() * 4));
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

addFriendButton.addEventListener('click', () => {
    // get the name from the input
    if (friendInputEl.value === '') {
        const name = `Friend${Math.ceil(Math.random() * 1000)}`;
        const newFriend = { name:name, satisfaction:1 };
        friendData.push(newFriend);
        displayFriends();
    } else {
        const name = friendInputEl.value;
        // create a new friend object
        const newFriend = { name:name, satisfaction:1 };
        // push it into the friends state array, passed in as an argument
        friendData.push(newFriend);
        // reset the input
        friendInputEl.value = '';
        // display all the friends (use a function here)
        displayFriends();
    }
});

friendFormEl.addEventListener('submit', (e) => {
    // get the name from the input
    e.preventDefault();
    const data = new FormData(friendFormEl);

    if (data.get('friend-name') === '') {
        const name = `Friend${Math.ceil(Math.random() * 1000)}`;
        const newFriend = { name:name, satisfaction:1 };
        friendData.push(newFriend);
        displayFriends();
    } else {
        const name = data.get('friend-name');
        // create a new friend object
        const newFriend = { name:name, satisfaction:1 };
        // push it into the friends state array, passed in as an argument
        friendData.push(newFriend);
        // reset the input
        friendFormEl.reset();
        // display all the friends (use a function here)
        displayFriends();
    }
});

function displayFriends() {
    // clear out the friends in DOM
    friendsEl.textContent = '';
    // for each friend in state . . .
    for (let friend of friendData) {
        // use renderFriend to make a friendEl
        const friendEl = renderFriend(friend);
        // this is a clickable list, so . . .
        //     add an event listener to each friend
        //         and if the friend's satisfaction level is below 3 and you have mushrooms left
        //             increment the friends satisfaction and decrement your mushrooms
        //             then display your friends and mushrooms with the updated state
        friendEl.addEventListener('click', () => {
            if (friend.satisfaction === 3 && mushroomCount === 0) {
                alert(`${friend.name} is full, and you're out of mushrooms! Time to forage!`);
            } else if (friend.satisfaction < 3 && mushroomCount === 0) {
                alert(`Oops, you're out of mushrooms! Time to forage!`);
            } else if (friend.satisfaction === 3 && mushroomCount > 0) {
                alert(`${friend.name} is full. Maybe another friend could use a mushroom.`);
            } else if (friend.satisfaction < 3 && mushroomCount > 0) {
                friend.satisfaction++;
                mushroomArr.shift();
                displayFriends();
                displayMushrooms();
                console.log(mushroomArr);
            }
        });
        // append the friendEl to the friends list in DOM
        friendsEl.append(friendEl);
    }
}

function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.textContent = '';
    for (let mushrooms of mushroomArr) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const addMushroom = renderMushroom();
        addMushroom.classList.add(`mushroom-${mushrooms}`);
        mushroomsEl.append(addMushroom);
    }
}

// Math.ceil(Math.random() * 4)

displayFriends();
displayMushrooms();
