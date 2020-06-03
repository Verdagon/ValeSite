
              <div className={cssns("content cozy")}>
                Foreign pointers in Valence are not like other languages' pointers.
              </div>

              <div className={cssns("content cozy")}>
                <ul className={cssns()}>
                  <li className={cssns()}>In C and C++, if I delete <strong>Saturn</strong>, nothing happens. Later, if I try to dereference the astronaut's{incode("planet")} field, the application crashes.</li>
                  <li className={cssns()}>In Rust, this kind of layout is impossible; the astronaut would instead have to have some sort of identifier for <strong>Saturn</strong>.</li>
                  <li className={cssns()}>In garbage collected languages like Java, or reference counted languages like Swift, one can't even delete <strong>Saturn</strong>; the fact that the astronaut's {incode("planet")} field points to it keeps it alive.</li>
                </ul>
              </div>

              <div className={cssns("content")}>
                <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="note8"/><strong>In Valence, the program halts if we try to delete Saturn while anything is pointing to it.</strong>
              </div>

              <div className={cssns("content cozy")}>
                In the example, this means that we must either:
              </div>

              <div className={cssns("content")}>
                <ul className={cssns()}>
                  <li className={cssns()}>Delete the astronaut before deleting <strong>Saturn</strong>.</li>
                  <li className={cssns()}>Make the astronaut's {incode("planet")} field point somewhere else, and then delete <strong>Saturn</strong>.</li>
                </ul>
              </div>




              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note8">
                <p>This is similar to foreign key constraints in SQL, but built into the language.</p>
                <p>This check can is usually enabled in development builds, and can be disabled in production builds.</p>
              </Note>
