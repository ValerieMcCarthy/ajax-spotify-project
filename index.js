$(document).ready(addFormEventHandler)

function addFormEventHandler() {
  $("form#spotify-form").submit(handleFormSubmit)
}

function handleFormSubmit(event) {
  event.preventDefault()
  findAndRenderArtsits()
}

function findAndRenderArtsits() {
  const URL = "https://api.spotify.com/v1/"

  var $input = $("input#query")
  var userInput = $input.val()
  var query = userInput.replace(/ /g, "+")
  $input.val("")
  // empty out the input form

  $.ajax({
    url: `${URL}search?q=${query}&type=artist`,
    success: renderArtists
  })
}



function renderArtists(data) {
    let artistList = $('.js--spotify-list')
    artistList.html("")
    // clear listed search results

    function renderArtist(artistObject) {
      var name = artistObject.name
      var spotifyUrl = artistObject.external_urls.spotify
      var followers = artistObject.followers.total
      if (artistObject.images.length > 0) {
        var artistImage = artistObject.images[0].url
      }

      artistList.append(`<li class='collection-item bold js--artist-name'>${name}</li>`)
      var spotifyUrl = `<a href='${spotifyUrl}'>Spotify URL</a>`
      var followers = `Followers: ${followers}`
      if (artistObject.images.length > 0) {
        var images = `<a href='${artistImage}'>Artist Image</a>`
      } else {
        var images = "No Image for this Artist"
      }

      artistList.append(`<div style='padding-left:40px;' class='inner-item'><li>${spotifyUrl}</li><li>${followers}</li><li>${images}</li></div>`)
      // artistList.append(`<li class='inner-item'>Followers: ${followers}</li>`)
      // if (artistObject.images.length > 0) {
      //   artistList.append(`<li class='inner-item'><a href='${artistImage}'>Artist Image</a></li>`)
      // }
    }
    data.artists.items.forEach(renderArtist)
    $('.inner-item').hide()
    $('.js--artist-name').click(function(event) {
      $(this).next().toggle(1000)
    })
    // $('.inner').hide()
    // $(`.bold`).click(function() {
    //   $(`.inner`).toggle(1000)
    // })
    // $('.inner').hide()
}


// $(function(){
//   $('.bold').accordion()
// })

// $('bold').click(function() {
//   $bold = $(this)
//   $inner = $bold.next()
//
//   $inner.slideToggle(500, function() {
//     $bold.text(function() {
//       return $inner.is(":visible") ? "Collapse" : "Expand"
//     })
//   })
// })


// function showListener() {
//   $(document).on('click', '.bold', function(event) {
//
//   })
// }
