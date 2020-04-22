var HomeListing = React.createClass({
  /*One option is to pull data from, and save data to,
    a json url for testing. On a larger scale,
    this React output would be part of a larger app
    where the data is saved in a database as part of
    an MVC, where React is the View in the
    Model-View-Controller
  */
  loadHomesFromServer: function() {
    //We're going to hard-code this information for testing purposes.
    var homes = [
      {
          "address": "12345 Beverly Dr",
          "description": "This is a home in the city",
          "photo": "assets/images/home.jpg",
          "saves": 52,
          "saved": false
      },
      {
        "address": "98765 Tweety Ln",
        "description": "This is a home in the suburbs",
        "photo": "assets/images/home.jpg",
        "saves": 123,
        "saved": true
      },
      {
        "address": "1 Small St.",
        "description": "This is a nice little country home",
        "photo": "assets/images/home.jpg",
        "saves": 189,
        "saved": false
      }
    ];
    this.setState({homes: homes});
  },
  loadSavesFromServer: function() {
    //Again, we hard-code for testing
    var saves = [
      {
        "saves": 52,
        "saved": false
      },
      {
        "saves": 123,
        "saved": true
      },
      {
        "saves": 189,
        "saved": false
      }
    ];
    this.setState({saves: saves});
  },
	toggleSave: function(index) {
    
    var saves = this.state.saves;
    
    //If the user has already saved the home, remove and subtract one.
    //Otherwise, do the opposite
  	if (saves[index].saved) {
      saves[index].saves--;
      saves[index].saved = false;
		}
		else {
  		saves[index].saves++;
      saves[index].saved = true;
		}
    
    //Set the saves state with the new data
		this.setState({
			saves: saves,
		});
    
    //This is where we would save the information if this were part of a larger app
    
    //Return whether it's now saved, in case the child function needs this information
    return saves[index].saved;

	},
	getInitialState: function(){

		var saves = [];
    var homes = [];
    
		return {
      saves: saves,
      homes: homes
    }
	},
  componentDidMount: function() {
    this.loadHomesFromServer();
    this.loadSavesFromServer();
    //If we were updating the saves, we could continuously poll the server,
    //and update the Saves information when something changes
    //setInterval(this.loadSavesFromServer, this.props.pollInterval);
  },
  render: function() {
    //We need to set these variables (including the toggleSave function)
    //so they can be used within the map function below. Otherwise, they
    //would be outside the function's scope
    var saves = this.state.saves;
    var toggleSave = this.toggleSave;
    
    //map out the array of info
    var homeNodes = this.state.homes.map(function(home, index) {
      
      if (typeof(saves[index]) == "undefined") {
        saves[index] = {saves: 0};
      }
      //the key is React-specific, and is especially important when
      //components can be shuffled or removed. it is NOT available
      //as a prop, so we need a separate id for that.
      return (
        <Home
          key={index}
          id={index}
          onToggleSave={toggleSave}
          isSaved={saves[index].saved}
          photo={home.photo}
          address={home.address}
          numSaves={saves[index].saves}
        >
          {home.description}
        </Home>
      );
    });
    //now we return the entire mapped out listing in one shot:
    return (
      <div className="homeList">
        {homeNodes}
      </div>
    );
  }
});

var Home = React.createClass({
  toggleSave: function(index){
    //We have to do a second pass to the top level parent,
    //since that is where the entire list resides.
    return this.props.onToggleSave(index);
  },
  render: function() {
    //The saves and photo section may have special functions,
    //so we separate those into new children
    return (
      <div className="home">
        <span className="homeAddress">
          {this.props.address}
        </span>
        <Photo src={this.props.photo}></Photo>
        <span className="homeDescription">
          {this.props.children}
        </span>
        <Saves
          id={this.props.id}
          handleSave={this.toggleSave}
          isSaved={this.props.isSaved}
          numSaves={this.props.numSaves}
        ></Saves>
      </div>
    );
  }
});

/*
  This uses the special stateless syntax for a component
  that would normally have only a render function and nothing else
*/
var Photo = (props) => {
  return (<div className="homePhoto">
    <img src={props.src} />
  </div>);
};

var Saves = React.createClass({
  handleSubmit: function(e) {
    //We prevent the default action of submitting the form
    //so we can stay on the page
    e.preventDefault();
    
    //We have to pass this up to the parent
    var isSaved = this.props.handleSave(this.props.id);
  },
  render: function() {
    //We find out if the user has already saved the home.
    //If so, we change some of the text to indicate this.
    var savedText = '';
    var submitText = 'Save';
    if (this.props.isSaved) {
      savedText = 'You have saved this home.';
      submitText = 'Remove';
    }
    
    //We use a form to show this functionality,
    //but this could also be a link or image, such as a star
    //to indicate "favorite," or thumbs-up for "like."
    return (
      <div className="saves">
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value={submitText} />
        </form>
      {this.props.numSaves} saves. {savedText}
      </div>
    );
  }
});

//It all starts here, where we call on the first component, using JSX code:
ReactDOM.render(
  <HomeListing url="homes.json" savesUrl="saves.json" pollInterval={2000} />,
  document.getElementById('content')
);
