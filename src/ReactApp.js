/****
 * 
 * activeuserslist dropdown transition
 * private chat???
 * switch to production cdn 10 second job
 * 
 * 
 * The Chat App written by programmer Kyle Hopkins using React, Node, and Express
 */


'use strict';

// Declare global variables
var tokenTimer;


class AppHeader extends React.Component {
	// header componet to contain navbar and # of users online
	constructor(props) {
		super(props);
	}

	render() {
		let showActiveUsersDropdown = this.props.showActiveUsersDropdown;
		let audArrow;
		if (showActiveUsersDropdown) {
			audArrow = <i className="fas fa-caret-up text-light ml-4 mt-n5 d-md-none"></i>;
		} else {
			audArrow = <i className="fas fa-caret-down text-light ml-4 mt-n5 d-md-none"></i>;
		}
		return (
			<div id="header" className="container-fluid">
				<div className="row justify-content-between px-0 px-md-4">
					<div className="d-flex">
						<div className="h4 text-light ml-0 ml-md-2 title" onClick={this.props.toggleAboutModal}><i>Self-Destruct</i></div>
						<div id="settings-button" className="ml-3 text-light" onClick={this.props.settingsClick}><i className="fas fa-user-cog pt-1"></i></div>
					</div>
					<div id="active-users-div" className="mt-0 " onClick={this.props.toggleActiveUsersDropdown}>
						<div className="text-right text-light mr-1 mr-md-4 mb-n2 mt-md-0">Online: <span className="ml-1">{ this.props.activeUsers.length }</span></div>
						<div>{ audArrow }</div>
					</div>
				</div>
			</div>
		);
	}
}

class ChatBox extends React.Component {
	// chat box componet will the latest comments using the state in UserDataComponent
	constructor(props) {
		super(props);
		this.scrollToBottom = this.scrollToBottom.bind(this);
		this.messagesEndRef = React.createRef()
	}

	scrollToBottom() {
		this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
	}
	  


	render() {
		let comments = this.props.comments;
		let mappedComments = comments.map((comment) => (
			<div id="comment-row" className="row pt-1" key={comment.id}>
				<div className="col-md-3 col-xl-2">
					<div className="pl-4" style={ {color: comment.color} }><strong>{ comment.username }:</strong></div>
				</div>
				<div className="col-md-9 col-xl-10">
					<div id="comment-message" className="pl-3 pl-md-0 mr-2">{ comment.comment }</div>
				</div>
			</div>
		));

		let activeUsersList = this.props.activeUsers.map(usernameObj => <div className="pt-1" key={usernameObj.username} style={{color: usernameObj.color}}>{ usernameObj.username }</div>);

		
		return (
			<div id="chatbox" className="container-fluid px-0">
				<div className="row ">


					<div className="grid-left col-12 col-md-9 col-lg-10 pt-2">
						{ mappedComments }
						<div id="scroll-to-bottom-div" style={{ height: "7px" }} ref={this.messagesEndRef}></div>
					</div>


					<div className="grid-right col-3 col-lg-2 d-none d-md-flex">
						<div className="text-light mt-2 text-center w-100">
							{ activeUsersList }
						</div>
					</div>


				</div>
			</div>
		);
	}
}

class ActiveUsersDropdown extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let activeUsersList = this.props.activeUsers.map(usernameObj => <div className="pt-1" key={usernameObj.username} style={{color: usernameObj.color}}>{ usernameObj.username }</div>);

		return (
			<div className="active-users-dropdown text-center">
				{ activeUsersList }
			</div>
		);
	}
}

class CommentBox extends React.Component {
	// contains the components of the input box and the submit button. 
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
		// post the comment data to the back end
		
		let commentObj = {
			username: this.props.username,
			comment: this.state.comment,
			token: this.props.token,
			color: this.props.color,
			room: this.props.room
		}

		
		axios.post('/submitComment', commentObj)
		.then(res => {
			
			if (res.data == 'success') {
				// get the new comment into the state so we dont have to wait for the timer
				this.props.addCommentToState(commentObj);
			} else if (res.data == 'invalid token') {
				// there was an issue with the token, clear everything and alert the user

					//stop the timer from trying to refresh
					this.props.stopTokenTimer();

					alert('There was a token error, please refresh.');
					
			}
		}).catch(err => {
			console.log(err);
			alert('There has been an error, try refreshing your browser.');
		});

		this.clearCommentInput();
	}

	render() {
		return (
			<div id="commentbox" className="container-fluid px-0">
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


	return <input id="comment-input-box" type="text" className="form-control w-100" placeholder="Write a comment" onChange={handleChange} value={props.comment} onKeyPress={handleKeyPress} maxLength="225"/>;
}

function CommentSubmitButton(props) {
	// a component of the CommentBox that will onClick make an api call to the back end with the message, username, and color, then on success will clear the comment input state NOTE: moved to commentbox

	function handleSubmitClick() {
		props.handleSubmit();
	}

	return <button className="btn btn-primary text-nowrap w-100" onClick={handleSubmitClick}disabled={props.comment == ''}>Send Comment</button>;
}

class WelcomeModal extends React.Component {
	// The welcome modal will render if there isnt a username in state or the user clicks the settings button. Will contain a welcome heading, the modal container box, and will opaque the background, and a button that on change hides the modal. 
	constructor(props) {
		super(props);
		this.handleColorClick = this.handleColorClick.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.isUsernameTaken = this.isUsernameTaken.bind(this); 
		this.state = {
			isValid: false,
			welcomeMessage: <h5 className="pt-3">Welcome to</h5>,
			welcomeModalNoteText: '',
			prevUsername: ''
		};
	}

	handleColorClick(color, e) {
		this.props.colorClick(color, e);
	}

	handleUsernameChange(e) {

		//lift up state
		this.props.handleUsernameChange(e);


		// check the validity of the username and then toggle
		let username = e.target.value;
		let regex = /^\s|[^A-Za-z0-9\s_]|\s$/g;
		

		if (username.length < 3 && username != '') {
			this.setState({
				isValid: false,
				welcomeModalNoteText: 'Username must be 3 or more characters in length'
			});
		} else if (username.length > 15) {
			this.setState({
				isValid: false,
				welcomeModalNoteText: 'Username must not exceed 15 characters in length'
			});
		} else if (regex.test(username) && username != '') {
			this.setState({
				isValid: false,
				welcomeModalNoteText: 'Name cannot start or end with a space nor contain special chars'
			});
		} else if (this.isUsernameTaken(username)) {
			this.setState({
				isValid: false,
				welcomeModalNoteText: 'Username is already being used. Please select a different one'
			});
		} else if (username == '') {
			this.setState({
				isValid: false,
				welcomeModalNoteText: ''
			});
		} else {
			this.setState({
				isValid: true,
				welcomeModalNoteText: ''
			});
		}
	}


	isUsernameTaken(username) {
		let activeUsers = this.props.activeUsers;
		let usernameGoingUp = username;
		let prevUsername = this.state.prevUsername;

		// check the currently entered username against the activeUsers array's usernames
		return  activeUsers.some(user => 
			user.username.toLowerCase() == usernameGoingUp.toLowerCase() && user.username !== prevUsername
			);
	}


	componentDidMount() {
		// On component mount, change the welcome message & enable button
		
		if (this.props.username != '') {
			this.setState({welcomeMessage: <h5 className="pt-2">Chat Settings</h5>})
			this.setState({isValid: true});
		}

		// set the state of the currently being used or previous username
		this.setState({prevUsername: this.props.username});
	}

	render() {
		let welcomeMessage = this.state.welcomeMessage;
		let username = this.props.username;
		let color = this.props.color;
		let roomNameParsed = this.props.room.replace(/_/g,' ');
		let room = <h4 className="text-nowrap" >{ roomNameParsed }</h4>;
		
		return (
			<div className="modal-mask">
				<div className="modal-wrapper">
					<div className="modal-container text-center">
						<div style={{maxWidth: '295px'}}>
							{ welcomeMessage }
							{ room }
						</div>
						<WelcomeModalUsername username={username} handleUsernameChange={this.handleUsernameChange}/>
						<WelcomeModalColor color={color} handleColorClick={this.handleColorClick}/>
						<br />
						<WelcomeModalButton enterClick={this.props.enterClick} isValid={this.state.isValid} />
						<WelcomeModalNote welcomeModalNoteText={this.state.welcomeModalNoteText}/>
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
	<div className="mt-3 row justify-content-center">
		<label>Choose a Username </label>
		<input type="text" value={props.username} className="form-control" onChange={handleUsernameChange} maxLength="15"/>
	</div>
	)
}

function WelcomeModalColor(props) {
	// a component of the welcome modal that will on change, change the color in state in the UserDataComponent
	const colorArray = [
		'#60b748', '#177ceb', '#05b6c1', '#9e9e9e', '#ffc107', '#f0e42c', '#059688', '#e21b3c', '#d3709e', '#dc6b25', '#f7ffff' // NOTE: copy of array in UserDataComponent
	];
	let stateColor = props.color;
	let colorList = colorArray.map((color) => (
		<ColorBox key={color} handleColorClick={handleColorClick} color={color} stateColor={stateColor}></ColorBox>
	));


	function handleColorClick(color, e) {
		props.handleColorClick(color, e);
	}

	return (
		<div className="mt-3 row justify-content-center">
			<label>Choose a Color</label><br />
			<div className="d-flex text-center">
				{colorList}
			</div>
		</div>
	);
}	


function ColorBox(props) {
	// the little color box that will be shown in the modal
	let shadow = (props.stateColor == props.color) ? '0px 0px 9px blue' : null;
	let border = (props.stateColor == props.color) ? '#9e9e9e' : 'black';

	return <div style={{backgroundColor: props.color, boxShadow: shadow, borderColor: border}} className="color-box mr-2" onClick={e => props.handleColorClick(props.color,e)} value={props.color}></div>
}


function WelcomeModalNote(props) {
	let message = props.welcomeModalNoteText;

	return <div className="text-danger mt-1 px-3">{ message }</div>
}

function WelcomeModalButton(props) {
	// disables and enables the button based on the reactive username input validity
	
	return <button className="btn btn-primary mt-3" onClick={props.enterClick} disabled={!props.isValid}>Go to chat!</button>;
}

function AboutModal(props) {
	
	return (
		<div className="modal-mask" onClick={props.toggleAboutModal}>
			<div className="">
				<div className="text-right text-md-center w-100">
					<div className="mt-0 pr-1 pt-3 px-1 text-warning h5 click-to-close"><strong>Click to Close</strong></div>
				</div>
				<div className="about-modal-container text-center">
					<div className="h5 mt-md-2">How does this work?</div>

					<div>The application creates chat rooms based on the <span style={{color: '#e21b3c'}}>/url</span> given and will self-destruct once the last user leaves. That is to say that the app does not log or save any chat data once the room becomes empty. A new chat can be easily created using what is called a url slug. For example: </div>

					<div className="my-2" style={{color: '#059688'}}>selfdestruct.chat<span style={{color: '#e21b3c'}}>/super_secret_chat</span></div>

					<div>creates and enters a chat room named Super Secret Chat. Use underscores _ where you want spaces to be in your chat's name. Chat room names are not searchable and can be up to 22 characters in length.</div>

					<div className="mt-3">So long as there is at least 1 active user in the room, new users can join the conversation using the url link above. Once the last user closes their browser, that chat room is purged from the database along with all comments and associated usernames.</div>

					<div className="h5 mt-3 mb-2">About</div>

					<div className="pb-4">The Self-Destruct chat app was developed by programmer Kyle Hopkins using Node, Express, and React Javascript libraries. If you are interested in hiring me for development work or to join your team, please contact me <a href="https://kyleweb.dev/#contact">here.</a></div>
				</div>
			</div>
		</div>
	);
}


class UserDataComponent extends React.Component {
	//this component is a wrapper for the app which will contain the common user state
	constructor(props) {
		super(props);
		this.enterClick = this.enterClick.bind(this);
		this.settingsClick = this.settingsClick.bind(this);
		this.colorClick = this.colorClick.bind(this);
		this.usernameChange = this.usernameChange.bind(this);
		this.getComments = this.getComments.bind(this);
		this.addCommentToState = this.addCommentToState.bind(this);
		this.getToken = this.getToken.bind(this);
		this.startTokenTimer = this.startTokenTimer.bind(this);
		this.stopTokenTimer = this.stopTokenTimer.bind(this);
		this.toggleActiveUsersDropdown = this.toggleActiveUsersDropdown.bind(this);
		this.toggleAboutModal = this.toggleAboutModal.bind(this);
		this.getRoomSlug = this.getRoomSlug.bind(this);
		this.chatBoxRef = React.createRef();
		this.colorArray = [
			'#60b748', '#177ceb', '#05b6c1', '#9e9e9e', '#ffc107', '#f0e42c', '#059688', '#e21b3c', '#d3709e', '#dc6b25', '#f7ffff' // NOTE: copy of array in WelcomeModalColors component
		],
		this.state = {
			username: '',
			// make the color random on load
			color: this.colorArray[Math.floor((Math.random() * (this.colorArray.length)))],
			comments: [],
			showModal: true,
			showActiveUsersDropdown: false,
			showAboutModal: false,
			token: '',
			activeUsers: [],
			room: ''
		};
		
	}

	enterClick() {
		this.setState({showModal: false});
		this.getToken();

		// start the timer to refresh the token every few minutes
		this.startTokenTimer();
	}

	settingsClick() {
		//closes the active users dropdown if it is open
		this.setState({
			showActiveUsersDropdown: false,
			showModal: true
		});
	}

	colorClick(color, e) {
		this.setState({'color': color});
	}

	usernameChange(e) {
		this.setState({username: e.target.value})
	}

	componentDidMount() {

		//on mount, get the room slug and keep it in state
		this.getRoomSlug();

		//On component mount, make the first call to populate comments but do it with 0.1s timeout so that state has a chance to update the room name
		setTimeout(() => {this.getComments()}, 100);
		
		
		//lifecycle hook that will continuously call the function that makes an api call to the back end and re-renderes the updated state every 3 seconds
		
		setInterval(
			() => this.getComments(),
			3000
		);

	}

	getComments() {
		axios.get('/getComments/' + this.state.room)
		.then(res => {
			let roomNameParsed = this.state.room.replace(/_/g,' ');
			// welcome note to be sent to state if comment rows come back empty
			let welcomeNoteObj = {
				id: 1,
				username: 'Welcome Note',
				color: '#05b6c1',
				comment: 'Welcome to ' + roomNameParsed +'! This chat will self-destruct if left empty for more than a few minutes. To prevent auto-erasure, keep this window open if you are the last user. If you would like others to join, just share the URL link! To create a new room, just change the link to /new_room_name. For more info, click on Self-Destruct above.'
			}
			let dataUsernames = res.data.usernames;
			let dataComments = (res.data.comments.length == 0) ? [welcomeNoteObj] : res.data.comments ;
			
			


			// only update the state if it is different from the last (new comments). this prevents the chat from scrolling to the bottom while the user is reading prevs
			if (this.state.comments.length > 2) {
				if (this.state.comments[0].id != dataComments[0].id) {
					this.setState({comments: dataComments});

					// use a timout function on scrollToBottom so that state has time to update this prevents the chat from scrolling to the comment above newest
					setTimeout(() => {this.chatBoxRef.current.scrollToBottom()}, 1000)
				}
			} else {
				// populate the chat box with comments for the first time
				this.setState({comments: dataComments});
				this.chatBoxRef.current.scrollToBottom();
			}

			// pupulate the activeUsers state
			this.setState({activeUsers: dataUsernames});
			
		})
		.catch(err => {console.log(err)});
	}

	addCommentToState(commentObj) {
		// use callback function as setState arguement with state as the argument to add the recently submitted comment to show in the chatbox without delay
		commentObj.id = Math.random(); // a temporary id so that react can have a key
		this.setState((state) => {
			return this.state.comments.push(commentObj);
		})
		this.chatBoxRef.current.scrollToBottom();
	}

	getToken() {
		// function will api post call the back end at /getToken and the api will return a fresh token or renew the old one for a new. This will set the username or update it for active users too.

		let token = this.state.token;
		let username = this.state.username;
		let color = this.state.color;
		let room = this.state.room
		axios.post('/getToken', {'token': token, 'username': username, 'color': color, 'room': room})
			.then(res => {

				if (res.data.token != 'invalid token') {
					// update the state with new token
					this.setState({'token': res.data.token})

				} else {
					// there was an issue with the token, clear everything and alert the user

					//stop the timer from trying to refresh
					this.stopTokenTimer();

					alert('There was a problem with the token, please re-enter.');
					this.setState({
						showModal: true
					})
					
				}
			}).catch(err =>{ console.log(err)});
	}

	startTokenTimer() {
		
		//start the timer, the var is declared in the global scope so that outside function can clear it
		let refreshTime = 3 * 60 *1000; // refresh token every 3 minutes
		tokenTimer = setInterval(
				() => this.getToken(),
				refreshTime);
		
	}

	stopTokenTimer() {
		// there was an issue, clear everything out
		clearInterval(tokenTimer);
		tokenTimer = '';
		this.setState({
			activeUsers: [],
			token: '',
			username: ''
		});
	}

	toggleActiveUsersDropdown() {
		// toggle the visibility of the active users dropdown if in mobile view (md bootstrap size)
		
		if (window.innerWidth < 768) {
			this.setState({ showActiveUsersDropdown: !this.state.showActiveUsersDropdown});
		}
	}

	toggleAboutModal() {
		// toggle the visibility of the about modal

		this.setState({showAboutModal: !this.state.showAboutModal});
	}

	getRoomSlug() {
		let regex = /[A-Za-z0-9-._~]{1,22}/gi;
		let path = window.location.pathname;
		let sanitizedPath = (path.match(regex)) ? path.match(regex)[0] : 'Self-Destruct_Chat';

		this.setState({room: sanitizedPath});
	}


	render() {
		let modal;
		let showModal = this.state.showModal;
		let showActiveUsersDropdown = this.state.showActiveUsersDropdown;
		let showAboutModal = this.state.showAboutModal;
		if (showModal) {
			modal = <WelcomeModal enterClick={this.enterClick} username={this.state.username} color={this.state.color} colorClick={this.colorClick} handleUsernameChange={this.usernameChange} activeUsers={this.state.activeUsers} room={this.state.room}/>;
		}
		if (showActiveUsersDropdown) {
			modal = <ActiveUsersDropdown activeUsers={this.state.activeUsers} />;
		}
		if (showAboutModal) {
			modal = <AboutModal toggleAboutModal={this.toggleAboutModal}/>;
		}
		return (
			<div>
				<AppHeader settingsClick={this.settingsClick} activeUsers={this.state.activeUsers} toggleActiveUsersDropdown={this.toggleActiveUsersDropdown} showActiveUsersDropdown={this.state.showActiveUsersDropdown} toggleAboutModal={this.toggleAboutModal} />
				<ChatBox comments={this.state.comments} colorArray={this.colorArray} ref={this.chatBoxRef} activeUsers={this.state.activeUsers} />
				<CommentBox color={this.state.color} username={this.state.username} addCommentToState={this.addCommentToState} token={this.state.token} stopTokenTimer={this.stopTokenTimer} room={this.state.room}/>
				{ modal }
			</div>
		);
	}
}


// find the html element and render the button
const domContainer = document.querySelector('#app');
ReactDOM.render(

	<div className="container-fluid">
		<UserDataComponent />
	</div>

	, domContainer);