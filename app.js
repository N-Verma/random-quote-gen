class Quote extends React.Component{
  constructor(props){
    super(props);
  
  this.state={
	  api:[],
	  author:'',
	  text:'',
	  bgColor:'red',
	  c:0,
      load:false
  };
	  this.handleClick=this.handleClick.bind(this);
	  this.share=this.share.bind(this);
  }
	  handleClick(){
		  this.createQuote();
		  this.changeBg();
	  }
	  componentDidMount(){
		 this.setState({load:true}); 
		  fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
		  .then(response=>response.json())
		  .then(data=>{
			  this.setState({
				  api:data.quotes,
				  author:data.quotes[0].author,
				  text:data.quotes[0].quote,
                  load:false
			  });
          });
	  }	  
	
  createQuote=()=>{
	  const picked=[];
	  const quotes=this.state.api;
      console.log(quotes);
	  let n = Math.floor((Math.random() * quotes.length) + 1);
	  
	  quotes.forEach(function(ele,index){
		  if(index==n){
			  picked.push(ele);
		  }
	  });
	  this.setState({
		  text:picked[0].quote,
		  author:picked[0].author
	  })
  }
  
  changeBg=()=>{
	  var letters = '0123456789ABCDEF';
	  var color='#'
	  for(var i=0;i<6;i++){
		  color+=letters[Math.floor(Math.random() * 16)];
	  }
	  this.setState({
        bgColor: color,
      });
  }
  share=()=>{
	  var url = "twitter.com";
    let text = `${this.state.author} - ${this.state.text}`
    window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
  } // share function taken from a stackoverflow post
  render(){
      const {loading} = this.state.load;
      if(loading){
          return<p>loading......</p>
      }
    return(
      //<div id="main">
			
			<div id="quote-box">
			<style>
				{`
			:root {
           --main-color: ${this.state.bgColor};
           --main-txt-color: ${this.state.bgColor};
           }
				`}
			</style>
				<h1>Random quote Generator</h1>
				<p id="text">''{this.state.text}</p>
				<p id="author">--{this.state.author}</p>
				<button id="tweet-quote" onClick={this.share}>Twitter</button>
				<button id="new-quote" onClick={this.handleClick}>New Quote</button>
			</div>
      //</div>
    );
  }
}

ReactDOM.render(<Quote />,document.getElementById("root"));
