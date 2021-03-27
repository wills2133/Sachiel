import React, { useEffect, useState } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../models/pagination';

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry, setPagingParams, pagination} = activityStore
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities]) // activityStore as depandancy

    if(activityStore.loadingInitial) return <LoadingComponent content = 'Loading Activities...' />;

    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
                <Button
                    floated='right'
                    content={pagination?.totalPages !== pagination?.currentPage
                        ? 'more...' : 'End'}
                    positive
                    onClick={handleGetNext}
                    disabled={pagination?.totalPages === pagination?.currentPage}
                    loading={loadingNext}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})
