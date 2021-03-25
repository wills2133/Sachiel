import React, { useEffect, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import PhotoWidgetDropzone from './PhotoWidgetDropZone';
import PhotoWidgetCropper from './PhotoWidgetCropper';

export default function PhotoUploadWidget() {
    const [files, setFile] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>()

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => console.log(blob));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview) );
        }
    }, [files])

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header color='teal' content='Step 1 - Add Photos' />
                <PhotoWidgetDropzone setFile={setFile} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{margin: 0, padding: 0 }} >
                <Header color='teal' content='Step 2 - Resize Image' />
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header color='teal' content='Step 3 - Preview & Upload' />
                {files && files.length > 0 && (
                    <>
                        <div className='img-preview' style={{minHeight: 200, overflow: 'hidden'}} />
                        <Button.Group widths={2}>
                            <Button onClick={onCrop} positive icon='check' />
                            <Button onClick={() => setFile([])}  icon='close' />
                        </Button.Group>
                    </>
                )}
            </Grid.Column>
        </Grid>
    )
}