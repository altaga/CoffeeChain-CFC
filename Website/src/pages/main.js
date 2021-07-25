// Basic imports

import '../assets/main.css';
import { Component } from 'react';

import MainBar from '../components/mainBar';

import reactAutobind from 'react-autobind';
import Search from "../components/search"
import Products from '../components/products';
import { connect } from "react-redux"
import search_action from "../redux/actions/asyncActions/searchAction"
import Scanner from '../components/scanner';


class Main extends Component {
  constructor(props) {
    super(props);
    reactAutobind(this)
    this.state = {
      input: ""
    }
  }
  render() {
    let comp = ""
    if (this.props.my_page.page === 0) {
      comp = <Search />
    }
    else if (this.props.my_page.page === 1) {
      comp = <Products />
    }
    else if (this.props.my_page.page === 2) {
      comp = <Scanner />
    }
    return (
      <div className="App">
        <div style={{ padding:"10px",width: "100%", height: "60px", position: "fixed" }}>
          <MainBar />
        </div>
        <div style={{height: "100%",width:"100%"}}>
          <div style={{paddingTop:"30px"}} >
            {comp}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    my_page: state.my_page,
    search: state.search
  }
}

const mapDispatchToProps =
{
  search_action
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);