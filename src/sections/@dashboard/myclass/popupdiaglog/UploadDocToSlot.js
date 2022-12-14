import React, {useState} from 'react';
// COMPONENT
import UploadNewDoc from './UploadNewDoc';
import GeneralFilePage from '../../../../pages/dashboard/folder/[folder_id]';
import PropTypes from 'prop-types';
// @mui
import {
    Box,
    Button,
    Card,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import {useSelector} from "react-redux";
import {dispatch} from "../../../../redux/store";
import {copyDocsToFolderRedux} from "../../../../redux/slices/storeFolder";
import {BlogNewPostForm} from "../../folder";

UploadDocToSlot.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    slotId: PropTypes.number,
};
export default function UploadDocToSlot({open, onClose, slotId, classId, subjectId}) {
    const {
        folderUploadDoc: { listFolders, listDocuments },
        folder,
    } = useSelector((state) => state.folder);
    const { storeFolder } = useSelector((state) => state.storeFolder);
    const { id } = storeFolder;

    const [currentTab, setCurrentTab] = useState(0);
    const [myFolderId, setMyFolderId] = useState(0);
    const handleUploadDocumentToStoreFolder = (myDocumentId) => {
        console.log('handleUploadDocumentToStoreFolder', myDocumentId, id);
        dispatch(copyDocsToFolderRedux(id, myDocumentId));
    };

    const tabs = [
        {
            id: 0,
            value: 'myDocument',
            label: `Tài liệu của tôi`,
            component: (
                <GeneralFilePage
                    dataGeneralFolder={{
                        myFolderId: myFolderId,
                        setMyFolderId: setMyFolderId,
                        handleUploadDocumentToStoreFolder,
                        listFolders,
                        listDocuments,
                    }}
                    dataUploadDocsToSlot={{
                        slotId: slotId,
                        classId: classId,
                        subjectId: subjectId
                    }}
                />
            ),
        },
        {
            id: 1,
            value: 'uploadDocument',
            label: 'Đăng tải tài liệu',
            component: (
                <BlogNewPostForm
                    dataGeneralFolder={{
                        generalFolderId: id,
                    }}
                    dataUploadDocsToSlot={{
                        disableChooseOptions: true,
                        slotId: slotId,
                        classId: classId,
                        subjectId: subjectId
                    }}
                />
            ),
        },

    ];

    return (
        <Dialog
            fullWidth
            maxWidth="xl"
            open={open}
            onClose={() => {
                setMyFolderId(0), onClose();
            }}
        >
            <DialogActions sx={{ py: 2, px: 3 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Đăng tải tài liệu của tôi
                </Typography>

                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                        setMyFolderId(0), onClose();
                    }}
                >
                    Quay lại
                </Button>
            </DialogActions>

            <Divider />
            <Container maxWidth={'xl'}>
                <Tabs
                    value={currentTab}
                    onChange={(event, newValue) => {
                        console.log('onChange', newValue);
                        setCurrentTab(newValue);
                        //   setComponentTab(tabs[newValue].component);
                    }}
                    sx={{ px: 3, bgcolor: 'background.neutral' }}
                >
                    {tabs.map((tab) => (
                        <Tab key={tab.id} value={tab.id} label={tab.label} />
                    ))}
                </Tabs>

                <Divider />

                {tabs.map(
                    (tab) =>
                        tab.id === currentTab && (
                            <Box
                                key={tab.id}
                                sx={{
                                    ...(currentTab === 'description' && {
                                        p: 3,
                                    }),
                                    mt:2,
                                }}
                            >
                                {tab.component}
                            </Box>
                        )
                )}
                <Divider />
            </Container>
        </Dialog>
    );
}
