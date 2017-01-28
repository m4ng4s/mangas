import React,{ Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import * as misc from './../lib/misc';

import Reader from './Reader';

@observer
class App extends Component {

  constructor(props) {
    super(props);
  } 

  componentWillMount() {
    this.props.appState.getListManga()
  }

  componentDidMount() {
    window.addEventListener('scroll', (e) => {
      let el = document.getElementsByClassName("columns")[0]
      misc.detectBottomScroll(window, el, () => {
        this.props.appState.updateListManga()
      })
    })
    setTimeout(() => {
      misc.init_style()
    }, 1000)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', (e) => {
      let el = document.getElementsByClassName("columns")[0]
      misc.detectBottomScroll(window, el, () => {
        this.props.appState.updateListManga() // update manga list
      })
    })
  }

  renderHeader () {
    return (
      <header id="header">
        <div className="inner">
          <div className="content">
            <h1>Mangas</h1>
            <h2>
              Manga reader 
              for everyone.
            </h2>
            {this.props.appState.screen_loading?
              (<a href="#" style={{display: 'none'}} className="button big alt">
                <span>let's go</span>
              </a>): 
              (<a href="#" className="button big alt">
                <span>let's go</span>
              </a>)}
          </div>
          <a onClick={this.handleClickRestart.bind(this)} href="#" className="button hidden">
            <span>let's go</span>
          </a>
        </div>
      </header>
    )
  }

  handleClickRestart (e) {
    e.preventDefault()
    this.props.appState.restartApp()
  }

  handleClickDetail (manga, e) {
    e.preventDefault()
    this.props.appState.getDetailManga(manga)
  }

  renderImages () {
    console.log(':: render Images')
    return this.props.appState.list_manga.map((image,i) => {
        return (
          <div key={'image'+i} className="image fit">
            <span style={{fontSize: '12pt'}}>{image.name}</span>
            <a href="#" onClick={this.handleClickDetail.bind(this, image)}><img src={image.url_cover} alt="" /></a>
          </div>
        )
      })
    
  }

  handleClickChapterActive (c, e) {
    e.preventDefault()
    this.props.appState.setChapterActive(c[3])
  }

  renderChapter () {
    let chapters = this.props.appState.manga_detail_chapters
    console.log('>> rendre chapter ', chapters)
    return (
      <div>
        <span>List chapters : </span>
        <ul>
        {
          chapters.map((c,i) => {
            return (
              <li key={i}>
                <a onClick={this.handleClickChapterActive.bind(this, c)} href="#">chapter {!c[2]?c[0]:"("+c[0]+")"+" "+c[2]}</a>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }

  renderDetail () {
    let manga = this.props.appState.manga_detail
    let {chapters, title, image, author, description} = manga
    return (
      <div id="preview" className="vertical">
        <div className="inner">
          <div className="image fit">
            <img src={'https://cdn.mangaeden.com/mangasimg/'+image} alt="" />
          </div>
          <div className="content">
            <header>
              <h2>{title || 'title unknown'}</h2>
            </header>
            <p dangerouslySetInnerHTML={{__html: description || 'no description'}}></p>
            <span>Author : {author}</span>
            {this.props.appState.manga_detail_chapters.length > 0? this.renderChapter(): (null)}
          </div>
        </div>
        <a href="detail1.html" style={{display:'none'}} className="nav previous"><span className="fa fa-chevron-left"></span></a>
        <a href="detail2.html" style={{display:'none'}} className="nav next"><span className="fa fa-chevron-right"></span></a>
      </div>
    ) 
  }

  renderMain () {
    return (
      <div id="main">
        <div className="inner">
          <div className="columns">
            {this.props.appState.screen_loading?(<div>loading</div>):this.renderImages()}
          </div>
        </div>
      </div>
    )
  }

  renderFooter () {
    return (
      <footer id="footer">
        <a href="#" className="info fa fa-info-circle"><span>About</span></a>
        <div className="inner">
          <div className="content">
            <h3>Everyone Have Rights To Read The Manga.</h3>
            <p>if you have any issues or question in this application, feel free to contact me.</p>
          </div>
          <div className="copyright">
            <h3>Follow me</h3>
            <ul className="icons">
              <li><a href="https://twitter.com/_ma4m" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
            </ul>
            &copy; Mangas 2016. Creator: <a href="https://kelabang.github.io">Imam T</a>. Design: <a href="https://templated.co">TEMPLATED</a>. Source: <a href="http://www.mangaeden.com/">Manga Eden</a>.
          </div>
        </div>
      </footer>
    )
  }
  renderFront() {
    return (<div>
      {
        !this.props.appState.manga_detail_id?
        this.renderMain():
        this.renderDetail()
      }
    </div>)
  }
  handleGetChapterPage (chapter) {
    this.props.appState.getChapterManga(chapter)
  }
  handleEmptyChapterPages () {
    this.props.appState.emptyChapterPages()
  }
  handleUpdateChapterPage(chapter) {
    this.props.appState.updateChapterPage(chapter)
  }
  render () {
    let reader_mode = (this.props.appState.manga_chapter_active)? true: false  
    return (
      <div id="body">
        {this.renderHeader()}
        {reader_mode? (<Reader

          chapters={this.props.appState.manga_detail_chapters}
          chapter={this.props.appState.manga_chapter_active}
          getChapterPage={this.handleGetChapterPage.bind(this)}
          emptyChapterPages={this.handleEmptyChapterPages.bind(this)}
          updateChapter={this.handleUpdateChapterPage.bind(this)}
          pages={this.props.appState.pages}

        />):this.renderFront()}
        {this.renderFooter()}
      </div>
    )
  }

  renderBottomMark() {
    return (
      <div className="bottom-mark">
        bottom mark
      </div>
    )
  }

};

export default App;
