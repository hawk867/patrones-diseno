import { COLORS } from '../helpers/colors.ts';
/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class CodeEditorState {
    readonly content: string;
    readonly cursorPointer: number;
    readonly unsaveChanges: boolean;

    constructor(content: string, cursorPointer: number, unsaveChanges: boolean) {
        this.content = content;
        this.cursorPointer = cursorPointer;
        this.unsaveChanges = unsaveChanges;
    }

    copyWith( {
        content,
        cursorPointer,
        unsaveChanges,
    }: Partial<CodeEditorState> ): CodeEditorState {
        return new CodeEditorState(
            content ?? this.content,
            cursorPointer ?? this.cursorPointer,
            unsaveChanges ?? this.unsaveChanges
        );
    }

    displayState() {
        console.log('\n%cEstaddo del editor:', COLORS.green);
        console.log(`
            Contenido: ${this.content}
            Posicion del Cursor: ${this.cursorPointer}
            Cambios sin guardar: ${this.unsaveChanges}`)
    }
}

class CodeEditorHistory {

    private history: CodeEditorState[] = [];
    private currentIndex: number = -1;

    save( state: CodeEditorState) : void {
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
        }
        this.history.push(state);
        this.currentIndex++;
    }

    undo(): CodeEditorState | null {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }

    redo(): CodeEditorState | null {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }
        return null;
    }
}

function main() {
    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState(
        "console.log('Hola Mundo'", 2, false);

        history.save(editorState);

        console.log('%cEstado inicial:', COLORS.blue);
        editorState.displayState();

        editorState = editorState.copyWith({
            content: "console.log('Hola Mundo'); \nconsole.log('Nueva linea');",
            cursorPointer: 3,
            unsaveChanges: true,
        })
        history.save(editorState);

        console.log('\n%cDespues del primer cambio:', COLORS.blue);
        editorState.displayState();

        console.log('%cDespues de mover el cursor:', COLORS.yellow);
        editorState = editorState.copyWith({ cursorPointer: 5 });
        history.save(editorState);
        editorState.displayState();

        console.log('%cDespues del Undo:', COLORS.yellow);
        editorState = history.undo()!;
        editorState.displayState();

        console.log('%cDespues del Redo:', COLORS.yellow);
        editorState = history.redo()!;
        editorState.displayState();
}

main();