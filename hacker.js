//if both title and url have a value, calls createAndAppendNewLi
function validateInput(title, url, domain) {
  if (title === '' || url === '') {
    alert('Please enter a valid title and url');
  } else {
    createAndAppendNewLi(title, url, domain);
    $('#container-submit').slideToggle();
    $('form').trigger('reset');
  }
}

//accepts strings for the text of title, url, and domain
function createAndAppendNewLi(title, url, domain) {
  //creates a new Li and a star icon <i>
  let newListItem = $('<li>');
  let newFavoriteIcon = $('<i>');
  newFavoriteIcon.addClass('far fa-star text-muted');

  //creates <a> that links to article
  let newLink = $('<a>');
  newLink.attr('href', url);
  newLink.css({
    color: 'black',
    'font-weight': 'bold'
  });

  //span holds article title and is appended to <a> tag
  let newTitle = $('<span>');
  newTitle.text(title);
  newLink.append(newTitle);

  //creates <small> tag with domain name as text
  let newSmallText = $('<small>');
  newSmallText.text(`(${domain})`);
  newSmallText.addClass('text-muted');

  //appends <i> <a> and <small> to the li
  newListItem.append(newFavoriteIcon, newLink, newSmallText);
  newListItem.children().addClass('pl-2');

  //appends li to the list
  $('ol').append(newListItem);
}

//takes a string representing a link and returns a string of domain name only
//Example 'http://google.com/cats/best-cats' --> returns 'google.com'
function trimDomainName(url) {
  url = url.replace('https://', '');
  url = url.replace('http://', '');
  url = url.replace('www.', '');
  return url.split('/')[0];
}

//when you click a domain name, hides the li's whose domain names do not match
//to restore full list, click home button
function filterByDomainName(event) {
  let domainName = $(event.target).text();
  $(`ol li:contains(${domainName})`).addClass('same-domain');
  $('#container-list li:not(.same-domain)').addClass('li-hidden-domain');
}

$(document).ready(function() {
  //hides and shows the form
  $('#show-submit').on('click', function(event) {
    $('#container-submit').slideToggle();
  });

  //On form submit, creates new list item and appends to DOM
  $('form').on('submit', function(event) {
    event.preventDefault();
    let title = $('#title').val();
    let url = $('#url').val();
    let domain = trimDomainName(url);
    validateInput(title, url, domain);
  });

  //toggles a class of "favorite" to li when the star is clicked (marks as a favorite)
  $('ol').on('click', 'i', function(event) {
    $(event.target).toggleClass('far fas');
    $(event.target)
      .parent()
      .toggleClass('favorite');
  });

  //toggles to filter the li's by a class of favorite
  $('#show-favorites').on('click', function(event) {
    $('#container-list li:not(.favorite)').toggleClass('li-hidden-favorites');
  });

  $('ol').on('click', 'small', filterByDomainName);

  $('#home-button').on('click', function(event) {
    $('li').removeClass('li-hidden-favorites li-hidden-domain same-domain');
  });
});
