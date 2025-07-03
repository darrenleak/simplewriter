import { vim } from "@replit/codemirror-vim"
import { highlightActiveLine, dropCursor, rectangularSelection } from "@codemirror/view"
import { bracketMatching, defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { closeBrackets } from "@codemirror/autocomplete"
import { minimalSetup } from "codemirror"
import { highlightSelectionMatches } from "@codemirror/search"
import { markdownLanguage, markdown } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { javascript } from '@codemirror/lang-javascript'

// tabSize.of(EditorState.tabSize.of(8))

type EditorConfigInput = {
  tabSize: number
  indentWithTab: boolean
  useVim: boolean
}

const defaultConfig: EditorConfigInput = {
  tabSize: 2,
  indentWithTab: true,
  useVim: true,
}

export class EditorConfig {
  tabSize: number
  indentWithTab: boolean
  useVim: boolean

  constructor(config: EditorConfigInput = defaultConfig) {
    this.tabSize = config.tabSize
    this.indentWithTab = config.indentWithTab
    this.useVim = config.useVim
  }

  extensions() {
    const extensions: any[] = [
      minimalSetup,
      bracketMatching(),
      closeBrackets(),
      // highlightActiveLine(),
      highlightSelectionMatches(),
      dropCursor(),
      markdown({
        // completeHTMLTags: true,
        codeLanguages: languages
      }),
      syntaxHighlighting(defaultHighlightStyle),
    ]

    if (this.useVim) extensions.push(vim())

    return extensions
  }
}