import React from 'react';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import {Link} from 'react-router-dom';
import './Tutorial.css';
import './Reference.css';
import ReferenceTOC from './ReferenceTOC.jsx';

const cssns = (classes) => "c-ref-ownership m-tutorial " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class RefOwnership extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.noteManager = new NoteManager(this);

    this.updateNoteAnchorPosition = (...args) => this.noteManager.updateNoteAnchorPosition(...args);
    this.updateNoteSize = (...args) => this.noteManager.updateNoteSize(...args);
    this.updateNotesHeaderRect = (...args) => this.noteManager.updateNotesHeaderRect(...args);
  }

  componentDidUpdate(prevProps, prevState) {
    this.noteManager.componentDidUpdate();
  }

  render() {
    return (
      <div className={cssns("root")}>
        <Header/>

        <div className={cssns("page")}>
          <div className={cssns("columns")}>

            <div className={cssns("left")}>

              <div className={cssns("main")}>

                <h1 className={cssns("noline")}>Superstructures Guide: References</h1>

              </div>

            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default RefOwnership;
