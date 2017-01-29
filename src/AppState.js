import { observable, action } from 'mobx';
import mangaeden from './sources/mangaeden'

class AppState {
  @observable timer = 0;
  @observable screen_loading = false;
  @observable source = 'mangaeden';
  // @observable list_manga = [{
  //   name: 'aa',
  //   url_cover: 'images/pic01.jpg',
  //   tags: ''
  // }]
  @observable list_manga = [] // list manga to display
  @observable list_manga_store = [] // list manga that stored 
  @observable manga_detail_id = "" // manga detail id
  @observable manga_detail_chapters = [] // manga detail chapters
  @observable manga_detail = {} // manga detail datas
  @observable manga_chapter_active = "" // manga that active
  @observable pages = []  // list manga image to read

  constructor() {
    this.source = new mangaeden()
  }

  @action restartApp() {
    this.manga_detail_id = ""
    this.manga_detail = {}
    this.manga_chapter_active = ""
  }

  @action restartChapter() {
    this.manga_chapter_active = ""
  }

  @action setChapterActive (chapter) {
    this.manga_chapter_active = chapter || ""
  }

  @action emptyChapterPage () {
    this.manga_detail_chapters = []
  }

  @action emptyChapterPages() {
    this.pages = []
  }

  @action getChapterManga (chapter) {
    this.screen_loading = true 
    this.source.apiGetChapterPage(chapter)
        .then(page => {
          this.pages = page.images.reverse()
          this.screen_loading = false
        })
  }

  @action updateChapterPage(chapter) {
    this.manga_chapter_active = chapter
  }

  @action updateListManga(){ // explicit data
    console.log(':: updateListManga')
    let take = 20 // take list manga
    let last_index = this.list_manga.length - 1 
    let rslice = this.list_manga_store.splice(last_index, take)
    rslice
        .map((manga, i) => {
          this.list_manga.push({
            id: manga.i,
            name: manga.t,
            url_cover: 'https://cdn.mangaeden.com/mangasimg/'+manga.im,
            tags: manga.c,
          })
        })
  }

  @action getListManga () {
  	this.screen_loading = true
  	this.source.apiGetList()
        .then(list => {
          let slice_array = []
          this.list_manga_store = list.manga.reverse()
          list.manga.reverse().slice(1, 50) // get slice n of array
              .map((manga, i) => {
                this.list_manga.push({
                  id: manga.i,
                  name: manga.t,
                  url_cover: 'https://cdn.mangaeden.com/mangasimg/'+manga.im,
                  tags: manga.c,
                })
              })
          this.screen_loading = false
        })
  }

  @action changeMangaCover (i) {
    this.list_manga[i].url_cover = 'images/placeholder.gif'
  }

  @action getDetailManga (manga) {
    this.screen_loading = true
    let id = manga.id
    this.source.apiGetInfo(id)
        .then(info => {
          let {id, chapters} = info
          this.manga_detail_id = manga.id
          this.manga_detail = info
          this.manga_detail_chapters = chapters
          this.screen_loading = false
          console.log('return info ', info)
        })
  }

}

export default AppState;
