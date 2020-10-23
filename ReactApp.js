class AppHeader extends React.Component {
	// header componet to contain navbar or # of users online
	constructor(props) {
		super(props);
		this.state = {
			numberOnline: 4
		};
	}

	render() {
		
		return (
			<div id="header" className="container-xl">
				<div className="row justify-content-between px-4">
					<div className="d-flex">
						<div className="h4 text-light ml-2">Chat App</div>
						<div id="settings-button" className="ml-4 text-light" onClick={this.props.settingsClick}><i className="fas fa-user-cog pt-1"></i></div>
					</div>
					<div className="text-right text-light mr-2">Active Users: { this.state.numberOnline }</div>
				</div>
			</div>
		);
	}
}

class ChatBox extends React.Component {
	// chat box componet will make calls to the api to get the latest comments using a timer
	constructor(props) {
		super(props);
		this.state = {
			colors: [
				'#60b748', '#177ceb', '#05b6c1', '#9e9e9e', '#ffc107', '#f0e42c', '#059688', '#e21b3c', '#d3709e', '#dc6b25', '#f7ffff'
			],
			comments: [
				{username: 'testname', color: 0, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname', color: 0, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname', color: 0, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname', color: 0, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname2', color: 1, message: 'fdsg  fddsfg dsfg  dsfg dfgdf d gsfg'},
				{username: 'testname3', color: 2, message: 'fdghsad sdsfgd fdg dh dhfdghh'},
				{username: 'testname', color: 0, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname2', color: 1, message: 'fdsg  fddsfg dsfg  dsfg dfgdf d gsfg'},
				{username: 'testname3', color: 2, message: 'fdghsad sdsfgd fdg dh dhfdghh'},
				{username: 'testname', color: 0, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname2', color: 1, message: 'fdsg  fddsfg dsfg  dsfg dfgdf d gsfg'},
				{username: 'testname3', color: 6, message: 'fdghsad sdsfgd fdg dh dhfdghh'},
				{username: 'testname', color: 7, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname2', color: 8, message: 'fdsg  fddsfg dsfg  dsfg dfgdf d gsfg'},
				{username: 'testname3', color: 9, message: 'fdghsad sdsfgd fdg dh dhfdghh'},
				{username: 'testname', color: 10, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname2', color: 1, message: 'fdsg  fddsfg dsfg  dsfg dfgdf d gsfg'},
				{username: 'testname3', color: 2, message: 'fdghsad sdsfgd fdg dh dhfdghh'},
				{username: 'testname', color: 6, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname2', color: 10, message: 'fdsg  fddsfg dsfg  dsfg dfgdf d gsfg'},
				{username: 'testname3', color: 9, message: 'fdghsad sdsfgd fdg dh dhfdghh'},
				{username: 'testname', color: 8, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname2', color: 7, message: 'fdsg  fddsfg dsfg  dsfg dfgdf d gsfg'},
				{username: 'testname3', color: 6, message: 'fdghsad sdsfgd fdg dh dhfdghh'},
				{username: 'testname', color: 5, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname2', color: 4, message: 'fdsg  fddsfg dsfg  dsfg dfgdf d gsfg'},
				{username: 'testname3', color: 3, message: 'fdghsad sdsfgd fdg dh dhfdghh'},
				{username: 'testname', color: 0, message: 'blah aslkgj sdklfls jlsdkj hghh'},
				{username: 'testname2', color: 1, message: 'fdsg  fddsfg dsfg  dsfg dfgdf d gsfg'},
				{username: 'TheseAreAll_Fit', color: 2, message: 'The welcome modal will render if there isnt a username in state or if something is missing. Will contain a welcome heading, the modal container box, and will opaque the background, and a button that on change hides the modal'},
			]
		}
	}

	render() {
		let comments = this.state.comments.concat();
		let mappedComments = comments.map((comment) => (
			<div id="comment-row" className="row pt-2">
				<div className="col-md-2">
					<div className="pl-4" style={ {color: this.state.colors[comment.color]} }><strong>{ comment.username }:</strong></div>
				</div>
				<div className="col-md-10">
					<div id="comment-message" className="pl-3 mr-2">{ comment.message }</div>
				</div>
			</div>
		));
		
		return (
			<div id="chatbox" className="container-xl pb-2">
				{ mappedComments }
			</div>
		);
	}
}

class CommentBox extends React.Component {
	// will contain the components of the input box and the submit button. Will have state of message
	constructor(props) {
		super(props);
		this.handleCommentChange = this.handleCommentChange.bind(this);
		this.clearCommentInput = this.clearCommentInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			comment: ''
		}
	}
	
	handleCommentChange(e) {
		this.setState({comment: e.target.value});
	}

	clearCommentInput() {
		this.setState({comment: ''});
	}

	handleSubmit() {
		console.log(this.props, this.state.comment)
		this.clearCommentInput();
	}

	render() {
		return (
			<div id="commentbox" className="container-xl px-0">
				<div className="row no-gutters">
					<div className="col-md-10">
						<CommentInput comment={this.state.comment} handleChange={this.handleCommentChange} handleSubmit={this.handleSubmit}/>
					</div>
					<div className="col-md-2">
						<CommentSubmitButton comment={this.state.comment}  handleSubmit={this.handleSubmit}/>
					</div>
				</div>
			</div>
		);
	}
}

function CommentInput(props) {
	// a component of the CommentBox that will on change alter the message state of the CommentBox

	function handleChange(e) {
		props.handleChange(e);
	}

	function handleKeyPress(e) {
		if (e.key == 'Enter' && props.comment != '') {
			props.handleSubmit();
		}
	}


	return <input type="text" className="form-control w-100" placeholder="Write a comment" onChange={handleChange} value={props.comment} onKeyPress={handleKeyPress} maxlength="225"/>;
}

function CommentSubmitButton(props) {
	// a component of the CommentBox that will onClick make an api call to the back end with the message, username, and color, then on success will clear the comment input state

	function handleSubmitClick() {
		props.handleSubmit();
	}

	return <button className="btn btn-primary w-100" onClick={handleSubmitClick}disabled={props.comment == ''}>Submit</button>;
}

class WelcomeModal extends React.Component {
	// The welcome modal will render if there isnt a username in state or if something is missing. Will contain a welcome heading, the modal container box, and will opaque the background, and a button that on change hides the modal.
	constructor(props) {
		super(props);
		this.handleColorClick = this.handleColorClick.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.state = {
			isValid: false,
			welcomeMessage: 'Welcome to Chat App!'
		};
	}

	handleColorClick(color, e) {
		this.props.colorClick(color, e);
	}

	handleUsernameChange(e) {
		//lift up state
		this.props.handleUsernameChange(e);

		// check the validity of the username and then toggleNOTE: Same checks are in WelcomeModalNote
		let username = e.target.value;
		let regex = /\W/gi;

		if (username.length < 3) {
			this.setState({isValid: false});
		} else if (username.length > 15) {
			this.setState({isValid: false});
		} else if (regex.test(username)) {
			this.setState({isValid: false});
		} else {
			this.setState({isValid: true});
		}
	}

	componentDidMount() {
		// On component mount, change the welcome message & enable button
		if (this.props.username != '') {
			this.setState({welcomeMessage: 'Chat Settings'})
			this.setState({isValid: true});
		}
	}

	render() {
		let welcomeMessage = this.state.welcomeMessage;
		let username = this.props.username;
		let color = this.props.color;
		
		return (
			<div className="modal-mask">
				<div className="modal-wrapper">
					<div className="modal-container text-center">
						<h4 className="py-2">{ welcomeMessage }</h4>
						<WelcomeModalUsername username={username} handleUsernameChange={this.handleUsernameChange}/>
						<WelcomeModalColor color={color} handleColorClick={this.handleColorClick}/>
						<br />
						<WelcomeModalButton enterClick={this.props.enterClick} isValid={this.state.isValid}/>
						<WelcomeModalNote username={username}/>
					</div>
				</div>
			</div>
		)
	}
}

function WelcomeModalUsername(props) {
	// a component of the welcome modal that will on change, change the state in the UserDataComponent

	function handleUsernameChange(e) {
		props.handleUsernameChange(e);
	}
	return (
	<div className="mt-3">
		<label>Choose a Username </label>
		<input type="text" value={props.username} className="form-control" onChange={handleUsernameChange}/>
	</div>
	)
}

function WelcomeModalColor(props) {
	// a component of the welcome modal that will on change, change the color in state in the UserDataComponent
	const colorArray = [
		'#60b748', '#177ceb', '#05b6c1', '#9e9e9e', '#ffc107', '#f0e42c', '#059688', '#e21b3c', '#d3709e', '#dc6b25', '#f7ffff'
	];
	let stateColor = props.color;
	let colorList = colorArray.map((color) => (
		<ColorBox key={color} handleColorClick={handleColorClick} color={color} stateColor={stateColor}></ColorBox>
	));

	// make the color random on load
	if (stateColor == '') {
		let rand = Math.floor((Math.random() * (colorArray.length)));
		handleColorClick(colorArray[rand], null);
	}

	function handleColorClick(color, e) {
		props.handleColorClick(color, e);
	}

	return (
		<div className="mt-3">
			<label>Choose a Color</label><br />
			<div className="d-flex text-center">
				{colorList}
			</div>
		</div>
	);
}	


function ColorBox(props) {
	// the little color box that will be shown in the modal
	let shadow = (props.stateColor == props.color) ? '0px 0px 7px blue' : null;
	let border = (props.stateColor == props.color) ? 'blue' : 'black';

	return <div style={{backgroundColor: props.color, boxShadow: shadow, borderColor: border}} className="color-box mr-2" onClick={e => props.handleColorClick(props.color,e)} value={props.color}></div>
}

class UserDataComponent extends React.Component {
	//this component is a wrapper for the app which will contain the common user state
	constructor(props) {
		super(props);
		this.enterClick = this.enterClick.bind(this);
		this.settingsClick = this.settingsClick.bind(this);
		this.colorClick = this.colorClick.bind(this);
		this.usernameChange = this.usernameChange.bind(this);
		this.state = {
			username: '',
			color: '',
			showModal: true
		};
	}

	enterClick() {
		this.setState({showModal: false});
	}

	settingsClick() {
		this.setState({showModal: true});
	}

	colorClick(color, e) {
		this.setState({'color': color});
	}

	usernameChange(e) {
		this.setState({username: e.target.value})
	}


	render() {
		let modal;
		let showModal = this.state.showModal;
		if (showModal) {
			modal = <WelcomeModal enterClick={this.enterClick} username={this.state.username} color={this.state.color} colorClick={this.colorClick} handleUsernameChange={this.usernameChange}/>;
		}
		return (
			<div>
				<AppHeader settingsClick={this.settingsClick}/>
				<ChatBox />
				<CommentBox color={this.state.color} username={this.state.username}/>
				{ modal }
			</div>
		);
	}
}

function WelcomeModalNote(props) {
	let username = props.username;
	let regex = /\W/gi;

	//NOTE: same test written in the WelcomeModal
	if (username.length < 3 && username != '') {
		return <div className="text-danger mt-1">Username must be 3 or more characters in length</div>
	} else if (username.length > 15) {
		return <div className="text-danger mt-1">Username must not exceed 15 characters in length</div>
	} else if (regex.test(username) && username != '') {	
		return <div className="text-danger mt-1">Username cannot contain special characters or spaces</div>
	} else {
		return null;
	}
}

function WelcomeModalButton(props) {
	// disables and enables the button based on the reactive username input validity
	
	return <button className="btn btn-primary mt-2" onClick={props.enterClick} disabled={!props.isValid}>Go to chat!</button>;
}

// find the html element and render the button
const domContainer = document.querySelector('#app');
ReactDOM.render(

	<div className="container-xl px-0">
		<UserDataComponent />
	</div>

	, domContainer);
