import { useState, useEffect } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

function App() {
  const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...

### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  `

  const [textInput, setTextInput] = useState(``)
  
  
  const handleChange = (e) => {
    const value = e.target.value
    marked.setOptions({breaks: true})
    const html = marked.parse(value)
    setTextInput(html)
  }
  
  useEffect((e) => {
    marked.setOptions({breaks: true})
    setTextInput(marked.parse(placeholder))
  },[]) 

  return (
    <div className="App w-100 h-screen p-10 bg-slate-900 font-sans m-0 box-border">
        <h1 className='text-3xl text-slate-50 '>markdownEditor</h1>
        <p className='text-slate-300 mb-4 italic'>-- by farulivan</p>
        <div  className='mb-5'>
          <label htmlFor="editor" className="block mb-2 text-sm font-medium text-gray-400">Write your markdown text</label>
          
          <textarea id="editor" rows="6" className="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" defaultValue={placeholder} onChange={handleChange}></textarea>
        </div>  

        <div className='h-80'>
          <h5 className="block mb-2 text-sm font-medium text-gray-400 ">Preview</h5>
          <div className="bg-slate-200 rounded-lg overflow-auto p-8 h-full">
            <div id="preview"
              className='prose prose-blue'
              dangerouslySetInnerHTML={
                {__html: DOMPurify.sanitize(textInput)}
              }
              >
            </div>
          </div>
        </div>

    </div>
  )
}

export default App
