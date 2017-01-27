import React, {Component} from 'react';

class Reader extends Component {
	constructor (props) {
		super(props)
	}
	componentWillMount() {
		this.props.getChapterPage(this.props.chapter)
	}
	componentWillUnmount() {
		this.props.emptyChapterPages()
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.chapter !== this.props.chapter){
			this.props.emptyChapterPages()
			this.props.getChapterPage(nextProps.chapter)
		}
	}
	getCurrentIndex () {
		return this.props.chapters.findIndex(v=>v[3]==this.props.chapter)
	}
	getNextId () {
		let current_index = this.getCurrentIndex()
		let next_index = current_index-1
		if(next_index < 0) return false
		return this.props.chapters[next_index][3]
	}
	getPrevId () {
		let current_index = this.getCurrentIndex()
		let prev_index = current_index+1
		let total = this.props.chapters.length - 1
		if(prev_index > total) return false
		return this.props.chapters[prev_index][3]
	}
	clickNextChapters () {
		let next_id = this.getNextId()
		if(!next_id) return this.props.updateChapter("")
		this.props.updateChapter(next_id)
	}
	clickPrevChapters () {
		let prev_id = this.getPrevId()
		if(!prev_id) return this.props.updateChapter("")
		this.props.updateChapter(prev_id)
	}
	render () {
		let index = "("+this.props.chapters[this.getCurrentIndex()][0]+")"
		let describe = this.props.chapters[this.getCurrentIndex()][2] || ""
		let title = index+" "+describe || 'unknown'
		return (
			<div id="preview">
				<h3>Chapter {title}</h3>
				<div className="inner">
					{
						this.props.pages.map((page, i) => {
							return (
								<div key={'reader_'+i} className="image fit">
									<img src={"https://cdn.mangaeden.com/mangasimg/"+page[1]} alt="" />
									<br/>
								</div>
							)
						})
					}
				</div>
				<a href="#" onClick={this.clickPrevChapters.bind(this)} className="nav previous"><span className="fa fa-chevron-left"></span></a>
				<a href="#" onClick={this.clickNextChapters.bind(this)} className="nav next"><span className="fa fa-chevron-right"></span></a>
			</div>
		)
	}
}

export default Reader