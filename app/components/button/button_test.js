import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import Button from './button.jsx';

// TODO: move to utils as HOC
class ButtonWrapper extends React.Component {
    render() {
        return (
            <Button {...this.props} />
        )
    }
}

describe('Button', function() {
    it('should render passed value', function() {
        var button = ReactTestUtils.renderIntoDocument(
            <ButtonWrapper value="custom value" />
        );

        var buttonElement = ReactTestUtils.findRenderedDOMComponentWithTag(button, 'button');

        // TODO: enzyme?
        expect(ReactDOM.findDOMNode(buttonElement).textContent).to.equal('custom value');
    });
});
