import React from 'react';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import persist from '../decorators/persist';
import connect from '../decorators/connect';
import storage from '../libs/storage';

const noteStorageName = 'notes';

class App extends React.Component {
  constructor(props: {
    notes: Array;
  }) {
    super(props);

    NoteActions.init(storage.get(noteStorageName));

    this.state = NoteStore.getState();
  }
  render() {
    var notes = this.props.notes;

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

export default persist(
  connect(App, NoteStore),
  storage,
  noteStorageName,
  () => NoteStore.getState()
);
