import React, { useEffect, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import PhotoWidgetDropzone from './PhotoWidgetDropZone';
import PhotoWidgetCropper from './PhotoWidgetCropper';

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({loading, uploadPhoto}: Props) {
    const [files, setFile] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>()

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview) );
        }
    }, [files])

    return (
        <Grid>
            <Grid.Column width={5}>
                <Header color='teal' content='Step 1 - Add Photos' />
                <PhotoWidgetDropzone setFile={setFile} />
            </Grid.Column>
            <Grid.Column width={6}>
                <Header color='teal' content='Step 2 - Resize Image' />
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </Grid.Column>
            <Grid.Column width={5}>
                <Header color='teal' content='Step 3 - Preview & Upload' />
                {files && files.length > 0 && (
                    <>
                        <div className='img-preview' style={{minHeight: 200, width: '100%', overflow: 'hidden'}} />
                        <Button.Group size='tiny' style={{width: 200}}>
                            <Button loading={loading} onClick={onCrop} positive icon='check' />
                            <Button disabled={loading} onClick={() => setFile([])}  icon='close' />
                        </Button.Group>
                    </>
                )}
            </Grid.Column>
        </Grid>
    )
}