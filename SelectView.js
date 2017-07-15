// create by pengxiaolong: wheelo@163.com
// 2017.7.15

var SelectView = React.createClass({
    getInitialState() {
        return {
        };
    },

    componentDidMount(){
        this.$selectDom = $(React.findDOMNode(this.refs["select"+this.props.name]));
        this.initSelectView();
    },

    // Async update
    componentDidUpdate(nextProps) {
        if (this.props.shouldSelectUpdate) {
            this.rebuildSelect();
        }
    },

    componentWillUnmount() {
		if (this.$selectDom) {
			this.$selectDom.multiselect('destroy');
		}
		this.$selectDom = null;
	},

    rebuildSelect() {
        this.$selectDom.empty();

        var str = '';
        for (var key in this.props.data) {
        	str += '<option value='+key+'>'+this.props.data[key]+'</option>';
        }
        // rebuild
        this.$selectDom.html(str).multiselect('rebuild');
        var json = {
        	nonSelectedText: this.props.selectText,
        	buttonTitle: this.getSelectEvent()
        };

        if (this.props.isMultiple) {
        	$.extend(json,{
                enableFiltering: true,
        		selectAllText: "All",
        		includeSelectAllOption:true
            });
        } else {
        	$.extend(json,{ enableFiltering: true });
        }
        this.$selectDom.multiselect(json);
    },

    // 选择完后的调用事件
    getSelectEvent() {
    	return (options, select) => {
            var selected = "";
            if(this.props.isMultiple){
                selected = [];
            }
            options.each(function (index,option) {
                var value = $(option).attr('value');
                if(value == "") return;
                if(this.props.isMultiple){
                    selected.push(value);
                }else{
                    selected = value;
                }
            }.bind(this));

            if($.isFunction(this.props.selectEvent)){
                if(selected) this.props.selectEvent(selected);
            }
            return selected;
        };
    },

    initSelectView() {
        var object = this.props.defaultValue || "";

        var json = {
            enableFiltering: true,
            includeSelectAllOption:true,
            buttonTitle: this.getSelectEvent(),
            nonSelectedText:this.props.selectText
        };

        if(this.props.isMultiple){
            json = $.extend(json,{
                selectAllText:"All"
            });
        }

        this.$selectDom.multiselect(json);

        var $selectPanelDom = $(React.findDOMNode(this.refs["selectPanel"+this.props.name]));

        if(object instanceof Array){
            if(object.length == 0){
                for(var i = 0, length = this.props.data.length;i < length ;i ++){
                    $("input[value='"+this.props.data[i]+"']",$selectPanelDom).prop("checked", false).trigger("change");
                }
            }else{
                for(var i = 0, length = object.length; i < length; i ++){
                    $("input[value='"+object[i]+"']",$selectPanelDom).prop("checked", true).trigger("change");
                }
            }
        }else{
            $("input[value='"+object+"']",$selectPanelDom).prop("checked", true).trigger("change");
        }

        if(!this.props.isMultiple){
            $selectPanelDom.find('.open').removeClass('open');
        }

    },

    render(){
    	var liArr = [];
    	for (var key in this.props.data) {
            liArr.push(<option key={key} value={key}>{this.props.data[key]}</option>);
        }

        return (
            <div ref={"selectPanel"+this.props.name} className="btn-group">
                <select ref={"select"+this.props.name} size="2" multiple={this.props.isMultiple ? "multiple" : null}>
                    {
                        liArr
                    }
                </select>
            </div>
        );
    }
});

module.exports = SelectView;
