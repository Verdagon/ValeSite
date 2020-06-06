import React from 'react';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import {Link} from 'react-router-dom';
import './Tutorial.css';
import './Reference.css';
import ReferenceTOC from './ReferenceTOC.jsx';
import Snippet from '../Snippet.jsx';

const cssns = (classes) => "c-ref-intro m-reference m-tutorial " + (classes || "");

function incode(code, suffix) {
  if (suffix) {
    return <span><span className={cssns("inline-code")} style={{paddingRight: 0}}>{code}</span>{suffix}</span>
  } else {
    return <span className={cssns("inline-code")}>{code}</span>
  }
}

class RefStructs extends React.Component {
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

                <h1 className={cssns("noline")}>Structs</h1>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <p className={cssns("cozy")}>
                      A basic {incode("Spaceship")} struct, with a couple members.
                    </p>
                    <p className={cssns("cozy")}>
                      We can construct it using its <b>constructor</b> function, which has the same name and was automatically generated.
                    </p>
                    <p className={cssns("cozy")}>
                      All structs are <b>mutable</b> by default, more on that in the Mutability section below.
                    </p>
                  </div>
                  <div className={cssns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  numWings Int;
}

fn main() {
  ship = Spaceship("Serenity", 2);
  println(ship.name);
}
*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                    <div className={cssns("output")}>
{`Serenity`}
                    </div>
                  </div>
                </div>

                <h1 className={cssns("noline")}>Constructors</h1>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      We can specify a custom constructor for our struct.
                    </div>

                    <div className={cssns("content cozy")}>
                      We just need to give it the same name as the struct. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="construct"/>
                    </div>

                  </div>
                  <div className={cssns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  numWings Int;
}
fn Spaceship() {
  Spaceship("Serenity", 2)
}

fn main() {
  ship = Spaceship();
  println(ship.name);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">Spaceship</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>()</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <h1 className={cssns("noline")}>Ownership</h1>

                <div className={cssns("content cozy")}>
                  Every mutable struct has one <b>owning</b> reference.
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      When we create a struct, we get the owning reference to it. When we let go of the owning reference, we automatically call its <b>destructor</b> function, which frees the object. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="ownership"/>
                    </div>

                    <div className={cssns("content cozy")}>
                      In this example, the {incode("ship")} owning reference goes away at the end of {incode("main")}, which deallocates the Spaceship.
                    </div>

                  </div>
                  <div className={cssns("half")}>
                    <Snippet>
{/*
fn main() {
  ship = Spaceship("Serenity", 2);
  // ship is an owning reference

  println(ship.name);

  // destructor implicitly called here
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Comment">// ship is an owning reference</span><br /><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br /><br />  <span class="Comment">// destructor implicitly called here</span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <h1 className={cssns("noline")}>Destructors</h1>

                <div className={cssns("content splitter cozy")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      Every mutable struct has a <b>destructor</b>, which deallocates the object. Vale automatically defines one for each struct, but we can instead specify our own destructor.
                    </div>

                    <div className={cssns("content cozy")}>
                      Two rules: it must be called {incode("destructor")}, and the owning reference must be <b>destructured</b> inside the destructor. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="destructure"/>
                    </div>

                    <div className={cssns("content cozy")}>
                      A custom destructor could:
                    </div>
                    <div className={cssns("content cozy")}>
                      <ul style={{marginBottom: 0}}>
                        <li>Remove this object from an observers list.</li>
                        <li>Commit a transaction.</li>
                        <li>Inform other objects of this object's destruction.</li>
                      </ul>
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  numWings Int;
}
fn destructor(ship Spaceship) {
  println("Destroying!");

  // destructure to deallocate
  (name, numWings) = ship;
}

fn main() {
  ship = Spaceship();
  println(ship.name);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">destructor</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span> <span class="Typ">Spaceship</span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Str">"Destroying!"</span>)</span>;<br />  <br />  <span class="Comment">// destructure to deallocate</span><br />  <span class="Let"><span class="Pat"><span class="Destructure">(<span class="Pat"><span class="Capture"><span class="CaptureName">name</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">numWings</span></span></span>)</span></span> = <span class="Lookup">ship</span>;</span><span class="W"></span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>()</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={cssns("output")}>
{`Serenity
Destroying!`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content")}>
                  Rule of thumb: if something <i>must</i> happen at some point in the future, put it in a destructor. Vale will make sure that it's not forgotten.
                </div>

                <h1 className={cssns("noline")}>Mutability</h1>

                <div className={cssns("content cozy")}>
                  By default, structs are <b>mutable</b>. We can make <b>immutable</b> structs with the {incode("imm")} keyword.
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>

                    <div className={cssns("content cozy")}>
                      After construction, an immutable struct cannot be changed at all.
                    </div>

                    <div className={cssns("content cozy")}>
                      Because of that, we don't need the normal ownership rules; every reference shares the object, like Java or Python. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="refcounting"/>
                    </div>

                    <div className={cssns("content cozy")}>
                      Vale also automatically derives the functions {incode("println")}, {incode("Str")}, {incode("hash")}, {incode("==")}, and more.
                    </div>

                    <div className={cssns("content cozy")}>
                      Immutable structs cannot have destructors. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="shareddestructor"/>
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <Snippet>
{/*
struct Spaceship imm {
  name Str;
  numWings Int;
}

fn main() {
  ship = Spaceship("Serenity", 2);
  println(ship);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> imm <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Lookup">ship</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={cssns("output")}>
{`Spaceship("Serenity", 2)`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/ref/references">References</a>
                </div>

              </div>

            </div>

            <div className={cssns("margin")}>

              <div className={cssns("toc-container")}>
                <ReferenceTOC page="structs"/>
                <div className={cssns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="ownership">
                Ownership is also found in C++ ({incode("unique_ptr")}), Rust, and Cyclone.
                <div style={{marginTop: "8px"}}>
                  C also has "conceptual" ownership, in that we must track ownership without the language's help, to know when to {incode("free")} an object.
                </div>
                <div style={{marginTop: "8px"}}>
                  Even garbage collected languages like Java and Python often have conceptual ownership, which when violated, cause memory leaks and other interesting bugs.
                </div>
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="destructure">
                When we "destructure", we deallocate the object and move all of its previous members into locals, at the same time. See <Link to="/ref/patterns">Pattern Matching</Link> for how destructuring ensures memory safety and fits into the rest of the language.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="construct">
                Inside the constructor, we must call either another constructor or {incode("_construct<T>")}.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="refcounting">
                Small immutable structs (32b or less) are copied and passed by-value. Larger objects use <b>LWRC</b> (light-weight reference counting) to free themselves.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="shareddestructor">
                See <Link to="/blog/shareddestructors">Shared Destructibles</Link> for the reasoning behind this.
              </Note>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default RefStructs;
