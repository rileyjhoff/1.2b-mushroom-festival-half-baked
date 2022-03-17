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
        const newFriend = { name:name, satisfaction:1, preference: Math.ceil(Math.random() * 4) };
        friendData.push(newFriend);
        displayFriends();
    } else {
        const name = friendInputEl.value;
        // create a new friend object
        const newFriend = { name:name, satisfaction:1, preference: Math.ceil(Math.random() * 4) };
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
        const newFriend = { name:name, satisfaction:1, preference: Math.ceil(Math.random() * 4) };
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
            if (mushroomArr.length === 0) {
                alert('You dont have any mushrooms to give. Time to go foraging!');
            } else if (friend.satisfaction === 1 && mushroomArr.length > 0 && friend.preference !== mushroomArr[0]) {
                alert(`${friend.name} HATED that mushroom. They don't feel so good.`);
                mushroomArr.shift();
                displayMushrooms();
            } else if (friend.satisfaction === 2 && mushroomArr.length > 0 && friend.preference !== mushroomArr[0]) {
                alert(`${friend.name} HATED that mushroom. They don't feel so good.`);
                friend.satisfaction--;
                displayFriends();
                mushroomArr.shift();
                displayMushrooms();
            } else if (friend.satisfaction === 3 && mushroomArr.length > 0 && friend.preference !== mushroomArr[0]) {
                alert(`${friend.name} is full, which is good because they dont like that type of mushroom. They'll throw it away for you.`);
                mushroomArr.shift();
                displayMushrooms();
            } else if (3 > friend.satisfaction >= 1 && mushroomArr.length > 0 && friend.preference === mushroomArr[0]) {
                alert(`${friend.name} LOVED that mushroom!`);
                friend.satisfaction++;
                displayFriends();
                mushroomArr.shift();
                displayMushrooms();
            } else if (friend.satisfaction === 3 && mushroomArr.length > 0 && friend.preference === mushroomArr[0]) {
                alert(`${friend.name} is full, but they like that kind of mushroom. They'll save it for later.`);
                mushroomArr.shift();
                displayMushrooms();
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

displayFriends();
displayMushrooms();