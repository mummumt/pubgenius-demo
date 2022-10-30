/* eslint-disable object-shorthand */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable func-names */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import React from 'react'

const DisplayBox = styled(Box)`
  textarea {
    display: none;
  }
  .jodit-wysiwyg {
    padding: 0 !important;
  }
  .jodit-container {
    border: none !important;
  }
`

const importJodit = () => import('jodit-react')

const JoditEditor = dynamic(importJodit, {
  ssr: false,
})

interface IRichTextDisplay {
  value: string
}
const RichTextDisplay: React.FC<IRichTextDisplay> = ({ value }) => {
  const [config, setConfig] = React.useState({
    height: 300,
    maxHeight: 300,
    readonly: true,
    toolbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    // inline: true,
    toolbarInlineForSelection: true,
    showPlaceholder: false,
    toolbarAdaptive: false,
    editHTMLDocumentMode: true,
    allowResizeX: false,
    allowResizeY: false,
  })

  return (
    <DisplayBox>
      {React.useMemo(
        () => (
          <JoditEditor config={config} value={value} />
        ),
        [config, value],
      )}
    </DisplayBox>
  )
}

export default RichTextDisplay
