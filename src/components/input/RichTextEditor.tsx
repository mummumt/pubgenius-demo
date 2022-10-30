/* eslint-disable object-shorthand */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable func-names */
import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, FormHelperText } from '@mui/material'
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'
import { Controller } from 'react-hook-form'

const EditorBox = styled(Box)`
  textarea {
    display: none;
  }

  .jodit-wysiwyg {
    /* overflow-y: hidden; */
    iframe,
    jodit {
      max-width: 100%;
      max-height: 62.5vw;
    }

    img {
      max-width: 100%;
      height: auto;
    }
  }
`

const importJodit = () => import('jodit-react')

const JoditEditor = dynamic(importJodit, {
  ssr: false,
})

interface IRichTextEditor {
  name: string
  control: any
  error: boolean
  helperText: string | undefined
  disabled: boolean
  isDynamic?: boolean
}
const RichTextEditor: React.FC<IRichTextEditor> = ({
  name,
  control,
  error,
  helperText = '',
  disabled = false,
  isDynamic = false,
}) => {
  const theme = useTheme()

  const config = React.useMemo(
    () => ({
      readonly: disabled,
      minHeight: 400,
      maxHeight: 640,
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'fontsize',
        'paragraph',
        'brush',
        '|',
        'eraser',
        'superscript',
        'subscript',
        'ul',
        'ol',
        'indent',
        'outdent',
        'left',
        'center',
        'right',
        '|',
        'image',
        'video',
        '\n',
        'cut',
        'copy',
        'paste',
        'selectall',
        'hr',
        'table',
        'link',
        'symbol',
        'undo',
        'redo',
        'find',
      ],
      toolbarAdaptive: false,
      removeButtons: ['file', 'source', 'about'],
      editHTMLDocumentMode: true,
      colors: {
        theme: [
          theme.palette.text.primary,
          theme.palette.text.secondary,
          theme.palette.text.disabled,
          theme.palette.divider,
          theme.palette.primary.dark,
          theme.palette.primary.main,
          theme.palette.primary.light,
          theme.palette.secondary.dark,
          theme.palette.secondary.main,
          theme.palette.secondary.light,
          '#C70F0F',
          theme.palette.error.dark,
          theme.palette.error.main,
          theme.palette.error.light,
          theme.palette.warning.dark,
          theme.palette.warning.main,
          theme.palette.warning.light,
          theme.palette.success.dark,
          theme.palette.success.main,
          theme.palette.success.light,
        ],
        greyscale: [
          '#000000',
          '#434343',
          '#666666',
          '#999999',
          '#B7B7B7',
          '#CCCCCC',
          '#D9D9D9',
          '#EFEFEF',
          '#F3F3F3',
          '#FFFFFF',
        ],
        palette: [
          '#980000',
          '#FF0000',
          '#FF9900',
          '#FFFF00',
          '#00F0F0',
          '#00FFFF',
          '#4A86E8',
          '#0000FF',
          '#9900FF',
          '#FF00FF',
        ],
        full: [
          '#E6B8AF',
          '#F4CCCC',
          '#FCE5CD',
          '#FFF2CC',
          '#D9EAD3',
          '#D0E0E3',
          '#C9DAF8',
          '#CFE2F3',
          '#D9D2E9',
          '#EAD1DC',
          '#DD7E6B',
          '#EA9999',
          '#F9CB9C',
          '#FFE599',
          '#B6D7A8',
          '#A2C4C9',
          '#A4C2F4',
          '#9FC5E8',
          '#B4A7D6',
          '#D5A6BD',
          '#CC4125',
          '#E06666',
          '#F6B26B',
          '#FFD966',
          '#93C47D',
          '#76A5AF',
          '#6D9EEB',
          '#6FA8DC',
          '#8E7CC3',
          '#C27BA0',
          '#A61C00',
          '#CC0000',
          '#E69138',
          '#F1C232',
          '#6AA84F',
          '#45818E',
          '#3C78D8',
          '#3D85C6',
          '#674EA7',
          '#A64D79',
          '#85200C',
          '#990000',
          '#B45F06',
          '#BF9000',
          '#38761D',
          '#134F5C',
          '#1155CC',
          '#0B5394',
          '#351C75',
          '#733554',
          '#5B0F00',
          '#660000',
          '#783F04',
          '#7F6000',
          '#274E13',
          '#0C343D',
          '#1C4587',
          '#073763',
          '#20124D',
          '#4C1130',
        ],
      },
    }),
    [theme, disabled],
  )

  return (
    <EditorBox>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <JoditEditor
              config={config}
              onBlur={onChange} // preferred to use only this option to update the content for performance reasons
              value={value}
            />
          )
        }}
      />

      {error && (
        <FormHelperText
          error
          css={css`
            margin: 3px 14px 0px 14px;
          `}
        >
          {helperText}
        </FormHelperText>
      )}
    </EditorBox>
  )
}

export default RichTextEditor
