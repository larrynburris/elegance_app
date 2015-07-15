import AltContainer from 'alt/AltContainer';
import React from 'react';

import alt from '../libs/alt';
import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

import persist from '../decorators/persist';
import {storage, storageName, getInitialData} from '../libs/storage';

@persist(storage, storageName, () => JSON.parse(alt.takeSnapshot()))
export default class App extends React.Component {
  constructor(props) {
    super(props);

    LaneActions.init(getInitialData('LaneStore'));
  }
  render() {
    return (
      <div>
        <button onClick={this.addLane}>+</button>
        <AltContainer
          stores={[LaneStore]}
          inject={ {
            items: () => LaneStore.getState().lanes || []
          } }
        >
          <Lanes />
        </AltContainer>
      </div>
    );
  }
  addLane() {
    LaneActions.create('New lane');
  }
}
