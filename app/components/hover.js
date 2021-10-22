import React from "react";

export default class Hover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({
      hovering: true,
    });
  }

  mouseOut() {
    this.setState({
      hovering: false,
    });
  }

  render() {
    const { hovering } = this.state;
    const { children } = this.props;

    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {children(hovering)}
      </div>
    );
  }
}
