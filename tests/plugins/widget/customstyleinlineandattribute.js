/* bender-tags: widget */
/* bender-ckeditor-plugins: widget */
/* bender-include: _helpers/tools.js */
/* global widgetTestsTools */

( function() {
	'use strict';

	function createStyle( styleDefinition ) {
		return new CKEDITOR.style( styleDefinition );
	}

	var getWidgetById = widgetTestsTools.getWidgetById,
		styles = {
			'background-color': 'black',
			'width': '100px',
			'height': '200px'
		},
		attributes = {
			'src': './some/fake/src',
			'width': '100px'
		},
		initialStyles = {
			'border': '1px solid black',
			'border-radius': '3px'
		},
		initialAttributes = {
			'alt': 'alternative text',
			'height': '200px'
		},
		testHtml = '<img data-widget="testWidget" id="test-widget">test</img>';

	function setFromObject( targetElement, sourceObject, styleOrAttr ) {
		styleOrAttr = styleOrAttr ? 'Style' : 'Attribute';
		for ( var key in sourceObject ) {
			targetElement[ 'set' + styleOrAttr ]( key, sourceObject[ key ] );
		}
	}

	function assertTestStyles( element, sourceObject, styleOrAttribute ) {
		styleOrAttribute = styleOrAttribute ? 'Style' : 'Attribute';
		for ( var key in sourceObject ) {
			var elementProp = element[ 'get' + styleOrAttribute ]( key ),
				sourceProp = sourceObject[ key ];
			// Some browsers might return elements width and height without 'px', following code should prevent comparing e.g. '200' == '200px'
			if ( !( /\s/.test( sourceProp ) ) && parseInt( sourceProp, 10 ) ) {
				sourceProp = parseInt( sourceProp, 10 );
				elementProp = parseInt( elementProp, 10 );
			}
			assert.areSame( elementProp, sourceProp );
		}
	}

	function assertTestRemovedStyles( element, sourceObject, styleOrAttribute ) {
		styleOrAttribute = styleOrAttribute ? 'Style' : 'Attribute';
		for ( var key in sourceObject ) {
			assert.isFalse( !!element[ 'get' + styleOrAttribute ]( key ) );
		}
	}

	CKEDITOR.plugins.add( 'testWidget', {
		init: function( editor ) {
			editor.widgets.add( 'testWidget', {} );
		}
	} );

	bender.editors = {
		editor: {
			name: 'editor1',
			creator: 'inline',
			config: {
				extraPlugins: 'testWidget',
				allowedContent: true
			}
		}
	};

	bender.test( {
		'test apply remove inline style': function() {
			var editor = this.editors.editor,
				style = createStyle( {
					type: 'widget',
					widget: 'testWidget',
					styles: styles
				} );

			this.editorBots.editor.setData( testHtml, function() {
				var widget = getWidgetById( editor, 'test-widget' );

				// Apply initial styles to widget
				setFromObject( widget.element, initialStyles, 1 );

				// Apply styles from `style` object to widget, widget needs to be focused for that
				widget.focus();
				style.apply( editor );

				// Test if styles from `style` are applied to widget
				assertTestStyles( widget.element, style.getDefinition().styles, 1 );

				style.remove( editor );

				// Test if styles from `styles` are removed from widget
				assertTestRemovedStyles( widget.element, style.getDefinition().styles, 1 );

				// Test if initial styles are preserved
				assertTestStyles( widget.element, initialStyles, 1 );
			} );
		},
		'test apply remove attribute': function() {
			var editor = this.editors.editor,
				style = createStyle( {
					type: 'widget',
					widget: 'testWidget',
					attributes: attributes
				} );

			this.editorBots.editor.setData( testHtml, function() {
				var widget = getWidgetById( editor, 'test-widget' );

				// Apply initial attributes to widget
				setFromObject( widget.element, initialAttributes, 0 );

				// Apply attributes from `style` object to widget, widget needs to be focused for that
				widget.focus();
				style.apply( editor );

				// Test if styles from `style` are applied to widget
				assertTestStyles( widget.element, style.getDefinition().attributes, 0 );

				style.remove( editor );
				// Test if styles from `styles` are removed from widget
				assertTestRemovedStyles( widget.element, style.getDefinition().attributes, 0 );

				// Test if initial styles are preserved
				assertTestStyles( widget.element, initialAttributes, 0 );
			} );
		},
		'test apply remove inline style and attribute': function() {
			var editor = this.editors.editor,
				style = createStyle( {
					type: 'widget',
					widget: 'testWidget',
					styles: styles,
					attributes: attributes
				} );

			this.editorBots.editor.setData( testHtml, function() {
				var widget = getWidgetById( editor, 'test-widget' );

				// Apply initial styles and attributes to widget
				setFromObject( widget.element, initialAttributes, 0 );
				setFromObject( widget.element, initialStyles, 1 );

				// Apply styles and attributes from `style` object to widget, widget needs to be focused for that
				widget.focus();
				style.apply( editor );

				// Test if styles and attributes from `style` are applied to widget
				assertTestStyles( widget.element, style.getDefinition().styles, 1 );
				assertTestStyles( widget.element, style.getDefinition().attributes, 0 );

				style.remove( editor );
				// Test if styles and attributes from `styles` are removed from widget
				assertTestRemovedStyles( widget.element, style.getDefinition().styles, 1 );
				assertTestRemovedStyles( widget.element, style.getDefinition().attributes, 0 );

				// Test if initial styles and attributes are preserved
				assertTestStyles( widget.element, initialStyles, 1 );
				assertTestStyles( widget.element, initialAttributes, 0 );
			} );
		}
	} );
} )();