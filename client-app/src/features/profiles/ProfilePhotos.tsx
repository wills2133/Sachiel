import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Grid, GridColumn, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';
import { useStore } from '../../app/stores/store';
import { Photo, Profile } from '../../models/profile';

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhotos({profile}: Props) {
    const {profileStore: {isCurrentUser, uploadPhoto, uploadingPhoto, setMain, loadingPhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: Photo, e:SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMain(photo);
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
                                        {isCurrentUser && (
                                            <Button.Group fluid widths={2}>
                                                <Button
                                                    basic
                                                    color='green'
                                                    content='Main'
                                                    name={photo.id}
                                                    disabled={photo.isMain}
                                                    loading={target==photo.id && loadingPhoto}
                                                    onClick={e => handleSetMainPhoto(photo, e)}
                                                />
                                                <Button color='red' icon='trash' />
                                            </Button.Group>
                                        )}
                                    </Card>
                                ))}
                            </Card.Group>
                    )}
                </GridColumn>
            </Grid>
        </Tab.Pane>
    )
})