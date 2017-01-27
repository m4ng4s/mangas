import axios from 'axios';

class mangaeden {
	constructor () {
		this.name = 'mangaeden'
	}
	apiGetChapterPage (chapter) {
		console.log('apiGetChapterPage')
		return axios.get('http://www.mangaeden.com/api/chapter/'+chapter+'/')
			.then(r => {
				return r.data
			})
	}
	apiGetList () {
		console.log('apiGetList')
		// https://www.mangaeden.com/api/list/[language]/ 
		let language = 0 // 0 engilsh, 1 italy
		// let headers = new Headers({
		// 	'Content-Type': 'text/plain',
		// 	'Access-Control-Allow-Origin': '*'
		// });
		// let config = { headers,
		//                mode: 'cors'};
		// fetch('https://www.mangaeden.com/api/list/'+language+'/', config)	
		// 	.then(r => {
		// 		console.log('response', r)
		// 	})	
		// 	
		let config = {
			// headers: {'Access-Control-Allow-Origin': '*'},
		}
		return axios.get('http://www.mangaeden.com/api/list/'+language+'/',config)
			.then(r => {
				console.log('r --', r)
				return r.data
			})
	}
	apiGetInfo (id) {
		console.log('apiGetInfo')
		return axios.get('http://www.mangaeden.com/api/manga/'+id+'/')
			.then(r => {
				return r.data
			})
	}
}

export default mangaeden