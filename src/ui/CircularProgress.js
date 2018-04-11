import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class LoadSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CircularProgress />
    );
  }
}
