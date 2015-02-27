var React = require('react/addons');

export default React.createClass({
    render: function() {
        return <button>
            {this.props.value}
        </button>
    }
})