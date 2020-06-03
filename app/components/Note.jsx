import React from 'react'
import './Note.css';
import {Link} from 'react-router-dom';

function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { y: rect.top + scrollTop, x: rect.left + scrollLeft }
}

class NotesHeader extends React.Component {
  constructor(props) {
    super(props);
    this.element = null;

    this.onElementRef = this.onElementRef.bind(this);
    this.sendRect = this.sendRect.bind(this);
  }

  onElementRef(element) {
    this.element = element;
  }

  sendRect() {
    if (this.element) {

      let rect = Object.assign({}, offset(this.element));

      let domRect = this.element.getBoundingClientRect();
      rect.width = domRect.width;
      rect.height = domRect.height;

      let update = this.props.update;
      update(rect);
    }
  }

  componentDidMount() {
    this.sendRect();

    window.document.addEventListener('DOMContentLoaded', this.sendRect);
    window.addEventListener('load', this.sendRect);
  }

  componentWillUnmount() {
    window.document.removeEventListener('DOMContentLoaded', this.sendRect);
    window.removeEventListener('load', this.sendRect);
  }

  render() {
    return <div ref={this.onElementRef}>Notes</div>;
  }
}

class NoteAnchor extends React.Component {
  constructor(props) {
    super(props);
    this.element = null;
    this.state = {
      color: null
    };

    this.onElementRef = this.onElementRef.bind(this);
    this.sendPosition = this.sendPosition.bind(this);
  }

  onElementRef(element) {
    this.element = element;
  }

  sendPosition() {
    if (this.element) {
      this.props.update(this.props.name, offset(this.element));
    }
  }

  componentDidMount() {
    this.sendPosition();

    window.document.addEventListener('DOMContentLoaded', this.sendPosition);
    window.addEventListener('load', this.sendPosition);
  }

  componentWillUnmount() {
    window.document.removeEventListener('DOMContentLoaded', this.sendPosition);
    window.removeEventListener('load', this.sendPosition);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.name in this.props.colorsAndPositions) {
      if (this.state.color != this.props.colorsAndPositions[this.props.name].color) {
        this.setState((state, props) => {
          state.color = props.colorsAndPositions[props.name].color;
          return state;
        });
      }
    }
  }

  render() {
    return <span className="c-note anchor root" ref={this.onElementRef}><div className={"c-note anchor image color" + this.state.color}></div></span>;
  }
}

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.element = null;
    this.state = {
      initialY: 0, // Where the element was when top:0px
      offsetY: 0, // Our CSS 'top' value (in pixels)
      color: null,
    };
    this.onElementRef = this.onElementRef.bind(this);
    this.sendSize = this.sendSize.bind(this);
  }

  onElementRef(element) {
    this.element = element;
    if (element) {
      let initialY = offset(element).y;
      this.setState((state, props) => {
        state.initialY = initialY;
        return state;
      });
    }
  }

  sendSize() {
    if (this.element) {
      if (this.props.update) {
        const rect = this.element.getBoundingClientRect();

        let updateSize = this.props.update;
        updateSize(this.props.name, {
          width: rect.width,
          height: rect.height
        });
      }
    }
  }

  componentDidMount() {
    this.sendSize();

    window.document.addEventListener('DOMContentLoaded', this.sendSize);
    window.addEventListener('load', this.sendSize);
  }

  componentWillUnmount() {
    window.document.removeEventListener('DOMContentLoaded', this.sendSize);
    window.removeEventListener('load', this.sendSize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.name in this.props.colorsAndPositions) {
      let newOffsetY = this.props.colorsAndPositions[this.props.name].y - this.state.initialY;
      if (this.state.offsetY != newOffsetY) {
        this.setState((state, props) => {
          state.offsetY = props.colorsAndPositions[props.name].y - state.initialY;
          state.color = props.colorsAndPositions[props.name].color;
          return state;
        });
      }
    }
  }

  render() {
    return (
      <div ref={this.onElementRef}
          className="c-note note root"
          style={{top: this.state.offsetY}}>
        <span className="c-note note image-container" ref={this.onElementRef}><div className={"c-note note image color" + this.state.color}></div></span> {this.props.children}
      </div>
    );
  }
}

class NoteManager {
  constructor(owner) {
    this.owner = owner;
    this.owner.state = {
      noteAnchorPositions: {},
      notesHeaderRect: null,
      noteSizes: {},
      noteColorsAndPositions: {},
    };
  }

  updateNotesHeaderRect(rect) {
    console.log("got rect!", rect);
    this.owner.setState((state, props) => {
      state.notesHeaderRect = rect;
      return state;
    });
  }

  updateNoteAnchorPosition(name, position) {
    this.owner.setState((state, props) => {
      state.noteAnchorPositions[name] = position;
      return state;
    });
  }

  updateNoteSize(name, size) {
    this.owner.setState((state, props) => {
      state.noteSizes[name] = size;
      return state;
    });
  }

  calculateNoteColorsAndPositions(notesHeaderRect, desiredPositions, sizes) {
    let noteColorsAndPositions = {};

    let notes = [];
    for (let name in desiredPositions) {
      notes.push({
        name: name,
        y: desiredPositions[name].y | 0,
        height: sizes[name].height | 0
      });
    }

    // Sort them so the below loop can be O(n) and not have to repeat itself.
    notes.sort((a, b) => a.y - b.y);

    // Add the header in, make sure it's first so everything is below it.
    notes.splice(0, 0, {
      y: notesHeaderRect.y | 0,
      height: notesHeaderRect.height | 0
    });

    // If any are too close, move the lower one down more.
    for (let i = 0; i < notes.length - 1; i++) {
      let a = notes[i];
      let b = notes[i + 1];
      if (b.y < a.y + a.height + 16) {
        b.y = a.y + a.height + 16;
      }
    }
    for (let i = 1; i < notes.length; i++) {
      let note = notes[i];
      noteColorsAndPositions[note.name] = {
        x: note.x,
        y: note.y,
        color: (i - 1) % 6,
      };
    }

    return noteColorsAndPositions;
  }

  componentDidUpdate() {
    let readyNotes = new Set(Object.keys(this.owner.state.noteSizes));
    let readyAnchors = new Set(Object.keys(this.owner.state.noteAnchorPositions));
    let missingNotes = new Set([...readyAnchors].filter(x => !readyNotes.has(x)));
    let missingAnchors = new Set([...readyNotes].filter(x => !readyAnchors.has(x)));
    if (missingNotes.size || missingAnchors.size || this.owner.state.notesHeaderRect == null) {
      missingNotes.size && console.log("Waiting on notes: ", missingNotes);
      missingAnchors.size && console.log("Waiting on anchors: ", missingAnchors);
      this.owner.state.notesHeaderRect == null && console.log("Waiting on notes header position.");
    } else {
      const newNoteColorsAndPositions = this.calculateNoteColorsAndPositions(this.owner.state.notesHeaderRect, this.owner.state.noteAnchorPositions, this.owner.state.noteSizes);
      if (JSON.stringify(this.owner.state.noteColorsAndPositions) != JSON.stringify(newNoteColorsAndPositions)) {
        this.owner.setState((state, props) => {
          state.noteColorsAndPositions = newNoteColorsAndPositions;
          return state;
        });
      }
    }
  }
}

export { Note, NoteAnchor, NotesHeader, NoteManager };
