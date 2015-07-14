import React from 'react';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import storage from '../libs/storage';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.storeChanged = this.storeChanged.bind(this);

    NoteActions.init(storage.get('notes'));
    this.state = NoteStore.getState();
  }
  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }
  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }
  storeChanged(state) {
    storage.set('notes', state);

    this.setState(NoteStore.getState());
  }
  render() {
    var notes = this.state.notes;

    return (
      <div>
        <button onClick={() => this.addItem()}>+</button>
        <Notes items={notes} onEdit={this.itemEdited.bind(this)} />
      </div>
    );
  }
  addItem() {
    NoteActions.create('New task');
  }
  itemEdited(id, task) {
    if(task) {
      NoteActions.update({id, task});
    }
    else {
      NoteActions.remove(id);
    }
  }
}
