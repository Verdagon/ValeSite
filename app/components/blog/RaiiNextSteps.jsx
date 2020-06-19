import React from 'react';
import BlogHeader from './BlogHeader.jsx';
import Footer from '../Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import {Link} from 'react-router-dom';
import '../Tripage.css';
import './Blog.css'
import Snippet from '../Snippet.jsx';
import claspsvg from './clasp.svg';

const ns = (classes) => "c-blog m-tripage " + (classes || "");

function incode(code, suffix) {
  if (suffix) {
    return <span><span className={ns("inline-code")} style={{paddingRight: 0}}>{code}</span>{suffix}</span>
  } else {
    return <span className={ns("inline-code")}>{code}</span>
  }
}

class BlogRaiiNextSteps extends React.Component {
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

  componentDidMount() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  noteAnchor(anchorName) {
    return <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name={anchorName}/>;
  }

  render() {
    return (
      <div className={ns("root")}>
        <BlogHeader small={true} />

        <div className={ns("page")}>
          <div className={ns("columns")}>

            <div className={ns("left")}>

              <div className={ns("main")}>

                <h1 className={ns("noline cozy")}>The Next Steps for RAII</h1>
                <div className={ns("subtitle content")}>How constraint references enable memory safety, much more powerful destructors, and mercenary raccoons!</div>

                <div className={ns("content")}>
                  While diving the depths of single ownership, we discovered a hidden gem from the most unlikely of places. With it, we were able to reassemble C++ into something that really unleashes the full potential of RAII.
                </div>
                <div className={ns("content cozy")}>
                  Recall these ancient mantras, known to any C++ developer:
                </div>
                <ul className={ns("content cozy")}>
                  <li className={ns()}>"Who destroyed that object I was pointing at?"</li>
                  <li className={ns()}>"Blasted segfaults!"</li>
                  <li className={ns()}>"We need to influence the destructor, but destructors take no parameters!"</li>
                  <li className={ns()}>"Who's still holding a {incode("shared_ptr")} to my object? It should be dead!"</li>
                  <li className={ns()}>"I can't throw from a destructor, or have multiple exceptions in flight?"</li>
                  <li className={ns()}>"Destructors can't return a status, either?!"</li>
                </ul>
                <div className={ns("content")}>
                  In this journey, we discovered language solutions for <i>all</i> of these.
                </div>

                <div className={ns("content cozy")}>
                  This article is about C++'s RAII and single ownership, and how we can take it even further. {this.noteAnchor("642a")}
                </div>

                <div className={ns("content cozy")}>
                  C++'s syntax often makes single ownership look more difficult than it is, so we also use Vale to illustrate how easy and powerful single ownership can be. {this.noteAnchor("alpha")}
                </div>


                <a name="singleownership"></a>
                <h3 className={ns()}>Single Ownership</h3>

                <div className={ns("content cozy")}>
                  Our journey started in 2011, when C++ introduced {incode("unique_ptr")} to the world, and changed our lives forever.
                </div>
                <div className={ns("content cozy")}>
                  In one fell swoop, it basically single-handedly solved memory leaks. Single-ownership is one of those notions that, once it clicked, felt <i>right</i>. It was probably because this is how we already think: in C and C++, we would implicitly track ownership, to know whose responsibility it was to free an object. Even in GC'd languages, we would implicitly track who's responsible for calling {incode(".dispose()")}.
                </div>
                <div className={ns("content cozy")}>
                  We slowly discovered that we could use RAII for things other than freeing memory! We could:
                </div>
                <ul className={ns("content cozy")}>
                  <li className={ns()}>Close a file stream.</li>
                  <li className={ns()}>Close a mutex's lock.</li>
                  <li className={ns()}>Roll-back a transaction if it wasn't already committed.</li>
                  <li className={ns()}>Remove self from an observers list.</li>
                </ul>
                <div className={ns("content cozy")}>
                  Then it clicked: RAII wasn't just way to track who should free an object, and these weren't just neat tricks. RAII is much more, it's a way to <b>track responsibility</b>. {this.noteAnchor("sovsraii")}
                </div>
                <div className={ns("content cozy")}>
                  It's a promise that's enforced by the compiler. Instead of just "The compiler will make sure we free this," RAII is "The compiler will make sure that we XYZ" where XYZ is whatever we want. {this.noteAnchor("whatever")}
                </div>


                <a name="singleownership"></a>
                <h3 className={ns()}>Safe Handling of Aliases</h3>

                <div className={ns("content cozy")}>
                  Single ownership in modern C++ uses owning {incode("unique_ptr<T>", "s")}, and non-owning {incode("T*")} raw pointers.
                </div>
                <div className={ns("content cozy")}>
                  Where {incode("unique_ptr")} is the sheriff, the raw pointer is the infamous mercenary who rides into town and makes everyone mighty nervous. When things go well, he's useful... but if things get dicey, he <b>might just decide to dereference that pointer</b> and cause all sorts of chaos.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We discovered that the sheriff and the mercenaries <i>can</i> work together, with some solid rules. We discovered patterns that worked pretty well.
                    </div>
                    <div className={ns("content cozy")}>
                      For example, we'd often have a BigClass, that owns a bunch of smaller classes ("subcomponents"), where each subcomponent has raw pointers to subcomponents made before it.
                    </div>
                    <div className={ns("content cozy")}>
                     C++'s initializer list even enforces that we don't refer to a not-yet-initialized member.
                    </div>
                    <div className={ns("content cozy")}>
                      The big class constructs these in the right order, and destructs them in the correct reverse order.
                    </div>
                    <div className={ns("content cozy")}>
                      With this, there won't be any unfortunate seg-faulting in our small town.
                    </div>
                    <div className={ns("content cozy")}>
                      The world discovered many patterns like this for handling raw pointers. {this.noteAnchor("safehandling")}
                    </div>
                  </div>
                  <div className={ns("half")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++</div><code className="cpp">
{`class BigClass {
public:
  unique_ptr<A> a;
  unique_ptr<B> b;
  unique_ptr<C> c;
  unique_ptr<D> d;
  BigClass() :
    a(make_unique<A>()),
    b(make_unique<B>(a.get())),
    c(make_unique<C>(a.get())),
    d(make_unique<D>(a.get(), c.get()))
  { }
};
`}</code></pre>

                    <Snippet header="Vale">
{/*
struct BigClass {
  a A; (nounique)
  b B;
  c C;
  d D;
  fn BigClass(this) {
    this.a = A(); (nomakeunique)
    this.b = B(&a); (noget)
    this.c = C(&a);
    this.d = D(&a, &c);
  }
}
*/}

<span className="Prog"><span className="Struct">struct <span className="StructName">BigClass</span> <span className="Membs">&#123;<br />  <span className="Memb"><span className="MembName">a</span> <span className="Typ">A</span>;</span> {this.noteAnchor("nounique")}<br />  <span className="Memb"><span className="MembName">b</span> <span className="Typ">B</span>;</span><br />  <span className="Memb"><span className="MembName">c</span> <span className="Typ">C</span>;</span><br />  <span className="Memb"><span className="MembName">d</span> <span className="Typ">D</span>;</span><br />  <span className="Fn">fn <span className="FnName">BigClass</span><span className="Params">(<span className="Pat"><span className="Capture"><span className="CaptureName">this</span></span></span>)</span> <span className="Block">&#123;<br />    <span className="Let"><span className="Pat"><span className="Capture"><span className="CaptureName">this.a</span></span></span> = <span className="Call"><span className="CallLookup">A</span>()</span>;</span> {this.noteAnchor("nomakeunique")}<br />    <span className="Let"><span className="Pat"><span className="Capture"><span className="CaptureName">this.b</span></span></span> = <span className="Call"><span className="CallLookup">B</span>(<span className="Lend">&<span className="Lookup">a</span></span>)</span>;</span> {this.noteAnchor("noget")}<br />    <span className="Let"><span className="Pat"><span className="Capture"><span className="CaptureName">this.c</span></span></span> = <span className="Call"><span className="CallLookup">C</span>(<span className="Lend">&<span className="Lookup">a</span></span>)</span>;</span><br />    <span className="Let"><span className="Pat"><span className="Capture"><span className="CaptureName">this.d</span></span></span> = <span className="Call"><span className="CallLookup">D</span>(<span className="Lend">&<span className="Lookup">a</span></span>, <span className="Lend">&<span className="Lookup">c</span></span>)</span>;</span><span className="W"></span><br />  &#125;</span></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>



                <div className={ns("content cozy")}>
                  Interestingly, in this picture, <b>there are never any dangling pointers</b>. It's even better than never <b>dereferencing</b> any dangling pointers: rather the pointers never <b>become</b> dangling to begin with!
                </div>
                <div className={ns("content cozy")}>
                  Indeed, every reference to an object is destroyed before the object itself is.
                </div>



                <a name="singleownership"></a>
                <h5 className={ns()}>Constraint Reference</h5>

                <div className={ns("content cozy")}>
                  This kind of "non-outliving pointer" is everywhere. Some examples:
                </div>
                <ul className={ns("content cozy")}>
                  <li className={ns()}>A PhoneCall points to two Accounts. The PhoneCall shouldn't outlive the Accounts; we should delete the PhoneCall before deleting either Account.</li>
                  <li className={ns()}>In a graph, an edge points to its nodes. The edge shouldn't outlive the nodes, we should delete the edge before deleting any of its nodes.</li>
                  <li className={ns()}>A HandShake should only exist while the two Hands exist.</li>
                </ul>
                <div className={ns("content cozy")}>
                  This pointer, which shouldn't outlive what it's pointing to, may seem oddly familiar to many of us: SQL has them! {this.noteAnchor("604")}
                </div>
                <div className={ns("content cozy")}>
                 In SQL, a foreign key constraint is a reference that cannot outlive the object (otherwise, it aborts the current transaction).
                </div>
                <div className={ns("content cozy")}>
                  For that reason, we call this kind of pointer a <b>constraint reference</b>.  {this.noteAnchor("950")}
                </div>
                <div className={ns("content cozy")}>
                  C++ can have constraint references. {this.noteAnchor("engines")} We just wrap {incode("shared_ptr")} in a class called {incode("owning_ptr")} which uses move semantics like {incode("unique_ptr")} and checks the ref count to assert {this.noteAnchor("544")} that it's the last pointer to the object.
                </div>

                <div className={ns("content cozy")}>
                  <b>We are now memory safe!</b> In this approach, pointers don't even <b>become</b> dangling, so they definitely can't be dereferenced.
                </div>
                <div className={ns("content cozy")}>
                  With raw pointers, if someone deletes the object your raw pointer is pointing to, you won't see the problem until much later, when you try and dereference it. Constraint refs answer the question "who destroyed that object I'm pointing to?" much sooner; {this.noteAnchor("735")} we get a nice debugger pause or stack trace when we accidentally destroy what we're pointing at.
                </div>

                <a name="singleownership"></a>
                <h5 className={ns()}>Constraint Behavior Modes</h5>

                <div className={ns("content cozy")}>
                  The best part: constraint references can be <b>zero cost</b>! We make another wrapper around {incode("shared_ptr")} called {incode("constraint_ptr")}. In release mode, it would compile to a raw pointer instead, and our {incode("owning_ptr")} would compile to a {incode("unique_ptr")}. In Vale, these are called <b>Normal Mode</b> and <b>Fast Mode</b> respectively.
                </div>
                <div className={ns("content cozy")}>
                  Developing and testing with constraint references drastically reduces the chance of a crash or vulnerability in production. It's not perfect, but it lets us alias {this.noteAnchor("alias")} with much more safety.
                </div>
                <div className={ns("content cozy")}>
                  Some applications will prefer <b>Resilient Mode</b> in production, where instead of halting the program when we violate a constraint, we halt when we actually try to dereference it. This is similar to running a C++ program with Valgrind or ASan.
                </div>
                <div className={ns("content cozy")}>
                  Vale's region isolation allows Normal Mode and Resilient Mode to use non-atomic ref counting, which is much faster than {incode("shared_ptr", "'s")} atomic ref-counting. Ref-counting might be slow in C++, but it's <b>very</b> fast in Vale.
                </div>


                <a name="singleownership"></a>
                <h5 className={ns()}>Weak Reference</h5>

                <div className={ns("content cozy")}>
                  As we saw, a raw pointer is sometimes a constraint reference.
                </div>
                <div className={ns("content cozy")}>
                  But, like two raccoons in a trench coat, the raw pointer can sometimes be something else: a pointer that <i>should</i> be able to outlive what it points to, as long as we don't dereference it. This is a <b>weak reference</b>.
                </div>
                <div className={ns("content cozy")}>
                  For example, a missile launched by a spaceship should keep flying, even if its targeted asteroid disappears.
                </div>


                <a name="singleownership"></a>
                <h3 className={ns()}>Emerging Patterns</h3>


                <div className={ns("content cozy")}>
                  We coded in this style for years, to see how far constraint refs could go.
                </div>
                <div className={ns("content cozy")}>
                  Like hidden spirits emerging from a forest, some patterns started revealing themselves to us.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Imagine we have a Network class, shown here.
                    </div>
                    <div className={ns("content cozy")}>
                      {incode("Thing::doRequest")} would say {incode("network->request(\"vale.dev\", this);")}
                    </div>
                    <div className={ns("content cozy")}>
                      But wait, danger lurks!
                    </div>
                    <div className={ns("content cozy")}>
                      If {incode("this")} is destroyed before the response comes back, then {incode("Network")} would call into a dangling pointer and crash!
                    </div>

                    <div className={ns("content cozy")}>
                      We <i>almost</i> concluded that we needed some shared ownership acrobatics for memory safety here. {this.noteAnchor("512")}
                    </div>

                  </div>
                  <div className={ns("half")}>

<pre className="cppSnippet root"><div className="cppSnippet header">C++</div><code className="cpp">
{`class INetworkCallback {
public:
  virtual void handleResponse(
    const std::string& resp) = 0;
  virtual ~INetworkCallback() = default;
};
class Network {
public:
  void request(
    const std::string& url,
    INetworkCallback* callback)
  { ... }
};
`}
</code></pre>

                    <Snippet header="Vale">
{/*
interface INetworkCallback {
  fn handleResponse(&this, resp Str);
  fn drop(this);
}
struct Network {
  fn request(
      &this,
      url Str,
      callback &INetworkCallback)
  { ... }
}

*/}

<span class="Prog"><span class="Interface">interface <span class="StructName">INetworkCallback</span> &#123;<br />  <span class="Fn">fn <span class="FnName">handleResponse</span><span class="Params">(<span class="Pat"><span class="Lend">&</span><span class="Capture"><span class="CaptureName">this</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">resp</span></span> <span class="Typ">Str</span></span>)</span>;</span><br />  <span class="Fn">fn <span class="FnName">drop</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">this</span></span></span>)</span>;</span><br />&#125;</span><br /><span class="Struct">struct <span class="StructName">Network</span> <span class="Membs">&#123;<br />  <span class="Fn">fn <span class="FnName">request</span><span class="Params">(<br />      <span class="Pat"><span class="Lend">&</span><span class="Capture"><span class="CaptureName">this</span></span></span>,<br />      <span class="Pat"><span class="Capture"><span class="CaptureName">url</span></span> <span class="Typ">Str</span></span>,<br />      <span class="Pat"><span class="Capture"><span class="CaptureName">callback</span></span> <span class="Ownership">&<span class="Typ">INetworkCallback</span></span></span>)</span><br />  <span class="Block">&#123; <span class="Lookup">...</span> &#125;</span></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>


                <img style={{float: "right", width: "308px", height: "159px"}} src={claspsvg}/>

                <div className={ns("content cozy")}>
                  Instead, we made two tiny classes, {incode("Request")} and {incode("RequestHandle")}.
                </div>
                <div className={ns("content cozy")}>
                  Each had only a pointer to the other. {incode("Thing")} owned one, {incode("Network")} owned the other.
                </div>
                <div className={ns("content cozy")}>
                  When one was destroyed, it would reach into the other to null out the pointer, thus severing the connection.
                </div>
                <div className={ns("content")}>
                  This pattern of having two mutual constraint references was so common that we gave it a name: the <b>clasp</b> pattern. It obviated a vast swath of our {incode("shared_ptr")} usage.
                </div>


                <div className={ns("content cozy")}>
                  We iterated on it, simplified it, and even made a one-to-many version, which was so useful that we promoted it to its own reference type, the <b>weak reference.</b>
                </div>

                <div className={ns("content cozy")}>
                  Keep in mind, this weak reference works very differently from {incode("weak_ptr")}.
                </div>
                <div className={ns("content cozy")}>
                  When you lock a {incode("weak_ptr")}, you get a {incode("shared_ptr")} which will delay destruction and extend the lifetime of the object if the other {incode("shared_ptr", "s")} disappear.
                </div>
                <div className={ns("content cozy")}>
                  Instead, when you lock a weak reference, you get a constraint reference, which will halt the program if the owning reference disappears.
                </div>


                <a name="singleownership"></a>
                <h3 className={ns()}>Simplification</h3>

                <div className={ns("content cozy")}>
                  In our quest, single ownership unexpectedly solved a major recurring problem.
                </div>
                <div className={ns("content cozy")}>
                  We previously had a system where a {incode("shared_ptr", "'d")} object's destructor would remove it from the display when the last reference to it disappeared. <b>This was a terrible thing.</b> Every month, there would be a fresh bug saying "I hit the delete button, but the thing is still in the view!" and it'd take forever to figure out "who is keeping my object alive?" {this.noteAnchor("519")}
                </div>
                <div className={ns("content cozy")}>
                  The best part was that we <b>knew</b> who the owner should be. We knew the exact line that <i>should have</i> had the last reference... {this.noteAnchor("942")} but apparently, it wasn't. Somewhere, another reference was preventing the destructor call.
                </div>
                <div className={ns("content cozy")}>
                  After switching to owning, constraint, and weak references, this problem evaporated.
                </div>

                <a name="singleownership"></a>
                <h3 className={ns()}>Surprise!</h3>

                <div className={ns("content cozy")}>
                  We were new to this way of thinking, so we expected that maybe a quarter of our references could become constraint refs. We were shocked when we were able to get rid of <i>every single</i> raw pointer and {incode("shared_ptr")}, and make it into either a constraint ref, or occasionally a weak ref. {this.noteAnchor("532")}
                </div>
                <div className={ns("content cozy")}>
                  We didn't know it at the time, but we had found the key to unlock the next steps for RAII.
                </div>


                <a name="singleownership"></a>
                <h3 className={ns()}>Language Implications: Destructor Parameters!</h3>

                <div className={ns("content cozy")}>
                  Unexpectedly, getting rid of shared ownership made destructor parameters possible!
                </div>
                <div className={ns("content cozy")}>
                  Let's back up a step and talk about {incode("shared_ptr")}. Anyone who has a {incode("shared_ptr<X>")} might be the unlucky one to call {incode("X", "s")} destructor. This is why destructors don't have parameters: every time you let go of a {incode("shared_ptr")}, you would have to somehow obtain the right arguments to pass them in to the destructor, somehow. {this.noteAnchor("515")} Owning and constraint references are different: you know exactly who should be calling the destructor.
                </div>
                <div className={ns("content cozy")}>
                  There were other reasons C++ couldn't have destructor parameters, but they all have easy solutions from a language design standpoint:
                </div>
                <ul className={ns("content")}>
                  <li className={ns()}>Exceptions: We need to call an object's destructor automatically when an exception is in flight, where do we get the parameters for that?</li>
                  <ul>
                    <li className={ns()}>We don't use exceptions anyway! In fact, entire companies' style guides prohibit them. Use Result instead.</li>
                  </ul>
                  <li className={ns()}>If we implicitly call the destructor at the end of a block, how do we know what parameters to pass in?</li>
                  <ul>
                    <li className={ns()}>If the destructor requires parameters, don't implicitly call it, and require us to explicitly call its destructor! {this.noteAnchor("247")} {this.noteAnchor("777")}</li>
                  </ul>
                  <li className={ns()}>If we have a {incode("vector<MyObj>")}, how would {incode("~vector()")} know what to pass into {incode("~MyObj()")}?</li>
                  <ul>
                    <li className={ns()}>Destructors can have parameters now, so pass a "consumer" functor {incode("std::function<void(std::unique_ptr<MyObj>)>)")} (or {incode("fn(MyObj)Void")}), and we could give each element to it to destroy.</li>
                  </ul>
                </ul>


                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Since we could have destructor parameters, we could revisit our {incode("Transaction")} class, shown to the right.
                    </div>
                    <div className={ns("content cozy")}>
                      Notice how we have to call {incode("setRollbackMode")} before the destructor.
                    </div>
                    <div className={ns("content")}>
                      We'd forget that all the time!
                    </div>
                    <div className={ns("content cozy")}>
                      However, now that we have destructor parameters, we can get rid of {incode("setRollbackMode")}, get rid of {incode("mode_")}, and use this destructor instead:
                    </div>
                    <div className={ns("content cozy")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++++</div><code className="cpp">
{`
virtual ~Transaction(RollMode mode) {
  if (!committed_) {
    /* use mode to roll back */
  }
}

...

// invoke destructor
~transaction(TUMBLE);
`}
</code></pre>
                    </div>
                  </div>
                  <div className={ns("half")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++</div><code className="cpp">
{`class Transaction {
public:
  ReadResult read(ReadQuery query);

  TransactionResult setRollbackMode(
      RollMode mode) {
    mode_ = mode;
  }

  void commit() {
    ...
    committed_ = true;
  }

  virtual ~Transaction() {
    if (!committed_) {
      /* use mode_ to roll back */
    }
  }

private:
  bool committed_;
  RollMode mode_;
};

...

transaction->setRollbackMode(TUMBLE);
// invoke destructor
transaction = nullptr;
`}
</code></pre>
                  </div>
                </div>


                <a name="singleownership"></a>
                <h3 className={ns()}>Destructor Overloads</h3>


                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Since we no longer need to implicitly call destructors, we can add destructor overloads!
                    </div>
                    <div className={ns("content cozy")}>
                      Notice how the destructors now have names.
                    </div>
                    <div className={ns("content cozy")}>
                      Recall how RAII is where "the compiler will make sure that we XYZ". Here, the compiler will make sure that someone holding a Transaction either calls {incode("commit")} or {incode("rollback")}.
                    </div>
                  </div>
                  <div className={ns("half")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++++</div><code className="cpp">
{`class Transaction {
public:
  ReadResult read(ReadQuery query);

  virtual ~commit() { ... }

  virtual ~rollback(RollMode mode)
  { ... }
};

// To commit:
transaction->~commit();
// To rollback:
transaction->~rollback(TUMBLE);`}
</code></pre>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Our hypothetical C++++ syntax is starting to show some cracks, so lets see this in Vale.
                    </div>
                    <div className={ns("content")}>
                      Here, {incode("commit")} and {incode("rollback")} are just regular methods that take an owning {incode("this")} and happen to free it (with {incode("destruct")}). {this.noteAnchor("1012")}
                    </div>
                    <div className={ns("content cozy")}>
                      (That's all a destructor is, when you think about it.)
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet header="Vale">
{/*
struct Transaction {
  fn read(&this, query ReadQuery)
  ReadResult { ... }

  fn commit(this) { (ownthis)
    ...;
    destruct this;
  }

  fn rollback(this, mode RollMode) {
    ...
    destruct this;
  }
}

fn main() {
// To commit:
transaction.commit();
// To rollback:
transaction.rollback(TUMBLE);
}

*/}

<span class="Prog"><span class="Struct">struct <span class="StructName">Transaction</span> <span class="Membs">&#123;<br />  <span class="Fn">fn <span class="FnName">read</span><span class="Params">(<span class="Pat"><span class="Lend">&</span><span class="Capture"><span class="CaptureName">this</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">query</span></span> <span class="Typ">ReadQuery</span></span>)</span><br />  <span class="Typ">ReadResult</span> <span class="Block">&#123; <span class="Lookup">...</span> &#125;</span></span><br /><br />  <span class="Fn">fn <span class="FnName">commit</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">this</span></span></span>)</span> <span class="Block">&#123;  {this.noteAnchor("ownthis")}<br />    <span class="Lookup">...</span>;<br />    <span class="Call"><span class="CallLookup">destruct</span> <span class="Lookup">this</span></span>;<span class="W"></span><br />  &#125;</span></span><br /><br />  <span class="Fn">fn <span class="FnName">rollback</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">this</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">mode</span></span> <span class="Typ">RollMode</span></span>)</span> <span class="Block">&#123;<br />    <span class="Call"><span class="Lookup">...</span><br />    <span class="CallLookup">destruct</span> <span class="Lookup">this</span></span>;<span class="W"></span><br />  &#125;</span></span><br />&#125;</span></span><br /><br />

<span class="Comment">// To commit:</span><br /><span class="Call"><span class="Lookup">transaction</span>.<span class="CallLookup">commit</span>()</span>;<br /><span class="Comment">// To rollback:</span><br /><span class="Call"><span class="Lookup">transaction</span>.<span class="CallLookup">rollback</span>(<span class="Lookup">TUMBLE</span>)</span>;<span class="W"></span>


</span>

                    </Snippet>
                  </div>
                </div>


                <a name="singleownership"></a>
                <h3 className={ns()}>Destructor Returns</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      A common C++ wish is to be able to return things from destructors.
                    </div>
                    <div className={ns("content cozy")}>
                      However, a {incode("shared_ptr<T>")} would just throw away the {incode("~T()", "'s")} return value anyway. So why even allow one?
                    </div>
                    <div className={ns("content cozy")}>
                      Now that we don't have shared ownership, we can start returning values from destructors.
                    </div>
                  </div>
                  <div className={ns("half")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++++</div><code className="cpp">
{`class Transaction {
public:
  ReadResult read(ReadQuery query);

  virtual void ~commit() { ... }

  virtual RollbackStatus ~rollback(
      RollMode mode) {
    ...;
    return SUCCESS;
  }
};
`}
</code></pre>
                  </div>
                </div>



                <a name="singleownership"></a>
                <h3 className={ns()}>Non-destroying Destructors</h3>

                <div className={ns("content cozy")}>
                  We might want to return a object to a free-list, instead of {incode("free()", "ing")} it.
                </div>
                <div className={ns("content cozy")}>
                  Normally, we would need to use an allocator. But instead, we could take in the free-list as a parameter, and <b>move</b> {incode("this")} into it.
                </div>
                <div className={ns("content cozy")}>
                  This is impossible in C++'s syntax (we don't get to move {incode("this")}), {this.noteAnchor("1000")} so we'll use Vale syntax:
                </div>


                <div className={ns("content cozy")}>
                  <Snippet header="Vale">
{/*struct Transaction {
  fn read(&this, query ReadQuery) ReadResult { ... }

  fn commit(this, list &TransactionList) {
    ...;
    list.reclaim(this); // move this into a different function
  }

  fn rollback(this, list &TransactionList, mode RollMode) RollbackStatus {
    ...;
    list.reclaim(this); // move this into a different function
    ret SUCCESS;
  }
}*/}

<span className="Prog"><span className="Struct">struct <span className="StructName">Transaction</span> <span className="Membs">&#123;<br />  <span className="Fn">fn <span className="FnName">read</span><span className="Params">(<span className="Pat"><span className="Lend">&</span><span className="Capture"><span className="CaptureName">this</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">query</span></span> <span className="Typ">ReadQuery</span></span>)</span> <span className="Typ">ReadResult</span> <span className="Block">&#123; <span className="Lookup">...</span> &#125;</span></span><br /><br />  <span className="Fn">fn <span className="FnName">commit</span><span className="Params">(<span className="Pat"><span className="Capture"><span className="CaptureName">this</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">list</span></span> <span className="Ownership">&<span className="Typ">TransactionList</span></span></span>)</span> <span className="Typ"></span> <span className="Block">&#123;<br />    <span className="Lookup">...</span>;<br />    <span className="Call"><span className="Lookup">list</span>.<span className="CallLookup">reclaim</span>(<span className="Lookup">this</span>)</span>;<span className="W"></span> <span className="Comment">// move this into a different function</span><br />  &#125;</span></span><br /><br />  <span className="Fn">fn <span className="FnName">rollback</span><span className="Params">(<span className="Pat"><span className="Capture"><span className="CaptureName">this</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">list</span></span> <span className="Ownership">&<span className="Typ">TransactionList</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">mode</span></span> <span className="Typ">RollMode</span></span>)</span> <span className="Typ">RollbackStatus</span> <span className="Block">&#123;<br />    <span className="Lookup">...</span>;<br />    <span className="Call"><span className="Lookup">list</span>.<span className="CallLookup">reclaim</span>(<span className="Lookup">this</span>)</span>; <span className="Comment">// move this into a different function</span><br />    <span className="Ret">ret <span className="Lookup">SUCCESS</span>;</span><br />  &#125;</span></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                </div>

                <a name="singleownership"></a>
                <h3 className={ns()}>What even <i>is</i> a destructor?</h3>


                <div className={ns("content cozy")}>
                  By now you've noticed that Destructors can have overloads, take parameters, return values, and even decline to destroy {incode("this")}! There's hardly anything that separates them from regular functions.
                </div>
                <div className={ns("content cozy")}>
                  In fact, in Vale, the whole "destructor" side of the language is built from one small feature:
                </div>
                <div className={ns("content cozy")} style={{padding: "0 16px"}}>
                  <b>If an owning reference goes out of scope, call {incode(".drop()")} on it.</b> If no public {incode(".drop()")} exists, give a compile error. {this.noteAnchor("mustuse")}
                </div>
                <div className={ns("content cozy")}>
                  In one fell swoop, by removing our dependence on {incode("shared_ptr")}, we had taken one of the thorniest corners of C++ and completely simplified it away.
                </div>


                <a name="singleownership"></a>
                <h3 className={ns()}>A Detour Through Rust</h3>

                <div className={ns("content cozy")}>
                  One can't have an article about safety and speed without mentioning Rust!
                </div>
                <div className={ns("content cozy")}>
                  Early in this odyssey, Rust was released, and it told a beautiful story: speed and memory safety, by doing this kind of reference lifetime enforcement at compile-time! The holy grail of memory management.
                </div>

                <div className={ns("content cozy")}>
                  However Rust's compile-time memory safety came at a cost: <b>we could no longer alias freely.</b> Other memory safe languages like Java allow you to have as many non-const references to an object as you want, but Rust can't make it's compile-time guarantees when you have any references (even const ones!) to an object when someone else might have a non-const reference to it.
                </div>

                <div className={ns("content cozy")}>
                  For example: if you have a list of Airports and a list of Planes, a Plane can't have a reference to its source and destination airports; if we did, we wouldn't ever be able to modify or remove any airports (or add them, because Vec's resizing could move the airports). {this.noteAnchor("546b")}
                </div>
                <div className={ns("content cozy")}>
                  But, the plane <i>has</i> to refer to those airports, somehow! There are some workarounds, but they aren't free:
                </div>

                <ul className={ns("content cozy")}>
                  <li className={ns()}>{incode("unsafe")} keyword: discards our safety guarantees. {this.noteAnchor("409")}</li>
                  <li className={ns()}>{incode("Arc")}/{incode("Rc")}:</li>
                  <ul className={ns("content cozy")}>
                    <li className={ns()}>Ref-counting performance overhead.</li>
                    <li className={ns()}>Prevents all our RAII benefits, for the same reason as {incode("shared_ptr")}.</li>
                  </ul>
                  <li className={ns()}>Use a generational index {incode("(i64, i64)")} into a {incode("Vec<(i64, T)>")} {this.noteAnchor("1217")} holding all the objects.</li>
                  <ul className={ns("content cozy")}>
                    <li className={ns()}>Resizing cost (fortunately amortized).</li>
                    <li className={ns()}>An i64 generation per-object.</li>
                    <li className={ns()}>An i64 generation per-reference.</li>
                    <li className={ns()}>The Vec's usual wasted space, which is 1-2x the <i>highest</i> number {this.noteAnchor("206")} of {incode("(i64, T)")} elements we've had in the past.</li>
                    <li className={ns()}>Prevents RAII, because it doesn't destroy the object immediately when the "owning" index disappears. For example, a binary tree here would be a {incode("Vec<(i64, Node)>")}, where each node is owned by the {incode("Vec")}, <b>not by the parent node</b>. Who knows when the Vec would disappear and call {incode("drop")} on the elements. {this.noteAnchor("406")}</li>
                    <li className={ns()}>Requires us to pass the Vec as a parameter to wherever we want to access the object.</li>
                  </ul>
                </ul>

                <div className={ns("content cozy")}>
                  In other words, Rust's compile-time safety guarantee has a runtime cost.
                </div>

                <div className={ns("content")}>
                  And, unless we use {incode("unsafe")}, we don't get our RAII benefits.
                </div>

                <div className={ns("content cozy")}>
                  Let's compare Rust's strategies to the three constraint reference compilation modes: {this.noteAnchor("1046")}
                </div>

                <table className={ns("comparison content cozy")}>
                  <thead>
                    <tr className={ns()}>
                      <th className={ns()}></th>
                      <th className={ns()}>Safe</th>
                      <th className={ns()}>Speed</th>
                      <th className={ns()}>Memory</th>
                      <th className={ns()}>RAII</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={ns()}>
                      <th className={ns()}>C Refs, Normal</th>
                      <td className={ns("good")}>Yes</td>
                      <td className={ns("bad")}>Rc Overhead {this.noteAnchor("548")}</td>
                      <td className={ns("bad")}>8b for all objs {this.noteAnchor("1041")}</td>
                      <td className={ns("good")}>Yes</td>
                    </tr>
                    <tr className={ns()}>
                      <th className={ns()}>C Refs, Resilient</th>
                      <td className={ns("good")}>Yes</td>
                      <td className={ns("bad")}>Rc Overhead</td>
                      <td className={ns("bad")}>8b for all objs</td>
                      <td className={ns("good")}>Yes</td>
                    </tr>
                    <tr className={ns()}>
                      <th className={ns()}>C Refs, Fast</th>
                      <td className={ns("bad")}>No</td>
                      <td className={ns("good")}>Fast</td>
                      <td className={ns("good")}>Free</td>
                      <td className={ns("good")}>Yes</td>
                    </tr>
                    <tr className={ns()}>
                      <th className={ns()}>Borrow&nbsp;w/&nbsp;Unsafe</th>
                      <td className={ns("bad")}>No</td>
                      <td className={ns("good")}>Fast</td>
                      <td className={ns("good")}>Free</td>
                      <td className={ns("good")}>Yes</td>
                    </tr>
                    <tr className={ns()}>
                      <th className={ns()}>Borrow w/ IDs</th>
                      <td className={ns("good")}>Yes</td>
                      <td className={ns("bad")}>Resizing + Lookup Overhead {this.noteAnchor("212")}</td>
                      <td className={ns("bad")}>8b/obj + 8b/ref + 2*MaxSize</td>
                      <td className={ns("bad")}>No</td>
                    </tr>
                    <tr className={ns()}>
                      <th className={ns()}>Borrow w/ Rc</th>
                      <td className={ns("good")}>Yes</td>
                      <td className={ns("bad")}>Rc Overhead + Mispredictions {this.noteAnchor("1040")}</td>
                      <td className={ns("bad")}>16b/obj + 8b/ref</td>
                      <td className={ns("bad")}>No</td>
                    </tr>
                  </tbody>
                </table>




                <ul className={ns("content cozy")}>
                  <li className={ns()}><b>C Refs, Normal</b>: Normal constraint refs, where a dangling reference halts the program.</li>
                  <li className={ns()}><b>C Refs, Resilient</b>: Where constraint refs kept an object alive with nonatomic ref-counting, and we only panic on dereferencing one.</li>
                  <li className={ns()}><b>C Refs, Fast</b>: Fast mode, where constraint refs are compiled to raw pointers.</li>
                  <li className={ns()}><b>Borrow w/ Unsafe</b>: Using the borrow checker, with unsafe as a fall-back.</li>
                  <li className={ns()}><b>Borrow w/ IDs</b>: Using the borrow checker, with generational IDs for "aliasing".</li>
                  <li className={ns()}><b>Borrow w/ Rc</b>: Using the borrow checker, with {incode("Rc<T>")} as a fall-back. Assuming an Rc control block of 8b share count and 8b weak count.</li>
                </ul>

                <div className={ns("content cozy")}>
                  In the end, constraint references and the borrow checker both accomplish speed and safety, but in different ways and with different tradeoffs. Which one is better will depend on the use case and the programmer.

                </div>
                <div className={ns("content cozy")}>
                  We explored adding an {incode("OwningRef<T>")} and {incode("ConstrantRef<T>")} to Rust, but alas, the syntax became very noisy, and it was incompatible with borrow refs. {this.noteAnchor("436")}
                </div>



                <a name="singleownership"></a>
                <h3 className={ns()}>RAII: Past, Present, Future</h3>


                <div className={ns("content cozy")}>
                  Using constraint references, we unleashed the power of single ownership and found the next steps for RAII:
                </div>

                <ul className={ns("content")}>
                  <li className={ns()}>Constraint refs when we want to prevent dangling pointers!</li>
                  <li className={ns()}>Weak refs for everyone else!</li>
                  <li className={ns()}>Multiple destructors!</li>
                  <li className={ns()}>Destructor parameters!</li>
                  <li className={ns()}>Destructor return values!</li>
                  <li className={ns()}>Non-destroying destructors!</li>
                </ul>

                <div className={ns("content cozy")}>
                  Someday, we might be able to add these features to C++, but the bigger challenge will be in showing ourselves that <b>we don't need shared ownership as much as we thought</b>.
                </div>
                <div className={ns("content")}>
                  We need to show the world that it shouldn't use the shared ownership hammer, that we can also use owning references, constraint references, clasps, and weak references. Perhaps a language built on these things could help with that!
                </div>

                <div className={ns("content")}>
                  This isn't even the end of the single ownership saga! In the coming weeks, we'll explain how this consistent single ownership approach enabled other unique capabilities in Vale, such as cross-compilation and region bounding. 
                </div>

                <div className={ns("content cozy")}>                
                  Until then, we want to hear from you! We'd love to hear your thoughts on single ownership, RAII, Vale, and any ideas you have! Come share your thoughts in the <a href="http://reddit.com/r/vale">r/Vale</a> subreddit or the <a href="https://discord.gg/SNB8yGH">Vale discord</a>!
                </div>

                <h3 className={ns("content cozy")} style={{marginTop: "32px"}}>
                  Coming Soon
                </h3>
                <ul className={ns("content")}>
                  <li className={ns()}>Single Ownership: The Key to LLVM/JVM/CLR/JS Cross Compilation</li>
                  <li className={ns()}>Const Generics and Metaprogramming in Vale</li>
                  <li className={ns()}>Single Ownership + Regions = Ref-Counting Speed</li>
                  <li className={ns()}>Propagating Errors Past Destructors in Vale</li>
                  <li className={ns()}>Unified Variants and Inline Sealed Interfaces</li>
                  <li className={ns()}>Variant Indexing in Vale</li>
                </ul>

              </div>

            </div>

            <div className={ns("margin")}>

              <div className={ns("toc-container")}>

                <div className={ns("c-toc root")}>
                  <div className={ns("subtitle content")}>By Evan Ovadia &nbsp;&mdash;&nbsp; Feb 30th, 2077</div>

                  <ul className={ns("c-toc")}>
                    <li>
                      <Link to="#singleownership">Single Ownership</Link>
                    </li>
                    <li>
                      <Link to="#singleownership">Safe Handling of Aliases</Link>
                    </li>
                    <li>
                      <Link to="#singleownership">Emerging Patterns</Link>
                    </li>
                    <li>
                      <Link to="#singleownership">Simplification</Link>
                    </li>
                    <li>
                      <Link to="#singleownership">Surprise!</Link>
                    </li>
                    <li>
                      <Link to="#singleownership">Destructor Implications</Link>
                    </li>
                    <ul>
                      <li>
                        <Link to="#singleownership">Parameters</Link>
                      </li>
                      <li>
                        <Link to="#singleownership">Overloads</Link>
                      </li>
                      <li>
                        <Link to="#singleownership">Returns</Link>
                      </li>
                      <li>
                        <Link to="#singleownership">Non-Destroying</Link>
                      </li>
                    </ul>
                    <li>
                      <Link to="#singleownership">What even <i>is</i> a destructor?</Link>
                    </li>
                    <li>
                      <Link to="#singleownership">A Detour Through Rust</Link>
                    </li>
                    <li>
                      <Link to="#singleownership">RAII: Past, Present, Future</Link>
                    </li>
                  </ul>
                </div>

                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="642a">
                RAII stands for Resource Acquisition Is Initialization, which is a fancy way of saying "put that code in a destructor so you can be sure it actually happens."
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="604">
                Rust's borrow references are also like this, though much more restricted.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="950">
                In 2007, Gel was the first language to incorporate constraint references, described in <a href="https://researcher.watson.ibm.com/researcher/files/us-bacon/Dingle07Ownership.pdf">Ownership You Can Count On</a> as the "alias counting" technique.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="engines">
                According to legend, some C++ game engines already do this.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="544">
                Or, if asserting isn't quite your fancy, there's a mode that pauses and shows a "Continue?" prompt which keeps it alive until the last constraint reference disappears.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="safehandling">
                Some other safe patterns:
                <ul className={ns("content cozy")} style={{marginTop: "8px"}}>
                  <li className={ns()}>Destroying things in the reverse order they were made.</li>
                  <li className={ns()}>Giving a raw pointer to a non-moved local to a function that doesn't let it escape.</li>
                  <li className={ns()}>Giving a raw pointer to a movable local to a function that doesn't let it escape, unless a closure moves it.</li>
                </ul>
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="ownthis">
                Notice how {incode("read")} takes a constraint reference ({incode("&this")}), but the two "destructors" take in an owning reference ({incode("this")}).
              </Note>


              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="735">
                This can be controlled on a case-by-case basis; if we don't want this, we can use a weak reference instead, explained below.
              </Note>


              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="512">
                We could refactor our codebase to make all our {incode("Thing", "s")} shared, so we could give {incode("Network")} a {incode("shared_ptr<Thing>", "...")} a bit invasive though.
                <div style={{marginTop: "8px"}}>
                  We could give {incode("Network")} a {incode("shared_ptr<ThingRespHandler>")}. In fact, that's what {incode("std::function")} is: a {incode("shared_ptr")} around a function pointer and some arguments.
                </div>
                <div style={{marginTop: "8px"}}>
                  In the end, we didn't need either.
                </div>
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="519">
                This is a common complaint in GC'd languages too. An accidental reference way over in some corner of the codebase is keeping my very large object alive and in memory.
                <div style={{marginTop: "8px"}}>
                  We call these "memory leaks". Yes, GC'd languages can have memory leaks!
                </div>
                <div style={{marginTop: "8px"}}>
                  These can also lead to dangerous bugs where network responses or button observers call into objects we thought we got rid of.
                </div>
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="532">
                We didn't run into any, but there are some hypothetical cases where one might want shared ownership. Luckily, you can implement shared ownership with single ownership, as an escape hatch.
              </Note>







              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="942">
                This is common in all languages: we often have a "main" reference to an object.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="sovsraii">
                "Single ownership" and "RAII" are often used interchangeably, but there's an important difference.
                <div style={{marginTop: "8px"}}>
                  Single ownership is when an object is owned by a single reference, and is deallocated when that reference goes out of scope.
                </div>
                <div style={{marginTop: "8px"}}>
                  RAII is when we use single ownership to track responsibility, so we don't forget to do something.
                </div>
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="515">
                We could also use a deleter, set up when we create the object, but thats often too early to know what parameters to pass into the destructor.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="247">
                Go-style defer blocks can make this even nicer.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="mustuse">
                This also lets us implement <a href="https://en.cppreference.com/w/cpp/language/attributes/nodiscard">[[nodiscard]]</a> easily: name your destructor something else (or make your {incode("drop")} private).
              </Note>


              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="777">
                In Vale, if you use the {incode("%")} operator to propagate errors upwards, it will automatically call {incode(".drop()")} on any local in scope.
                <div style={{marginTop: "8px"}}>
                  However, if you have a local {incode("x")} which doesn't have a zero-arg {incode(".drop()")}, then you would normally hold onto the error, call the correct destructor for {incode("x")}, and then proceed to return the error upwards.
                </div>
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="1000">
                Maybe we could make this work in C++ if it allowed us to specify an explicit {incode("this")} parameter, which was wrapped in a {incode("unique_ptr")}. Something like Rust's <a href="https://github.com/rust-lang/rust/issues/44874">Arbitrary Self Types</a>.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="1012">
                Your signature doesn't matter, it's whats inside that counts. What makes you a destructor is whether you free {incode("this")} inside your function, and don't let anyone tell you otherwise!
              </Note>


              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="546b">
                Rust also won't let us do the subcomponents pattern mentioned above, because the references between the components would effectively freeze them for all time.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="409">
                Keep in mind that Rust never promised 100% safety; Rust is about minimizing unsafety and isolating it into very well-marked areas which we can scrutinize more heavily. Some level of unsafety is expected, even in Rust programs.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="1217">
                This may seem large, but a smaller integer usually doesn't save us anything, because of padding in the {incode("(i64, T)", "s")} inside the Vec.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="206">
                We could instead have a {incode("Vec<(i32, Box<T>)>")}, but that would introduce an extra cache-miss.
              </Note>



              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="406">
                This could also lead to leaks (in the Java sense of the word), where we forget to clean up a child from the central Vec when its parent is destroyed.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="1046">
                It's worth noting that, in Rust, we can choose which strategy to use per-situation, while in Vale, it's a global compilation option.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="alias">
                To "alias" a pointer means to make another pointer, pointing to the same thing. Memory safety is challenging when aliasing gets involved, so here's a way to make aliasing safer.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="548">
                This isn't always true: constraint refs and weak refs into read-only regions have zero overhead.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="1041">
                The number here (8b) is less than Rust's, but it applies to all objects. In Rust, we pay the cost per object and reference that uses Rc or IDs. In total, this could be more or less depending on the use case.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="212">
                From branching when comparing the generations.
                <div style={{marginTop: "8px"}}>
                  Also, if using boxing like {incode("Vec<(i64, Box<T>)>")} to save memory, we have an additional indirection.
                </div>
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="1040">
                To compare, the "C Refs, Resilient" approach tells the CPU to expect all owning references' decrements to deallocate, and expect all borrow references' decrements to not deallocate.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="whatever">
                In C++, the XYZ is calling the destructor, which is a function that takes no parameters and returns no useful information. We'll show how we can use RAII to make sure we call any of multiple methods which have no such restrictions!
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="nounique">
                Vale's default reference is an owning reference, like C++'s {incode("unique_ptr")}.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="nomakeunique">
                In Vale, constructors are called just like any other function, no {incode("new")} or {incode("make_unique")} required.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noget">
                One can think of {incode("&a")} like C++'s {incode("unique_ptr::get")}.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="alpha">
                Vale is still in early alpha. Check out the <Link to="/roadmap">Roadmap</Link> for progress and plans!
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="436">
                In the same way that Rc is incompatible with borrow refs; where the two collide, one often has to re-work their code to use more Rc.
              </Note>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default BlogRaiiNextSteps;
