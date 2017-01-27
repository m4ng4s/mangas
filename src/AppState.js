import { observable } from 'mobx';
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
  @observable list_manga = []
  @observable manga_detail_id = ""
  @observable manga_detail_chapters = []
  @observable manga_detail = {}
  @observable manga_chapter_active = ""
  @observable pages = []

  constructor() {
    // setInterval(() => {
    //   this.timer += 1;
    // }, 1000);
    this.source = new mangaeden()
  }

  restartApp() {
    // this.list_manga = []
    this.manga_detail_id = ""
    this.manga_detail = {}
    this.manga_chapter_active = ""
    // this.getListManga()
  }

  setChapterActive (chapter) {
    this.manga_chapter_active = chapter || ""
  }

  emptyChapterPage () {
    this.manga_detail_chapters = []
  }

  emptyChapterPages() {
    this.pages = []
  }

  getChapterManga (chapter) {
    this.screen_loading = true 
    this.source.apiGetChapterPage(chapter)
        .then(page => {
          console.log('>> return get chapter manga', page)
          this.pages = page.images
          this.screen_loading = false
        })
  }

  updateChapterPage(chapter) {
    this.manga_chapter_active = chapter
  }

  getListManga () {
  	this.screen_loading = true
  	this.source.apiGetList()
        .then(list => {
          console.log('result')
          console.log(list)
          if(list.manga) list.manga.some((manga, i) => {
            if(i > 100) return true
            this.list_manga.push({
              id: manga.i,
              name: manga.t,
              url_cover: 'https://cdn.mangaeden.com/mangasimg/'+manga.im,
              tags: manga.c,
            })
            return false
          })
          this.screen_loading = false
        })
  }

  getDetailManga (manga) {
    console.log(':: getDetailManga', manga)
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

  resetTimer() {
    this.timer = 0;
  }
}

export default AppState;
