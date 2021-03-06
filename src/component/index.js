var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
require('./index.css');
var FlipMove = require('react-flip-move');

var styles = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexWrap: "wrap",
	width: "100%"
};

var ReactImageUploadComponent = function (_React$PureComponent) {
	_inherits(ReactImageUploadComponent, _React$PureComponent);

	function ReactImageUploadComponent(props) {
		_classCallCheck(this, ReactImageUploadComponent);

		var _this2 = _possibleConstructorReturn(this, (ReactImageUploadComponent.__proto__ || Object.getPrototypeOf(ReactImageUploadComponent)).call(this, props));

		_this2.state = {
			pictures: [],
			notAcceptedFileType: [],
			notAcceptedFileSize: []
		};
		_this2.inputElement = '';
		_this2.onDropFile = _this2.onDropFile.bind(_this2);
		_this2.triggerFileUpload = _this2.triggerFileUpload.bind(_this2);
		return _this2;
	}

	/*
	 On button click, trigger input file to open
	 */


	_createClass(ReactImageUploadComponent, [{
		key: 'triggerFileUpload',
		value: function triggerFileUpload() {
			this.inputElement.click();
		}

		/*
		 Handle file validation
		 */

	}, {
		key: 'onDropFile',
		value: function onDropFile(e) {
			var files = e.target.files;
			var _this = this;
			// If callback giving, fire.
			if (typeof this.props.onChange === "function") {
				this.props.onChange(files);
			}
			// Iterate over all uploaded files
			for (var i = 0, f; f = files[i]; i++) {
				// Check for file extension
				if (!this.hasExtension(f.name)) {
					var newArray = _this.state.notAcceptedFileType.slice();
					newArray.push(f.name);
					_this.setState({ notAcceptedFileType: newArray });
					continue;
				}
				// Check for file size
				if (f.size > this.props.maxFileSize) {
					var _newArray = _this.state.notAcceptedFileSize.slice();
					_newArray.push(f.name);
					_this.setState({ notAcceptedFileSize: _newArray });
					continue;
				}

				var reader = new FileReader();
				// Read the image via FileReader API and save image result in state.
				reader.onload = function () {
					return function (e) {
						if (_this.state.pictures.indexOf(e.target.result) === -1) {
							var _newArray2 = _this.state.pictures.slice();
							_newArray2.push(e.target.result);
							_this.setState({ pictures: _newArray2 });
						}
					};
				}(f);
				reader.readAsDataURL(f);
			}
		}

		/*
		 Render the upload icon
		 */

	}, {
		key: 'renderIcon',
		value: function renderIcon() {
			if (this.props.withIcon) {
				return React.createElement('span', { className: 'uploadIcon' });
			}
		}

		/*
		 Render label
		 */

	}, {
		key: 'renderLabel',
		value: function renderLabel() {
			if (this.props.withLabel) {
				return React.createElement(
					'p',
					{ className: this.props.labelClass, style: this.props.labelStyles },
					this.props.label
				);
			}
		}

		/*
		 Check file extension (onDropFile)
		 */

	}, {
		key: 'renderLabelFormat',
		value: function renderLabelFormat() {
			if (this.props.withLabel) {
				return React.createElement(
					'p',
					{ className: this.props.labelClass, style: this.props.labelStyles },
					'File Format: jpg/png/gif'
				);
			}
		}

		/*
		 Check file extension (onDropFile)
		 */

	}
	, {
		key: 'hasExtension',
		value: function hasExtension(fileName) {
			return new RegExp('(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$').test(fileName);
		}

		/*
		 Remove the image from state
		 */

	}, {
		key: 'removeImage',
		value: function removeImage(picture) {
			// If callback giving, fire.
			if (typeof this.props.onRemove === "function") {
				this.props.onRemove(picture);
			}
			
			var filteredAry = this.state.pictures.filter(function (e) {
				return e !== picture;
			});
			this.setState({ pictures: filteredAry });
		}

		/*
		 Check if any errors && render
		 */

	}, {
		key: 'renderErrors',
		value: function renderErrors() {
			var _this3 = this;

			var notAccepted = '';
			if (this.state.notAcceptedFileType.length > 0) {
				notAccepted = this.state.notAcceptedFileType.map(function (error, index) {
					return React.createElement(
						'div',
						{ className: 'errorMessage' + _this3.props.errorClass, key: index, style: _this3.props.errorStyle },
						'* ',
						error,
						' ',
						_this3.props.fileTypeError
					);
				});
			}
			if (this.state.notAcceptedFileSize.length > 0) {
				notAccepted = this.state.notAcceptedFileSize.map(function (error, index) {
					return React.createElement(
						'div',
						{ className: 'errorMessage' + _this3.props.errorClass, key: index, style: _this3.props.errorStyle },
						'* ',
						error,
						' ',
						_this3.props.fileSizeError
					);
				});
			}
			return notAccepted;
		}

		/*
		 Render preview images
		 */

	}, {
		key: 'renderPreview',
		value: function renderPreview() {
			return React.createElement(
				'div',
				{ className: 'uploadPicturesWrapper' },
				React.createElement(
					FlipMove,
					{ enterAnimation: 'fade', leaveAnimation: 'fade', style: styles },
					this.renderPreviewPictures()
				)
			);
		}
	}, {
		key: 'renderPreviewPictures',
		value: function renderPreviewPictures() {
			var _this4 = this;

			return this.state.pictures.map(function (picture, index) {
				return React.createElement(
					'div',
					{ key: index, className: 'uploadPictureContainer' },
					React.createElement(
						'div',
						{ className: 'deleteImage', onClick: function onClick() {
							return _this4.removeImage(picture);
						} },
						'X'
					),
					React.createElement('img', { src: picture, className: 'uploadPicture', alt: 'preview' })
				);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			return React.createElement(
				'div',
				{ className: 'fileUploader', style: this.props.style },
				React.createElement(
					'div',
					{ className: 'fileContainer' },
					React.createElement(
						'div',
						{ className: 'errorsContainer' },
						this.renderErrors()
					),
					//this.renderIcon(),
					React.createElement(
						'button',
						{
							className: "chooseFileButton " + this.props.buttonClassName,
							style: this.props.buttonStyles,
							onClick: this.triggerFileUpload
						},
						this.props.buttonText
					),
					this.renderLabel(),
					this.renderLabelFormat(),
					React.createElement('input', {
						type: 'file',
						ref: function ref(input) {
							return _this5.inputElement = input;
						},
						name: this.props.name,
						multiple: 'multiple',
						onChange: this.onDropFile,
						accept: this.props.accept,
						className: this.props.className
					}),
					this.renderPreview()
				)
			);
		}
	}]);

	return ReactImageUploadComponent;
}(React.PureComponent);

ReactImageUploadComponent.defaultProps = {
	className: '',
	buttonClassName: {},
	buttonStyles: {},
	withPreview: false,
	accept: "accept=image/*",
	name: "",
	withIcon: true,
	buttonText: "Choose images",
	withLabel: true,
	label: "Max file size: 5mb, accepted: jpg|gif|png",
	labelStyles: {},
	labelClass: "",
	imgExtension: ['.jpg', '.gif', '.png'],
	maxFileSize: 5242880,
	fileSizeError: " file size is too big",
	fileTypeError: " is not supported file extension",
	errorClass: "",
	style: {},
	errorStyle: {}
};

ReactImageUploadComponent.PropTypes = {
	style: PropTypes.string,
	className: PropTypes.string,
	onChange: PropTypes.func,
	onRemove: PropTypes.func,
	buttonClassName: PropTypes.object,
	buttonStyles: PropTypes.object,
	withPreview: PropTypes.bool,
	accept: PropTypes.string,
	name: PropTypes.string,
	withIcon: PropTypes.bool,
	buttonText: PropTypes.string,
	withLabel: PropTypes.bool,
	label: PropTypes.string,
	labelStyles: PropTypes.object,
	labelClass: PropTypes.string,
	imgExtension: PropTypes.array,
	maxFileSize: PropTypes.number,
	fileSizeError: PropTypes.string,
	fileTypeError: PropTypes.string,
	errorClass: PropTypes.string,
	errorStyle: PropTypes.object
};
export default ReactImageUploadComponent;
