import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Card, Grid, GridColumn, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';
import { useStore } from '../../app/stores/store';
import { Profile } from '../../models/profile';

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhotos({profile}: Props) {
    const {profileStore: {isCurrentUser, uploadPhoto, uploadingPhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <GridColumn width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser && (
                        <Button
                            floated='right'
                            content={addPhotoMode ? 'Cancle' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </GridColumn>
                <GridColumn width={16}>
                    {addPhotoMode ? (
                            <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploadingPhoto}/>
                        ) : (
                            <Card.Group itemsPerRow={5}>
                                {profile.photos?.map((photo) => (
                                    <Card key={photo.id}>
                                        <Image src={photo.url} />
                                    </Card>
                                ))}
                            </Card.Group>
                    )}
                </GridColumn>
            </Grid>
        </Tab.Pane>
    )
})