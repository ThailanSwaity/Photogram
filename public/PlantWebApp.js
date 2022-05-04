const socket = io();

function scrollToTop() {
  window.scrollTo(0, 0);
}

/*
  Loads a random yes/no from yesno.wtf and creates all of the necessary html
  to make the post
*/
const read = async () => {
  try {
    const res = await fetch('https://yesno.wtf/api');
    const out = await res.json();

    let container = document.createElement('div');
    container.className = 'pane';

    let post_bar = document.createElement('div');
    post_bar.className = 'post_bar';

    let post_info = document.createElement('div');
    post_info.className = 'post_info';

    let info = document.createElement('p');
    info.innerHTML = 'midnightthaifood';
    info.className = 'info_item no_select pointer';

    let profile_picture = document.createElement('img');
    profile_picture.src = 'images/profile.jpg';
    profile_picture.className = 'profile_header pointer';

    post_info.appendChild(profile_picture);
    post_info.appendChild(info);
    post_bar.appendChild(post_info);

    let ellipse = document.createElement('h2');
    ellipse.innerHTML = '...';
    ellipse.className = 'ellipse no_select pointer';

    post_bar.appendChild(ellipse);

    container.appendChild(post_bar);

    let img = document.createElement('div');
    img.style.backgroundImage = 'url("' + out.image + '")';
    img.className = 'blow_up';
    img.tabIndex = 0;
    container.appendChild(img);

    let button_container = document.createElement('div');
    button_container.className = 'button_container';

    let like_button = document.createElement('img');
    like_button.src = 'images/likebutton2.png';
    like_button.alt = 'not_liked';
    like_button.className = 'button pointer';

    like_button.onclick = function(ev) {
      button = ev.target;
      if (button.alt == 'not_liked') {
        button.src = 'images/likebutton3.png';
        button.alt = 'liked';
        button.className = 'button pointer liked';
      } else {
        button.src = 'images/likebutton2.png';
        button.alt = 'not_liked'
        button.className = 'button pointer';
      }
    }
    button_container.appendChild(like_button);

    let comment_button = document.createElement('img');
    comment_button.src = 'images/commentbutton.png';
    comment_button.className = 'button pointer';
    button_container.appendChild(comment_button);

    let share_button = document.createElement('img');
    share_button.src = 'images/sharebutton.png';
    share_button.className = 'button pointer';
    button_container.appendChild(share_button);

    let thumb_button = document.createElement('img');
    thumb_button.src = 'images/thumbbutton.png';
    thumb_button.className = 'button pointer';
    thumb_button.id = 'thumb_button';
    thumb_button.alt = 'not_flagged';

    thumb_button.onclick = function(ev) {
      button = ev.target;
      if (button.alt == 'not_flagged') {
        button.src = 'images/thumbbutton2.png';
        button.alt = 'flagged';
      } else {
        button.src = 'images/thumbbutton.png';
        button.alt = 'not_flagged';
      }
    }

    button_container.appendChild(thumb_button);

    container.appendChild(button_container);

    document.querySelector('body').appendChild(container);
    console.log(out);
  } catch (err) {
    throw err;
  }
}

/*
  Creates all of the html elements that come together to make a post.
  Also assigns the css classes and ids. Aswell as links the photographers
  page url to the post title
*/
const addPost = (photo) => {
  let container = document.createElement('div');
  container.className = 'pane';

  let post_bar = document.createElement('div');
  post_bar.className = 'post_bar';

  let post_info = document.createElement('div');
  post_info.className = 'post_info';

  let info = document.createElement('p');

  let photographer_link = document.createElement('a');
  photographer_link.innerHTML = photo.photographer;
  photographer_link.href = photo.photographer_url;
  photographer_link.target = '_blank';
  info.className = 'info_item no_select pointer';
  info.appendChild(photographer_link);

  let profile_picture = document.createElement('img');
  profile_picture.src = 'images/profile.jpg';
  profile_picture.className = 'profile_header pointer';

  post_info.appendChild(profile_picture);
  post_info.appendChild(info);
  post_bar.appendChild(post_info);

  let ellipse = document.createElement('h2');
  ellipse.innerHTML = '...';
  ellipse.className = 'ellipse no_select pointer';

  post_bar.appendChild(ellipse);

  container.appendChild(post_bar);

  let img = document.createElement('div');
  img.style.backgroundImage = 'url("' + photo.src.large2x + '")';
  img.className = 'blow_up';
  img.tabIndex = 0;
  container.appendChild(img);

  let button_container = document.createElement('div');
  button_container.className = 'button_container';

  let like_button = document.createElement('img');
  like_button.src = 'images/likebutton2.png';
  like_button.alt = 'not_liked';
  like_button.className = 'button pointer';

  like_button.onclick = function(ev) {
    button = ev.target;
    if (button.alt == 'not_liked') {
      button.src = 'images/likebutton3.png';
      button.alt = 'liked';
      button.className = 'button pointer liked';
    } else {
      button.src = 'images/likebutton2.png';
      button.alt = 'not_liked'
      button.className = 'button pointer';
    }
  }
  button_container.appendChild(like_button);

  let comment_button = document.createElement('img');
  comment_button.src = 'images/commentbutton.png';
  comment_button.className = 'button pointer';
  button_container.appendChild(comment_button);

  let share_button = document.createElement('img');
  share_button.src = 'images/sharebutton.png';
  share_button.className = 'button pointer';
  button_container.appendChild(share_button);

  let thumb_button = document.createElement('img');
  thumb_button.src = 'images/thumbbutton.png';
  thumb_button.className = 'button pointer';
  thumb_button.id = 'thumb_button';
  thumb_button.alt = 'not_flagged';

  thumb_button.onclick = function(ev) {
    button = ev.target;
    if (button.alt == 'not_flagged') {
      button.src = 'images/thumbbutton2.png';
      button.alt = 'flagged';
    } else {
      button.src = 'images/thumbbutton.png';
      button.alt = 'not_flagged';
    }
  }

  button_container.appendChild(thumb_button);

  container.appendChild(button_container);

  document.querySelector('body').appendChild(container);
  //console.log(photo);
}

/*
  Receives the server's response containing the data for new images
  and adds them to the html using the addPost() function
*/
socket.on('post_load', (data) => {
  console.log(data.page);
  for (picture of data.photos) {
    addPost(picture);
  }
});

var page = 1;
var query = 'Nature';

/*
  Sets the query type from the input the user gives in the search bar.
*/
function search() {
  if (event.keyCode != 13) {
    return;
  }
  search_bar = document.getElementById('searchBar');
  if (search_bar.value == '') {
    return;
  }
  query = search_bar.value;
  search_bar.placeholder = search_bar.value;
  search_bar.value = '';
  console.log(query);
  page = 1;
}

/*
  Loads new content and increments the page whenever the user scrolls
  to the bottom of the page.
*/
window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
    socket.emit('post_request', { query: query, page: page });
    page++;
  }
}

read();
read();
