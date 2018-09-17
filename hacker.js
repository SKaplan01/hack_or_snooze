//if both title and url have a value, calls create AndAppendNewLi
function validateInput(title, url, domain) {
  if (title === '' || url === '') {
    alert('Please enter a valid title and url');
  } else {
    createAndAppendNewLi(title, url, domain);
    $('#container-submit').slideToggle();
    $('form').trigger('reset');
  }
}

function createAndAppendNewLi(title, url, domain) {
  let newListItem = $('<li>');
  let newFavoriteIcon = $('<i>');
  newFavoriteIcon.addClass('far fa-star text-muted');

  let newLink = $('<a>');
  newLink.attr('href', url);

  let newTitle = $('<span>');
  newTitle.text(title);

  let newSmallText = $('<small>');
  newSmallText.text(`(${domain})`);
  newSmallText.addClass('text-muted');

  newLink.append(newTitle);
  newListItem.append(newFavoriteIcon, newLink, newSmallText);
  newListItem.children().addClass('pl-2');

  $('ol').append(newListItem);
}

function trimDomainName(url) {
  url = url.replace('https://', '');
  url = url.replace('http://', '');
  url = url.replace('www.', '');
  return url.split('/')[0];
}

function filterByDomainName(event) {
  let domainName = $(event.target).text();
  $(`ol li:contains(${domainName})`).addClass('same-domain');
  $('#container-list li:not(.same-domain)').addClass('li-hidden-domain');
}

$(document).ready(function() {
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

  $('ol').on('click', 'i', function(event) {
    $(event.target).toggleClass('far fas');
    $(event.target)
      .parent()
      .toggleClass('favorite');
  });

  $('#show-favorites').on('click', function(event) {
    $('#container-list li:not(.favorite)').toggleClass('li-hidden-favorites');
  });

  $('ol').on('click', 'small', filterByDomainName);

  $('#home-button').on('click', function(event) {
    $('li').removeClass('li-hidden-favorites li-hidden-domain same-domain');
  });
});
