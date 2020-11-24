/****
 *  
 * The Chat App written by programmer Kyle Hopkins using React, Node, and Express
 * 
 * todo: activeuserslist dropdown transition
 * 
 */

'use strict';

// Declare global variables

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tokenTimer;

var AppHeader = function (_React$Component) {
	_inherits(AppHeader, _React$Component);

	// header componet to contain navbar and # of users online
	function AppHeader(props) {
		_classCallCheck(this, AppHeader);

		return _possibleConstructorReturn(this, (AppHeader.__proto__ || Object.getPrototypeOf(AppHeader)).call(this, props));
	}

	_createClass(AppHeader, [{
		key: "render",
		value: function render() {
			var showActiveUsersDropdown = this.props.showActiveUsersDropdown;
			var audArrow = void 0;
			if (showActiveUsersDropdown) {
				audArrow = React.createElement("i", { className: "fas fa-caret-up text-light ml-4 mt-n5 d-md-none" });
			} else {
				audArrow = React.createElement("i", { className: "fas fa-caret-down text-light ml-4 mt-n5 d-md-none" });
			}
			return React.createElement(
				"div",
				{ id: "header", className: "container-fluid" },
				React.createElement(
					"div",
					{ className: "row justify-content-between px-0 px-md-4" },
					React.createElement(
						"div",
						{ className: "d-flex" },
						React.createElement(
							"div",
							{ className: "h4 text-light ml-0 ml-md-2 title", onClick: this.props.toggleAboutModal },
							React.createElement(
								"i",
								null,
								"Self-Destruct"
							)
						),
						React.createElement(
							"div",
							{ id: "settings-button", className: "ml-3 text-light", onClick: this.props.settingsClick },
							React.createElement("i", { className: "fas fa-user-cog pt-1" })
						)
					),
					React.createElement(
						"div",
						{ id: "active-users-div", className: "mt-0 ", onClick: this.props.toggleActiveUsersDropdown },
						React.createElement(
							"div",
							{ className: "text-right text-light mr-1 mr-md-4 mb-n2 mt-md-0" },
							"Online: ",
							React.createElement(
								"span",
								{ className: "ml-1" },
								this.props.activeUsers.length
							)
						),
						React.createElement(
							"div",
							null,
							audArrow
						)
					)
				)
			);
		}
	}]);

	return AppHeader;
}(React.Component);

var ChatBox = function (_React$Component2) {
	_inherits(ChatBox, _React$Component2);

	// chat box componet will the latest comments using the state in UserDataComponent
	function ChatBox(props) {
		_classCallCheck(this, ChatBox);

		var _this2 = _possibleConstructorReturn(this, (ChatBox.__proto__ || Object.getPrototypeOf(ChatBox)).call(this, props));

		_this2.scrollToBottom = _this2.scrollToBottom.bind(_this2);
		_this2.messagesEndRef = React.createRef();
		return _this2;
	}

	_createClass(ChatBox, [{
		key: "scrollToBottom",
		value: function scrollToBottom() {
			this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, {
		key: "render",
		value: function render() {
			var comments = this.props.comments;
			var mappedComments = comments.map(function (comment) {
				return React.createElement(
					"div",
					{ id: "comment-row", className: "row pt-1", key: comment.id },
					React.createElement(
						"div",
						{ className: "col-md-3 col-xl-2" },
						React.createElement(
							"div",
							{ className: "pl-4", style: { color: comment.color } },
							React.createElement(
								"strong",
								null,
								comment.username,
								":"
							)
						)
					),
					React.createElement(
						"div",
						{ className: "col-md-9 col-xl-10" },
						React.createElement(
							"div",
							{ id: "comment-message", className: "pl-3 pl-md-0 mr-2" },
							comment.comment
						)
					)
				);
			});

			var activeUsersList = this.props.activeUsers.map(function (usernameObj) {
				return React.createElement(
					"div",
					{ className: "pt-1", key: usernameObj.username, style: { color: usernameObj.color } },
					usernameObj.username
				);
			});

			return React.createElement(
				"div",
				{ id: "chatbox", className: "container-fluid px-0" },
				React.createElement(
					"div",
					{ className: "row " },
					React.createElement(
						"div",
						{ className: "grid-left col-12 col-md-9 col-lg-10 pt-2" },
						mappedComments,
						React.createElement("div", { id: "scroll-to-bottom-div", style: { height: "7px" }, ref: this.messagesEndRef })
					),
					React.createElement(
						"div",
						{ className: "grid-right col-3 col-lg-2 d-none d-md-flex" },
						React.createElement(
							"div",
							{ className: "text-light mt-2 text-center w-100" },
							activeUsersList
						)
					)
				)
			);
		}
	}]);

	return ChatBox;
}(React.Component);

var ActiveUsersDropdown = function (_React$Component3) {
	_inherits(ActiveUsersDropdown, _React$Component3);

	function ActiveUsersDropdown(props) {
		_classCallCheck(this, ActiveUsersDropdown);

		return _possibleConstructorReturn(this, (ActiveUsersDropdown.__proto__ || Object.getPrototypeOf(ActiveUsersDropdown)).call(this, props));
	}

	_createClass(ActiveUsersDropdown, [{
		key: "render",
		value: function render() {
			var activeUsersList = this.props.activeUsers.map(function (usernameObj) {
				return React.createElement(
					"div",
					{ className: "pt-1", key: usernameObj.username, style: { color: usernameObj.color } },
					usernameObj.username
				);
			});

			return React.createElement(
				"div",
				{ className: "active-users-dropdown text-center" },
				activeUsersList
			);
		}
	}]);

	return ActiveUsersDropdown;
}(React.Component);

var CommentBox = function (_React$Component4) {
	_inherits(CommentBox, _React$Component4);

	// contains the components of the input box and the submit button. 
	function CommentBox(props) {
		_classCallCheck(this, CommentBox);

		var _this4 = _possibleConstructorReturn(this, (CommentBox.__proto__ || Object.getPrototypeOf(CommentBox)).call(this, props));

		_this4.handleCommentChange = _this4.handleCommentChange.bind(_this4);
		_this4.clearCommentInput = _this4.clearCommentInput.bind(_this4);
		_this4.handleSubmit = _this4.handleSubmit.bind(_this4);
		_this4.state = {
			comment: ''
		};
		return _this4;
	}

	_createClass(CommentBox, [{
		key: "handleCommentChange",
		value: function handleCommentChange(e) {
			this.setState({ comment: e.target.value });
		}
	}, {
		key: "clearCommentInput",
		value: function clearCommentInput() {
			this.setState({ comment: '' });
		}
	}, {
		key: "handleSubmit",
		value: function handleSubmit() {
			var _this5 = this;

			// post the comment data to the back end

			var commentObj = {
				username: this.props.username,
				comment: this.state.comment,
				token: this.props.token,
				color: this.props.color,
				room: this.props.room
			};

			axios.post('/submitComment', commentObj).then(function (res) {

				if (res.data == 'success') {
					// get the new comment into the state so we dont have to wait for the timer
					_this5.props.addCommentToState(commentObj);
				} else if (res.data == 'invalid token') {
					// there was an issue with the token, clear everything and alert the user

					//stop the timer from trying to refresh
					_this5.props.stopTokenTimer();

					alert('There was a token error, please refresh.');
				}
			}).catch(function (err) {
				console.log(err);
				alert('There has been an error, try refreshing your browser.');
			});

			this.clearCommentInput();
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "commentbox", className: "container-fluid px-0" },
				React.createElement(
					"div",
					{ className: "row no-gutters" },
					React.createElement(
						"div",
						{ className: "col-md-10" },
						React.createElement(CommentInput, { comment: this.state.comment, handleChange: this.handleCommentChange, handleSubmit: this.handleSubmit })
					),
					React.createElement(
						"div",
						{ className: "col-md-2" },
						React.createElement(CommentSubmitButton, { comment: this.state.comment, handleSubmit: this.handleSubmit })
					)
				)
			);
		}
	}]);

	return CommentBox;
}(React.Component);

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

	return React.createElement("input", { id: "comment-input-box", type: "text", className: "form-control w-100", placeholder: "Write a comment", onChange: handleChange, value: props.comment, onKeyPress: handleKeyPress, maxLength: "225" });
}

function CommentSubmitButton(props) {
	// a component of the CommentBox that will onClick make an api call to the back end with the message, username, and color, then on success will clear the comment input state NOTE: moved to commentbox

	function handleSubmitClick() {
		props.handleSubmit();
	}

	return React.createElement(
		"button",
		{ className: "btn btn-primary text-nowrap w-100", onClick: handleSubmitClick, disabled: props.comment == '' },
		"Send Comment"
	);
}

var WelcomeModal = function (_React$Component5) {
	_inherits(WelcomeModal, _React$Component5);

	// The welcome modal will render if there isnt a username in state or the user clicks the settings button. Will contain a welcome heading, the modal container box, and will opaque the background, and a button that on change hides the modal. 
	function WelcomeModal(props) {
		_classCallCheck(this, WelcomeModal);

		var _this6 = _possibleConstructorReturn(this, (WelcomeModal.__proto__ || Object.getPrototypeOf(WelcomeModal)).call(this, props));

		_this6.handleColorClick = _this6.handleColorClick.bind(_this6);
		_this6.handleUsernameChange = _this6.handleUsernameChange.bind(_this6);
		_this6.isUsernameTaken = _this6.isUsernameTaken.bind(_this6);
		_this6.state = {
			isValid: false,
			welcomeMessage: React.createElement(
				"h5",
				{ className: "pt-3" },
				"Welcome to"
			),
			welcomeModalNoteText: '',
			prevUsername: ''
		};
		return _this6;
	}

	_createClass(WelcomeModal, [{
		key: "handleColorClick",
		value: function handleColorClick(color, e) {
			this.props.colorClick(color, e);
		}
	}, {
		key: "handleUsernameChange",
		value: function handleUsernameChange(e) {

			//lift up state
			this.props.handleUsernameChange(e);

			// check the validity of the username and then toggle
			var username = e.target.value;
			var regex = /^\s|[^A-Za-z0-9\s_]|\s$/g;

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
	}, {
		key: "isUsernameTaken",
		value: function isUsernameTaken(username) {
			var activeUsers = this.props.activeUsers;
			var usernameGoingUp = username;
			var prevUsername = this.state.prevUsername;

			// check the currently entered username against the activeUsers array's usernames
			return activeUsers.some(function (user) {
				return user.username.toLowerCase() == usernameGoingUp.toLowerCase() && user.username !== prevUsername;
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			// On component mount, change the welcome message & enable button

			if (this.props.username != '') {
				this.setState({ welcomeMessage: React.createElement(
						"h5",
						{ className: "pt-2" },
						"Chat Settings"
					) });
				this.setState({ isValid: true });
			}

			// set the state of the currently being used or previous username
			this.setState({ prevUsername: this.props.username });
		}
	}, {
		key: "render",
		value: function render() {
			var welcomeMessage = this.state.welcomeMessage;
			var username = this.props.username;
			var color = this.props.color;
			var roomNameParsed = this.props.room.replace(/_/g, ' ');
			var room = React.createElement(
				"h4",
				{ className: "text-nowrap" },
				roomNameParsed
			);

			return React.createElement(
				"div",
				{ className: "modal-mask" },
				React.createElement(
					"div",
					{ className: "modal-wrapper" },
					React.createElement(
						"div",
						{ className: "modal-container text-center" },
						React.createElement(
							"div",
							{ style: { maxWidth: '295px' } },
							welcomeMessage,
							room
						),
						React.createElement(WelcomeModalUsername, { username: username, handleUsernameChange: this.handleUsernameChange }),
						React.createElement(WelcomeModalColor, { color: color, handleColorClick: this.handleColorClick }),
						React.createElement("br", null),
						React.createElement(WelcomeModalButton, { enterClick: this.props.enterClick, isValid: this.state.isValid }),
						React.createElement(WelcomeModalNote, { welcomeModalNoteText: this.state.welcomeModalNoteText })
					)
				)
			);
		}
	}]);

	return WelcomeModal;
}(React.Component);

function WelcomeModalUsername(props) {
	// a component of the welcome modal that will on change, change the state in the UserDataComponent

	function handleUsernameChange(e) {
		props.handleUsernameChange(e);
	}
	return React.createElement(
		"div",
		{ className: "mt-3 row justify-content-center" },
		React.createElement(
			"label",
			null,
			"Choose a Username "
		),
		React.createElement("input", { type: "text", value: props.username, className: "form-control", onChange: handleUsernameChange, maxLength: "15" })
	);
}

function WelcomeModalColor(props) {
	// a component of the welcome modal that will on change, change the color in state in the UserDataComponent
	var colorArray = ['#60b748', '#177ceb', '#05b6c1', '#9e9e9e', '#ffc107', '#f0e42c', '#059688', '#e21b3c', '#d3709e', '#dc6b25', '#f7ffff' // NOTE: copy of array in UserDataComponent
	];
	var stateColor = props.color;
	var colorList = colorArray.map(function (color) {
		return React.createElement(ColorBox, { key: color, handleColorClick: handleColorClick, color: color, stateColor: stateColor });
	});

	function handleColorClick(color, e) {
		props.handleColorClick(color, e);
	}

	return React.createElement(
		"div",
		{ className: "mt-3 row justify-content-center" },
		React.createElement(
			"label",
			null,
			"Choose a Color"
		),
		React.createElement("br", null),
		React.createElement(
			"div",
			{ className: "d-flex text-center" },
			colorList
		)
	);
}

function ColorBox(props) {
	// the little color box that will be shown in the modal
	var shadow = props.stateColor == props.color ? '0px 0px 9px blue' : null;
	var border = props.stateColor == props.color ? '#9e9e9e' : 'black';

	return React.createElement("div", { style: { backgroundColor: props.color, boxShadow: shadow, borderColor: border }, className: "color-box mr-2", onClick: function onClick(e) {
			return props.handleColorClick(props.color, e);
		}, value: props.color });
}

function WelcomeModalNote(props) {
	var message = props.welcomeModalNoteText;

	return React.createElement(
		"div",
		{ className: "text-danger mt-1 px-3" },
		message
	);
}

function WelcomeModalButton(props) {
	// disables and enables the button based on the reactive username input validity

	return React.createElement(
		"button",
		{ className: "btn btn-primary mt-3", onClick: props.enterClick, disabled: !props.isValid },
		"Go to chat!"
	);
}

function AboutModal(props) {

	return React.createElement(
		"div",
		{ className: "modal-mask", onClick: props.toggleAboutModal },
		React.createElement(
			"div",
			{ className: "" },
			React.createElement(
				"div",
				{ className: "text-right text-md-center w-100" },
				React.createElement(
					"div",
					{ className: "mt-0 pr-1 pt-3 px-1 text-warning h5 click-to-close" },
					React.createElement(
						"strong",
						null,
						"Click to Close"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "about-modal-container text-center" },
				React.createElement(
					"div",
					{ className: "h5 mt-md-2" },
					"How does this work?"
				),
				React.createElement(
					"div",
					null,
					"The application creates chat rooms based on the ",
					React.createElement(
						"span",
						{ style: { color: '#e21b3c' } },
						"/url"
					),
					" given and will self-destruct once the last user leaves. That is to say that the app does not log or save any chat data once the room becomes empty. A new chat can be easily created using what is called a url slug. For example: "
				),
				React.createElement(
					"div",
					{ className: "my-2", style: { color: '#059688' } },
					"selfdestruct.chat",
					React.createElement(
						"span",
						{ style: { color: '#e21b3c' } },
						"/super_secret_chat"
					)
				),
				React.createElement(
					"div",
					null,
					"creates and enters a chat room named Super Secret Chat. Use underscores _ where you want spaces to be in your chat's name. Chat room names are not searchable and can be up to 22 characters in length."
				),
				React.createElement(
					"div",
					{ className: "mt-3" },
					"So long as there is at least 1 active user in the room, new users can join the conversation using the url link above. Once the last user closes their browser, that chat room is purged from the database along with all comments and associated usernames."
				),
				React.createElement(
					"div",
					{ className: "h5 mt-3 mb-2" },
					"About"
				),
				React.createElement(
					"div",
					{ className: "pb-4" },
					"The Self-Destruct chat app was developed by programmer Kyle Hopkins using Node, Express, and React Javascript libraries. If you are interested in hiring me for development work or to join your team, please contact me ",
					React.createElement(
						"a",
						{ href: "https://kyleweb.dev/#contact" },
						"here."
					)
				)
			)
		)
	);
}

var UserDataComponent = function (_React$Component6) {
	_inherits(UserDataComponent, _React$Component6);

	//this component is a wrapper for the app which will contain the common user state
	function UserDataComponent(props) {
		_classCallCheck(this, UserDataComponent);

		var _this7 = _possibleConstructorReturn(this, (UserDataComponent.__proto__ || Object.getPrototypeOf(UserDataComponent)).call(this, props));

		_this7.enterClick = _this7.enterClick.bind(_this7);
		_this7.settingsClick = _this7.settingsClick.bind(_this7);
		_this7.colorClick = _this7.colorClick.bind(_this7);
		_this7.usernameChange = _this7.usernameChange.bind(_this7);
		_this7.getComments = _this7.getComments.bind(_this7);
		_this7.addCommentToState = _this7.addCommentToState.bind(_this7);
		_this7.getToken = _this7.getToken.bind(_this7);
		_this7.startTokenTimer = _this7.startTokenTimer.bind(_this7);
		_this7.stopTokenTimer = _this7.stopTokenTimer.bind(_this7);
		_this7.toggleActiveUsersDropdown = _this7.toggleActiveUsersDropdown.bind(_this7);
		_this7.toggleAboutModal = _this7.toggleAboutModal.bind(_this7);
		_this7.getRoomSlug = _this7.getRoomSlug.bind(_this7);
		_this7.chatBoxRef = React.createRef();
		_this7.colorArray = ['#60b748', '#177ceb', '#05b6c1', '#9e9e9e', '#ffc107', '#f0e42c', '#059688', '#e21b3c', '#d3709e', '#dc6b25', '#f7ffff' // NOTE: copy of array in WelcomeModalColors component
		], _this7.state = {
			username: '',
			// make the color random on load
			color: _this7.colorArray[Math.floor(Math.random() * _this7.colorArray.length)],
			comments: [],
			showModal: true,
			showActiveUsersDropdown: false,
			showAboutModal: false,
			token: '',
			activeUsers: [],
			room: ''
		};

		return _this7;
	}

	_createClass(UserDataComponent, [{
		key: "enterClick",
		value: function enterClick() {
			this.setState({ showModal: false });
			this.getToken();

			// start the timer to refresh the token every few minutes
			this.startTokenTimer();
		}
	}, {
		key: "settingsClick",
		value: function settingsClick() {
			//closes the active users dropdown if it is open
			this.setState({
				showActiveUsersDropdown: false,
				showModal: true
			});
		}
	}, {
		key: "colorClick",
		value: function colorClick(color, e) {
			this.setState({ 'color': color });
		}
	}, {
		key: "usernameChange",
		value: function usernameChange(e) {
			this.setState({ username: e.target.value });
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this8 = this;

			//on mount, get the room slug and keep it in state
			this.getRoomSlug();

			//On component mount, make the first call to populate comments but do it with 0.1s timeout so that state has a chance to update the room name
			setTimeout(function () {
				_this8.getComments();
			}, 100);

			//lifecycle hook that will continuously call the function that makes an api call to the back end and re-renderes the updated state every 3 seconds

			setInterval(function () {
				return _this8.getComments();
			}, 3000);
		}
	}, {
		key: "getComments",
		value: function getComments() {
			var _this9 = this;

			axios.get('/getComments/' + this.state.room).then(function (res) {
				var roomNameParsed = _this9.state.room.replace(/_/g, ' ');
				// welcome note to be sent to state if comment rows come back empty
				var welcomeNoteObj = {
					id: 1,
					username: 'Welcome Note',
					color: '#05b6c1',
					comment: 'Welcome to ' + roomNameParsed + '! This chat will self-destruct if left empty for more than a few minutes. To prevent auto-erasure, keep this window open if you are the last user. If you would like others to join, just share the URL link! To create a new room, just change the link to /new_room_name. For more info, click on Self-Destruct above.'
				};
				var dataUsernames = res.data.usernames;
				var dataComments = res.data.comments.length == 0 ? [welcomeNoteObj] : res.data.comments;

				// only update the state if it is different from the last (new comments). this prevents the chat from scrolling to the bottom while the user is reading prevs
				if (_this9.state.comments.length > 2) {
					if (_this9.state.comments[_this9.state.comments.length - 1].id != dataComments[dataComments.length - 1].id) {
						_this9.setState({ comments: dataComments });

						// use a timout function on scrollToBottom so that state has time to update this prevents the chat from scrolling to the comment above newest
						setTimeout(function () {
							_this9.chatBoxRef.current.scrollToBottom();
						}, 1000);
					}
				} else {
					// populate the chat box with comments for the first time
					_this9.setState({ comments: dataComments });
					_this9.chatBoxRef.current.scrollToBottom();
				}

				// pupulate the activeUsers state
				_this9.setState({ activeUsers: dataUsernames });
			}).catch(function (err) {
				console.log(err);
			});
		}
	}, {
		key: "addCommentToState",
		value: function addCommentToState(commentObj) {
			var _this10 = this;

			// use callback function as setState arguement with state as the argument to add the recently submitted comment to show in the chatbox without delay
			commentObj.id = Math.random(); // a temporary id so that react can have a key
			this.setState(function (state) {
				return _this10.state.comments.push(commentObj);
			});
			this.chatBoxRef.current.scrollToBottom();
		}
	}, {
		key: "getToken",
		value: function getToken() {
			var _this11 = this;

			// function will api post call the back end at /getToken and the api will return a fresh token or renew the old one for a new. This will set the username or update it for active users too.

			var token = this.state.token;
			var username = this.state.username;
			var color = this.state.color;
			var room = this.state.room;
			axios.post('/getToken', { 'token': token, 'username': username, 'color': color, 'room': room }).then(function (res) {

				if (res.data.token != 'invalid token') {
					// update the state with new token
					_this11.setState({ 'token': res.data.token });
				} else {
					// there was an issue with the token, clear everything and alert the user

					//stop the timer from trying to refresh
					_this11.stopTokenTimer();

					alert('There was a problem with the token, please re-enter.');
					_this11.setState({
						showModal: true
					});
				}
			}).catch(function (err) {
				console.log(err);
			});
		}
	}, {
		key: "startTokenTimer",
		value: function startTokenTimer() {
			var _this12 = this;

			//start the timer, the var is declared in the global scope so that outside function can clear it
			var refreshTime = 3 * 60 * 1000; // refresh token every 3 minutes
			tokenTimer = setInterval(function () {
				return _this12.getToken();
			}, refreshTime);
		}
	}, {
		key: "stopTokenTimer",
		value: function stopTokenTimer() {
			// there was an issue, clear everything out
			clearInterval(tokenTimer);
			tokenTimer = '';
			this.setState({
				activeUsers: [],
				token: '',
				username: ''
			});
		}
	}, {
		key: "toggleActiveUsersDropdown",
		value: function toggleActiveUsersDropdown() {
			// toggle the visibility of the active users dropdown if in mobile view (md bootstrap size)

			if (window.innerWidth < 768) {
				this.setState({ showActiveUsersDropdown: !this.state.showActiveUsersDropdown });
			}
		}
	}, {
		key: "toggleAboutModal",
		value: function toggleAboutModal() {
			// toggle the visibility of the about modal

			this.setState({ showAboutModal: !this.state.showAboutModal });
		}
	}, {
		key: "getRoomSlug",
		value: function getRoomSlug() {
			var regex = /[A-Za-z0-9-._~]{1,22}/gi;
			var path = window.location.pathname;
			var sanitizedPath = path.match(regex) ? path.match(regex)[0] : 'Self-Destruct_Chat';

			this.setState({ room: sanitizedPath });
		}
	}, {
		key: "render",
		value: function render() {
			var modal = void 0;
			var showModal = this.state.showModal;
			var showActiveUsersDropdown = this.state.showActiveUsersDropdown;
			var showAboutModal = this.state.showAboutModal;
			if (showModal) {
				modal = React.createElement(WelcomeModal, { enterClick: this.enterClick, username: this.state.username, color: this.state.color, colorClick: this.colorClick, handleUsernameChange: this.usernameChange, activeUsers: this.state.activeUsers, room: this.state.room });
			}
			if (showActiveUsersDropdown) {
				modal = React.createElement(ActiveUsersDropdown, { activeUsers: this.state.activeUsers });
			}
			if (showAboutModal) {
				modal = React.createElement(AboutModal, { toggleAboutModal: this.toggleAboutModal });
			}
			return React.createElement(
				"div",
				null,
				React.createElement(AppHeader, { settingsClick: this.settingsClick, activeUsers: this.state.activeUsers, toggleActiveUsersDropdown: this.toggleActiveUsersDropdown, showActiveUsersDropdown: this.state.showActiveUsersDropdown, toggleAboutModal: this.toggleAboutModal }),
				React.createElement(ChatBox, { comments: this.state.comments, colorArray: this.colorArray, ref: this.chatBoxRef, activeUsers: this.state.activeUsers }),
				React.createElement(CommentBox, { color: this.state.color, username: this.state.username, addCommentToState: this.addCommentToState, token: this.state.token, stopTokenTimer: this.stopTokenTimer, room: this.state.room }),
				modal
			);
		}
	}]);

	return UserDataComponent;
}(React.Component);

// find the html element and render the button


var domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(
	"div",
	{ className: "container-fluid" },
	React.createElement(UserDataComponent, null)
), domContainer);