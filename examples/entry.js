import React, { Component } from 'react';
import { render } from 'react-dom';
import { VContainer } from '../src';

const sample_text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere massa non suscipit suscipit. Nullam nisl massa, pretium vel ligula a, auctor mollis velit. Vivamus volutpat eu nulla ac pellentesque. Aliquam leo tortor, congue vitae mattis nec, sagittis non elit. Maecenas suscipit non elit eu ultrices. Maecenas sodales nec orci sit amet tristique. Nulla porttitor, magna a dignissim vestibulum, eros libero sodales ante, ultrices euismod justo augue pellentesque quam. Integer vitae nunc nec nisi ullamcorper dignissim. Nulla sodales sem id arcu interdum, consequat imperdiet odio vehicula. Sed et vulputate diam, ut vestibulum urna. Suspendisse commodo venenatis purus nec ultrices. Praesent velit neque, aliquet non urna viverra, ornare egestas diam. Nulla sapien tortor, rutrum vel tempus a, semper vel metus.';

class Image extends Component {
	render() {
		return <img src={ this.props.src } />;
	}
}

class Text extends Component {
	render() {
		return (
			<span>
				{ this.props.text }
			</span>
		);
	}
}

class Iframe extends Component {
	render() {
		return (
			<iframe src='http://example.com/' height='200' width='300' />
		);
	}
}

const items = [...Array(1000).keys()].map(function(item, index) {
	const roll = Math.random();

	if (roll < 0.5) {
		const height = Math.floor(Math.random() * 100 + 20);

		return {
			type: 'image',
			id: `${ item }`, // id must be a string
			src: `http://lorempixel.com/100/${ height }/`
		};
	}
	else if (roll >= 0.5 && roll < 0.9) {
		const slice_index = Math.floor(Math.random() * 800);

		return {
			type: 'text',
			id: `${ item }`, // id must be a string
			text: sample_text.slice(0, slice_index)
		};
	}
	else {
		return {
			type: 'iframe',
			id: `${ item }`, // id must be a string
		};
	}
});

render(
	<VContainer
		style={ {
			height: '100%',
			width: '100%',
			position: 'fixed',
			top: 0,
			left: 0,
			overflow: 'auto'
		} }
		items={ items }
		initialHeight={ 50 }
		maxRows={ 50 }
		renderItem={ function(item) {
			switch (item.type) {
				case 'image':
					return <Image src={ item.src } />;
				case 'text':
					return <Text text={ item.text } />;
				case 'iframe':
					return <Iframe />;
				default:
					return null;
			}
		} }
	/>,
	document.getElementById('app')
);
