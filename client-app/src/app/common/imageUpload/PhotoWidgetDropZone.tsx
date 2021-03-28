import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'

interface Props {
    setFile: (file: any) => void;
}

export default function PhotoWidgetDropzone({setFile}: Props) {

  const dzStyle = {
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '40px',
    textAlign: 'center' as 'center',
    height: 200
  }

  const dzActive = {
    borderColor: 'green'
  }

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles.map((file: any) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
  }, [setFile])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={isDragActive ? {...dzStyle, ...dzActive} : dzStyle}>
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop file here' />
    </div>
  )
}