import React, { Component } from "react";

export default class SearchConferences extends Component {
  constructor(props) {
    super(props);

    this.state= {
      conferences: conferences
    };
  }

  render(){
    return(
      console.log(conferences)
    )
  }
}
// import React, { Component } from "react";
//
// // Let's create a "real-time search" component
//
// export default class SearchNotes extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       notes: [],
//       getInitialState: function() {
//         return { searchString: '' };
//       },
//     };
//
//     handleChange = event => {
//       this.setState({
//         searchString: event.target.value
//       });
//     };
//
//     searchingNotes = () => {
//       const notesSearch = this.props.items,
//         searchString = this.state.searchString.trim().toLowerCase();
//
//       if(searchString.length > 0) {
//         notes = notesSearch.filter(function(l){
//           return l.name.toLowerCase().match( searchString );
//         });
//       }
//     }
//   }
//   render() {
//     return (
//       <div>
//         <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />
//         <ul>
//           { notes.map(function(l){return <li>{l.name} <a href={l.url}>{l.url}</a></li>}) }
//         </ul>
//       </div>
//     );
//   }
// }
