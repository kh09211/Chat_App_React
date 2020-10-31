/****
 * 
 * Cant pick the username of an active user
 * active users flexbox with a gutter, mobile view will have something different or one...
 * switch to production cdn 10 second job
 * 
 * 
 * The Chat App written by programmer Kyle Hopkins using React, Node, and Express
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

			return React.createElement(
				"div",
				{ id: "header", className: "container-xl" },
				React.createElement(
					"div",
					{ className: "row justify-content-between px-4" },
					React.createElement(
						"div",
						{ className: "d-flex" },
						React.createElement(
							"div",
							{ className: "h4 text-light ml-2" },
							"Chat App"
						),
						React.createElement(
							"div",
							{ id: "settings-button", className: "ml-4 text-light", onClick: this.props.settingsClick },
							React.createElement("i", { className: "fas fa-user-cog pt-1" })
						)
					),
					React.createElement(
						"div",
						{ className: "text-right text-light mr-2" },
						"Active Users: ",
						this.props.activeUsers.length
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
		_this2.state = {};
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
						{ className: "col-md-2" },
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
						{ className: "col-md-10" },
						React.createElement(
							"div",
							{ id: "comment-message", className: "pl-3 mr-2" },
							comment.comment
						)
					)
				);
			});

			return React.createElement(
				"div",
				{ id: "chatbox", className: "container-xl" },
				mappedComments,
				React.createElement("div", { id: "scroll-to-bottom-div", style: { height: "7px" }, ref: this.messagesEndRef })
			);
		}
	}]);

	return ChatBox;
}(React.Component);

var CommentBox = function (_React$Component3) {
	_inherits(CommentBox, _React$Component3);

	// contains the components of the input box and the submit button. 
	function CommentBox(props) {
		_classCallCheck(this, CommentBox);

		var _this3 = _possibleConstructorReturn(this, (CommentBox.__proto__ || Object.getPrototypeOf(CommentBox)).call(this, props));

		_this3.handleCommentChange = _this3.handleCommentChange.bind(_this3);
		_this3.clearCommentInput = _this3.clearCommentInput.bind(_this3);
		_this3.handleSubmit = _this3.handleSubmit.bind(_this3);
		_this3.state = {
			comment: ''
		};
		return _this3;
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
			var _this4 = this;

			// post the comment data to the back end

			var commentObj = {
				username: this.props.username,
				comment: this.state.comment,
				token: this.props.token,
				color: this.props.color
			};

			axios.post('/submitComment', commentObj).then(function (res) {

				if (res.data == 'success') {
					// get the new comment into the state so we dont have to wait for the timer
					_this4.props.addCommentToState(commentObj);
				} else if (res.data == 'invalid token') {
					// there was an issue with the token, clear everything and alert the user

					//stop the timer from trying to refresh
					_this4.props.stopTokenTimer();

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
				{ id: "commentbox", className: "container-xl px-0" },
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

	return React.createElement("input", { type: "text", className: "form-control w-100", placeholder: "Write a comment", onChange: handleChange, value: props.comment, onKeyPress: handleKeyPress, maxLength: "225" });
}

function CommentSubmitButton(props) {
	// a component of the CommentBox that will onClick make an api call to the back end with the message, username, and color, then on success will clear the comment input state NOTE: moved to commentbox

	function handleSubmitClick() {
		props.handleSubmit();
	}

	return React.createElement(
		"button",
		{ className: "btn btn-primary w-100", onClick: handleSubmitClick, disabled: props.comment == '' },
		"Submit"
	);
}

var WelcomeModal = function (_React$Component4) {
	_inherits(WelcomeModal, _React$Component4);

	// The welcome modal will render if there isnt a username in state or the user clicks the settings button. Will contain a welcome heading, the modal container box, and will opaque the background, and a button that on change hides the modal. 
	function WelcomeModal(props) {
		_classCallCheck(this, WelcomeModal);

		var _this5 = _possibleConstructorReturn(this, (WelcomeModal.__proto__ || Object.getPrototypeOf(WelcomeModal)).call(this, props));

		_this5.handleColorClick = _this5.handleColorClick.bind(_this5);
		_this5.handleUsernameChange = _this5.handleUsernameChange.bind(_this5);
		_this5.state = {
			isValid: false,
			welcomeMessage: React.createElement(
				"h4",
				{ className: "py-2" },
				"Welcome to Chat App!"
			)
		};
		return _this5;
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

			// check the validity of the username and then toggle NOTE: Same checks are in WelcomeModalNote
			var username = e.target.value;
			var regex = /^\s|[^A-Za-z0-9\s_]|\s$/g;

			if (username.length < 3) {
				this.setState({ isValid: false });
			} else if (username.length > 15) {
				this.setState({ isValid: false });
			} else if (regex.test(username)) {
				this.setState({ isValid: false });
			} else {
				this.setState({ isValid: true });
			}
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			// On component mount, change the welcome message & enable button
			if (this.props.username != '') {
				this.setState({ welcomeMessage: React.createElement(
						"h3",
						{ className: "py-2" },
						"Chat Settings"
					) });
				this.setState({ isValid: true });
			}
		}
	}, {
		key: "render",
		value: function render() {
			var welcomeMessage = this.state.welcomeMessage;
			var username = this.props.username;
			var color = this.props.color;

			return React.createElement(
				"div",
				{ className: "modal-mask" },
				React.createElement(
					"div",
					{ className: "modal-wrapper" },
					React.createElement(
						"div",
						{ className: "modal-container text-center text-dark" },
						welcomeMessage,
						React.createElement(WelcomeModalUsername, { username: username, handleUsernameChange: this.handleUsernameChange }),
						React.createElement(WelcomeModalColor, { color: color, handleColorClick: this.handleColorClick }),
						React.createElement("br", null),
						React.createElement(WelcomeModalButton, { enterClick: this.props.enterClick, isValid: this.state.isValid }),
						React.createElement(WelcomeModalNote, { username: username })
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
		{ className: "mt-3" },
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
		{ className: "mt-3" },
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
	var border = props.stateColor == props.color ? 'blue' : 'black';

	return React.createElement("div", { style: { backgroundColor: props.color, boxShadow: shadow, borderColor: border }, className: "color-box mr-2", onClick: function onClick(e) {
			return props.handleColorClick(props.color, e);
		}, value: props.color });
}

function WelcomeModalNote(props) {
	var username = props.username;
	var regex = /^\s|[^A-Za-z0-9\s_]|\s$/g;

	//NOTE: same test written in the WelcomeModal
	if (username.length < 3 && username != '') {
		return React.createElement(
			"div",
			{ className: "text-danger mt-1" },
			"Username must be 3 or more characters in length"
		);
	} else if (username.length > 15) {
		return React.createElement(
			"div",
			{ className: "text-danger mt-1" },
			"Username must not exceed 15 characters in length"
		);
	} else if (regex.test(username) && username != '') {
		return React.createElement(
			"div",
			{ className: "text-danger mt-1" },
			"Name cannot start or end with a space nor contain special chars"
		);
	} else {
		return null;
	}
}

function WelcomeModalButton(props) {
	// disables and enables the button based on the reactive username input validity

	return React.createElement(
		"button",
		{ className: "btn btn-primary mt-2", onClick: props.enterClick, disabled: !props.isValid },
		"Go to chat!"
	);
}

var UserDataComponent = function (_React$Component5) {
	_inherits(UserDataComponent, _React$Component5);

	//this component is a wrapper for the app which will contain the common user state
	function UserDataComponent(props) {
		_classCallCheck(this, UserDataComponent);

		var _this6 = _possibleConstructorReturn(this, (UserDataComponent.__proto__ || Object.getPrototypeOf(UserDataComponent)).call(this, props));

		_this6.enterClick = _this6.enterClick.bind(_this6);
		_this6.settingsClick = _this6.settingsClick.bind(_this6);
		_this6.colorClick = _this6.colorClick.bind(_this6);
		_this6.usernameChange = _this6.usernameChange.bind(_this6);
		_this6.getComments = _this6.getComments.bind(_this6);
		_this6.addCommentToState = _this6.addCommentToState.bind(_this6);
		_this6.getToken = _this6.getToken.bind(_this6);
		_this6.startTokenTimer = _this6.startTokenTimer.bind(_this6);
		_this6.stopTokenTimer = _this6.stopTokenTimer.bind(_this6);
		_this6.chatBoxRef = React.createRef();
		_this6.colorArray = ['#60b748', '#177ceb', '#05b6c1', '#9e9e9e', '#ffc107', '#f0e42c', '#059688', '#e21b3c', '#d3709e', '#dc6b25', '#f7ffff' // NOTE: copy of array in WelcomeModalColors component
		], _this6.state = {
			username: '',
			// make the color random on load
			color: _this6.colorArray[Math.floor(Math.random() * _this6.colorArray.length)],
			comments: [],
			showModal: true,
			token: '',
			activeUsers: []
		};

		return _this6;
	}

	_createClass(UserDataComponent, [{
		key: "enterClick",
		value: function enterClick() {
			this.setState({ showModal: false });
			this.getToken();
		}
	}, {
		key: "settingsClick",
		value: function settingsClick() {
			this.setState({ showModal: true });
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
			var _this7 = this;

			//lifecycle hook that will continuously call the function that makes an api call to the back end and re-renderes the updated state every 3 seconds

			setInterval(function () {
				return _this7.getComments();
			}, 3000);

			//On component mount, make the first call to populate comments
			this.getComments();
		}
	}, {
		key: "getComments",
		value: function getComments() {
			var _this8 = this;

			axios.get('/getComments').then(function (res) {
				var dataComments = res.data.comments;
				var dataUsernames = res.data.usernames;

				// only update the state if it is different from the last (new comments). this prevents the chat from scrolling to the bottom while the user is reading prevs
				if (_this8.state.comments.length > 2) {
					if (_this8.state.comments[0].id != dataComments[0].id) {
						_this8.setState({ comments: dataComments });

						// use a timout function on scrollToBottom so that state has time to update this prevents the chat from scrolling to the comment above newest
						setTimeout(function () {
							_this8.chatBoxRef.current.scrollToBottom();
						}, 1000);
					}
				} else {
					// populate the chat box with comments for the first time
					_this8.setState({ comments: dataComments });
					_this8.chatBoxRef.current.scrollToBottom();
				}

				// pupulate the activeUsers state
				_this8.setState({ activeUsers: dataUsernames });
			}).catch(function (err) {
				console.log(err);
			});
		}
	}, {
		key: "addCommentToState",
		value: function addCommentToState(commentObj) {
			var _this9 = this;

			// use callback function as setState arguement with state as the argument to add the recently submitted comment to show in the chatbox without delay
			commentObj.id = Math.random(); // a temporary id so that react can have a key
			this.setState(function (state) {
				return _this9.state.comments.push(commentObj);
			});
			this.chatBoxRef.current.scrollToBottom();
		}
	}, {
		key: "getToken",
		value: function getToken() {
			var _this10 = this;

			// function will api post call the back end at /getToken and the api will return a fresh token or renew the old one for a new. This will set the username or update it for active users too.

			var token = this.state.token;
			var username = this.state.username;
			axios.post('/getToken', { 'token': token, 'username': username }).then(function (res) {

				if (res.data.token != 'invalid token') {
					// update the state with new token
					_this10.setState({ 'token': res.data.token });

					// start the timer to refresh the token every few minutes
					_this10.startTokenTimer();
				} else {
					// there was an issue with the token, clear everything and alert the user

					//stop the timer from trying to refresh
					_this10.stopTokenTimer();

					alert('There was a problem with the token, please re-enter.');
					_this10.setState({
						token: '',
						username: '',
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
			var _this11 = this;

			//start the timer, the var is declared in the global scope so that outside function can clear it
			var refreshTime = 3 * 60 * 1000; // refresh token every 3 minutes
			tokenTimer = setInterval(function () {
				return _this11.getToken();
			}, refreshTime);
		}
	}, {
		key: "stopTokenTimer",
		value: function stopTokenTimer() {
			clearInterval(tokenTimer);
		}
	}, {
		key: "render",
		value: function render() {
			var modal = void 0;
			var showModal = this.state.showModal;
			if (showModal) {
				modal = React.createElement(WelcomeModal, { enterClick: this.enterClick, username: this.state.username, color: this.state.color, colorClick: this.colorClick, handleUsernameChange: this.usernameChange });
			}
			return React.createElement(
				"div",
				null,
				React.createElement(AppHeader, { settingsClick: this.settingsClick, activeUsers: this.state.activeUsers }),
				React.createElement(ChatBox, { comments: this.state.comments, colorArray: this.colorArray, ref: this.chatBoxRef }),
				React.createElement(CommentBox, { color: this.state.color, username: this.state.username, addCommentToState: this.addCommentToState, token: this.state.token, stopTokenTimer: this.stopTokenTimer }),
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
	{ className: "container-xl px-0" },
	React.createElement(UserDataComponent, null)
), domContainer);