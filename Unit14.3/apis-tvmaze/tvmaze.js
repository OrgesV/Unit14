/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  //retrieve show information
  let res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
  let show = res.data[0].show
  //return specific data from show as an object in an array
  return [
    {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.url
    }
  ]
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */
$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  
  let shows = await searchShows(query);
  populateShows(shows);
  $('#show-episodes-button').show()
  $("#show-episodes-button").on('click', async function handleSearch(){
    console.log("Hello")
    let episodes = getEpisodes(shows[0].id)
    populateEpisodes(await episodes)
  $('#episodes-area').show()
})


});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  //retrieves list of episodes based on show ID
  let response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  let episodes = response.data

  //retrieve specific data from each episode and put it in an array as an object
  let episodesData = episodes.map(function(item){
    return{
      id:item.id,
      name:item.name,
      season:item.season,
      number:item.number
    }
  })
  return episodesData

  // TODO: return array-of-episode-info, as described in docstring above
}
async function populateEpisodes(episodesData){
  let $episodesList = $("#episodes-list");
  $episodesList.empty();
  //create an li with the episode data and add to the DOM
  for(let data of episodesData){
      let $item = $(
        `<li>Episode: (${data.season},${data.number}) </li>`
      );

    $episodesList.append($item);
  }
}