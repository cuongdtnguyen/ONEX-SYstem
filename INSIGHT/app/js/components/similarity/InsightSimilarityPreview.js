var React = require('react');
var InsightConstants = require('./../../flux/constants/InsightConstants');
var InsightActions = require('./../../flux/actions/InsightActions');
var TimeSeries = require('./../../TimeSeries');

var InsightMenuBarPreview = require('./InsightMenuBarPreview');
var MultiTimeSeriesChart = require('./../charts/MultiTimeSeriesChart');
var OverviewChart = require('./../charts/OverviewChart');

var InsightSimilarityPreview = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    previewSequence: React.PropTypes.object,
    previewRange: React.PropTypes.array,
    metadata: React.PropTypes.object
  },

  render: function() {
    var height = this.props.height;
    var width = this.props.width;
    var menuWidth = 40;
    var graphWidth = this.props.width - menuWidth - 10;

    var InsightMenuBarPreviewJSX =
      <InsightMenuBarPreview
        width={menuWidth}
        height={height}
      />;

    var previewSequence = this.props.previewSequence || new TimeSeries([], '', -1, 0, 0, 0);
    var previewRange = this.props.previewRange || [0, 1];
    var YDomain = [previewSequence.getMin(), previewSequence.getMax()];
    var selectedSequence = previewSequence.getValues().slice(previewRange[0], previewRange[1] + 1);

    var selectedViewData = {
      series: [{ values: selectedSequence,
                 color: '#74a2cc' }],
      domains: { x: previewRange, y: YDomain },
    };

    var selectedMargins = {left: 50, right: 20, top: 20, bottom: 20};
    var SelectedD3JSX = <MultiTimeSeriesChart
                          margins={selectedMargins}
                          width={graphWidth - selectedMargins.left - selectedMargins.right}
                          height={0.7 * height - selectedMargins.top - selectedMargins.bottom}
                          data={selectedViewData}
                          strokeWidth={3}
                          title={'Preview Query'}
                        />;
    var overviewData = {
      series: [{ values: previewSequence.getValues()}, { values: selectedSequence } ],
      domains: { x: [previewSequence.getStart(), previewSequence.getEnd()], y: YDomain },
    }
    var overviewMargins = {left: 50, right: 20, top: 5, bottom: 35};
    var OverviewD3JSX = <OverviewChart
                          margins={overviewMargins}
                          width={graphWidth - overviewMargins.left - overviewMargins.right}
                          height={0.3 * height - overviewMargins.top - overviewMargins.bottom}
                          data={overviewData}
                          strokeWidth={3}
                          onBrushSelection={(range) => InsightActions.selectPreviewRange(range)}
                          title={'Brush a Subsequence'}
                        />;

    var style = {
      height: height,
      width: width,
      overflow: 'hidden'
    };
    return (
      <div style={style}>
        <div style={{float: 'left', width: graphWidth}}>
          {SelectedD3JSX}
          {OverviewD3JSX}
        </div>
        <div style={{float: 'right'}}>
          {InsightMenuBarPreviewJSX}
        </div>
      </div>
    );
  }
});

module.exports = InsightSimilarityPreview;
