import React, { useState } from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import PhotoWidgetDropzone from './PhotoWidgetDropZone';

export default function PhotoUploadWidget() {
    const [files, setFile] = useState<any>([]);
    return (
        <Grid>
            <Grid.Column width={4}>
                <Header color='teal' content='Step 1 - Add Photos' />
                <PhotoWidgetDropzone setFile={setFile} />
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={4}>
                <Header color='teal' content='Step 2 - Resize Image' />
                {files && files.length > 0 && (
                    <Image src={files[0].preview} />
                )}
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={4}>
                <Header color='teal' content='Step 3 - Preview & Upload' />
            </Grid.Column>
        </Grid>
    )
}