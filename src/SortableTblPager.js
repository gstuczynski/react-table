import React from 'react';

class SortableTblPager extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				currPage: this.props.curr,
				rowPerPage: this.props.rowPerPage
			};
			this.setPage = this.setPage.bind(this);
			this.addPagge = this.addPagge.bind(this);
			this.subPage = this.subPage.bind(this);
			this.setCurrentPage = this.setCurrentPage.bind(this);
			this.setRowsPerPage = this.setRowsPerPage.bind(this);
			
		}
		componentWillReceiveProps(nextProps) {
			//constructor is only invoked when the component is first created. if data change, need to update on componentWillReceiveProps
			if (nextProps.curr !== this.state.currPage) {
				this.setState({ currPage: nextProps.curr });
			}
			if (nextProps.rowPerPage !== this.state.rowPerPage) {
				this.setState({ rowPerPage: nextProps.rowPerPage });
			}			
		}		
		setCurrentPage(e){			
			this.setPage(parseInt(e.target.value));
		}
		addPagge(){
			if (this.state.currPage >= this.props.totalPage -1)
				return;
			
			this.setPage(this.state.currPage + 1);
		}
		subPage(){
			if (this.state.currPage < 1)
				return;

			this.setPage(this.state.currPage - 1);
		}
		setPage(i){
			this.props.setCurrentPage(i);
			this.setState(
				{
					currPage: i
				}
			);
		}
		setRowsPerPage(e){
			let i = parseInt(e.target.value);
			if(i==='All' || isNaN(i))
				i = this.props.totalsCount;			
			this.props.setRowsPerPage(i);
			this.setState(
				{
					rowPerPage: i
				}
			);
		}
		render() {			
			let nextDisableStyle = ((this.state.currPage + 1) >= (this.props.totalPage ));
			let prevDisableStyle = ((this.state.currPage + 1 ) <= 1);
			let rowPerPage = this.props.totalPage===1?"All":this.props.rowPerPage;

			return (
				<div className="form-group">
					<div className="pager col-sm-7 col-xs-12">
						<input type="button" className="btn btn-warning" name="" disabled={prevDisableStyle} 
							onClick={this.subPage} value="<" />
						<div onClick={this.setCurrentPage} value={this.state.currPage} className="form-control page-select">
							{
								Array.from(new Array(this.props.totalPage), (x,i) => {return (<button key={i} value={i}>{i + 1}</button>);})
							}		
						</div>
						<input type="button" className="btn btn-warning" name="" disabled={nextDisableStyle} 
							onClick={this.addPagge} value=">"/>
					</div>
				</div>
			);
		}
}	
SortableTblPager.propTypes = {
	curr: React.PropTypes.number.isRequired,
	rowPerPage: React.PropTypes.number.isRequired,
	totalsCount: React.PropTypes.number.isRequired,
	totalPage: React.PropTypes.number.isRequired,
	setCurrentPage: React.PropTypes.func.isRequired,
	setRowsPerPage: React.PropTypes.func.isRequired
};

export {SortableTblPager};
