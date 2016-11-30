var React = require('react');
var InsightActions = require('./../../flux/actions/InsightActions');
var InsightConstants = require('./../../flux/constants/InsightConstants');
var keyMirror = require('keymirror');

var buttonsType = keyMirror({
  FIND_MATCH: null
});

var InsightMenuBarPreview = React.createClass({
  
  render: function() {
    var menubarStyle = {
      height: this.props.height,
      width: this.props.width,
      background: '#f2f2f2',
      paddingTop: 10,
      paddingLeft: 5,
    };

    var buttons = [buttonsType.FIND_MATCH];
    var that = this;

    var IconsJSX = buttons.map(function(type) {
      return <MenuIcon 
              key={type}
              type={type}
              onClick={ () => InsightActions.findMatch() }/>
    });

    return (
      <div style={menubarStyle}>
        {IconsJSX}
      </div>
    );
   },
});

var MenuIcon = React.createClass({

  render: function() {
    var type = this.props.type;

    var [icon, className, title, message] = getTypeInfo(type);
    className += ' menu';
    return (
      <i className={className}
        onClick={this.props.onClick}
        onMouseEnter={(event) => this._handleEnter(active, title, message, icon)}
        onMouseLeave={(event) => this._handleLeave(active)}>
      </i>);
  },
  _handleEnter: function(active, title, message, icon) {
    InsightActions.sendMessage([title, icon, '#efefef', '#a3cfec', message, true]);
  },
  _handleLeave: function(active){
    InsightActions.sendMessage(['', '', '', '', '', false]);
  }
});

var getTypeInfo = function(type) {
  var icon, className, title, message;

  switch(type){
    case buttonsType.FIND_MATCH:
       icon = "search";
       className = "fa fa-search fa-2x";
       title = 'Find matches';
       message =  'finds best matches with selected query from the current dataset';
       break;
  }

  return [icon, className, title, message];
};


module.exports = InsightMenuBarPreview;