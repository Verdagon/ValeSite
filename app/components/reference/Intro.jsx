import React from 'react';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import {Link} from 'react-router-dom';
// import ss1svg from './superstructures1.svg';
// import ss2svg from './superstructures2.svg';
import './Tutorial.css';
import './Reference.css';
import ReferenceTOC from './ReferenceTOC.jsx';

const cssns = (classes) => "c-ref-intro m-reference m-tutorial " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class RefIntro extends React.Component {
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

                <h1 className={cssns("noline")}>Vale Introduction</h1>
                <div className={cssns("content cozy")}>
                  Welcome to Vale! Vale is a fast, safe, and easy programming language. This introduction will show how to write a program in Vale.
                </div>
                <div className={cssns("content cozy")}>
                  This tutorial assumes that you are familiar with basic programming concepts, and at least one of C, Python, or Java.
                </div>
                <div className={cssns("content cozy")}>
                  Vale is still "in alpha", which means it's a preview; you can write programs in it, but some of the features that make it easy aren't yet available.
                </div>
                <div className={cssns("content cozy")}>
                  To get started, download Vale from the <a href="/downloads">downloads page</a>!
                </div>

                <a name="helloworld"></a>
                <h3 className={cssns()}>Hello world!</h3>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <p className={cssns("cozy")}>Run this code:</p>

                    <div className={cssns("code")}>
{`fn main() {
  println("Hello world!");
}`}
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <p className={cssns("cozy")}>And you'll see this output:</p>

                    <div className={cssns("output")}>
{`Hello world!


`}
                    </div>
                  </div>
                </div>

                <a name="locals"></a>
                <h3 className={cssns()}>Locals</h3>

                <div className={cssns("content cozy")}>
                  We can make a local variable with the {incode("=")} symbol.
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  x = "world!";
  println("Hello " + x);
}`}
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("output")}>
{`Hello world!



`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content cozy")}>
                  By default, a local is <b>final</b>, and a final local cannot be changed after it's made.
                </div>

                <div className={cssns("content cozy")}>
                  We can make a <b>varying</b> local with the {incode("!")} symbol, and change it with the {incode("mut")} keyword:
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  x! = "world!";
  mut x = "Antarctica!";
  println("Hello " + x);
}`}
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("output")}>
{`Hello Antarctica!




`}
                    </div>
                  </div>
                </div>

                <a name="statictyping"></a>
                <h3 className={cssns()}>Statical Typing & Inference</h3>

                <div className={cssns("content cozy")}>
                  Vale is a <a href="https://stackoverflow.com/questions/1517582/what-is-the-difference-between-statically-typed-and-dynamically-typed-languages">statically typed</a> language, which means the type of every local and member is known at compile-time.
                </div>

                <div className={cssns("content cozy")}>
                  In the above example, {incode("a")} is a {incode("Str")}. We can even specify it after the local's name...
                </div>

                <div className={cssns("content code cozy")}>
{`x Str = "world!";`}
                </div>

                <div className={cssns("content cozy")}>
                  ...though we usually leave it out, because Vale uses type inference to figure out the type of {incode("x")} for us.
                </div>

                <a name="arrays"></a>
                <h3 className={cssns()}>Arrays & Lists</h3>

                <div className={cssns("content cozy")}>
                  One can make an array in Vale with square brackets, and can access them with the dot operator, like so:
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  arr = [4, 5, 6];
  println("Babylon " + arr[1]);
}`}
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("output")}>
{`Babylon 5



`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content cozy")}>
                  In other languages, each element in an array must be the same type. Some languages offer a separate syntax for creating "tuples" which can't be indexed but whose elements can have different types.
                </div>

                <div className={cssns("content cozy")}>
                  Vale doesn't have this restriction; arrays and tuples are the same thing. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="variantindexing"/>
                </div>

                <a name="arrays"></a>
                <h3 className={cssns()}>Loops</h3>

                <div className={cssns("content cozy")}>
                  We can loop with the {incode("each")} statement: <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="each"/>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  arr = ["Earth", "Wind", "Fire"];
  each arr (x){
    println(x);
  }
}`}
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("output")}>
{`Earth
Wind
Fire



`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content cozy")}>
                  We can also get the index of the current iteration with the {incode("eachI")} statement
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  arr = ["Earth", "Wind", "Fire"];
  eachI arr (i, x){
    println(i + ": " + x);
  }
}`}
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("output")}>
{`0: Earth
1: Wind
2: Fire



`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/ref/functions">Functions</a>
                </div>

              </div>

            </div>

            <div className={cssns("margin")}>

              <div className={cssns("toc-container")}>
                <ReferenceTOC page="intro"/>
                <div className={cssns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="each">
                The {incode("each")} statement is syntactic sugar for the {incode("each")} method; {incode("each arr (x){ println(x); }")} is equivalent to {incode("arr.each((x){ println(x); })")}
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="variantindexing">
                Vale makes this possible with <a href="#">variant indexing</a>.
              </Note>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default RefIntro;
