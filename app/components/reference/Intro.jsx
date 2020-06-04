import React from 'react';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import {Link} from 'react-router-dom';
import './Tutorial.css';
import './Reference.css';
import ReferenceTOC from './ReferenceTOC.jsx';

const cssns = (classes) => "c-ref-intro m-reference m-tutorial " + (classes || "");

function incode(code, suffix) {
  if (suffix) {
    return <span><span className={cssns("inline-code")} style={{paddingRight: 0}}>{code}</span>{suffix}</span>
  } else {
    return <span className={cssns("inline-code")}>{code}</span>
  }
}

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
                    <p className={cssns("cozy")}>Put the code to the right into a file named {incode("hello.vale")}, and then run {incode("vale run hello.vale")} to see it produce the output in the gray box. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="running"/></p>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  println("Hello world!");
}`}
                    </div>
                    <div className={cssns("output")}>
{`Hello world!`}
                    </div>
                  </div>
                </div>

                <a name="locals"></a>
                <h3 className={cssns()}>Locals</h3>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      We can make a local variable with the {incode("=")} symbol.
                    </div>
                    <div className={cssns("content cozy")}>
                      By default, a local is <b>final</b>, and a final local cannot be changed after it's made.
                    </div>

                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  x = "world!";
  println("Hello " + x);
}`}
                    </div>
                    <div className={cssns("output")}>
{`Hello world!`}
                    </div>
                  </div>
                </div>



                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      We can make a <b>varying</b> local with the {incode("!")} symbol, and change it with the {incode("mut")} keyword.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  x! = "world!";
  mut x = "Antarctica!";
  println("Hello " + x);
}`}
                    </div>
                    <div className={cssns("output")}>
{`Hello Antarctica!`}
                    </div>
                  </div>
                </div>

                <a name="statictyping"></a>
                <h3 className={cssns()}>Static Typing & Inference</h3>

                <div className={cssns("content cozy")}>
                  Vale is a <a href="https://stackoverflow.com/questions/1517582/what-is-the-difference-between-statically-typed-and-dynamically-typed-languages">statically typed</a> language, which means the type of every local and member is known at compile-time.
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                  In the above example, {incode("a")} is a {incode("Str")}. We can even specify it after the local's name.
                    </div>
                    <div className={cssns("content cozy")}>
                  ...though we usually leave it out, because Vale uses type inference to figure out the type of {incode("x")} for us.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  x Str = "world!";
  println("Hello " + x);
}`}
                    </div>
                    <div className={cssns("output")}>
{`Hello world!`}
                    </div>
                  </div>
                </div>


                <a name="functions"></a>
                <h3 className={cssns()}>Functions</h3>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      Here we have a simple function that {incode("ret", "urns")} the argument plus two.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn add2(x Int) Int {
  ret x + 2;
}
fn main() {
  println("Half-Life " + add2(1));
}`}
                    </div>
                    <div className={cssns("output")}>
{`Half-Life 3`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      We can leave off the {incode("Int")} return type, and it will be inferred from what type we give to the {incode("ret")}.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn add2(x Int) {
  ret x + 2;
}`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      If it's only one line, we can leave off the {incode("ret")} and the semicolon.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn add2(x Int) { x + 2 }`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      We can also make a <b>lambda</b>, a function inside another one. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="seetuplelambda"/>
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  add2 = (x Int){ x + 2 };
  println("Half-Life " + add2(1));
}`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      We can leave the type off of a lambda's parameter, to make it shorter. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="genericlambda"/>
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  add2 = (x){ x + 2 };
  println("Half-Life " + add2(1));
}`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      We can shorten lambdas with the <b>almighty underscore</b>, which declares and immediately uses an implicit parameter.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  add2 = { _ + 2 };
  println("Half-Life " + add2(1));
}`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      In Vale, functions and methods are the same thing <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="ufcs"/>, so these two calls are exactly equivalent.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`s = "Hail Hydra!".split(" ");
s = split("Hail Hydra!", "");`}
                    </div>
                  </div>
                </div>

                <a name="tuples"></a>
                <h3 className={cssns()}>Tuples</h3>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      A tuple is a simple struct, whose members are named 0, 1, 2, etc.
                    </div>

                    <div className={cssns("content cozy")}>
                      We can make a tuple in Vale with square brackets (like&nbsp;{incode("[5, true, \"V\"]")}), and can access them with either a dot (like&nbsp;{incode("arr.0")}) or square brackets (like&nbsp;{incode("arr[1 + 1]")}).
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  arr = [5, true, "V"];
  println("Babylon " + arr.0);
  println("Saturn " + arr[1 + 1]);`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="variantindexing"/>{`
}`}
                    </div>
                    <div className={cssns("output")}>
{`Babylon 5
Saturn V`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      We can also make a tuple by multiplying a constant integer <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="constantint"/> with a function.
                    </div>
                    <div className={cssns("content cozy")}>
                      The integer determines how many elements will be in the tuple. The function takes the index, and returns the value that should be at that index.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn add2(x Int) { x + 2 }
fn main() {
  arr = 3 * add2;`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="ntupletype"/>{`
  println(arr);
}`}
                    </div>
                    <div className={cssns("output")}>
{`[2, 3, 4]`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      This is often used with lambdas.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  arr = 3 * {_ + 2};
  println(arr);
}`}
                    </div>
                    <div className={cssns("output")}>
{`[2, 3, 4]`}
                    </div>
                  </div>
                </div>




                <a name="arrays"></a>
                <h3 className={cssns()}>Arrays</h3>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      We can only make a tuple if we know the size at compile-time. If we don't know, then we must use an <b>array</b>.
                    </div>
                    <div className={cssns("content cozy")}>
                      We can make an array with the {incode("Array")} function.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  n = inputInt();`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="inputInt"/>{`
  arr = Array(n, {_ * 5});`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="arraytype"/>{`
  println(arr);
}`}
                    </div>
                    <div className={cssns("input")}>
{`4`}
                    </div>
                    <div className={cssns("output")}>
{`[0, 5, 10, 15]`}
                    </div>
                  </div>
                </div>

                <a name="lists"></a>
                <h3 className={cssns()}>Lists</h3>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content cozy")}>
                      Arrays can't be resized at run-time. Lists can! <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="arraylist"/>
                    </div>
                    <div className={cssns("content cozy")}>
                      We can make one with the {incode("List")} function.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  l = List<Int>();
  l.add(1);
  l.add(3);
  l.add(7);
  println(l);
}`}
                    </div>
                    <div className={cssns("output")}>
{`List(1, 3, 7)`}
                    </div>
                  </div>
                </div>

                <a name="loops"></a>
                <h3 className={cssns()}>Loops</h3>

                <div className={cssns("content cozy")}>
                  We can loop with the {incode("each")} statement: <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="each"/>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  arr = ["Storm", "Earth", "Fire"];
  each arr (x){
    println(x);
  }
}`}
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("output")}>
{`Storm
Earth
Fire



`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content cozy")}>
                  We can also get the index of the current iteration with the {incode("eachI")} statement.
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn main() {
  arr = ["Storm", "Earth", "Fire"];
  eachI arr (i, x){
    println(i + ": " + x);
  }
}`}
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("output")}>
{`0: Storm
1: Earth
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

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="running">
                You can also make an executable with {incode("vale build hello.vale")}, which will produce an executable named {incode("hello")} (or {incode("hello.exe")} on windows). You can specify the executable's name with the {incode("-o")} flag.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="each">
                The {incode("each")} statement is syntactic sugar for the {incode("each")} method:
                <div>{incode("each arr (x){ println(x); }")}</div>
                <div>is equivalent to</div>
                <div>{incode("arr.each((x){ println(x); })")}</div>
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="variantindexing">
                Most language can't index into tuples, but Vale makes it possible with <a href="#">variant indexing</a>. Discounting optimizations, indexing this struct gives a variant {incode("(Int|Bool|Str)")}, with a {incode("+")} function that calls the appropriate actual {incode("+")} depending on the run-time type ({incode("Int")} vs {incode("Bool")} vs {incode("Str")}).
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="constantint">
                A "constant integer" is an integer known at compile time.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="ntupletype">
                The type of {incode("arr")} is {incode("[3 * Int]")}.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="seetuplelambda">
                See the Tuples section below for an example of how lambdas are super useful.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="arraylist">
                Vale's lists are like C#'s {incode("List")}, Java's {incode("ArrayList")} or C++'s {incode("vector")}; it's backed by an array, not a linked list.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="inputInt">
                {incode("inputInt")} reads an integer from the user's keyboard. In this example, the user is entering 4.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="arraytype">
                The type of {incode("arr")} here is {incode("Array<Int>")}.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="ufcs">
                This is known as Universal Function Call Syntax. This makes method chaining nicer, for example
                <div>{incode("a.f(3).g(true).h(\"Yendor\")")}</div>
                as opposed to
                <div>{incode("h(g(f(a, 3), true), \"Yendor\")")}.</div>
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="genericlambda">
                Taking out the parameter's type makes this a "generic" lambda. See <Link to="/ref/generics">generics</Link> for more.
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
