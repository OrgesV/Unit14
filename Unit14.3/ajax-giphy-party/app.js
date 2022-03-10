const images = $('#Images')

$('#form').on('submit',searchClick)
$('#remove').on('click',removeClick)

async function searchClick(e){
	e.preventDefault()
	let response = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${$('#txt').val()}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`)
	$('#txt').val("")
	if(response.data.data.length){
		let rand = Math.floor(Math.random() * response.data.data.length)
		let newDiv = $('<div>',{class : "gifs"});
		let newImg = $('<img>',{
			src: response.data.data[rand].images.original.url,
			class : "imgs"
		});
		newDiv.append(newImg)
		images.append(newDiv)
		console.log(newImg)	
	}

}

function removeClick(){
	$('.gifs').remove()
}