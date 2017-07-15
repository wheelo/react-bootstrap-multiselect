// create by pengxiaolong: wheelo@163.com
// 2017.7.15

var SelectView = require('./react-bootstrap-multiselect');

var ReactSelectView = React.createClass({

    getInitialState(){
        return {
        };
    },

    render(){

        return (
                <div>
                    <div>
                        <SelectView {...this.props} />
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>
            );
    }
});


module.exports = ReactSelectView;
