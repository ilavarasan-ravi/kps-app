var Saves= React.createClass({
    getIntialStage: function(){
        return{
            saved:false,numSaves=0
        }
    },
    handleSubmit:function(e){
        e.preventDefault();
        var saved=false;
        var numSaves=this.state.numSaves;
        if(this.state.saved==false){
            saved=true;
            numSaves++;
        }
        else {
            numSaves--;
        }
        this.setState({
            numSaves:saved,
            saved:saved
        });
    },
    render:function(){
        var savedText='';
        var submitText='Save';
        if(this.state.saved){
            savedText='You saved this home.';
            submitText='Remove';
        }
    
    return(
        <div className='saves'>
            <form onSubmit={this.handleSubmit}>
                <input type='submit' value={submitText}></input>
            </form>
            {this.state.numSaves} Saves. {savedText}
        </div>
        );
    }
});

var HomeListing=React.createClass({
    render:function(){

    return <div className='homeList'>
        <Home
        Key={0}
        id={0}
        isSaved={false}
        photo="assets/images/home.jpg"
        address="12345 Sample Dr"
        numSaves={33}
        >
            this is the home in the city.
        </Home>
        </div>
    }
});
var Home=React.createClass({
    render:function(){

    return <div className='home'>
        <span className='homeAddress'>{this.props.address}</span>
        <photo  src={this.props.photo}></photo>
        <span className='homeDescription'>{this.props.children}</span>
        <Saves id={this.props.id} isSaved={this.props.isSaved} numSaves={this.props.numSaves}></Saves>
        </div>
    }
});
var photo=(props)=>{
    return (<div> <img src={props.src} /> </div>);
};