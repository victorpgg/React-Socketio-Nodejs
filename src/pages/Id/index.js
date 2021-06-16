import React, {Component} from 'react';
import BarChart from './BarChart';

class Id extends Component {
  
    state = {
      data: [1, 2, 3, 4, 5, 6],
      width: 700,
      height: 500,
    }
  
    render() {
      return (
        <div className="App">
          <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
        </div>
      );
    }
}

export default Id;